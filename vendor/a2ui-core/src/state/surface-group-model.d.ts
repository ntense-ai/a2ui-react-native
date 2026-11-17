import { SurfaceModel, ActionPayload, A2uiErrorPayload } from './surface-model.js';
import { ComponentApi } from '../catalog/types.js';
import { EventSource } from '../common/events.js';
/**
 * Root state model managing a collection of active surfaces.
 *
 * @template T Component API type definition.
 */
export declare class SurfaceGroupModel<T extends ComponentApi> {
    private surfaces;
    private surfaceUnsubscribers;
    private surfaceErrorUnsubscribers;
    private readonly _onSurfaceCreated;
    private readonly _onSurfaceDeleted;
    private readonly _onAction;
    private readonly _onError;
    /** Event source firing when a new surface is added. */
    readonly onSurfaceCreated: EventSource<SurfaceModel<T>>;
    /** Event source firing when a surface is removed. */
    readonly onSurfaceDeleted: EventSource<string>;
    /** Event source firing when an action is dispatched from any surface in the group. */
    readonly onAction: EventSource<ActionPayload>;
    /** Event source firing when an error is reported on any surface or at the group level. */
    readonly onError: EventSource<A2uiErrorPayload>;
    /**
     * Emits a group-level error payload to all `onError` subscribers.
     *
     * @param error Structured error payload to emit.
     */
    emitError(error: A2uiErrorPayload): void;
    /**
     * Adds a surface to the group.
     *
     * Ignores if a surface with the same ID already exists.
     *
     * @param surface The surface model to add.
     */
    addSurface(surface: SurfaceModel<T>): void;
    /**
     * Removes a surface from the group by its ID.
     *
     * Disposes of the surface upon removal.
     *
     * @param id The ID of the surface to remove.
     */
    deleteSurface(id: string): void;
    /**
     * Retrieves a surface by its ID.
     *
     * @param id The ID of the surface to retrieve.
     * @returns The surface model, or undefined if not found.
     */
    getSurface(id: string): SurfaceModel<T> | undefined;
    /**
     * Readonly map of all active surfaces keyed by surface ID.
     */
    get surfacesMap(): ReadonlyMap<string, SurfaceModel<T>>;
    /**
     * Disposes the group and all contained surfaces.
     */
    dispose(): void;
}
