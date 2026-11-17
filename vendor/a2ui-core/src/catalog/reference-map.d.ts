import { type ChildRefAnalysisOptions, extractRefDefName } from '../resolution/ref-fields.js';
import type { Catalog, ComponentApi, FunctionApi } from './types.js';
export { type ChildRefAnalysisOptions, extractRefDefName };
/**
 * Child reference properties for a single component type.
 */
export interface ComponentChildRefs {
    /** Property names holding single child component references. */
    readonly singleRefs: ReadonlySet<string>;
    /** Property names holding child list references or dynamic templates. */
    readonly listRefs: ReadonlySet<string>;
    /**
     * Mapping of list property names to item sub-keys that hold child references.
     *
     * Used for list properties whose items are structured objects rather than
     * plain string component IDs. Keys are property names that also appear in
     * {@link listRefs}. A property is absent when its items are plain references
     * rather than objects, or when the schema declared no child-bearing sub-key.
     * Consumers treat an absent entry as "inspect every sub-key", preserving
     * fallback behavior.
     */
    readonly nestedRefs?: Readonly<Record<string, ReadonlySet<string>>>;
}
/** Map of component type names to child reference properties. */
export type ComponentRefMap = Record<string, ComponentChildRefs>;
/**
 * Result of checking whether a schema represents a component child reference or child list.
 */
export interface ChildRefAnalysis {
    /** Whether the schema represents a single child ComponentId reference. */
    isChild: boolean;
    /** Whether the schema represents a list of child references or a dynamic child template (ChildList). */
    isChildList: boolean;
}
/**
 * Analyzes a property schema (Zod schema or JSON Schema definition) to determine
 * if it represents a single component child reference (ComponentId) or child list (ChildList).
 *
 * Inspects explicit metadata stamps (`markChildRef`), $ref pointer targets (e.g.
 * `common_types.json#/$defs/ChildList`, `common_types.json#/$defs/ComponentId`,
 * `common_types.json#/$defs/Child`), schema descriptions with REF: prefixes,
 * structural unions (`{ componentId, path }` templates), and arrays of component IDs.
 *
 * @param schema Zod schema, JSON Schema object, or property schema definition.
 * @param options Required configuration specifying recognized child definition names.
 * @returns ChildRefAnalysis containing `isChild` and `isChildList` booleans.
 */
export declare function analyzeChildRefSchema(schema: unknown, options: ChildRefAnalysisOptions): ChildRefAnalysis;
/**
 * Returns whether the schema represents a single child ComponentId reference.
 *
 * @param schema The schema to evaluate.
 * @param options The child reference analysis options.
 * @returns Whether the schema is a single child reference.
 */
export declare function isChildSchema(schema: unknown, options: ChildRefAnalysisOptions): boolean;
/**
 * Returns whether the schema represents a child list or dynamic child template (ChildList).
 *
 * @param schema The schema to evaluate.
 * @param options The child reference analysis options.
 * @returns Whether the schema is a child list reference.
 */
export declare function isChildListSchema(schema: unknown, options: ChildRefAnalysisOptions): boolean;
/**
 * Returns whether the schema represents either a single child or a child list.
 *
 * @param schema The schema to evaluate.
 * @param options The child reference analysis options.
 * @returns Whether the schema is any child or child list reference.
 */
export declare function isChildOrChildListSchema(schema: unknown, options: ChildRefAnalysisOptions): boolean;
/**
 * Builds a ComponentRefMap dynamically by inspecting component Zod schemas.
 *
 * @param catalogOrComponents Catalog instance, array of ComponentApi objects, or Map of ComponentApis.
 * @param options Required configuration specifying recognized child definition names.
 * @returns ComponentRefMap containing single, list, and nested reference properties.
 */
export declare function buildComponentRefMap<T extends ComponentApi = ComponentApi, F extends FunctionApi = FunctionApi>(catalogOrComponents: Catalog<T, F> | ReadonlyArray<T> | ReadonlyMap<string, T>, options: ChildRefAnalysisOptions): ComponentRefMap;
