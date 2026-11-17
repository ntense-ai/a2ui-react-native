/**
 * @fileoverview Specification-shaped catalog definitions of Zod models.
 *
 * A component of a catalog defined in code is a Zod object of all of its
 * properties, annotated (see `spec_annotations.ts`) with the mixins its
 * definition composes with `allOf` and anything else the catalog document
 * writes that Zod does not express. A function's model is the Zod object of
 * its arguments. This module turns such models back into the definitions a
 * catalog document writes. The layout rules depend only on the protocol
 * version, not on the catalog.
 *
 * This module is internal to web_core and is not re-exported by any facade.
 */
import { z } from 'zod';
type JsonObject = Record<string, unknown>;
/** The reference a common types document is written as when a catalog names none. */
export declare const DEFAULT_COMMON_TYPES_URI = "common_types.json";
/**
 * Returns the common types definitions of a protocol version. A version with
 * no entry of its own at or above 1.0 gets the v1.0 definitions, and any other
 * version the v0.9 definitions.
 *
 * @param version A protocol version.
 */
export declare function standardDefsForVersion(version: string | undefined): Record<string, unknown>;
/**
 * Returns whether a component's schema is a specification-shaped model: one
 * annotated with the mixins its definition composes.
 */
export declare function isSpecComponentSchema(schema: unknown): boolean;
/**
 * Returns whether a function's argument schema is a specification-shaped
 * model: one with an annotation.
 */
export declare function isSpecFunctionSchema(schema: unknown): boolean;
/**
 * Returns whether a function's argument JSON Schema requires `args` to be
 * supplied on a call to the function: that is, whether an omitted (empty)
 * argument object cannot satisfy the schema.
 *
 * A schema requires arguments when it directly declares `required` properties
 * or a positive `minProperties`, when any member of an `allOf` requires
 * arguments, when every branch of a non-empty `oneOf` or `anyOf` union
 * requires arguments, or when a local `#/$defs/...` `$ref` resolves in `defs`
 * to a schema that requires arguments. A schema that carries a `default`
 * value does not require arguments.
 *
 * @param schema The function's `args` JSON Schema.
 * @param defs Optional `$defs` map for resolving local `#/$defs/...` references.
 * @param visited References already on the resolution stack.
 */
export declare function schemaRequiresArgs(schema: unknown, defs?: Readonly<Record<string, unknown>>, visited?: ReadonlySet<string>): boolean;
/** A definition and the catalog definitions it needs. */
export interface SpecSchema {
    /** The definition. */
    readonly schema: JsonObject;
    /**
     * The models of the catalog definitions the definition references, by
     * name, such as a component's `CatalogComponentCommon` mixin.
     */
    readonly catalogDefs: ReadonlyMap<string, z.ZodTypeAny>;
}
/**
 * Builds specification-shaped definitions of Zod models for a protocol
 * version.
 */
export declare class SpecShaper {
    private readonly commonTypesUri;
    private readonly isV08;
    private readonly isV10;
    private readonly standardDefs;
    /** Standard definitions with their references written as the catalog does. */
    private readonly standardDefsInCatalog;
    /**
     * @param protocolVersion The catalog's protocol version.
     * @param commonTypesUri How the catalog's document writes the common types
     *     document in references, such as `common_types.json`.
     */
    constructor(protocolVersion: string, commonTypesUri?: string);
    /**
     * Returns the definition a catalog document writes for a component.
     *
     * @param name The component's name.
     * @param schema The component's schema, annotated with its mixins.
     * @param allowedParents The component's allowed parents, if restricted.
     * @param allowedChildren The component's allowed children, if restricted.
     */
    componentSchema(name: string, schema: z.ZodTypeAny, allowedParents?: readonly string[], allowedChildren?: readonly string[]): SpecSchema;
    /**
     * Returns the definition a catalog document writes for a function: the
     * schema of a call to it.
     *
     * @param name The function's name.
     * @param fn The function's API, whose `schema` is its argument model.
     */
    functionSchema(name: string, fn: {
        readonly schema: z.ZodTypeAny;
        readonly returnType: string;
        readonly description?: string;
        readonly allowedCallers?: string;
        readonly requiresUserActivation?: boolean;
    }, defs?: Readonly<Record<string, unknown>>, catalogDefs?: Map<string, z.ZodTypeAny>): JsonObject;
    /**
     * Returns the definition a catalog document writes for a model, such as a
     * mixin or a theme.
     *
     * @param schema The model.
     */
    defSchema(schema: z.ZodTypeAny, catalogDefs?: Map<string, z.ZodTypeAny>): JsonObject;
    /** Returns the reference a component's definition makes to a mixin. */
    private mixinRef;
    /** Returns the names of the properties a mixin declares. */
    private mixinProperties;
    /**
     * Returns the JSON Schema a catalog document writes for a Zod schema.
     *
     * @param schema The schema.
     * @param catalogDefs Optional map collecting referenced catalog `$defs` models.
     * @param isDefRoot Whether `schema` is the root of a `$defs` entry being serialized.
     */
    toJson(schema: z.ZodTypeAny, catalogDefs?: Map<string, z.ZodTypeAny>, isDefRoot?: boolean): JsonObject;
    /**
     * Returns the standard definition a reference in the catalog document names
     * (`<commonTypesUri>#/$defs/<name>`), or `undefined` for any other
     * reference. A bare `#/$defs/<name>` in the catalog document names one of
     * the catalog's own definitions, which may share a standard definition's
     * name, so it is not followed.
     *
     * The definition is returned with its own references, which are local to
     * the common types document, written as the catalog document writes them,
     * so that they resolve against the same document when followed in turn.
     */
    private resolveStandardRef;
    /**
     * Returns a copy of a part of the common types document with its local
     * references written as the catalog document writes them.
     */
    private withCatalogRefs;
    /** Writes a `REF:` marker's reference as the catalog document does. */
    private refTarget;
    /** Converts the core of a schema, below its wrappers. */
    private coreJson;
    /**
     * Converts an object schema, keeping the properties `keep` accepts. Its
     * `required` list follows the annotation, or else the property order.
     */
    private objectSchema;
}
export {};
