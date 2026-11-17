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
import { isAtLeastVersion } from '../common/semver.js';
import { A2uiStateError } from '../errors.js';
import { computed, getValue, peekValue, setValue, signal } from '../reactivity/signals.js';
import { V08_CHILD_REF_OPTIONS } from '../v0_8/standard_defs.js';
import { V09_CHILD_REF_OPTIONS } from '../v0_9/standard_defs.js';
import { V10_CHILD_REF_OPTIONS } from '../v1_0/standard_defs.js';
import { ComponentContext } from './component-context.js';
import { isComponentNode, MutableComponentNode, PLACEHOLDER_TYPE, } from './component-node.js';
import { GenericBinder, getSafeChildList, scrapeComponentBehavior, } from './generic-binder.js';
import { extractRefFields } from './ref-fields.js';
import { ResolvedBinding, sameBinding, WritableBinding } from './resolved-binding.js';
const ROOT_COMPONENT_ID = 'root';
const ROOT_DATA_PATH = '/';
const EMPTY_REF_FIELDS = new Map();
/**
 * Resolves a surface model's flat component dictionary into a reactive tree of `ComponentNode`s.
 *
 * Child references become `ComponentNode` objects, template `ChildList`s spawn one node per array item,
 * not-yet-arrived components appear as placeholder nodes and are upgraded in place, and every node's
 * binder and data subscriptions are torn down when its parent stops referencing it or the resolver is disposed.
 *
 * Construction requires a catalog whose functions are executable (`F extends FunctionImplementation`).
 */
export class NodeResolver {
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
    constructor(surface, catalog = surface.defaultCatalog) {
        this.records = new Map();
        this.nodesByEdge = new Map();
        this.nodesByComponentId = new Map();
        /** Parents holding a placeholder for a component id, awaiting its arrival. */
        this.pendingParents = new Map();
        /** Errors already dispatched, keyed by component id, then data path. */
        this.dispatchedErrors = new Map();
        this.modelSubs = [];
        this._disposed = false;
        if (catalog !== surface.defaultCatalog) {
            throw new A2uiStateError('NodeResolver requires the same catalog instance its surface was constructed with.');
        }
        this.surface = surface;
        this.rootId = surface.rootId ?? ROOT_COMPONENT_ID;
        this.rootNode = signal(undefined);
        if (surface.componentsModel?.onCreated) {
            this.modelSubs.push(surface.componentsModel.onCreated.subscribe(component => this.onComponentCreated(component)));
        }
        if (surface.componentsModel?.onDeleted) {
            this.modelSubs.push(surface.componentsModel.onDeleted.subscribe(id => this.onComponentDeleted(id)));
        }
        if (surface.componentsModel.get(this.rootId)) {
            this.buildRoot();
        }
    }
    /**
     * Dispatches once per (code, component, path) for as long as the condition
     * persists: the record is cleared when the component is deleted, when a
     * node for the pair resolves, or when a cyclic stand-in's edge goes away,
     * so a condition that is fixed and later reintroduced reports again.
     */
    dispatchOnce(code, componentId, dataPath, message) {
        let byPath = this.dispatchedErrors.get(componentId);
        if (!byPath) {
            byPath = new Map();
            this.dispatchedErrors.set(componentId, byPath);
        }
        let codes = byPath.get(dataPath);
        if (!codes) {
            codes = new Set();
            byPath.set(dataPath, codes);
        }
        if (codes.has(code)) {
            return;
        }
        codes.add(code);
        this.surface.dispatchError({ code, message });
    }
    clearDispatched(componentId, dataPath) {
        const byPath = this.dispatchedErrors.get(componentId);
        if (byPath?.delete(dataPath) && byPath.size === 0) {
            this.dispatchedErrors.delete(componentId);
        }
    }
    /** Total count of live nodes in the tree, including placeholders. */
    get activeNodeCount() {
        return this.records.size;
    }
    /** Whether this resolver has been disposed. */
    get disposed() {
        return this._disposed;
    }
    /**
     * Tears down the entire node tree and disconnects model event listeners.
     *
     * This operation is idempotent.
     */
    dispose() {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        for (const sub of this.modelSubs) {
            sub.unsubscribe();
        }
        this.modelSubs.length = 0;
        for (const node of [...this.records.keys()]) {
            this.disposeNode(node);
        }
        this.pendingParents.clear();
        this.dispatchedErrors.clear();
        this.rootRecord = undefined;
        setValue(this.rootNode, undefined);
    }
    /** No-op while a root record exists; root deletion clears it so a re-sent root rebuilds. */
    buildRoot() {
        if (this.rootRecord) {
            return;
        }
        const rootEdgeKey = `>${escapeIdPart(this.rootId)}>${escapeIdPart(this.rootId)}@/`;
        const node = this.createNode(this.rootId, ROOT_DATA_PATH, rootEdgeKey, undefined);
        this.rootRecord = this.records.get(node);
        // Sound: every impl a node carries came from this resolver's Catalog<C>.
        setValue(this.rootNode, node);
    }
    onComponentCreated(component) {
        if (this._disposed) {
            return;
        }
        if (component.id === this.rootId) {
            // Events deliver late; reconcile against the model's current root, not
            // the event payload. A stale creation must not rebuild a tree already
            // bound to the current model, nor create one the model no longer has.
            const current = this.surface.componentsModel.get(this.rootId);
            if (this.rootRecord && this.rootRecord.componentModel !== current) {
                this.disposeNode(this.rootRecord.node);
                this.rootRecord = undefined;
                if (!current) {
                    setValue(this.rootNode, undefined);
                }
            }
            if (current) {
                this.buildRoot();
            }
        }
        const waiting = this.pendingParents.get(component.id);
        if (waiting) {
            this.pendingParents.delete(component.id);
            for (const parent of waiting) {
                const record = this.records.get(parent);
                if (record && !parent.disposed) {
                    this.materialize(record);
                }
            }
        }
    }
    onComponentDeleted(id) {
        if (this._disposed) {
            return;
        }
        // Model events deliver asynchronously, so a removal can arrive after the
        // component is already back; reconcile against current model state.
        this.dispatchedErrors.delete(id);
        const model = this.surface.componentsModel.get(id);
        const affected = this.nodesByComponentId.get(id);
        if (!affected) {
            return;
        }
        const parentsToRefresh = new Set();
        let rootAffected = false;
        for (const node of [...affected]) {
            const record = this.records.get(node);
            if (!record) {
                continue;
            }
            if (record.parent) {
                parentsToRefresh.add(record.parent);
            }
            else {
                rootAffected = true;
            }
        }
        if (rootAffected && this.rootRecord) {
            if (!model) {
                this.disposeNode(this.rootRecord.node);
                this.rootRecord = undefined;
                setValue(this.rootNode, undefined);
            }
            else if (this.rootRecord.componentModel !== model) {
                this.disposeNode(this.rootRecord.node);
                this.rootRecord = undefined;
                this.buildRoot();
            }
        }
        for (const parent of parentsToRefresh) {
            const record = this.records.get(parent);
            if (record && !parent.disposed) {
                this.materialize(record);
            }
        }
    }
    /**
     * Creates a node for one (componentId, dataPath) edge. A missing component
     * definition yields a placeholder node and registers the parent for a
     * refresh when the definition arrives.
     */
    createNode(componentId, dataPath, edgeKey, parent, occurrence = 1) {
        const model = this.surface.componentsModel.get(componentId);
        if (!model) {
            const record = this.registerNode(new MutableComponentNode(instanceIdFor(componentId, dataPath, occurrence), componentId, PLACEHOLDER_TYPE, dataPath, {}, undefined, undefined, 'pending'), { edgeKey, parent, occurrence, refFields: EMPTY_REF_FIELDS });
            if (parent) {
                this.registerPendingParent(componentId, parent);
            }
            return record.node;
        }
        const compCatalog = this.catalogFor(model);
        const api = compCatalog.components.get(model.type);
        if (!api) {
            this.dispatchOnce('UNKNOWN_COMPONENT_TYPE', componentId, dataPath, `Component '${componentId}' has type '${model.type}', which is not in catalog '${compCatalog.id}'.`);
            return this.registerNode(new MutableComponentNode(instanceIdFor(componentId, dataPath, occurrence), componentId, model.type, dataPath, {}, undefined, undefined, 'unknown-type', computed(() => getValue(model.metadataSignal))), { edgeKey, parent, occurrence, refFields: EMPTY_REF_FIELDS, componentModel: model }).node;
        }
        this.clearDispatched(componentId, dataPath);
        const context = new ComponentContext(this.surface, componentId, dataPath, parent?.context?.dataContext);
        const refOptions = isAtLeastVersion(compCatalog.protocolVersion, '1.0')
            ? V10_CHILD_REF_OPTIONS
            : isAtLeastVersion(compCatalog.protocolVersion, '0.9')
                ? V09_CHILD_REF_OPTIONS
                : V08_CHILD_REF_OPTIONS;
        const binder = new GenericBinder(context, api.schema, refOptions);
        const record = this.registerNode(new MutableComponentNode(instanceIdFor(componentId, dataPath, occurrence), componentId, model.type, dataPath, {}, api, context, 'resolved', computed(() => getValue(model.metadataSignal))), {
            edgeKey,
            parent,
            occurrence,
            refFields: extractRefFields(api.schema, refOptions),
            behavior: scrapeComponentBehavior(api.schema, refOptions),
            componentModel: model,
            binder,
        });
        record.binderSub = binder.subscribe(raw => {
            record.lastBinderProps = raw;
            this.materialize(record);
        });
        // The binder resolves synchronously while connecting, but notifies only
        // listeners registered before that resolution, so the first
        // materialization must be seeded from its snapshot.
        record.lastBinderProps = binder.snapshot;
        this.materialize(record);
        return record.node;
    }
    /**
     * Returns the catalog a component model resolves against: the catalog it
     * was bound to, never the surface's default catalog directly.
     *
     * @param model Component model to resolve.
     * @returns The component model's catalog.
     */
    catalogFor(model) {
        return model.catalog;
    }
    registerNode(node, partial) {
        const record = {
            node,
            edgeKey: partial.edgeKey,
            parent: partial.parent,
            occurrence: partial.occurrence,
            refFields: partial.refFields,
            behavior: partial.behavior,
            componentModel: partial.componentModel,
            binder: partial.binder,
            childEdges: new Map(),
        };
        this.records.set(node, record);
        this.nodesByEdge.set(partial.edgeKey, node);
        let byId = this.nodesByComponentId.get(node.componentId);
        if (!byId) {
            byId = new Set();
            this.nodesByComponentId.set(node.componentId, byId);
        }
        byId.add(node);
        return record;
    }
    /**
     * Returns the node for a child edge, reusing the cached node when the edge
     * is unchanged and replacing it (placeholder upgrade or downgrade, id
     * change, type change) when it is not.
     */
    childNode(componentId, dataPath, edgeKey, parent, occurrence = 1) {
        const existing = this.nodesByEdge.get(edgeKey);
        if (this.isCyclic(componentId, dataPath, parent)) {
            // Node identity is parent-scoped, so a cyclic payload would otherwise
            // recurse forever; render the repeated reference as a placeholder.
            if (existing &&
                !existing.disposed &&
                existing.isPlaceholder &&
                this.records.get(existing)?.occurrence === occurrence) {
                return existing;
            }
            if (existing && !existing.disposed) {
                this.disposeNode(existing);
            }
            this.dispatchOnce('CYCLIC_REFERENCE', componentId, dataPath, `Component '${componentId}' at '${dataPath}' is referenced by one of its own descendants; rendering a placeholder instead.`);
            return this.registerNode(new MutableComponentNode(instanceIdFor(componentId, dataPath, occurrence), componentId, PLACEHOLDER_TYPE, dataPath, {}, undefined, undefined, 'cyclic'), { edgeKey, parent, occurrence, refFields: EMPTY_REF_FIELDS }).node;
        }
        if (existing && !existing.disposed) {
            const model = this.surface.componentsModel.get(componentId);
            const api = model ? this.catalogFor(model).components.get(model.type) : undefined;
            // A placeholder stays up to date only while its own state's
            // preconditions hold, so a pending node whose definition arrives with
            // an unknown type is replaced (once) by an unknown-type node, and
            // either kind resolves when the type gains a catalog entry. Resolved
            // and unknown-type nodes must also still be bound to the current model
            // instance. A node whose sibling ordinal changed is rebuilt so
            // instance ids stay distinct after list edits.
            const existingRecord = this.records.get(existing);
            const upToDate = existing.componentId === componentId &&
                existing.dataPath === dataPath &&
                existingRecord?.occurrence === occurrence &&
                (existing.isPlaceholder
                    ? (model === undefined && existing.state === 'pending') ||
                        (model !== undefined &&
                            api === undefined &&
                            existing.state === 'unknown-type' &&
                            existingRecord?.componentModel === model)
                    : model !== undefined &&
                        existing.type === model.type &&
                        existingRecord?.componentModel === model);
            if (upToDate) {
                if (existing.state === 'pending') {
                    // A deletion delivered between this component's add and remove
                    // clears the waiting registration; reusing the placeholder without
                    // restoring it would leave a later legitimate add unnoticed.
                    this.registerPendingParent(componentId, parent);
                }
                return existing;
            }
            this.disposeNode(existing);
        }
        return this.createNode(componentId, dataPath, edgeKey, parent, occurrence);
    }
    /** Registers a parent to be refreshed when `componentId` arrives. */
    registerPendingParent(componentId, parent) {
        let waiting = this.pendingParents.get(componentId);
        if (!waiting) {
            waiting = new Set();
            this.pendingParents.set(componentId, waiting);
        }
        waiting.add(parent);
    }
    /** True when (componentId, dataPath) already appears in the parent chain. */
    isCyclic(componentId, dataPath, parent) {
        for (let node = parent; node; node = this.records.get(node)?.parent) {
            if (node.componentId === componentId && node.dataPath === dataPath) {
                return true;
            }
        }
        return false;
    }
    /**
     * Rebuilds a node's resolved props from its binder output: child reference
     * properties become live `ComponentNode`s, children this parent no longer
     * references are disposed, and unchanged values keep reference identity so
     * the shallow comparison in `MutableComponentNode.setProps` stays exact.
     */
    materialize(record) {
        if (record.node.disposed) {
            return;
        }
        const raw = record.lastBinderProps ?? record.binder?.snapshot ?? {};
        const modelProps = record.componentModel?.properties;
        // Prune omitted keys here too in case materialize runs before the binder's
        // onUpdated listener rebuilds lastBinderProps.
        const next = modelProps
            ? pruneOmittedProps(raw, modelProps, record.behavior)
            : { ...raw };
        const newEdges = new Map();
        // Ordinal per (componentId, dataPath) within this rebuild, so repeated
        // references to one component get distinct instance ids.
        const occurrences = new Map();
        const resolveChild = (slot, componentId, dataPath) => {
            const occurrenceKey = `${escapeIdPart(componentId)}@${escapeIdPart(dataPath)}`;
            const occurrence = (occurrences.get(occurrenceKey) ?? 0) + 1;
            occurrences.set(occurrenceKey, occurrence);
            const edgeKey = `${record.edgeKey}>${slot}>${occurrenceKey}#${occurrence}`;
            const child = this.childNode(componentId, dataPath, edgeKey, record.node, occurrence);
            newEdges.set(edgeKey, child);
            return child;
        };
        for (const [key, ref] of record.refFields) {
            switch (ref.kind) {
                case 'single': {
                    const value = next[key];
                    if (typeof value === 'string' && value) {
                        next[key] = resolveChild(escapeIdPart(key), value, record.node.dataPath);
                    }
                    break;
                }
                case 'list': {
                    const value = next[key];
                    if (!Array.isArray(value)) {
                        break;
                    }
                    const safeValue = getSafeChildList(value);
                    const slotKey = escapeIdPart(key);
                    next[key] = safeValue.map(item => {
                        if (typeof item === 'string' && item) {
                            return resolveChild(slotKey, item, record.node.dataPath);
                        }
                        if (item && typeof item === 'object' && !Array.isArray(item)) {
                            const entry = item;
                            // The binder resolves a {componentId, path} template into
                            // {id, basePath} pairs, one per array element.
                            if (typeof entry.id === 'string' && typeof entry.basePath === 'string') {
                                return resolveChild(slotKey, entry.id, entry.basePath);
                            }
                            if (typeof entry.componentId === 'string' && entry.componentId) {
                                return resolveChild(slotKey, entry.componentId, record.node.dataPath);
                            }
                        }
                        return item;
                    });
                    break;
                }
                case 'nested': {
                    const value = next[key];
                    const slotKey = escapeIdPart(key);
                    if (typeof value === 'string' && value) {
                        next[key] = resolveChild(slotKey, value, record.node.dataPath);
                        break;
                    }
                    if (!Array.isArray(value)) {
                        break;
                    }
                    const rawProp = modelProps?.[key];
                    const fromTemplate = rawProp !== undefined && !Array.isArray(rawProp);
                    const safeValue = getSafeChildList(value);
                    next[key] = safeValue.map((item, index) => {
                        if (typeof item === 'string' && item) {
                            return resolveChild(slotKey, item, record.node.dataPath);
                        }
                        if (!item || typeof item !== 'object' || Array.isArray(item)) {
                            return item;
                        }
                        const rawEntry = item;
                        if (fromTemplate) {
                            if (typeof rawEntry.id === 'string' && typeof rawEntry.basePath === 'string') {
                                return resolveChild(slotKey, rawEntry.id, rawEntry.basePath);
                            }
                            return item;
                        }
                        const hasNestedKey = Array.from(ref.keys).some(subKey => Object.prototype.hasOwnProperty.call(rawEntry, subKey));
                        if (!hasNestedKey) {
                            return item;
                        }
                        const entry = { ...rawEntry };
                        let resolvedAny = false;
                        for (const subKey of ref.keys) {
                            const subVal = entry[subKey];
                            const subSlotKey = `${slotKey}[${index}].${escapeIdPart(subKey)}`;
                            if (typeof subVal === 'string' && subVal) {
                                entry[subKey] = resolveChild(subSlotKey, subVal, record.node.dataPath);
                                resolvedAny = true;
                            }
                            else if (Array.isArray(subVal)) {
                                const safeSubVal = getSafeChildList(subVal);
                                let resolvedSubList = false;
                                const mappedSubVal = safeSubVal.map(subItem => {
                                    if (typeof subItem === 'string' && subItem) {
                                        resolvedSubList = true;
                                        return resolveChild(subSlotKey, subItem, record.node.dataPath);
                                    }
                                    if (subItem && typeof subItem === 'object' && !Array.isArray(subItem)) {
                                        const subEntry = subItem;
                                        if (typeof subEntry.id === 'string' && typeof subEntry.basePath === 'string') {
                                            resolvedSubList = true;
                                            return resolveChild(subSlotKey, subEntry.id, subEntry.basePath);
                                        }
                                        if (typeof subEntry.componentId === 'string' && subEntry.componentId) {
                                            resolvedSubList = true;
                                            return resolveChild(subSlotKey, subEntry.componentId, record.node.dataPath);
                                        }
                                    }
                                    return subItem;
                                });
                                if (resolvedSubList) {
                                    entry[subKey] = mappedSubVal;
                                    resolvedAny = true;
                                }
                            }
                        }
                        return resolvedAny ? entry : item;
                    });
                    break;
                }
            }
        }
        for (const [edgeKey, child] of record.childEdges) {
            if (!newEdges.has(edgeKey)) {
                this.disposeNode(child);
                if (child.isPlaceholder) {
                    const stillWaiting = [...newEdges.values()].some(other => other.isPlaceholder && other.componentId === child.componentId);
                    if (!stillWaiting) {
                        const waiting = this.pendingParents.get(child.componentId);
                        if (waiting) {
                            waiting.delete(record.node);
                            if (waiting.size === 0) {
                                this.pendingParents.delete(child.componentId);
                            }
                        }
                    }
                }
            }
        }
        record.childEdges = newEdges;
        const wrapped = record.behavior && record.node.context
            ? wrapDynamicValues(next, record.behavior, modelProps ?? {}, record.node.context.dataContext)
            : next;
        // peekValue avoids creating a reactive dependency inside materialize.
        const previous = peekValue(record.node.props);
        for (const key of Object.keys(wrapped)) {
            wrapped[key] = stabilize(previous[key], wrapped[key]);
        }
        if (next['accessibility'] !== undefined && next['accessibility'] === next['@accessibility']) {
            // The binder's `accessibility` mirror shares the wrapped `@accessibility`
            // and its writable bindings, which the payload declares only there.
            wrapped['accessibility'] = wrapped['@accessibility'];
        }
        record.node.setProps(wrapped);
    }
    /** Disposes a node and, through parent-scoped ownership, its subtree. */
    disposeNode(node) {
        if (node.disposed) {
            return;
        }
        const record = this.records.get(node);
        if (record) {
            for (const child of record.childEdges.values()) {
                this.disposeNode(child);
            }
            record.childEdges.clear();
            record.binderSub?.unsubscribe();
            record.binderSub = undefined;
            if (this.nodesByEdge.get(record.edgeKey) === node) {
                this.nodesByEdge.delete(record.edgeKey);
            }
            this.records.delete(node);
        }
        const byId = this.nodesByComponentId.get(node.componentId);
        if (byId) {
            byId.delete(node);
            if (byId.size === 0) {
                this.nodesByComponentId.delete(node.componentId);
            }
        }
        for (const [componentId, waiting] of this.pendingParents) {
            waiting.delete(node);
            if (waiting.size === 0) {
                this.pendingParents.delete(componentId);
            }
        }
        if (node.state === 'cyclic') {
            // The cyclic edge is gone; a payload that reintroduces it should report.
            this.clearDispatched(node.componentId, node.dataPath);
        }
        node.dispose();
    }
}
/**
 * Escapes the characters that carry meaning in composed instance ids and
 * edge keys (`~`, `#`, `[`, `]`, `>`, `@`), so a component id, data path, or
 * property name containing them cannot collide with the composed form of a
 * different tuple. Parts without these characters are unchanged.
 */
const ID_PART_ESCAPES = {
    '~': '~0',
    '#': '~1',
    '[': '~2',
    ']': '~3',
    '>': '~4',
    '@': '~5',
};
// A single pass, so no replacement can see the output of an earlier one.
function escapeIdPart(part) {
    return part.replace(/[~#[\]>@]/g, match => ID_PART_ESCAPES[match]);
}
function instanceIdFor(componentId, dataPath, occurrence) {
    const trimmed = dataPath.replace(/\/+$/, '') || ROOT_DATA_PATH;
    const base = dataPath === ROOT_DATA_PATH
        ? escapeIdPart(componentId)
        : `${escapeIdPart(componentId)}-[${escapeIdPart(trimmed)}]`;
    return occurrence > 1 ? `${base}#${occurrence}` : base;
}
/**
 * Converts every position the schema classifies as DYNAMIC into a
 * `ResolvedBinding`: the binder's resolved value as the snapshot, plus a
 * write capability iff the payload gave the value as a `{"path": ...}`
 * binding, writing through the component's scoped data context. The binder's
 * synthesized `set<Prop>` siblings are dropped: they silently swallow writes
 * to literal-valued properties, whereas a read-only `ResolvedBinding` has no `set`,
 * making such writes a type error.
 */
function wrapDynamicValues(value, behavior, raw, dataContext) {
    if (isComponentNode(value)) {
        return value;
    }
    switch (behavior.type) {
        case 'DYNAMIC': {
            const bindingKey = dataContext.atLeastV10 ? '@path' : 'path';
            const rawRecord = raw && typeof raw === 'object' && !Array.isArray(raw)
                ? raw
                : undefined;
            const path = rawRecord && typeof rawRecord[bindingKey] === 'string' && !('componentId' in rawRecord)
                ? rawRecord[bindingKey]
                : undefined;
            if (path === undefined) {
                return new ResolvedBinding(value);
            }
            return new WritableBinding(value, newValue => dataContext.set(path, newValue), path);
        }
        case 'ARRAY': {
            if (!Array.isArray(value)) {
                return value;
            }
            const rawItems = Array.isArray(raw) ? raw : [];
            return value.map((item, index) => wrapDynamicValues(item, behavior.element, rawItems[index], dataContext));
        }
        case 'OBJECT': {
            if (!value || typeof value !== 'object' || Array.isArray(value)) {
                return value;
            }
            const rawRecord = raw && typeof raw === 'object' && !Array.isArray(raw)
                ? raw
                : {};
            const setterNames = new Set();
            for (const [key, childBehavior] of Object.entries(behavior.shape)) {
                if (childBehavior.type === 'DYNAMIC') {
                    setterNames.add(`set${key.charAt(0).toUpperCase()}${key.slice(1)}`);
                }
            }
            if (behavior.catchall?.type === 'DYNAMIC') {
                for (const key of Object.keys(rawRecord)) {
                    if (!Object.prototype.hasOwnProperty.call(behavior.shape, key) && key.length > 0) {
                        const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
                        if (!Object.prototype.hasOwnProperty.call(rawRecord, setterName)) {
                            setterNames.add(setterName);
                        }
                    }
                }
            }
            const out = {};
            for (const [key, item] of Object.entries(value)) {
                if (setterNames.has(key)) {
                    continue;
                }
                const childBehavior = Object.prototype.hasOwnProperty.call(behavior.shape, key)
                    ? behavior.shape[key]
                    : (behavior.catchall ?? { type: 'STATIC' });
                out[key] = wrapDynamicValues(item, childBehavior, rawRecord[key], dataContext);
            }
            // The binder guarantees every dynamic property a setter even when the
            // payload omits it. Represent an omitted one as a read-only binding of
            // undefined, at every nesting level, so consumers synthesizing setters
            // from bindings keep that guarantee.
            for (const [key, childBehavior] of Object.entries(behavior.shape)) {
                if (childBehavior.type === 'DYNAMIC' && !Object.prototype.hasOwnProperty.call(out, key)) {
                    out[key] = new ResolvedBinding(undefined);
                }
            }
            return out;
        }
        default:
            return value;
    }
}
/**
 * Returns `prev` whenever `next` is structurally identical to it, so
 * unchanged props keep reference identity across rebuilds. Child
 * `ComponentNode`s and action closures compare by identity, and
 * `ResolvedBinding`s by `sameBinding`.
 */
function stabilize(prev, next) {
    if (Object.is(prev, next)) {
        return next;
    }
    if (prev instanceof ResolvedBinding && next instanceof ResolvedBinding) {
        return sameBinding(prev, next) ? prev : next;
    }
    if (isComponentNode(prev) || isComponentNode(next)) {
        return next;
    }
    if (Array.isArray(prev) && Array.isArray(next) && prev.length === next.length) {
        let allSame = true;
        const out = next.map((item, i) => {
            const stabilized = stabilize(prev[i], item);
            if (!Object.is(stabilized, prev[i])) {
                allSame = false;
            }
            return stabilized;
        });
        return allSame ? prev : out;
    }
    if (isPlainObject(prev) && isPlainObject(next)) {
        const prevKeys = Object.keys(prev);
        const nextKeys = Object.keys(next);
        if (prevKeys.length === nextKeys.length) {
            let allSame = true;
            const out = {};
            for (const key of nextKeys) {
                const stabilized = stabilize(prev[key], next[key]);
                out[key] = stabilized;
                if (!Object.prototype.hasOwnProperty.call(prev, key) || !Object.is(stabilized, prev[key])) {
                    allSame = false;
                }
            }
            return allSame ? prev : out;
        }
    }
    return next;
}
function isPlainObject(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value) || isComponentNode(value)) {
        return false;
    }
    // Maps, Dates, and class instances have no own enumerable keys to compare,
    // so key-wise stabilization would wrongly report them unchanged; treat any
    // non-literal object as always-changed instead.
    const proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}
const VALIDATION_STATE_KEYS = new Set(['isValid', 'validationErrors', 'validationResults']);
/**
 * Returns a copy of `resolved` containing only properties still present on
 * `rawProps`, plus binder-synthesized dynamic setters, validation state for
 * active `CHECKABLE` fields at each object schema level, and the binder's
 * `accessibility` mirror of a kept `@accessibility`.
 */
function pruneOmittedProps(resolved, rawProps, behavior) {
    const shape = behavior?.type === 'OBJECT' ? behavior.shape : undefined;
    const catchall = behavior?.type === 'OBJECT' ? behavior.catchall : undefined;
    let hasActiveCheckable = false;
    const dynamicSetterNames = new Set();
    if (shape) {
        for (const [key, childBehavior] of Object.entries(shape)) {
            if (childBehavior.type === 'DYNAMIC') {
                dynamicSetterNames.add(`set${key.charAt(0).toUpperCase()}${key.slice(1)}`);
            }
            else if (childBehavior.type === 'CHECKABLE' &&
                Object.prototype.hasOwnProperty.call(rawProps, key) &&
                rawProps[key] !== undefined &&
                rawProps[key] !== null) {
                hasActiveCheckable = true;
            }
        }
    }
    if (catchall) {
        for (const key of Object.keys(rawProps)) {
            if (shape && Object.prototype.hasOwnProperty.call(shape, key)) {
                continue;
            }
            if (catchall.type === 'DYNAMIC' && key.length > 0) {
                dynamicSetterNames.add(`set${key.charAt(0).toUpperCase()}${key.slice(1)}`);
            }
            else if (catchall.type === 'CHECKABLE' &&
                rawProps[key] !== undefined &&
                rawProps[key] !== null) {
                hasActiveCheckable = true;
            }
        }
    }
    const out = {};
    for (const [key, val] of Object.entries(resolved)) {
        if (!Object.prototype.hasOwnProperty.call(rawProps, key)) {
            if (dynamicSetterNames.has(key) || (hasActiveCheckable && VALIDATION_STATE_KEYS.has(key))) {
                out[key] = val;
            }
            continue;
        }
        const childBehavior = shape && Object.prototype.hasOwnProperty.call(shape, key) ? shape[key] : catchall;
        out[key] = pruneOmittedValue(val, rawProps[key], childBehavior);
    }
    // `GenericBinder` mirrors `@accessibility` onto `accessibility` when the
    // component declares no custom `accessibility`. The payload carries only
    // `@accessibility`, so keep the mirror wherever its source is kept.
    if (Object.prototype.hasOwnProperty.call(resolved, 'accessibility') &&
        !Object.prototype.hasOwnProperty.call(rawProps, 'accessibility') &&
        Object.prototype.hasOwnProperty.call(out, '@accessibility')) {
        out['accessibility'] = out['@accessibility'];
    }
    return out;
}
function pruneOmittedValue(resolved, rawValue, behavior) {
    if (rawValue === undefined || rawValue === null) {
        return rawValue;
    }
    if (behavior?.type === 'STRUCTURAL' && Array.isArray(rawValue)) {
        return [...rawValue];
    }
    if ((!behavior || behavior.type === 'OBJECT' || behavior.type === 'STATIC') &&
        isPlainObject(resolved) &&
        isPlainObject(rawValue)) {
        return pruneOmittedProps(resolved, rawValue, behavior);
    }
    if ((!behavior || behavior.type === 'ARRAY' || behavior.type === 'STATIC') &&
        Array.isArray(resolved) &&
        Array.isArray(rawValue)) {
        const elementBehavior = behavior?.type === 'ARRAY' ? behavior.element : undefined;
        return resolved
            .slice(0, rawValue.length)
            .map((item, index) => pruneOmittedValue(item, rawValue[index], elementBehavior));
    }
    return resolved;
}
