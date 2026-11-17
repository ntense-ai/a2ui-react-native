/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DataContext } from './data-context.js';
import { A2uiStateError } from '../errors.js';
/**
 * Context provided to components during rendering.
 *
 * Provides access to the component's model, the data context, and action dispatching.
 */
export class ComponentContext {
    /**
     * Initializes a new `ComponentContext` instance.
     *
     * @param surface The surface model the component belongs to.
     * @param componentId The ID of the component.
     * @param dataModelBasePath The base path for data model access (default: '/').
     * @param parentDataContext Optional parent DataContext in the component tree.
     * @param index Optional explicit collection iteration index.
     */
    constructor(surface, componentId, dataModelBasePath = '/', parentDataContext, index) {
        const model = surface.componentsModel.get(componentId);
        if (!model) {
            throw new A2uiStateError(`Component not found: ${componentId}`);
        }
        this.componentModel = model;
        this.surfaceComponents = surface.componentsModel;
        this.theme = surface.theme;
        this.dataContext = new DataContext(surface, dataModelBasePath, index, parentDataContext);
        this._actionDispatcher = (action, metadata) => surface.dispatchAction(action, this.componentModel.id, metadata);
    }
    /**
     * Dispatches an action from the component.
     *
     * @param action The action to dispatch.
     * @param metadata Optional metadata envelope to attach to the outbound action.
     * @returns A promise that resolves when action dispatching completes.
     */
    dispatchAction(action, metadata) {
        return this._actionDispatcher(action, metadata);
    }
}
