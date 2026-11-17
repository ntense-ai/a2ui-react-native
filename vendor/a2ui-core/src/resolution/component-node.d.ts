import { EventSource } from '../common/events.js';
import type { A2uiMetadata, ActionDispatchOptions } from '../common/metadata.js';
import type { ComponentApi } from '../catalog/types.js';
import { Signal } from '../reactivity/signals.js';
import type { ComponentContext } from './component-context.js';
/** The component type name used for pending and cyclic placeholder nodes. */
export declare const PLACEHOLDER_TYPE = "Placeholder";
/**
 * Bound action closure produced by the node resolver and binder.
 *
 * Accepts optional per-dispatch options such as outbound action `metadata`.
 */
export type NodeAction = (options?: ActionDispatchOptions) => void | Promise<void>;
/**
 * Resolution state of a component node in the rendered tree.
 *
 * - `resolved`: Real component with a catalog entry; `impl` is set.
 * - `pending`: Component definition has not arrived; upgraded in place when received.
 * - `unknown-type`: Definition arrived but its type has no catalog entry.
 * - `cyclic`: Reference repeats one of the node's own ancestors.
 */
export type NodeState = 'resolved' | 'pending' | 'unknown-type' | 'cyclic';
/** Resolved component node properties, keyed by property name. */
export type NodeProps = Record<string, unknown>;
/**
 * Represents a single resolved component instance in the rendered tree.
 *
 * Node properties hold fully resolved values: `ResolvedBinding` instances for
 * dynamic values, ready-to-call `() => void` closures for actions, and live
 * `ComponentNode` references (or arrays of them) for child properties.
 *
 * Emits when this node's own resolved properties change, including when a child
 * reference is replaced. Does not emit when a child's internal properties change.
 */
export interface ComponentNode<C extends ComponentApi = ComponentApi, TProps extends NodeProps = NodeProps> {
    /**
     * Identifier for this node in the rendered tree, distinct among siblings.
     * The bare component id at the root data scope; for template-spawned items
     * the scoped data path is appended (e.g. `item-card-[/items/0]`); when one
     * parent references the same component at the same scope more than once,
     * each further occurrence gains a `#n` suffix (e.g. `item-card#2`). The
     * characters that carry meaning in this composition (`~`, `#`, `[`, `]`)
     * are escaped in the component id and data path, so ids that mimic a
     * suffixed or scoped form cannot collide with one.
     *
     * Until the spec provides data-derived child keys (a2ui#1745), this id
     * names a list position, not a data item: it is not stable across array
     * insertions or reorders.
     */
    readonly instanceId: string;
    /**
     * Identifies this node instance across the whole document, so it can serve
     * as a DOM id, a rendering key, or an ARIA reference target. Assigned when
     * the node is created; a replaced node (type or catalog change, re-add,
     * sibling reorder) gets a new one. Never persist it.
     */
    readonly id: string;
    /** The component id from the payload. */
    readonly componentId: string;
    /**
     * The catalog component type. `'Placeholder'` for pending and cyclic
     * stand-ins; an unknown-type node keeps its declared type.
     */
    readonly type: string;
    /** The data model scope this node resolves against, e.g. `/items/0`. */
    readonly dataPath: string;
    /** The resolved catalog entry for `type`; undefined while a placeholder. */
    readonly impl: C | undefined;
    /**
     * The context the resolver bound this node with; undefined while a placeholder.
     *
     * @deprecated Read resolved values from props; adapters get the surface from their ambient context. Removed in the next breaking release.
     */
    readonly context: ComponentContext | undefined;
    /** Why this node is or is not resolved. */
    readonly state: NodeState;
    /** Resolved, reactive properties. Read with `getValue`/`peekValue`. */
    readonly props: Signal<TProps>;
    /**
     * Read-only reactive signal reflecting the component's envelope `metadata`.
     * Read with `getValue`/`peekValue`.
     */
    readonly metadata: Signal<A2uiMetadata | undefined>;
    /** Fires exactly once, when this node is disposed. */
    readonly onDestroyed: EventSource<void>;
    /** Whether this node has been disposed. */
    readonly disposed: boolean;
    /**
     * Whether this node is an unresolved stand-in (`state` other than `resolved`).
     *
     * A placeholder holds the child position with empty properties until the
     * component becomes resolvable and is replaced in place.
     */
    readonly isPlaceholder: boolean;
    /**
     * Registers teardown work to run when this node is disposed.
     *
     * @param cleanup Teardown callback.
     */
    addCleanup(cleanup: () => void): void;
    /**
     * Serializes the resolved tree for debugging and headless assertions.
     *
     * Child nodes serialize recursively, bindings as their snapshot values,
     * and action closures as the string `'<Action>'`.
     *
     * @returns Serialized JSON-compatible representation.
     */
    toJSON(): Record<string, unknown>;
}
/**
 * Narrows an unknown value to a `ComponentNode`.
 *
 * @param value The value to inspect.
 * @returns Whether the value is a `ComponentNode`.
 */
export declare function isComponentNode(value: unknown): value is ComponentNode;
/**
 * Mutable implementation of `ComponentNode`.
 *
 * Used internally by the node resolver to construct, update, and dispose nodes.
 */
export declare class MutableComponentNode<TProps extends NodeProps = NodeProps> implements ComponentNode<ComponentApi, TProps> {
    readonly instanceId: string;
    readonly id: string;
    readonly componentId: string;
    readonly type: string;
    readonly dataPath: string;
    readonly impl: ComponentApi | undefined;
    /** @deprecated Read resolved values from props; adapters get the surface from their ambient context. Removed in the next breaking release. */
    readonly context: ComponentContext | undefined;
    readonly state: NodeState;
    readonly props: Signal<TProps>;
    readonly metadata: Signal<A2uiMetadata | undefined>;
    private readonly _onDestroyed;
    readonly onDestroyed: EventSource<void>;
    private cleanups;
    private _disposed;
    /**
     * Creates a new `MutableComponentNode` instance.
     *
     * @param instanceId Unique instance identifier in the tree.
     * @param componentId The component ID from the payload.
     * @param type The component type name.
     * @param dataPath Data model scope path.
     * @param initialProps Initial resolved properties.
     * @param impl Optional catalog component definition.
     * @param context The context the node is bound with; absent on placeholders.
     * @param state Initial resolution state.
     * @param metadata Optional read-only reactive metadata signal.
     */
    constructor(instanceId: string, componentId: string, type: string, dataPath: string, initialProps: TProps, impl?: ComponentApi, context?: ComponentContext, state?: NodeState, metadata?: Signal<A2uiMetadata | undefined>);
    /** Whether this node has been disposed. */
    get disposed(): boolean;
    /** Whether this node is an unresolved placeholder. */
    get isPlaceholder(): boolean;
    /**
     * Registers teardown work to run when this node is disposed.
     *
     * @param cleanup Teardown callback.
     */
    addCleanup(cleanup: () => void): void;
    /**
     * Serializes the resolved tree for debugging and headless assertions.
     *
     * @returns Serialized JSON-compatible representation.
     */
    toJSON(): Record<string, unknown>;
    /**
     * Replaces resolved properties, emitting only when a shallow comparison detects a change.
     *
     * @param next Next property dictionary.
     */
    setProps(next: TProps): void;
    /**
     * Tears down this node by running cleanups and firing destruction events.
     *
     * This operation is idempotent.
     */
    dispose(): void;
}
