import { Catalog } from '../catalog/types.js';
import { EventSource } from '../common/events.js';
import { A2uiMetadata, Extensions } from '../common/metadata.js';
import { Signal } from '../reactivity/signals.js';
/**
 * State model for an individual UI component.
 */
export declare class ComponentModel {
    readonly id: string;
    readonly type: string;
    private _properties;
    private readonly _onUpdated;
    private readonly _onMetadataChanged;
    private readonly _metadataSignal;
    /**
     * Event source firing whenever component properties are updated.
     */
    readonly onUpdated: EventSource<ComponentModel>;
    /**
     * Event source firing whenever component metadata changes.
     */
    readonly onMetadataChanged: EventSource<A2uiMetadata | undefined>;
    /**
     * The catalog that defines this component's type.
     *
     * Always set by the message processor. Only pre-1.0 callers that construct
     * a `ComponentModel` directly, such as unit tests, may leave it out, in
     * which case it is `undefined` at runtime despite the type.
     */
    readonly catalog: Catalog<any, any>;
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
    constructor(id: string, type: string, initialProperties: Record<string, any>, catalog?: Catalog<any, any>, metadata?: A2uiMetadata);
    /**
     * Internal metadata signal used by `NodeResolver` to derive `ComponentNode.metadata`.
     *
     * @internal
     */
    get metadataSignal(): Signal<A2uiMetadata | undefined>;
    /**
     * Synchronous snapshot of the component's metadata envelope.
     */
    get metadata(): A2uiMetadata | undefined;
    /**
     * Replaces the component's metadata envelope, validating UAX #31 extension
     * keys and emitting changes when structurally modified.
     */
    set metadata(metadata: A2uiMetadata | undefined);
    /**
     * Convenience view of `metadata.extensions`.
     */
    get extensions(): Extensions | undefined;
    /**
     * Sets a single extension entry on the component metadata.
     *
     * Passing `undefined` removes the extension key. Passing `null` stores
     * `null` as an explicit JSON value.
     *
     * @param key Extension identifier (must satisfy UAX #31).
     * @param value Extension payload value.
     */
    setExtension(key: string, value: unknown): void;
    /**
     * Removes an extension entry by key, clearing `metadata` to `undefined` when
     * no metadata entries remain.
     *
     * @param key Extension identifier to remove.
     */
    removeExtension(key: string): void;
    /**
     * Current properties of the component.
     */
    get properties(): Record<string, any>;
    set properties(newProperties: Record<string, any>);
    /**
     * Atomically updates both properties and metadata before emitting update
     * notifications, ensuring synchronous listeners never observe torn state.
     *
     * @param newProperties Replacement component properties.
     * @param newMetadata Replacement component metadata envelope, or `undefined`.
     */
    applyUpdate(newProperties: Record<string, any>, newMetadata: A2uiMetadata | undefined): void;
    /**
     * Disposes the component model and its update event emitters.
     */
    dispose(): void;
    /**
     * Serialized JSON representation of the component definition.
     *
     * The component's envelope metadata, which only v1.0 components carry, is
     * always written as `@metadata`. A bare `metadata` key is left to the
     * component's own property of that name, so the tree reads back the same
     * way whether or not the schema declares one.
     */
    get componentTree(): any;
}
