import { Catalog, ComponentApi, FunctionImplementation } from '../catalog/types.js';
import { Signal } from '../reactivity/signals.js';
import { SurfaceModel } from '../state/surface-model.js';
import { ComponentNode } from './component-node.js';
/**
 * Resolves a surface model's flat component dictionary into a reactive tree of `ComponentNode`s.
 *
 * Child references become `ComponentNode` objects, template `ChildList`s spawn one node per array item,
 * not-yet-arrived components appear as placeholder nodes and are upgraded in place, and every node's
 * binder and data subscriptions are torn down when its parent stops referencing it or the resolver is disposed.
 *
 * Construction requires a catalog whose functions are executable (`F extends FunctionImplementation`).
 */
export declare class NodeResolver<C extends ComponentApi = ComponentApi, F extends FunctionImplementation = FunctionImplementation> {
    /** The resolved root of the tree, or undefined until the root component arrives. */
    readonly rootNode: Signal<ComponentNode<C> | undefined>;
    private readonly surface;
    private readonly rootId;
    private readonly records;
    private readonly nodesByEdge;
    private readonly nodesByComponentId;
    /** Parents holding a placeholder for a component id, awaiting its arrival. */
    private readonly pendingParents;
    /** Errors already dispatched, keyed by component id, then data path. */
    private readonly dispatchedErrors;
    private readonly modelSubs;
    private rootRecord?;
    private _disposed;
    /**
     * Creates a new `NodeResolver` instance.
     *
     * Each component resolves against the catalog its model was bound to, so a
     * surface without a default catalog (allowed from v1.0) renders as long as
     * its components name their catalogs.
     *
     * @param surface Surface model to observe.
     * @param catalog The surface's default catalog. Defaults to
     *   `surface.defaultCatalog`, which may be `undefined`.
     * @throws {A2uiStateError} If the catalog instance differs from the surface's catalog.
     */
    constructor(surface: SurfaceModel<C, F>, catalog?: Catalog<C, F> | undefined);
    /**
     * Dispatches once per (code, component, path) for as long as the condition
     * persists: the record is cleared when the component is deleted, when a
     * node for the pair resolves, or when a cyclic stand-in's edge goes away,
     * so a condition that is fixed and later reintroduced reports again.
     */
    private dispatchOnce;
    private clearDispatched;
    /** Total count of live nodes in the tree, including placeholders. */
    get activeNodeCount(): number;
    /** Whether this resolver has been disposed. */
    get disposed(): boolean;
    /**
     * Tears down the entire node tree and disconnects model event listeners.
     *
     * This operation is idempotent.
     */
    dispose(): void;
    /** No-op while a root record exists; root deletion clears it so a re-sent root rebuilds. */
    private buildRoot;
    private onComponentCreated;
    private onComponentDeleted;
    /**
     * Creates a node for one (componentId, dataPath) edge. A missing component
     * definition yields a placeholder node and registers the parent for a
     * refresh when the definition arrives.
     */
    private createNode;
    /**
     * Returns the catalog a component model resolves against: the catalog it
     * was bound to, never the surface's default catalog directly.
     *
     * @param model Component model to resolve.
     * @returns The component model's catalog.
     */
    private catalogFor;
    private registerNode;
    /**
     * Returns the node for a child edge, reusing the cached node when the edge
     * is unchanged and replacing it (placeholder upgrade or downgrade, id
     * change, type change) when it is not.
     */
    private childNode;
    /** Registers a parent to be refreshed when `componentId` arrives. */
    private registerPendingParent;
    /** True when (componentId, dataPath) already appears in the parent chain. */
    private isCyclic;
    /**
     * Rebuilds a node's resolved props from its binder output: child reference
     * properties become live `ComponentNode`s, children this parent no longer
     * references are disposed, and unchanged values keep reference identity so
     * the shallow comparison in `MutableComponentNode.setProps` stays exact.
     */
    private materialize;
    /** Disposes a node and, through parent-scoped ownership, its subtree. */
    private disposeNode;
}
