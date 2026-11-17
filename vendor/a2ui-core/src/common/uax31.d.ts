/**
 * Checks whether a name is a valid A2UI identifier.
 *
 * When `allowLeadingAt` is true, a single leading `@` is permitted and ignored,
 * accommodating the reserved system-function prefix such as `@index` in
 * payload function call validation. Catalog declarations disallow `@`-prefixed
 * names (`allowLeadingAt = false`).
 *
 * Mirrors `is_valid_uax31_identifier` in
 * `python/a2ui_core/src/a2ui/core/common/uax31.py`.
 *
 * @param name Identifier to test.
 * @param allowLeadingAt Whether to allow a single leading `@`.
 * @returns Whether `name` satisfies UAX #31.
 */
export declare function isValidUax31Identifier(name: string, allowLeadingAt?: boolean): boolean;
/**
 * Asserts that an identifier satisfies UAX #31.
 *
 * Throws an {@link A2uiCatalogError} when the identifier is invalid.
 *
 * @param name Identifier to check.
 * @param context Description of what the identifier names, used in the error message.
 * @param allowLeadingAt Whether to allow a single leading `@`.
 * @throws {A2uiCatalogError} If `name` is not a valid UAX #31 identifier.
 */
export declare function assertUax31Identifier(name: string, context: string, allowLeadingAt?: boolean): void;
