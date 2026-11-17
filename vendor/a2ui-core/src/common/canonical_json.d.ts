/**
 * Conversion of resolved values to plain JSON, for the arguments of calls sent
 * to the agent and for the keys that identify identical calls.
 */
/** Thrown when a value cannot be represented as JSON. */
export declare class NonJsonValueError extends Error {
    constructor(message: string);
}
/**
 * Returns a plain JSON copy of `value`.
 *
 * An object property whose value is `undefined` is omitted, as
 * `JSON.stringify` omits it. Every key, `"__proto__"` included, becomes an
 * ordinary own property of the copy.
 *
 * @param value The value to copy.
 * @param sortKeys Whether to sort object keys recursively. Array order is kept.
 * @returns The JSON copy.
 * @throws {NonJsonValueError} If `value` contains something JSON cannot
 *   represent: `NaN` or `±Infinity`, an `undefined` array element, a function,
 *   a symbol, a bigint, a circular reference, or an object that is not a plain
 *   object or array (such as a `Date`, a `Map` or a class instance).
 */
export declare function toJsonValue(value: unknown, sortKeys?: boolean): unknown;
/**
 * Builds a key that identifies `value` up to the order of object keys.
 *
 * @param value The value to identify.
 * @returns The key, or `undefined` if `value` cannot be represented as JSON.
 */
export declare function canonicalJsonKey(value: unknown): string | undefined;
