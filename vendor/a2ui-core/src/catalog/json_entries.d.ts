import type { z } from 'zod';
import { A2uiMetadata } from '../common/metadata.js';
import type { JsonSchemaObject } from './spec_annotations.js';
/**
 * Returns the JSON Schema definition of a catalog entry that
 * `Catalog.fromJson` loaded, or `undefined` for an entry defined in code.
 *
 * @param entry A component or function.
 */
export declare function loadedDefinition(entry: object): JsonSchemaObject | undefined;
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
export declare function copyLoadedDefinition(source: object, target: object): void;
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
export declare class JsonComponentApi {
    /** Name of the component as it appears in A2UI JSON. */
    readonly name: string;
    /** Zod schema of the component's properties, derived from `jsonSchema`. */
    readonly schema: z.ZodTypeAny;
    /** Allowed parent component types, as the definition declares them. */
    readonly allowedParents?: string[];
    /** Allowed child component types, as the definition declares them. */
    readonly allowedChildren?: string[];
    /** Component-level metadata, as the definition declares it. */
    readonly metadata?: A2uiMetadata;
    /**
     * @param name The component's name.
     * @param jsonSchema The component's definition, deeply frozen.
     * @param deriveSchema Derives the component's Zod schema from its definition.
     */
    constructor(name: string, jsonSchema: JsonSchemaObject, deriveSchema: (jsonSchema: JsonSchemaObject) => z.ZodTypeAny);
    /** The component's JSON Schema definition, as its catalog document writes it. */
    get jsonSchema(): JsonSchemaObject;
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
export declare class JsonFunctionApi {
    /** Name of the function as it appears in A2UI JSON payloads. */
    readonly name: string;
    /** Zod schema of the function's arguments, derived from `jsonSchema`. */
    readonly schema: z.ZodTypeAny;
    /** Return type identifier, as the definition declares it, or `'any'`. */
    readonly returnType: string;
    /** The definition's description. */
    readonly description?: string;
    /** Allowed caller contexts, as the definition declares them. */
    readonly allowedCallers?: 'rendererOnly' | 'agentOnly' | 'rendererOrAgent';
    /** Whether the definition requires user activation. */
    readonly requiresUserActivation?: boolean;
    /**
     * @param name The function's name.
     * @param jsonSchema The function's definition, deeply frozen.
     * @param deriveSchema Derives the Zod schema of the function's arguments
     *     from its definition.
     */
    constructor(name: string, jsonSchema: JsonSchemaObject, deriveSchema: (jsonSchema: JsonSchemaObject) => z.ZodTypeAny);
    /** The function's JSON Schema definition, as its catalog document writes it. */
    get jsonSchema(): JsonSchemaObject;
}
