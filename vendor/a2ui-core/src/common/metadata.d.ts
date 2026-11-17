/**
 * Read-only map of vendor or official extension payloads keyed by UAX #31
 * Unicode identifiers.
 */
export type Extensions = Readonly<Record<string, unknown>>;
/**
 * Envelope metadata attached to surfaces, components, catalog definitions,
 * or outbound renderer actions.
 */
export interface A2uiMetadata {
    /** Optional extension payloads keyed by UAX #31 Unicode identifiers. */
    readonly extensions?: Extensions;
    /** Additional envelope metadata properties. */
    readonly [key: string]: unknown;
}
/**
 * Options passed when invoking a bound {@link NodeAction} closure.
 */
export interface ActionDispatchOptions {
    /** Optional metadata to attach to the outbound renderer action. */
    readonly metadata?: A2uiMetadata;
}
/**
 * Validates an {@link A2uiMetadata} object and its `extensions` keys.
 *
 * @param metadata Metadata candidate to validate. `undefined` is permitted.
 * @throws {A2uiValidationError} When `metadata` is not a plain object or any
 *     `extensions` key is not a valid UAX #31 identifier.
 */
export declare function validateMetadata(metadata: unknown): asserts metadata is A2uiMetadata | undefined;
/**
 * Validates and merges action payload `metadata` with call-site `metadata`.
 * Call-site extension keys take precedence over payload extension keys.
 */
export declare function mergeActionMetadata(payloadMetadata: unknown, callSiteMetadata: A2uiMetadata | undefined): A2uiMetadata | undefined;
/**
 * Validates, deep-clones, and deep-freezes an {@link A2uiMetadata} snapshot.
 *
 * @param metadata Metadata object to clone, or `undefined`.
 * @returns Deeply frozen clone of `metadata`, or `undefined`.
 */
export declare function cloneMetadata(metadata: A2uiMetadata | undefined): A2uiMetadata | undefined;
/**
 * Compares two JSON-compatible values for deep structural equality.
 *
 * @param a First value.
 * @param b Second value.
 * @returns `true` if `a` and `b` are structurally equal.
 */
export declare function jsonValueEquals(a: unknown, b: unknown): boolean;
/**
 * Compares two {@link A2uiMetadata} objects for deep structural equality.
 *
 * @param a First metadata snapshot.
 * @param b Second metadata snapshot.
 * @returns `true` if `a` and `b` have identical structure and values.
 */
export declare function metadataEquals(a: A2uiMetadata | undefined, b: A2uiMetadata | undefined): boolean;
