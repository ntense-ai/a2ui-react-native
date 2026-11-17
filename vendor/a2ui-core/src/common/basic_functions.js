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
 * Shared basic catalog function implementations and formatting helpers.
 *
 * Provides shared execution algorithms, caching layers, and implementation
 * factory functions consumed by all version-specific basic catalog definitions.
 */
import { ExpressionParser } from '../expressions/expression_parser.js';
import { computed, isSignal, getValue } from '../reactivity/signals.js';
import { createFunctionImplementation } from '../catalog/types.js';
import { coerceDynamicBoolean } from '../catalog/validation_result_coercion.js';
import { A2uiExpressionError } from '../errors.js';
import { activeCallCatalogId, withoutAgentRouting } from '../resolution/data-context-internal.js';
import { isAtLeastVersion } from './semver.js';
import { MAX_REGEX_VALUE_CODE_POINTS, analyzeRegex, countCodePoints } from './regex_subset.js';
export { isSafeRegex } from '../v0_9/basic_catalog/functions/safe_regex.js';
/**
 * Default BCP 47 locale used when a catalog is built without an explicit one.
 *
 * Pinned to en-US so formatting output is consistent across machines.
 */
export const DEFAULT_LOCALE = 'en-US';
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
export function resolveLocale(locale) {
    if (!locale)
        return DEFAULT_LOCALE;
    try {
        return Intl.NumberFormat.supportedLocalesOf(locale).length > 0 ? locale : DEFAULT_LOCALE;
    }
    catch {
        return DEFAULT_LOCALE;
    }
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
export function coerceToString(value) {
    if (value === null || value === undefined)
        return '';
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value) ?? String(value);
        }
        catch {
            return String(value);
        }
    }
    return String(value);
}
// ---------------------------------------------------------------------------
// Validation Execution Helpers
// ---------------------------------------------------------------------------
/** Validates that a value is present and non-empty. */
export function validateRequired(val) {
    let isValid = true;
    if (val === null || val === undefined)
        isValid = false;
    else if (typeof val === 'string' && val === '')
        isValid = false;
    else if (Array.isArray(val) && val.length === 0)
        isValid = false;
    return {
        valid: isValid,
        ...(isValid ? {} : { message: 'This field is required.' }),
    };
}
const MAX_REGEX_CACHE_ENTRIES = 256;
const compiledRegexCache = new Map();
function getCompiledRegex(pattern) {
    const cached = compiledRegexCache.get(pattern);
    if (cached !== undefined) {
        compiledRegexCache.delete(pattern);
        compiledRegexCache.set(pattern, cached);
        return cached;
    }
    const analysis = analyzeRegex(pattern);
    if (!analysis.ok) {
        throw new A2uiExpressionError(`Invalid or unsafe regex pattern (${analysis.reason}): ${pattern}`, 'regex');
    }
    let compiled;
    try {
        compiled = new RegExp(pattern, 'u');
    }
    catch (e) {
        throw new A2uiExpressionError(`Invalid regex pattern (UNSUPPORTED_SYNTAX): ${pattern}`, 'regex', e);
    }
    if (compiledRegexCache.size >= MAX_REGEX_CACHE_ENTRIES) {
        const oldestKey = compiledRegexCache.keys().next().value;
        if (oldestKey !== undefined) {
            compiledRegexCache.delete(oldestKey);
        }
    }
    compiledRegexCache.set(pattern, compiled);
    return compiled;
}
/** Validates that a string value matches a regular expression pattern. */
export function validateRegex(val, pattern) {
    const compiled = getCompiledRegex(pattern);
    const strVal = String(val ?? '');
    if (countCodePoints(strVal) > MAX_REGEX_VALUE_CODE_POINTS) {
        return {
            valid: false,
            message: 'Value exceeds the maximum length for pattern matching.',
        };
    }
    const isValid = compiled.test(strVal);
    return {
        valid: isValid,
        ...(isValid ? {} : { message: 'Value does not match required pattern.' }),
    };
}
/** Validates that string or array length falls within an optional range. */
export function validateLength(val, min, max) {
    let len = 0;
    if (typeof val === 'string' || Array.isArray(val)) {
        len = val.length;
    }
    let isValid = true;
    let message;
    if (min !== undefined && !isNaN(min) && len < min) {
        isValid = false;
        message = `Minimum length is ${min}.`;
    }
    else if (max !== undefined && !isNaN(max) && len > max) {
        isValid = false;
        message = `Maximum length is ${max}.`;
    }
    return {
        valid: isValid,
        ...(message ? { message } : {}),
    };
}
/** Validates that a numeric value falls within an optional range. */
export function validateNumeric(val, min, max) {
    const num = Number(val);
    if (isNaN(num)) {
        return { valid: false, message: 'Value must be a valid number.' };
    }
    let isValid = true;
    let message;
    if (min !== undefined && !isNaN(min) && num < min) {
        isValid = false;
        message = `Minimum value is ${min}.`;
    }
    else if (max !== undefined && !isNaN(max) && num > max) {
        isValid = false;
        message = `Maximum value is ${max}.`;
    }
    return {
        valid: isValid,
        ...(message ? { message } : {}),
    };
}
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
/** Validates that a string matches basic email address syntax. */
export function validateEmail(val) {
    const isValid = typeof val === 'string' && EMAIL_REGEX.test(val);
    return {
        valid: isValid,
        ...(isValid
            ? {}
            : {
                code: 'INVALID_EMAIL',
                severity: 'error',
                message: 'Please enter a valid email address (e.g. user@example.com).',
            }),
    };
}
// ---------------------------------------------------------------------------
// Formatting Caching & Helpers
// ---------------------------------------------------------------------------
const numberFormatCache = new Map();
export function getNumberFormat(locale, decimals, grouping) {
    const key = `${locale}:${decimals ?? 'undef'}:${grouping ?? 'true'}`;
    let formatter = numberFormatCache.get(key);
    if (!formatter) {
        formatter = new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: grouping,
        });
        numberFormatCache.set(key, formatter);
    }
    return formatter;
}
const currencyFormatCache = new Map();
export function getCurrencyFormat(locale, currency, decimals, grouping) {
    const key = `${locale}:${currency}:${decimals ?? 'undef'}:${grouping ?? 'true'}`;
    let formatter = currencyFormatCache.get(key);
    if (!formatter) {
        formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: grouping,
        });
        currencyFormatCache.set(key, formatter);
    }
    return formatter;
}
/**
 * An assigned code, formatted only to discover where the locale places a
 * currency. Its own symbol is never shown.
 */
const PLACEHOLDER_CURRENCY = 'USD';
const currencyCodeFormatCache = new Map();
/**
 * Returns a formatter that renders the currency as its ISO code rather than as
 * a symbol, which makes the locale's placement and spacing observable through
 * `formatToParts`.
 */
export function getCurrencyCodeFormat(locale, decimals, grouping) {
    const key = `${locale}:${decimals ?? 'undef'}:${grouping ?? 'true'}`;
    let formatter = currencyCodeFormatCache.get(key);
    if (!formatter) {
        formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: PLACEHOLDER_CURRENCY,
            currencyDisplay: 'code',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
            useGrouping: grouping,
        });
        currencyCodeFormatCache.set(key, formatter);
    }
    return formatter;
}
const dateNamesCache = new Map();
/** Builds month and weekday name tables for a locale using `Intl.DateTimeFormat`. */
export function getDateNames(locale) {
    let names = dateNamesCache.get(locale);
    if (!names) {
        const render = (options, dates) => {
            const formatter = new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' });
            return dates.map(d => formatter.format(d));
        };
        const months = Array.from({ length: 12 }, (_, i) => new Date(Date.UTC(2021, i, 15)));
        const weekdays = Array.from({ length: 7 }, (_, i) => new Date(Date.UTC(2021, 2, 1 + i)));
        names = {
            monthsLong: render({ month: 'long' }, months),
            monthsShort: render({ month: 'short' }, months),
            weekdaysLong: render({ weekday: 'long' }, weekdays),
            weekdaysShort: render({ weekday: 'short' }, weekdays),
        };
        dateNamesCache.set(locale, names);
    }
    return names;
}
export const DATE_TOKENS = /yyyy|yy|MMMM|MMM|MM|M|EEEE|E|dd|d|HH|H|hh|h|mm|ss|a/g;
export const ISO_OFFSET = /(?:Z|[+-]\d{2}:?\d{2})$/;
/**
 * The calendar fields as written at the start of an ISO 8601 timestamp:
 * year, month, day, and optionally hour, minute and second.
 */
const WRITTEN_FIELDS = /^([+-]?\d{4,6})-(\d{2})-(\d{2})(?:[T ](\d{2})(?::(\d{2})(?::(\d{2}))?)?)?/;
/**
 * Parses an ISO 8601 timestamp and shifts it so that UTC accessors report
 * the wall-clock fields the timestamp was written with.
 *
 * Returns null for a timestamp whose written fields do not survive the round
 * trip, such as `2026-02-30`, which `Date` would otherwise roll over into
 * the following month.
 */
export function parseTimestamp(value) {
    const hasOffset = ISO_OFFSET.test(value);
    const instant = new Date(hasOffset ? value : `${value}Z`);
    if (isNaN(instant.getTime()))
        return null;
    let offsetMinutes = 0;
    const match = /([+-])(\d{2}):?(\d{2})$/.exec(value);
    if (match) {
        const sign = match[1] === '-' ? -1 : 1;
        offsetMinutes = sign * (Number(match[2]) * 60 + Number(match[3]));
    }
    const shifted = new Date(instant.getTime() + offsetMinutes * 60000);
    if (!fieldsRoundTrip(value, shifted))
        return null;
    return { shifted, instant };
}
/**
 * Whether the year, month, day and (when written) time fields of `value`
 * equal the UTC fields of `shifted`.
 */
function fieldsRoundTrip(value, shifted) {
    const written = WRITTEN_FIELDS.exec(value);
    if (!written)
        return false;
    const field = (group) => written[group] === undefined ? undefined : Number(written[group]);
    return (field(1) === shifted.getUTCFullYear() &&
        field(2) === shifted.getUTCMonth() + 1 &&
        field(3) === shifted.getUTCDate() &&
        (field(4) ?? shifted.getUTCHours()) === shifted.getUTCHours() &&
        (field(5) ?? shifted.getUTCMinutes()) === shifted.getUTCMinutes() &&
        (field(6) ?? shifted.getUTCSeconds()) === shifted.getUTCSeconds());
}
const pluralRulesCache = new Map();
export function getPluralRules(locale) {
    let rules = pluralRulesCache.get(locale);
    if (!rules) {
        rules = new Intl.PluralRules(locale);
        pluralRulesCache.set(locale, rules);
    }
    return rules;
}
/** JavaScript truthiness: objects and arrays are truthy, even when empty. */
export const isTruthy = value => !!value;
/**
 * Truthiness that coerces any value according to the `DynamicBoolean` rules.
 */
export const isTruthyOrValid = coerceDynamicBoolean;
/** Evaluates logical AND across an array of values. */
export function executeAnd(values, truthy = coerceDynamicBoolean) {
    if (!Array.isArray(values) || values.length < 2) {
        throw new A2uiExpressionError('and requires at least 2 values', 'and');
    }
    return values.every(truthy);
}
/** Evaluates logical OR across an array of values. */
export function executeOr(values, truthy = coerceDynamicBoolean) {
    if (!Array.isArray(values) || values.length < 2) {
        throw new A2uiExpressionError('or requires at least 2 values', 'or');
    }
    return values.some(truthy);
}
/** Evaluates logical NOT on a single value. */
export function executeNot(value, truthy = coerceDynamicBoolean) {
    return !truthy(value);
}
function defineOwn(target, key, value) {
    Object.defineProperty(target, key, { value, enumerable: true, writable: true, configurable: true });
}
function adaptAstPartForV10(part, catalogId) {
    if (Array.isArray(part)) {
        return part.map(item => adaptAstPartForV10(item, catalogId));
    }
    if (typeof part !== 'object' || part === null) {
        return part;
    }
    if (typeof part.path === 'string' &&
        part.componentId === undefined &&
        part['@path'] === undefined) {
        return { '@path': part.path };
    }
    const hasCall = typeof part.call === 'string';
    const hasAtCall = typeof part['@call'] === 'string';
    const callName = hasCall && !hasAtCall ? part.call : hasAtCall ? part['@call'] : undefined;
    if (callName !== undefined) {
        const args = {};
        if (part.args && typeof part.args === 'object' && !Array.isArray(part.args)) {
            for (const [k, v] of Object.entries(part.args)) {
                defineOwn(args, k, adaptAstPartForV10(v, catalogId));
            }
        }
        const resolvedCatalogId = part.catalogId !== undefined && part.catalogId !== null
            ? part.catalogId
            : catalogId !== undefined && !callName.startsWith('@')
                ? catalogId
                : undefined;
        return resolvedCatalogId !== undefined
            ? { '@call': callName, args, catalogId: resolvedCatalogId }
            : { '@call': callName, args };
    }
    const adaptedObj = {};
    for (const [k, v] of Object.entries(part)) {
        defineOwn(adaptedObj, k, adaptAstPartForV10(v, catalogId));
    }
    return adaptedObj;
}
/** Formats a template string by resolving embedded expressions. */
export function executeFormatString(template, context) {
    const parser = new ExpressionParser();
    const parts = parser.parse(template);
    if (parts.length === 0)
        return '';
    const atLeastV10 = typeof context.atLeastV10 === 'boolean'
        ? context.atLeastV10
        : isAtLeastVersion(context.surface?.protocolVersion ?? context.surface?.defaultCatalog?.protocolVersion, '1.0');
    const catalogId = atLeastV10 ? activeCallCatalogId(context) : undefined;
    // A template part never waits for the agent: from v1.0, a part that calls
    // a function the renderer does not implement fails with an
    // `EXPRESSION_ERROR` naming it, sends nothing, and renders empty.
    const partContext = atLeastV10 ? withoutAgentRouting(context) : context;
    const dynamicParts = parts.map(part => {
        if (typeof part !== 'object' || part === null || Array.isArray(part)) {
            return part;
        }
        const adapted = atLeastV10 ? adaptAstPartForV10(part, catalogId) : part;
        return partContext.resolveSignal(adapted);
    });
    return computed(() => {
        return dynamicParts.map(p => coerceToString(isSignal(p) ? getValue(p) : p)).join('');
    });
}
/** Formats a number with configured precision and grouping. */
export function executeFormatNumber(value, decimals, grouping, locale = DEFAULT_LOCALE) {
    if (isNaN(value))
        return '';
    return getNumberFormat(locale, decimals, grouping).format(value);
}
/** Formats a number as currency. */
export function executeFormatCurrency(value, currencyInput, decimals = 2, grouping, locale = DEFAULT_LOCALE) {
    if (isNaN(value))
        return '';
    const currency = String(currencyInput).toUpperCase();
    try {
        return getCurrencyFormat(locale, currency, decimals, grouping).format(value);
    }
    catch {
        // Intl throws only for a malformed code, meaning one that is not three
        // ASCII letters. A well-formed but unassigned code such as `XYZ` does
        // not reach here; Intl accepts it and uses it as its own symbol.
        //
        // Babel throws for nothing, so the Python engine lays a malformed code
        // out exactly as the locale's currency pattern dictates. Recover that
        // same layout by formatting a placeholder currency as a code and
        // substituting, which keeps the two engines byte-identical.
        return getCurrencyCodeFormat(locale, decimals, grouping)
            .formatToParts(value)
            .map(part => (part.type === 'currency' ? currency : part.value))
            .join('');
    }
}
/** Formats a timestamp using TR35 pattern tokens, or emits an ISO timestamp. */
export function executeFormatDate(value, formatPattern = 'yyyy-MM-dd', locale = DEFAULT_LOCALE) {
    if (!value)
        return '';
    const parsed = parseTimestamp(String(value));
    if (!parsed)
        return '';
    const { shifted, instant } = parsed;
    const pattern = formatPattern || 'yyyy-MM-dd';
    if (pattern === 'ISO')
        return instant.toISOString();
    const names = getDateNames(locale);
    const weekdayIndex = (shifted.getUTCDay() + 6) % 7;
    const hours = shifted.getUTCHours();
    const hours12 = hours % 12 || 12;
    return pattern.replace(DATE_TOKENS, (token) => {
        switch (token) {
            case 'yyyy':
                return String(shifted.getUTCFullYear());
            case 'yy':
                return String(shifted.getUTCFullYear()).slice(-2);
            case 'MMMM':
                return names.monthsLong[shifted.getUTCMonth()];
            case 'MMM':
                return names.monthsShort[shifted.getUTCMonth()];
            case 'MM':
                return String(shifted.getUTCMonth() + 1).padStart(2, '0');
            case 'M':
                return String(shifted.getUTCMonth() + 1);
            case 'EEEE':
                return names.weekdaysLong[weekdayIndex];
            case 'E':
                return names.weekdaysShort[weekdayIndex];
            case 'dd':
                return String(shifted.getUTCDate()).padStart(2, '0');
            case 'd':
                return String(shifted.getUTCDate());
            case 'HH':
                return String(hours).padStart(2, '0');
            case 'H':
                return String(hours);
            case 'hh':
                return String(hours12).padStart(2, '0');
            case 'h':
                return String(hours12);
            case 'mm':
                return String(shifted.getUTCMinutes()).padStart(2, '0');
            case 'ss':
                return String(shifted.getUTCSeconds()).padStart(2, '0');
            case 'a':
                return hours < 12 ? 'AM' : 'PM';
            default:
                return token;
        }
    });
}
/** Selects the appropriate plural form for a quantity. */
export function executePluralize(value, forms, locale = DEFAULT_LOCALE) {
    let category;
    if (value === 0 && forms['zero'] !== undefined)
        category = 'zero';
    else if (value === 1 && forms['one'] !== undefined)
        category = 'one';
    else if (value === 2 && forms['two'] !== undefined)
        category = 'two';
    else
        category = getPluralRules(locale).select(value);
    return String(forms[category] ?? forms['other'] ?? '');
}
/** Opens a specified URL in a new browser tab. */
export function executeOpenUrl(urlInput) {
    const target = typeof urlInput === 'string' ? urlInput : undefined;
    if (!target || typeof window === 'undefined' || typeof window['open'] !== 'function')
        return;
    const baseHref = typeof window !== 'undefined' && typeof window.location !== 'undefined' && window.location.href
        ? window.location.href
        : undefined;
    let url;
    try {
        url = baseHref ? new URL(target, baseHref) : new URL(target);
    }
    catch (e) {
        throw new A2uiExpressionError(`Invalid URL specified: ${target}`, 'openUrl', e);
    }
    if (url.protocol !== 'https:' &&
        url.protocol !== 'http:' &&
        url.protocol !== 'mailto:' &&
        url.protocol !== 'tel:') {
        throw new A2uiExpressionError(`Unsupported URL scheme: ${url.protocol}`, 'openUrl');
    }
    window.open(url.href, '_blank', 'noopener,noreferrer');
}
export function createAndImplementation(api, { truthy = coerceDynamicBoolean } = {}) {
    return createFunctionImplementation(api, args => executeAnd(args.values, truthy));
}
export function createOrImplementation(api, { truthy = coerceDynamicBoolean } = {}) {
    return createFunctionImplementation(api, args => executeOr(args.values, truthy));
}
export function createNotImplementation(api, { truthy = coerceDynamicBoolean } = {}) {
    return createFunctionImplementation(api, args => executeNot(args.value, truthy));
}
export function createFormatStringImplementation(api) {
    return createFunctionImplementation(api, (args, context) => executeFormatString(args.value, context));
}
export function createFormatNumberImplementation(api, locale) {
    const resolvedLocale = resolveLocale(locale);
    return createFunctionImplementation(api, args => executeFormatNumber(args.value, args.decimals, args.grouping, resolvedLocale));
}
export function createFormatCurrencyImplementation(api, locale) {
    const resolvedLocale = resolveLocale(locale);
    return createFunctionImplementation(api, args => executeFormatCurrency(args.value, args.currency, args.decimals ?? 2, args.grouping, resolvedLocale));
}
export function createFormatDateImplementation(api, locale) {
    const resolvedLocale = resolveLocale(locale);
    return createFunctionImplementation(api, args => executeFormatDate(args.value, args.format, resolvedLocale));
}
export function createPluralizeImplementation(api, locale) {
    const resolvedLocale = resolveLocale(locale);
    return createFunctionImplementation(api, args => executePluralize(args.value, args, resolvedLocale));
}
export function createOpenUrlImplementation(api) {
    return createFunctionImplementation(api, args => executeOpenUrl(args.url));
}
