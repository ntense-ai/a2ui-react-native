import { Subscription as BaseSubscription } from '../common/events.js';
import { Signal } from '../reactivity/signals.js';
/**
 * Reactive subscription to a specific path in the data model.
 */
export interface DataSubscription<T> extends BaseSubscription {
    /** Current value at the subscribed path. */
    readonly value: T | undefined;
}
/**
 * The maximum array index that auto-vivification and array mutations will expand to.
 * Prevents OOM and thread hangs from excessively large indices.
 */
export declare const MAX_ARRAY_INDEX = 10000;
/**
 * Observable data store representing the renderer-side state.
 *
 * Handles JSON Pointer path resolution, mutation, and reactive subscriptions.
 */
export declare class DataModel {
    private data;
    private readonly signals;
    private readonly subscriptions;
    /**
     * Initializes a new `DataModel` instance.
     *
     * @param initialData Initial data for the model. Defaults to an empty object.
     */
    constructor(initialData?: Record<string, unknown>);
    /**
     * Retrieves a Preact Signal for a specific data path.
     *
     * This provides a reactive way to access a value. If the value at the path
     * changes via `set()`, the signal will automatically be updated.
     *
     * @param path The JSON pointer path to create or retrieve a signal for.
     * @returns A Preact Signal representing the value at the specified path.
     * @throws {A2uiDataError} If path is null, undefined, or contains forbidden
     *     segments (`__proto__`, `constructor`, `prototype`).
     */
    getSignal<T>(path: string): Signal<T | undefined>;
    /**
     * Updates the model at the specific path and notifies all relevant signals.
     * If path is '/' or empty, replaces the entire root.
     *
     * Note on `undefined` values:
     * - For objects: Setting a property to `undefined` removes the key from the
     * object.
     * - For arrays: Setting an index to `undefined` sets that index to
     * `undefined` but preserves the array length (sparse array).
     *
     * @param path The JSON pointer path to set value for.
     * @param value The value to set at the specified path.
     * @param preserveNull Whether to store `null` as a value instead of treating
     *     it like `undefined`. Pre-1.0 data models stored `null`; the v1.0
     *     protocol removes the entry.
     * @returns This `DataModel` instance for chaining.
     * @throws {A2uiDataError} If path is null, undefined, invalid for
     *     arrays/primitives, exceeds max array bounds, or contains forbidden
     *     segments (`__proto__`, `constructor`, `prototype`).
     */
    set(path: string, value: any, preserveNull?: boolean): this;
    /**
     * Deletes the value at the specified JSON pointer path.
     *
     * If `path` is `'/'` or empty, resets the root data model to an empty object.
     *
     * @param path The JSON pointer path to remove.
     * @returns This `DataModel` instance for chaining.
     */
    delete(path: string): this;
    /**
     * Resolves a relative path against a base context path.
     *
     * @param path The path to resolve.
     * @param contextPath The base path (optional).
     * @returns The resolved absolute path.
     */
    static resolvePath(path: string, contextPath?: string): string;
    /**
     * Retrieves data at a specific JSON pointer path.
     *
     * @template T The expected type of the returned value. Defaults to `any`.
     * @param path The JSON pointer path to read from.
     * @returns The value at the specified path, or undefined if not found.
     * @throws {A2uiDataError} If path is null, undefined, or contains forbidden
     *     segments (`__proto__`, `constructor`, `prototype`).
     */
    get<T = any>(path: string): T;
    /**
     * Checks whether a JSON pointer path physically exists in the data model.
     *
     * Differentiates between a path holding an explicit `null` value (`true`) and
     * a path that is absent from the object or array hierarchy (`false`).
     *
     * @param path Absolute JSON pointer path to check.
     * @returns Whether every segment along `path` exists in the hierarchy.
     */
    hasPath(path: string): boolean;
    /**
     * Subscribes to changes at the specified data path.
     *
     * This is a backwards-compatible layer using Preact Signals internally. It
     * allows listeners to be notified whenever the value at the specified path
     * (or any of its ancestors/descendants) changes.
     *
     * @param path The JSON pointer path to observe.
     * @param onChange A callback fired whenever the value changes.
     * @returns A `DataSubscription` containing the initial value and an
     *     `unsubscribe` method.
     * @throws {A2uiDataError} If path is null, undefined, or contains forbidden
     *     segments (`__proto__`, `constructor`, `prototype`).
     */
    subscribe<T>(path: string, onChange: (value: T | undefined) => void): DataSubscription<T>;
    /**
     * Clears all internal subscriptions and active signals.
     */
    dispose(): void;
    private normalizePath;
    private parsePath;
    private notifySignals;
    private updateSignal;
    private notifyAllSignals;
    private isDescendant;
}
