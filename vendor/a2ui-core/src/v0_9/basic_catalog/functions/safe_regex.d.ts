/**
 * Options for regular expression safety validation.
 */
export interface SafeRegexOptions {
    /** Maximum allowable length of the regex pattern in Unicode code points (default: 256). */
    maxPatternLength?: number;
}
/**
 * Validates whether a regular expression pattern conforms to the A2UI portable
 * regex subset and passes the static safety check against catastrophic
 * backtracking (ReDoS - CWE-1333).
 *
 * @param pattern The regular expression pattern string to validate.
 * @param options Optional configuration for pattern length bounds.
 * @returns `true` if the pattern is valid and safe to execute; `false` otherwise.
 */
export declare function isSafeRegex(pattern: string, options?: SafeRegexOptions): boolean;
