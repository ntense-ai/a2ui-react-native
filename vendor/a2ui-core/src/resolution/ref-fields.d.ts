import { z } from 'zod';
import { type ChildRefKind } from '../types/child-ref-helpers.js';
/**
 * Options for configuring child reference analysis.
 */
export interface ChildRefAnalysisOptions {
    /** Set of definition names recognized as single child references. */
    childRefNames: ReadonlySet<string>;
    /** Set of definition names recognized as child list references. */
    childListRefNames: ReadonlySet<string>;
    /** Optional set of string property names recognized as single child references (e.g. in v0.8 schemas without $ref). */
    childPropertyNames?: ReadonlySet<string>;
}
/**
 * Extracts the target definition name from a JSON Schema `$ref` pointer or URI.
 *
 * @param ref The JSON Schema reference string or URI.
 * @returns Target definition name.
 */
export declare function extractRefDefName(ref: string): string;
/**
 * Describes how a component schema property references child components.
 */
export type RefKind = {
    /** The property holds a single child component id. */
    readonly kind: 'single';
} | {
    /** The property holds a `ChildList` (static id array or template). */
    readonly kind: 'list';
} | {
    /**
     * The property holds an array of plain objects in which `keys` are
     * single child references (e.g. a tab strip's `items[].child`).
     */
    readonly kind: 'nested';
    readonly keys: ReadonlySet<string>;
};
/** Child-referencing properties of a component schema, keyed by property name. */
export type RefFields = ReadonlyMap<string, RefKind>;
/**
 * Unwrapped Zod schema and metadata collected across single-inner-type wrappers
 * (`optional`, `nullable`, `default`, `readonly`, `catch`, `effects`, `brand`, `lazy`).
 */
export interface UnwrappedZodField {
    readonly schema: z.ZodTypeAny;
    readonly descriptions: string[];
    readonly firstRefDefName: string;
    readonly refDefNames: Set<string>;
    readonly bareDefNames: Set<string>;
    readonly refs: Set<ChildRefKind>;
    readonly traversed: Set<z.ZodTypeAny>;
    readonly hasTransform: boolean;
}
/**
 * Unwraps optional/nullable/default/readonly/catch/effects/branded/lazy wrappers,
 * collecting descriptions, `REF:` definition names, and child-ref markers along
 * the chain while stopping at combinators (`ZodPipeline`, `ZodIntersection`,
 * `ZodUnion`, `ZodDiscriminatedUnion`) and structural types.
 */
export declare function unwrapZodField(schema: z.ZodTypeAny): UnwrappedZodField;
/**
 * Returns the option schemas of a `ZodUnion` or `ZodDiscriminatedUnion`, or
 * `undefined` if `schema` is neither.
 */
export declare function getUnionOptions(schema: z.ZodTypeAny): z.ZodTypeAny[] | undefined;
/**
 * Returns whether an unwrapped `ZodObject` matches a dynamic child-list template
 * shape (`{ componentId, path | @path | dataBinding }` or v0.8 `explicitList`/`template`).
 */
export declare function isTemplateRefObject(schema: z.ZodTypeAny): boolean;
/**
 * Returns whether `schema` can accept a single component ID string on the wire.
 */
export declare function canSchemaHoldSingleRef(schema: z.ZodTypeAny, options?: ChildRefAnalysisOptions): boolean;
/**
 * Returns whether `schema` can accept a child list or template on the wire.
 */
export declare function canSchemaHoldListRef(schema: z.ZodTypeAny, options?: ChildRefAnalysisOptions): boolean;
/**
 * Returns whether property `key` with `schema` classifies as a single-child component reference.
 */
export declare function isSingleChildPropertySchema(key: string, schema: z.ZodTypeAny, options?: ChildRefAnalysisOptions): boolean;
/**
 * Returns whether `schema` can accept an object or array value on the wire.
 */
export declare function canSchemaHoldObjectOrArray(schema: z.ZodTypeAny): boolean;
/**
 * Extracts the child-referencing properties and their kinds from a component Zod schema.
 *
 * Recognizes explicit child-reference metadata (`ComponentIdSchema`, `ChildSchema`,
 * `ChildListSchema`, and `REF:` description pointers), unannotated `child` and
 * `children` properties whose types can hold component references, and open or
 * unannotated empty-shape stub schemas (`z.object({})`, `.passthrough()`,
 * `.catchall(...)`, `z.record(...)`, `z.any()`, `z.unknown()`).
 *
 * @param schema Component Zod schema to inspect.
 * @param options Optional custom child reference analysis options.
 * @returns Map of child-referencing property names to their reference kinds.
 */
export declare function extractRefFields(schema: z.ZodTypeAny, options?: ChildRefAnalysisOptions): RefFields;
