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
import { canSchemaHoldListRef, canSchemaHoldSingleRef, extractRefDefName, extractRefFields, getUnionOptions, isTemplateRefObject, unwrapZodField, } from '../resolution/ref-fields.js';
export { extractRefDefName };
function checkDirectJsonRef(ref, options) {
    if (!ref)
        return null;
    const defName = extractRefDefName(ref);
    const childListNames = options.childListRefNames;
    const childNames = options.childRefNames;
    if (childListNames.has(defName)) {
        return { isChild: false, isChildList: true };
    }
    if (childNames.has(defName)) {
        return { isChild: true, isChildList: false };
    }
    return null;
}
function checkCombinerList(list, options) {
    let hasChild = false;
    for (const sub of list) {
        if (typeof sub !== 'object' || sub === null)
            continue;
        const subRes = checkJsonSchemaRef(sub, options);
        if (subRes.isChildList)
            return { isChild: false, isChildList: true };
        if (subRes.isChild)
            hasChild = true;
    }
    return hasChild ? { isChild: true, isChildList: false } : null;
}
function checkCombinerRefs(schema, options) {
    let hasChild = false;
    for (const combiner of ['oneOf', 'anyOf', 'allOf']) {
        const list = schema[combiner];
        if (!Array.isArray(list))
            continue;
        const res = checkCombinerList(list, options);
        if (res?.isChildList)
            return res;
        if (res?.isChild)
            hasChild = true;
    }
    return hasChild ? { isChild: true, isChildList: false } : null;
}
function checkJsonSchemaRef(schema, options) {
    const ref = typeof schema.$ref === 'string' ? schema.$ref : '';
    const directMatch = checkDirectJsonRef(ref, options);
    if (directMatch)
        return directMatch;
    if (schema.type === 'array' && typeof schema.items === 'object' && schema.items !== null) {
        const itemsRes = checkJsonSchemaRef(schema.items, options);
        if (itemsRes.isChild || itemsRes.isChildList) {
            return { isChild: false, isChildList: true };
        }
    }
    const combinerMatch = checkCombinerRefs(schema, options);
    if (combinerMatch)
        return combinerMatch;
    const props = typeof schema.properties === 'object' && schema.properties !== null
        ? schema.properties
        : undefined;
    if (schema.type === 'object' &&
        props &&
        ((Object.prototype.hasOwnProperty.call(props, 'componentId') &&
            (Object.prototype.hasOwnProperty.call(props, 'path') ||
                Object.prototype.hasOwnProperty.call(props, '@path') ||
                Object.prototype.hasOwnProperty.call(props, 'dataBinding'))) ||
            Object.prototype.hasOwnProperty.call(props, 'explicitList') ||
            Object.prototype.hasOwnProperty.call(props, 'template'))) {
        return { isChild: false, isChildList: true };
    }
    return { isChild: false, isChildList: false };
}
function analyzeUnionOptions(options, analysisOptions, path) {
    let hasChildRef = false;
    for (const opt of options) {
        const optRes = analyzeChildRefSchemaOnPath(opt, analysisOptions, path);
        if (optRes.isChildList) {
            return { isChild: false, isChildList: true };
        }
        if (optRes.isChild) {
            hasChildRef = true;
        }
    }
    if (hasChildRef) {
        return { isChild: true, isChildList: false };
    }
    return { isChild: false, isChildList: false };
}
function isChildListDescription(desc, childListNames) {
    if (!desc)
        return false;
    if (desc.startsWith('REF:')) {
        const refTarget = extractRefDefName(desc.substring(4).split('|')[0]);
        if (childListNames.has(refTarget))
            return true;
    }
    const refTarget = extractRefDefName(desc.split('|')[0]);
    if (refTarget && childListNames.has(refTarget)) {
        return true;
    }
    const trimmed = desc.trim();
    if (childListNames.has(trimmed)) {
        return true;
    }
    return false;
}
function isChildDescription(desc, childNames) {
    if (!desc)
        return false;
    if (desc.startsWith('REF:')) {
        const refTarget = extractRefDefName(desc.substring(4).split('|')[0]);
        if (childNames.has(refTarget))
            return true;
    }
    const refTarget = extractRefDefName(desc.split('|')[0]);
    if (refTarget && childNames.has(refTarget)) {
        return true;
    }
    const trimmed = desc.trim();
    if (childNames.has(trimmed)) {
        return true;
    }
    return false;
}
function checkDescriptionChildRef(descriptions, options) {
    const childListNames = options.childListRefNames;
    const childNames = options.childRefNames;
    for (const desc of descriptions) {
        if (isChildListDescription(desc, childListNames)) {
            return { isChild: false, isChildList: true };
        }
        if (isChildDescription(desc, childNames)) {
            return { isChild: true, isChildList: false };
        }
    }
    return null;
}
function analyzeZodArray(elem, options, path) {
    const elemRes = analyzeChildRefSchemaOnPath(elem, options, path);
    if (elemRes.isChild || elemRes.isChildList) {
        return { isChild: false, isChildList: true };
    }
    return { isChild: false, isChildList: false };
}
function analyzeIntersectedSchemas(left, right, options, path, outerMatch) {
    const leftRes = analyzeChildRefSchemaOnPath(left, options, path);
    const rightRes = analyzeChildRefSchemaOnPath(right, options, path);
    const isList = (Boolean(outerMatch?.isChildList) &&
        canSchemaHoldListRef(left, options) &&
        canSchemaHoldListRef(right, options)) ||
        (leftRes.isChildList && canSchemaHoldListRef(right, options)) ||
        (rightRes.isChildList && canSchemaHoldListRef(left, options));
    if (isList) {
        return { isChild: false, isChildList: true };
    }
    const isSingle = (Boolean(outerMatch?.isChild) &&
        canSchemaHoldSingleRef(left, options) &&
        canSchemaHoldSingleRef(right, options)) ||
        (leftRes.isChild && canSchemaHoldSingleRef(right, options)) ||
        (rightRes.isChild && canSchemaHoldSingleRef(left, options)) ||
        (leftRes.isChildList &&
            canSchemaHoldSingleRef(left, options) &&
            canSchemaHoldSingleRef(right, options)) ||
        (rightRes.isChildList &&
            canSchemaHoldSingleRef(right, options) &&
            canSchemaHoldSingleRef(left, options));
    if (isSingle) {
        return { isChild: true, isChildList: false };
    }
    return { isChild: false, isChildList: false };
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
export function analyzeChildRefSchema(schema, options) {
    return analyzeChildRefSchemaOnPath(schema, options, new Set());
}
/**
 * Implements {@link analyzeChildRefSchema} while tracking the schemas on the
 * current recursion path.
 *
 * A schema found in `path` means the traversal has looped back into one of its
 * own ancestors (for example through a recursive `z.lazy()` union), so the
 * branch is treated as a non-reference. Entries are removed when their branch
 * returns, so sibling properties and union options can reuse one schema
 * instance and still be analyzed.
 */
function analyzeChildRefSchemaOnPath(schema, options, path) {
    if (!schema || typeof schema !== 'object') {
        return { isChild: false, isChildList: false };
    }
    if (path.has(schema)) {
        return { isChild: false, isChildList: false };
    }
    path.add(schema);
    try {
        return analyzeSchemaNode(schema, options, path);
    }
    finally {
        path.delete(schema);
    }
}
function analyzeSchemaNode(schema, options, path) {
    if (!('_def' in schema) || !schema._def) {
        return checkJsonSchemaRef(schema, options);
    }
    const field = unwrapZodField(schema);
    for (const s of field.traversed) {
        if (s !== schema && path.has(s)) {
            return { isChild: false, isChildList: false };
        }
    }
    const explicitMatch = field.refs.has('child-list')
        ? { isChild: false, isChildList: true }
        : field.refs.has('component-id')
            ? { isChild: true, isChildList: false }
            : checkDescriptionChildRef(field.descriptions, options);
    const current = field.schema;
    if (!current?._def) {
        return explicitMatch ?? { isChild: false, isChildList: false };
    }
    if (current !== schema && path.has(current)) {
        return { isChild: false, isChildList: false };
    }
    const nextPath = new Set(path);
    for (const s of field.traversed) {
        nextPath.add(s);
    }
    nextPath.add(current);
    const typeName = current._def.typeName;
    // Zod's `.and()` copies the left operand's `description` onto the `ZodIntersection`,
    // so verify compatibility against both sides before trusting an outer marker.
    if (typeName === 'ZodIntersection') {
        const def = current._def;
        return analyzeIntersectedSchemas(def.left, def.right, options, nextPath, explicitMatch);
    }
    if (explicitMatch?.isChildList) {
        return explicitMatch;
    }
    // Zod's `.or()` copies the first operand's `description` onto the `ZodUnion`,
    // so inspect all union branches before settling on `isChild: true`.
    const unionOptions = getUnionOptions(current);
    if (unionOptions) {
        const unionRes = analyzeUnionOptions(unionOptions, options, nextPath);
        if (unionRes.isChildList) {
            return unionRes;
        }
        if (unionRes.isChild || explicitMatch?.isChild) {
            return { isChild: true, isChildList: false };
        }
        return { isChild: false, isChildList: false };
    }
    if (explicitMatch) {
        return explicitMatch;
    }
    if (typeName === 'ZodArray') {
        return analyzeZodArray(current._def.type, options, nextPath);
    }
    if (typeName === 'ZodPipeline') {
        const def = current._def;
        const pipeIn = def['in'];
        const pipeOut = def['out'];
        const inField = unwrapZodField(pipeIn);
        if (inField.hasTransform) {
            const inRes = analyzeChildRefSchemaOnPath(pipeIn, options, nextPath);
            if (inRes.isChild || inRes.isChildList) {
                return inRes;
            }
            const outRes = analyzeChildRefSchemaOnPath(pipeOut, options, nextPath);
            if (outRes.isChildList && canSchemaHoldListRef(pipeIn, options)) {
                return { isChild: false, isChildList: true };
            }
            if (outRes.isChild && canSchemaHoldSingleRef(pipeIn, options)) {
                return { isChild: true, isChildList: false };
            }
            return { isChild: false, isChildList: false };
        }
        return analyzeIntersectedSchemas(pipeIn, pipeOut, options, nextPath);
    }
    if (isTemplateRefObject(current)) {
        return { isChild: false, isChildList: true };
    }
    return { isChild: false, isChildList: false };
}
/**
 * Returns whether the schema represents a single child ComponentId reference.
 *
 * @param schema The schema to evaluate.
 * @param options The child reference analysis options.
 * @returns Whether the schema is a single child reference.
 */
export function isChildSchema(schema, options) {
    return analyzeChildRefSchema(schema, options).isChild;
}
/**
 * Returns whether the schema represents a child list or dynamic child template (ChildList).
 *
 * @param schema The schema to evaluate.
 * @param options The child reference analysis options.
 * @returns Whether the schema is a child list reference.
 */
export function isChildListSchema(schema, options) {
    return analyzeChildRefSchema(schema, options).isChildList;
}
/**
 * Returns whether the schema represents either a single child or a child list.
 *
 * @param schema The schema to evaluate.
 * @param options The child reference analysis options.
 * @returns Whether the schema is any child or child list reference.
 */
export function isChildOrChildListSchema(schema, options) {
    const res = analyzeChildRefSchema(schema, options);
    return res.isChild || res.isChildList;
}
function addNestedRef(acc, key, subKey) {
    const existing = acc.nestedRefs[key];
    if (existing) {
        existing.add(subKey);
        return;
    }
    acc.nestedRefs[key] = new Set([subKey]);
}
/**
 * Collects the `properties` maps of any array-of-objects branches on `propSchema`,
 * including inside `oneOf`, `anyOf`, and `allOf` combiners.
 */
function collectRawArrayItemProperties(propSchema) {
    if (typeof propSchema !== 'object' || propSchema === null)
        return [];
    const result = [];
    const schema = propSchema;
    if (schema['type'] === 'array' || Object.prototype.hasOwnProperty.call(schema, 'items')) {
        const items = schema['items'];
        if (typeof items === 'object' && items !== null) {
            const itemProps = items['properties'];
            if (typeof itemProps === 'object' && itemProps !== null) {
                result.push(itemProps);
            }
        }
    }
    for (const combiner of ['oneOf', 'anyOf', 'allOf']) {
        const list = schema[combiner];
        if (!Array.isArray(list))
            continue;
        for (const sub of list) {
            result.push(...collectRawArrayItemProperties(sub));
        }
    }
    return result;
}
function canRawSchemaHoldString(raw) {
    if (raw === true)
        return true;
    if (typeof raw !== 'object' || raw === null)
        return false;
    const obj = raw;
    return obj['type'] === undefined || obj['type'] === 'string';
}
function canRawSchemaHoldStringArray(raw) {
    if (raw === true)
        return true;
    if (typeof raw !== 'object' || raw === null)
        return false;
    const obj = raw;
    if (obj['type'] === undefined)
        return true;
    if (obj['type'] !== 'array')
        return false;
    return obj['items'] === undefined || canRawSchemaHoldString(obj['items']);
}
function inspectRawProperties(properties, acc, options) {
    for (const [key, propSchema] of Object.entries(properties)) {
        const itemPropsList = collectRawArrayItemProperties(propSchema);
        let foundNestedSubKey = false;
        for (const itemProps of itemPropsList) {
            for (const [subKey, subSchema] of Object.entries(itemProps)) {
                const subRes = analyzeChildRefSchema(subSchema, options);
                const isSingleSubKey = subKey === 'child' || Boolean(options.childPropertyNames?.has(subKey));
                if (subRes.isChild ||
                    subRes.isChildList ||
                    (isSingleSubKey &&
                        typeof subSchema === 'object' &&
                        subSchema !== null &&
                        subSchema['type'] === 'string')) {
                    acc.listRefs.add(key);
                    addNestedRef(acc, key, subKey);
                    foundNestedSubKey = true;
                }
            }
        }
        if (foundNestedSubKey) {
            continue;
        }
        const res = analyzeChildRefSchema(propSchema, options);
        if (res.isChildList) {
            acc.listRefs.add(key);
            continue;
        }
        if (res.isChild) {
            acc.singleRefs.add(key);
            continue;
        }
        const isSingleChildKey = key === 'child' || Boolean(options.childPropertyNames?.has(key));
        if (isSingleChildKey &&
            typeof propSchema === 'object' &&
            propSchema !== null &&
            propSchema['type'] === 'string') {
            acc.singleRefs.add(key);
            continue;
        }
        if (key === 'children' &&
            typeof propSchema === 'object' &&
            propSchema !== null &&
            propSchema['type'] === 'array' &&
            canRawSchemaHoldStringArray(propSchema)) {
            acc.listRefs.add(key);
        }
    }
}
function inspectComponentSchema(schema, acc, options) {
    if (!schema || typeof schema !== 'object')
        return;
    if (schema._def) {
        const refFields = extractRefFields(schema, options);
        for (const [key, refKind] of refFields) {
            if (refKind.kind === 'single') {
                acc.singleRefs.add(key);
            }
            else if (refKind.kind === 'list') {
                acc.listRefs.add(key);
            }
            else if (refKind.kind === 'nested') {
                acc.listRefs.add(key);
                for (const subKey of refKind.keys) {
                    addNestedRef(acc, key, subKey);
                }
            }
        }
        return;
    }
    const rawSchema = schema;
    const rawProps = typeof rawSchema['properties'] === 'object' && rawSchema['properties'] !== null
        ? rawSchema['properties']
        : undefined;
    if (rawProps) {
        inspectRawProperties(rawProps, acc, options);
    }
    for (const combiner of ['allOf', 'oneOf', 'anyOf']) {
        const list = rawSchema[combiner];
        if (!Array.isArray(list))
            continue;
        for (const sub of list) {
            inspectComponentSchema(sub, acc, options);
        }
    }
    const extraRule = rawSchema['additionalProperties'] ?? rawSchema['unevaluatedProperties'];
    if (canRawSchemaHoldString(extraRule) && (!rawProps || !Object.prototype.hasOwnProperty.call(rawProps, 'child'))) {
        acc.singleRefs.add('child');
    }
    if (canRawSchemaHoldStringArray(extraRule) &&
        (!rawProps || !Object.prototype.hasOwnProperty.call(rawProps, 'children'))) {
        acc.listRefs.add('children');
    }
}
/**
 * Builds a ComponentRefMap dynamically by inspecting component Zod schemas.
 *
 * @param catalogOrComponents Catalog instance, array of ComponentApi objects, or Map of ComponentApis.
 * @param options Required configuration specifying recognized child definition names.
 * @returns ComponentRefMap containing single, list, and nested reference properties.
 */
export function buildComponentRefMap(catalogOrComponents, options) {
    const refMap = {};
    const maybeCatalog = catalogOrComponents;
    const componentApis = typeof maybeCatalog?.components?.values === 'function'
        ? Array.from(maybeCatalog.components.values())
        : Array.isArray(catalogOrComponents)
            ? catalogOrComponents
            : Array.from(catalogOrComponents.values());
    for (const compApi of componentApis) {
        const acc = {
            singleRefs: new Set(),
            listRefs: new Set(),
            nestedRefs: {},
        };
        inspectComponentSchema(compApi.schema, acc, options);
        refMap[compApi.name] = {
            singleRefs: acc.singleRefs,
            listRefs: acc.listRefs,
            nestedRefs: acc.nestedRefs,
        };
    }
    return refMap;
}
