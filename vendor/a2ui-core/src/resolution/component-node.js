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
import { computed, signal, peekValue, setValue } from '../reactivity/signals.js';
import { ResolvedBinding } from './resolved-binding.js';
import { nextNodeId } from './node-id.js';
/** The component type name used for pending and cyclic placeholder nodes. */
export const PLACEHOLDER_TYPE = 'Placeholder';
/**
 * Narrows an unknown value to a `ComponentNode`.
 *
 * @param value The value to inspect.
 * @returns Whether the value is a `ComponentNode`.
 */
export function isComponentNode(value) {
    return value instanceof MutableComponentNode;
}
/**
 * Mutable implementation of `ComponentNode`.
 *
 * Used internally by the node resolver to construct, update, and dispose nodes.
 */
export class MutableComponentNode {
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
    constructor(instanceId, componentId, type, dataPath, initialProps, impl, context, state = 'resolved', metadata = computed(() => undefined)) {
        this.id = nextNodeId();
        this._onDestroyed = new EventEmitter();
        this.onDestroyed = this._onDestroyed;
        this.cleanups = [];
        this._disposed = false;
        this.instanceId = instanceId;
        this.componentId = componentId;
        this.type = type;
        this.dataPath = dataPath;
        this.props = signal(initialProps);
        this.impl = impl;
        this.context = context;
        this.state = state;
        this.metadata = metadata;
    }
    /** Whether this node has been disposed. */
    get disposed() {
        return this._disposed;
    }
    /** Whether this node is an unresolved placeholder. */
    get isPlaceholder() {
        return this.state !== 'resolved';
    }
    /**
     * Registers teardown work to run when this node is disposed.
     *
     * @param cleanup Teardown callback.
     */
    addCleanup(cleanup) {
        this.cleanups.push(cleanup);
    }
    /**
     * Serializes the resolved tree for debugging and headless assertions.
     *
     * @returns Serialized JSON-compatible representation.
     */
    toJSON() {
        if (this.isPlaceholder) {
            return { id: this.componentId, type: this.type, state: this.state };
        }
        const serialized = {
            id: this.componentId,
            type: this.type,
        };
        const props = peekValue(this.props);
        for (const [key, value] of Object.entries(props)) {
            serialized[key] = serializeValue(value);
        }
        const metadata = peekValue(this.metadata);
        if (metadata !== undefined) {
            serialized.metadata = metadata;
        }
        return serialized;
    }
    /**
     * Replaces resolved properties, emitting only when a shallow comparison detects a change.
     *
     * @param next Next property dictionary.
     */
    setProps(next) {
        if (this._disposed) {
            return;
        }
        const previous = peekValue(this.props);
        if (!shallowEqual(previous, next)) {
            setValue(this.props, next);
        }
    }
    /**
     * Tears down this node by running cleanups and firing destruction events.
     *
     * This operation is idempotent.
     */
    dispose() {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        for (const cleanup of this.cleanups) {
            try {
                cleanup();
            }
            catch (e) {
                console.error(`ComponentNode cleanup error (${this.instanceId}):`, e);
            }
        }
        this.cleanups = [];
        this._onDestroyed.emit();
        this._onDestroyed.dispose();
    }
}
function serializeValue(value) {
    if (isComponentNode(value)) {
        return value.toJSON();
    }
    if (value instanceof ResolvedBinding) {
        return serializeValue(value.value);
    }
    if (typeof value === 'function') {
        return '<Action>';
    }
    if (Array.isArray(value)) {
        return value.map(serializeValue);
    }
    if (value && typeof value === 'object') {
        const result = {};
        for (const [key, inner] of Object.entries(value)) {
            result[key] = serializeValue(inner);
        }
        return result;
    }
    return value;
}
function shallowEqual(a, b) {
    if (Object.is(a, b)) {
        return true;
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
        return false;
    }
    for (const key of aKeys) {
        if (!Object.is(a[key], b[key])) {
            return false;
        }
    }
    return true;
}
