/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { A2uiRecursionError, A2uiValidationError } from '../errors.js';
import { Catalog } from '../catalog/types.js';
/** Maximum permitted nesting depth for JSON objects and array structures. */
export const MAX_GLOBAL_DEPTH = 50;
/** Maximum permitted recursion depth for nested function calls. */
export const MAX_FUNC_CALL_DEPTH = 5;
/** Regex pattern matching valid JSON Pointer syntax (RFC 6901 compliant with optional relative path). */
export const RELAXED_PATH_PATTERN = /^(?:(?:\/(?:[^~/]|~[01])*)*|(?:[^~/]|~[01])+(?:\/(?:[^~/]|~[01])*)*)$/;
import { analyzeChildRefSchema, buildComponentRefMap, isChildListSchema, isChildOrChildListSchema, isChildSchema, } from '../catalog/reference-map.js';
import { V08_CHILD_REF_OPTIONS } from '../v0_8/standard_defs.js';
import { V09_CHILD_REF_OPTIONS } from '../v0_9/standard_defs.js';
import { V10_CHILD_REF_OPTIONS } from '../v1_0/standard_defs.js';
import { isValidUax31Identifier, assertUax31Identifier } from '../common/uax31.js';
export { analyzeChildRefSchema, assertUax31Identifier, buildComponentRefMap, isChildListSchema, isChildOrChildListSchema, isChildSchema, isValidUax31Identifier, V08_CHILD_REF_OPTIONS, V09_CHILD_REF_OPTIONS, V10_CHILD_REF_OPTIONS, };
/**
 * Yields `[referencedId, path]` pairs for every child reference reachable from a
 * property value.
 *
 * @param val The property value to walk.
 * @param currentPath The property path accumulated so far.
 * @param nestedKeys Item sub-keys the catalog declared as child references, for
 *   a list property whose items are structured objects. When omitted, every
 *   sub-key of such an item is walked.
 */
function* extractPointers(val, currentPath, nestedKeys, inArray = false) {
    if (typeof val === 'string') {
        yield [val, currentPath];
    }
    else if (Array.isArray(val)) {
        for (let idx = 0; idx < val.length; idx++) {
            const item = val[idx];
            const subPath = `${currentPath}[${idx}]`;
            yield* extractPointers(item, subPath, nestedKeys, true);
        }
    }
    else if (typeof val === 'object' && val !== null) {
        const obj = val;
        const isTemplate = Object.prototype.hasOwnProperty.call(obj, 'componentId') &&
            typeof obj['componentId'] === 'string' &&
            (Object.prototype.hasOwnProperty.call(obj, 'path') ||
                Object.prototype.hasOwnProperty.call(obj, '@path') ||
                Object.prototype.hasOwnProperty.call(obj, 'dataBinding'));
        const isV08ListWrapper = !inArray &&
            (Array.isArray(obj['explicitList']) ||
                (typeof obj['template'] === 'object' && obj['template'] !== null));
        if (nestedKeys?.size &&
            (inArray ||
                (!isTemplate && !isV08ListWrapper) ||
                Array.from(nestedKeys).some(subKey => Object.prototype.hasOwnProperty.call(obj, subKey)))) {
            // The catalog declared exactly which sub-keys carry a child, so sibling
            // properties such as a tab title are not references.
            for (const subKey of nestedKeys) {
                if (Object.prototype.hasOwnProperty.call(obj, subKey)) {
                    yield* extractPointers(obj[subKey], `${currentPath}.${subKey}`);
                }
            }
        }
        else if (isTemplate) {
            yield [obj['componentId'], `${currentPath}.componentId`];
        }
        else if (Object.prototype.hasOwnProperty.call(obj, 'path') ||
            Object.prototype.hasOwnProperty.call(obj, '@path') ||
            Object.prototype.hasOwnProperty.call(obj, 'call') ||
            Object.prototype.hasOwnProperty.call(obj, '@call')) {
            return;
        }
        else {
            for (const [subKey, subVal] of Object.entries(obj)) {
                yield* extractPointers(subVal, `${currentPath}.${subKey}`);
            }
        }
    }
}
function getOrCreateRefMap(catalog) {
    return catalog.componentRefMap;
}
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
export function* getComponentReferences(component, catalogOrRefMap) {
    if (!component || typeof component !== 'object') {
        return;
    }
    const refFieldsMap = catalogOrRefMap instanceof Catalog ? getOrCreateRefMap(catalogOrRefMap) : catalogOrRefMap;
    const compVal = component.component;
    let compType = '';
    let props = component;
    if (typeof compVal === 'string') {
        compType = compVal;
    }
    else if (typeof compVal === 'object' && compVal !== null) {
        const compObj = compVal;
        compType = Object.keys(compObj)[0] ?? '';
        props = compObj[compType] ?? {};
    }
    if (!compType || typeof props !== 'object' || props === null) {
        return;
    }
    const childRefs = refFieldsMap[compType];
    const singleRefs = childRefs ? childRefs.singleRefs : new Set();
    const listRefs = childRefs ? childRefs.listRefs : new Set();
    const nestedRefs = childRefs?.nestedRefs;
    for (const [key, value] of Object.entries(props)) {
        if (singleRefs.has(key) || listRefs.has(key)) {
            yield* extractPointers(value, key, nestedRefs?.[key]);
        }
    }
}
/** Strict validation configuration requiring root node presence, no orphans, valid references, and catalog compliance. */
export const STRICT_VALIDATION = Object.freeze({
    allowOrphanComponents: false,
    allowDanglingReferences: false,
    allowMissingRoot: false,
    allowUnknownElements: false,
});
/** Relaxed validation configuration permitting orphan components, missing root, dangling references, and unknown elements. */
export const RELAXED_VALIDATION = Object.freeze({
    allowOrphanComponents: true,
    allowDanglingReferences: true,
    allowMissingRoot: true,
    allowUnknownElements: true,
});
function traverseRecursionAndPaths(item, globalDepth, funcDepth) {
    if (globalDepth > MAX_GLOBAL_DEPTH) {
        throw new A2uiRecursionError(`Global recursion limit exceeded: Depth > ${MAX_GLOBAL_DEPTH}`);
    }
    if (Array.isArray(item)) {
        for (const x of item) {
            traverseRecursionAndPaths(x, globalDepth + 1, funcDepth);
        }
        return;
    }
    if (typeof item === 'object' && item !== null) {
        const obj = item;
        // v1.0 binds data with `@path`; earlier versions and templates use `path`.
        for (const path of [obj.path, obj['@path']]) {
            if (typeof path === 'string' && !RELAXED_PATH_PATTERN.test(path)) {
                throw new A2uiValidationError(`Invalid path syntax: '${path}'`);
            }
        }
        const isFunctionCallWrapper = Object.prototype.hasOwnProperty.call(obj, 'functionCall') &&
            typeof obj.functionCall === 'object' &&
            obj.functionCall !== null;
        const isBareFunctionCall = (Object.prototype.hasOwnProperty.call(obj, 'call') || Object.prototype.hasOwnProperty.call(obj, '@call')) && Object.prototype.hasOwnProperty.call(obj, 'args');
        if (isFunctionCallWrapper) {
            if (funcDepth >= MAX_FUNC_CALL_DEPTH) {
                throw new A2uiRecursionError(`Recursion limit exceeded: functionCall depth > ${MAX_FUNC_CALL_DEPTH}`);
            }
            for (const [k, v] of Object.entries(obj)) {
                if (k === 'functionCall') {
                    traverseRecursionAndPaths(v, globalDepth + 1, funcDepth + 1);
                }
                else {
                    traverseRecursionAndPaths(v, globalDepth + 1, funcDepth);
                }
            }
        }
        else if (isBareFunctionCall) {
            if (funcDepth >= MAX_FUNC_CALL_DEPTH) {
                throw new A2uiRecursionError(`Recursion limit exceeded: functionCall depth > ${MAX_FUNC_CALL_DEPTH}`);
            }
            for (const [k, v] of Object.entries(obj)) {
                if (k === 'args') {
                    traverseRecursionAndPaths(v, globalDepth + 1, funcDepth + 1);
                }
                else {
                    traverseRecursionAndPaths(v, globalDepth + 1, funcDepth);
                }
            }
        }
        else {
            for (const v of Object.values(obj)) {
                traverseRecursionAndPaths(v, globalDepth + 1, funcDepth);
            }
        }
    }
}
/**
 * Traverses a JSON data payload to validate path syntax and recursion limits.
 *
 * @param data Data payload or component hierarchy to evaluate.
 * @throws {A2uiRecursionError} If global structure depth or function call depth exceeds limits.
 * @throws {A2uiValidationError} If an invalid JSON Pointer path format is encountered.
 */
export function validateRecursionAndPaths(data) {
    traverseRecursionAndPaths(data, 0, 0);
}
