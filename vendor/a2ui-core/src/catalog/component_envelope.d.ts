/**
 * Component envelope mixins: the protocol fields a component object carries
 * beside its own properties (`ComponentCommon` and `Checkable`).
 *
 * From v1.0 these are written with an `@` prefix (`@metadata`, `@catalogId`,
 * `@accessibility`, `@checks`), which leaves the bare names free for a
 * catalog's own component properties. During the transition a v1.0 component
 * may still carry a legacy bare `metadata`, `catalogId`, `accessibility`, or
 * `checks` mixin, as long as its schema does not declare a custom property of
 * that name. Below v1.0 the bare `accessibility` and `checks` are the mixins,
 * and `metadata` and `catalogId` are ordinary component properties.
 *
 * TODO(#4082): remove the legacy bare v1.0 mixin fallback. It only exists so
 * agents written before the `@` keys keep working during the transition.
 */
import { z } from 'zod';
/** The bare names of the component envelope mixins. */
export declare const COMPONENT_MIXIN_KEYS: readonly ["metadata", "catalogId", "accessibility", "checks"];
/** The bare name of a component envelope mixin. */
export type ComponentMixinKey = (typeof COMPONENT_MIXIN_KEYS)[number];
/** The v1.0 wire key of a component envelope mixin, such as `@metadata`. */
export type AtComponentMixinKey = `@${ComponentMixinKey}`;
/**
 * The v1.0 wire keys of the component envelope mixins, which are allowed as
 * single-`@` keys at the root of a component object and nowhere else.
 */
export declare const AT_COMPONENT_MIXIN_KEYS: ReadonlySet<string>;
/**
 * Returns the v1.0 wire key of a component envelope mixin.
 *
 * @param key The mixin's bare name.
 * @returns The `@`-prefixed key.
 */
export declare function atMixinKey(key: ComponentMixinKey): AtComponentMixinKey;
/**
 * Marks a Zod schema as the standard `ComponentCommon` or `Checkable` schema
 * of a mixin property, so that a component declaring a property with this
 * schema is not taken to declare a custom property of the same name.
 *
 * @param schema The mixin property's schema.
 * @returns `schema`, for chaining.
 */
export declare function markStandardMixinSchema<T extends z.ZodTypeAny>(schema: T): T;
/**
 * How a component's schema declares the envelope mixins.
 */
export interface ComponentMixinLayout {
    /**
     * Bare mixin names the component's schema declares as its own custom
     * properties. On v1.0 such a bare key is a component property, and only
     * its `@`-prefixed form is the mixin.
     */
    readonly customKeys: ReadonlySet<ComponentMixinKey>;
    /**
     * For each mixin the component's schema declares with its standard
     * schema, the schema key that holds it (`checks` or `@checks`, say).
     */
    readonly schemaKeys: ReadonlyMap<ComponentMixinKey, string>;
}
/**
 * Describes how a component's schema declares the envelope mixins: which bare
 * mixin names it declares as custom properties, and under which keys it
 * declares the standard mixins.
 *
 * Properties declared in any branch of an intersection or union count. A bare
 * mixin name is the standard mixin only if every branch that declares it uses
 * the standard schema; otherwise it is a custom property.
 *
 * @param schema The component's schema, if known.
 * @returns The component's mixin layout.
 */
export declare function componentMixinLayout(schema: z.ZodTypeAny | undefined): ComponentMixinLayout;
/**
 * Adjusts a v1.0 component's mixin layout so that a legacy bare `catalogId`
 * routing the component is not also kept as one of its properties.
 *
 * Whether a bare `catalogId` names the component's catalog is decided by the
 * component's schema in the surface's default catalog, because the catalog
 * it names is not known until then. When that schema declares no custom
 * `catalogId`, the bare key routes the component, so it is the mixin even if
 * the schema in the catalog it routes to declares a `catalogId` of its own.
 *
 * @param layout The component's layout in the catalog it resolved to.
 * @param comp The raw component object.
 * @param defaultCatalogSchema The component's schema in the surface's
 *   default catalog, if that catalog defines its type.
 * @returns `layout`, or a copy that treats the bare `catalogId` as the mixin.
 */
export declare function routeLegacyCatalogId(layout: ComponentMixinLayout, comp: Readonly<Record<string, unknown>>, defaultCatalogSchema: z.ZodTypeAny | undefined): ComponentMixinLayout;
/** A component envelope mixin read from a v1.0 component object. */
export interface ComponentMixinValue {
    /** The mixin's value. */
    readonly value: unknown;
    /** The wire key it was read from: `@metadata`, or legacy `metadata`. */
    readonly wireKey: string;
}
/** A v1.0 component object split into its envelope and its properties. */
export interface SplitComponent {
    /**
     * The component's own properties: everything but `id`, `component`, and
     * the envelope mixins.
     */
    readonly properties: Record<string, unknown>;
    /** The envelope mixins the component object carries. */
    readonly mixins: Partial<Record<ComponentMixinKey, ComponentMixinValue>>;
}
/**
 * Splits a v1.0 component object into its envelope mixins and its own
 * properties.
 *
 * A mixin is read from its `@`-prefixed key, or else from its legacy bare
 * key when the component's schema declares no custom property of that name.
 * A legacy bare `checks` is a mixin only on a checkable component; on any
 * other component it stays a property, which the component's schema rejects.
 *
 * @param comp The raw component object.
 * @param layout The component's mixin layout.
 * @returns The component's properties and envelope mixins.
 * @throws {A2uiValidationError} If the component object carries both the
 *   `@`-prefixed and the legacy bare key of a mixin its schema declares no
 *   custom property for.
 */
export declare function splitComponentEnvelope(comp: Readonly<Record<string, unknown>>, layout: ComponentMixinLayout): SplitComponent;
/** The state a component object stores in its `ComponentModel`. */
export interface ComponentPayloadState {
    /** The component's properties, as `ComponentModel.properties` holds them. */
    readonly properties: Record<string, unknown>;
    /** The component's envelope metadata, if any. */
    readonly metadata: unknown;
}
/**
 * Reads the state a component object stores in its `ComponentModel`.
 *
 * Below v1.0 every key but `id` and `component` is a property, including a
 * `metadata` or `catalogId` the component declares, and the component has no
 * envelope metadata.
 *
 * From v1.0 the envelope mixins are split from the component's properties
 * (see {@link splitComponentEnvelope}): `@metadata` becomes the component's
 * metadata, `@catalogId` selects its catalog and is not stored, and
 * `@accessibility` and `@checks` are stored under their `@`-prefixed keys,
 * leaving the bare names to the component's own properties.
 *
 * @param comp The raw component object.
 * @param protocolVersion The protocol version of the surface.
 * @param schema The component's schema, if known.
 * @param options.defaultCatalogSchema The component's schema in the surface's
 *   default catalog, when the caller resolved the component's catalog; a
 *   legacy bare `catalogId` that routed the component is then dropped from its
 *   properties (see {@link routeLegacyCatalogId}).
 * @returns The component's properties and metadata.
 * @throws {A2uiValidationError} If a v1.0 component object carries both forms
 *   of a mixin; see {@link splitComponentEnvelope}.
 */
export declare function componentPayloadState(comp: Readonly<Record<string, unknown>>, protocolVersion: string | undefined, schema: z.ZodTypeAny | undefined, options?: {
    readonly defaultCatalogSchema: z.ZodTypeAny | undefined;
}): ComponentPayloadState;
