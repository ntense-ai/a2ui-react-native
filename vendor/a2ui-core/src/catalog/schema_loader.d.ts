import { z } from 'zod';
import type { CatalogDocumentOptions, ComponentApi, FunctionApi } from './types.js';
/**
 * The fields of a parsed catalog document: its ID, version and entries, and
 * the document-level fields a `Catalog` keeps so that `toJson` reproduces the
 * document.
 */
export interface ParsedCatalogSchema extends CatalogDocumentOptions {
    id: string;
    protocolVersion: string;
    components: ComponentApi[];
    functions: FunctionApi[];
    themeSchema?: z.ZodObject<z.ZodRawShape>;
}
/**
 * Protocol version assumed for a catalog schema that does not declare one.
 *
 * Catalog schemas only began carrying `protocolVersion` at v1.0, so a schema
 * that omits it predates that field.
 */
export declare const DEFAULT_PROTOCOL_VERSION = "0.9";
/**
 * Checks whether an object schema represents a shorthand parameter map (a map
 * of parameter names to subschemas), rather than a full JSON Schema object or
 * reference combinator.
 */
export declare function isShorthandParameterMap(schema: unknown): boolean;
/**
 * Converts a function argument JSON schema definition into a Zod object schema.
 *
 * Maps function argument schemas to object properties, requiring fields listed in
 * `required` and applying strictness or passthrough based on `additionalProperties`,
 * `patternProperties` and reference resolution.
 *
 * @param rawSchema Raw function arguments schema.
 * @param rootDoc Optional root schema document for reference resolution.
 * @param defCache Cache mapping reference strings to resolved Zod schemas.
 * @returns Zod object schema validating function arguments, wrapped in a
 *     refinement when `patternProperties` apply.
 */
export declare function convertFunctionArgsJsonSchemaToZod(rawSchema: Record<string, unknown>, rootDoc?: Record<string, unknown>, defCache?: Map<string, z.ZodTypeAny>): z.ZodTypeAny;
/**
 * Whether a value is a Zod schema. Checked structurally so schemas built with
 * another copy of Zod are recognized.
 */
export declare function isZodSchema(value: unknown): value is z.ZodTypeAny;
/**
 * Collects every object property key a Zod schema declares.
 *
 * Unlike `getKnownSchemaKeys`, which answers which keys an object may have, it
 * also collects the keys of an open (`.passthrough()`) object, and of every
 * branch of a union. It traverses `ZodEffects`, `ZodOptional`, `ZodNullable`,
 * `ZodDefault`, `ZodCatch`, `ZodIntersection`, `ZodUnion`,
 * `ZodDiscriminatedUnion`, `ZodPipeline`, `ZodReadonly` and `ZodBranded`.
 *
 * @param schema Zod schema to inspect.
 * @returns The declared property names; empty when the schema declares none.
 */
export declare function getDeclaredSchemaKeys(schema: z.ZodTypeAny): Set<string>;
/**
 * Extracts declared parameter names from a function's argument schema,
 * including those of `allOf`, `anyOf` and `oneOf` members and `$ref` targets.
 */
export declare function functionParameterNames(schema: unknown, rootDoc?: Record<string, unknown>): string[];
/**
 * Parses a raw A2UI catalog schema into its typed component, function, and metadata fields.
 *
 * Parses component and function definitions, extracts hierarchy constraints (`allowedParents`,
 * `allowedChildren`), unescapes RFC 6901 JSON pointers, and builds runtime Zod validators.
 *
 * @param inputSchema Raw catalog schema or capabilities definition object. It
 *   is copied first and never referenced afterwards.
 * @param protocolVersion Protocol version of the catalog. When given, it takes
 *   precedence over the `protocolVersion` the schema declares and selects the
 *   version's loading rules; the declared version is still kept as written.
 *   Catalog schemas published before v1.0 omit `protocolVersion`; when
 *   neither the caller nor the schema supplies it, `DEFAULT_PROTOCOL_VERSION`
 *   applies.
 * @param catalogIdOverride Catalog ID to use instead of the one the schema
 *   declares. The schema itself is kept as written.
 * @returns Parsed catalog fields ready to construct a `Catalog` instance.
 * @throws {Error} If the catalog ID is missing or not a string.
 * @throws {A2uiCatalogError} If a v1.0+ catalog has a `$ref` to a document
 *   other than itself or `common_types.json`, such as another catalog.
 */
export declare function parseCatalogSchema(inputSchema: Record<string, unknown>, protocolVersion?: string, catalogIdOverride?: string): ParsedCatalogSchema;
