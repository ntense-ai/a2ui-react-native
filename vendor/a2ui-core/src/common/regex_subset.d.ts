/** Maximum allowed pattern length in Unicode code points. */
export declare const MAX_REGEX_PATTERN_CODE_POINTS = 256;
/** Maximum allowed input value length in Unicode code points. */
export declare const MAX_REGEX_VALUE_CODE_POINTS = 4096;
/** Closed inclusive Unicode scalar range `[start, end]`. */
export interface CodePointRange {
    readonly start: number;
    readonly end: number;
}
/** Zero-width anchor kinds supported by the A2UI regex dialect. */
export type AnchorKind = 'start' | 'end' | 'wordBoundary' | 'notWordBoundary';
/** Abstract syntax tree node for the A2UI portable regex subset. */
export type RegexNode = {
    readonly kind: 'empty';
} | {
    readonly kind: 'charSet';
    readonly ranges: readonly CodePointRange[];
} | {
    readonly kind: 'group';
    readonly capturing: boolean;
    readonly child: RegexNode;
} | {
    readonly kind: 'lookahead';
    readonly negated: boolean;
    readonly child: RegexNode;
} | {
    readonly kind: 'anchor';
    readonly anchor: AnchorKind;
} | {
    readonly kind: 'concat';
    readonly items: readonly RegexNode[];
} | {
    readonly kind: 'alt';
    readonly branches: readonly RegexNode[];
} | {
    readonly kind: 'repeat';
    readonly child: RegexNode;
    readonly min: number;
    readonly max: number | null;
    readonly lazy: boolean;
};
/** Rejection tokens produced by the A2UI regex subset parser and safety guard. */
export type RegexRejection = 'UNSUPPORTED_SYNTAX' | 'PATTERN_TOO_LONG' | 'NESTED_QUANTIFIER' | 'OVERLAPPING_ALTERNATION' | 'ADJACENT_OVERLAP';
/** Result of parsing and checking an A2UI regex pattern. */
export type RegexAnalysisResult = {
    readonly ok: true;
    readonly tree: RegexNode;
} | {
    readonly ok: false;
    readonly reason: RegexRejection;
    readonly detail: string;
};
/** Error raised when a pattern fails A2UI regex subset parsing. */
export declare class RegexSyntaxError extends Error {
    readonly unsupported: boolean;
    constructor(message: string, unsupported?: boolean);
}
/** Normalizes, sorts, merges, and strips UTF-16 surrogates from code-point intervals. */
export declare function normalizeRanges(ranges: readonly CodePointRange[]): readonly CodePointRange[];
/** Computes the complement of `ranges` over all Unicode scalar values (`U+0000..U+10FFFF` excluding surrogates). */
export declare function complementRanges(ranges: readonly CodePointRange[]): readonly CodePointRange[];
/** Returns true if two normalized `CodePointRange` arrays share at least one code point. */
export declare function rangesOverlap(a: readonly CodePointRange[], b: readonly CodePointRange[]): boolean;
/** Counts Unicode code points in `input`. */
export declare function countCodePoints(input: string): number;
/** Parses an A2UI regex pattern into a `RegexNode` AST or throws `RegexSyntaxError`. */
export declare function parseRegexSubset(pattern: string): RegexNode;
/** Strips outer `group` wrappers from `node`. */
export declare function unwrap(node: RegexNode): RegexNode;
/** Returns true if `node` can match the empty string (`""`). */
export declare function nullable(node: RegexNode): boolean;
/** Returns the normalized set of code points that can start a non-empty match of `node`. */
export declare function first(node: RegexNode): readonly CodePointRange[];
/** Returns the normalized union of all character sets consumed in `node` outside lookaheads. */
export declare function chars(node: RegexNode): readonly CodePointRange[];
/** Returns true if `node` or any descendant contains a quantifier with `max === null`. */
export declare function hasUnbounded(node: RegexNode): boolean;
/** Checks the 4 static safety rules on a parsed `RegexNode` AST. Returns `null` if safe. */
export declare function checkRegexSafety(pattern: string, tree: RegexNode): RegexRejection | null;
/**
 * Parses `pattern` against the A2UI portable regex subset and evaluates the 4 static
 * safety rules.
 */
export declare function analyzeRegex(pattern: string): RegexAnalysisResult;
