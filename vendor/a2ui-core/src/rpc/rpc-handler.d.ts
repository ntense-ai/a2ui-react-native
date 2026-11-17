import { Catalog } from '../catalog/types.js';
import { DataContext } from '../resolution/data-context.js';
import { FunctionCall } from '../v1_0/schema/common-types.js';
import { CallRendererFunctionMessage, AgentFunctionResponseMessage } from '../v1_0/schema/agent-to-renderer.js';
import { type ActionMessage, CallAgentFunctionMessage, RendererFunctionResponseMessage } from '../v1_0/schema/renderer-to-agent.js';
import type { A2uiClientAction } from '../v0_9/schema/client-to-server.js';
import type { RendererErrorMessage } from '../processing/message-error-mapper.js';
import { A2uiRpcError, RpcErrorCode } from '../errors.js';
export { A2uiRpcError, RpcErrorCode };
/**
 * Outbound renderer-to-agent action message envelope across v0.9, v0.9.1, and v1.0.
 */
export type OutboundActionMessage = (Omit<ActionMessage, 'action'> & {
    action: ActionMessage['action'] & {
        catalogId?: string;
    };
}) | {
    version: 'v0.9' | 'v0.9.1';
    action: A2uiClientAction & Pick<ActionMessage['action'], 'userMessage' | 'metadata'> & {
        catalogId?: string;
    };
};
/**
 * Callback function type receiving outbound renderer messages intended for the agent.
 */
export type OutboundMessageListener = (message: RendererFunctionResponseMessage | CallAgentFunctionMessage | OutboundActionMessage | RendererErrorMessage) => void | Promise<void>;
/**
 * Options for configuring an RpcHandler instance.
 */
export interface RpcHandlerOptions {
    /** Catalogs available for function resolution. */
    readonly catalogs: Catalog<any>[];
    /** Listener receiving outbound renderer messages. Required for callAgentFunction. */
    outboundListener?: OutboundMessageListener;
    /** Default timeout in milliseconds for callAgentFunction requests (default: 30000ms). */
    defaultTimeoutMs?: number;
}
/**
 * Options for configuring an outbound callAgentFunction request.
 */
export interface CallOptions {
    /** Explicit identifier for the function call. */
    functionCallId?: string;
    /** Timeout in milliseconds before rejecting with TIMEOUT. */
    timeoutMs?: number;
    /** Protocol version for the outbound message. */
    version?: string;
}
/**
 * Manages bidirectional RPC function execution between renderer and server agent.
 */
export declare class RpcHandler {
    private readonly catalogs;
    private outboundListener?;
    private readonly defaultTimeoutMs;
    private readonly pendingAgentCalls;
    private isDisposed;
    /**
     * Initializes a new `RpcHandler` instance with configuration options.
     *
     * @param options Configuration options including catalogs, outbound listener, and timeout.
     */
    constructor(options: RpcHandlerOptions);
    /**
     * Initializes a new `RpcHandler` instance with catalogs and an optional outbound listener.
     *
     * @param catalogs Catalogs available for function resolution.
     * @param outboundListener Optional callback receiving outbound renderer messages.
     */
    constructor(catalogs: Catalog<any>[], outboundListener?: OutboundMessageListener);
    /**
     * Whether this RPC handler has been disposed.
     */
    get disposed(): boolean;
    /**
     * Executes a remote renderer function requested by the server agent.
     *
     * @param message Inbound callRendererFunction message.
     * @param context DataContext for function execution.
     * @param isUserActivated Whether execution occurs in an active user gesture context.
     * @returns A promise resolving to the renderer function response message.
     */
    handleCallRendererFunction(message: CallRendererFunctionMessage, context?: DataContext, isUserActivated?: boolean): Promise<RendererFunctionResponseMessage>;
    /**
     * Processes an inbound agent function response to resolve or reject the matching pending outbound call.
     *
     * @param message Inbound agent function response message.
     */
    handleAgentFunctionResponse(message: AgentFunctionResponseMessage): void;
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
    callAgentFunction<T = unknown>(surfaceId: string, call: FunctionCall, options?: CallOptions): Promise<T>;
    /**
     * Cancels all pending agent function calls originating from the given surface.
     *
     * Each pending call is rejected with an `A2uiRpcError` whose code is
     * `CANCELLED`. `DataContext` does not report such a rejection, so a
     * renderer may call this to reset a surface that it keeps.
     *
     * @param surfaceId Identifier of the surface whose pending calls should be cancelled.
     */
    cancelSurfaceCalls(surfaceId: string): void;
    /**
     * Disposes the RPC handler: cancels all pending agent function calls with a
     * `CANCELLED` error, rejects later calls with `DISPOSED`, and removes the
     * outbound listener.
     *
     * @param reason Optional reason, added to the `CANCELLED` error messages.
     */
    dispose(reason?: string): void;
    /**
     * Sends an outbound renderer response message to the outbound listener.
     *
     * @param response Renderer function response message to transmit.
     */
    private emitOutboundResponse;
    /**
     * Validates an inbound renderer function call message.
     *
     * @param message Inbound message to validate.
     * @returns An error response if validation fails; otherwise `null`.
     */
    private validateInboundMessage;
    /**
     * Resolves the catalog and function implementation for the requested call.
     *
     * @param catalogId Optional catalog identifier specified in the call.
     * @param call Function name to resolve.
     * @param context Optional data context providing a default surface catalog.
     * @param expectedVersion Optional protocol version to check compatibility against.
     * @returns The resolved function implementation and catalog, or an error descriptor.
     */
    private resolveFunctionImplementation;
    /**
     * Ensures a valid DataContext is available for dynamic argument resolution and function execution.
     *
     * @param context Optional context supplied by the caller.
     * @param catalog Resolved target catalog.
     * @param functionCallId Function call identifier for fallback surface naming.
     * @returns A DataContext backed by the caller's surface or an isolated empty fallback surface.
     */
    private ensureDataContext;
    /**
     * Resolves dynamic values (`@path` bindings and `@call` expressions) inside function arguments.
     *
     * @param args Raw arguments dictionary from the call payload.
     * @param context DataContext used to evaluate dynamic expressions.
     * @param isUserActivated Whether execution occurs in an active user gesture context.
     * @returns The resolved arguments dictionary, or an error descriptor if expression evaluation fails.
     */
    private resolveDynamicArguments;
    /**
     * Verifies caller boundary permissions and user activation requirements for a function.
     *
     * @param funcImpl Function implementation to inspect.
     * @param call Function name being invoked.
     * @param isUserActivated Whether execution occurs within an active user gesture context.
     * @returns An error message if permissions are not satisfied; otherwise `null`.
     */
    private checkExecutionPermissions;
    /**
     * Validates and parses function arguments against the catalog function schema.
     *
     * @param catalog Catalog declaring the function.
     * @param _funcImpl Function implementation.
     * @param args Raw argument dictionary.
     * @param call Function name being invoked.
     * @returns Parsed arguments on success, or an error descriptor on validation failure.
     */
    private parseArguments;
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
    private executeFunctionSafely;
    /**
     * Generates a unique function call identifier.
     *
     * @returns A unique call identifier string.
     */
    private generateFunctionCallId;
    /**
     * Dispatches an outbound agent function call and registers a pending promise with timeout handling.
     *
     * @template T Expected return value type.
     * @param surfaceId Identifier of the surface initiating the call.
     * @param callInfo Normalized agent call parameters.
     * @returns A promise resolving to the agent function return value.
     */
    private dispatchAgentCall;
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
    private createTimeoutTimer;
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
    private sendOutboundMessage;
    /**
     * Extracts a human-readable message string from an unknown error value.
     *
     * @param err Unknown error caught in a try/catch block.
     * @returns Formatted error message string.
     */
    private extractErrorMessage;
    /**
     * Constructs a renderer function error response message.
     *
     * @param functionCallId Identifier of the function call that failed.
     * @param code RPC error code or string category.
     * @param message Human-readable error description.
     * @param version Protocol version string.
     * @returns Formatted renderer function response message containing the error.
     */
    private createResponseError;
}
