/**
 * Structured validation or processing error detail for a specific field path.
 */
export interface A2uiErrorDetail {
    /** RFC 6901 JSON Pointer path to the offending field. */
    path: string;
    /** Machine-readable error code. */
    code: string;
    /** Human-readable error message. */
    message: string;
    /** Optional target surface identifier. */
    surfaceId?: string;
}
/**
 * Optional context metadata for A2UI errors.
 */
export interface A2uiErrorContext {
    /** RFC 6901 JSON Pointer path to the offending field. */
    path?: string;
    /** Target surface identifier. */
    surfaceId?: string;
    /** Correlated RPC function call identifier. */
    functionCallId?: string;
}
/**
 * Base class for all A2UI specific errors.
 *
 * Includes a machine-readable `code` for categorical handling and ensures
 * proper stack trace capturing.
 *
 * @example
 * ```ts
 * throw new A2uiError('Failed to process payload', 'PROCESSING_ERROR');
 * ```
 */
export declare class A2uiError extends Error {
    /** Machine-readable string identifying the error category. */
    readonly code: string;
    /** Optional RFC 6901 JSON Pointer path to the offending field. */
    path?: string;
    /** Optional target surface identifier. */
    surfaceId?: string;
    /** Optional correlated RPC function call identifier. */
    functionCallId?: string;
    /**
     * Initializes a new `A2uiError` instance.
     *
     * @param message Human-readable error description.
     * @param code Machine-readable error category code.
     * @param context Optional error context metadata (path, surfaceId, functionCallId).
     */
    constructor(message: string, code?: string, context?: A2uiErrorContext);
}
/**
 * Error thrown when JSON validation fails or schema validation mismatches occur.
 */
export declare class A2uiValidationError extends A2uiError {
    readonly details?: any | undefined;
    /**
     * Initializes a new `A2uiValidationError` instance.
     *
     * @param message Error description detailing the validation failure.
     * @param details Additional error context or Zod validation issues.
     * @param code Optional error category code.
     * @param context Optional error context metadata.
     */
    constructor(message: string, details?: any | undefined, code?: string, context?: A2uiErrorContext);
}
/**
 * Error thrown during DataModel mutations (invalid paths, type mismatches).
 */
export declare class A2uiDataError extends A2uiError {
    /**
     * Initializes a new `A2uiDataError` instance.
     *
     * @param message Error description.
     * @param path Target data model path where the mutation failed.
     * @param surfaceId Optional target surface identifier.
     */
    constructor(message: string, path?: string, surfaceId?: string);
}
/**
 * Error thrown during string interpolation and function evaluation.
 */
export declare class A2uiExpressionError extends A2uiError {
    readonly expression?: string | undefined;
    readonly details?: any | undefined;
    /**
     * Initializes a new `A2uiExpressionError` instance.
     *
     * @param message Error description.
     * @param expression Evaluated expression string.
     * @param details Additional error details.
     * @param context Optional error context metadata.
     */
    constructor(message: string, expression?: string | undefined, details?: any | undefined, context?: A2uiErrorContext);
}
/**
 * Error thrown for structural issues in the UI tree (missing surfaces, duplicate components).
 */
export declare class A2uiStateError extends A2uiError {
    /**
     * Initializes a new `A2uiStateError` instance.
     *
     * @param message Error description.
     * @param context Optional error context metadata.
     */
    constructor(message: string, context?: A2uiErrorContext);
}
/**
 * Error thrown during catalog management, loading, or resolution.
 *
 * Raised when a catalog declares no protocol version, fails schema validation,
 * or when a function call or component references an unresolvable catalog ID.
 */
export declare class A2uiCatalogError extends A2uiError {
    /**
     * Initializes a new `A2uiCatalogError` instance.
     *
     * @param message Human-readable error description.
     * @param code Machine-readable error category code. Defaults to `'CATALOG_ERROR'`.
     * @param context Optional error context metadata.
     */
    constructor(message: string, code?: string, context?: A2uiErrorContext);
}
/**
 * Error thrown when component tree integrity checks fail (duplicate IDs, dangling references, missing root).
 */
export declare class A2uiIntegrityError extends A2uiValidationError {
    /**
     * Initializes a new `A2uiIntegrityError` instance.
     *
     * @param message Error description.
     * @param details Additional error details.
     * @param code Error category code. Defaults to 'INTEGRITY_ERROR'.
     * @param context Optional error context metadata.
     */
    constructor(message: string, details?: any, code?: string, context?: A2uiErrorContext);
}
/**
 * Error thrown when global or function call recursion depth limits are exceeded.
 */
export declare class A2uiRecursionError extends A2uiValidationError {
    /**
     * Initializes a new `A2uiRecursionError` instance.
     *
     * @param message Error description.
     * @param details Additional error details.
     * @param code Error category code. Defaults to 'RECURSION_ERROR'.
     * @param context Optional error context metadata.
     */
    constructor(message: string, details?: any, code?: string, context?: A2uiErrorContext);
}
/**
 * Standard error codes for A2UI RPC failures.
 */
export declare enum RpcErrorCode {
    /** Malformed, missing, or unsupported function call payload or name. */
    INVALID_FUNCTION_CALL = "INVALID_FUNCTION_CALL",
    /** Runtime failure or unhandled exception during function execution. */
    EXECUTION_ERROR = "EXECUTION_ERROR",
    /** Requested function that is not registered in any available catalog. */
    UNKNOWN_FUNCTION = "UNKNOWN_FUNCTION",
    /** Unspecified or unrecognized error condition. */
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    /** Remote function call that timed out before receiving a response. */
    TIMEOUT = "TIMEOUT",
    /** Function call that was cancelled or aborted before completing. */
    CANCELLED = "CANCELLED",
    /** RPC handler disposal while a function call was pending or initiated. */
    DISPOSED = "DISPOSED",
    /** Duplicate function call identifier that is already pending. */
    DUPLICATE = "DUPLICATE",
    /** Missing outbound message listener required to transmit agent function calls. */
    NO_LISTENER = "NO_LISTENER",
    /** Pending renderer function call limit reached. */
    TOO_MANY_PENDING = "TOO_MANY_PENDING"
}
/**
 * Error thrown when an A2UI RPC operation fails, times out, or is cancelled.
 */
export declare class A2uiRpcError extends A2uiError {
    /** Identifier of the failed function call, if available. */
    readonly functionCallId?: string | undefined;
    /** Structured error details or original error cause, if available. */
    readonly details?: unknown | undefined;
    /** Unprefixed human-readable error message. */
    readonly rawMessage: string;
    /**
     * Initializes a new `A2uiRpcError` instance.
     *
     * @param message Human-readable error description.
     * @param code Category code or string identifying the RPC error.
     * @param functionCallId Optional identifier of the failed function call.
     * @param details Optional structured error details.
     */
    constructor(message: string, code?: RpcErrorCode | string,
    /** Identifier of the failed function call, if available. */
    functionCallId?: string | undefined,
    /** Structured error details or original error cause, if available. */
    details?: unknown | undefined);
}
