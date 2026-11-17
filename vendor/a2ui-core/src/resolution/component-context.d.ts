import { DataContext } from './data-context.js';
import { ComponentModel } from '../state/component-model.js';
import type { SurfaceModel } from '../state/surface-model.js';
import type { SurfaceComponentsModel } from '../state/surface-components-model.js';
import type { ComponentApi } from '../catalog/types.js';
import type { A2uiMetadata } from '../common/metadata.js';
import type { Action } from '../types/common-types.js';
/**
 * Context provided to components during rendering.
 *
 * Provides access to the component's model, the data context, and action dispatching.
 */
export declare class ComponentContext {
    /** State model for this specific component, providing access to its properties and state. */
    readonly componentModel: ComponentModel;
    /**
     * Data context scoped to this component's position in the visual hierarchy.
     *
     * Uses `dataModelBasePath` to resolve relative data paths.
     */
    readonly dataContext: DataContext;
    /** Collection of all component models for the current surface, allowing lookups by ID. */
    readonly surfaceComponents: SurfaceComponentsModel;
    /** Theme configuration for the surface this component belongs to. */
    readonly theme: Record<string, unknown> | undefined;
    /**
     * Initializes a new `ComponentContext` instance.
     *
     * @param surface The surface model the component belongs to.
     * @param componentId The ID of the component.
     * @param dataModelBasePath The base path for data model access (default: '/').
     * @param parentDataContext Optional parent DataContext in the component tree.
     * @param index Optional explicit collection iteration index.
     */
    constructor(surface: SurfaceModel<ComponentApi>, componentId: string, dataModelBasePath?: string, parentDataContext?: DataContext, index?: number);
    private _actionDispatcher;
    /**
     * Dispatches an action from the component.
     *
     * @param action The action to dispatch.
     * @param metadata Optional metadata envelope to attach to the outbound action.
     * @returns A promise that resolves when action dispatching completes.
     */
    dispatchAction(action: Action | Record<string, unknown>, metadata?: A2uiMetadata): Promise<void>;
}
