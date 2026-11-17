import { Catalog, type ComponentApi } from '../catalog/types.js';
import { ProtocolVersion } from '../processing/adapters/base.js';
/** Maximum permitted nesting depth for JSON objects and array structures. */
export declare const MAX_GLOBAL_DEPTH = 50;
/** Maximum permitted recursion depth for nested function calls. */
export declare const MAX_FUNC_CALL_DEPTH = 5;
/** Regex pattern matching valid JSON Pointer syntax (RFC 6901 compliant with optional relative path). */
export declare const RELAXED_PATH_PATTERN: RegExp;
import { analyzeChildRefSchema, buildComponentRefMap, ChildRefAnalysis, ChildRefAnalysisOptions, ComponentChildRefs, ComponentRefMap, isChildListSchema, isChildOrChildListSchema, isChildSchema } from '../catalog/reference-map.js';
import { V08_CHILD_REF_OPTIONS } from '../v0_8/standard_defs.js';
import { V09_CHILD_REF_OPTIONS } from '../v0_9/standard_defs.js';
import { V10_CHILD_REF_OPTIONS } from '../v1_0/standard_defs.js';
import { isValidUax31Identifier, assertUax31Identifier } from '../common/uax31.js';
export type { ChildRefAnalysis, ChildRefAnalysisOptions, ComponentChildRefs, ComponentRefMap };
export { analyzeChildRefSchema, assertUax31Identifier, buildComponentRefMap, isChildListSchema, isChildOrChildListSchema, isChildSchema, isValidUax31Identifier, V08_CHILD_REF_OPTIONS, V09_CHILD_REF_OPTIONS, V10_CHILD_REF_OPTIONS, };
/**
 * Extracts child component IDs referenced by a component property definition.
 *
 * @param component Component definition object containing properties and metadata.
 * @param catalogOrRefMap Mapping defining single and list reference fields per component type or Catalog instance.
 * @yields Tuple of `[referencedId, propertyPath]` for each child reference found.
 *
 * @example
 * ```ts
 * const refs = Array.from(getComponentReferences(boxComponent, catalog));
 * ```
 */
export declare function getComponentReferences(component: Record<string, unknown>, catalogOrRefMap: Catalog<ComponentApi> | ComponentRefMap): Generator<[string, string]>;
/** Configuration options for component topology and hierarchy analysis. */
export interface TopologyOptions {
    /** Expected root component identifier. Defaults to 'root'. */
    rootId?: string;
    /** Whether to permit references to non-existent component identifiers. */
    allowDanglingReferences?: boolean;
    /** Whether to allow components that are not reachable from the root node. */
    allowOrphanComponents?: boolean;
    /** Whether to allow a component tree that does not contain a root component. */
    allowMissingRoot?: boolean;
    /** Maximum permitted global graph traversal depth. Defaults to 50. */
    maxDepth?: number;
}
/** Combined configuration specifying topology, version, and catalog validation rules. */
export interface ValidationConfig extends TopologyOptions {
    /** Target protocol version expected for incoming messages (e.g. 'v0.8', 'v0.9', 'v1.0'). */
    targetVersion?: ProtocolVersion | string;
    /**
     * Whether to allow components and functions that the resolved catalog does
     * not define. Defaults to false.
     *
     * A renderer that uses agent-side functions must either set this to `true`
     * or declare those functions, without implementations, in the catalog the
     * calls resolve to. Otherwise validation rejects the calls before they can
     * be routed to the agent with `callAgentFunction`.
     */
    allowUnknownElements?: boolean;
    /** Allowed top-level message operation types (e.g. ['createSurface', 'updateComponents']). */
    allowedMessages?: string[];
}
/** Strict validation configuration requiring root node presence, no orphans, valid references, and catalog compliance. */
export declare const STRICT_VALIDATION: ValidationConfig;
/** Relaxed validation configuration permitting orphan components, missing root, dangling references, and unknown elements. */
export declare const RELAXED_VALIDATION: ValidationConfig;
/**
 * Traverses a JSON data payload to validate path syntax and recursion limits.
 *
 * @param data Data payload or component hierarchy to evaluate.
 * @throws {A2uiRecursionError} If global structure depth or function call depth exceeds limits.
 * @throws {A2uiValidationError} If an invalid JSON Pointer path format is encountered.
 */
export declare function validateRecursionAndPaths(data: unknown): void;
