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
 * A2UI Web Core Library.
 *
 * Provides core catalog-agnostic state management, data binding, expression evaluation,
 * message processing, and validation infrastructure for A2UI renderers and clients.
 */
export { JsonComponentApi, JsonFunctionApi, spec, specDef, createFunctionImplementation, AgentFunction, isAgentFunction, Catalog, } from './catalog/index.js';
export { SurfaceModel, SurfaceGroupModel, SurfaceComponentsModel, ComponentModel, MAX_ARRAY_INDEX, DataModel, } from './state/index.js';
export { mapErrorToRendererMessage, extractEnvelopeErrorContext, normalizeJsonPointer, STRICT_VALIDATION, RELAXED_VALIDATION, A2uiRpcError, RpcErrorCode, formatZodIssue, MessageProcessor, VersionAdapterFactory, defaultVersionAdapterFactory, isCatalogVersionCompatible, registerKnownActionsProvider, SUPPORTED_PROTOCOL_VERSIONS, DEFAULT_CATALOG_COMPATIBILITY, BaseVersionAdapter, A2uiError, A2uiValidationError, A2uiDataError, A2uiExpressionError, A2uiStateError, A2uiCatalogError, A2uiIntegrityError, A2uiRecursionError, } from './processing/index.js';
export { PLACEHOLDER_TYPE, isComponentNode, ComponentContext, getKnownSchemaKeys, validateFunctionArgs, isSingleAtKey, unescapeObjectKey, validateReservedDirectives, resolveContextIndex, MAX_DYNAMIC_VALUE_DEPTH, DataContext, scrapeComponentBehavior, scrapeSchemaBehavior, getSafeChildList, MAX_DYNAMIC_CHILD_LIST_SIZE, GenericBinder, NodeResolver, extractRefFields, isWritable, sameBinding, ResolvedBinding, WritableBinding, } from './resolution/index.js';
export { PayloadValidator, getComponentReferences, validateRecursionAndPaths, MAX_GLOBAL_DEPTH, MAX_FUNC_CALL_DEPTH, RELAXED_PATH_PATTERN, analyzeChildRefSchema, assertUax31Identifier, buildComponentRefMap, isChildListSchema, isChildOrChildListSchema, isChildSchema, isValidUax31Identifier, V08_CHILD_REF_OPTIONS, V09_CHILD_REF_OPTIONS, V10_CHILD_REF_OPTIONS, } from './validation/index.js';
export { setSignalImplementation, signal, computed, effect, batchWrite, isSignal, getValue, setValue, peekValue, _PRIVATE_DEFAULT_SIGNAL_IMPLEMENTATION, } from './reactivity/index.js';
export { MAX_EXPRESSION_TEMPLATE_LENGTH, MAX_EXPRESSION_PARTS, ExpressionParser, } from './expressions/index.js';
export { EventEmitter, } from './common/events.js';
export { sanitizeMediaUrl } from './common/sanitize_media_url.js';
export { validateMetadata, cloneMetadata, metadataEquals, } from './common/metadata.js';
export { normalizeVersionString, parseSemVer, toSemVer, toCanonicalVersion, compareSemVer, isAtLeastVersion, } from './common/semver.js';
export { MAX_REGEX_PATTERN_CODE_POINTS, MAX_REGEX_VALUE_CODE_POINTS, RegexSyntaxError, analyzeRegex, checkRegexSafety, parseRegexSubset, } from './common/regex_subset.js';
export { SpecVersion } from './spec_versions.js';
export { isSafeRegex } from './v0_9/basic_catalog/functions/safe_regex.js';
