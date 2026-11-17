import { DynamicValue } from '../types/common-types.js';
/**
 * The maximum allowed length for expression template strings to prevent resource exhaustion (CWE-400),
 * measured in UTF-16 code units (i.e. JavaScript `string.length`, not characters and not bytes).
 */
export declare const MAX_EXPRESSION_TEMPLATE_LENGTH = 10000;
/**
 * The maximum allowed number of parts in an expression template to prevent resource exhaustion (CWE-400).
 *
 * A "part" is an individual segment produced when parsing the template string: each interpolated
 * expression (`${...}`), escaped interpolation delimiter (`\${`), or literal text span between
 * interpolations that forms an element in the parsed output array.
 */
export declare const MAX_EXPRESSION_PARTS = 1000;
/**
 * Parses A2UI expressions, supporting string interpolation and function calls.
 *
 * Converts strings with `${...}` placeholders into arrays of `DynamicValue` objects.
 * Supports literals (strings, numbers, booleans), path-based data bindings, and
 * nested function calls with named arguments.
 */
export declare class ExpressionParser {
    /**
     * The maximum allowed recursion depth for nested expressions, which bounds
     * the work a payload can demand of the parser and keeps it off the stack
     * limit.
     *
     * Every engine uses the same number: `ExpressionParser.MAX_DEPTH` in Python
     * and `ExpressionParser.maxDepth` in Swift. They must agree, or an
     * expression one engine accepts the other rejects.
     */
    static readonly MAX_DEPTH = 100;
    /**
     * Parses an input string into an array of DynamicValues.
     *
     * If the input contains no interpolation placeholders, returns the raw string as a single literal.
     *
     * @param input Raw string to parse.
     * @param depth Current recursion depth.
     * @returns An array of parsed dynamic values and literals.
     */
    parse(input: string, depth?: number): DynamicValue[];
    private extractInterpolationContent;
    /**
     * Parses a single expression string into a DynamicValue.
     *
     * Unlike `parse()`, which handles mixed literal text and interpolations,
     * this assumes the entire string is a single expression (e.g., as found inside `${...}`).
     *
     * @param expr The expression string to parse.
     * @param depth The current recursion depth.
     * @returns The resolved DynamicValue.
     */
    parseExpression(expr: string, depth?: number): DynamicValue;
    private parseExpressionInternal;
    private scanPathOrIdentifier;
    private parseFunctionCall;
    private scanIdentifier;
    private parseStringLiteral;
    /**
     * Whether the scanner is at the start of a number literal: a digit, a `.`
     * followed by a digit, or a `-` or `+` sign followed by either of those.
     *
     * The grammar has no arithmetic operators, so a sign here can only belong to
     * a literal. A `-` or `.` inside a path such as `a-1` or `a.5` never reaches
     * this check, because the path scanner consumes it as part of the token.
     */
    private isNumberStart;
    private parseNumberLiteral;
    /**
     * Consumes an exponent suffix (`e` or `E`, an optional sign, then digits)
     * if one is present.
     *
     * A malformed exponent such as `1e` or `1e+` is still consumed, so that
     * `parseNumberLiteral` reports it as an invalid literal instead of leaving
     * trailing characters behind.
     */
    private skipExponent;
    private isDigit;
}
