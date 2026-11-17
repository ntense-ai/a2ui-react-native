/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DataContext } from '../resolution/data-context.js';
import { resolveArgumentValue, withActiveCallCatalogId, } from '../resolution/data-context-internal.js';
import { isSignal, getValue } from '../reactivity/signals.js';
import { SurfaceModel } from '../state/surface-model.js';
import { isCatalogVersionCompatible } from '../processing/adapters/base.js';
import { findFailedArgument, settleDeep } from '../common/settle_deep.js';
import { PayloadValidator } from '../validation/payload-validator.js';
import { A2uiRpcError, RpcErrorCode } from '../errors.js';
export { A2uiRpcError, RpcErrorCode };
/**
 * Manages bidirectional RPC function execution between renderer and server agent.
 */
export class RpcHandler {
    constructor(optionsOrCatalogs, outboundListener) {
        this.pendingAgentCalls = new Map();
        this.isDisposed = false;
        if (Array.isArray(optionsOrCatalogs)) {
            this.catalogs = optionsOrCatalogs;
            this.outboundListener = outboundListener;
            this.defaultTimeoutMs = 30000;
        }
        else {
            const options = optionsOrCatalogs ?? {};
            this.catalogs = options.catalogs ?? [];
            this.outboundListener = options.outboundListener;
            this.defaultTimeoutMs = options.defaultTimeoutMs ?? 30000;
        }
    }
    /**
     * Whether this RPC handler has been disposed.
     */
    get disposed() {
        return this.isDisposed;
    }
    /**
     * Executes a remote renderer function requested by the server agent.
     *
     * @param message Inbound callRendererFunction message.
     * @param context DataContext for function execution.
     * @param isUserActivated Whether execution occurs in an active user gesture context.
     * @returns A promise resolving to the renderer function response message.
     */
    async handleCallRendererFunction(message, context, isUserActivated = false) {
        const validationError = this.validateInboundMessage(message);
        if (validationError) {
            await this.emitOutboundResponse(validationError);
            return validationError;
        }
        const { version, callRendererFunction } = message;
        const { surfaceId, functionCallId, callFunction } = callRendererFunction;
        if (surfaceId !== undefined && context?.surface?.id !== surfaceId) {
            const errorResponse = this.createResponseError(functionCallId, RpcErrorCode.INVALID_FUNCTION_CALL, `Surface not found: ${surfaceId}`, version);
            await this.emitOutboundResponse(errorResponse);
            return errorResponse;
        }
        const call = (callFunction['@call'] ?? callFunction.call);
        const { catalogId, args } = callFunction;
        const resolved = this.resolveFunctionImplementation(catalogId, call, context, version);
        if ('error' in resolved) {
            const errorResponse = this.createResponseError(functionCallId, RpcErrorCode.INVALID_FUNCTION_CALL, resolved.error, version);
            await this.emitOutboundResponse(errorResponse);
            return errorResponse;
        }
        const accessError = this.checkExecutionPermissions(resolved.funcImpl, call, isUserActivated);
        if (accessError) {
            const errorResponse = this.createResponseError(functionCallId, RpcErrorCode.INVALID_FUNCTION_CALL, accessError, version);
            await this.emitOutboundResponse(errorResponse);
            return errorResponse;
        }
        const effectiveContext = this.ensureDataContext(context, resolved.catalog, functionCallId);
        const scopedContext = effectiveContext && resolved.catalog.id
            ? withActiveCallCatalogId(effectiveContext, resolved.catalog.id, resolved.catalog)
            : effectiveContext;
        const resolvedArgsResult = this.resolveDynamicArguments(args, scopedContext, isUserActivated);
        if ('error' in resolvedArgsResult) {
            const errorResponse = this.createResponseError(functionCallId, RpcErrorCode.EXECUTION_ERROR, resolvedArgsResult.error, version);
            await this.emitOutboundResponse(errorResponse);
            return errorResponse;
        }
        // A nested asynchronous call leaves a pending Promise in the resolved
        // arguments; wait for it before validating them.
        let settledArgs;
        try {
            settledArgs = (await settleDeep(resolvedArgsResult.args));
        }
        catch (err) {
            const errorResponse = this.createResponseError(functionCallId, RpcErrorCode.EXECUTION_ERROR, this.extractErrorMessage(err) || 'An error occurred during function execution.', version);
            await this.emitOutboundResponse(errorResponse);
            return errorResponse;
        }
        const failedArg = findFailedArgument(settledArgs);
        if (failedArg) {
            const errorResponse = this.createResponseError(functionCallId, RpcErrorCode.EXECUTION_ERROR, (failedArg.error === undefined ? '' : this.extractErrorMessage(failedArg.error)) ||
                'An argument of the function call could not be resolved.', version);
            await this.emitOutboundResponse(errorResponse);
            return errorResponse;
        }
        const parsedArgsResult = this.parseArguments(resolved.catalog, resolved.funcImpl, settledArgs, call);
        if ('error' in parsedArgsResult) {
            const errorResponse = this.createResponseError(functionCallId, RpcErrorCode.INVALID_FUNCTION_CALL, parsedArgsResult.error, version);
            await this.emitOutboundResponse(errorResponse);
            return errorResponse;
        }
        const response = await this.executeFunctionSafely(resolved.funcImpl, parsedArgsResult.args, scopedContext, functionCallId, version);
        await this.emitOutboundResponse(response);
        return response;
    }
    /**
     * Processes an inbound agent function response to resolve or reject the matching pending outbound call.
     *
     * @param message Inbound agent function response message.
     */
    handleAgentFunctionResponse(message) {
        if (!message || !message.agentFunctionResponse)
            return;
        const { functionCallId, value, error } = message.agentFunctionResponse;
        const pending = this.pendingAgentCalls.get(functionCallId);
        if (!pending)
            return;
        this.pendingAgentCalls.delete(functionCallId);
        if (error) {
            const errCode = error.code ?? RpcErrorCode.UNKNOWN_ERROR;
            const errMsg = error.message ?? 'Agent function execution failed';
            pending.reject(new A2uiRpcError(errMsg, errCode, functionCallId, error));
        }
        else {
            pending.resolve(value);
        }
    }
    /**
     * Invokes a remote function on the server agent using an options bag.
     *
     * @template T Expected return value type of the agent function.
     * @param surfaceId Identifier of the surface requesting execution.
     * @param call Function call details.
     * @param options Optional invocation options (custom functionCallId, timeoutMs).
     * @returns A promise resolving to the agent function return value.
     * @throws {A2uiRpcError} If the handler is disposed, no listener is configured, the call is invalid or duplicate, or invocation times out or fails.
     */
    callAgentFunction(surfaceId, call, options) {
        if (this.isDisposed) {
            return Promise.reject(new A2uiRpcError('RpcHandler has been disposed.', RpcErrorCode.DISPOSED));
        }
        if (!this.outboundListener) {
            return Promise.reject(new A2uiRpcError('Cannot call agent function without outboundListener configured.', RpcErrorCode.NO_LISTENER));
        }
        const callName = (call?.['@call'] ?? call?.call);
        if (!call || !callName) {
            return Promise.reject(new A2uiRpcError('Missing or invalid function call name.', RpcErrorCode.INVALID_FUNCTION_CALL));
        }
        const opts = options ?? {};
        const functionCallId = opts.functionCallId ?? this.generateFunctionCallId();
        const effectiveTimeoutMs = opts.timeoutMs ?? this.defaultTimeoutMs;
        if (this.pendingAgentCalls.has(functionCallId)) {
            return Promise.reject(new A2uiRpcError(`A call with functionCallId '${functionCallId}' is already pending.`, RpcErrorCode.DUPLICATE, functionCallId));
        }
        const normalized = {
            functionCallId,
            call,
            effectiveTimeoutMs,
            version: opts.version,
        };
        return this.dispatchAgentCall(surfaceId, normalized);
    }
    /**
     * Cancels all pending agent function calls originating from the given surface.
     *
     * Each pending call is rejected with an `A2uiRpcError` whose code is
     * `CANCELLED`. `DataContext` does not report such a rejection, so a
     * renderer may call this to reset a surface that it keeps.
     *
     * @param surfaceId Identifier of the surface whose pending calls should be cancelled.
     */
    cancelSurfaceCalls(surfaceId) {
        for (const [id, pending] of Array.from(this.pendingAgentCalls.entries())) {
            if (pending.surfaceId === surfaceId) {
                pending.reject(new A2uiRpcError(`Pending calls for surface '${surfaceId}' were cancelled.`, RpcErrorCode.CANCELLED, id));
            }
        }
    }
    /**
     * Disposes the RPC handler: cancels all pending agent function calls with a
     * `CANCELLED` error, rejects later calls with `DISPOSED`, and removes the
     * outbound listener.
     *
     * @param reason Optional reason, added to the `CANCELLED` error messages.
     */
    dispose(reason) {
        if (this.isDisposed)
            return;
        this.isDisposed = true;
        this.outboundListener = undefined;
        const suffix = reason !== undefined && reason.length > 0 ? `: ${reason}` : '.';
        for (const [id, pending] of Array.from(this.pendingAgentCalls.entries())) {
            pending.reject(new A2uiRpcError(`RpcHandler disposed while call '${id}' was pending${suffix}`, RpcErrorCode.CANCELLED, id));
        }
        this.pendingAgentCalls.clear();
    }
    /**
     * Sends an outbound renderer response message to the outbound listener.
     *
     * @param response Renderer function response message to transmit.
     */
    async emitOutboundResponse(response) {
        if (this.outboundListener) {
            try {
                const res = this.outboundListener(response);
                if (res && typeof res.catch === 'function') {
                    await res;
                }
            }
            catch {
                // Outbound listener errors should not mask execution response
            }
        }
    }
    /**
     * Validates an inbound renderer function call message.
     *
     * @param message Inbound message to validate.
     * @returns An error response if validation fails; otherwise `null`.
     */
    validateInboundMessage(message) {
        if (!message) {
            return this.createResponseError('unknown', RpcErrorCode.INVALID_FUNCTION_CALL, 'Inbound message is null or undefined.', 'unknown');
        }
        const version = message.version;
        if (this.isDisposed) {
            return this.createResponseError(message.callRendererFunction?.functionCallId ?? 'unknown', RpcErrorCode.DISPOSED, 'RpcHandler has been disposed.', version);
        }
        if (!message.callRendererFunction?.callFunction) {
            return this.createResponseError(message.callRendererFunction?.functionCallId ?? 'unknown', RpcErrorCode.INVALID_FUNCTION_CALL, 'Malformed message: missing callRendererFunction or callFunction.', version);
        }
        return null;
    }
    /**
     * Resolves the catalog and function implementation for the requested call.
     *
     * @param catalogId Optional catalog identifier specified in the call.
     * @param call Function name to resolve.
     * @param context Optional data context providing a default surface catalog.
     * @param expectedVersion Optional protocol version to check compatibility against.
     * @returns The resolved function implementation and catalog, or an error descriptor.
     */
    resolveFunctionImplementation(catalogId, call, context, expectedVersion) {
        let catalog;
        if (catalogId) {
            const surfaceCatalog = context?.surface?.availableCatalogs?.get(catalogId);
            const handlerCatalog = this.catalogs.find(c => c.id === catalogId);
            const surfaceFunc = surfaceCatalog?.functions?.get(call);
            catalog =
                typeof surfaceFunc?.execute === 'function'
                    ? surfaceCatalog
                    : (handlerCatalog ?? surfaceCatalog);
            if (!catalog) {
                return { error: `Catalog not found: ${catalogId}` };
            }
        }
        if (!catalog) {
            return { error: 'No catalog available for function resolution.' };
        }
        if (catalog.protocolVersion && expectedVersion) {
            if (!isCatalogVersionCompatible(catalog.protocolVersion, expectedVersion)) {
                return {
                    error: `Catalog '${catalog.id}' specification version (${catalog.protocolVersion}) does not match message protocol version (${expectedVersion}).`,
                };
            }
        }
        const funcImpl = catalog.functions?.get(call);
        if (!funcImpl) {
            return { error: `Function not found: ${call}` };
        }
        return { funcImpl, catalog };
    }
    /**
     * Ensures a valid DataContext is available for dynamic argument resolution and function execution.
     *
     * @param context Optional context supplied by the caller.
     * @param catalog Resolved target catalog.
     * @param functionCallId Function call identifier for fallback surface naming.
     * @returns A DataContext backed by the caller's surface or an isolated empty fallback surface.
     */
    ensureDataContext(context, catalog, functionCallId) {
        if (context instanceof DataContext && context.surface) {
            return context;
        }
        const availableCatalogs = new Map();
        for (const cat of this.catalogs) {
            if (catalog.protocolVersion &&
                cat.protocolVersion &&
                isCatalogVersionCompatible(catalog.protocolVersion, cat.protocolVersion)) {
                availableCatalogs.set(cat.id, cat);
            }
        }
        availableCatalogs.set(catalog.id, catalog);
        const fallbackSurface = new SurfaceModel(`_rpc_fallback_${functionCallId || 'default'}`, catalog, availableCatalogs);
        return new DataContext(fallbackSurface, '/');
    }
    /**
     * Resolves dynamic values (`@path` bindings and `@call` expressions) inside function arguments.
     *
     * @param args Raw arguments dictionary from the call payload.
     * @param context DataContext used to evaluate dynamic expressions.
     * @param isUserActivated Whether execution occurs in an active user gesture context.
     * @returns The resolved arguments dictionary, or an error descriptor if expression evaluation fails.
     */
    resolveDynamicArguments(args, context, isUserActivated) {
        if (args === undefined || typeof args !== 'object' || args === null || Array.isArray(args)) {
            return { args };
        }
        const resolvedArgs = {};
        let expressionError;
        const errorSub = context.surface?.onError.subscribe(err => {
            if (!expressionError && err?.code === 'EXPRESSION_ERROR') {
                expressionError = err.message || 'An error occurred during function execution.';
            }
        });
        try {
            for (const [key, val] of Object.entries(args)) {
                // The agent is waiting for this response, so a nested call the
                // renderer does not implement fails here instead of being sent back
                // to the agent. Keys stay own properties, `"__proto__"` included.
                Object.defineProperty(resolvedArgs, key, {
                    value: resolveArgumentValue(context, val, 1, isUserActivated, {
                        allowAgentRouting: false,
                    }),
                    enumerable: true,
                    writable: true,
                    configurable: true,
                });
            }
        }
        catch (err) {
            expressionError =
                this.extractErrorMessage(err) || 'An error occurred during function execution.';
        }
        finally {
            errorSub?.unsubscribe();
        }
        if (expressionError) {
            return { error: expressionError };
        }
        return { args: resolvedArgs };
    }
    /**
     * Verifies caller boundary permissions and user activation requirements for a function.
     *
     * @param funcImpl Function implementation to inspect.
     * @param call Function name being invoked.
     * @param isUserActivated Whether execution occurs within an active user gesture context.
     * @returns An error message if permissions are not satisfied; otherwise `null`.
     */
    checkExecutionPermissions(funcImpl, call, isUserActivated) {
        const boundary = funcImpl.allowedCallers ?? 'rendererOnly';
        const isAllowedCaller = boundary === 'rendererOrAgent' || boundary === 'agentOnly';
        if (!isAllowedCaller) {
            return `Function '${call}' cannot be called by agent (allowedCallers is ${boundary}).`;
        }
        if (funcImpl.requiresUserActivation && !isUserActivated) {
            return `Function '${call}' requires user activation context to execute.`;
        }
        return null;
    }
    /**
     * Validates and parses function arguments against the catalog function schema.
     *
     * @param catalog Catalog declaring the function.
     * @param _funcImpl Function implementation.
     * @param args Raw argument dictionary.
     * @param call Function name being invoked.
     * @returns Parsed arguments on success, or an error descriptor on validation failure.
     */
    parseArguments(catalog, _funcImpl, args, call) {
        try {
            const parsed = new PayloadValidator(catalog, { allowUnknownElements: false }).validateFunction(call, args);
            return { args: parsed };
        }
        catch (err) {
            const errMsg = this.extractErrorMessage(err);
            return { error: `Invalid function arguments for '${call}': ${errMsg}` };
        }
    }
    /**
     * Executes a catalog function implementation, catching unhandled exceptions and formatting the response.
     *
     * Unwraps reactive signals and maps any thrown errors to an `EXECUTION_ERROR` response.
     *
     * @param funcImpl Function implementation to execute.
     * @param args Validated function arguments.
     * @param context Data context for function evaluation.
     * @param functionCallId Identifier of the function call.
     * @param version Protocol version for the response message.
     * @returns A promise resolving to the renderer function response message.
     */
    async executeFunctionSafely(funcImpl, args, context, functionCallId, version) {
        const respVersion = (version || '1.0');
        try {
            const rawResult = await Promise.resolve(funcImpl.execute(args, context));
            const unwrapped = isSignal(rawResult) ? getValue(rawResult) : rawResult;
            const value = unwrapped !== undefined ? unwrapped : null;
            return {
                version: respVersion,
                rendererFunctionResponse: {
                    functionCallId,
                    value,
                },
            };
        }
        catch (err) {
            const errMsg = this.extractErrorMessage(err);
            return {
                version: respVersion,
                rendererFunctionResponse: {
                    functionCallId,
                    error: {
                        code: RpcErrorCode.EXECUTION_ERROR,
                        message: errMsg || 'An error occurred during function execution.',
                    },
                },
            };
        }
    }
    /**
     * Generates a unique function call identifier.
     *
     * @returns A unique call identifier string.
     */
    generateFunctionCallId() {
        if (typeof globalThis.crypto?.randomUUID === 'function') {
            return globalThis.crypto.randomUUID();
        }
        const randSuffix = Math.random().toString(36).substring(2, 15).padEnd(13, '0');
        return `call-${Date.now()}-${randSuffix}`;
    }
    /**
     * Dispatches an outbound agent function call and registers a pending promise with timeout handling.
     *
     * @template T Expected return value type.
     * @param surfaceId Identifier of the surface initiating the call.
     * @param callInfo Normalized agent call parameters.
     * @returns A promise resolving to the agent function return value.
     */
    dispatchAgentCall(surfaceId, callInfo) {
        const { functionCallId, call, effectiveTimeoutMs, version } = callInfo;
        return new Promise((resolve, reject) => {
            let timer;
            const cleanup = () => {
                if (timer) {
                    clearTimeout(timer);
                    timer = undefined;
                }
                this.pendingAgentCalls.delete(functionCallId);
            };
            const callName = ((call['@call'] ?? call.call) || 'unknown');
            timer = this.createTimeoutTimer(functionCallId, callName, effectiveTimeoutMs, cleanup, reject);
            this.pendingAgentCalls.set(functionCallId, {
                surfaceId,
                resolve: val => {
                    cleanup();
                    resolve(val);
                },
                reject: err => {
                    cleanup();
                    reject(err);
                },
            });
            this.sendOutboundMessage(surfaceId, functionCallId, call, version, cleanup, reject);
        });
    }
    /**
     * Creates a timeout timer for a pending agent function call.
     *
     * @param functionCallId Identifier of the pending function call.
     * @param callName Name of the function being called.
     * @param timeoutMs Duration in milliseconds before timeout expiry.
     * @param cleanup Teardown callback to invoke when the timer fires.
     * @param reject Rejection callback to reject the pending promise with a `TIMEOUT` error.
     * @returns The timer handle, or `undefined` if timeout is disabled.
     */
    createTimeoutTimer(functionCallId, callName, timeoutMs, cleanup, reject) {
        if (timeoutMs <= 0)
            return undefined;
        return setTimeout(() => {
            if (this.pendingAgentCalls.delete(functionCallId)) {
                cleanup();
                reject(new A2uiRpcError(`Agent function call '${callName}' timed out after ${timeoutMs}ms.`, RpcErrorCode.TIMEOUT, functionCallId));
            }
        }, timeoutMs);
    }
    /**
     * Transmits an outbound callAgentFunction message to the registered outbound listener.
     *
     * @param surfaceId Identifier of the surface initiating the call.
     * @param functionCallId Identifier of the function call.
     * @param call Function call specification.
     * @param version Optional protocol version string.
     * @param cleanup Teardown callback invoked on failure.
     * @param reject Rejection callback invoked if transmission throws or rejects.
     */
    sendOutboundMessage(surfaceId, functionCallId, call, version, cleanup, reject) {
        // callAgentFunction only exists in v1.0, whose FunctionCall names the function with
        // '@call'. Rewrite a v0.9-style `call` key so the outbound message is valid on the wire.
        const { call: unprefixedCallName, '@call': callName, ...rest } = call;
        const callFunction = { '@call': callName ?? unprefixedCallName, ...rest };
        const outboundMsg = {
            version: (version || '1.0'),
            callAgentFunction: {
                surfaceId,
                functionCallId,
                callFunction,
            },
        };
        try {
            const result = this.outboundListener(outboundMsg);
            if (result && typeof result.catch === 'function') {
                result.catch(err => {
                    cleanup();
                    reject(err);
                });
            }
        }
        catch (err) {
            cleanup();
            reject(err);
        }
    }
    /**
     * Extracts a human-readable message string from an unknown error value.
     *
     * @param err Unknown error caught in a try/catch block.
     * @returns Formatted error message string.
     */
    extractErrorMessage(err) {
        return err instanceof Error ? err.message : String(err);
    }
    /**
     * Constructs a renderer function error response message.
     *
     * @param functionCallId Identifier of the function call that failed.
     * @param code RPC error code or string category.
     * @param message Human-readable error description.
     * @param version Protocol version string.
     * @returns Formatted renderer function response message containing the error.
     */
    createResponseError(functionCallId, code, message, version) {
        return {
            version: (version || '1.0'),
            rendererFunctionResponse: {
                functionCallId,
                error: { code, message },
            },
        };
    }
}
