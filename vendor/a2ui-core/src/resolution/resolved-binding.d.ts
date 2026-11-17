/**
 * Resolved dynamic value snapshot in a node's properties.
 *
 * Captures the current value pinned at the time of emission. A new binding instance
 * is emitted through the node's properties whenever the underlying value changes.
 *
 * Literal and function-call values resolve to a read-only `ResolvedBinding`, preventing
 * accidental writes without explicitly narrowing to {@link WritableBinding}.
 */
export declare class ResolvedBinding<T> {
    readonly value: T;
    /**
     * Creates a new `ResolvedBinding` instance.
     *
     * @param value The resolved snapshot value.
     */
    constructor(value: T);
}
/**
 * Writable resolved dynamic binding backed by a mutable data model path.
 */
export declare class WritableBinding<T> extends ResolvedBinding<T> {
    readonly set: (value: T) => void;
    /** Authored data path before scope resolution. */
    readonly path: string;
    /**
     * Creates a new `WritableBinding` instance.
     *
     * @param value Current snapshot value.
     * @param set Setter callback to update the underlying model.
     * @param path Authored data path.
     */
    constructor(value: T, set: (value: T) => void,
    /** Authored data path before scope resolution. */
    path: string);
}
/**
 * Narrows a `ResolvedBinding` to a `WritableBinding`.
 *
 * @param binding The binding to check.
 * @returns Whether the binding is writable.
 */
export declare function isWritable<T>(binding: ResolvedBinding<T>): binding is WritableBinding<T>;
/**
 * Compares two bindings for equivalence during change detection.
 *
 * Returns true if both bindings have identical writability, write destination path,
 * and structurally equal snapshot values.
 *
 * @param a First binding.
 * @param b Second binding.
 * @returns Whether the two bindings are equivalent.
 */
export declare function sameBinding(a: ResolvedBinding<unknown>, b: ResolvedBinding<unknown>): boolean;
