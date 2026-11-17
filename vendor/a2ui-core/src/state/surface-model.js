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
import { DataModel } from './data-model.js';
import { SurfaceComponentsModel } from './surface-components-model.js';
import { canonicalJsonKey, toJsonValue } from '../common/canonical_json.js';
import { EventEmitter } from '../common/events.js';
import { cloneMetadata, mergeActionMetadata, metadataEquals, } from '../common/metadata.js';
import { isAtLeastVersion, toCanonicalVersion } from '../common/semver.js';
import { findFailedArgument, isThenable, settleDeep } from '../common/settle_deep.js';
import { A2uiExpressionError, A2uiRpcError, RpcErrorCode } from '../errors.js';
import { computed, getValue, peekValue, setValue, signal } from '../reactivity/signals.js';
import { resolveSurfaceCatalog } from './resolve-surface-catalog.js';
/**
 * Normalizes a protocol version to the canonical wire form (`'1.0'` for 1.0+,
 * `'v0.9'` / `'v0.8'` for pre-1.0 versions).
 *
 * Unparseable versions are kept as is.
 *
 * @param version Protocol version to normalize.
 * @returns The canonical version, or `undefined` when none was given.
 */
function canonicalProtocolVersion(version) {
    if (!version)
        return undefined;
    const canonical = toCanonicalVersion(version);
    if (!canonical)
        return version;
    return isAtLeastVersion(canonical, '1.0') ? canonical : `v${canonical}`;
}
/**
 * State model for a single UI surface.
 *
 * Coordinates data binding, component state, and action dispatching.
 *
 * @template T Concrete type of the ComponentApi from the catalog.
 * @template F The catalog's function kind. Every state and messaging
 *   capability of the surface works with a schema-only catalog
 *   (`SurfaceModel<T, FunctionApi>`); only node-tree resolution needs
 *   implementations.
 */
export class SurfaceModel {
    /**
     * Sends calls to functions the renderer does not implement to the agent.
     *
     * When set, a v1.0 catalog's invoker routes a call whose function has no
     * local implementation in that catalog (undeclared, or declared
     * schema-only) here instead of failing, as the v1.0 fallback routing
     * defines. When unset, such a call fails with an `EXPRESSION_ERROR`.
     *
     * Setting a different caller, or clearing it, drops the shared in-flight
     * calls and the cached answers of the previous one.
     */
    get agentFunctionCaller() {
        return this._agentFunctionCaller;
    }
    set agentFunctionCaller(caller) {
        if (caller === this._agentFunctionCaller)
            return;
        this._agentFunctionCaller = caller;
        this.inFlightAgentCalls.clear();
        this.settledAgentCalls.clear();
    }
    /**
     * The most settled agent function answers this surface caches (256 by
     * default). When the cache is full, the oldest answer is evicted first.
     * Lowering it evicts the oldest answers beyond the new bound.
     *
     * @throws {RangeError} On set, if the value isn't a positive integer.
     */
    get maxAgentCallCacheEntries() {
        return this._maxAgentCallCacheEntries;
    }
    set maxAgentCallCacheEntries(value) {
        assertMaxAgentCallCacheEntries(value);
        this._maxAgentCallCacheEntries = value;
        while (this.settledAgentCalls.size > value) {
            this.evictOldestAgentCall();
        }
    }
    evictOldestAgentCall() {
        const oldestKey = this.settledAgentCalls.keys().next().value;
        if (oldestKey !== undefined) {
            this.settledAgentCalls.delete(oldestKey);
        }
    }
    /**
     * Whether this surface has been disposed.
     */
    get disposed() {
        return this.isDisposed;
    }
    constructor(id,
    /**
     * Catalog that resolves components and functions that do not name a
     * catalog explicitly, or `undefined` when the surface names none.
     */
    defaultCatalog, availableCatalogsOrTheme = new Map(), themeOrSendDataModel = {}, sendDataModelOrDataModel = false, dataModel,
    /** Identifier of the root component on this surface (defaults to `'root'`). */
    rootId = 'root',
    /** Optional surface-level metadata for vendor extensions. */
    metadata, protocolVersion, maxAgentCallCacheEntries) {
        this.id = id;
        this.defaultCatalog = defaultCatalog;
        this.rootId = rootId;
        this._onAction = new EventEmitter();
        this._onError = new EventEmitter();
        this._onWarning = new EventEmitter();
        this._onMetadataChanged = new EventEmitter();
        /** Event source firing whenever an action is dispatched from this surface. */
        this.onAction = this._onAction;
        /** Event source firing whenever an error occurs on this surface. */
        this.onError = this._onError;
        /** Event source firing whenever a non-fatal warning occurs on this surface. */
        this.onWarning = this._onWarning;
        /** Event source firing whenever surface metadata changes. */
        this.onMetadataChanged = this._onMetadataChanged;
        /** Agent function calls awaiting a response, keyed by canonical call key. */
        this.inFlightAgentCalls = new Map();
        /**
         * Settled reactive agent function answers, keyed by canonical call key in
         * insertion (FIFO) order, bounded to `maxAgentCallCacheEntries` by evicting
         * the oldest entry first. Reading an entry doesn't move it.
         */
        this.settledAgentCalls = new Map();
        this._maxAgentCallCacheEntries = DEFAULT_MAX_AGENT_CALL_CACHE_ENTRIES;
        this.isDisposed = false;
        if (maxAgentCallCacheEntries !== undefined) {
            assertMaxAgentCallCacheEntries(maxAgentCallCacheEntries);
            this._maxAgentCallCacheEntries = maxAgentCallCacheEntries;
        }
        this._metadataSignal = signal(cloneMetadata(metadata));
        this.metadataSignal = computed(() => getValue(this._metadataSignal));
        this.protocolVersion = canonicalProtocolVersion(protocolVersion ?? defaultCatalog?.protocolVersion);
        let availableCatalogs;
        let theme = {};
        let sendDataModel = false;
        if (availableCatalogsOrTheme !== undefined &&
            availableCatalogsOrTheme !== null &&
            !(availableCatalogsOrTheme instanceof Map)) {
            if (typeof availableCatalogsOrTheme === 'object' &&
                !Array.isArray(availableCatalogsOrTheme)) {
                // Pre-1.0 (v0.9) signature:
                // `new SurfaceModel(id, catalog, theme, sendDataModel?, dataModel?)`.
                // A plain object in the third slot is the theme of a pre-1.0 caller,
                // which had no catalogs to pass here, so the arguments after it
                // shift by one as well.
                theme = availableCatalogsOrTheme;
                sendDataModel = themeOrSendDataModel === true;
                dataModel =
                    sendDataModelOrDataModel instanceof DataModel
                        ? sendDataModelOrDataModel
                        : undefined;
                availableCatalogs = undefined;
            }
            else {
                throw new TypeError('availableCatalogs must be a Map, or undefined/null. Note that availableCatalogs is now the 3rd argument to SurfaceModel and theme is the 4th argument.');
            }
        }
        else {
            availableCatalogs = availableCatalogsOrTheme;
            theme = themeOrSendDataModel ?? {};
            sendDataModel = Boolean(sendDataModelOrDataModel);
        }
        this.theme = theme;
        this.sendDataModel = sendDataModel;
        const catalogs = new Map(availableCatalogs ?? []);
        if (defaultCatalog?.id && !catalogs.has(defaultCatalog.id)) {
            catalogs.set(defaultCatalog.id, defaultCatalog);
        }
        this.availableCatalogs = catalogs;
        this.dataModel = dataModel ?? new DataModel({});
        this.componentsModel = new SurfaceComponentsModel(defaultCatalog);
    }
    /**
     * The surface's default catalog.
     *
     * @deprecated Use {@link defaultCatalog}. Renamed for symmetry with the other
     *   SDKs now that a surface can carry more than one catalog. This alias will
     *   be removed in a future release. Typed as always present because every
     *   pre-1.0 surface has a default catalog.
     */
    get catalog() {
        return this.defaultCatalog;
    }
    /**
     * Resolves the catalog that an item on this surface uses.
     *
     * An item that names a catalog uses that entry of {@link availableCatalogs};
     * one that names none uses the {@link defaultCatalog}. Both the message
     * processor, when validating a payload, and `DataContext`, when running a
     * function call, resolve catalogs through this method.
     *
     * @param catalogId Catalog the item names, or `undefined` when it names none.
     * @param subject Description of the item for error messages, such as
     *   `Function call 'formatDate'`.
     * @returns The catalog the item resolves to.
     * @throws {A2uiCatalogError} If the named catalog is not available on this
     *   surface, or if the item names none and the surface has no default
     *   catalog.
     */
    resolveCatalog(catalogId, subject = 'Item') {
        return resolveSurfaceCatalog(this, catalogId, subject);
    }
    /**
     * Sends a function call to the agent through {@link agentFunctionCaller}.
     *
     * For reactive bindings, a settled answer for the same catalog, function and
     * canonical arguments is returned from the surface cache, and a call
     * identical to one still awaiting its response shares that response instead
     * of sending another message, so re-evaluating a binding or flipping a bound
     * argument back does not repeat the request. Each caller receives its own
     * copy of a shared or cached answer. Failed calls are evicted on failure,
     * and imperative action calls (`bypassCache`) always execute fresh.
     *
     * Arguments that JSON cannot represent (such as `NaN`, a `Date` or an
     * `undefined` array element) fail the call locally; an `undefined` object
     * property is omitted.
     *
     * @param call The call to send, naming the catalog it resolved to.
     * @param options Optional settings: an `abortSignal`, and `bypassCache` for
     *   imperative action calls.
     * @returns A promise resolving to the agent's result.
     * @throws {A2uiRpcError} Through the returned promise, with code
     *   `CANCELLED`, if the surface is disposed, or is disposed or given another
     *   caller before the call is sent.
     * @throws {A2uiExpressionError} Through the returned promise, if no
     *   {@link agentFunctionCaller} is set or the arguments are not valid JSON.
     */
    callAgentFunction(call, options) {
        const abortSignal = options?.abortSignal;
        if (this.isDisposed) {
            return Promise.reject(new A2uiRpcError(`Surface '${this.id}' has been disposed.`, RpcErrorCode.CANCELLED));
        }
        const caller = this.agentFunctionCaller;
        if (!caller) {
            return Promise.reject(new A2uiExpressionError(`Function '${call['@call']}' is not implemented locally and surface '${this.id}' cannot call the agent.`, call['@call']));
        }
        if (abortSignal?.aborted) {
            return Promise.resolve(undefined);
        }
        let args;
        try {
            args = toJsonValue(call.args ?? {});
        }
        catch (e) {
            return Promise.reject(new A2uiExpressionError(`Arguments of function '${call['@call']}' are not valid JSON: ${e.message}.`, call['@call']));
        }
        call = { ...call, args };
        const bypassCache = Boolean(options?.bypassCache);
        const key = bypassCache ? undefined : canonicalJsonKey([call.catalogId, call['@call'], args]);
        if (key !== undefined) {
            const settled = this.settledAgentCalls.get(key);
            if (settled !== undefined) {
                // A hit doesn't move the entry: the oldest is evicted first.
                return Promise.resolve(cloneAnswer(settled.value));
            }
            const inFlight = this.inFlightAgentCalls.get(key);
            if (inFlight) {
                if (abortSignal) {
                    inFlight.signals.add(abortSignal);
                }
                else {
                    inFlight.hasUnabortedCaller = true;
                }
                return inFlight.promise.then(cloneAnswer);
            }
        }
        const entry = {
            promise: undefined,
            signals: new Set(abortSignal ? [abortSignal] : []),
            hasUnabortedCaller: !abortSignal,
        };
        const release = () => {
            if (key !== undefined && this.inFlightAgentCalls.get(key) === entry) {
                this.inFlightAgentCalls.delete(key);
            }
        };
        const pending = Promise.resolve().then(() => {
            if (this.isDisposed || this._agentFunctionCaller !== caller) {
                release();
                throw new A2uiRpcError(`Pending calls for surface '${this.id}' were cancelled.`, RpcErrorCode.CANCELLED);
            }
            if (!entry.hasUnabortedCaller && Array.from(entry.signals).every(s => s.aborted)) {
                release();
                return undefined;
            }
            return caller(call).then(val => {
                release();
                // An answer from a caller that has since been replaced or cleared
                // is not cached for the new one.
                if (key !== undefined && !this.isDisposed && this._agentFunctionCaller === caller) {
                    this.settledAgentCalls.delete(key);
                    while (this.settledAgentCalls.size >= this._maxAgentCallCacheEntries) {
                        this.evictOldestAgentCall();
                    }
                    this.settledAgentCalls.set(key, { value: cloneAnswer(val) });
                }
                return val;
            }, err => {
                release();
                throw err;
            });
        });
        entry.promise = pending;
        if (key !== undefined) {
            this.inFlightAgentCalls.set(key, entry);
            pending.then(release, release);
        }
        return pending;
    }
    /**
     * Synchronous snapshot of the surface's metadata envelope.
     */
    get metadata() {
        return peekValue(this._metadataSignal);
    }
    /**
     * Replaces the surface's metadata envelope, validating UAX #31 extension
     * keys and emitting changes when structurally modified.
     */
    set metadata(metadata) {
        const next = cloneMetadata(metadata);
        if (metadataEquals(peekValue(this._metadataSignal), next)) {
            return;
        }
        setValue(this._metadataSignal, next);
        void this._onMetadataChanged.emit(next);
    }
    /**
     * Convenience view of `metadata.extensions`.
     */
    get extensions() {
        return peekValue(this._metadataSignal)?.extensions;
    }
    /**
     * Sets a single extension entry on the surface metadata.
     *
     * Passing `undefined` removes the extension key. Passing `null` stores
     * `null` as an explicit JSON value.
     *
     * @param key Extension identifier (must satisfy UAX #31).
     * @param value Extension payload value.
     */
    setExtension(key, value) {
        if (value === undefined) {
            this.removeExtension(key);
            return;
        }
        const current = peekValue(this._metadataSignal);
        const nextExtensions = {
            ...(current?.extensions ?? {}),
            [key]: value,
        };
        this.metadata = {
            ...(current ?? {}),
            extensions: nextExtensions,
        };
    }
    /**
     * Removes an extension entry by key, clearing `metadata` to `undefined` when
     * no metadata entries remain.
     *
     * @param key Extension identifier to remove.
     */
    removeExtension(key) {
        const current = peekValue(this._metadataSignal);
        const currentExtensions = current?.extensions;
        if (!currentExtensions || !(key in currentExtensions)) {
            return;
        }
        const nextExtensions = { ...currentExtensions };
        delete nextExtensions[key];
        const rest = { ...current };
        delete rest.extensions;
        if (Object.keys(nextExtensions).length > 0) {
            this.metadata = { ...rest, extensions: nextExtensions };
        }
        else if (Object.keys(rest).length > 0) {
            this.metadata = rest;
        }
        else {
            this.metadata = undefined;
        }
    }
    /**
     * Dispatches an action from this surface to registered listeners.
     *
     * Resolves event action payload details, propagates any explicit `catalogId`
     * and `metadata`, and emits an `ActionPayload` via `onAction`. Local function
     * actions (`functionCall`) are executed locally and are not emitted as agent actions.
     *
     * `payload` may be pending, as the result of `DataContext.resolveAction` is
     * for an event action that waits on asynchronous calls, and its `context`
     * and `userMessage` may hold pending values; all are awaited before the
     * action is emitted. If any of them fails, nothing is emitted: a failure
     * that was already reported, or a cancelled agent call, is not reported
     * again, and any other rejection is reported as an `INVALID_ACTION`.
     *
     * A `userMessage` that is not a non-empty string is left out of the emitted
     * action, whether it was given directly or settled from a pending value.
     * `DataContext.resolveAction` is what reports an `INVALID_ACTION` for an
     * expression that does not resolve to a string.
     *
     * @param payload Action payload (name and context) to dispatch.
     * @param sourceComponentId Identifier of the component that triggered the action.
     * @param metadata Optional metadata envelope to attach to the outbound action.
     * @returns A promise that resolves once all registered listeners have processed the action.
     */
    async dispatchAction(payload, sourceComponentId, metadata) {
        try {
            if (isThenable(payload)) {
                payload = await payload;
            }
        }
        catch (e) {
            await this.reportUnresolvedAction(e);
            return;
        }
        if (!payload || typeof payload !== 'object') {
            return;
        }
        const eventPayload = extractActionTarget(payload);
        if (!eventPayload) {
            return;
        }
        const name = eventPayload.name;
        if (!name || typeof name !== 'string') {
            return;
        }
        let context = {};
        let resolvedUserMessage = undefined;
        try {
            const settledContext = settleDeep(eventPayload.context);
            const rawContext = isThenable(settledContext) ? await settledContext : settledContext;
            if (findFailedArgument(rawContext)) {
                return;
            }
            if (rawContext && typeof rawContext === 'object' && !Array.isArray(rawContext)) {
                context = rawContext;
            }
            if (eventPayload.userMessage !== undefined) {
                const settledMsg = settleDeep(eventPayload.userMessage);
                resolvedUserMessage = isThenable(settledMsg) ? await settledMsg : settledMsg;
                if (findFailedArgument(resolvedUserMessage)) {
                    return;
                }
            }
        }
        catch (e) {
            await this.reportUnresolvedAction(e);
            return;
        }
        const actionToDispatch = {
            name,
            surfaceId: this.id,
            sourceComponentId,
            timestamp: new Date().toISOString(),
            context,
        };
        // Only set the key when the payload named a catalog, so listeners can
        // distinguish an explicit override from default-catalog resolution.
        const catalogId = eventPayload.catalogId ?? payload.catalogId;
        if (typeof catalogId === 'string' && catalogId) {
            actionToDispatch.catalogId = catalogId;
        }
        if (typeof resolvedUserMessage === 'string' && resolvedUserMessage.length > 0) {
            actionToDispatch.userMessage = resolvedUserMessage;
        }
        const payloadMetadata = eventPayload.metadata ?? payload.metadata;
        const mergedMetadata = mergeActionMetadata(payloadMetadata, metadata);
        if (mergedMetadata !== undefined) {
            actionToDispatch.metadata = mergedMetadata;
        }
        await this._onAction.emit(actionToDispatch);
    }
    /**
     * Reports a pending action value that rejected, unless the rejection is the
     * cancellation of an agent call.
     */
    async reportUnresolvedAction(e) {
        if (isCancellation(e))
            return;
        await this.dispatchError({
            code: 'INVALID_ACTION',
            surfaceId: this.id,
            message: `Action could not be resolved: ${e?.message ?? String(e)}`,
        });
    }
    /**
     * Dispatches an error from this surface to registered listeners.
     *
     * @param error Error payload to dispatch, conforming to the renderer-to-agent schema.
     * @returns A promise that resolves once all registered listeners have processed the error.
     */
    async dispatchError(error) {
        await this._onError.emit({
            ...error,
            ...(error.functionCallId !== undefined ? {} : { surfaceId: this.id }),
        });
    }
    /**
     * Dispatches a non-fatal warning from this surface to registered listeners.
     *
     * @param warning The warning payload to dispatch.
     * @returns Promise that resolves once listeners have handled the warning.
     */
    async dispatchWarning(warning) {
        await this._onWarning.emit({
            ...warning,
            surfaceId: this.id,
        });
    }
    /**
     * Disposes the surface, data model, components, and event emitters.
     */
    dispose() {
        this.isDisposed = true;
        this._agentFunctionCaller = undefined;
        this.inFlightAgentCalls.clear();
        this.settledAgentCalls.clear();
        this.dataModel.dispose();
        this.componentsModel.dispose();
        this._onAction.dispose();
        this._onError.dispose();
        this._onWarning.dispose();
        this._onMetadataChanged.dispose();
    }
}
/** Default number of settled reactive agent call answers cached per surface. */
const DEFAULT_MAX_AGENT_CALL_CACHE_ENTRIES = 256;
/** Throws a `RangeError` unless `value` is a positive integer. */
function assertMaxAgentCallCacheEntries(value) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
        throw new RangeError('maxAgentCallCacheEntries must be a positive integer.');
    }
}
/**
 * Copies an agent answer so callers that share it, or read it from the cache,
 * cannot change each other's value by mutating it.
 */
function cloneAnswer(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    try {
        return structuredClone(value);
    }
    catch {
        // Not cloneable (such as a value holding a function): shared as it is.
        return value;
    }
}
/**
 * Whether an error is the cancellation of a pending agent call, which is not
 * reported.
 */
function isCancellation(e) {
    return e instanceof A2uiRpcError && e.code === RpcErrorCode.CANCELLED;
}
/**
 * Extracts the inner action target payload (`event` or direct action payload).
 *
 * @param payload Raw action payload object.
 * @returns The unwrapped action object, or `null` if none is present.
 */
function extractActionTarget(payload) {
    if ('event' in payload && payload.event && typeof payload.event === 'object') {
        return payload.event;
    }
    if ('name' in payload && typeof payload.name === 'string') {
        return payload;
    }
    return null;
}
