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
import { zodToJsonSchema } from 'zod-to-json-schema';
import { SurfaceModel } from '../state/surface-model.js';
import { exclusiveUnionOverride } from '../catalog/exclusive_union.js';
import { cleanSchemaNode } from '../catalog/schema_generator.js';
import { SurfaceGroupModel } from '../state/surface-group-model.js';
import { ComponentModel } from '../state/component-model.js';
import { DataModel } from '../state/data-model.js';
import { validateMetadata } from '../common/metadata.js';
import { atMixinKey, componentMixinLayout, componentPayloadState, routeLegacyCatalogId, splitComponentEnvelope, } from '../catalog/component_envelope.js';
import { batchWrite } from '../reactivity/signals.js';
import { A2uiCatalogError, A2uiDataError, A2uiError, A2uiIntegrityError, A2uiValidationError, } from '../errors.js';
import { extractEnvelopeErrorContext, mapErrorToRendererMessage, } from './message-error-mapper.js';
import { recordComponentGraphBound, validateComponentGraph, } from '../state/validation-helpers.js';
import { defaultVersionAdapterFactory } from './adapters/factory.js';
import { compareSemVer, isAtLeastVersion, toCanonicalVersion } from '../common/semver.js';
import { isInternalOperation, } from './operations.js';
import { isCatalogVersionCompatible, } from './adapters/base.js';
import { A2uiRpcError, RpcErrorCode, RpcHandler, } from '../rpc/index.js';
import { toOutboundActionMessage } from './outbound-envelope.js';
import { DataContext } from '../resolution/data-context.js';
import { RELAXED_PATH_PATTERN, RELAXED_VALIDATION, STRICT_VALIDATION, validateRecursionAndPaths, } from '../validation/integrity-checker.js';
export { STRICT_VALIDATION, RELAXED_VALIDATION, A2uiRpcError, RpcErrorCode };
import { formatZodIssue } from './format-zod-issue.js';
import { assertRendererMayCall, nestedCallRunsInCatalog, nonStringCatalogIdMessage, PayloadValidator, } from '../validation/payload-validator.js';
export { formatZodIssue };
/**
 * Central processor for A2UI protocol messages and surface state management.
 *
 * @template T Concrete type of the ComponentApi.
 */
export class MessageProcessor {
    /**
     * Initializes a new `MessageProcessor` instance.
     *
     * @param catalogs List of available component catalogs.
     * @param actionHandler Global handler for actions dispatched from all surfaces.
     * @param options Configuration options for the processor.
     * @throws {RangeError} If `options.maxAgentCallCacheEntries` isn't a positive integer.
     * @throws {A2uiValidationError} If `options.unifiedOutbound` is true without `options.outboundListener`.
     */
    constructor(catalogs, actionHandler, options) {
        this.actionHandler = actionHandler;
        this.disposed = false;
        /**
         * What the last check of each surface's components found, under a config
         * that defers the reference and reachability checks, with the number of
         * changes the components had seen once that batch was applied.
         */
        this.graphBounds = new WeakMap();
        const maxEntries = options?.maxAgentCallCacheEntries;
        if (maxEntries !== undefined &&
            (typeof maxEntries !== 'number' || !Number.isInteger(maxEntries) || maxEntries < 1)) {
            throw new RangeError('maxAgentCallCacheEntries must be a positive integer.');
        }
        if (options?.unifiedOutbound && !options?.outboundListener) {
            throw new A2uiValidationError('unifiedOutbound requires an outboundListener in MessageProcessorOptions.');
        }
        this.maxAgentCallCacheEntries = maxEntries;
        this.registeredCatalogs = catalogs;
        this.model = new SurfaceGroupModel();
        this.adapterRegistry = options?.adapterRegistry ?? defaultVersionAdapterFactory;
        this.defaultVersion = options?.version;
        this.errorHandler = options?.errorHandler;
        this.reportErrorsOnly = options?.reportErrorsOnly ?? false;
        this.outboundListener = options?.outboundListener;
        this.unifiedOutbound = Boolean(options?.unifiedOutbound);
        this.rpc = new RpcHandler({
            catalogs: this.registeredCatalogs,
            outboundListener: options?.outboundListener,
            defaultTimeoutMs: options?.defaultTimeoutMs,
        });
        this.hasOutboundListener = Boolean(options?.outboundListener);
        this.validationConfig = options?.validationConfig
            ? withStrictDefaults(options.validationConfig)
            : undefined;
        if (this.unifiedOutbound) {
            this.model.onAction.subscribe(action => {
                this.forwardAction(action);
            });
        }
        if (this.actionHandler) {
            this.model.onAction.subscribe(this.actionHandler);
        }
        this.model.onSurfaceDeleted.subscribe(surfaceId => {
            this.rpc.cancelSurfaceCalls(surfaceId);
        });
    }
    /** The catalogs the processor was created with, in priority order. */
    get catalogs() {
        return [...this.registeredCatalogs];
    }
    /**
     * Invokes a remote function on the server agent using an options bag.
     *
     * @param surfaceId The ID of the surface requesting execution.
     * @param call The function call details.
     * @param options Optional invocation options (custom functionCallId, timeoutMs).
     * @returns A promise resolving to the agent function return value.
     */
    callAgentFunction(surfaceId, call, options) {
        return this.rpc.callAgentFunction(surfaceId, call, options);
    }
    /**
     * Disposes the MessageProcessor, tearing down active surfaces and rejecting pending RPC calls.
     */
    dispose() {
        this.disposed = true;
        this.model.dispose();
        this.rpc.dispose();
    }
    /**
     * Generates the renderer capabilities object for the current processor.
     *
     * @param options Configuration for capability generation.
     * @returns The capabilities object.
     */
    getRendererCapabilities(options) {
        const versions = options?.versions ?? (options?.version ? [options.version] : undefined);
        if (!versions || versions.length === 0) {
            throw new A2uiValidationError('At least one protocol version must be provided in CapabilitiesOptions to generate renderer capabilities.');
        }
        const result = {};
        for (const ver of versions) {
            const versionCaps = {
                supportedCatalogIds: this.registeredCatalogs.map(c => c.id),
            };
            const inlineCatalogs = options?.includeInlineCatalogs
                ? this.registeredCatalogs.map(c => {
                    if (compareSemVer(ver, '1.0') >= 0) {
                        return this.generateInlineCatalog(c);
                    }
                    return this.generateV09InlineCatalog(c, options?.componentEnvelopeRef ?? 'common_types.json#/$defs/ComponentCommon');
                })
                : undefined;
            if (inlineCatalogs) {
                versionCaps.inlineCatalogs = inlineCatalogs;
            }
            result[ver] = versionCaps;
        }
        return result;
    }
    /**
     * Generates the client/renderer capabilities object for the current processor.
     *
     * @deprecated Use `getRendererCapabilities` instead.
     * @param options Configuration for capability generation. Defaults to
     *   `{versions: ['v0.9']}`, the only version the pre-1.0 method knew.
     * @returns The capabilities object.
     */
    getClientCapabilities(options) {
        const versions = options?.versions && options.versions.length > 0
            ? options.versions
            : [options?.version ?? 'v0.9'];
        return this.getRendererCapabilities({ ...options, versions });
    }
    /**
     * Generates a v1.0 inline catalog: the catalog's `toJson()` document with the
     * `catalogId` and bare semantic version `protocolVersion` that
     * `catalog_definition.json` requires, whatever the source document declared.
     *
     * @param catalog The catalog instance to serialize.
     * @returns The inline catalog document.
     */
    generateInlineCatalog(catalog) {
        const doc = catalog.toJson();
        doc.catalogId = catalog.id;
        const version = typeof doc.protocolVersion === 'string'
            ? doc.protocolVersion
            : (toCanonicalVersion(catalog.protocolVersion) ?? catalog.protocolVersion);
        doc.protocolVersion = version.trim().replace(/^[vV](?=\d)/, '');
        return doc;
    }
    /**
     * Generates a backwards-compatible inline catalog representation for v0.8/v0.9/v0.9.1.
     *
     * @param catalog The catalog instance to serialize.
     * @param componentEnvelopeRef Reference URI for the component base envelope.
     * @returns Pre-1.0 inline catalog object with array-based functions and flat theme properties.
     */
    generateV09InlineCatalog(catalog, componentEnvelopeRef = 'common_types.json#/$defs/ComponentCommon') {
        const components = {};
        for (const [name, comp] of catalog.components.entries()) {
            let props = {};
            let reqList = [];
            if (comp.schema && typeof comp.schema === 'object' && 'safeParse' in comp.schema) {
                const rawZod = zodToJsonSchema(comp.schema, {
                    target: 'jsonSchema2019-09',
                    $refStrategy: 'none',
                    override: exclusiveUnionOverride,
                });
                cleanSchemaNode(rawZod, undefined, { stripAdditionalProperties: true });
                props = rawZod.properties || {};
                reqList = Array.isArray(rawZod.required)
                    ? rawZod.required.filter(r => r !== 'component' && r !== 'id')
                    : [];
            }
            const { component: _ignoredComp, id: _ignoredId, ...sanitizedProps } = props;
            components[name] = {
                allOf: [
                    { $ref: componentEnvelopeRef },
                    {
                        properties: {
                            component: { const: name },
                            ...sanitizedProps,
                        },
                        required: ['component', ...reqList],
                    },
                ],
            };
        }
        const functions = [];
        for (const fn of catalog.functions.values()) {
            let paramSchema = { type: 'object', properties: {} };
            if (fn.schema && typeof fn.schema === 'object' && 'safeParse' in fn.schema) {
                const rawZod = zodToJsonSchema(fn.schema, {
                    target: 'jsonSchema2019-09',
                    $refStrategy: 'none',
                    override: exclusiveUnionOverride,
                });
                cleanSchemaNode(rawZod, undefined, { stripAdditionalProperties: true });
                paramSchema = rawZod;
            }
            functions.push({
                name: fn.name,
                ...(fn.description ? { description: fn.description } : {}),
                returnType: fn.returnType,
                parameters: paramSchema,
            });
        }
        let theme;
        if (catalog.themeSchema) {
            const rawTheme = zodToJsonSchema(catalog.themeSchema, {
                target: 'jsonSchema2019-09',
                $refStrategy: 'none',
                override: exclusiveUnionOverride,
            });
            cleanSchemaNode(rawTheme, undefined, { stripAdditionalProperties: true });
            theme = rawTheme.properties || undefined;
        }
        return {
            catalogId: catalog.id,
            ...(Object.keys(components).length > 0 ? { components } : {}),
            ...(functions.length > 0 ? { functions } : {}),
            ...(theme ? { theme } : {}),
        };
    }
    /**
     * Serializes active surface data models configured for client-to-agent reporting.
     *
     * If version is provided, returns data models only for surfaces compatible with that version.
     * If version is omitted:
     *   - Automatically derives the protocol version from the active surface(s) with sendDataModel.
     *   - If active surfaces have conflicting protocol versions, throws A2uiValidationError.
     *
     * @param version Optional target protocol version to filter surfaces.
     * @returns Serialized data model payload, or undefined if no matching surfaces exist.
     */
    getRendererDataModel(version) {
        const enabledSurfaces = Array.from(this.model.surfacesMap.values()).filter(s => s.sendDataModel);
        if (enabledSurfaces.length === 0) {
            return undefined;
        }
        if (version !== undefined) {
            const surfaces = {};
            for (const surface of enabledSurfaces) {
                const catVer = surface.protocolVersion;
                if (!catVer || isCatalogVersionCompatible(catVer, version)) {
                    surfaces[surface.id] = surface.dataModel.get('/');
                }
            }
            if (Object.keys(surfaces).length === 0) {
                return undefined;
            }
            return {
                version,
                surfaces,
            };
        }
        const versionsSet = new Set();
        for (const surface of enabledSurfaces) {
            if (surface.protocolVersion) {
                const canonical = toCanonicalVersion(surface.protocolVersion);
                const canonicalVer = (canonical
                    ? compareSemVer(canonical, '1.0') >= 0
                        ? canonical
                        : `v${canonical}`
                    : surface.protocolVersion);
                versionsSet.add(canonicalVer);
            }
        }
        if (versionsSet.size > 1) {
            throw new A2uiValidationError(`Multiple protocol versions detected among active surfaces: ${Array.from(versionsSet).sort().join(', ')}. ` +
                'Specify a target protocol version in getRendererDataModel(version).');
        }
        const verStr = versionsSet.size === 1 ? versionsSet.values().next().value : '1.0';
        const surfaces = {};
        for (const surface of enabledSurfaces) {
            surfaces[surface.id] = surface.dataModel.get('/');
        }
        return {
            version: verStr,
            surfaces,
        };
    }
    /**
     * Aggregates active client/renderer data models.
     *
     * @deprecated Use `getRendererDataModel` instead.
     * @param version Optional target protocol version to format data models for.
     * @returns Serialized data model payload, or undefined if no matching surfaces exist.
     */
    getClientDataModel(version) {
        return this.getRendererDataModel(version);
    }
    /**
     * Resolves a relative path against a context path.
     *
     * @deprecated Use `DataModel.resolvePath` instead.
     * @param path The path to resolve.
     * @param contextPath The base path (optional).
     * @returns The resolved absolute path.
     */
    resolvePath(path, contextPath) {
        return DataModel.resolvePath(path, contextPath);
    }
    /**
     * Gets a read-only map of active surfaces managed by this processor.
     *
     * @returns Map of surface models keyed by surface identifier.
     */
    getSurfaces() {
        return this.model.surfacesMap;
    }
    /**
     * Retrieves an active surface by its ID.
     *
     * @param id The surface ID.
     * @returns The matching surface model, or undefined if not found.
     */
    getSurface(id) {
        return this.model.getSurface(id);
    }
    /**
     * Subscribes to surface creation events.
     *
     * @param handler Callback invoked when a surface is created.
     * @returns A subscription object to unsubscribe.
     */
    onSurfaceCreated(handler) {
        return this.model.onSurfaceCreated.subscribe(handler);
    }
    /**
     * Subscribes to surface deletion events.
     *
     * @param handler Callback invoked when a surface is deleted.
     * @returns A subscription object to unsubscribe.
     */
    onSurfaceDeleted(handler) {
        return this.model.onSurfaceDeleted.subscribe(handler);
    }
    /**
     * Processes a list of messages, a message wrapper, or raw operations synchronously.
     *
     * @param messages The messages or operations to process.
     * @param context Contextual execution options.
     */
    processMessages(messages, context) {
        this.withValidationConfig(context, () => {
            const initialContext = extractEnvelopeErrorContext(Array.isArray(messages) ? messages[0] : messages, this.defaultVersion);
            let currentContext = initialContext;
            try {
                const operations = this.prepareOperations(messages, ctx => {
                    currentContext = ctx;
                });
                for (const op of operations) {
                    currentContext = this.contextFromOperation(op, initialContext);
                    this.processOperation(op, context);
                }
            }
            catch (err) {
                this.handleProcessingError(err, currentContext);
                if (!this.reportErrorsOnly) {
                    throw err;
                }
            }
        });
    }
    /**
     * Processes one or more messages, catching any validation or processing errors
     * and returning them as spec-compliant outbound `RendererErrorMessage` objects instead
     * of throwing.
     *
     * @param messages Array of messages or single message payload to process.
     * @param context Optional execution context.
     * @returns Array of `RendererErrorMessage` envelopes produced by failed messages.
     */
    processMessagesWithErrors(messages, context) {
        return this.withValidationConfig(context, () => {
            const items = Array.isArray(messages) ? messages : [messages];
            const errors = [];
            for (const item of items) {
                const itemEnvelopeContext = extractEnvelopeErrorContext(item, this.defaultVersion);
                let currentContext = itemEnvelopeContext;
                try {
                    const operations = this.prepareOperations(item, ctx => {
                        currentContext = ctx;
                    });
                    for (const op of operations) {
                        currentContext = this.contextFromOperation(op, itemEnvelopeContext);
                        this.processOperation(op, context);
                    }
                }
                catch (err) {
                    errors.push(this.handleProcessingError(err, currentContext));
                }
            }
            return errors;
        });
    }
    /**
     * Asynchronously processes messages, executing RPC calls and returning all produced responses.
     *
     * @param messages The messages or operations to process.
     * @param context Contextual execution options.
     * @returns Array of rendererFunctionResponse messages produced during execution.
     */
    async processMessagesAsync(messages, context) {
        const initialContext = extractEnvelopeErrorContext(Array.isArray(messages) ? messages[0] : messages, this.defaultVersion);
        let currentContext = initialContext;
        try {
            const operations = this.withValidationConfig(context, () => this.prepareOperations(messages, ctx => {
                currentContext = ctx;
            }));
            const responses = [];
            for (const op of operations) {
                currentContext = this.contextFromOperation(op, initialContext);
                const resp = await this.processOperationAsync(op, context);
                if (resp) {
                    responses.push(resp);
                }
            }
            return responses;
        }
        catch (err) {
            this.handleProcessingError(err, currentContext);
            if (!this.reportErrorsOnly) {
                throw err;
            }
            return [];
        }
    }
    contextFromOperation(op, fallback) {
        const opContext = op.envelopeContext ?? fallback;
        const surfaceId = 'surfaceId' in op && op.surfaceId ? op.surfaceId : opContext.surfaceId;
        const functionCallId = 'functionCallId' in op && op.functionCallId ? op.functionCallId : opContext.functionCallId;
        const opVersion = 'version' in op ? op.version : undefined;
        const surfaceVersion = surfaceId
            ? this.model.getSurface(surfaceId)?.protocolVersion
            : undefined;
        return {
            surfaceId,
            functionCallId,
            actionType: op.type,
            version: opVersion ?? surfaceVersion ?? opContext.version ?? this.defaultVersion,
        };
    }
    handleProcessingError(err, context) {
        const errorMsg = mapErrorToRendererMessage(err, context);
        const payload = {
            code: errorMsg.error.code,
            message: errorMsg.error.message,
            surfaceId: errorMsg.error.surfaceId,
            details: err instanceof A2uiValidationError ? err.details : undefined,
        };
        const surface = errorMsg.error.surfaceId
            ? this.model.getSurface(errorMsg.error.surfaceId)
            : undefined;
        if (surface) {
            surface.dispatchError(payload);
        }
        else {
            this.model.emitError(payload);
        }
        this.errorHandler?.(errorMsg);
        const isV08Action = context.actionType === 'beginRendering' ||
            context.actionType === 'surfaceUpdate' ||
            context.actionType === 'dataModelUpdate';
        const effectiveVersion = context.version ?? (isV08Action ? 'v0.8' : this.fallbackWireVersion());
        const outboundErrorMsg = effectiveVersion === context.version
            ? errorMsg
            : mapErrorToRendererMessage(err, { ...context, version: effectiveVersion });
        if (this.unifiedOutbound && compareSemVer(outboundErrorMsg.version, '0.8') !== 0) {
            this.invokeOutboundListener(outboundErrorMsg);
        }
        return errorMsg;
    }
    fallbackWireVersion() {
        if (this.defaultVersion && toCanonicalVersion(this.defaultVersion)) {
            return this.defaultVersion;
        }
        const allV08 = this.registeredCatalogs.length > 0 &&
            this.registeredCatalogs.every(c => c.protocolVersion !== undefined && compareSemVer(c.protocolVersion, '0.8') === 0);
        if (allV08) {
            return 'v0.8';
        }
        const allV1 = this.registeredCatalogs.length > 0 &&
            this.registeredCatalogs.every(c => c.protocolVersion !== undefined && isAtLeastVersion(c.protocolVersion, '1.0'));
        return allV1 ? '1.0' : 'v0.9';
    }
    forwardAction(action) {
        if (this.disposed || !this.outboundListener)
            return;
        const surfaceVersion = this.model.getSurface(action.surfaceId)?.protocolVersion;
        const version = surfaceVersion ?? this.fallbackWireVersion();
        const envelope = toOutboundActionMessage(action, version);
        if (envelope) {
            this.invokeOutboundListener(envelope);
        }
    }
    invokeOutboundListener(message) {
        if (this.disposed || !this.outboundListener)
            return;
        try {
            const result = this.outboundListener(message);
            if (result && typeof result.catch === 'function') {
                result.catch(() => { });
            }
        }
        catch {
            // Outbound listener errors must not break action dispatch or error handling.
        }
    }
    extractSingleMessageOperations(item) {
        const envelopeContext = extractEnvelopeErrorContext(item, this.defaultVersion);
        let adapter;
        try {
            adapter = this.adapterRegistry.resolveFromPayload(item);
        }
        catch (err) {
            if (this.isImplicitV09Payload(item)) {
                const hasV091 = this.catalogs.some(c => c.protocolVersion === '0.9.1' || c.protocolVersion === 'v0.9.1');
                adapter = this.adapterRegistry.getAdapter(hasV091 ? 'v0.9.1' : 'v0.9');
            }
            else {
                throw err;
            }
        }
        const itemOps = adapter.extractOperations(item, this.validationConfig);
        const itemVer = envelopeContext.version;
        for (const op of itemOps) {
            if (itemVer && toCanonicalVersion(itemVer)) {
                if (!('version' in op && op.version)) {
                    op.version = itemVer;
                }
            }
            op.envelopeContext = envelopeContext;
        }
        return itemOps;
    }
    /**
     * Runs `fn` under the validation config of `context`, if it has one.
     *
     * `fn` must be synchronous: the config of a call is in effect only until
     * `fn` returns, so an asynchronous call applies it around each synchronous
     * step.
     */
    withValidationConfig(context, fn) {
        const config = context?.validationConfig;
        if (!config)
            return fn();
        const own = this.validationConfig;
        this.validationConfig = withStrictDefaults(config);
        try {
            return fn();
        }
        finally {
            this.validationConfig = own;
        }
    }
    prepareSingleItem(item, onItemContext) {
        onItemContext?.(extractEnvelopeErrorContext(item, this.defaultVersion));
        if (this.validationConfig) {
            validateRecursionAndPaths(item);
        }
        if (this.validationConfig?.targetVersion) {
            this.validateTargetVersion(item);
        }
        if (isInternalOperation(item)) {
            return [item];
        }
        return this.extractSingleMessageOperations(item);
    }
    prepareOperations(messages, onItemContext) {
        if (!messages || (Array.isArray(messages) && messages.length === 0))
            return [];
        if (Array.isArray(messages)) {
            return messages.flatMap(item => this.prepareSingleItem(item, onItemContext));
        }
        return this.prepareSingleItem(messages, onItemContext);
    }
    /**
     * Whether `messages` is a v0.9 payload that omits its `version`.
     *
     * Pre-1.0 renderers accepted such payloads, and agents written against them
     * still send them. The fallback applies only when every registered catalog
     * is pre-1.0 and validation is off, so a processor that handles v1.0
     * traffic keeps rejecting unversioned messages.
     */
    isImplicitV09Payload(messages) {
        if (this.validationConfig ||
            this.catalogs.length === 0 ||
            this.catalogs.some(c => isAtLeastVersion(c.protocolVersion, '1.0'))) {
            return false;
        }
        let item = Array.isArray(messages) ? messages[0] : messages;
        if (typeof item === 'object' &&
            item !== null &&
            'messages' in item &&
            Array.isArray(item.messages)) {
            item = item.messages[0];
        }
        if (typeof item !== 'object' || item === null || 'version' in item) {
            return false;
        }
        return ['createSurface', 'updateComponents', 'updateDataModel', 'deleteSurface'].some(key => key in item);
    }
    validateTargetVersion(messages) {
        const expected = this.validationConfig?.targetVersion;
        if (!expected)
            return;
        const checkMsg = (msg) => {
            if (typeof msg === 'object' && msg !== null && 'version' in msg) {
                const msgVer = msg.version;
                if (msgVer) {
                    const normMsg = toCanonicalVersion(msgVer) ?? msgVer;
                    const normExpected = toCanonicalVersion(expected) ?? expected;
                    if (normMsg !== normExpected) {
                        throw new A2uiValidationError(`Message version '${msgVer}' does not match expected target version '${expected}'`);
                    }
                }
            }
        };
        if (Array.isArray(messages)) {
            for (const m of messages) {
                checkMsg(m);
            }
        }
        else {
            checkMsg(messages);
        }
    }
    applyStateOperation(op) {
        if (this.validationConfig?.allowedMessages &&
            !this.validationConfig.allowedMessages.includes(op.type)) {
            throw new A2uiValidationError(`Operation '${op.type}' is not permitted by ValidationConfig.allowedMessages`);
        }
        switch (op.type) {
            case 'createSurface':
                this.processCreateSurfaceOp(op);
                break;
            case 'deleteSurface':
                this.processDeleteSurfaceOp(op);
                break;
            case 'updateComponents':
                this.processUpdateComponentsOp(op);
                break;
            case 'updateDataModel':
                this.processUpdateDataModelOp(op);
                break;
            case 'agentFunctionResponse':
                this.rpc.handleAgentFunctionResponse({
                    version: (op.version ?? '1.0'),
                    agentFunctionResponse: {
                        functionCallId: op.functionCallId,
                        value: op.value,
                        error: op.error,
                    },
                });
                break;
            case 'callRendererFunction':
                break;
        }
    }
    /**
     * Resolves the DataContext for an inbound RPC callRendererFunction operation.
     *
     * @param op Operation containing optional surface, catalog, and function call identifiers.
     * @returns A DataContext attached to the requested surface, an isolated fallback surface when surfaceId is omitted, or undefined if surfaceId is not found.
     */
    resolveRpcDataContext(op) {
        if (op.surfaceId !== undefined) {
            const surface = this.model.surfacesMap.get(op.surfaceId);
            return surface ? new DataContext(surface, '/') : undefined;
        }
        const targetCatalog = op.catalogId
            ? this.registeredCatalogs.find(c => c.id === op.catalogId)
            : undefined;
        if (!targetCatalog) {
            return undefined;
        }
        const fallbackSurfaceId = `_rpc_fallback_${op.functionCallId || 'default'}`;
        const availableCatalogs = new Map();
        for (const cat of this.registeredCatalogs) {
            if (targetCatalog?.protocolVersion &&
                cat.protocolVersion &&
                isCatalogVersionCompatible(targetCatalog.protocolVersion, cat.protocolVersion)) {
                availableCatalogs.set(cat.id, cat);
            }
        }
        if (targetCatalog) {
            availableCatalogs.set(targetCatalog.id, targetCatalog);
        }
        return new DataContext(new SurfaceModel(fallbackSurfaceId, targetCatalog, availableCatalogs, undefined, undefined, undefined, undefined, undefined, undefined, this.maxAgentCallCacheEntries), '/');
    }
    /**
     * Processes a single canonical internal operation.
     *
     * @param op The internal operation to execute.
     * @param context Contextual execution options.
     */
    processOperation(op, context) {
        if (op.type === 'callRendererFunction') {
            const dataContext = this.resolveRpcDataContext(op);
            const isUserActivated = context?.isUserActivated ?? op.isUserActivated ?? false;
            const callMsg = {
                version: (op.version ?? '1.0'),
                callRendererFunction: {
                    ...(op.surfaceId !== undefined ? { surfaceId: op.surfaceId } : {}),
                    functionCallId: op.functionCallId,
                    callFunction: {
                        '@call': op.call,
                        catalogId: op.catalogId,
                        args: op.args,
                    },
                },
            };
            void this.rpc.handleCallRendererFunction(callMsg, dataContext, isUserActivated).catch(err => {
                console.error(`Unhandled error in callRendererFunction (${op.call}):`, err);
            });
            return;
        }
        this.withValidationConfig(context, () => this.applyStateOperation(op));
    }
    async processOperationAsync(op, context) {
        if (op.type === 'callRendererFunction') {
            const dataContext = this.resolveRpcDataContext(op);
            const isUserActivated = context?.isUserActivated ?? op.isUserActivated ?? false;
            const callMsg = {
                version: (op.version ?? '1.0'),
                callRendererFunction: {
                    ...(op.surfaceId !== undefined ? { surfaceId: op.surfaceId } : {}),
                    functionCallId: op.functionCallId,
                    callFunction: {
                        '@call': op.call,
                        catalogId: op.catalogId,
                        args: op.args,
                    },
                },
            };
            return await this.rpc.handleCallRendererFunction(callMsg, dataContext, isUserActivated);
        }
        this.withValidationConfig(context, () => this.applyStateOperation(op));
        return null;
    }
    validateSurfaceTheme(theme, catalog, surfaceId) {
        if (!theme || !catalog?.themeSchema) {
            return theme;
        }
        try {
            return new PayloadValidator(catalog, this.validationConfig).validateTheme(theme);
        }
        catch (err) {
            if (err instanceof A2uiValidationError) {
                const details = Array.isArray(err.details)
                    ? err.details.map(d => (typeof d === 'object' && d !== null ? { ...d, surfaceId } : d))
                    : err.details;
                throw new A2uiValidationError(err.message.replace(/^Validation failed for theme:/, `Validation failed for theme on surface '${surfaceId}':`), details, err.code, { path: err.path, surfaceId });
            }
            throw err;
        }
    }
    processCreateSurfaceOp(op) {
        const { surfaceId, catalogId, theme, sendDataModel, components, dataModel } = op;
        const msgVersion = op.version;
        // From v1.0 the default catalog is optional: a surface that names none has
        // none, and every component and function call on it names its own.
        const noDefaultCatalog = catalogId === undefined && msgVersion !== undefined && isAtLeastVersion(msgVersion, '1.0');
        const catalog = noDefaultCatalog
            ? undefined
            : resolveSurfaceDefaultCatalog(this.registeredCatalogs, catalogId, msgVersion);
        if (!catalog && !noDefaultCatalog) {
            if (catalogId !== undefined) {
                throw new A2uiCatalogError(`Catalog not found: ${catalogId}`, 'CATALOG_ERROR', { surfaceId });
            }
            throw new A2uiCatalogError(`No default catalog available for surface '${surfaceId}'.`, 'CATALOG_ERROR', { surfaceId });
        }
        if (catalog?.protocolVersion &&
            msgVersion &&
            !isCatalogVersionCompatible(catalog.protocolVersion, msgVersion)) {
            const mismatchMsg = `Surface '${surfaceId}' catalog '${catalogId ?? catalog.id}' specification version (${catalog.protocolVersion}) does not match message protocol version (${msgVersion}).`;
            if (isAtLeastVersion(msgVersion, '1.0')) {
                throw new A2uiCatalogError(mismatchMsg, 'CATALOG_ERROR', { surfaceId });
            }
            throw new A2uiValidationError(mismatchMsg, undefined, 'VALIDATION_ERROR', { surfaceId });
        }
        if (this.model.getSurface(surfaceId)) {
            throw new A2uiIntegrityError(`Surface ${surfaceId} already exists.`, undefined, 'INTEGRITY_ERROR', { surfaceId });
        }
        const validatedTheme = this.validateSurfaceTheme(theme, catalog, surfaceId);
        const surfaceVersion = msgVersion ?? catalog?.protocolVersion;
        // A payload may address any registered catalog by `catalogId`, but only
        // those speaking a compatible protocol version can be resolved against this
        // surface, so filter once here rather than at every lookup.
        const availableCatalogs = new Map(this.registeredCatalogs
            .filter(c => isCatalogVersionCompatible(c.protocolVersion, surfaceVersion))
            .map(c => [c.id, c]));
        const surface = new SurfaceModel(surfaceId, catalog, availableCatalogs, validatedTheme, sendDataModel ?? false, undefined, op.rootId ?? 'root', op.metadata, surfaceVersion, this.maxAgentCallCacheEntries);
        // From v1.0, a function the renderer does not implement runs on the agent.
        // Without an outbound listener there is no way to reach it, so such calls
        // keep failing locally.
        if (this.hasOutboundListener && isAtLeastVersion(surface.protocolVersion, '1.0')) {
            // A call that resumes after the surface was deleted (for example, an
            // action that awaited an argument) is cancelled instead of being sent.
            surface.agentFunctionCaller = call => this.model.getSurface(surfaceId) === surface
                ? this.rpc.callAgentFunction(surfaceId, call, { version: surface.protocolVersion })
                : Promise.reject(new A2uiRpcError(`Pending calls for surface '${surfaceId}' were cancelled.`, RpcErrorCode.CANCELLED));
        }
        this.model.addSurface(surface);
        try {
            if (dataModel) {
                for (const [key, value] of Object.entries(dataModel)) {
                    const escapedKey = key.replace(/~/g, '~0').replace(/\//g, '~1');
                    const path = `/${escapedKey}`;
                    try {
                        if (key === '') {
                            const currentRoot = (surface.dataModel.get('/') ?? {});
                            const nextRoot = { ...currentRoot };
                            if (value === undefined ||
                                (value === null && isAtLeastVersion(surface.protocolVersion, '1.0'))) {
                                delete nextRoot[''];
                            }
                            else {
                                nextRoot[''] = value;
                            }
                            surface.dataModel.set('/', nextRoot);
                        }
                        else {
                            surface.dataModel.set(path, value);
                        }
                    }
                    catch (err) {
                        if (err instanceof A2uiDataError && !err.surfaceId) {
                            err.surfaceId = surfaceId;
                        }
                        throw err;
                    }
                }
            }
            if (components && components.length > 0) {
                this.processUpdateComponentsOp({
                    type: 'updateComponents',
                    surfaceId,
                    components,
                });
            }
        }
        catch (err) {
            this.model.deleteSurface(surfaceId);
            throw err;
        }
    }
    processDeleteSurfaceOp(op) {
        if (!op.surfaceId)
            return;
        // Deleting the surface cancels its pending calls through the
        // `onSurfaceDeleted` subscription set up in the constructor.
        this.model.deleteSurface(op.surfaceId);
    }
    validateComponentProperties(comp, surface) {
        const { id, component } = comp;
        if (typeof id !== 'string' || !id) {
            throw new A2uiValidationError(`Component '${component}' is missing an 'id'; entries require a valid string 'id'.`);
        }
        const targetCatalog = this.resolveComponentCatalog(comp, surface);
        // From v1.0 `@metadata` (or a legacy bare `metadata` the component's schema
        // doesn't declare) is the component's envelope metadata. Below v1.0 a
        // `metadata` is an ordinary property, checked by the component's schema.
        if (isAtLeastVersion(surface.protocolVersion, '1.0')) {
            const { mixins } = splitComponentEnvelope(comp, this.componentLayout(comp, surface, targetCatalog));
            validateMetadata(mixins.metadata?.value);
        }
        // A partial update names no component type; the existing model supplies it.
        const existing = surface.componentsModel.get(id);
        // Pre-1.0 renderers checked nested calls only when validation was turned
        // on, so a pre-1.0 surface without a `validationConfig` keeps that
        // behavior and resolves unknown functions at evaluation time instead.
        const skipNestedFunctions = !this.validationConfig && !isAtLeastVersion(surface.protocolVersion, '1.0');
        new PayloadValidator(targetCatalog, this.validationConfig).validateComponent(this.componentPayloadForValidation(comp, surface, targetCatalog), existing?.type, { skipNestedFunctions });
        if (skipNestedFunctions)
            return;
        // `validateComponent` walks the nested calls, even in a component type
        // the catalog doesn't define, and checks those that run in the
        // component's catalog; the pass below checks the rest.
        this.validateNestedFunctionCalls(comp, surface, targetCatalog);
    }
    /**
     * Builds the component payload handed to `PayloadValidator`, telling it
     * which catalog the component is in.
     *
     * From v1.0 a function call that names no `catalogId` runs in the surface
     * default catalog. The validator takes a component that names no
     * `catalogId` to be in the surface default, so the payload names the
     * component's catalog only when that catalog is another one; the validator
     * then leaves those calls to `validateNestedFunctionCalls`, which checks
     * them against the surface default. Whether the payload itself wrote a
     * `catalogId` doesn't matter: a component naming the surface default is in
     * it all the same.
     *
     * @param comp Raw component payload.
     * @param surface Surface the component belongs to.
     * @param componentCatalog Catalog the component resolved to.
     * @returns The payload to validate.
     */
    componentPayloadForValidation(comp, surface, componentCatalog) {
        // Below v1.0 a `catalogId` is an ordinary property, checked by the
        // component's schema.
        if (!isAtLeastVersion(surface.protocolVersion, '1.0'))
            return comp;
        // A component naming its catalog with a non-string resolved to the
        // surface default; the validator rejects the value as written.
        const namedCatalogId = this.componentCatalogId(comp, surface);
        if (namedCatalogId !== undefined && typeof namedCatalogId !== 'string')
            return comp;
        const catalogKey = atMixinKey('catalogId');
        const { [catalogKey]: _catalogId, ...payload } = comp;
        if (comp[catalogKey] === undefined && namedCatalogId !== undefined) {
            // A legacy bare `catalogId` the component's schema doesn't declare.
            delete payload['catalogId'];
        }
        if (componentCatalog !== surface.defaultCatalog) {
            payload[catalogKey] = componentCatalog.id;
        }
        return payload;
    }
    /**
     * Returns the catalog a v1.0 component object names: its `@catalogId`, or
     * else a legacy bare `catalogId` that the component's schema in the
     * surface's default catalog doesn't declare as its own property.
     *
     * @param comp Raw component payload.
     * @param surface Surface the component belongs to.
     * @returns The catalog the component names, or `undefined` if it names
     *   none or the surface is below v1.0, which has no per-component catalog.
     */
    componentCatalogId(comp, surface) {
        if (!isAtLeastVersion(surface.protocolVersion, '1.0'))
            return undefined;
        const atCatalogId = comp[atMixinKey('catalogId')];
        if (atCatalogId !== undefined)
            return atCatalogId;
        const bareCatalogId = comp['catalogId'];
        if (bareCatalogId === undefined)
            return undefined;
        const layout = this.componentLayout(comp, surface, surface.defaultCatalog);
        return layout.customKeys.has('catalogId') ? undefined : bareCatalogId;
    }
    /**
     * Returns how a component's schema declares the envelope mixins.
     *
     * A legacy bare `catalogId` that routed the component, because its schema
     * in the surface's default catalog doesn't declare one, is the mixin here
     * too, even if the schema in `catalog` declares a `catalogId` property.
     *
     * @param comp Raw component payload.
     * @param surface Surface the component belongs to.
     * @param catalog Catalog the component resolves to, if known.
     * @returns The component's mixin layout.
     */
    componentLayout(comp, surface, catalog) {
        const layout = componentMixinLayout(this.componentSchema(comp, surface, catalog));
        if (catalog === surface.defaultCatalog)
            return layout;
        return routeLegacyCatalogId(layout, comp, this.componentSchema(comp, surface, surface.defaultCatalog));
    }
    /** Returns the schema of a component's type in `catalog`, if any. */
    componentSchema(comp, surface, catalog) {
        const { id, component } = comp;
        const type = typeof component === 'string' && component
            ? component
            : typeof id === 'string'
                ? surface.componentsModel.get(id)?.type
                : undefined;
        return type ? catalog?.components.get(type)?.schema : undefined;
    }
    /**
     * Resolves the catalog that defines a component in an update.
     *
     * The component uses the catalog it names, and otherwise the surface's
     * default catalog. Below v1.0 only, an existing component updated without a
     * new type keeps its catalog; from v1.0 every update is a full replacement
     * and resolves afresh.
     *
     * @param comp Raw component payload.
     * @param surface Surface the component belongs to.
     * @returns The catalog that defines the component.
     * @throws {A2uiCatalogError} If the named catalog is unknown or speaks an
     *   incompatible protocol version, or if the component names no catalog and
     *   the surface has no default catalog.
     */
    resolveComponentCatalog(comp, surface) {
        const { id, component } = comp;
        const subject = `Component '${id}'`;
        const atLeastV1 = isAtLeastVersion(surface.protocolVersion, '1.0');
        // Only from v1.0 can a component name a catalog, and an empty catalogId
        // names a catalog too (one that never exists).
        const catalogId = this.componentCatalogId(comp, surface);
        if (typeof catalogId === 'string') {
            return this.resolveSurfaceItemCatalog(surface, catalogId, subject);
        }
        if (!atLeastV1) {
            const existing = typeof id === 'string' ? surface.componentsModel.get(id) : undefined;
            if (existing &&
                (typeof component !== 'string' || !component || component === existing.type)) {
                return existing.catalog;
            }
        }
        return this.resolveSurfaceItemCatalog(surface, undefined, subject);
    }
    /**
     * Validates each v1.0 function call nested in a component against the
     * catalog it resolves to on the surface.
     *
     * Each call resolves on its own, by the `catalogId` it names or else to
     * the surface's default catalog, whatever catalog an enclosing call or the
     * component names, so a call may run in a catalog other than the
     * component's. This pass resolves every call's catalog and checks the
     * calls that run outside the component's catalog: the renderer makes them,
     * so they may not call an `agentOnly` function, and their arguments must
     * match the function's definition. Component validation, which runs first
     * and walks every nested call, has already checked the others, as decided
     * by `nestedCallRunsInCatalog`.
     * Reserved `@` system functions belong to no catalog and are validated by
     * `PayloadValidator`; their arguments are still walked here.
     *
     * Catalog resolution runs even without a `validationConfig`, so a call no
     * catalog on the surface can run is always rejected before state changes.
     *
     * @param comp Raw component payload.
     * @param surface Surface the component belongs to.
     * @param componentCatalog Catalog the component resolved to.
     * @throws {A2uiCatalogError} If a call's catalog cannot be resolved.
     * @throws {A2uiValidationError} If a call fails validation against the
     *   catalog it resolves to.
     */
    validateSingleNestedCall(record, name, surface, componentCatalog, currentPath) {
        const rawCatalogId = record['catalogId'];
        if (rawCatalogId !== undefined && typeof rawCatalogId !== 'string') {
            throw new A2uiValidationError(nonStringCatalogIdMessage(name), undefined, 'VALIDATION_ERROR', { path: currentPath || undefined, surfaceId: surface.id });
        }
        const target = this.resolveNestedCallCatalog(surface, rawCatalogId, name, currentPath);
        const checked = nestedCallRunsInCatalog(rawCatalogId, componentCatalog.id, {
            catalogIsDefault: componentCatalog === surface.defaultCatalog,
        });
        if (!checked) {
            this.validateExternalCatalogFunction(target, name, record['args'], surface.id, currentPath);
        }
    }
    resolveNestedCallCatalog(surface, catalogId, name, currentPath) {
        try {
            return this.resolveSurfaceItemCatalog(surface, catalogId, `Function call '${name}'`);
        }
        catch (err) {
            if (err instanceof A2uiError) {
                err.surfaceId = surface.id;
                if (currentPath)
                    err.path = currentPath;
            }
            throw err;
        }
    }
    validateExternalCatalogFunction(target, name, rawArgs, surfaceId, currentPath) {
        try {
            // `allowedCallers` arrived in v1.0, as `PayloadValidator` also assumes.
            if (isAtLeastVersion(target.protocolVersion, '1.0')) {
                assertRendererMayCall(target, name);
            }
            new PayloadValidator(target, this.validationConfig).validateFunction(name, (rawArgs ?? {}));
        }
        catch (err) {
            if (err instanceof A2uiError) {
                err.surfaceId = surfaceId;
                if (currentPath) {
                    err.path = err.path && err.path !== '/' ? `${currentPath}${err.path}` : currentPath;
                }
            }
            throw err;
        }
    }
    validateNestedFunctionCalls(comp, surface, componentCatalog) {
        if (!isAtLeastVersion(surface.protocolVersion, '1.0'))
            return;
        const visit = (node, currentPath) => {
            if (Array.isArray(node)) {
                for (let i = 0; i < node.length; i++) {
                    visit(node[i], `${currentPath}/${i}`);
                }
                return;
            }
            if (typeof node !== 'object' || node === null)
                return;
            const record = node;
            const name = record['@call'];
            if (typeof name === 'string' && !name.startsWith('@')) {
                this.validateSingleNestedCall(record, name, surface, componentCatalog, currentPath);
            }
            for (const [k, v] of Object.entries(record)) {
                visit(v, `${currentPath}/${k}`);
            }
        };
        // `@catalogId` and `@metadata` hold no calls; the component's own
        // properties, `@accessibility` and `@checks` may.
        const { properties, mixins } = splitComponentEnvelope(comp, this.componentLayout(comp, surface, componentCatalog));
        for (const [key, value] of Object.entries(properties)) {
            visit(value, `/${key}`);
        }
        for (const mixin of [mixins.accessibility, mixins.checks]) {
            if (mixin)
                visit(mixin.value, `/${mixin.wireKey}`);
        }
    }
    /**
     * Resolves the catalog an item on a surface uses: the catalog it names, or
     * else the surface's default catalog.
     *
     * Delegates to `SurfaceModel.resolveCatalog`, which `DataContext` also uses
     * at runtime, so validation and execution share one rule and one set of
     * error messages. It first reports a catalog the processor knows yet the
     * surface cannot use because its protocol version differs.
     *
     * @param surface Surface the item belongs to.
     * @param catalogId Catalog the item names, if any.
     * @param subject Description of the item for error messages.
     * @returns The catalog the item resolves to.
     * @throws {A2uiCatalogError} If the item's catalog cannot be resolved.
     */
    resolveSurfaceItemCatalog(surface, catalogId, subject) {
        if (catalogId !== undefined && !surface.availableCatalogs.has(catalogId)) {
            const known = this.registeredCatalogs.find(c => c.id === catalogId);
            if (known) {
                throw new A2uiCatalogError(`${subject} names catalog '${catalogId}', whose specification version (${known.protocolVersion}) does not match surface '${surface.id}' version (${surface.protocolVersion}).`);
            }
        }
        return surface.resolveCatalog(catalogId, subject);
    }
    applyComponentUpdate(comp, surface) {
        const { id, component } = comp;
        if (typeof id !== 'string')
            return;
        const targetCatalog = this.resolveComponentCatalog(comp, surface);
        const state = componentPayloadState(comp, surface.protocolVersion, this.componentSchema(comp, surface, targetCatalog), { defaultCatalogSchema: this.componentSchema(comp, surface, surface.defaultCatalog) });
        const properties = state.properties;
        const metadata = extractComponentMetadata(state.metadata);
        const existing = surface.componentsModel.get(id);
        if (existing) {
            const componentType = typeof component === 'string' ? component : existing.type;
            if (componentType !== existing.type || existing.catalog.id !== targetCatalog.id) {
                // Recreate the component if its type or catalog changes. From v1.0 an
                // update naming no catalogId can move it to the surface default.
                surface.componentsModel.removeComponent(id);
                const newComponent = new ComponentModel(id, componentType, properties, targetCatalog, metadata);
                surface.componentsModel.addComponent(newComponent);
            }
            else {
                batchWrite(() => {
                    existing.applyUpdate(properties, metadata);
                });
            }
        }
        else {
            if (typeof component !== 'string' || !component) {
                throw new A2uiValidationError(`Cannot create component ${id} without a type.`);
            }
            const newComponent = new ComponentModel(id, component, properties, targetCatalog, metadata);
            surface.componentsModel.addComponent(newComponent);
        }
    }
    rebaseComponentValidationError(err, index, surfaceId) {
        if (!(err instanceof A2uiError))
            return;
        if (!err.surfaceId)
            err.surfaceId = surfaceId;
        if (!(err instanceof A2uiValidationError))
            return;
        err.path =
            err.path && err.path !== '/' ? `/components/${index}${err.path}` : `/components/${index}`;
        if (Array.isArray(err.details)) {
            for (const d of err.details) {
                if (typeof d === 'object' && d !== null && !('surfaceId' in d)) {
                    d.surfaceId = surfaceId;
                }
            }
        }
    }
    validateComponentsBatch(op, surface) {
        const seenBatchIds = new Set();
        for (let i = 0; i < op.components.length; i++) {
            const comp = op.components[i];
            if (comp && typeof comp === 'object' && typeof comp.id === 'string') {
                if (seenBatchIds.has(comp.id)) {
                    throw new A2uiIntegrityError(`Duplicate component ID: '${comp.id}'`, [comp.id], 'INTEGRITY_ERROR', { surfaceId: op.surfaceId, path: `/components/${i}/id` });
                }
                seenBatchIds.add(comp.id);
            }
            try {
                this.validateComponentProperties(comp, surface);
            }
            catch (err) {
                this.rebaseComponentValidationError(err, i, op.surfaceId);
                throw err;
            }
        }
    }
    validateSurfaceComponentGraph(op, surface) {
        try {
            return validateComponentGraph(surface, op.components, this.validationConfig, (comp, s) => this.resolveComponentCatalog(comp, s), this.graphBounds);
        }
        catch (err) {
            if (err instanceof A2uiError && !err.surfaceId) {
                err.surfaceId = op.surfaceId;
            }
            throw err;
        }
    }
    processUpdateComponentsOp(op) {
        if (!op.surfaceId)
            return;
        const surface = this.model.getSurface(op.surfaceId);
        if (!surface) {
            throw new A2uiIntegrityError(`Surface not found for message: ${op.surfaceId}`, undefined, 'INTEGRITY_ERROR', { surfaceId: op.surfaceId });
        }
        // 1. Validation pass: validate all components before mutating state
        this.validateComponentsBatch(op, surface);
        const bound = this.validateSurfaceComponentGraph(op, surface);
        // 2. Mutation pass: apply state updates
        batchWrite(() => {
            for (const comp of op.components) {
                this.applyComponentUpdate(comp, surface);
            }
        });
        if (bound) {
            recordComponentGraphBound(surface.componentsModel, bound, this.graphBounds);
        }
    }
    processUpdateDataModelOp(op) {
        if (!op.surfaceId)
            return;
        const surface = this.model.getSurface(op.surfaceId);
        if (!surface) {
            throw new A2uiIntegrityError(`Surface not found for message: ${op.surfaceId}`, undefined, 'INTEGRITY_ERROR', { surfaceId: op.surfaceId });
        }
        if (op.path !== undefined &&
            op.path !== '' &&
            (!op.path.startsWith('/') || !RELAXED_PATH_PATTERN.test(op.path))) {
            const msg = `Invalid path syntax: '${op.path}' (path must be a valid RFC 6901 JSON Pointer starting with '/')`;
            throw new A2uiValidationError(msg, [{ path: '/path', code: 'invalid_value', message: msg, surfaceId: op.surfaceId }], 'VALIDATION_ERROR', { path: '/path', surfaceId: op.surfaceId });
        }
        const path = op.path || '/';
        const value = op.value;
        try {
            surface.dataModel.set(path, value);
        }
        catch (err) {
            if (err instanceof A2uiDataError && !err.surfaceId) {
                err.surfaceId = op.surfaceId;
            }
            throw err;
        }
    }
}
function extractComponentMetadata(rawMetadata) {
    if (rawMetadata && typeof rawMetadata === 'object' && !Array.isArray(rawMetadata)) {
        return rawMetadata;
    }
    return undefined;
}
function resolveSurfaceDefaultCatalog(catalogs, catalogId, msgVersion) {
    if (catalogId !== undefined) {
        return catalogs.find(c => c.id === catalogId);
    }
    return (catalogs.find(c => msgVersion ? isCatalogVersionCompatible(c.protocolVersion, msgVersion) : true) ?? catalogs[0]);
}
/** A config with the checks it leaves out set to the strict ones. */
function withStrictDefaults(config) {
    return {
        allowOrphanComponents: false,
        allowDanglingReferences: false,
        allowMissingRoot: false,
        allowUnknownElements: false,
        ...config,
    };
}
