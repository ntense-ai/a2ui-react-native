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
import { z } from 'zod';
import { DataContext } from '../resolution/data-context.js';
import { allowsAgentRouting, withActiveCallCatalogId } from '../resolution/data-context-internal.js';
import { A2uiCatalogError, A2uiExpressionError } from '../errors.js';
import { jsonValueEquals } from '../common/metadata.js';
import { isAtLeastVersion } from '../common/semver.js';
import { findFailedArgument, isThenable, settleDeep } from '../common/settle_deep.js';
import { assertUax31Identifier } from '../common/uax31.js';
import { SpecVersion } from '../spec_versions.js';
import { AgentFunction, bindAgentFunctionDefs, isAgentFunction } from './agent_function.js';
import { getDeclaredSchemaKeys, isZodSchema, parseCatalogSchema } from './schema_loader.js';
import { generateValidationSchema } from './schema_generator.js';
import { deepCopyJson, frozenJson, retainedDefs, serializeCatalogDocument, } from './schema_serializer.js';
import { buildComponentRefMap, } from './reference-map.js';
import { V08_CHILD_REF_OPTIONS } from '../v0_8/standard_defs.js';
import { V09_CHILD_REF_OPTIONS } from '../v0_9/standard_defs.js';
import { IndexImplementation } from '../v1_0/functions/system_functions.js';
import { V10_CHILD_REF_OPTIONS } from '../v1_0/standard_defs.js';
import { coerceDynamicBooleans } from './validation_result_coercion.js';
export { AgentFunction, isAgentFunction };
/**
 * Creates a typed FunctionImplementation from an API definition and an execution callback.
 *
 * @param api The function API definition containing name, schema, and metadata.
 * @param execute The execution handler callback.
 * @returns A complete FunctionImplementation object.
 */
export function createFunctionImplementation(api, execute) {
    return {
        name: api.name,
        returnType: api.returnType,
        schema: api.schema,
        allowedCallers: api.allowedCallers,
        requiresUserActivation: api.requiresUserActivation,
        description: api.description,
        execute: execute,
    };
}
/**
 * Collection of available components and functions.
 *
 * The `F` parameter distinguishes catalogs that carry executable function
 * implementations (`FunctionImplementation`, the default and the only kind a
 * renderer should hold) from schema-only catalogs (`FunctionApi`), whose
 * functions are signatures loaded from catalog JSON with no code attached.
 * Consumers that need to execute functions, such as `NodeResolver`, constrain
 * `F` to `FunctionImplementation` so a schema-only catalog is rejected at
 * compile time rather than resolving values to `undefined` at runtime.
 *
 * A catalog is its catalog document in model form. An entry `fromJson`
 * loaded (`JsonComponentApi`, `JsonFunctionApi`) has its JSON Schema
 * definition as its model, from which its Zod schema is derived. An entry
 * defined in code has its Zod schema as its model; when the schema is
 * annotated as a specification model (see `spec`), as the built-in basic
 * catalogs' generated models are, `toJson` computes its definition in the
 * layout of the catalog's protocol version, and otherwise generates one. The
 * catalog keeps the document-level fields (`CatalogDocumentOptions`).
 * `toJson` assembles the document from all of these and `validationSchema`
 * bundles it, so `Catalog.fromJson(doc).toJson()` equals `doc`, and `toJson`
 * of a built-in basic catalog equals its published document.
 */
export class Catalog {
    /**
     * Self-contained JSON Schema for validating payloads against this catalog.
     *
     * Built from the catalog's model and memoized: from the definition of each
     * entry `toJson` writes, or, for an entry defined in code without
     * specification annotations, from its Zod schema. Common
     * types references are localized and the referenced standard definitions
     * for the catalog's protocol version, and any of the catalog's `defs` an
     * entry references, are bundled into `$defs`, together with the component
     * envelope and the `anyComponent`/`anyFunction` unions. Use `toJson` for the
     * catalog document itself.
     *
     * Each read returns a fresh copy that the caller may modify.
     */
    get validationSchema() {
        if (!this.cachedValidationSchema) {
            this.cachedValidationSchema = generateValidationSchema(this);
        }
        return deepCopyJson(this.cachedValidationSchema);
    }
    /**
     * Dynamically reconstructs and memoizes the unified standard A2UI catalog JSON Schema document.
     *
     * @deprecated Use `validationSchema` for the bundled schema or `toJson` for
     *   the catalog document.
     */
    get catalogSchema() {
        return this.validationSchema;
    }
    /**
     * Returns the unbundled catalog document for this catalog, assembled from
     * its model and memoized.
     *
     * The document-level fields come from the catalog (`CatalogDocumentOptions`).
     * An entry `fromJson` loaded is written as its definition, with references
     * kept as written, unless it references a local definition the catalog
     * lacks. An entry defined in code whose schema is a specification model is
     * computed from its model in the layout of the catalog's protocol version,
     * with its mixins and the `defModels` written to `$defs`; any other entry
     * is generated from its Zod schema. Common types references are written
     * against `commonTypesUri`. The `anyComponent` and `anyFunction` unions are
     * computed from the entries. So for a catalog loaded with `fromJson`, the
     * result equals the loaded document (minus any entries that the document's
     * `anyComponent.oneOf` or `anyFunction.oneOf` unions omit, which `fromJson`
     * filters out on load), and for a built-in basic catalog, the published
     * document.
     *
     * @returns A fresh document that the caller may modify.
     */
    toJson() {
        if (!this.cachedDocument) {
            this.cachedDocument = serializeCatalogDocument(this);
        }
        return deepCopyJson(this.cachedDocument);
    }
    /**
     * Returns a catalog with this catalog's ID, version, theme and
     * document-level fields, and the given entries instead of its own.
     *
     * Definitions of `defs` that only entries left out referenced are dropped,
     * so `toJson` of the result does not carry, say, the mixin of a pruned
     * component. Catalog transformers use it to derive a catalog.
     *
     * @param components The components of the new catalog.
     * @param functions The functions of the new catalog.
     * @returns A new catalog.
     */
    withEntries(components, functions) {
        return this.rebuild(components, functions, {
            id: this.id,
            schemaId: this.schemaId,
            title: this.title,
            description: this.description,
            instructions: this.instructions,
        });
    }
    /**
     * Returns a shallow copy of this catalog with the specified fields or
     * entries replaced.
     *
     * When `agentFunctions` is provided and `functions` is omitted, any existing
     * `AgentFunction` entries in this catalog are first restored to their
     * original `declaration` (or dropped when they had no `declaration`) before
     * the new `agentFunctions` are merged in.
     *
     * @param options Fields and entries to override on the copied catalog.
     * @returns A new `Catalog` instance.
     * @throws {A2uiCatalogError} If an agent function's JSON Schema has a local
     *   `$defs` entry that the catalog's `$defs`, or another agent function's,
     *   defines differently.
     */
    copyWith(options = {}) {
        const nextComponents = options.components !== undefined
            ? [...options.components]
            : [...this.components.values()];
        let baseFunctions;
        if (options.functions !== undefined) {
            baseFunctions = [...options.functions];
        }
        else if (options.agentFunctions !== undefined) {
            baseFunctions = [];
            for (const fn of this.functions.values()) {
                if (isAgentFunction(fn)) {
                    if (fn.declaration !== undefined) {
                        baseFunctions.push(fn.declaration);
                    }
                }
                else {
                    baseFunctions.push(fn);
                }
            }
        }
        else {
            baseFunctions = [...this.functions.values()];
        }
        const nextId = options.catalogId ?? this.id;
        const mergedFunctions = mergeAgentFunctions(nextId, baseFunctions, options.agentFunctions);
        return this.rebuild(nextComponents, mergedFunctions, {
            id: nextId,
            protocolVersion: options.protocolVersion ?? this.protocolVersion,
            themeSchema: options.themeSchema ?? this.themeSchema,
            schemaId: this.schemaId,
            title: this.title,
            description: this.description,
            instructions: options.instructions ?? this.instructions,
        });
    }
    /**
     * Returns a new catalog, under its own ID, built from entries of this one
     * and new entries.
     *
     * In `components` and `functions`, a name keeps this catalog's entry of
     * that name, and an entry adds it, or replaces this catalog's entry of the
     * same name. Leaving either list out keeps all of this catalog's entries of
     * that kind. The new catalog keeps this catalog's version, theme and the
     * document-level fields that describe its layout, and drops `defs` that only
     * entries left out referenced, as `withEntries` does.
     *
     * It does not keep this catalog's `$id`, title, description or
     * instructions, which describe this catalog: instructions often name its
     * ID and its components in their examples, so they would teach a model to
     * write messages for the wrong catalog.
     *
     * @returns A new catalog.
     * @throws {A2uiCatalogError} If a name is not an entry of this catalog.
     */
    derive(options) {
        const pick = (kind, own, wanted) => {
            if (wanted === undefined)
                return [...own.values()];
            return wanted.map(item => {
                if (typeof item !== 'string')
                    return item;
                const entry = own.get(item);
                if (!entry) {
                    throw new A2uiCatalogError(`Catalog '${this.id}' has no ${kind} '${item}' to derive catalog '${options.catalogId}' from.`);
                }
                return entry;
            });
        };
        return this.rebuild(pick('component', this.components, options.components), pick('function', this.functions, options.functions), { id: options.catalogId, instructions: options.instructions });
    }
    /**
     * Builds a catalog with this catalog's version, theme and layout, the given
     * entries and the given fields that describe the catalog.
     */
    rebuild(components, functions, described) {
        const componentsChanged = components.length !== this.components.size ||
            components.some(c => this.components.get(c.name) !== c);
        const functionsChanged = functions.length !== this.functions.size ||
            functions.some(f => this.functions.get(f.name) !== f);
        let baseDefs = this.defs;
        if (baseDefs && (componentsChanged || functionsChanged)) {
            const copy = { ...baseDefs };
            if (componentsChanged)
                delete copy['anyComponent'];
            if (functionsChanged)
                delete copy['anyFunction'];
            baseDefs = copy;
        }
        const unions = this.unions
            ? {
                anyComponent: this.unions.anyComponent || componentsChanged,
                anyFunction: this.unions.anyFunction || functionsChanged,
            }
            : undefined;
        return new Catalog(described.id, described.protocolVersion ?? this.protocolVersion, components, functions, {
            themeSchema: described.themeSchema ?? this.themeSchema,
            instructions: described.instructions,
            schemaUri: this.schemaUri,
            schemaId: described.schemaId,
            title: described.title,
            description: described.description,
            declaredProtocolVersion: this.declaredProtocolVersion,
            declaresCatalogId: this.declaresCatalogId,
            declaresComponents: this.declaresComponents,
            functionsLayout: this.functionsLayout,
            unions,
            defs: retainedDefs(baseDefs, [...this.components.values(), ...this.functions.values()], [...components, ...functions], this.extensionFields),
            extensionFields: this.extensionFields,
            commonTypesUri: this.commonTypesUri,
            themeLocation: this.themeLocation,
            defModels: this.defModels,
        });
    }
    /**
     * Lazily computed component reference map for child reference extraction and topology validation.
     */
    get componentRefMap() {
        if (!this._componentRefMap) {
            const options = isAtLeastVersion(this.protocolVersion, '1.0')
                ? V10_CHILD_REF_OPTIONS
                : isAtLeastVersion(this.protocolVersion, '0.9')
                    ? V09_CHILD_REF_OPTIONS
                    : V08_CHILD_REF_OPTIONS;
            this._componentRefMap = buildComponentRefMap(this, options);
        }
        return this._componentRefMap;
    }
    constructor(id, protocolVersionOrComponents, componentsOrFunctions, functionsOrThemeSchemaOrOptions, themeSchemaOrOptionsOrInstructions, instructions) {
        let protocolVersion;
        let components;
        let functions;
        let themeSchemaOrOptions;
        let resolvedInstructions;
        if (typeof protocolVersionOrComponents !== 'string') {
            // Pre-1.0 (v0.9) signature: `new Catalog(id, components, functions, ...)`.
            protocolVersion = '0.9';
            components = protocolVersionOrComponents ?? [];
            functions = componentsOrFunctions ?? [];
            themeSchemaOrOptions = functionsOrThemeSchemaOrOptions;
            resolvedInstructions = themeSchemaOrOptionsOrInstructions;
        }
        else {
            protocolVersion = protocolVersionOrComponents;
            components = componentsOrFunctions ?? [];
            functions = functionsOrThemeSchemaOrOptions ?? [];
            themeSchemaOrOptions = themeSchemaOrOptionsOrInstructions;
            resolvedInstructions = instructions;
        }
        if (!protocolVersion) {
            throw new A2uiCatalogError('protocolVersion must be provided.');
        }
        this.id = id;
        this.protocolVersion = protocolVersion;
        const compMap = new Map();
        for (const comp of components) {
            compMap.set(comp.name, comp);
        }
        this.components = compMap;
        const options = isZodSchema(themeSchemaOrOptions)
            ? { themeSchema: themeSchemaOrOptions }
            : (themeSchemaOrOptions ?? {});
        // Frozen, so neither the caller nor a reader of the catalog can change the
        // fields `toJson` assembles the document from. Values that are already
        // frozen, such as those `fromJson` produced, are kept without copying.
        const defs = frozenJson(options.defs);
        if (functions.some(isAgentFunction)) {
            assertUniqueFunctionNames(this.id, functions);
        }
        const funcMap = new Map();
        const agentFuncMap = new Map();
        const rendererFuncMap = new Map();
        for (const fn of functions) {
            if (isAgentFunction(fn)) {
                const boundFn = bindAgentFunctionDefs(fn, defs);
                funcMap.set(fn.name, boundFn);
                agentFuncMap.set(fn.name, boundFn);
            }
            else {
                funcMap.set(fn.name, fn);
                rendererFuncMap.set(fn.name, fn);
            }
        }
        if (agentFuncMap.size > 0) {
            if (!isAtLeastVersion(this.protocolVersion, SpecVersion.V1_0)) {
                throw new A2uiCatalogError(`Catalog '${this.id}' targets protocol version ${this.protocolVersion}, but agent functions need v1.0 or later.`);
            }
            assertAgentFunctionDefsAgree(defs, agentFuncMap.values());
            for (const [name, agentFn] of agentFuncMap) {
                assertUax31Identifier(name, `function identifier: '${name}'`);
                // The keys the Zod schema declares, on every branch and through
                // wrappers, with the names a JSON Schema `schema` was written with
                // (including references resolved against local and catalog `$defs`).
                const argNames = new Set([
                    ...getDeclaredSchemaKeys(agentFn.schema),
                    ...(agentFn.declaredParameterNames ?? []),
                ]);
                for (const argName of argNames) {
                    assertUax31Identifier(argName, `argument identifier: '${argName}' in function '${name}'`);
                }
            }
        }
        this.functions = funcMap;
        this.agentFunctions = agentFuncMap;
        this.rendererFunctions = rendererFuncMap;
        this.themeSchema = options.themeSchema;
        this.instructions = options.instructions ?? resolvedInstructions;
        this.schemaUri = options.schemaUri;
        this.schemaId = options.schemaId;
        this.title = options.title;
        this.description = options.description;
        this.declaredProtocolVersion = options.declaredProtocolVersion;
        this.declaresCatalogId = options.declaresCatalogId ?? true;
        this.declaresComponents = options.declaresComponents ?? true;
        this.functionsLayout = options.functionsLayout;
        this.unions = options.unions ? Object.freeze({ ...options.unions }) : undefined;
        this.defs = defs;
        this.extensionFields = frozenJson(options.extensionFields);
        this.commonTypesUri = options.commonTypesUri;
        this.themeLocation = options.themeLocation;
        this.defModels = options.defModels ? Object.freeze([...options.defModels]) : undefined;
        this.invoker = createCatalogInvoker(this.id, this.protocolVersion, this.functions, this);
    }
    /**
     * Constructs a schema-only Catalog from an authored A2UI catalog document.
     *
     * Each entry is a `JsonComponentApi` or `JsonFunctionApi` whose model is
     * its definition as written, from which its Zod schema is derived on first
     * use, and the catalog keeps the document-level fields, so `toJson` returns
     * the document unchanged.
     *
     * @param json Raw catalog document or client capabilities inline catalog.
     * @param protocolVersion Protocol version of the catalog. When given, it
     *   takes precedence over the `protocolVersion` the document declares: it
     *   becomes the catalog's `protocolVersion` and selects the version's
     *   loading rules, while `toJson` still writes the version the document
     *   declares. When omitted, the document's version applies, and for a
     *   document that declares none, such as those published before v1.0,
     *   `DEFAULT_PROTOCOL_VERSION`.
     * @param catalogId Catalog ID to use instead of the one the document
     *   declares, or for a document that declares none, such as the v0.8 basic
     *   catalog. It becomes the catalog's `id`, and replaces the document's own
     *   `catalogId` in `toJson`; a document that declares none still has none
     *   in `toJson`.
     * @returns A new Catalog populated with component and function schemas.
     * @throws {Error} If the catalog ID is missing or not a string.
     * @throws {A2uiCatalogError} If a v1.0 catalog has a `$ref` to a document
     *   other than itself or `common_types.json`, such as another catalog. Such
     *   a reference is never fetched.
     */
    static fromJson(json, protocolVersion, catalogId) {
        const { id, protocolVersion: resolvedVersion, components, functions, ...options } = parseCatalogSchema(json, protocolVersion, catalogId);
        return new Catalog(id, resolvedVersion, components, functions, options);
    }
    /**
     * Constructs a schema-only Catalog directly from a raw A2UI catalog schema.
     *
     * @deprecated Use `Catalog.fromJson` instead.
     * @param catalogSchema Raw catalog schema or client capabilities payload object.
     * @param protocolVersion Protocol version of the catalog, which takes
     *   precedence over the one the schema declares, as in `fromJson`.
     * @returns A new Catalog populated with component and function schemas.
     * @throws {Error} If the catalog ID is missing or not a string.
     */
    static fromSchema(catalogSchema, protocolVersion) {
        return Catalog.fromJson(catalogSchema, protocolVersion);
    }
}
/**
 * Throws if two of `functions` share a name. Checked when the list holds an
 * agent function, so an agent function can't silently replace another
 * function, or be replaced by one.
 */
function assertUniqueFunctionNames(catalogId, functions) {
    const seen = new Set();
    for (const fn of functions) {
        if (seen.has(fn.name)) {
            throw new A2uiCatalogError(`Catalog '${catalogId}' already has a function named '${fn.name}'.`);
        }
        seen.add(fn.name);
    }
}
/**
 * Throws if an agent function's JSON Schema declares a local `$defs` entry
 * that the catalog's `$defs`, or another agent function's local `$defs`,
 * defines differently.
 *
 * A `#/$defs/<name>` reference in an agent function's schema resolves
 * against the catalog's `$defs` merged with the function's own, so a name
 * defined two ways would mean one thing to the agent and another once the
 * catalog document is published. Equal definitions (compared as JSON values)
 * are accepted.
 */
function assertAgentFunctionDefsAgree(catalogDefs, agentFunctions) {
    // The function, if any, whose local `$defs` first defined each name.
    const seen = new Map();
    for (const [name, definition] of Object.entries(catalogDefs ?? {})) {
        seen.set(name, { definition });
    }
    for (const agentFn of agentFunctions) {
        const localDefs = agentFn.jsonSchema?.['$defs'];
        if (typeof localDefs !== 'object' || localDefs === null || Array.isArray(localDefs)) {
            continue;
        }
        for (const [defName, definition] of Object.entries(localDefs)) {
            const previous = seen.get(defName);
            if (previous === undefined) {
                seen.set(defName, { definition, owner: agentFn.name });
                continue;
            }
            if (!jsonValueEquals(previous.definition, definition)) {
                const other = previous.owner === undefined ? 'the catalog' : `agent function '${previous.owner}'`;
                throw new A2uiCatalogError(`Agent function '${agentFn.name}' defines $defs '${defName}' differently from ${other}.`);
            }
        }
    }
}
/**
 * Merges `agentFunctions` into `functions`, as `Catalog.copyWith` does.
 *
 * An agent function built with `AgentFunction.fromApi` replaces, in place,
 * the declaration it wraps. Any other agent function is appended.
 *
 * @throws {A2uiCatalogError} If an entry is not an `AgentFunction`, a name
 *   appears twice in `agentFunctions`, an agent function takes the name of
 *   another function, or a `fromApi` agent function wraps a declaration
 *   `functions` doesn't have.
 */
function mergeAgentFunctions(catalogId, functions, agentFunctions) {
    if (agentFunctions === undefined) {
        return [...functions];
    }
    const merged = [...functions];
    const indexByName = new Map();
    for (let i = 0; i < merged.length; i++) {
        indexByName.set(merged[i].name, i);
    }
    const seenAgentNames = new Set();
    for (const agentFn of agentFunctions) {
        if (!isAgentFunction(agentFn)) {
            throw new A2uiCatalogError(`Catalog '${catalogId}' agentFunctions entry '${String(agentFn?.name ?? agentFn)}' is not an \`AgentFunction\`.`);
        }
        if (seenAgentNames.has(agentFn.name)) {
            throw new A2uiCatalogError(`agentFunctions lists '${agentFn.name}' more than once; give each agent function its own name.`);
        }
        seenAgentNames.add(agentFn.name);
        const existingIndex = indexByName.get(agentFn.name);
        if (agentFn.declaration !== undefined) {
            if (existingIndex === undefined) {
                throw new A2uiCatalogError(`Catalog '${catalogId}' has no function named '${agentFn.name}' for AgentFunction.fromApi to bind; build an agent function the catalog doesn't declare with new AgentFunction(...).`);
            }
            if (merged[existingIndex] !== agentFn.declaration) {
                throw new A2uiCatalogError(`Agent function '${agentFn.name}' was built with AgentFunction.fromApi from a different declaration than the one in catalog '${catalogId}' (for example, from a reloaded or copied catalog); build it from this catalog's entry: AgentFunction.fromApi(catalog.functions.get('${agentFn.name}')!, handler).`);
            }
            merged[existingIndex] = agentFn;
        }
        else if (existingIndex === undefined) {
            indexByName.set(agentFn.name, merged.length);
            merged.push(agentFn);
        }
        else {
            throw new A2uiCatalogError(`Catalog '${catalogId}' already has a function named '${agentFn.name}', so an agent function can't use that name: a renderer that implements the other function would run it instead of calling the agent. Give the agent function its own name, or bind a handler to the declared function with AgentFunction.fromApi(catalog.functions.get('${agentFn.name}')!, handler).`);
        }
    }
    return merged;
}
function createCatalogInvoker(catalogId, protocolVersion, functions, catalog) {
    const atLeastV10 = isAtLeastVersion(protocolVersion, SpecVersion.V1_0);
    return (name, rawArgs, ctx, abortSignal) => {
        const fn = functions.get(name) ??
            (atLeastV10 && name === '@index' ? IndexImplementation : undefined);
        const execute = fn?.execute;
        if (typeof execute !== 'function') {
            // From v1.0, a function the renderer does not implement (undeclared, or
            // declared schema-only) runs on the agent: the fallback routing of
            // `callAgentFunction`. Reserved `@` system functions never do, and
            // neither do evaluations that cannot wait for the agent.
            const surface = atLeastV10 && !name.startsWith('@') && ctx && allowsAgentRouting(ctx)
                ? ctx.surface
                : undefined;
            if (surface?.agentFunctionCaller) {
                return routeToAgent(surface, catalogId, name, fn, rawArgs, ctx, abortSignal);
            }
        }
        if (!fn) {
            throw new A2uiExpressionError(`Function not found in catalog '${catalogId}': ${name}`, name);
        }
        assertRendererCaller(fn);
        assertUserActivation(fn, ctx);
        if (typeof execute !== 'function') {
            throw new A2uiExpressionError(`Function '${name}' in catalog '${catalogId}' is schema-only and has no implementation.`, name);
        }
        const callCtx = atLeastV10 && !name.startsWith('@') && catalogId && ctx instanceof DataContext
            ? withActiveCallCatalogId(ctx, catalogId, catalog)
            : ctx;
        return whenArgumentsSettle(rawArgs, abortSignal, resolvedArgs => {
            try {
                const args = coerceDynamicBooleans(fn.schema, resolvedArgs);
                const safeArgs = fn.schema.parse(args);
                return execute.call(fn, safeArgs, callCtx, abortSignal);
            }
            catch (e) {
                if (e?.name === 'ZodError' || e instanceof z.ZodError) {
                    throw new A2uiExpressionError(`Validation failed for function '${name}': ${e.message}`, name, e.errors ?? e.issues);
                }
                throw e;
            }
        });
    };
}
/**
 * Runs `run` with the settled arguments of a call.
 *
 * An argument produced by an asynchronous function arrives as a pending
 * Promise. `run` waits for every such argument, while fully settled arguments
 * keep the call synchronous. A failed argument is returned instead of running,
 * even when the evaluation was aborted meanwhile, so the enclosing call stops.
 * Otherwise an aborted evaluation resolves to `undefined` without running.
 *
 * @param rawArgs The resolved arguments, which may hold pending values.
 * @param abortSignal Signal that marks the evaluation as stale.
 * @param run Validates and runs the call with the settled arguments.
 * @returns The result of `run`, a Promise of it, or the failed argument.
 */
function whenArgumentsSettle(rawArgs, abortSignal, run) {
    const settledArgs = settleDeep(rawArgs);
    if (!isThenable(settledArgs)) {
        return findFailedArgument(settledArgs) ?? run(settledArgs);
    }
    return Promise.resolve(settledArgs).then(resolvedArgs => findFailedArgument(resolvedArgs) ?? (abortSignal?.aborted ? undefined : run(resolvedArgs)));
}
/**
 * Sends a call the renderer does not implement to the agent.
 *
 * A declared (schema-only) function is refused if it is `agentOnly` or needs
 * a user gesture the evaluation lacks, and its settled arguments are
 * validated and parsed against its schema before sending, so the agent
 * receives what a local implementation would. The call always names the
 * catalog it resolved to, so the agent never has to know the surface's
 * default catalog. Action calls bypass the shared-call cache.
 */
function routeToAgent(surface, catalogId, name, fn, rawArgs, ctx, abortSignal) {
    if (fn) {
        assertRendererCaller(fn);
        assertUserActivation(fn, ctx);
    }
    const bypassCache = Boolean(ctx.isActionExecution);
    return whenArgumentsSettle(rawArgs, abortSignal, resolvedArgs => {
        let args = (resolvedArgs ?? {});
        if (fn) {
            args = coerceDynamicBooleans(fn.schema, args);
            const parsed = fn.schema.safeParse(args);
            if (!parsed.success) {
                throw new A2uiExpressionError(`Validation failed for function '${name}': ${parsed.error.message}`, name, parsed.error.errors);
            }
            args = parsed.data;
        }
        return surface.callAgentFunction({ '@call': name, catalogId, args }, { abortSignal, bypassCache });
    });
}
/**
 * Refuses a function the catalog restricts to agent-initiated
 * `callRendererFunction` calls. The invoker runs the renderer's own calls
 * (bindings, checks and actions); `RpcHandler` runs agent calls without it.
 */
function assertRendererCaller(fn) {
    if (fn.allowedCallers === 'agentOnly') {
        throw new A2uiExpressionError(`Function '${fn.name}' cannot be called by renderer (allowedCallers is agentOnly).`, fn.name);
    }
}
function assertUserActivation(fn, ctx) {
    if (!fn.requiresUserActivation)
        return;
    const isPassive = Boolean(ctx?.isPassiveEvaluation);
    const isActivated = Boolean(ctx?.isUserActivated);
    const browserUnactivated = !isActivated &&
        typeof navigator !== 'undefined' &&
        !(navigator.userActivation?.isActive ?? true);
    if (isPassive || browserUnactivated) {
        throw new A2uiExpressionError(`Function '${fn.name}' requires user activation and cannot be evaluated without an active user gesture.`, fn.name);
    }
}
