/**
 * Resolves the catalog an item on a surface uses; the implementation behind
 * `SurfaceModel.resolveCatalog`.
 *
 * Internal to the package: it is not exported from any barrel. It is a free
 * function so that `DataContext`, which tests and integrations often construct
 * over a partial surface stand-in, applies the same rule without requiring the
 * method. `availableCatalogs` is therefore read defensively.
 *
 * @param surface Surface, or a stand-in carrying the fields read here.
 * @param catalogId Catalog the item names, or `undefined` when it names none.
 * @param subject Description of the item for error messages.
 * @returns The catalog the item resolves to.
 * @throws {A2uiCatalogError} If the named catalog is not available on the
 *   surface, or if the item names none and the surface has no default catalog.
 */
export declare function resolveSurfaceCatalog<C>(surface: {
    readonly id: string;
    readonly defaultCatalog: C | undefined;
    readonly availableCatalogs?: ReadonlyMap<string, C>;
}, catalogId: string | undefined, subject: string): C;
