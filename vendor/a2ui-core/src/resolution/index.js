/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Headless resolution abstractions, context management, property binders, and view node graph.
 *
 * Provides reactive node resolution, component and data context hierarchies,
 * schema behavior analysis, child reference extraction, dynamic binding wrappers,
 * and markdown rendering type definitions.
 */
export { ComponentContext } from './component-context.js';
export { getKnownSchemaKeys, validateFunctionArgs, isSingleAtKey, unescapeObjectKey, validateReservedDirectives, resolveContextIndex, MAX_DYNAMIC_VALUE_DEPTH, DataContext, } from './data-context.js';
export { GenericBinder, MAX_DYNAMIC_CHILD_LIST_SIZE, getSafeChildList, scrapeComponentBehavior, scrapeSchemaBehavior, } from './generic-binder.js';
export {
/** The component type name used for pending and cyclic placeholder nodes. */
PLACEHOLDER_TYPE,
/** Narrows an unknown value to a ComponentNode. */
isComponentNode, } from './component-node.js';
export { NodeResolver } from './node-resolver.js';
export { extractRefFields, } from './ref-fields.js';
export { isWritable, sameBinding, ResolvedBinding, WritableBinding } from './resolved-binding.js';
