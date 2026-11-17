import type { z } from 'zod';
import { type JsonSchemaObject } from './spec_annotations.js';
import type { CatalogUnions, ComponentApi, FunctionApi } from './types.js';
/** Names of the union definitions a catalog computes from its entries. */
export declare const UNION_DEF_NAMES: ReadonlySet<string>;
/** Top-level keys under which a catalog document may declare its theme. */
export declare const THEME_DOCUMENT_KEYS: readonly ["theme", "themeSchema", "styles"];
/**
 * The catalog state that `serializeCatalogDocument` reads.
 *
 * A structural subset of `Catalog`, so the serializer does not depend on the
 * class itself.
 */
export interface SerializableCatalog {
    readonly id: string;
    readonly protocolVersion: string;
    readonly components: ReadonlyMap<string, ComponentApi>;
    readonly functions: ReadonlyMap<string, FunctionApi>;
    readonly themeSchema?: z.ZodTypeAny;
    readonly instructions?: string;
    readonly schemaUri?: string;
    readonly schemaId?: string;
    readonly title?: string;
    readonly description?: string;
    readonly declaredProtocolVersion?: string | null;
    readonly declaresCatalogId?: boolean;
    readonly declaresComponents?: boolean;
    readonly functionsLayout?: 'map' | 'list';
    readonly unions?: CatalogUnions;
    readonly defs?: Readonly<Record<string, unknown>>;
    readonly extensionFields?: Readonly<Record<string, unknown>>;
    readonly commonTypesUri?: string;
    readonly themeLocation?: 'defs' | 'styles';
    readonly defModels?: readonly z.ZodTypeAny[];
}
type JsonObject = Record<string, unknown>;
/**
 * Returns a deep copy of a JSON value.
 *
 * @param value JSON-compatible value to copy.
 * @returns A structurally equal copy that shares no objects with `value`.
 */
export declare function deepCopyJson<V>(value: V): V;
/**
 * Freezes a JSON value and everything it contains, in place.
 *
 * @param value JSON-compatible value.
 * @returns `value`.
 */
export declare function deepFreeze<V>(value: V): V;
/**
 * Returns a deeply frozen copy of a JSON value, or the value itself when it is
 * already frozen.
 *
 * @param value JSON-compatible value.
 */
export declare function frozenJson<V>(value: V): V;
/**
 * Returns the definition of an entry `Catalog.fromJson` loaded, if
 * `toJson` and `validationSchema` can use it in a catalog with `defs`, or
 * `undefined` when they should build the entry from its model instead.
 *
 * A definition is used when every local `#/$defs/<name>` reference it reaches
 * resolves against `defs` (or names a union the catalog computes). A loaded
 * entry reused in a catalog without the definitions it references falls back
 * to its Zod schema.
 *
 * @param entry A component or function.
 * @param defs The definitions of the catalog that holds the entry.
 */
export declare function entryDefinition(entry: ComponentApi | FunctionApi, defs: Readonly<JsonObject> | undefined): JsonSchemaObject | undefined;
/**
 * Whether a function definition is an item of a `functions` list (with its
 * `name` and `parameters`) rather than an entry of a `functions` map.
 */
export declare function isFunctionListItem(definition: JsonSchemaObject): boolean;
/**
 * Returns the definitions of `defs` that a catalog with the entries `after`
 * keeps, given that it is derived from a catalog with the entries `before`.
 *
 * A definition that only entries of `before` missing from `after` reached is
 * dropped. One that no entry of `before` reached, such as a theme, is kept,
 * and so is everything it reaches.
 *
 * @param defs The `defs` of the catalog derived from.
 * @param before The entries of the catalog derived from.
 * @param after The entries of the derived catalog.
 * @param extensionFields The document's other top-level fields, whose
 *     references keep definitions too.
 * @returns `defs` itself when nothing is dropped.
 */
export declare function retainedDefs(defs: Readonly<JsonObject> | undefined, before: ReadonlyArray<ComponentApi | FunctionApi>, after: ReadonlyArray<ComponentApi | FunctionApi>, extensionFields?: Readonly<JsonObject>): Readonly<JsonObject> | undefined;
export declare function buildComponentUnion(names: Iterable<string>): JsonObject;
export declare function buildFunctionUnion(names: Iterable<string>): JsonObject;
/**
 * A catalog's document in model form: the definition of each entry, where it
 * has one, and the document's definitions and other top-level fields.
 */
export interface CatalogDocumentModel {
    /**
     * The definition of each component: the one `fromJson` loaded, or the one
     * computed from a specification model. `undefined` for a component that
     * `toJson` and `validationSchema` generate from its Zod schema.
     */
    readonly components: ReadonlyMap<string, JsonSchemaObject | undefined>;
    /** The definition of each function, as for `components`. */
    readonly functions: ReadonlyMap<string, JsonSchemaObject | undefined>;
    /**
     * The document's named definitions, without the computed unions: the
     * catalog's `defs`, and the definitions computed from its models (the
     * mixins of its components and its `defModels`).
     */
    readonly defs: Readonly<JsonObject>;
    /**
     * The document's other top-level fields: the catalog's `extensionFields`
     * and a theme written under `styles`.
     */
    readonly extensionFields: Readonly<JsonObject>;
}
/**
 * Returns the document model of a catalog, computed from the catalog's
 * entries, fields and models, and memoized per catalog. It is deeply frozen.
 *
 * @param catalog The catalog.
 */
export declare function catalogDocumentModel(catalog: SerializableCatalog): CatalogDocumentModel;
/**
 * Serializes a catalog into an unbundled catalog document, assembled from the
 * catalog's model. See `Catalog.toJson` for the full contract.
 *
 * @param catalog The catalog to serialize.
 * @returns A fresh catalog document that shares no objects with the catalog.
 */
export declare function serializeCatalogDocument(catalog: SerializableCatalog): JsonObject;
export {};
