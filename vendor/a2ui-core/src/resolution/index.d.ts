/**
 * Headless resolution abstractions, context management, property binders, and view node graph.
 *
 * Provides reactive node resolution, component and data context hierarchies,
 * schema behavior analysis, child reference extraction, dynamic binding wrappers,
 * and markdown rendering type definitions.
 */
export { ComponentContext } from './component-context.js';
export { getKnownSchemaKeys, validateFunctionArgs, isSingleAtKey, unescapeObjectKey, validateReservedDirectives, resolveContextIndex, MAX_DYNAMIC_VALUE_DEPTH, DataContext, } from './data-context.js';
export { GenericBinder, MAX_DYNAMIC_CHILD_LIST_SIZE, getSafeChildList, scrapeComponentBehavior, scrapeSchemaBehavior, type BehaviorNode, type GenerateSetters, type ResolveA2uiProp, type ResolveA2uiProps, type ResolvedChildRef, } from './generic-binder.js';
export {
/** The component type name used for pending and cyclic placeholder nodes. */
PLACEHOLDER_TYPE,
/** Narrows an unknown value to a ComponentNode. */
isComponentNode,
/** Resolved component instance in the rendered node tree. */
type ComponentNode,
/** Bound action closure produced by the node resolver and binder. */
type NodeAction,
/** Resolved component node properties, keyed by property name. */
type NodeProps,
/** Resolution state of a component node in the rendered tree. */
type NodeState, } from './component-node.js';
export { NodeResolver } from './node-resolver.js';
export { extractRefFields, type ChildRefAnalysisOptions, type RefFields, type RefKind, } from './ref-fields.js';
export { isWritable, sameBinding, ResolvedBinding, WritableBinding } from './resolved-binding.js';
export type {
/** Asynchronous markdown rendering function. */
MarkdownRenderer,
/** Configuration options for markdown rendering and styling. */
MarkdownRendererOptions,
/** Mapping of HTML tag names to class lists applied during markdown rendering. */
MarkdownRendererTagClassMap, } from '../common/markdown.js';
