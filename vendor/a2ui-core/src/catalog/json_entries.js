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
 * The JSON Schema definitions of the entries `Catalog.fromJson` loaded, by
 * entry. Kept out of the entries' own properties, so that a copy of an entry
 * made with object spread, which may change its `schema`, does not carry a
 * definition that no longer describes it.
 */
const definitions = new WeakMap();
/**
 * Returns the JSON Schema definition of a catalog entry that
 * `Catalog.fromJson` loaded, or `undefined` for an entry defined in code.
 *
 * @param entry A component or function.
 */
export function loadedDefinition(entry) {
    return definitions.get(entry);
}
/**
 * Copies the JSON Schema definition loaded by `Catalog.fromJson` from `source`
 * to `target`, when `source` has one.
 *
 * Used by `AgentFunction.fromApi` so that binding a handler to a loaded
 * `JsonFunctionApi` preserves its authored JSON Schema definition when
 * `Catalog.toJson` writes the catalog back out.
 *
 * @param source The original catalog entry.
 * @param target The wrapper entry.
 */
export function copyLoadedDefinition(source, target) {
    const definition = definitions.get(source);
    if (definition !== undefined) {
        definitions.set(target, definition);
    }
}
/**
 * Defines lazily computed, enumerable getters on `target`, so that an object
 * spread of it copies their values.
 */
function defineViews(target, views) {
    for (const [key, compute] of Object.entries(views)) {
        let computed = false;
        let value;
        Object.defineProperty(target, key, {
            enumerable: true,
            get() {
                if (!computed) {
                    value = compute();
                    computed = true;
                }
                return value;
            },
        });
    }
}
function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function stringList(value) {
    return Array.isArray(value)
        ? value.filter((item) => typeof item === 'string')
        : undefined;
}
/**
 * A component that `Catalog.fromJson` loaded from a catalog document.
 *
 * Its model is its JSON Schema definition as the document writes it
 * (`jsonSchema`), deeply frozen. Every other field is a view of it: the Zod
 * `schema` is derived from it on first use and cached, and `allowedParents`
 * and `allowedChildren` are read from it. `Catalog.toJson` writes the
 * definition, so a loaded catalog serializes as written.
 *
 * A copy made with object spread is an ordinary component defined in code: it
 * keeps the views' values but not the definition, and is serialized from its
 * `schema`.
 */
export class JsonComponentApi {
    /**
     * @param name The component's name.
     * @param jsonSchema The component's definition, deeply frozen.
     * @param deriveSchema Derives the component's Zod schema from its definition.
     */
    constructor(name, jsonSchema, deriveSchema) {
        this.name = name;
        definitions.set(this, jsonSchema);
        defineViews(this, {
            schema: () => deriveSchema(jsonSchema),
            allowedParents: () => stringList(jsonSchema['allowedParents']),
            allowedChildren: () => stringList(jsonSchema['allowedChildren']),
            metadata: () => isObject(jsonSchema['metadata']) ? jsonSchema['metadata'] : undefined,
        });
        Object.freeze(this);
    }
    /** The component's JSON Schema definition, as its catalog document writes it. */
    get jsonSchema() {
        return definitions.get(this);
    }
}
/**
 * A function that `Catalog.fromJson` loaded from a catalog document.
 *
 * Its model is its JSON Schema definition as the document writes it
 * (`jsonSchema`): an entry of a `functions` map (the schema of a call to the
 * function) or an item of a `functions` list (with its `name` and
 * `parameters`), deeply frozen. Every other field is a view of it: the Zod
 * `schema` of its arguments is derived from it on first use and cached, and
 * `returnType`, `description`, `allowedCallers` and `requiresUserActivation`
 * are read from it.
 *
 * A copy made with object spread is an ordinary function defined in code: it
 * keeps the views' values but not the definition.
 */
export class JsonFunctionApi {
    /**
     * @param name The function's name.
     * @param jsonSchema The function's definition, deeply frozen.
     * @param deriveSchema Derives the Zod schema of the function's arguments
     *     from its definition.
     */
    constructor(name, jsonSchema, deriveSchema) {
        this.name = name;
        definitions.set(this, jsonSchema);
        // A map entry may write the call metadata as constant properties of the
        // call schema, before v1.0 lifted it to keywords.
        const props = isObject(jsonSchema['properties']) ? jsonSchema['properties'] : undefined;
        const constant = (key) => {
            const property = props?.[key];
            return isObject(property) ? property['const'] : undefined;
        };
        defineViews(this, {
            schema: () => deriveSchema(jsonSchema),
            returnType: () => {
                const declared = jsonSchema['returnType'] ?? constant('returnType');
                return typeof declared === 'string' ? declared : 'any';
            },
            description: () => typeof jsonSchema['description'] === 'string' ? jsonSchema['description'] : undefined,
            allowedCallers: () => jsonSchema['allowedCallers'] ?? constant('allowedCallers'),
            requiresUserActivation: () => jsonSchema['requiresUserActivation'] ?? constant('requiresUserActivation'),
        });
        Object.freeze(this);
    }
    /** The function's JSON Schema definition, as its catalog document writes it. */
    get jsonSchema() {
        return definitions.get(this);
    }
}
