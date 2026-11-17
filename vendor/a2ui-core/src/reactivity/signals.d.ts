/**
 * Generic reactive signal holding a value of type `T`.
 *
 * @template T Type of value managed by the signal.
 */
export interface Signal<T = unknown> {
    __signalBrand?: T;
    unsubscribe?: () => void;
}
/**
 * Pluggable backend adapter providing primitive reactive signal operations.
 */
export interface SignalImplementations {
    signal: <T>(initialValue: T) => Signal<T>;
    computed: <T>(computeFn: () => T) => Signal<T>;
    effect: (effectFn: () => void | (() => void)) => () => void;
    batchWrite: (batchFn: () => void) => void;
    isSignal: (val: unknown) => val is Signal<unknown>;
    getValue: <T>(signal: Signal<T>) => T;
    setValue: <T>(signal: Signal<T>, value: T) => void;
    peekValue: <T>(signal: Signal<T>) => T;
}
/** Default signal implementations. Exported only for testing purposes. */
export declare const _PRIVATE_DEFAULT_SIGNAL_IMPLEMENTATION: SignalImplementations;
/**
 * Configures the active reactive signals implementation backend.
 *
 * Enables swapping the underlying reactivity library at runtime.
 *
 * @param impl Pluggable signal implementation operations.
 */
export declare function setSignalImplementation(impl: SignalImplementations): void;
/**
 * Creates a reactive state signal initialized to the specified value.
 *
 * @param initialValue Initial value of the signal.
 * @returns A reactive state signal.
 */
export declare function signal<T>(initialValue: T): Signal<T>;
/**
 * Creates a derived reactive signal that recomputes when dependencies change.
 *
 * @param computeFn Calculation callback producing the derived value.
 * @returns A reactive read-only computed signal.
 */
export declare function computed<T>(computeFn: () => T): Signal<T>;
/**
 * Runs a side-effect callback reactively when accessed signals change.
 *
 * @param effectFn Callback to execute, optionally returning a cleanup function.
 * @returns A disposal function that cancels the effect subscription.
 */
export declare function effect(effectFn: () => void | (() => void)): () => void;
/**
 * Batches multiple signal updates to defer subscriber notifications until complete.
 *
 * @param batchFn Callback enclosing signal mutations.
 */
export declare function batchWrite(batchFn: () => void): void;
/**
 * Checks whether a given value is a reactive Signal.
 *
 * @param val Value to test.
 * @returns Whether the value is a Signal.
 */
export declare function isSignal(val: unknown): val is Signal<unknown>;
/**
 * Reads the current value of a signal, subscribing the active reactive context.
 *
 * @param signal Target signal to read.
 * @returns The current value of the signal.
 */
export declare function getValue<T>(signal: Signal<T>): T;
/**
 * Updates the current value of a writable signal, notifying subscribers.
 *
 * @param signal Target signal to update.
 * @param value New value to assign.
 */
export declare function setValue<T>(signal: Signal<T>, value: T): void;
/**
 * Reads the current value of a signal without creating a reactive subscription.
 *
 * @param signal Target signal to read.
 * @returns The current value of the signal.
 */
export declare function peekValue<T>(signal: Signal<T>): T;
