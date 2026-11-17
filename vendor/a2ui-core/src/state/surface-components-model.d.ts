import { ComponentModel } from './component-model.js';
import { EventSource } from '../common/events.js';
import { A2uiValidationError } from '../errors.js';
import { Catalog } from '../catalog/types.js';
import { ComponentRefMap, ValidationConfig } from '../validation/integrity-checker.js';
/**
 * Collection model of components on a surface supporting topology validation and cycle detection.
 */
export declare class SurfaceComponentsModel {
    private components;
    private refMap?;
    private readonly _onCreated;
    private readonly _onDeleted;
    /** Event source firing when a new component is added to the model. */
    readonly onCreated: EventSource<ComponentModel>;
    /** Event source firing when a component is removed from the model. */
    readonly onDeleted: EventSource<string>;
    /**
     * Initializes a new `SurfaceComponentsModel` instance.
     *
     * @param catalogOrRefMap Optional Catalog or precomputed ComponentRefMap used for schema-driven child reference extraction.
     */
    constructor(catalogOrRefMap?: Catalog<any, any> | ComponentRefMap);
    /**
     * Associates a catalog or reference map with this model for schema-driven child detection.
     *
     * @param catalogOrRefMap Catalog instance or ComponentRefMap.
     */
    setCatalog(catalogOrRefMap: Catalog<any, any> | ComponentRefMap): void;
    /**
     * Retrieves a component by its ID.
     *
     * @param id The ID of the component to retrieve.
     * @returns The component model, or undefined if not found.
     */
    get(id: string): ComponentModel | undefined;
    /**
     * Returns a copy of the internal component map.
     *
     * @returns Map of component models keyed by component ID.
     */
    getAll(): Map<string, ComponentModel>;
    /**
     * Checks whether a component with the specified ID exists in the model.
     *
     * @param id Component identifier to check.
     * @returns Whether the component exists in the model.
     */
    has(id: string): boolean;
    /**
     * Returns an iterator over the component ID and model entries.
     */
    get entries(): IterableIterator<[string, ComponentModel]>;
    /**
     * Returns an iterator over all component IDs in the model.
     */
    get keys(): IterableIterator<string>;
    /**
     * Returns an iterator over all component models in the model.
     */
    get values(): IterableIterator<ComponentModel>;
    /**
     * Total number of components in the model.
     */
    get size(): number;
    /**
     * Returns a readonly map of all active components in the model.
     */
    get componentsMap(): ReadonlyMap<string, ComponentModel>;
    /**
     * Adds a component to the model.
     * Throws an error if a component with the same ID already exists.
     *
     * @param component The component to add.
     */
    addComponent(component: ComponentModel): void;
    /**
     * Adds a component to the model at a position in its order.
     *
     * The model holds its components in the order they were added, and iteration, topology
     * checks and their error messages follow it. This puts the component where `index` says
     * instead of last, as when an undo restores a component that an update replaced: the
     * replacement went last, the restored component goes back where it was. Inserting before
     * the last position rebuilds the order, so it takes time in proportion to the components
     * the model holds. Like `addComponent`, it fires `onCreated`.
     *
     * @param index How many components come before it. An index at or past the end adds it
     *     last.
     * @param component The component to add.
     * @throws {A2uiStateError} If a component with the same ID already exists.
     */
    insertComponent(index: number, component: ComponentModel): void;
    /**
     * Removes a component from the model by its ID.
     * Disposes of the component upon removal.
     *
     * @param id The ID of the component to remove.
     */
    removeComponent(id: string): void;
    /**
     * Extracts child component references for a given component identifier.
     *
     * @param componentId The ID of the component whose children should be resolved.
     * @returns Array of tuples containing `[referencedId, propertyPath]`.
     */
    getChildReferences(componentId: string): Array<[referencedId: string, propertyPath: string]>;
    /**
     * Returns array of referenced child component IDs for a given component identifier.
     *
     * @param componentId The ID of the component whose child IDs should be retrieved.
     * @returns Array of unique child component IDs.
     */
    getChildIds(componentId: string): string[];
    /**
     * Detects self-references, circular dependencies, and exceeds depth limits via DFS.
     *
     * @param options Configuration specifying root node, max depth, or allowing missing root.
     * @returns Set of visited component identifiers.
     * @throws {A2uiRecursionError} When self-reference, cycle, or max depth limit is exceeded.
     */
    detectCycles(options?: {
        rootId?: string;
        maxDepth?: number;
        allowMissingRoot?: boolean;
    }): Set<string>;
    /**
     * Validates topology, completeness, and references across the component hierarchy.
     *
     * @param options Validation settings (allowMissingRoot, allowDanglingReferences, allowOrphanComponents).
     * @throws {A2uiIntegrityError} If missing root, dangling references, or orphan components exist.
     * @throws {A2uiRecursionError} If self-reference, cycle, or depth limit is detected.
     */
    validateTopology(options?: ValidationConfig): void;
    /**
     * Performs non-throwing validation of references and topology across the component graph.
     * Returns an array containing the first validation error encountered, or an empty array if valid.
     *
     * @param options Validation options.
     * @returns Array of validation error objects.
     */
    validateReferences(options?: ValidationConfig): A2uiValidationError[];
    /**
     * Disposes the model, clearing all components and update event emitters.
     */
    dispose(): void;
}
