import { Catalog } from '../catalog/types.js';
import { SurfaceComponentsModel } from './surface-components-model.js';
/**
 * What a check found about a surface's component graph, which had no
 * self-reference and no cycle: the references each component holds, the
 * components that reference each id, and an upper bound on the longest chain
 * of references below each component.
 *
 * The bound lets `MessageProcessor` check an `updateComponents` without
 * walking the whole surface again when its validation config leaves the
 * reference and reachability checks to a later point. A cycle the batch makes
 * passes through one of its components, and only the chains through its
 * components grow, so only those components and the ones above them are
 * revisited.
 *
 * This is the TypeScript form of the bound the Dart `SurfaceComponentsModel`
 * keeps (dart/a2ui_core/lib/src/core/component_graph_bound.dart).
 */
export declare class ComponentGraphBound {
    /** The ids each component references, held or not, in order. */
    private readonly children;
    /** The components that reference each id, held or not. */
    private readonly parents;
    /** For each component, at least the number of references in the longest chain below it. */
    private readonly heights;
    /** At least the largest of `heights`. */
    private maxHeight;
    private constructor();
    /**
     * Builds the bound of a graph.
     *
     * @param graph Each component id with the ids it references, held or not.
     * @returns The bound, or undefined when the graph holds a cycle, which a
     *     graph may hold and still pass a check that starts only at the root.
     */
    static of(graph: ReadonlyMap<string, readonly string[]>): ComponentGraphBound | undefined;
    /** The ids the component `id` references, held or not, in order. */
    childrenOf(id: string): readonly string[];
    /** The components that reference `id`. */
    parentsOf(id: string): ReadonlySet<string>;
    private setChildren;
    /**
     * Updates the bound to the graph with `batch` applied, and tells whether it
     * shows that graph has no self-reference, no cycle and no chain of more
     * than `limit` references.
     *
     * The references and parents are updated whatever the answer, so
     * `childrenOf` and `parentsOf` describe the graph with the batch applied.
     * False means the bound cannot show the graph passes, not that it fails,
     * and leaves the heights unusable.
     *
     * @param batch Each component of the batch with the ids it references.
     * @param limit The longest chain allowed.
     * @param held Whether the graph holds an id before the batch.
     */
    admits(batch: ReadonlyMap<string, readonly string[]>, limit: number, held: (id: string) => boolean): boolean;
}
/**
 * Follows the components of a `SurfaceComponentsModel`, whoever changes them:
 * it counts the changes (a component added or removed, or a component's
 * properties replaced) and collects the catalogs of the components added.
 *
 * A `ComponentGraphBound` describes the components as they were when it was
 * recorded, and holds only while the count is the same.
 */
export declare class ComponentsWatcher {
    private count;
    private readonly seenCatalogs;
    private constructor();
    /** The watcher of `model`, which starts following it on first use. */
    static of(model: SurfaceComponentsModel): ComponentsWatcher;
    /** How many changes have been counted. */
    get changes(): number;
    /**
     * The catalogs of every component the model has held since the watcher
     * started, including components since removed.
     */
    get catalogs(): ReadonlySet<Catalog<any, any>>;
    private watch;
}
