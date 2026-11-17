import { Signal } from '../reactivity/signals.js';
import { FunctionImplementation } from '../catalog/types.js';
import { DataContext } from '../resolution/data-context.js';
export { isSafeRegex, type SafeRegexOptions } from '../v0_9/basic_catalog/functions/safe_regex.js';
/**
 * Default BCP 47 locale used when a catalog is built without an explicit one.
 *
 * Pinned to en-US so formatting output is consistent across machines.
 */
export declare const DEFAULT_LOCALE = "en-US";
/**
 * Resolves the locale tag a catalog was built with to one the formatters can use.
 *
 * Falls back to {@link DEFAULT_LOCALE} in three cases, each of which the Python
 * engine also falls back for:
 *
 * - No tag was supplied.
 * - The tag is malformed, such as `en_US`, which makes `Intl` throw a
 *   `RangeError` from every constructor it is handed to.
 * - The tag is well formed but no locale data matches it, such as `xx-YY`. Here
 *   `Intl` would silently format with the host's ambient locale, which this
 *   module promises never to depend on.
 *
 * @param locale Optional BCP 47 language tag.
 * @returns A tag `Intl` both accepts and has data for.
 */
export declare function resolveLocale(locale?: string): string;
/** Standard validation result. */
export interface ValidationResult {
    /** Whether validation passed. */
    valid: boolean;
    /** Explanatory message when validation failed. */
    message?: string;
    /** Optional machine-readable validation code. */
    code?: string;
    /** Optional severity level. */
    severity?: 'error' | 'warning' | 'info';
}
/**
 * Coerces a value to a string following protocol type conversion rules.
 *
 * - Numbers and booleans: standard string representation.
 * - `null` and `undefined`: an empty string `""`.
 * - Objects and arrays: stringified as compact JSON.
 *
 * @param value The value to coerce.
 * @returns The string representation.
 */
export declare function coerceToString(value: unknown): string;
/** Validates that a value is present and non-empty. */
export declare function validateRequired(val: unknown): ValidationResult;
/** Validates that a string value matches a regular expression pattern. */
export declare function validateRegex(val: unknown, pattern: string): ValidationResult;
/** Validates that string or array length falls within an optional range. */
export declare function validateLength(val: unknown, min?: number, max?: number): ValidationResult;
/** Validates that a numeric value falls within an optional range. */
export declare function validateNumeric(val: unknown, min?: number, max?: number): ValidationResult;
/** Validates that a string matches basic email address syntax. */
export declare function validateEmail(val: unknown): ValidationResult;
export declare function getNumberFormat(locale: string, decimals?: number, grouping?: boolean): Intl.NumberFormat;
export declare function getCurrencyFormat(locale: string, currency: string, decimals?: number, grouping?: boolean): Intl.NumberFormat;
/**
 * Returns a formatter that renders the currency as its ISO code rather than as
 * a symbol, which makes the locale's placement and spacing observable through
 * `formatToParts`.
 */
export declare function getCurrencyCodeFormat(locale: string, decimals?: number, grouping?: boolean): Intl.NumberFormat;
/** Month and weekday names for one locale, indexed for `formatDate`. */
export interface DateNames {
    /** Full month names, January first. */
    monthsLong: string[];
    /** Abbreviated month names, January first. */
    monthsShort: string[];
    /** Full weekday names, Monday first. */
    weekdaysLong: string[];
    /** Abbreviated weekday names, Monday first. */
    weekdaysShort: string[];
}
/** Builds month and weekday name tables for a locale using `Intl.DateTimeFormat`. */
export declare function getDateNames(locale: string): DateNames;
export declare const DATE_TOKENS: RegExp;
export declare const ISO_OFFSET: RegExp;
/**
 * Parses an ISO 8601 timestamp and shifts it so that UTC accessors report
 * the wall-clock fields the timestamp was written with.
 *
 * Returns null for a timestamp whose written fields do not survive the round
 * trip, such as `2026-02-30`, which `Date` would otherwise roll over into
 * the following month.
 */
export declare function parseTimestamp(value: string): {
    shifted: Date;
    instant: Date;
} | null;
export declare function getPluralRules(locale: string): Intl.PluralRules;
/** A truthiness rule for the logical functions. */
export type TruthyFn = (value: unknown) => boolean;
/** JavaScript truthiness: objects and arrays are truthy, even when empty. */
export declare const isTruthy: TruthyFn;
/**
 * Truthiness that coerces any value according to the `DynamicBoolean` rules.
 */
export declare const isTruthyOrValid: TruthyFn;
/** Evaluates logical AND across an array of values. */
export declare function executeAnd(values: unknown[], truthy?: TruthyFn): boolean;
/** Evaluates logical OR across an array of values. */
export declare function executeOr(values: unknown[], truthy?: TruthyFn): boolean;
/** Evaluates logical NOT on a single value. */
export declare function executeNot(value: unknown, truthy?: TruthyFn): boolean;
/** Formats a template string by resolving embedded expressions. */
export declare function executeFormatString(template: string, context: DataContext): Signal<string> | string;
/** Formats a number with configured precision and grouping. */
export declare function executeFormatNumber(value: number, decimals?: number, grouping?: boolean, locale?: string): string;
/** Formats a number as currency. */
export declare function executeFormatCurrency(value: number, currencyInput: string, decimals?: number, grouping?: boolean, locale?: string): string;
/** Formats a timestamp using TR35 pattern tokens, or emits an ISO timestamp. */
export declare function executeFormatDate(value: unknown, formatPattern?: string, locale?: string): string;
/** Selects the appropriate plural form for a quantity. */
export declare function executePluralize(value: number, forms: Record<string, unknown>, locale?: string): string;
/** Opens a specified URL in a new browser tab. */
export declare function executeOpenUrl(urlInput: unknown): void;
/** Options for the logical function implementations. */
export interface LogicalFunctionOptions {
    /**
     * The truthiness rule for operands. Defaults to `coerceDynamicBoolean`.
     */
    truthy?: TruthyFn;
}
export declare function createAndImplementation(api: any, { truthy }?: LogicalFunctionOptions): FunctionImplementation;
export declare function createOrImplementation(api: any, { truthy }?: LogicalFunctionOptions): FunctionImplementation;
export declare function createNotImplementation(api: any, { truthy }?: LogicalFunctionOptions): FunctionImplementation;
export declare function createFormatStringImplementation(api: any): FunctionImplementation;
export declare function createFormatNumberImplementation(api: any, locale?: string): FunctionImplementation;
export declare function createFormatCurrencyImplementation(api: any, locale?: string): FunctionImplementation;
export declare function createFormatDateImplementation(api: any, locale?: string): FunctionImplementation;
export declare function createPluralizeImplementation(api: any, locale?: string): FunctionImplementation;
export declare function createOpenUrlImplementation(api: any): FunctionImplementation;
