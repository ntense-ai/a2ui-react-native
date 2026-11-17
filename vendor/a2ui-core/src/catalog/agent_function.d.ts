import { z } from 'zod';
import { AGENT_FUNCTION_BRAND, isAgentFunction } from './agent_function_brand.js';
import type { A2uiReturnType, FunctionApi, InferA2uiReturnType, ResolvedFunctionArgs } from './types.js';
export { isAgentFunction };
/**
 * Execution context passed to an {@link AgentFunctionHandler} when a renderer
 * invokes an agent function via `callAgentFunction`.
 */
export interface AgentFunctionContext {
    /** Identifier of the catalog that owns the function. */
    readonly catalogId: string;
    /** Identifier of the surface that initiated the call. */
    readonly surfaceId: string;
    /** Unique correlation identifier for the `callAgentFunction` exchange. */
    readonly functionCallId: string;
}
/**
 * Callback that executes an agent function on the agent side.
 *
 * A handler may take `(args)` or `(args, context)`: one that doesn't need the
 * call's metadata can leave `context` out.
 *
 * @param args Validated input arguments (with schema defaults applied).
 * @param context Call metadata including `catalogId`, `surfaceId`, and `functionCallId`.
 * @returns A JSON-compatible result value or a Promise resolving to one.
 */
export type AgentFunctionHandler<TArgs = Record<string, unknown>, TReturn = unknown> = (args: TArgs, context: AgentFunctionContext) => TReturn | Promise<TReturn>;
/**
 * Configuration options for constructing an {@link AgentFunction}.
 *
 * An agent function built this way is always `rendererOnly`: only the
 * renderer calls it, with `callAgentFunction`. To bind a handler to a function
 * the catalog already declares, and keep its `allowedCallers`, use
 * {@link AgentFunction.fromApi}.
 */
export interface AgentFunctionInit<Schema extends z.ZodTypeAny | Record<string, unknown> = Record<string, unknown>, TReturn extends A2uiReturnType = A2uiReturnType> {
    /** Name of the function as it appears in A2UI JSON payloads. */
    readonly name: string;
    /** Handler invoked on the agent when a renderer calls this function. */
    readonly handler: AgentFunctionHandler<Schema extends z.ZodTypeAny ? ResolvedFunctionArgs<Schema> : Record<string, unknown>, InferA2uiReturnType<TReturn>>;
    /** Return type identifier for the function. Defaults to `'any'`. */
    readonly returnType?: TReturn;
    /** Zod schema or JSON Schema object validating the function's input arguments. */
    readonly schema?: Schema;
    /** Whether the function requires explicit user interaction before execution. Defaults to `false`. */
    readonly requiresUserActivation?: boolean;
    /** Human-readable description of the function's purpose. */
    readonly description?: string;
}
/**
 * A catalog function whose handler runs on the agent rather than the renderer.
 *
 * `AgentFunction` implements {@link FunctionApi} (and intentionally omits
 * `FunctionImplementation.execute`) so that:
 * - `Catalog.toJson()`, `Catalog.validationSchema`, and `PayloadValidator`
 *   treat it identically to any other declared catalog function.
 * - If a catalog containing an `AgentFunction` is passed to a renderer,
 *   `Catalog.invoker` sees no local `execute` implementation and routes calls
 *   to the agent via `callAgentFunction`.
 * - On the agent side, `RendererToAgentMessageProcessor` reads
 *   `catalog.agentFunctions` to answer incoming `callAgentFunction` messages
 *   with `handler`.
 *
 * Add agent functions to a catalog with `catalog.copyWith({agentFunctions})`.
 *
 * The type parameters only type the constructor's `handler` from `schema` and
 * `returnType`, so any `AgentFunction` is assignable to `AgentFunction`.
 *
 * @template Schema The Zod schema or JSON Schema object of the arguments.
 * @template TReturn The return type identifier.
 */
export declare class AgentFunction<Schema extends z.ZodTypeAny | Record<string, unknown> = Record<string, unknown>, TReturn extends A2uiReturnType = A2uiReturnType> implements FunctionApi {
    /** @internal */
    readonly [AGENT_FUNCTION_BRAND] = true;
    /** Name of the function as it appears in A2UI JSON payloads. */
    readonly name: string;
    /** Return type identifier for the function. */
    readonly returnType: A2uiReturnType;
    /** Zod schema validating the function's input arguments. */
    readonly schema: z.ZodTypeAny;
    /** Agent-side handler callback. Use `withHandler` to bind another one. */
    readonly handler: AgentFunctionHandler<any, any>;
    /**
     * Allowed caller contexts for the function: `rendererOnly`, or the
     * `rendererOrAgent` of a declaration bound with `fromApi`.
     */
    readonly allowedCallers: 'rendererOnly' | 'rendererOrAgent';
    /** Whether the function requires explicit user interaction before execution. */
    readonly requiresUserActivation: boolean;
    /** Human-readable description of the function's purpose. */
    readonly description?: string;
    /** Original `FunctionApi` declaration bound via `AgentFunction.fromApi`, if any. */
    readonly declaration?: FunctionApi;
    /** @internal */
    readonly explicitAllowedCallers?: 'rendererOnly' | 'rendererOrAgent';
    /** @internal */
    readonly explicitRequiresUserActivation?: boolean;
    /**
     * @internal The parameter names of a JSON Schema `schema`, as written,
     * which a v1.0 catalog checks against UAX #31 with those of the Zod schema.
     */
    readonly declaredParameterNames?: ReadonlyArray<string>;
    /**
     * @internal The JSON Schema `schema` the function was built with, if any,
     * so `withHandler` and a catalog's `$defs` can read it as written.
     */
    readonly jsonSchema?: Readonly<Record<string, unknown>>;
    /**
     * @internal The catalog `$defs` that `schema` and `declaredParameterNames`
     * were resolved against, when resolved against a catalog's `$defs`.
     */
    readonly boundCatalogDefs?: Readonly<Record<string, unknown>>;
    /**
     * Initializes a new `rendererOnly` agent function.
     *
     * @param init The function's name, handler and signature.
     * @throws {TypeError} If `handler` is not callable.
     */
    constructor(init: AgentFunctionInit<Schema, TReturn>);
    /**
     * Binds an agent-side `handler` to a function a catalog declares (for
     * example, an entry from `Catalog.fromJson(doc).functions`).
     *
     * Keeps the declaration's signature, `allowedCallers` and JSON Schema
     * definition, so `Catalog.toJson()` continues to emit the authored catalog
     * document unchanged, and records `declaration` so
     * `catalog.copyWith({agentFunctions: [...]})` replaces the declaration in
     * place. That catalog must declare `api`.
     *
     * @param api Existing schema-only function declaration.
     * @param handler Agent-side execution callback.
     * @returns A new `AgentFunction` wrapping `api`.
     * @throws {TypeError} If `api` is already an `AgentFunction` or `handler` is not callable.
     * @throws {A2uiCatalogError} If `api` is `agentOnly`, which a renderer
     *   never calls, or requires user activation without being `rendererOnly`.
     */
    static fromApi<TArgs = Record<string, unknown>, TReturn = unknown>(api: FunctionApi, handler: AgentFunctionHandler<TArgs, TReturn>): AgentFunction;
    /**
     * Returns a copy of this agent function bound to a different handler, with
     * the same name, signature, `allowedCallers` and description: for example,
     * to swap in a test double, or a handler for one session. One built with
     * `fromApi` is rebuilt from the same declaration, so it still replaces that
     * declaration in its catalog.
     *
     * @param handler The new agent-side execution callback.
     * @returns A new `AgentFunction`.
     * @throws {TypeError} If `handler` is not callable.
     */
    withHandler<TArgs = Record<string, unknown>, TReturn = unknown>(handler: AgentFunctionHandler<TArgs, TReturn>): AgentFunction;
}
/**
 * @internal Resolves a JSON Schema `AgentFunction` against a catalog's `$defs`
 * without mutating the caller's instance. Returns `fn` unchanged when `fn` was
 * built from a Zod schema, already binds `catalogDefs`, or does not reference
 * any definition in `catalogDefs`.
 */
export declare function bindAgentFunctionDefs(fn: AgentFunction, catalogDefs: Readonly<Record<string, unknown>> | undefined): AgentFunction;
