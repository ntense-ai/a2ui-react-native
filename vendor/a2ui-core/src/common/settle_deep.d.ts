/**
 * Settling of pending values nested in resolved function arguments.
 *
 * The runtime resolves the arguments of a function call before invoking it.
 * An argument produced by an asynchronous function arrives as a pending
 * Promise, possibly nested in an array or a plain object built from other
 * arguments. `settleDeep` awaits every such Promise before the arguments are
 * validated and the function runs, and returns the input itself, synchronously,
 * when nothing in it is pending, so synchronous expressions stay synchronous.
 */
/**
 * Marker for a function argument whose evaluation has already failed and been
 * reported on the surface. Enclosing function calls must not run or report a
 * duplicate surface error when any argument resolves to a `FailedArgument`.
 */
export declare class FailedArgument {
    readonly error: unknown;
    constructor(error: unknown);
}
/**
 * Finds the first `FailedArgument` nested inside `value`, walking arrays and
 * plain objects recursively.
 *
 * @param value The settled value or argument map to inspect.
 * @returns The first `FailedArgument` encountered, or `undefined` if none is present.
 */
export declare function findFailedArgument(value: unknown): FailedArgument | undefined;
/**
 * Records the settled value of a tracked Promise so subsequent `settleDeep`
 * passes can read it synchronously when a sibling reactive dependency changes.
 *
 * @param promise The Promise that settled.
 * @param value The settled value.
 */
export declare function recordSettledValue(promise: PromiseLike<unknown>, value: unknown): void;
/**
 * Checks whether a value is a Promise-like object.
 *
 * @param value The value to inspect.
 * @returns Whether `value` has a callable `then`.
 */
export declare function isThenable(value: unknown): value is PromiseLike<unknown>;
/**
 * Checks whether a value is a plain object: not an array, `null`, or an
 * instance of a class such as `Date` or a `Signal`.
 *
 * @param value The value to inspect.
 * @returns Whether `value` is a plain object.
 */
export declare function isPlainObject(value: unknown): value is Record<string, unknown>;
/**
 * Recursively awaits the Promises nested in the arrays and plain objects of
 * `value`.
 *
 * Only arrays and plain objects are walked; a `Date`, a `Signal`, or any other
 * class instance is returned as it is. A rejected Promise anywhere in `value`
 * rejects the returned Promise.
 *
 * @param value The value to settle.
 * @returns `value` itself when nothing in it is pending, otherwise a Promise
 *     of `value` with every nested Promise replaced by its settled value.
 */
export declare function settleDeep<T>(value: T): T | Promise<unknown>;
