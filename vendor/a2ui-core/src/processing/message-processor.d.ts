import { SurfaceModel, ActionListener } from '../state/surface-model.js';
import { Catalog, ComponentApi } from '../catalog/types.js';
import { SurfaceGroupModel } from '../state/surface-group-model.js';
import { Subscription } from '../common/events.js';
import { RendererErrorMessage } from './message-error-mapper.js';
import { InternalOperation } from './operations.js';
import { ProtocolVersion, VersionAdapterResolver } from './adapters/base.js';
import { RendererCapabilities } from '../v1_0/schema/index.js';
import type { ServerToClientMessage as V08ServerToClientMessage } from '../v0_8/types/types.js';
import type { A2uiMessage as V09A2uiMessage, A2uiMessageListWrapper as V09A2uiMessageListWrapper } from '../v0_9/schema/server-to-client.js';
import type { AgentToRendererMessage as V10AgentToRendererMessage } from '../v1_0/schema/agent-to-renderer.js';
import type { RendererFunctionResponseMessage } from '../v1_0/schema/renderer-to-agent.js';
import type { FunctionCall } from '../v1_0/schema/common-types.js';
import { A2uiRpcError, CallOptions, type OutboundActionMessage, OutboundMessageListener, RpcErrorCode, RpcHandler } from '../rpc/index.js';
import { RELAXED_VALIDATION, STRICT_VALIDATION, ValidationConfig } from '../validation/integrity-checker.js';
/**
 * Union of individual message types supported by the MessageProcessor across protocol versions.
 */
export type ProcessableMessage = V08ServerToClientMessage | V09A2uiMessage | V10AgentToRendererMessage | InternalOperation;
/**
 * Valid payload format for `MessageProcessor.processMessages`, which can be a single message,
 * an array of messages, a message list wrapper, or an internal operation.
 */
export type ProcessableMessagePayload = ProcessableMessage | readonly ProcessableMessage[] | V09A2uiMessageListWrapper | {
    readonly messages: readonly ProcessableMessage[];
};
export type { RendererCapabilities, RendererCapabilities as ClientCapabilities, ValidationConfig, OutboundActionMessage, OutboundMessageListener, CallOptions, };
export { STRICT_VALIDATION, RELAXED_VALIDATION, A2uiRpcError, RpcErrorCode };
/**
 * Contextual execution options for message processing.
 */
export interface ExecutionContext {
    /** Whether execution occurs in an active user gesture context. */
    isUserActivated?: boolean;
    /**
     * The validation rules for this call, in place of the processor's own. The
     * rules the config leaves out default to the strict ones, as for
     * `MessageProcessorOptions.validationConfig`. An agent that checks its
     * messages against a renderer's processor passes the rules it checks by,
     * whatever rules the renderer was created with.
     */
    validationConfig?: ValidationConfig;
}
/**
 * Options for generating renderer capabilities.
 */
export interface CapabilitiesOptions {
    /**
     * Protocol versions to generate capabilities for. `getRendererCapabilities`
     * requires at least one; `getClientCapabilities` defaults to `['v0.9']`.
     */
    versions?: ProtocolVersion[];
    /**
     * Single protocol version to generate capabilities for.
     *
     * @deprecated Use `versions`. Kept for callers of the pre-1.0
     *   `getClientCapabilities({version})` signature.
     */
    version?: ProtocolVersion;
    /** Whether full definitions of all catalogs will be included inline. */
    includeInlineCatalogs?: boolean;
    /**
     * Base schema `$ref` to wrap component definitions in v0.8, v0.9 and v0.9.1
     * inline catalogs. Defaults to 'common_types.json#/$defs/ComponentCommon'.
     * From v1.0, inline catalogs are each catalog's `toJson()` document and this
     * option does not apply.
     */
    componentEnvelopeRef?: string;
}
/**
 * Options for configuring a MessageProcessor instance.
 */
export interface MessageProcessorOptions {
    /** Default protocol version to use for capability generation and data model reporting. Defaults to 'v0.9'. */
    version?: ProtocolVersion;
    /** Custom version adapter resolver or registry. Defaults to VersionAdapterFactory. */
    adapterRegistry?: VersionAdapterResolver;
    /** Validation configuration rules. */
    validationConfig?: ValidationConfig;
    /** Listener receiving outbound renderer messages intended for the agent. Required for callAgentFunction. */
    outboundListener?: OutboundMessageListener;
    /** Optional listener invoked with a structured outbound ErrorMessage whenever message processing fails. */
    errorHandler?: (error: RendererErrorMessage) => void;
    /** When true, processing errors are emitted to errorHandler/onError without re-throwing. */
    reportErrorsOnly?: boolean;
    /** Default timeout in milliseconds for callAgentFunction requests (default: 30000ms). */
    defaultTimeoutMs?: number;
    /**
     * The most settled agent function answers each surface caches (default:
     * 256), evicting the oldest first. Must be a positive integer.
     */
    maxAgentCallCacheEntries?: number;
    /**
     * When true, `outboundListener` also receives each action as an `action`
     * envelope and each processing error as an `error` envelope.
     * Requires `outboundListener`.
     */
    unifiedOutbound?: boolean;
}
import { formatZodIssue } from './format-zod-issue.js';
export { formatZodIssue };
/**
 * Central processor for A2UI protocol messages and surface state management.
 *
 * @template T Concrete type of the ComponentApi.
 */
export declare class MessageProcessor<T extends ComponentApi = ComponentApi> {
    private actionHandler?;
    readonly model: SurfaceGroupModel<T>;
    readonly rpc: RpcHandler;
    private readonly adapterRegistry;
    private readonly registeredCatalogs;
    /** The processor's own rules, or the rules of the call in progress. */
    private validationConfig?;
    private readonly defaultVersion?;
    private readonly errorHandler?;
    private readonly reportErrorsOnly;
    /** The settled agent call cache bound for the surfaces this processor creates. */
    private readonly maxAgentCallCacheEntries?;
    private readonly outboundListener?;
    private readonly unifiedOutbound;
    /** Whether outbound messages, and so `callAgentFunction`, can reach the agent. */
    private readonly hasOutboundListener;
    private disposed;
    /**
     * What the last check of each surface's components found, under a config
     * that defers the reference and reachability checks, with the number of
     * changes the components had seen once that batch was applied.
     */
    private readonly graphBounds;
    /**
     * Initializes a new `MessageProcessor` instance.
     *
     * @param catalogs List of available component catalogs.
     * @param actionHandler Global handler for actions dispatched from all surfaces.
     * @param options Configuration options for the processor.
     * @throws {RangeError} If `options.maxAgentCallCacheEntries` isn't a positive integer.
     * @throws {A2uiValidationError} If `options.unifiedOutbound` is true without `options.outboundListener`.
     */
    constructor(catalogs: Catalog<T, any>[], actionHandler?: ActionListener | undefined, options?: MessageProcessorOptions);
    /** The catalogs the processor was created with, in priority order. */
    get catalogs(): Catalog<T>[];
    /**
     * Invokes a remote function on the server agent using an options bag.
     *
     * @param surfaceId The ID of the surface requesting execution.
     * @param call The function call details.
     * @param options Optional invocation options (custom functionCallId, timeoutMs).
     * @returns A promise resolving to the agent function return value.
     */
    callAgentFunction<TRes = unknown>(surfaceId: string, call: FunctionCall, options?: CallOptions): Promise<TRes>;
    /**
     * Disposes the MessageProcessor, tearing down active surfaces and rejecting pending RPC calls.
     */
    dispose(): void;
    /**
     * Generates the renderer capabilities object for the current processor.
     *
     * @param options Configuration for capability generation.
     * @returns The capabilities object.
     */
    getRendererCapabilities(options: CapabilitiesOptions): RendererCapabilities;
    /**
     * Generates the client/renderer capabilities object for the current processor.
     *
     * @deprecated Use `getRendererCapabilities` instead.
     * @param options Configuration for capability generation. Defaults to
     *   `{versions: ['v0.9']}`, the only version the pre-1.0 method knew.
     * @returns The capabilities object.
     */
    getClientCapabilities(options?: CapabilitiesOptions): RendererCapabilities;
    /**
     * Generates a v1.0 inline catalog: the catalog's `toJson()` document with the
     * `catalogId` and bare semantic version `protocolVersion` that
     * `catalog_definition.json` requires, whatever the source document declared.
     *
     * @param catalog The catalog instance to serialize.
     * @returns The inline catalog document.
     */
    private generateInlineCatalog;
    /**
     * Generates a backwards-compatible inline catalog representation for v0.8/v0.9/v0.9.1.
     *
     * @param catalog The catalog instance to serialize.
     * @param componentEnvelopeRef Reference URI for the component base envelope.
     * @returns Pre-1.0 inline catalog object with array-based functions and flat theme properties.
     */
    private generateV09InlineCatalog;
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
    getRendererDataModel(version?: ProtocolVersion): Record<string, unknown> | undefined;
    /**
     * Aggregates active client/renderer data models.
     *
     * @deprecated Use `getRendererDataModel` instead.
     * @param version Optional target protocol version to format data models for.
     * @returns Serialized data model payload, or undefined if no matching surfaces exist.
     */
    getClientDataModel(version?: ProtocolVersion): Record<string, unknown> | undefined;
    /**
     * Resolves a relative path against a context path.
     *
     * @deprecated Use `DataModel.resolvePath` instead.
     * @param path The path to resolve.
     * @param contextPath The base path (optional).
     * @returns The resolved absolute path.
     */
    resolvePath(path: string, contextPath?: string): string;
    /**
     * Gets a read-only map of active surfaces managed by this processor.
     *
     * @returns Map of surface models keyed by surface identifier.
     */
    getSurfaces(): ReadonlyMap<string, SurfaceModel<T>>;
    /**
     * Retrieves an active surface by its ID.
     *
     * @param id The surface ID.
     * @returns The matching surface model, or undefined if not found.
     */
    getSurface(id: string): SurfaceModel<T> | undefined;
    /**
     * Subscribes to surface creation events.
     *
     * @param handler Callback invoked when a surface is created.
     * @returns A subscription object to unsubscribe.
     */
    onSurfaceCreated(handler: (surface: SurfaceModel<T>) => void): Subscription;
    /**
     * Subscribes to surface deletion events.
     *
     * @param handler Callback invoked when a surface is deleted.
     * @returns A subscription object to unsubscribe.
     */
    onSurfaceDeleted(handler: (id: string) => void): Subscription;
    /**
     * Processes a list of messages, a message wrapper, or raw operations synchronously.
     *
     * @param messages The messages or operations to process.
     * @param context Contextual execution options.
     */
    processMessages(messages: ProcessableMessagePayload, context?: ExecutionContext): void;
    /**
     * Processes one or more messages, catching any validation or processing errors
     * and returning them as spec-compliant outbound `RendererErrorMessage` objects instead
     * of throwing.
     *
     * @param messages Array of messages or single message payload to process.
     * @param context Optional execution context.
     * @returns Array of `RendererErrorMessage` envelopes produced by failed messages.
     */
    processMessagesWithErrors(messages: unknown, context?: ExecutionContext): RendererErrorMessage[];
    /**
     * Asynchronously processes messages, executing RPC calls and returning all produced responses.
     *
     * @param messages The messages or operations to process.
     * @param context Contextual execution options.
     * @returns Array of rendererFunctionResponse messages produced during execution.
     */
    processMessagesAsync(messages: ProcessableMessagePayload, context?: ExecutionContext): Promise<RendererFunctionResponseMessage[]>;
    private contextFromOperation;
    private handleProcessingError;
    private fallbackWireVersion;
    private forwardAction;
    private invokeOutboundListener;
    private extractSingleMessageOperations;
    /**
     * Runs `fn` under the validation config of `context`, if it has one.
     *
     * `fn` must be synchronous: the config of a call is in effect only until
     * `fn` returns, so an asynchronous call applies it around each synchronous
     * step.
     */
    private withValidationConfig;
    private prepareSingleItem;
    private prepareOperations;
    /**
     * Whether `messages` is a v0.9 payload that omits its `version`.
     *
     * Pre-1.0 renderers accepted such payloads, and agents written against them
     * still send them. The fallback applies only when every registered catalog
     * is pre-1.0 and validation is off, so a processor that handles v1.0
     * traffic keeps rejecting unversioned messages.
     */
    private isImplicitV09Payload;
    private validateTargetVersion;
    private applyStateOperation;
    /**
     * Resolves the DataContext for an inbound RPC callRendererFunction operation.
     *
     * @param op Operation containing optional surface, catalog, and function call identifiers.
     * @returns A DataContext attached to the requested surface, an isolated fallback surface when surfaceId is omitted, or undefined if surfaceId is not found.
     */
    private resolveRpcDataContext;
    /**
     * Processes a single canonical internal operation.
     *
     * @param op The internal operation to execute.
     * @param context Contextual execution options.
     */
    processOperation(op: InternalOperation, context?: ExecutionContext): void;
    private processOperationAsync;
    private validateSurfaceTheme;
    private processCreateSurfaceOp;
    private processDeleteSurfaceOp;
    private validateComponentProperties;
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
    private componentPayloadForValidation;
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
    private componentCatalogId;
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
    private componentLayout;
    /** Returns the schema of a component's type in `catalog`, if any. */
    private componentSchema;
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
    private resolveComponentCatalog;
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
    private validateSingleNestedCall;
    private resolveNestedCallCatalog;
    private validateExternalCatalogFunction;
    private validateNestedFunctionCalls;
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
    private resolveSurfaceItemCatalog;
    private applyComponentUpdate;
    private rebaseComponentValidationError;
    private validateComponentsBatch;
    private validateSurfaceComponentGraph;
    private processUpdateComponentsOp;
    private processUpdateDataModelOp;
}
