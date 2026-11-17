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
import { zodToJsonSchema } from 'zod-to-json-schema';
import { isAtLeastVersion, normalizeVersionString, toCanonicalVersion } from '../common/semver.js';
import { V08_STANDARD_DEFS } from '../v0_8/standard_defs.js';
import { V09_STANDARD_DEFS } from '../v0_9/standard_defs.js';
import { V10_STANDARD_DEFS } from '../v1_0/standard_defs.js';
import { exclusiveUnionOverride } from './exclusive_union.js';
import { getSpecAnnotation } from './spec_annotations.js';
/** The reference a common types document is written as when a catalog names none. */
export const DEFAULT_COMMON_TYPES_URI = 'common_types.json';
const STANDARD_DEFS_BY_VERSION = {
    '0.8': V08_STANDARD_DEFS,
    '0.9': V09_STANDARD_DEFS,
    '0.9.1': V09_STANDARD_DEFS,
    '1.0': V10_STANDARD_DEFS,
};
/**
 * Returns the common types definitions of a protocol version. A version with
 * no entry of its own at or above 1.0 gets the v1.0 definitions, and any other
 * version the v0.9 definitions.
 *
 * @param version A protocol version.
 */
export function standardDefsForVersion(version) {
    if (version) {
        const key = toCanonicalVersion(version) ?? normalizeVersionString(version);
        if (key in STANDARD_DEFS_BY_VERSION)
            return STANDARD_DEFS_BY_VERSION[key];
        if (isAtLeastVersion(version, '1.0'))
            return V10_STANDARD_DEFS;
    }
    return V09_STANDARD_DEFS;
}
function copyJson(value) {
    return JSON.parse(JSON.stringify(value));
}
function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/** How deep the disjointness check follows references and nested schemas. */
const MAX_DISJOINT_DEPTH = 8;
/** The JSON type of a JSON value, with integers counted as numbers. */
function jsonTypeOf(value) {
    if (value === null)
        return 'null';
    if (Array.isArray(value))
        return 'array';
    return typeof value;
}
/** Follows a schema's `$ref` chain, or returns `undefined` when it cannot. */
function resolveSchema(schema, resolve, depth) {
    let node = schema;
    for (let hops = 0; isObject(node) && typeof node['$ref'] === 'string'; hops++) {
        if (hops + depth > MAX_DISJOINT_DEPTH)
            return undefined;
        node = resolve(node['$ref']);
    }
    return isObject(node) ? node : undefined;
}
/**
 * The JSON types a schema can accept, or `undefined` when the schema does not
 * restrict them. `integer` is counted as `number`.
 */
function acceptedTypes(schema) {
    const type = schema['type'];
    if (typeof type === 'string' || Array.isArray(type)) {
        return new Set([].concat(type).map(t => (t === 'integer' ? 'number' : String(t))));
    }
    if (Object.prototype.hasOwnProperty.call(schema, 'const'))
        return new Set([jsonTypeOf(schema['const'])]);
    if (Array.isArray(schema['enum']))
        return new Set(schema['enum'].map(jsonTypeOf));
    return undefined;
}
/**
 * The values a schema accepts, when it lists them with `const` or `enum`, or
 * `undefined` when it does not or when one of them is an object or an array.
 * Primitive values compare equal exactly when their JSON texts do; objects
 * equal as JSON may differ in key order, so they are not compared.
 */
function acceptedValues(schema) {
    let values;
    if (Object.prototype.hasOwnProperty.call(schema, 'const'))
        values = [schema['const']];
    else if (Array.isArray(schema['enum']))
        values = schema['enum'];
    else
        return undefined;
    if (values.some(v => typeof v === 'object' && v !== null))
        return undefined;
    return values.map(v => JSON.stringify(v));
}
/** The properties an object schema and the schemas of its `allOf` require. */
function requiredKeys(schema, resolve, depth) {
    const keys = new Set();
    if (Array.isArray(schema['required'])) {
        for (const key of schema['required'])
            keys.add(String(key));
    }
    if (depth < MAX_DISJOINT_DEPTH && Array.isArray(schema['allOf'])) {
        for (const member of schema['allOf']) {
            const resolved = resolveSchema(member, resolve, depth + 1);
            if (resolved)
                for (const key of requiredKeys(resolved, resolve, depth + 1))
                    keys.add(key);
        }
    }
    return keys;
}
/**
 * The only properties a closed object schema accepts, or `undefined` when the
 * schema is open or its closure cannot be read without evaluating it.
 */
function closedKeys(schema) {
    if (schema['additionalProperties'] !== false)
        return undefined;
    if (Object.prototype.hasOwnProperty.call(schema, 'patternProperties'))
        return undefined;
    const properties = schema['properties'];
    return new Set(isObject(properties) ? Object.keys(properties) : []);
}
/** The schema of an object schema's own property, if it declares one. */
function propertySchema(schema, key) {
    const properties = schema['properties'];
    return isObject(properties) ? properties[key] : undefined;
}
/**
 * Whether no JSON value matches both schemas. A `false` result means that the
 * check could not prove them disjoint, not that they overlap.
 *
 * Two schemas are disjoint when they accept no common JSON type, when both
 * list their values and none is shared, when one is a closed object that
 * does not allow a property the other requires, or when both require a
 * property whose schemas are disjoint.
 */
function provablyDisjoint(a, b, resolve, depth = 0) {
    if (depth > MAX_DISJOINT_DEPTH)
        return false;
    const left = resolveSchema(a, resolve, depth);
    const right = resolveSchema(b, resolve, depth);
    if (!left || !right)
        return false;
    const leftTypes = acceptedTypes(left);
    const rightTypes = acceptedTypes(right);
    if (leftTypes && rightTypes && ![...leftTypes].some(t => rightTypes.has(t)))
        return true;
    const leftValues = acceptedValues(left);
    const rightValues = acceptedValues(right);
    if (leftValues && rightValues && !leftValues.some(v => rightValues.includes(v)))
        return true;
    const objectOnly = (types) => types !== undefined && types.size === 1 && types.has('object');
    if (!objectOnly(leftTypes) || !objectOnly(rightTypes))
        return false;
    const leftRequired = requiredKeys(left, resolve, depth);
    const rightRequired = requiredKeys(right, resolve, depth);
    const leftClosed = closedKeys(left);
    const rightClosed = closedKeys(right);
    if (leftClosed && [...rightRequired].some(key => !leftClosed.has(key)))
        return true;
    if (rightClosed && [...leftRequired].some(key => !rightClosed.has(key)))
        return true;
    return [...leftRequired].some(key => rightRequired.has(key) &&
        provablyDisjoint(propertySchema(left, key), propertySchema(right, key), resolve, depth + 1));
}
function defOf(schema) {
    return schema._def;
}
/** The properties of a component that the message envelope declares. */
const ENVELOPE_PROPERTIES = new Set(['id', 'component']);
/**
 * Returns whether a component's schema is a specification-shaped model: one
 * annotated with the mixins its definition composes.
 */
export function isSpecComponentSchema(schema) {
    return collectAnnotation(schema).mixins !== undefined;
}
/**
 * Returns whether a function's argument schema is a specification-shaped
 * model: one with an annotation.
 */
export function isSpecFunctionSchema(schema) {
    return Object.keys(collectAnnotation(schema)).length > 0;
}
/**
 * Returns whether a function's argument JSON Schema requires `args` to be
 * supplied on a call to the function: that is, whether an omitted (empty)
 * argument object cannot satisfy the schema.
 *
 * A schema requires arguments when it directly declares `required` properties
 * or a positive `minProperties`, when any member of an `allOf` requires
 * arguments, when every branch of a non-empty `oneOf` or `anyOf` union
 * requires arguments, or when a local `#/$defs/...` `$ref` resolves in `defs`
 * to a schema that requires arguments. A schema that carries a `default`
 * value does not require arguments.
 *
 * @param schema The function's `args` JSON Schema.
 * @param defs Optional `$defs` map for resolving local `#/$defs/...` references.
 * @param visited References already on the resolution stack.
 */
export function schemaRequiresArgs(schema, defs, visited = new Set()) {
    if (!isObject(schema) || schema['default'] !== undefined)
        return false;
    if (Array.isArray(schema['required']) && schema['required'].length > 0)
        return true;
    if (typeof schema['minProperties'] === 'number' && schema['minProperties'] > 0)
        return true;
    const ref = schema['$ref'];
    if (typeof ref === 'string' && defs && ref.startsWith('#/$defs/') && !visited.has(ref)) {
        let target = defs;
        for (const raw of ref.slice('#/$defs/'.length).split('/')) {
            const segment = raw.replace(/~1/g, '/').replace(/~0/g, '~');
            target = isObject(target) && Object.prototype.hasOwnProperty.call(target, segment) ? target[segment] : undefined;
        }
        if (target !== undefined && schemaRequiresArgs(target, defs, new Set(visited).add(ref))) {
            return true;
        }
    }
    if (Array.isArray(schema['allOf']) &&
        schema['allOf'].some(sub => schemaRequiresArgs(sub, defs, visited))) {
        return true;
    }
    if (Array.isArray(schema['oneOf']) &&
        schema['oneOf'].length > 0 &&
        schema['oneOf'].every(sub => schemaRequiresArgs(sub, defs, visited))) {
        return true;
    }
    if (Array.isArray(schema['anyOf']) &&
        schema['anyOf'].length > 0 &&
        schema['anyOf'].every(sub => schemaRequiresArgs(sub, defs, visited))) {
        return true;
    }
    return false;
}
/**
 * Returns the annotations of a schema and of the wrappers around its core
 * (`optional`, `default`, refinements), the outer ones winning.
 */
function collectAnnotation(schema, stopAt) {
    const chain = [];
    const stopAnnotation = stopAt ? getSpecAnnotation(stopAt) : undefined;
    let node = schema;
    while (node && typeof node === 'object' && '_def' in node) {
        const annotation = getSpecAnnotation(node);
        if (stopAt !== undefined &&
            (node === stopAt || (annotation && annotation === stopAnnotation))) {
            break;
        }
        if (annotation)
            chain.push(annotation);
        const next = innerSchema(node);
        if (!next)
            break;
        node = next;
    }
    return chain.reduceRight((merged, a) => ({ ...merged, ...a }), {});
}
/** Returns the schema a wrapper (`optional`, `default`, ...) wraps. */
function innerSchema(schema) {
    const def = defOf(schema);
    switch (def.typeName) {
        case 'ZodOptional':
        case 'ZodDefault':
        case 'ZodCatch':
        case 'ZodReadonly':
            return def['innerType'];
        case 'ZodEffects':
            return def['schema'];
        case 'ZodBranded':
            return def['type'];
        default:
            return undefined;
    }
}
/**
 * Builds specification-shaped definitions of Zod models for a protocol
 * version.
 */
export class SpecShaper {
    /**
     * @param protocolVersion The catalog's protocol version.
     * @param commonTypesUri How the catalog's document writes the common types
     *     document in references, such as `common_types.json`.
     */
    constructor(protocolVersion, commonTypesUri = DEFAULT_COMMON_TYPES_URI) {
        this.commonTypesUri = commonTypesUri;
        /** Standard definitions with their references written as the catalog does. */
        this.standardDefsInCatalog = new Map();
        this.isV08 = !isAtLeastVersion(protocolVersion, '0.9');
        this.isV10 = isAtLeastVersion(protocolVersion, '1.0');
        this.standardDefs = standardDefsForVersion(protocolVersion);
    }
    /**
     * Returns the definition a catalog document writes for a component.
     *
     * @param name The component's name.
     * @param schema The component's schema, annotated with its mixins.
     * @param allowedParents The component's allowed parents, if restricted.
     * @param allowedChildren The component's allowed children, if restricted.
     */
    componentSchema(name, schema, allowedParents, allowedChildren) {
        const catalogDefs = new Map();
        let result;
        if (this.isV08) {
            // A v0.8 catalog document has no common types: the whole component is
            // written inline, without the properties the envelope declares.
            result = this.toJson(schema, catalogDefs);
            const properties = result['properties'];
            if (isObject(properties)) {
                for (const key of ENVELOPE_PROPERTIES)
                    delete properties[key];
            }
            if (Array.isArray(result['required'])) {
                const required = result['required'].filter(r => !ENVELOPE_PROPERTIES.has(r));
                if (required.length > 0)
                    result['required'] = required;
                else
                    delete result['required'];
            }
        }
        else {
            const annotation = collectAnnotation(schema);
            const mixins = annotation.mixins ?? [];
            const inherited = new Set(ENVELOPE_PROPERTIES);
            const refs = [];
            for (const mixin of mixins) {
                refs.push({ $ref: this.mixinRef(mixin, catalogDefs) });
                for (const key of this.mixinProperties(mixin))
                    inherited.add(key);
            }
            const object = coreSchema(schema);
            const description = plainDescription(schema);
            const own = this.objectSchema(object, annotation, key => !inherited.has(key), catalogDefs);
            const properties = { component: { const: name }, ...own['properties'] };
            const required = ['component', ...(own['required'] ?? [])];
            const inner = { type: 'object' };
            // The specification puts a v1.0 description on the component and a
            // v0.9 description on the object of its own properties.
            if (description !== undefined && !this.isV10)
                inner['description'] = description;
            inner['properties'] = properties;
            inner['required'] = required;
            result = { type: 'object' };
            if (this.isV10) {
                if (description !== undefined)
                    result['description'] = description;
                if (refs.length > 0) {
                    result['allOf'] = [...refs, inner];
                }
                else {
                    result['properties'] = properties;
                    result['required'] = required;
                }
            }
            else {
                result['allOf'] = [...refs, inner];
                result['unevaluatedProperties'] = false;
            }
        }
        if (allowedParents && allowedParents.length > 0)
            result['allowedParents'] = [...allowedParents];
        if (allowedChildren && allowedChildren.length > 0) {
            result['allowedChildren'] = [...allowedChildren];
        }
        return { schema: result, catalogDefs };
    }
    /**
     * Returns the definition a catalog document writes for a function: the
     * schema of a call to it.
     *
     * @param name The function's name.
     * @param fn The function's API, whose `schema` is its argument model.
     */
    functionSchema(name, fn, defs, catalogDefs) {
        const args = this.toJson(fn.schema, catalogDefs);
        const argsRequired = schemaRequiresArgs(args, defs);
        const result = { type: 'object' };
        if (fn.description)
            result['description'] = fn.description;
        if (this.isV10) {
            result['returnType'] = fn.returnType;
            if (fn.allowedCallers)
                result['allowedCallers'] = fn.allowedCallers;
            if (fn.requiresUserActivation)
                result['requiresUserActivation'] = true;
            result['properties'] = { '@call': { const: name }, args };
            result['required'] = argsRequired ? ['@call', 'args'] : ['@call'];
            return result;
        }
        if (fn.allowedCallers)
            result['allowedCallers'] = fn.allowedCallers;
        if (fn.requiresUserActivation)
            result['requiresUserActivation'] = true;
        result['properties'] = { call: { const: name }, args, returnType: { const: fn.returnType } };
        result['required'] = argsRequired ? ['call', 'args'] : ['call'];
        result['unevaluatedProperties'] = false;
        return result;
    }
    /**
     * Returns the definition a catalog document writes for a model, such as a
     * mixin or a theme.
     *
     * @param schema The model.
     */
    defSchema(schema, catalogDefs) {
        return this.toJson(schema, catalogDefs, true);
    }
    /** Returns the reference a component's definition makes to a mixin. */
    mixinRef(mixin, catalogDefs) {
        if (typeof mixin === 'string')
            return `${this.commonTypesUri}#/$defs/${mixin}`;
        const name = collectAnnotation(mixin).defName;
        if (name === undefined) {
            throw new Error('A component mixin model must be named with specDef().');
        }
        catalogDefs.set(name, mixin);
        return `#/$defs/${name}`;
    }
    /** Returns the names of the properties a mixin declares. */
    mixinProperties(mixin) {
        if (typeof mixin !== 'string') {
            const core = coreSchema(mixin);
            return defOf(core).typeName === 'ZodObject'
                ? Object.keys(core.shape)
                : [];
        }
        const names = [];
        const collect = (def, seen) => {
            if (!isObject(def) || seen.has(def))
                return;
            seen.add(def);
            if (isObject(def['properties']))
                names.push(...Object.keys(def['properties']));
            for (const sub of Array.isArray(def['allOf']) ? def['allOf'] : []) {
                const ref = isObject(sub) ? sub['$ref'] : undefined;
                const target = typeof ref === 'string' && ref.startsWith('#/$defs/')
                    ? this.standardDefs[ref.substring('#/$defs/'.length)]
                    : sub;
                collect(target, seen);
            }
        };
        collect(this.standardDefs[mixin], new Set());
        return names;
    }
    /**
     * Returns the JSON Schema a catalog document writes for a Zod schema.
     *
     * @param schema The schema.
     * @param catalogDefs Optional map collecting referenced catalog `$defs` models.
     * @param isDefRoot Whether `schema` is the root of a `$defs` entry being serialized.
     */
    toJson(schema, catalogDefs, isDefRoot = false) {
        const annotation = collectAnnotation(schema);
        const description = schemaDescription(schema);
        const defaultValue = schemaDefault(schema);
        let effectiveAnnotation = annotation;
        let effectiveDefault = defaultValue;
        let core;
        let ownDescription = description;
        if (!isDefRoot &&
            catalogDefs !== undefined &&
            annotation.defName !== undefined &&
            annotation.defModel !== undefined) {
            catalogDefs.set(annotation.defName, annotation.defModel);
            core = { $ref: `#/$defs/${annotation.defName}` };
            effectiveAnnotation = collectAnnotation(schema, annotation.defModel);
            const defDesc = schemaDescription(annotation.defModel);
            ownDescription = description !== defDesc ? description : undefined;
            const defDefault = schemaDefault(annotation.defModel);
            effectiveDefault = defaultValue !== defDefault ? defaultValue : undefined;
        }
        else if (description !== undefined && description.startsWith('REF:')) {
            const content = description.substring(4);
            const pipe = content.indexOf('|');
            const ref = pipe === -1 ? content : content.substring(0, pipe);
            ownDescription = pipe === -1 ? undefined : content.substring(pipe + 1);
            core = { $ref: this.refTarget(ref) };
        }
        else {
            core = this.coreJson(coreSchema(schema), annotation, catalogDefs);
        }
        if (effectiveAnnotation.keywords)
            Object.assign(core, copyJson(effectiveAnnotation.keywords));
        const result = effectiveAnnotation.allOf
            ? { allOf: [core, ...effectiveAnnotation.allOf.map(s => copyJson(s))] }
            : core;
        if (ownDescription)
            result['description'] = ownDescription;
        if (effectiveDefault !== undefined)
            result['default'] = effectiveDefault;
        return result;
    }
    /**
     * Returns the standard definition a reference in the catalog document names
     * (`<commonTypesUri>#/$defs/<name>`), or `undefined` for any other
     * reference. A bare `#/$defs/<name>` in the catalog document names one of
     * the catalog's own definitions, which may share a standard definition's
     * name, so it is not followed.
     *
     * The definition is returned with its own references, which are local to
     * the common types document, written as the catalog document writes them,
     * so that they resolve against the same document when followed in turn.
     */
    resolveStandardRef(ref) {
        const prefix = `${this.commonTypesUri}#/$defs/`;
        if (!ref.startsWith(prefix))
            return undefined;
        const name = ref.substring(prefix.length);
        if (name.includes('/') || !Object.prototype.hasOwnProperty.call(this.standardDefs, name))
            return undefined;
        const cached = this.standardDefsInCatalog.get(name);
        if (cached)
            return cached;
        const definition = this.standardDefs[name];
        if (!isObject(definition))
            return undefined;
        const rewritten = this.withCatalogRefs(definition);
        this.standardDefsInCatalog.set(name, rewritten);
        return rewritten;
    }
    /**
     * Returns a copy of a part of the common types document with its local
     * references written as the catalog document writes them.
     */
    withCatalogRefs(value) {
        if (Array.isArray(value))
            return value.map(item => this.withCatalogRefs(item));
        if (!isObject(value))
            return value;
        const result = {};
        for (const [key, item] of Object.entries(value)) {
            result[key] =
                key === '$ref' && typeof item === 'string'
                    ? this.refTarget(item)
                    : this.withCatalogRefs(item);
        }
        return result;
    }
    /** Writes a `REF:` marker's reference as the catalog document does. */
    refTarget(ref) {
        if (!ref.startsWith('#/$defs/'))
            return ref;
        return `${this.commonTypesUri}${ref}`;
    }
    /** Converts the core of a schema, below its wrappers. */
    coreJson(schema, annotation, catalogDefs) {
        const def = defOf(schema);
        switch (def.typeName) {
            case 'ZodObject':
                return this.objectSchema(schema, annotation, () => true, catalogDefs);
            case 'ZodString':
                return stringSchema(def);
            case 'ZodNumber':
                return numberSchema(def);
            case 'ZodBoolean':
                return { type: 'boolean' };
            case 'ZodNull':
                return { type: 'null' };
            case 'ZodEnum':
                return { type: 'string', enum: [...def['values']] };
            case 'ZodLiteral':
                return { const: def['value'] };
            case 'ZodAny':
            case 'ZodUnknown':
                return {};
            case 'ZodNever':
                return { not: {} };
            case 'ZodArray': {
                const result = {
                    type: 'array',
                    items: this.toJson(def['type'], catalogDefs),
                };
                const min = def['minLength'];
                const max = def['maxLength'];
                if (min)
                    result['minItems'] = min.value;
                if (max)
                    result['maxItems'] = max.value;
                return result;
            }
            case 'ZodUnion':
            case 'ZodDiscriminatedUnion': {
                // A union accepts a value any of its branches accepts, as `anyOf`
                // does. It is written as `oneOf`, as the specification writes its
                // unions, only when no value matches two branches, so that both
                // keywords accept the same values.
                const options = def['options'];
                const branches = [...options].map(option => this.toJson(option, catalogDefs));
                const resolve = (ref) => {
                    if (ref.startsWith('#/$defs/') && catalogDefs !== undefined) {
                        const defName = ref.substring('#/$defs/'.length);
                        const defModel = catalogDefs.get(defName);
                        if (defModel !== undefined)
                            return this.defSchema(defModel, catalogDefs);
                    }
                    return this.resolveStandardRef(ref);
                };
                const disjoint = branches.every((branch, i) => branches.slice(i + 1).every(other => provablyDisjoint(branch, other, resolve)));
                return { [disjoint ? 'oneOf' : 'anyOf']: branches };
            }
            case 'ZodRecord':
                return {
                    type: 'object',
                    additionalProperties: this.toJson(def['valueType'], catalogDefs),
                };
            case 'ZodLazy':
                return this.toJson(def['getter'](), catalogDefs);
            default:
                return fallbackJson(schema);
        }
    }
    /**
     * Converts an object schema, keeping the properties `keep` accepts. Its
     * `required` list follows the annotation, or else the property order.
     */
    objectSchema(schema, annotation, keep, catalogDefs) {
        const def = defOf(schema);
        if (def.typeName !== 'ZodObject')
            return this.toJson(schema, catalogDefs);
        const shape = schema.shape;
        const properties = {};
        const required = [];
        for (const [key, value] of Object.entries(shape)) {
            if (!keep(key))
                continue;
            properties[key] = this.toJson(value, catalogDefs);
            if (!value.isOptional())
                required.push(key);
        }
        const result = { type: 'object', properties };
        const order = annotation.required?.filter(key => required.includes(key));
        const unordered = required.filter(key => !order?.includes(key));
        if (required.length > 0)
            result['required'] = order ? [...order, ...unordered] : required;
        const unknownKeys = def['unknownKeys'];
        const catchall = def['catchall'];
        const keyword = annotation.closure ?? (unknownKeys === 'strict' ? 'additionalProperties' : 'none');
        if (catchall && defOf(catchall).typeName !== 'ZodNever') {
            result[keyword === 'none' ? 'additionalProperties' : keyword] = this.toJson(catchall, catalogDefs);
        }
        else if (keyword !== 'none') {
            result[keyword] = unknownKeys === 'passthrough';
        }
        return result;
    }
}
/** Returns the core of a schema, below its wrappers. */
function coreSchema(schema) {
    let node = schema;
    for (let next = innerSchema(node); next; next = innerSchema(node))
        node = next;
    return node;
}
/** Returns the description of a schema's outermost node that has one. */
function schemaDescription(schema) {
    for (let node = schema; node; node = innerSchema(node)) {
        const description = defOf(node).description;
        if (typeof description === 'string')
            return description;
    }
    return undefined;
}
/** Returns a schema's description, unless it is a `REF:` marker. */
function plainDescription(schema) {
    const description = schemaDescription(schema);
    return description !== undefined && !description.startsWith('REF:') ? description : undefined;
}
/** Returns the default value of a schema's outermost `default` wrapper. */
function schemaDefault(schema) {
    for (let node = schema; node; node = innerSchema(node)) {
        const def = defOf(node);
        if (def.typeName === 'ZodDefault')
            return def['defaultValue']();
    }
    return undefined;
}
/** Formats that a Zod string check stands for. */
const STRING_FORMATS = {
    email: 'email',
    url: 'uri',
    uuid: 'uuid',
    datetime: 'date-time',
    date: 'date',
    time: 'time',
};
function stringSchema(def) {
    const result = { type: 'string' };
    for (const check of def['checks'] ?? []) {
        if (check.kind === 'regex')
            result['pattern'] = check['regex'].source;
        else if (check.kind === 'min')
            result['minLength'] = check['value'];
        else if (check.kind === 'max')
            result['maxLength'] = check['value'];
        else if (check.kind in STRING_FORMATS)
            result['format'] = STRING_FORMATS[check.kind];
    }
    return result;
}
function numberSchema(def) {
    const checks = def['checks'] ?? [];
    const result = {
        type: checks.some(check => check.kind === 'int') ? 'integer' : 'number',
    };
    for (const check of checks) {
        if (check.kind === 'min') {
            result[check['inclusive'] ? 'minimum' : 'exclusiveMinimum'] = check['value'];
        }
        else if (check.kind === 'max') {
            result[check['inclusive'] ? 'maximum' : 'exclusiveMaximum'] = check['value'];
        }
    }
    return result;
}
/** Converts a schema the shaper has no rule for with `zod-to-json-schema`. */
function fallbackJson(schema) {
    const json = zodToJsonSchema(schema, {
        target: 'jsonSchema2019-09',
        $refStrategy: 'none',
        override: exclusiveUnionOverride,
    });
    delete json['$schema'];
    delete json['definitions'];
    delete json['$defs'];
    return json;
}
