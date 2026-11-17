import { Signal } from '../reactivity/signals.js';
import { z } from 'zod';
import { DataModel, DataSubscription } from '../state/data-model.js';
import { type Action } from '../types/common-types.js';
import { FunctionInvoker } from '../catalog/function_invoker.js';
import { CatalogInterface } from '../catalog/types.js';
import { SurfaceModel } from '../state/surface-model.js';
/**
 * Extracts declared property keys from a Zod schema representing an object with fixed keys.
 *
 * Traverses Zod wrappers (`ZodEffects`, `ZodOptional`, `ZodNullable`, `ZodDefault`,
 * `ZodCatch`, `ZodIntersection`, `ZodUnion`, `ZodDiscriminatedUnion`) and returns the set
 * of allowed key names.
 *
 * @param schema Zod schema to inspect.
 * @returns Set of allowed property names, or `null` if arbitrary keys are permitted or undetermined.
 */
export declare function getKnownSchemaKeys(schema: z.ZodTypeAny): Set<string> | null;
/**
 * Validates a function call's arguments against the catalog function schema and global limits.
 *
 * Functions have a strict contract: supplying unknown or excessive arguments breaks that contract
 * and causes an A2uiExpressionError rather than silently stripping them. Validating arguments before
 * creating reactive nodes also prevents uncontrolled resource consumption.
 *
 * @param functionName Name of the function being validated.
 * @param rawArgs Raw argument map to validate against the function schema.
 * @param catalog Optional catalog providing the function's schema.
 * @throws {A2uiExpressionError} If argument count exceeds `MAX_FUNCTION_CALL_ARGS`, unknown arguments are supplied, or arguments exceed expected count.
 */
export declare function validateFunctionArgs(functionName: string, rawArgs: Record<string, any> | undefined | null, catalog?: CatalogInterface<any, any> | any): void;
/**
 * Checks whether a key begins with a single '@' character and is not escaped by prefix doubling.
 *
 * Matches property names conforming to `^@([^@]|$)`.
 *
 * @param key Object property key to test.
 * @returns True if the key starts with a single unescaped '@'.
 */
export declare function isSingleAtKey(key: string): boolean;
/**
 * Unescapes a property key if it begins with doubled '@@' prefix.
 *
 * In A2UI v1.0, literal keys starting with '@' are escaped by prefix doubling ('@@path' -> '@path').
 *
 * @param key Object property key to unescape.
 * @returns The unescaped key without the leading '@' if it started with '@@', otherwise the key unchanged.
 */
export declare function unescapeObjectKey(key: string): string;
/**
 * Validates that any single-'@' prefixed keys in an object are recognized protocol directives.
 *
 * In A2UI v1.0, any key matching `^@([^@]|$)` that is not a recognized protocol directive is invalid.
 *
 * @param keys The keys of the object to validate.
 * @param protocolVersion The protocol specification version.
 * @throws {A2uiValidationError} If an unrecognized single-'@' key is found in v1.0.
 */
export declare function validateReservedDirectives(keys: Iterable<string>, protocolVersion?: string): void;
/**
 * Resolves the 0-based iteration index from a context or its ancestor chain.
 *
 * Checks for an explicit index first, then checks whether the trailing
 * segment of the data path is numeric, walking the parent context chain until a
 * match is found.
 *
 * @param startCtx Initial context or context-like object to inspect.
 * @returns The resolved 0-based iteration index, or `undefined` if outside an iteration scope.
 */
export declare function resolveContextIndex(startCtx: unknown): number | undefined;
/**
 * The maximum allowed recursion depth for evaluating nested dynamic values or function calls.
 * Prevents call stack exhaustion on deeply nested expression payloads.
 */
export declare const MAX_DYNAMIC_VALUE_DEPTH = 1000;
/**
 * Scoped view of the main DataModel for resolving DynamicValues within a component hierarchy.
 *
 * Automatically resolves relative paths against the component's current scope
 * and provides tools for evaluating complex, reactive expressions.
 */
export declare class DataContext {
    readonly path: string;
    /** Shared DataModel instance for the UI surface. */
    readonly dataModel: DataModel;
    /** Callback for executing function calls defined in the A2UI component tree. */
    readonly functionInvoker: FunctionInvoker;
    /** Parent DataContext in the hierarchy, if this context was created via `.nested()`. */
    readonly parent?: DataContext;
    /** Explicit collection iteration index supplied to this context, if any. */
    readonly explicitIndex?: number;
    private readonly warnedPaths;
    private _isUserActivated;
    private _isPassiveEvaluation;
    private _isActionExecution;
    /** Whether calls the renderer does not implement must fail instead of going to the agent. */
    private _noAgentRouting;
    /** Catalog ID of the currently executing catalog function, if any. */
    private _activeCatalogId?;
    /** Catalog instance of the currently executing catalog function, if any. */
    private _activeCatalog?;
    readonly surface?: SurfaceModel<any, any>;
    /**
     * Initializes a new DataContext instance.
     *
     * @param surface The surface model or data model this context belongs to.
     * @param path The absolute path in the DataModel that this context is scoped to.
     * @param index Optional explicit collection iteration index.
     * @param parent Optional parent DataContext in the scope chain.
     */
    constructor(surface: SurfaceModel<any, any> | DataModel, path: string, index?: number, parent?: DataContext);
    /** Whether the current function evaluation was initiated by an active user action. */
    get isUserActivated(): boolean;
    /** Whether the current function evaluation is running inside a passive reactive binding. */
    get isPassiveEvaluation(): boolean;
    /** Whether the current function evaluation was initiated by an imperative action. */
    get isActionExecution(): boolean;
    /**
     * Returns the 0-based iteration index if this context (or an ancestor context)
     * is scoped to a collection template item, or `undefined` when outside any
     * collection template scope.
     *
     * Mirrors `DataContext.index` in Python: checks an explicit `explicitIndex` first,
     * then checks strictly the trailing segment of `ctx.path`, walking `ctx.parent`.
     *
     * @returns The 0-based iteration index, or `undefined` if outside an iteration scope.
     */
    getIndex(): number | undefined;
    /** Active iteration index if inside a collection template scope, or `undefined`. */
    get index(): number | undefined;
    /**
     * Mutates the underlying DataModel at the specified path.
     *
     * @param path JSON pointer path, resolved relative to this context's `path` if not absolute.
     * @param value New value to store in the DataModel.
     */
    set(path: string, value: unknown): void;
    /**
     * Protocol version of the bound surface.
     *
     * Reads the surface's own version, which is set even when the surface has
     * no default catalog, and falls back to the default or active catalog's
     * version for surface-like or surface-less contexts.
     */
    private get surfaceProtocolVersion();
    private _cachedAtLeastV10?;
    /** Whether this context targets A2UI protocol v1.0 or newer. */
    get atLeastV10(): boolean;
    /**
     * Checks whether an object represents a data binding.
     *
     * In v1.0, data bindings must use `@path`. In v0.9, data bindings use `path`.
     *
     * @param val Candidate object to inspect.
     * @returns Whether the object represents a valid data binding for this context's protocol version.
     */
    private isDataBindingObject;
    /**
     * Checks whether an object represents a function call.
     *
     * In v1.0, function calls must use `@call`. In v0.9, function calls use `call`.
     *
     * @param val Candidate object to inspect.
     * @returns Whether the object represents a valid function call for this context's protocol version.
     */
    private isFunctionCallObject;
    /**
     * Checks whether a value contains any dynamic parts (path bindings,
     * function calls, or escaped/reserved directive keys) at any nesting depth.
     *
     * @param value The value or data structure to inspect.
     * @returns Whether the value contains dynamic elements requiring resolution.
     */
    private containsDynamicValue;
    /**
     * Emits a warning if a data binding path does not exist in the data model.
     *
     * @param absolutePath Absolute JSON pointer path to check.
     */
    private emitMissingDataBindingWarning;
    /**
     * Synchronously evaluates a DynamicValue into its concrete runtime value.
     *
     * Evaluates the value once at the current moment without creating reactive subscriptions.
     * Use `subscribeDynamicValue` for reactive updates.
     *
     * The result of an asynchronous function, such as a call routed to the
     * agent, is a Promise that resolves to the value, or to `undefined` once
     * the failure has been reported on the surface.
     * @param value The DynamicValue object or raw value from the A2UI JSON payload.
     * @param depth The current recursion depth when evaluating nested arguments or expressions.
     * @param userActivated Whether the evaluation was initiated by an active user action.
     * @returns The synchronously resolved value.
     */
    resolveDynamicValue<V>(value: unknown, depth?: number, userActivated?: boolean): V;
    /**
     * Evaluates a DynamicValue once, as {@link resolveDynamicValue} does.
     *
     * Inside the arguments of a function call (`keepPending`), a pending result
     * stays a Promise, which the invoker of the enclosing call awaits before
     * validating its arguments, and, from v1.0, a call that fails resolves to a
     * `FailedArgument` that stops the enclosing call.
     *
     * @param value The DynamicValue object or raw value.
     * @param depth The current recursion depth.
     * @param userActivated Whether the evaluation was initiated by an active user action.
     * @param keepPending Whether the value is (part of) a function argument.
     * @param parentSignal Abort signal of the enclosing call. Calls nested in
     *   `value` are aborted with it.
     * @returns The resolved value.
     */
    private resolveValue;
    /**
     * Resolves a function call by validating arguments and invoking the function.
     *
     * An asynchronous function returns a pending Promise. Outside function
     * arguments (`!keepPending`), the Promise is returned with its rejection
     * turned into an `EXPRESSION_ERROR` on the surface, since nothing else would
     * report it; inside the arguments of another call (`keepPending`) it is
     * wrapped so the inner call reports its own rejection once and resolves to a
     * `FailedArgument` that stops the enclosing call from executing.
     *
     * When an argument fails, the call is aborted, and with it the calls in its
     * other arguments: one that has not sent its agent call yet does not send
     * it, and one that fails later reports nothing.
     *
     * @param call Function call definition to execute.
     * @param depth Current recursion depth for nested expression tracking.
     * @param userActivated Whether the evaluation was initiated by an active user action.
     * @param keepPending Whether the call is nested inside a function argument.
     * @param parentSignal Abort signal of the enclosing call, if any.
     * @returns The resolved function return value.
     */
    private resolveFunctionCallValue;
    /**
     * Recursively resolves dynamic values nested inside a plain object.
     *
     * @param rec Plain object dictionary to resolve.
     * @param depth Current recursion depth for nested expression tracking.
     * @param userActivated Whether the evaluation was initiated by an active user action.
     * @param keepPending Whether the object is nested inside a function argument.
     * @param parentSignal Abort signal of the enclosing call, if any.
     * @returns A copy of the object with all nested dynamic values resolved.
     */
    private resolvePlainObjectValue;
    /**
     * Reactively listens to changes in a DynamicValue.
     *
     * Whenever the underlying data or function dependencies change, the `onChange`
     * callback fires with the freshly evaluated result.
     *
     * @template V Expected type of the resolved value.
     * @param value The DynamicValue or raw value to evaluate and observe.
     * @param onChange Callback fired whenever the evaluated result changes.
     * @returns A subscription containing the current value and an `unsubscribe` method.
     */
    subscribeDynamicValue<V>(value: unknown, onChange: (value: V | undefined) => void): DataSubscription<V>;
    /**
     * Resolves a DynamicValue into a reactive Signal.
     *
     * Recursively resolves any nested path bindings or function calls into a
     * single reactive `Signal`. Changes to underlying data or function dependencies
     * cause the signal's value to update.
     *
     * @template V Expected type of the signal value.
     * @param value The DynamicValue or raw value to evaluate and observe.
     * @param depth The current recursion depth when evaluating nested arguments or expressions.
     * @returns A reactive Signal containing the result of the evaluation.
     */
    resolveSignal<V>(value: unknown, depth?: number): Signal<V>;
    /**
     * Resolves a DynamicValue into a reactive Signal, as {@link resolveSignal}.
     *
     * Inside the arguments of a function call (`keepPending`), the pending
     * result of an asynchronous function stays in its signal as a Promise, so
     * the invoker of the enclosing call waits for it before validating and
     * running, as it does when the value is resolved once. Elsewhere the
     * signal holds `undefined` until the result settles.
     *
     * @param value The DynamicValue or raw value to evaluate and observe.
     * @param depth The current recursion depth.
     * @param keepPending Whether the value is (part of) a function argument.
     * @returns A reactive Signal containing the result of the evaluation.
     */
    private resolveSignalValue;
    private handleInvalidAction;
    /**
     * Resolves the `context` entries and `userMessage` of an event action.
     *
     * The entries are resolved in declared order, then `userMessage`, one at a
     * time: an entry that waits on an asynchronous call, such as an agent
     * function call, settles before the next entry is evaluated. The first entry
     * that fails stops the resolution, so no later entry is evaluated and no
     * later agent call is sent.
     *
     * @param ev The event to resolve.
     * @param options `userActivation` as passed to {@link resolveAction}.
     * @returns The resolved event, a Promise of it when an entry waits on an
     *   asynchronous call, or `undefined` (or a Promise of it) when the event is
     *   invalid or an entry failed. Every failure has been reported by then.
     */
    private resolveActionEventObject;
    private executeActionFunctionCall;
    /**
     * Resolves an action by evaluating its top-level dynamic values.
     *
     * For event actions, resolves each value in the context map, then
     * `userMessage`, in order and one at a time (see the protocol's event
     * actions). For function call actions, evaluates the function call.
     *
     * A `userMessage` that resolves to `null` or `undefined` is left out of the
     * resolved event; one that resolves to any other non-string is reported as
     * an `INVALID_ACTION`, and the action resolves to `undefined`.
     *
     * `options.userActivation` applies to both kinds: a function that requires
     * user activation runs, or is sent to the agent, only when the action is
     * user-activated (the default), and is refused when it is `false`.
     *
     * @param action The Action object to resolve.
     * @param options Whether the action was initiated by an active user gesture.
     * @returns For an event action, the action with its context and
     *   `userMessage` resolved, or a Promise of it when an entry waits on an
     *   asynchronous call such as an agent function call. `undefined`, or a
     *   Promise of `undefined`, when the action is invalid or an entry failed;
     *   the failure has then been reported and the action must not be
     *   dispatched. For a function call action, the function's result.
     */
    resolveAction(action: Action | Record<string, unknown>, options?: {
        userActivation?: boolean;
    }): Action | unknown;
    /**
     * Resolves the catalog against which a function call executes.
     *
     * From v1.0, reserved `@`-prefixed system functions such as `@index` belong
     * to no catalog, so they resolve to the built-in system function set
     * whatever the surface's catalogs are. Before v1.0 a call cannot select a
     * catalog, so a `catalogId` on it is ignored and the call runs in the
     * surface catalog.
     *
     * @param name Name of the function being called.
     * @param catalogId Identifier of the catalog named by the call, if specified.
     * @param namesCatalog Whether the call carries a `catalogId` key, whatever
     *   its value.
     * @returns The resolved Catalog instance, or the surface default catalog if omitted.
     * @throws {A2uiExpressionError} If, from v1.0, a call to a reserved `@`
     *   system function names a catalog: such a function belongs to no catalog,
     *   so the call is a malformed expression.
     * @throws {A2uiCatalogError} If the call names a catalog ID that cannot be
     *   resolved on this surface, or names none on a surface without a default
     *   catalog. This is reported as a catalog fault rather than a missing
     *   function, since the function may exist in a catalog that is not
     *   available here.
     */
    private resolveFunctionCatalog;
    /**
     * Resolves the catalog a function call runs in, dispatching a
     * `CATALOG_ERROR` to the surface when it cannot be resolved, and an
     * `EXPRESSION_ERROR` for any other failure, such as a system function call
     * that names a catalog.
     *
     * @param name Name of the function being called.
     * @param call The function call, whose `catalogId` selects the catalog.
     * @returns The resolved Catalog instance, or `undefined` if resolution failed.
     */
    private resolveCallCatalog;
    /**
     * Returns a view of this context with evaluation flags added.
     *
     * The view shares everything else with this context. A call evaluated
     * through it keeps the flags for as long as it runs, including the parts
     * that run after its pending arguments settle, instead of reading flags
     * that were reset when the synchronous part returned.
     *
     * @param flags The flags to add to those of this context.
     * @returns The view.
     */
    private withFlags;
    /**
     * The catalog ID of the catalog function currently executing in this context
     * or an ancestor context, if any.
     */
    private get activeCatalogId();
    /**
     * The active `Catalog` instance attached to the nearest active catalog scope,
     * stopping at the closest context that defines `_activeCatalogId`.
     */
    private get activeCatalog();
    /**
     * Looks up a scoped active `Catalog` instance matching `catalogId` on the
     * nearest active catalog scope.
     */
    private lookupActiveCatalog;
    /**
     * Whether a call the renderer does not implement may be sent to the agent.
     * It may not in an evaluation that cannot wait for the answer, such as the
     * arguments of an agent's `callRendererFunction`.
     */
    private get allowsAgentRouting();
    /**
     * The value of a failed call inside the arguments of another call.
     *
     * From v1.0 it is a `FailedArgument`, which stops the enclosing call. Before
     * v1.0 it is `undefined`, as it always was.
     *
     * @param error The failure.
     * @returns The value standing for the failed call.
     */
    private failedArgument;
    /**
     * Evaluates a catalog function and returns its reactive Signal or static value.
     *
     * Invokes the function with this context through the invoker of the
     * catalog the call resolved to, and dispatches an `EXPRESSION_ERROR` if
     * execution throws.
     *
     * @template V Expected return type of the function evaluation.
     * @param name Name of the function to evaluate.
     * @param args Resolved arguments to pass to the function.
     * @param invoker Invoker of the catalog the call resolved to.
     * @param abortSignal Optional abort signal to cancel asynchronous execution.
     * @param keepPending Whether the call is nested inside a function argument.
     * @returns The evaluated result as a reactive `Signal` or static value, or `undefined` on failure.
     */
    private evaluateFunctionReactive;
    /**
     * Wraps a pending function result nested inside a function argument.
     *
     * The inner call reports its own rejection once (attributed to `name`) and
     * resolves to a `FailedArgument` (`undefined` before v1.0), which stops the
     * enclosing call from executing or reporting a duplicate error. Settled
     * values are recorded so `settleDeep` can read them synchronously if a
     * sibling reactive dependency changes later.
     *
     * @param pending The pending result.
     * @param name Name of the function that produced `pending`.
     * @param abortSignal Signal that marks the evaluation as stale.
     * @param handlers `onSignal` receives a `Signal` the result settles to, so
     *   a binding can follow its later values; `onFailure` runs when the result
     *   rejects. Neither runs once `abortSignal` has fired.
     * @returns A Promise resolving to the settled value or a `FailedArgument`.
     */
    private keepPendingResult;
    /**
     * Writes the settled value of a pending function result into a signal.
     *
     * The signal keeps its current value while the result is pending. A
     * completion that arrives after `abortSignal` fired is ignored, since the
     * arguments changed or the subscription ended in the meantime. A result
     * that settles to a `Signal` is followed until `abortSignal` fires. A
     * rejection is dispatched as an `EXPRESSION_ERROR` and resets the signal,
     * as a synchronous failure of the same call would.
     *
     * @param sig The signal that exposes the result.
     * @param pending The pending result.
     * @param name Name of the function being evaluated.
     * @param abortSignal Signal that marks the evaluation as stale.
     * @param onFailure Runs when the result rejects, before subscribers see it.
     */
    private settleIntoSignal;
    /**
     * Copies the values of `source` into `target` until `abortSignal` fires.
     *
     * @param target The signal that exposes the result.
     * @param source The signal a function returned.
     * @param abortSignal Signal that ends the forwarding.
     */
    private forwardSignal;
    /**
     * Dispatches an evaluation failure to the surface as an `EXPRESSION_ERROR`.
     *
     * Every failure other than an unresolvable catalog uses this code, including
     * a function missing from the catalog the call resolved to and an unknown
     * system function. Unresolvable catalogs are reported by
     * {@link resolveCallCatalog} as `CATALOG_ERROR`. A cancelled agent call
     * (an `A2uiRpcError` with code `CANCELLED`, as when its surface is deleted)
     * is not reported.
     *
     * @param e The error thrown while evaluating the call.
     * @param name Name of the function being evaluated.
     */
    private dispatchExpressionError;
    /**
     * Creates a child DataContext scoped to a deeper relative path.
     *
     * @param relativePath The path relative to the current context's path.
     * @param index Optional explicit iteration index for this nested scope.
     * @returns A new DataContext instance pointing to the resolved absolute path.
     */
    nested(relativePath: string, index?: number): DataContext;
    resolvePath(path: string): string;
}
