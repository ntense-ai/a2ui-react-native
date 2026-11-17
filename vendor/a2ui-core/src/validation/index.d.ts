/**
 * Validation utilities for A2UI payloads, messages, and component graphs.
 *
 * Re-exports payload structural validation and component reference integrity checks.
 */
export { getComponentReferences, validateRecursionAndPaths, MAX_GLOBAL_DEPTH, MAX_FUNC_CALL_DEPTH, RELAXED_PATH_PATTERN, type ChildRefAnalysis, type ChildRefAnalysisOptions, type ComponentChildRefs, type ComponentRefMap, analyzeChildRefSchema, assertUax31Identifier, buildComponentRefMap, isChildListSchema, isChildOrChildListSchema, isChildSchema, isValidUax31Identifier, V08_CHILD_REF_OPTIONS, V09_CHILD_REF_OPTIONS, V10_CHILD_REF_OPTIONS, type TopologyOptions, type ValidationConfig, STRICT_VALIDATION, RELAXED_VALIDATION, } from './integrity-checker.js';
export { PayloadValidator } from './payload-validator.js';
