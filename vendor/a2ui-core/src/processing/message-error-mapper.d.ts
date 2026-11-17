/** Outbound error body for validation or composition constraint failures. */
export interface ValidationFailedErrorBody {
    readonly code: 'VALIDATION_FAILED' | 'UNALLOWED_PARENT' | 'UNALLOWED_CHILD';
    readonly surfaceId: string;
    readonly path: string;
    readonly message: string;
    readonly functionCallId?: undefined;
}
/** Outbound error body for generic, integrity, catalog, or RPC failures. */
export interface GenericErrorBody {
    readonly code: string;
    readonly message: string;
    readonly surfaceId?: string;
    readonly path?: string;
    readonly functionCallId?: string;
    readonly [key: string]: unknown;
}
/** Union of spec-compliant outbound renderer error bodies. */
export type A2uiRendererError = ValidationFailedErrorBody | GenericErrorBody;
/** Outbound renderer-to-agent error message envelope. */
export interface RendererErrorMessage {
    readonly version: 'v0.8' | 'v0.9' | 'v0.9.1' | '1.0';
    readonly error: A2uiRendererError;
}
/**
 * Envelope metadata extracted from a raw A2UI message prior to or during
 * validation, used to correlate outbound renderer error payloads.
 */
export interface ErrorEnvelopeContext {
    /** Target surface ID extracted from the message envelope, if present. */
    readonly surfaceId?: string;
    /** Target functionCallId extracted from a `callRendererFunction` envelope, if present. */
    readonly functionCallId?: string;
    /** Top-level action key (e.g. `'createSurface'`, `'callRendererFunction'`). */
    readonly actionType?: string;
    /** Whether the message envelope is a `callRendererFunction` message. */
    readonly isCallRendererFunction?: boolean;
    /** Protocol version string extracted from the message or processor fallback. */
    readonly version?: string;
}
/**
 * Extracts best-effort correlation metadata (`surfaceId`, `functionCallId`,
 * `actionType`, `version`) from a raw message envelope before schema parsing.
 *
 * @param rawMessage Raw unvalidated message object.
 * @param fallbackVersion Optional fallback protocol version string.
 * @returns Extracted envelope error correlation context.
 */
export declare function extractEnvelopeErrorContext(rawMessage: unknown, fallbackVersion?: string): ErrorEnvelopeContext;
/**
 * Normalizes a raw path string into an RFC 6901 JSON Pointer (`"/components/0/text"`),
 * stripping any leading action envelope prefix.
 *
 * @param rawPath Raw path or JSON Pointer string.
 * @returns Normalized RFC 6901 JSON Pointer, or `undefined` if empty.
 */
export declare function normalizeJsonPointer(rawPath: string | undefined): string | undefined;
/**
 * Maps an internal `A2uiError` (or unknown thrown error) and envelope context
 * into a spec-compliant outbound `RendererErrorMessage`.
 *
 * @param err Thrown error instance.
 * @param context Extracted envelope correlation context.
 * @returns Spec-compliant outbound `RendererErrorMessage`.
 */
export declare function mapErrorToRendererMessage(err: unknown, context?: ErrorEnvelopeContext): RendererErrorMessage;
