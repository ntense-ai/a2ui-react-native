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
export class A2uiError extends Error {
    /**
     * Initializes a new `A2uiError` instance.
     *
     * @param message Human-readable error description.
     * @param code Machine-readable error category code.
     * @param context Optional error context metadata (path, surfaceId, functionCallId).
     */
    constructor(message, code = 'UNKNOWN_ERROR', context) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        if (context?.path !== undefined)
            this.path = context.path;
        if (context?.surfaceId !== undefined)
            this.surfaceId = context.surfaceId;
        if (context?.functionCallId !== undefined) {
            this.functionCallId = context.functionCallId;
        }
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
/**
 * Error thrown when JSON validation fails or schema validation mismatches occur.
 */
export class A2uiValidationError extends A2uiError {
    /**
     * Initializes a new `A2uiValidationError` instance.
     *
     * @param message Error description detailing the validation failure.
     * @param details Additional error context or Zod validation issues.
     * @param code Optional error category code.
     * @param context Optional error context metadata.
     */
    constructor(message, details, code = 'VALIDATION_ERROR', context) {
        super(message, code, context);
        this.details = details;
    }
}
/**
 * Error thrown during DataModel mutations (invalid paths, type mismatches).
 */
export class A2uiDataError extends A2uiError {
    /**
     * Initializes a new `A2uiDataError` instance.
     *
     * @param message Error description.
     * @param path Target data model path where the mutation failed.
     * @param surfaceId Optional target surface identifier.
     */
    constructor(message, path, surfaceId) {
        super(message, 'DATA_ERROR', { path, surfaceId });
    }
}
/**
 * Error thrown during string interpolation and function evaluation.
 */
export class A2uiExpressionError extends A2uiError {
    /**
     * Initializes a new `A2uiExpressionError` instance.
     *
     * @param message Error description.
     * @param expression Evaluated expression string.
     * @param details Additional error details.
     * @param context Optional error context metadata.
     */
    constructor(message, expression, details, context) {
        super(message, 'EXPRESSION_ERROR', context);
        this.expression = expression;
        this.details = details;
    }
}
/**
 * Error thrown for structural issues in the UI tree (missing surfaces, duplicate components).
 */
export class A2uiStateError extends A2uiError {
    /**
     * Initializes a new `A2uiStateError` instance.
     *
     * @param message Error description.
     * @param context Optional error context metadata.
     */
    constructor(message, context) {
        super(message, 'STATE_ERROR', context);
    }
}
/**
 * Error thrown during catalog management, loading, or resolution.
 *
 * Raised when a catalog declares no protocol version, fails schema validation,
 * or when a function call or component references an unresolvable catalog ID.
 */
export class A2uiCatalogError extends A2uiError {
    /**
     * Initializes a new `A2uiCatalogError` instance.
     *
     * @param message Human-readable error description.
     * @param code Machine-readable error category code. Defaults to `'CATALOG_ERROR'`.
     * @param context Optional error context metadata.
     */
    constructor(message, code = 'CATALOG_ERROR', context) {
        super(message, code, context);
    }
}
/**
 * Error thrown when component tree integrity checks fail (duplicate IDs, dangling references, missing root).
 */
export class A2uiIntegrityError extends A2uiValidationError {
    /**
     * Initializes a new `A2uiIntegrityError` instance.
     *
     * @param message Error description.
     * @param details Additional error details.
     * @param code Error category code. Defaults to 'INTEGRITY_ERROR'.
     * @param context Optional error context metadata.
     */
    constructor(message, details, code = 'INTEGRITY_ERROR', context) {
        super(message, details, code, context);
        this.name = 'A2uiIntegrityError';
    }
}
/**
 * Error thrown when global or function call recursion depth limits are exceeded.
 */
export class A2uiRecursionError extends A2uiValidationError {
    /**
     * Initializes a new `A2uiRecursionError` instance.
     *
     * @param message Error description.
     * @param details Additional error details.
     * @param code Error category code. Defaults to 'RECURSION_ERROR'.
     * @param context Optional error context metadata.
     */
    constructor(message, details, code = 'RECURSION_ERROR', context) {
        super(message, details, code, context);
        this.name = 'A2uiRecursionError';
    }
}
/**
 * Standard error codes for A2UI RPC failures.
 */
export var RpcErrorCode;
(function (RpcErrorCode) {
    /** Malformed, missing, or unsupported function call payload or name. */
    RpcErrorCode["INVALID_FUNCTION_CALL"] = "INVALID_FUNCTION_CALL";
    /** Runtime failure or unhandled exception during function execution. */
    RpcErrorCode["EXECUTION_ERROR"] = "EXECUTION_ERROR";
    /** Requested function that is not registered in any available catalog. */
    RpcErrorCode["UNKNOWN_FUNCTION"] = "UNKNOWN_FUNCTION";
    /** Unspecified or unrecognized error condition. */
    RpcErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    /** Remote function call that timed out before receiving a response. */
    RpcErrorCode["TIMEOUT"] = "TIMEOUT";
    /** Function call that was cancelled or aborted before completing. */
    RpcErrorCode["CANCELLED"] = "CANCELLED";
    /** RPC handler disposal while a function call was pending or initiated. */
    RpcErrorCode["DISPOSED"] = "DISPOSED";
    /** Duplicate function call identifier that is already pending. */
    RpcErrorCode["DUPLICATE"] = "DUPLICATE";
    /** Missing outbound message listener required to transmit agent function calls. */
    RpcErrorCode["NO_LISTENER"] = "NO_LISTENER";
    /** Pending renderer function call limit reached. */
    RpcErrorCode["TOO_MANY_PENDING"] = "TOO_MANY_PENDING";
})(RpcErrorCode || (RpcErrorCode = {}));
/**
 * Error thrown when an A2UI RPC operation fails, times out, or is cancelled.
 */
export class A2uiRpcError extends A2uiError {
    /**
     * Initializes a new `A2uiRpcError` instance.
     *
     * @param message Human-readable error description.
     * @param code Category code or string identifying the RPC error.
     * @param functionCallId Optional identifier of the failed function call.
     * @param details Optional structured error details.
     */
    constructor(message, code = RpcErrorCode.UNKNOWN_ERROR,
    /** Identifier of the failed function call, if available. */
    functionCallId,
    /** Structured error details or original error cause, if available. */
    details) {
        const resolvedCode = code || RpcErrorCode.UNKNOWN_ERROR;
        super(`[${resolvedCode}] ${message}`, resolvedCode);
        this.functionCallId = functionCallId;
        this.details = details;
        this.name = 'A2uiRpcError';
        this.rawMessage = message;
    }
}
