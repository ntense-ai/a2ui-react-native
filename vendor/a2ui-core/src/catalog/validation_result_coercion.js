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
/**
 * Matches the `REF:` description a `DynamicBoolean` schema carries, whether
 * it was defined in code (`REF:#/$defs/DynamicBoolean|...`) or loaded from a
 * catalog document (`REF:common_types.json#/$defs/DynamicBoolean|...`).
 */
const DYNAMIC_BOOLEAN_REF = /^REF:[^|#]*#\/\$defs\/DynamicBoolean(?:\||$)/;
/**
 * The validity a v1.0 `ValidationResult` object carries, or `undefined` when
 * `value` is not one: an object whose `valid` member is a boolean.
 */
export function validityOf(value) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return undefined;
    }
    const valid = value.valid;
    return typeof valid === 'boolean' ? valid : undefined;
}
/**
 * Coerces a resolved `DynamicBoolean` value to a boolean.
 *
 * - A boolean is returned unchanged.
 * - A `ValidationResult` object (an object with a boolean `valid` member)
 *   coerces to its `valid` boolean.
 * - A string coerces to `true` only when it equals `"true"`
 *   case-insensitively; `"false"` and all other strings coerce to `false`.
 * - A number coerces to `value !== 0` (`NaN` coerces to `false`).
 * - `null`, `undefined`, any other object, or any array coerces to `false`.
 */
export function coerceDynamicBoolean(value) {
    if (typeof value === 'boolean') {
        return value;
    }
    const valid = validityOf(value);
    if (valid !== undefined) {
        return valid;
    }
    if (typeof value === 'string') {
        return value.toLowerCase() === 'true';
    }
    if (typeof value === 'number') {
        return value !== 0 && !Number.isNaN(value);
    }
    return false;
}
/** The schema inside a wrapper such as `optional()`, or `undefined`. */
function innerSchema(schema) {
    const def = schema._def;
    switch (def.typeName) {
        case 'ZodOptional':
        case 'ZodNullable':
        case 'ZodDefault':
        case 'ZodCatch':
        case 'ZodBranded':
        case 'ZodReadonly':
            return def.innerType;
        case 'ZodEffects':
            return def.schema;
        case 'ZodLazy':
            return def.getter?.();
        default:
            return undefined;
    }
}
/**
 * Whether `schema` is the common `DynamicBoolean` type, possibly wrapped.
 *
 * The type is recognized by the `REF:` description every copy of it carries,
 * so a schema defined in code and one loaded from a catalog document are
 * treated alike.
 */
export function isDynamicBooleanSchema(schema) {
    let current = schema;
    while (current) {
        if (typeof current.description === 'string' && DYNAMIC_BOOLEAN_REF.test(current.description)) {
            return true;
        }
        current = innerSchema(current);
    }
    return false;
}
/** The schema under every wrapper, such as `optional()` or `default()`. */
function unwrap(schema) {
    let current = schema;
    for (let inner = innerSchema(current); inner; inner = innerSchema(current)) {
        current = inner;
    }
    return current;
}
function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Coerces every value in `value` that `schema` types as `DynamicBoolean`
 * to a boolean using {@link coerceDynamicBoolean}.
 *
 * Follows the schema through object properties, array items and wrappers
 * such as `optional()`. Returns `value` itself when nothing is coerced.
 *
 * @param schema The schema of `value`, such as a function's argument schema.
 * @param value The resolved value to coerce.
 * @returns `value`, with every `DynamicBoolean` position coerced to a boolean.
 */
export function coerceDynamicBooleans(schema, value) {
    if (isDynamicBooleanSchema(schema)) {
        return coerceDynamicBoolean(value);
    }
    if (typeof value !== 'object' || value === null) {
        return value;
    }
    const core = unwrap(schema);
    const def = core._def;
    if (def.typeName === 'ZodArray' && Array.isArray(value) && def.type) {
        const itemSchema = def.type;
        let changed = false;
        const items = value.map(item => {
            const coerced = coerceDynamicBooleans(itemSchema, item);
            changed || (changed = coerced !== item);
            return coerced;
        });
        return changed ? items : value;
    }
    if (def.typeName === 'ZodObject' && isPlainObject(value)) {
        const shape = core.shape;
        let changed = false;
        const result = {};
        for (const [key, item] of Object.entries(value)) {
            const propertySchema = shape[key];
            const coerced = propertySchema ? coerceDynamicBooleans(propertySchema, item) : item;
            changed || (changed = coerced !== item);
            result[key] = coerced;
        }
        return changed ? result : value;
    }
    return value;
}
/**
 * Coerces every `DynamicBoolean` position in `value` according to `schema`.
 *
 * @param schema The schema of `value`, such as a function's argument schema.
 * @param value The resolved value to coerce.
 * @returns `value`, with every `DynamicBoolean` position coerced to a boolean.
 */
export function coerceValidationResults(schema, value) {
    return coerceDynamicBooleans(schema, value);
}
