import type { CatalogInterface, ComponentApi, FunctionApi } from './types.js';
/**
 * Cleans auto-generated Zod schema artifacts and transforms REF markers into explicit `$ref` objects.
 *
 * Removes schema metadata and converts `REF:<url>|<desc>` description markers into `$ref` references.
 *
 * @param node The schema object or array node to sanitize in place.
 * @param visited Set of visited objects to prevent infinite recursion on cyclic structures.
 * @param options Sanitization options such as stripping additionalProperties.
 */
export declare function cleanSchemaNode(node: unknown, visited?: Set<unknown>, options?: {
    stripAdditionalProperties?: boolean;
}): void;
/**
 * Configuration options for catalog JSON schema generation.
 */
export interface GenerateValidationSchemaOptions {
    /** Reference URI to a base component schema envelope (e.g. `common_types.json#/$defs/ComponentCommon`). */
    componentEnvelopeRef?: string;
    /** Explicit standard $defs dictionary to use when serializing catalog components and functions. */
    standardDefs?: Record<string, unknown>;
    /** Explicit protocol version for standard $defs resolution ('v0.8' | 'v0.9' | 'v0.9.1' | '1.0'). */
    protocolVersion?: 'v0.8' | 'v0.9' | 'v0.9.1' | '1.0' | string;
}
type JsonObject = Record<string, unknown>;
/**
 * Reconstructs a specification-compliant A2UI catalog JSON Schema document from a Catalog instance.
 *
 * Components, functions and a theme with a definition in the catalog's
 * document model (see `catalogDocumentModel`) are built from it; other ones
 * defined in code are generated from their Zod schemas. References to common types become local references, and the
 * standard definitions and authored local definitions they reach are copied
 * into `$defs`, alongside the component and function unions.
 *
 * @param catalog The catalog instance to serialize.
 * @param options Optional configuration options such as component envelope wrapping.
 * @returns Specification-compliant A2UI Catalog JSON Schema object.
 */
export declare function generateValidationSchema<T extends ComponentApi = ComponentApi, F extends FunctionApi = FunctionApi>(catalog: CatalogInterface<T, F>, options?: GenerateValidationSchemaOptions): JsonObject;
/** @deprecated Use {@link GenerateValidationSchemaOptions} instead. */
export type GenerateCatalogSchemaOptions = GenerateValidationSchemaOptions;
/** @deprecated Use {@link generateValidationSchema} instead. */
export declare const generateCatalogSchema: typeof generateValidationSchema;
export {};
