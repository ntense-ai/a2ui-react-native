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
import { EventEmitter } from '../common/events.js';
import { cloneMetadata, jsonValueEquals, metadataEquals, } from '../common/metadata.js';
import { peekValue, setValue, signal } from '../reactivity/signals.js';
/**
 * State model for an individual UI component.
 */
export class ComponentModel {
    /**
     * Initializes a new `ComponentModel` instance.
     *
     * @param id The unique identifier for this component.
     * @param type The component type name.
     * @param initialProperties The initial properties for the component.
     * @param catalog The catalog that defines this component's type. Omitting
     *   it is deprecated and kept only for pre-1.0 callers; pass the catalog.
     * @param metadata Optional component-level metadata envelope.
     */
    constructor(id, type, initialProperties, catalog, metadata) {
        this.id = id;
        this.type = type;
        this._onUpdated = new EventEmitter();
        this._onMetadataChanged = new EventEmitter();
        /**
         * Event source firing whenever component properties are updated.
         */
        this.onUpdated = this._onUpdated;
        /**
         * Event source firing whenever component metadata changes.
         */
        this.onMetadataChanged = this._onMetadataChanged;
        this._properties = initialProperties;
        this.catalog = catalog;
        this._metadataSignal = signal(cloneMetadata(metadata));
    }
    /**
     * Internal metadata signal used by `NodeResolver` to derive `ComponentNode.metadata`.
     *
     * @internal
     */
    get metadataSignal() {
        return this._metadataSignal;
    }
    /**
     * Synchronous snapshot of the component's metadata envelope.
     */
    get metadata() {
        return peekValue(this._metadataSignal);
    }
    /**
     * Replaces the component's metadata envelope, validating UAX #31 extension
     * keys and emitting changes when structurally modified.
     */
    set metadata(metadata) {
        const next = cloneMetadata(metadata);
        if (metadataEquals(peekValue(this._metadataSignal), next)) {
            return;
        }
        setValue(this._metadataSignal, next);
        void this._onMetadataChanged.emit(next);
    }
    /**
     * Convenience view of `metadata.extensions`.
     */
    get extensions() {
        return peekValue(this._metadataSignal)?.extensions;
    }
    /**
     * Sets a single extension entry on the component metadata.
     *
     * Passing `undefined` removes the extension key. Passing `null` stores
     * `null` as an explicit JSON value.
     *
     * @param key Extension identifier (must satisfy UAX #31).
     * @param value Extension payload value.
     */
    setExtension(key, value) {
        if (value === undefined) {
            this.removeExtension(key);
            return;
        }
        const current = peekValue(this._metadataSignal);
        const nextExtensions = {
            ...(current?.extensions ?? {}),
            [key]: value,
        };
        this.metadata = {
            ...(current ?? {}),
            extensions: nextExtensions,
        };
    }
    /**
     * Removes an extension entry by key, clearing `metadata` to `undefined` when
     * no metadata entries remain.
     *
     * @param key Extension identifier to remove.
     */
    removeExtension(key) {
        const current = peekValue(this._metadataSignal);
        const currentExtensions = current?.extensions;
        if (!currentExtensions || !(key in currentExtensions)) {
            return;
        }
        const nextExtensions = { ...currentExtensions };
        delete nextExtensions[key];
        const rest = { ...current };
        delete rest.extensions;
        if (Object.keys(nextExtensions).length > 0) {
            this.metadata = { ...rest, extensions: nextExtensions };
        }
        else if (Object.keys(rest).length > 0) {
            this.metadata = rest;
        }
        else {
            this.metadata = undefined;
        }
    }
    /**
     * Current properties of the component.
     */
    get properties() {
        return this._properties;
    }
    set properties(newProperties) {
        this._properties = newProperties;
        void this._onUpdated.emit(this);
    }
    /**
     * Atomically updates both properties and metadata before emitting update
     * notifications, ensuring synchronous listeners never observe torn state.
     *
     * @param newProperties Replacement component properties.
     * @param newMetadata Replacement component metadata envelope, or `undefined`.
     */
    applyUpdate(newProperties, newMetadata) {
        const nextMeta = cloneMetadata(newMetadata);
        const propsChanged = !jsonValueEquals(this._properties, newProperties);
        const metaChanged = !metadataEquals(peekValue(this._metadataSignal), nextMeta);
        if (propsChanged) {
            this._properties = newProperties;
        }
        if (metaChanged) {
            setValue(this._metadataSignal, nextMeta);
        }
        if (propsChanged) {
            void this._onUpdated.emit(this);
        }
        if (metaChanged) {
            void this._onMetadataChanged.emit(nextMeta);
        }
    }
    /**
     * Disposes the component model and its update event emitters.
     */
    dispose() {
        this._onUpdated.dispose();
        this._onMetadataChanged.dispose();
    }
    /**
     * Serialized JSON representation of the component definition.
     *
     * The component's envelope metadata, which only v1.0 components carry, is
     * always written as `@metadata`. A bare `metadata` key is left to the
     * component's own property of that name, so the tree reads back the same
     * way whether or not the schema declares one.
     */
    get componentTree() {
        const metadata = this.metadata;
        return {
            ...this._properties,
            id: this.id,
            component: this.type,
            ...(metadata !== undefined ? { '@metadata': metadata } : {}),
        };
    }
}
