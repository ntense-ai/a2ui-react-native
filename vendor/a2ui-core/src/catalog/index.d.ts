/**
 * Catalog interfaces and component/function registration utilities.
 */
export { createFunctionImplementation, type ComponentChildRefs, AgentFunction, isAgentFunction, type AgentFunctionContext, type AgentFunctionHandler, type AgentFunctionInit, type A2uiReturnTypeMap, type A2uiReturnType, type InferA2uiReturnType, type FunctionApi, type JsonSchemaObject, type FunctionImplementation, type ResolvedDynamic, type ResolvedFunctionArgs, type ComponentApi, type InferredComponentApiSchemaType, type CatalogUnions, type CatalogDocumentOptions, type CatalogOptions, type CopyWithCatalogOptions, type DeriveCatalogOptions, type CatalogInterface, Catalog, type CatalogApi, } from './types.js';
export type { FunctionInvoker } from './function_invoker.js';
export { JsonComponentApi, JsonFunctionApi } from './json_entries.js';
export { spec, specDef, type SpecAnnotation, type SpecMixin } from './spec_annotations.js';
