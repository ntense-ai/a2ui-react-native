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
import { childRefKindOf } from '../types/child-ref-helpers.js';
/**
 * Extracts the target definition name from a JSON Schema `$ref` pointer or URI.
 *
 * @param ref The JSON Schema reference string or URI.
 * @returns Target definition name.
 */
export function extractRefDefName(ref) {
    if (!ref)
        return '';
    const hashIdx = ref.lastIndexOf('#');
    const target = hashIdx !== -1 ? ref.slice(hashIdx + 1) : ref;
    const segments = target.split('/').filter(Boolean);
    return segments.pop() ?? '';
}
/**
 * Default definition names in `REF:` schema descriptions that denote single-child
 * component IDs or child lists.
 */
const DEFAULT_SINGLE_CHILD_DEF_NAMES = new Set([
    'ComponentId',
    'Child',
    'ChildComponentId',
]);
const DEFAULT_CHILD_LIST_DEF_NAMES = new Set([
    'ChildList',
    'TemplateChildList',
    'ChildrenItem',
    'TemplateItem',
]);
const EMPTY_REF_FIELDS = new Map();
const DEFAULT_OPTIONS_CACHE_KEY = {};
const refFieldsCache = new WeakMap();
function isCombinatorInheritedDescription(schema, desc) {
    const typeName = schema?._def?.typeName;
    if (typeName === 'ZodUnion') {
        const first = getUnionOptions(schema)?.[0];
        return Boolean(first &&
            (first.description === desc ||
                first._def?.description === desc));
    }
    if (typeName === 'ZodIntersection') {
        const left = schema._def.left;
        return Boolean(left &&
            (left.description === desc ||
                left._def?.description === desc));
    }
    return false;
}
/**
 * Unwraps optional/nullable/default/readonly/catch/effects/branded/lazy wrappers,
 * collecting descriptions, `REF:` definition names, and child-ref markers along
 * the chain while stopping at combinators (`ZodPipeline`, `ZodIntersection`,
 * `ZodUnion`, `ZodDiscriminatedUnion`) and structural types.
 */
export function unwrapZodField(schema) {
    const descriptions = [];
    const refDefNames = new Set();
    const bareDefNames = new Set();
    const refs = new Set();
    const traversed = new Set();
    const visitedGetters = new Set();
    let firstRefDefName = '';
    let hasTransform = false;
    let current = schema;
    while (current && typeof current === 'object' && current._def) {
        if (traversed.has(current)) {
            break;
        }
        traversed.add(current);
        if (current.description && !isCombinatorInheritedDescription(current, current.description)) {
            descriptions.push(current.description);
            const parsedRef = collectRefDefName(current.description, refDefNames, bareDefNames);
            if (!firstRefDefName && parsedRef) {
                firstRefDefName = parsedRef;
            }
        }
        const defDescription = current._def.description;
        if (defDescription &&
            defDescription !== current.description &&
            !isCombinatorInheritedDescription(current, defDescription)) {
            descriptions.push(defDescription);
            const parsedRef = collectRefDefName(defDescription, refDefNames, bareDefNames);
            if (!firstRefDefName && parsedRef) {
                firstRefDefName = parsedRef;
            }
        }
        const ref = childRefKindOf(current);
        if (ref) {
            refs.add(ref);
        }
        const typeName = current._def.typeName;
        if (typeName === 'ZodOptional' ||
            typeName === 'ZodNullable' ||
            typeName === 'ZodDefault' ||
            typeName === 'ZodReadonly' ||
            typeName === 'ZodCatch') {
            current = current._def.innerType;
        }
        else if (typeName === 'ZodEffects') {
            const effectDef = current._def.effect;
            if (effectDef?.type === 'transform' || effectDef?.type === 'preprocess') {
                hasTransform = true;
            }
            current = current._def.schema;
        }
        else if (typeName === 'ZodBranded') {
            current = current._def.type;
        }
        else if (typeName === 'ZodLazy') {
            const getter = current._def.getter;
            if (visitedGetters.has(getter)) {
                break;
            }
            visitedGetters.add(getter);
            current = getter();
        }
        else {
            break;
        }
    }
    return {
        schema: current,
        descriptions,
        firstRefDefName,
        refDefNames,
        bareDefNames,
        refs,
        traversed,
        hasTransform,
    };
}
/**
 * Returns the option schemas of a `ZodUnion` or `ZodDiscriminatedUnion`, or
 * `undefined` if `schema` is neither.
 */
export function getUnionOptions(schema) {
    const typeName = schema?._def?.typeName;
    if (typeName !== 'ZodUnion' && typeName !== 'ZodDiscriminatedUnion') {
        return undefined;
    }
    const rawOptions = schema._def
        .options;
    if (!rawOptions) {
        return undefined;
    }
    return Array.isArray(rawOptions) ? rawOptions : Array.from(rawOptions.values());
}
/**
 * Returns whether an unwrapped `ZodObject` matches a dynamic child-list template
 * shape (`{ componentId, path | @path | dataBinding }` or v0.8 `explicitList`/`template`).
 */
export function isTemplateRefObject(schema) {
    if (schema?._def?.typeName !== 'ZodObject') {
        return false;
    }
    const shape = schema.shape;
    return Boolean((Object.prototype.hasOwnProperty.call(shape, 'componentId') &&
        (Object.prototype.hasOwnProperty.call(shape, 'path') ||
            Object.prototype.hasOwnProperty.call(shape, '@path') ||
            Object.prototype.hasOwnProperty.call(shape, 'dataBinding'))) ||
        Object.prototype.hasOwnProperty.call(shape, 'explicitList') ||
        Object.prototype.hasOwnProperty.call(shape, 'template'));
}
/**
 * Returns whether `schema` can accept a single component ID string on the wire.
 */
export function canSchemaHoldSingleRef(schema, options) {
    return canHoldSingleRef(unwrapZodField(schema), new Set(), options);
}
/**
 * Returns whether `schema` can accept a child list or template on the wire.
 */
export function canSchemaHoldListRef(schema, options) {
    return canHoldListRef(unwrapZodField(schema), new Set(), options);
}
/**
 * Returns whether property `key` with `schema` classifies as a single-child component reference.
 */
export function isSingleChildPropertySchema(key, schema, options) {
    return classifyProperty(key, schema, new Set(), options)?.kind === 'single';
}
/**
 * Returns whether `schema` can accept an object or array value on the wire.
 */
export function canSchemaHoldObjectOrArray(schema) {
    const field = unwrapZodField(schema);
    return (canHoldObjectElement(field, new Set()) ||
        canHoldNestedRef(field, new Set()) ||
        field.schema?._def?.typeName === 'ZodArray');
}
/**
 * Extracts the child-referencing properties and their kinds from a component Zod schema.
 *
 * Recognizes explicit child-reference metadata (`ComponentIdSchema`, `ChildSchema`,
 * `ChildListSchema`, and `REF:` description pointers), unannotated `child` and
 * `children` properties whose types can hold component references, and open or
 * unannotated empty-shape stub schemas (`z.object({})`, `.passthrough()`,
 * `.catchall(...)`, `z.record(...)`, `z.any()`, `z.unknown()`).
 *
 * @param schema Component Zod schema to inspect.
 * @param options Optional custom child reference analysis options.
 * @returns Map of child-referencing property names to their reference kinds.
 */
export function extractRefFields(schema, options) {
    const cacheKey = options ?? DEFAULT_OPTIONS_CACHE_KEY;
    let schemaCache = refFieldsCache.get(cacheKey);
    if (schemaCache) {
        const cached = schemaCache.get(schema);
        if (cached) {
            return cached;
        }
    }
    else {
        schemaCache = new WeakMap();
        refFieldsCache.set(cacheKey, schemaCache);
    }
    const analysis = analyzeSchema(schema, new Set(), options);
    const fields = analysis.fields;
    if ((analysis.isEmptyObject && !analysis.declaredKeys.has('child')) ||
        analysis.openChildFallback) {
        mergeRefKind(fields, 'child', { kind: 'single' });
    }
    if ((analysis.isEmptyObject && !analysis.declaredKeys.has('children')) ||
        analysis.openChildrenFallback) {
        mergeRefKind(fields, 'children', { kind: 'list' });
    }
    const result = fields.size === 0 ? EMPTY_REF_FIELDS : fields;
    schemaCache.set(schema, result);
    return result;
}
function emptyAnalysis() {
    return {
        fields: new Map(),
        declaredKeys: new Set(),
        compatibleSingleKeys: new Set(),
        compatibleListKeys: new Set(),
        compatibleNestedKeys: new Set(),
        nestedElementAnalyses: new Map(),
        constrainsUnknownKeys: true,
        isEmptyObject: false,
        openSingle: false,
        openList: false,
        openChildFallback: false,
        openChildrenFallback: false,
    };
}
function canPipelineStagePassKey(key, kind, stage) {
    if (stage.declaredKeys.has(key)) {
        return true;
    }
    return kind.kind === 'single' ? stage.openSingle : stage.openList;
}
function analyzeSchema(schema, visited, options) {
    const unwrapped = unwrapZodField(schema);
    for (const s of unwrapped.traversed) {
        if (visited.has(s)) {
            return emptyAnalysis();
        }
    }
    for (const s of unwrapped.traversed) {
        visited.add(s);
    }
    const typeName = unwrapped.schema?._def?.typeName;
    switch (typeName) {
        case 'ZodObject': {
            const objSchema = unwrapped.schema;
            const shape = objSchema.shape;
            const fields = new Map();
            const declaredKeys = new Set(Object.keys(shape));
            const compatibleSingleKeys = new Set();
            const compatibleListKeys = new Set();
            const compatibleNestedKeys = new Set();
            const nestedElementAnalyses = new Map();
            for (const [key, value] of Object.entries(shape)) {
                const kind = classifyProperty(key, value, visited, options);
                if (kind) {
                    fields.set(key, kind);
                }
                const propField = unwrapZodField(value);
                if (canHoldSingleRef(propField, new Set(visited), options, true)) {
                    compatibleSingleKeys.add(key);
                }
                if (canHoldListRef(propField, new Set(visited), options, true)) {
                    compatibleListKeys.add(key);
                }
                if (canHoldNestedRef(propField, new Set(visited))) {
                    compatibleNestedKeys.add(key);
                    const elemAnalysis = extractNestedElementAnalysis(propField, new Set(visited), options);
                    if (elemAnalysis) {
                        nestedElementAnalyses.set(key, elemAnalysis);
                    }
                }
            }
            const def = objSchema._def;
            const unknownKeys = def['unknownKeys'];
            const catchall = def['catchall'];
            let openSingle = false;
            let openList = false;
            let openChildFallback = false;
            let openChildrenFallback = false;
            let constrainsUnknownKeys = false;
            if (unknownKeys === 'passthrough') {
                openSingle = true;
                openList = true;
                openChildFallback = !declaredKeys.has('child');
                openChildrenFallback = !declaredKeys.has('children');
            }
            else if (catchall && catchall._def.typeName !== 'ZodNever') {
                const catchallField = unwrapZodField(catchall);
                openSingle = canHoldSingleRef(catchallField, new Set(visited), options, true);
                openList = canHoldListRef(catchallField, new Set(visited), options, true);
                openChildFallback =
                    !declaredKeys.has('child') &&
                        canHoldSingleRef(catchallField, new Set(visited), options, false);
                openChildrenFallback =
                    !declaredKeys.has('children') &&
                        canHoldListRef(catchallField, new Set(visited), options, false);
                constrainsUnknownKeys = true;
            }
            else if (unknownKeys === 'strict') {
                constrainsUnknownKeys = true;
            }
            return {
                fields,
                declaredKeys,
                compatibleSingleKeys,
                compatibleListKeys,
                compatibleNestedKeys,
                nestedElementAnalyses,
                constrainsUnknownKeys,
                isEmptyObject: declaredKeys.size === 0 && !constrainsUnknownKeys && !openSingle && !openList,
                openSingle,
                openList,
                openChildFallback,
                openChildrenFallback,
            };
        }
        case 'ZodRecord': {
            const valueType = unwrapped.schema._def['valueType'];
            let openSingle = true;
            let openList = true;
            let openChildFallback = true;
            let openChildrenFallback = true;
            if (valueType) {
                const valueField = unwrapZodField(valueType);
                openSingle = canHoldSingleRef(valueField, new Set(visited), options, true);
                openList = canHoldListRef(valueField, new Set(visited), options, true);
                openChildFallback = canHoldSingleRef(valueField, new Set(visited), options, false);
                openChildrenFallback = canHoldListRef(valueField, new Set(visited), options, false);
            }
            return {
                fields: new Map(),
                declaredKeys: new Set(),
                compatibleSingleKeys: new Set(),
                compatibleListKeys: new Set(),
                compatibleNestedKeys: new Set(),
                nestedElementAnalyses: new Map(),
                constrainsUnknownKeys: true,
                isEmptyObject: false,
                openSingle,
                openList,
                openChildFallback,
                openChildrenFallback,
            };
        }
        case 'ZodAny':
        case 'ZodUnknown':
            return {
                fields: new Map(),
                declaredKeys: new Set(),
                compatibleSingleKeys: new Set(),
                compatibleListKeys: new Set(),
                compatibleNestedKeys: new Set(),
                nestedElementAnalyses: new Map(),
                constrainsUnknownKeys: false,
                isEmptyObject: false,
                openSingle: true,
                openList: true,
                openChildFallback: true,
                openChildrenFallback: true,
            };
        case 'ZodIntersection': {
            const def = unwrapped.schema._def;
            const left = analyzeSchema(def.left, new Set(visited), options);
            const right = analyzeSchema(def.right, new Set(visited), options);
            return intersectAnalyses(left, right);
        }
        case 'ZodPipeline': {
            const def = unwrapped.schema._def;
            const left = analyzeSchema(def['in'], new Set(visited), options);
            const right = analyzeSchema(def['out'], new Set(visited), options);
            return pipeAnalyses(left, right);
        }
        case 'ZodUnion':
        case 'ZodDiscriminatedUnion': {
            const unionOptions = getUnionOptions(unwrapped.schema) ?? [];
            const subs = unionOptions.map(option => analyzeSchema(option, new Set(visited), options));
            return unionAnalyses(subs);
        }
        default:
            return emptyAnalysis();
    }
}
function unionAnalyses(subs) {
    const fields = new Map();
    const declaredKeys = new Set();
    const compatibleSingleKeys = new Set();
    const compatibleListKeys = new Set();
    const compatibleNestedKeys = new Set();
    let allEmpty = subs.length > 0;
    let allConstrainUnknown = subs.length > 0;
    let openSingle = false;
    let openList = false;
    let openChildFallback = false;
    let openChildrenFallback = false;
    for (const sub of subs) {
        for (const [key, kind] of sub.fields) {
            mergeRefKind(fields, key, kind);
        }
        for (const key of sub.declaredKeys) {
            declaredKeys.add(key);
        }
        allEmpty = allEmpty && sub.isEmptyObject;
        allConstrainUnknown = allConstrainUnknown && sub.constrainsUnknownKeys;
        openSingle = openSingle || sub.openSingle;
        openList = openList || sub.openList;
        openChildFallback = openChildFallback || sub.openChildFallback;
        openChildrenFallback = openChildrenFallback || sub.openChildrenFallback;
    }
    for (const key of declaredKeys) {
        if (subs.some(sub => isRefCompatibleWithSide(key, { kind: 'single' }, sub))) {
            compatibleSingleKeys.add(key);
        }
        if (subs.some(sub => isRefCompatibleWithSide(key, { kind: 'list' }, sub))) {
            compatibleListKeys.add(key);
        }
        if (subs.some(sub => isRefCompatibleWithSide(key, { kind: 'nested', keys: new Set() }, sub))) {
            compatibleNestedKeys.add(key);
        }
    }
    return {
        fields,
        declaredKeys,
        compatibleSingleKeys,
        compatibleListKeys,
        compatibleNestedKeys,
        nestedElementAnalyses: new Map(),
        constrainsUnknownKeys: allConstrainUnknown,
        isEmptyObject: allEmpty,
        openSingle,
        openList,
        openChildFallback,
        openChildrenFallback,
    };
}
function pipeAnalyses(left, right) {
    const piped = intersectAnalyses(left, right, true);
    for (const [key, kind] of [...piped.fields]) {
        if (!canPipelineStagePassKey(key, kind, left) || !canPipelineStagePassKey(key, kind, right)) {
            piped.fields.delete(key);
        }
    }
    for (const key of [...piped.compatibleSingleKeys]) {
        if (!canPipelineStagePassKey(key, { kind: 'single' }, left) ||
            !canPipelineStagePassKey(key, { kind: 'single' }, right)) {
            piped.compatibleSingleKeys.delete(key);
        }
    }
    for (const key of [...piped.compatibleListKeys]) {
        if (!canPipelineStagePassKey(key, { kind: 'list' }, left) ||
            !canPipelineStagePassKey(key, { kind: 'list' }, right)) {
            piped.compatibleListKeys.delete(key);
        }
    }
    for (const key of [...piped.compatibleNestedKeys]) {
        const dummyNested = { kind: 'nested', keys: new Set() };
        if (!canPipelineStagePassKey(key, dummyNested, left) ||
            !canPipelineStagePassKey(key, dummyNested, right)) {
            piped.compatibleNestedKeys.delete(key);
            piped.nestedElementAnalyses.delete(key);
        }
    }
    piped.openSingle = !piped.isEmptyObject && left.openSingle && right.openSingle;
    piped.openList = !piped.isEmptyObject && left.openList && right.openList;
    piped.openChildFallback =
        !piped.isEmptyObject && left.openChildFallback && right.openChildFallback;
    piped.openChildrenFallback =
        !piped.isEmptyObject && left.openChildrenFallback && right.openChildrenFallback;
    return piped;
}
function intersectAnalyses(left, right, isPipeline = false) {
    const fields = new Map();
    for (const [key, kind] of left.fields) {
        mergeCompatibleField(fields, key, kind, left, right, isPipeline);
    }
    for (const [key, kind] of right.fields) {
        mergeCompatibleField(fields, key, kind, right, left, isPipeline);
    }
    const declaredKeys = new Set([...left.declaredKeys, ...right.declaredKeys]);
    const compatibleSingleKeys = new Set();
    const compatibleListKeys = new Set();
    const compatibleNestedKeys = new Set();
    const nestedElementAnalyses = new Map();
    for (const key of declaredKeys) {
        if (isRefCompatibleWithSide(key, { kind: 'single' }, left) &&
            isRefCompatibleWithSide(key, { kind: 'single' }, right)) {
            compatibleSingleKeys.add(key);
        }
        if (isRefCompatibleWithSide(key, { kind: 'list' }, left) &&
            isRefCompatibleWithSide(key, { kind: 'list' }, right)) {
            compatibleListKeys.add(key);
        }
        if (isRefCompatibleWithSide(key, { kind: 'nested', keys: new Set() }, left) &&
            isRefCompatibleWithSide(key, { kind: 'nested', keys: new Set() }, right)) {
            compatibleNestedKeys.add(key);
            const leftElem = left.nestedElementAnalyses.get(key);
            const rightElem = right.nestedElementAnalyses.get(key);
            if (leftElem && rightElem) {
                nestedElementAnalyses.set(key, isPipeline ? pipeAnalyses(leftElem, rightElem) : intersectAnalyses(leftElem, rightElem));
            }
            else if (leftElem || rightElem) {
                nestedElementAnalyses.set(key, (leftElem ?? rightElem));
            }
        }
    }
    const constrainsUnknownKeys = left.constrainsUnknownKeys || right.constrainsUnknownKeys;
    const isEmptyObject = !constrainsUnknownKeys && left.isEmptyObject && right.isEmptyObject;
    const openSingle = !isEmptyObject &&
        (left.openSingle || right.openSingle) &&
        (left.openSingle || !left.constrainsUnknownKeys) &&
        (right.openSingle || !right.constrainsUnknownKeys);
    const openList = !isEmptyObject &&
        (left.openList || right.openList) &&
        (left.openList || !left.constrainsUnknownKeys) &&
        (right.openList || !right.constrainsUnknownKeys);
    const openChildFallback = !isEmptyObject &&
        !declaredKeys.has('child') &&
        (left.openChildFallback || right.openChildFallback) &&
        (left.openChildFallback || !left.constrainsUnknownKeys) &&
        (right.openChildFallback || !right.constrainsUnknownKeys);
    const openChildrenFallback = !isEmptyObject &&
        !declaredKeys.has('children') &&
        (left.openChildrenFallback || right.openChildrenFallback) &&
        (left.openChildrenFallback || !left.constrainsUnknownKeys) &&
        (right.openChildrenFallback || !right.constrainsUnknownKeys);
    return {
        fields,
        declaredKeys,
        compatibleSingleKeys,
        compatibleListKeys,
        compatibleNestedKeys,
        nestedElementAnalyses,
        constrainsUnknownKeys,
        isEmptyObject,
        openSingle,
        openList,
        openChildFallback,
        openChildrenFallback,
    };
}
function filterNestedSubKeys(keys, ownElem, otherElem, isPipeline = false) {
    const filteredKeys = new Set();
    for (const subKey of keys) {
        const singleOk = (!ownElem ||
            (isRefCompatibleWithSide(subKey, { kind: 'single' }, ownElem) &&
                (!isPipeline || canPipelineStagePassKey(subKey, { kind: 'single' }, ownElem)))) &&
            (!otherElem ||
                (isRefCompatibleWithSide(subKey, { kind: 'single' }, otherElem) &&
                    (!isPipeline || canPipelineStagePassKey(subKey, { kind: 'single' }, otherElem))));
        const listOk = (!ownElem ||
            (isRefCompatibleWithSide(subKey, { kind: 'list' }, ownElem) &&
                (!isPipeline || canPipelineStagePassKey(subKey, { kind: 'list' }, ownElem)))) &&
            (!otherElem ||
                (isRefCompatibleWithSide(subKey, { kind: 'list' }, otherElem) &&
                    (!isPipeline || canPipelineStagePassKey(subKey, { kind: 'list' }, otherElem))));
        if (singleOk || listOk) {
            filteredKeys.add(subKey);
        }
    }
    return filteredKeys;
}
function mergeCompatibleField(target, key, kind, source, other, isPipeline = false) {
    if (kind.kind === 'nested') {
        if (!isRefCompatibleWithSide(key, kind, other)) {
            if (source.compatibleListKeys.has(key) &&
                isRefCompatibleWithSide(key, { kind: 'list' }, other)) {
                mergeRefKind(target, key, { kind: 'list' });
            }
            else if (source.compatibleSingleKeys.has(key) &&
                isRefCompatibleWithSide(key, { kind: 'single' }, other)) {
                mergeRefKind(target, key, { kind: 'single' });
            }
            return;
        }
        const otherElem = other.nestedElementAnalyses.get(key);
        if (!otherElem && !isPipeline) {
            mergeRefKind(target, key, kind);
            return;
        }
        const filteredKeys = filterNestedSubKeys(kind.keys, source.nestedElementAnalyses.get(key), otherElem, isPipeline);
        if (filteredKeys.size > 0) {
            mergeRefKind(target, key, { kind: 'nested', keys: filteredKeys });
        }
        else if (source.compatibleListKeys.has(key) &&
            isRefCompatibleWithSide(key, { kind: 'list' }, other)) {
            mergeRefKind(target, key, { kind: 'list' });
        }
        else if (source.compatibleSingleKeys.has(key) &&
            isRefCompatibleWithSide(key, { kind: 'single' }, other)) {
            mergeRefKind(target, key, { kind: 'single' });
        }
        return;
    }
    if (isRefCompatibleWithSide(key, kind, other)) {
        mergeRefKind(target, key, kind);
        return;
    }
    // Narrowing a `single | list` union (classified as `list`) with a single-only constraint
    // (e.g. `z.string()`) preserves the single-child reference capability.
    if (kind.kind === 'list' &&
        source.compatibleSingleKeys.has(key) &&
        isRefCompatibleWithSide(key, { kind: 'single' }, other)) {
        mergeRefKind(target, key, { kind: 'single' });
    }
}
function isRefCompatibleWithSide(key, kind, other) {
    if (other.declaredKeys.has(key)) {
        if (kind.kind === 'single') {
            return other.compatibleSingleKeys.has(key);
        }
        if (kind.kind === 'list') {
            return other.compatibleListKeys.has(key);
        }
        return other.compatibleNestedKeys.has(key);
    }
    if (other.constrainsUnknownKeys) {
        if (kind.kind === 'single') {
            return other.openSingle;
        }
        if (kind.kind === 'list') {
            return other.openList;
        }
        return other.openList;
    }
    return true;
}
function mergeRefKind(target, key, incoming) {
    const existing = target.get(key);
    if (!existing) {
        target.set(key, incoming);
        return;
    }
    if ((existing.kind === 'single' && (incoming.kind === 'list' || incoming.kind === 'nested')) ||
        (existing.kind === 'list' && incoming.kind === 'nested')) {
        target.set(key, incoming);
        return;
    }
    if (existing.kind === 'nested' && incoming.kind === 'nested') {
        target.set(key, {
            kind: 'nested',
            keys: new Set([...existing.keys, ...incoming.keys]),
        });
    }
}
function classifyProperty(key, value, visited, options) {
    const explicitKind = classifyExplicitProperty(value, visited, options);
    if (explicitKind) {
        return explicitKind;
    }
    // Fallback for unannotated `child` / `children` (and version-specific child property names)
    // whose types can hold component references.
    const field = unwrapZodField(value);
    const isSingleChildKey = key === 'child' || Boolean(options?.childPropertyNames?.has(key));
    if (isSingleChildKey && canHoldSingleRef(field, new Set(visited), options)) {
        return { kind: 'single' };
    }
    if (key === 'children' && canHoldListRef(field, new Set(visited), options)) {
        return { kind: 'list' };
    }
    return undefined;
}
function classifyExplicitProperty(value, visited, options) {
    const field = unwrapZodField(value);
    for (const s of field.traversed) {
        if (visited.has(s)) {
            return undefined;
        }
    }
    const nextVisited = new Set(visited);
    for (const s of field.traversed) {
        nextVisited.add(s);
    }
    const typeName = field.schema?._def?.typeName;
    // Zod's `.and()` copies the left operand's `description` onto the `ZodIntersection`,
    // so always verify ref compatibility against both sides of an intersection.
    if (typeName === 'ZodIntersection') {
        const def = field.schema._def;
        return classifyIntersectedProperty(def.left, def.right, nextVisited, options, field, false);
    }
    // Zod's `.or()` copies the first operand's `description` onto the `ZodUnion`,
    // so inspect all union branches and merge with any outer marker so `[list, nested]`
    // and `[single, nested]` unions remain order-independent.
    const unionOptions = getUnionOptions(field.schema);
    if (unionOptions) {
        const merged = new Map();
        const unionKind = classifyExplicitUnionOptions(unionOptions, nextVisited, options);
        if (unionKind) {
            mergeRefKind(merged, 'prop', unionKind);
        }
        if (marksChildList(field, options) || isChildListUnion(field.schema)) {
            mergeRefKind(merged, 'prop', { kind: 'list' });
        }
        else if (marksComponentId(field, options)) {
            mergeRefKind(merged, 'prop', { kind: 'single' });
        }
        return merged.get('prop');
    }
    if (marksChildList(field, options) || isTemplateRefObject(field.schema)) {
        return { kind: 'list' };
    }
    if (marksComponentId(field, options)) {
        return { kind: 'single' };
    }
    if (typeName === 'ZodArray') {
        const rawElement = field.schema._def.type;
        const elementAnalysis = analyzeSchema(rawElement, new Set(nextVisited), options);
        const subKeys = new Set();
        for (const [subKey, subKind] of elementAnalysis.fields) {
            if (subKind.kind === 'single' || subKind.kind === 'list') {
                subKeys.add(subKey);
            }
        }
        if (subKeys.size > 0) {
            return { kind: 'nested', keys: subKeys };
        }
        // A plain array of component ids or child lists: classify the element
        // recursively so pipelines (`ComponentIdSchema.pipe(z.string())`) and
        // incompatible intersections (`ComponentIdSchema.and(z.number())`) are
        // handled consistently.
        const elementKind = classifyExplicitProperty(rawElement, nextVisited, options);
        if (elementKind?.kind === 'single' || elementKind?.kind === 'list') {
            return { kind: 'list' };
        }
        return undefined;
    }
    if (typeName === 'ZodPipeline') {
        const def = field.schema._def;
        const pipeIn = def['in'];
        const pipeOut = def['out'];
        const inField = unwrapZodField(pipeIn);
        if (inField.hasTransform) {
            const inKind = classifyExplicitProperty(pipeIn, new Set(nextVisited), options);
            if (inKind) {
                if (inKind.kind === 'nested') {
                    const outField = unwrapZodField(pipeOut);
                    if (canHoldNestedRef(outField, new Set(nextVisited))) {
                        const ownElem = extractNestedElementAnalysis(inField, new Set(nextVisited), options);
                        const outElem = extractNestedElementAnalysis(outField, new Set(nextVisited), options);
                        const filteredKeys = filterNestedSubKeys(inKind.keys, ownElem, outElem, true);
                        return filteredKeys.size > 0 ? { kind: 'nested', keys: filteredKeys } : undefined;
                    }
                }
                return inKind;
            }
            const outKind = classifyExplicitProperty(pipeOut, new Set(nextVisited), options);
            if (outKind && canHoldRefKind(outKind, inField, new Set(nextVisited), options)) {
                return outKind;
            }
            return undefined;
        }
        return classifyIntersectedProperty(pipeIn, pipeOut, nextVisited, options, field, true);
    }
    return undefined;
}
function extractNestedElementAnalysis(field, visited, options) {
    for (const s of field.traversed) {
        if (visited.has(s)) {
            return undefined;
        }
    }
    const nextVisited = new Set(visited);
    for (const s of field.traversed) {
        nextVisited.add(s);
    }
    const unionOptions = getUnionOptions(field.schema);
    if (unionOptions) {
        const nestedBranches = unionOptions.filter(opt => canHoldNestedRef(unwrapZodField(opt), new Set(nextVisited)));
        if (nestedBranches.length === 0) {
            return emptyAnalysis();
        }
        const branchAnalyses = [];
        for (const opt of nestedBranches) {
            const elem = extractNestedElementAnalysis(unwrapZodField(opt), new Set(nextVisited), options);
            if (!elem) {
                return undefined;
            }
            branchAnalyses.push(elem);
        }
        return unionAnalyses(branchAnalyses);
    }
    const typeName = field.schema?._def?.typeName;
    switch (typeName) {
        case 'ZodAny':
        case 'ZodUnknown':
            return undefined;
        case 'ZodArray':
            return analyzeSchema(field.schema._def.type, new Set(nextVisited), options);
        case 'ZodIntersection': {
            const def = field.schema._def;
            const leftElem = extractNestedElementAnalysis(unwrapZodField(def.left), new Set(nextVisited), options);
            const rightElem = extractNestedElementAnalysis(unwrapZodField(def.right), new Set(nextVisited), options);
            return leftElem && rightElem
                ? intersectAnalyses(leftElem, rightElem)
                : (leftElem ?? rightElem);
        }
        case 'ZodPipeline': {
            const def = field.schema._def;
            const inElem = extractNestedElementAnalysis(unwrapZodField(def['in']), new Set(nextVisited), options);
            const outElem = extractNestedElementAnalysis(unwrapZodField(def['out']), new Set(nextVisited), options);
            return inElem && outElem ? pipeAnalyses(inElem, outElem) : (inElem ?? outElem);
        }
        default:
            return emptyAnalysis();
    }
}
function classifyIntersectedProperty(leftRaw, rightRaw, visited, options, outerField, isPipeline = false) {
    const leftField = unwrapZodField(leftRaw);
    const rightField = unwrapZodField(rightRaw);
    const leftKind = classifyExplicitProperty(leftRaw, new Set(visited), options);
    const rightKind = classifyExplicitProperty(rightRaw, new Set(visited), options);
    const merged = new Map();
    if (outerField) {
        if (marksChildList(outerField, options) &&
            canHoldListRef(leftField, new Set(visited), options, true) &&
            canHoldListRef(rightField, new Set(visited), options, true)) {
            mergeRefKind(merged, 'prop', { kind: 'list' });
        }
        else if (marksComponentId(outerField, options) &&
            canHoldSingleRef(leftField, new Set(visited), options, true) &&
            canHoldSingleRef(rightField, new Set(visited), options, true)) {
            mergeRefKind(merged, 'prop', { kind: 'single' });
        }
    }
    const mergeSide = (sideKind, ownField, otherField) => {
        if (!sideKind)
            return;
        if (canHoldRefKind(sideKind, otherField, new Set(visited), options)) {
            if (sideKind.kind === 'nested') {
                const ownElem = extractNestedElementAnalysis(ownField, new Set(visited), options);
                const otherElem = extractNestedElementAnalysis(otherField, new Set(visited), options);
                const filteredKeys = filterNestedSubKeys(sideKind.keys, ownElem, otherElem, isPipeline);
                if (filteredKeys.size > 0) {
                    mergeRefKind(merged, 'prop', { kind: 'nested', keys: filteredKeys });
                    return;
                }
            }
            else {
                mergeRefKind(merged, 'prop', sideKind);
                return;
            }
        }
        if (sideKind.kind === 'nested' &&
            canHoldListRef(ownField, new Set(visited), options, true) &&
            canHoldListRef(otherField, new Set(visited), options, true)) {
            mergeRefKind(merged, 'prop', { kind: 'list' });
        }
        else if ((sideKind.kind === 'list' || sideKind.kind === 'nested') &&
            canHoldSingleRef(ownField, new Set(visited), options, true) &&
            canHoldSingleRef(otherField, new Set(visited), options, true)) {
            mergeRefKind(merged, 'prop', { kind: 'single' });
        }
    };
    mergeSide(leftKind, leftField, rightField);
    mergeSide(rightKind, rightField, leftField);
    return merged.get('prop');
}
function canHoldRefKind(kind, field, visited, options) {
    if (kind.kind === 'single') {
        return canHoldSingleRef(field, visited, options, true);
    }
    if (kind.kind === 'list') {
        return canHoldListRef(field, visited, options, true);
    }
    return canHoldNestedRef(field, visited);
}
function classifyExplicitUnionOptions(unionOptions, visited, options) {
    const merged = new Map();
    for (const option of unionOptions) {
        const optKind = classifyExplicitProperty(option, new Set(visited), options);
        if (optKind) {
            mergeRefKind(merged, 'prop', optKind);
        }
    }
    return merged.get('prop');
}
function collectRefDefName(description, refDefNames, bareDefNames) {
    if (!description) {
        return '';
    }
    if (description.startsWith('REF:')) {
        const defName = extractRefDefName(description.slice(4).split('|')[0]);
        if (defName) {
            refDefNames.add(defName);
        }
        return defName;
    }
    const refTarget = extractRefDefName(description.split('|')[0]);
    if (refTarget) {
        bareDefNames.add(refTarget);
    }
    const trimmed = description.trim();
    if (trimmed) {
        bareDefNames.add(trimmed);
    }
    return '';
}
function marksComponentId(field, options) {
    if (field.refs.has('component-id')) {
        return true;
    }
    const singleNames = options?.childRefNames ?? DEFAULT_SINGLE_CHILD_DEF_NAMES;
    for (const name of singleNames) {
        if (field.refDefNames.has(name) || field.bareDefNames.has(name)) {
            return true;
        }
    }
    return false;
}
function marksChildList(field, options) {
    if (field.refs.has('child-list')) {
        return true;
    }
    const listNames = options?.childListRefNames ?? DEFAULT_CHILD_LIST_DEF_NAMES;
    for (const name of listNames) {
        if (field.refDefNames.has(name) || field.bareDefNames.has(name)) {
            return true;
        }
    }
    return false;
}
function hasNonChildRefMarker(field, options) {
    if (field.refDefNames.size === 0) {
        return false;
    }
    return !marksComponentId(field, options) && !marksChildList(field, options);
}
function isDynamicBindingObject(schema) {
    if (schema?._def?.typeName !== 'ZodObject' || isTemplateRefObject(schema)) {
        return false;
    }
    const shape = schema.shape;
    return (Object.prototype.hasOwnProperty.call(shape, 'path') ||
        Object.prototype.hasOwnProperty.call(shape, '@path') ||
        Object.prototype.hasOwnProperty.call(shape, 'call') ||
        Object.prototype.hasOwnProperty.call(shape, '@call'));
}
function isDynamicValueUnion(unionOptions, options) {
    let hasExplicitChildMarker = false;
    let hasDynamicBranch = false;
    const visited = new Set();
    const visit = (opts) => {
        for (const opt of opts) {
            const unwrapped = unwrapZodField(opt);
            let seen = false;
            for (const s of unwrapped.traversed) {
                if (visited.has(s)) {
                    seen = true;
                    break;
                }
            }
            if (seen) {
                continue;
            }
            for (const s of unwrapped.traversed) {
                visited.add(s);
            }
            if (marksComponentId(unwrapped, options) || marksChildList(unwrapped, options)) {
                hasExplicitChildMarker = true;
                return;
            }
            if (hasNonChildRefMarker(unwrapped, options) || isDynamicBindingObject(unwrapped.schema)) {
                hasDynamicBranch = true;
            }
            const nestedOptions = getUnionOptions(unwrapped.schema);
            if (nestedOptions) {
                visit(nestedOptions);
                if (hasExplicitChildMarker) {
                    return;
                }
            }
            else if (unwrapped.schema?._def?.typeName === 'ZodPipeline') {
                const def = unwrapped.schema._def;
                const inField = unwrapZodField(def['in']);
                visit([def['in']]);
                if (hasExplicitChildMarker) {
                    return;
                }
                if (!inField.hasTransform &&
                    (canHoldObjectElement(inField, new Set()) ||
                        canHoldSingleRef(inField, new Set(), options, true) ||
                        canHoldListRef(inField, new Set(), options, true))) {
                    visit([def['out']]);
                    if (hasExplicitChildMarker) {
                        return;
                    }
                }
            }
        }
    };
    visit(unionOptions);
    return hasDynamicBranch && !hasExplicitChildMarker;
}
function canHoldSingleRef(field, visited = new Set(), options, allowDynamicValue = false) {
    for (const s of field.traversed) {
        if (visited.has(s)) {
            return false;
        }
    }
    for (const s of field.traversed) {
        visited.add(s);
    }
    const typeName = field.schema?._def?.typeName;
    if (typeName === 'ZodIntersection') {
        const def = field.schema._def;
        return (canHoldSingleRef(unwrapZodField(def.left), new Set(visited), options, allowDynamicValue) &&
            canHoldSingleRef(unwrapZodField(def.right), new Set(visited), options, allowDynamicValue));
    }
    if (marksComponentId(field, options)) {
        return true;
    }
    if (!allowDynamicValue && hasNonChildRefMarker(field, options)) {
        return false;
    }
    const unionOptions = getUnionOptions(field.schema);
    if (unionOptions) {
        if (!allowDynamicValue && isDynamicValueUnion(unionOptions, options)) {
            return false;
        }
        return unionOptions.some(option => canHoldSingleRef(unwrapZodField(option), new Set(visited), options, allowDynamicValue));
    }
    if (marksChildList(field, options)) {
        return false;
    }
    switch (typeName) {
        case 'ZodString':
        case 'ZodAny':
        case 'ZodUnknown':
            return true;
        case 'ZodPipeline': {
            const def = field.schema._def;
            const inField = unwrapZodField(def['in']);
            if (inField.hasTransform) {
                return canHoldSingleRef(inField, new Set(visited), options, allowDynamicValue);
            }
            return (canHoldSingleRef(inField, new Set(visited), options, allowDynamicValue) &&
                canHoldSingleRef(unwrapZodField(def['out']), new Set(visited), options, allowDynamicValue));
        }
        default:
            return false;
    }
}
function canHoldListRef(field, visited = new Set(), options, allowDynamicValue = false) {
    for (const s of field.traversed) {
        if (visited.has(s)) {
            return false;
        }
    }
    for (const s of field.traversed) {
        visited.add(s);
    }
    const typeName = field.schema?._def?.typeName;
    if (typeName === 'ZodIntersection') {
        const def = field.schema._def;
        return (canHoldListRef(unwrapZodField(def.left), new Set(visited), options, allowDynamicValue) &&
            canHoldListRef(unwrapZodField(def.right), new Set(visited), options, allowDynamicValue));
    }
    if (marksChildList(field, options) || isChildListUnion(field.schema)) {
        return true;
    }
    if (!allowDynamicValue && hasNonChildRefMarker(field, options)) {
        return false;
    }
    const unionOptions = getUnionOptions(field.schema);
    if (unionOptions) {
        if (!allowDynamicValue && isDynamicValueUnion(unionOptions, options)) {
            return false;
        }
        return unionOptions.some(option => canHoldListRef(unwrapZodField(option), new Set(visited), options, allowDynamicValue));
    }
    if (marksComponentId(field, options)) {
        return false;
    }
    switch (typeName) {
        case 'ZodAny':
        case 'ZodUnknown':
            return true;
        case 'ZodArray': {
            const element = unwrapZodField(field.schema._def.type);
            return (canHoldSingleRef(element, new Set(visited), options, allowDynamicValue) ||
                isTemplateRefObject(element.schema));
        }
        case 'ZodObject':
            return isTemplateRefObject(field.schema);
        case 'ZodPipeline': {
            const def = field.schema._def;
            const inField = unwrapZodField(def['in']);
            if (inField.hasTransform) {
                return canHoldListRef(inField, new Set(visited), options, allowDynamicValue);
            }
            return (canHoldListRef(inField, new Set(visited), options, allowDynamicValue) &&
                canHoldListRef(unwrapZodField(def['out']), new Set(visited), options, allowDynamicValue));
        }
        default:
            return false;
    }
}
function canHoldNestedRef(field, visited = new Set()) {
    for (const s of field.traversed) {
        if (visited.has(s)) {
            return false;
        }
    }
    for (const s of field.traversed) {
        visited.add(s);
    }
    const unionOptions = getUnionOptions(field.schema);
    if (unionOptions) {
        return unionOptions.some(option => canHoldNestedRef(unwrapZodField(option), new Set(visited)));
    }
    const typeName = field.schema?._def?.typeName;
    switch (typeName) {
        case 'ZodAny':
        case 'ZodUnknown':
            return true;
        case 'ZodArray':
            return canHoldObjectElement(unwrapZodField(field.schema._def.type), new Set(visited));
        case 'ZodIntersection': {
            const def = field.schema._def;
            return (canHoldNestedRef(unwrapZodField(def.left), new Set(visited)) &&
                canHoldNestedRef(unwrapZodField(def.right), new Set(visited)));
        }
        case 'ZodPipeline': {
            const def = field.schema._def;
            const inField = unwrapZodField(def['in']);
            if (inField.hasTransform) {
                return canHoldNestedRef(inField, new Set(visited));
            }
            return (canHoldNestedRef(inField, new Set(visited)) &&
                canHoldNestedRef(unwrapZodField(def['out']), new Set(visited)));
        }
        default:
            return false;
    }
}
function canHoldObjectElement(field, visited) {
    for (const s of field.traversed) {
        if (visited.has(s)) {
            return false;
        }
    }
    for (const s of field.traversed) {
        visited.add(s);
    }
    const unionOptions = getUnionOptions(field.schema);
    if (unionOptions) {
        return unionOptions.some(option => canHoldObjectElement(unwrapZodField(option), new Set(visited)));
    }
    const typeName = field.schema?._def?.typeName;
    switch (typeName) {
        case 'ZodObject':
        case 'ZodRecord':
        case 'ZodAny':
        case 'ZodUnknown':
            return true;
        case 'ZodIntersection': {
            const def = field.schema._def;
            return (canHoldObjectElement(unwrapZodField(def.left), new Set(visited)) &&
                canHoldObjectElement(unwrapZodField(def.right), new Set(visited)));
        }
        case 'ZodPipeline': {
            const def = field.schema._def;
            const inField = unwrapZodField(def['in']);
            if (inField.hasTransform) {
                return canHoldObjectElement(inField, new Set(visited));
            }
            return (canHoldObjectElement(inField, new Set(visited)) &&
                canHoldObjectElement(unwrapZodField(def['out']), new Set(visited)));
        }
        default:
            return false;
    }
}
/** Matches the binder's STRUCTURAL detection for `ChildList`-shaped unions. */
function isChildListUnion(schema, visited = new Set()) {
    const options = getUnionOptions(schema);
    if (!options) {
        return false;
    }
    for (const o of options) {
        const unwrapped = unwrapZodField(o);
        let seen = false;
        for (const s of unwrapped.traversed) {
            if (visited.has(s)) {
                seen = true;
                break;
            }
        }
        if (seen) {
            continue;
        }
        const nextVisited = new Set(visited);
        for (const s of unwrapped.traversed) {
            nextVisited.add(s);
        }
        if (isTemplateRefObject(unwrapped.schema)) {
            return true;
        }
        if (isChildListUnion(unwrapped.schema, nextVisited)) {
            return true;
        }
        if (unwrapped.schema?._def?.typeName === 'ZodPipeline') {
            const def = unwrapped.schema._def;
            const inField = unwrapZodField(def['in']);
            if (!inField.hasTransform &&
                canHoldListRef(inField, new Set(nextVisited)) &&
                (isTemplateRefObject(unwrapZodField(def['out']).schema) ||
                    isChildListUnion(unwrapZodField(def['out']).schema, nextVisited))) {
                return true;
            }
        }
    }
    return false;
}
