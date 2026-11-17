/**
 * Function implementations for the v1.0 basic catalog.
 */
import { FunctionImplementation } from '../../../../catalog/types.js';
export declare const AndImplementation: FunctionImplementation;
export declare const OrImplementation: FunctionImplementation;
export declare const NotImplementation: FunctionImplementation;
export declare const FormatStringImplementation: FunctionImplementation;
export declare function createFormatNumberImplementation(locale?: string): FunctionImplementation;
export declare const FormatNumberImplementation: FunctionImplementation;
export declare function createFormatCurrencyImplementation(locale?: string): FunctionImplementation;
export declare const FormatCurrencyImplementation: FunctionImplementation;
export declare function createFormatDateImplementation(locale?: string): FunctionImplementation;
export declare const FormatDateImplementation: FunctionImplementation;
export declare function createPluralizeImplementation(locale?: string): FunctionImplementation;
export declare const PluralizeImplementation: FunctionImplementation;
export declare const OpenUrlImplementation: FunctionImplementation;
/**
 * Creates the complete function set for a v1.0 basic catalog.
 *
 * The set matches the functions declared in
 * `specification/v1_0/catalogs/basic/catalog.json`, plus the `@index` system
 * function, which the `@` namespace makes available to every catalog.
 *
 * @param options Configuration options containing an optional locale.
 * @returns Array of function implementations.
 */
export declare function createBasicCatalogFunctions(options?: {
    locale?: string;
}): FunctionImplementation[];
/** Standard function implementations for the v1.0 basic catalog. */
export declare const BASIC_FUNCTIONS: FunctionImplementation[];
