import { Catalog, ComponentApi } from '../catalog/types.js';
import { ValidationConfig } from '../validation/integrity-checker.js';
import { ComponentGraphBound } from './component-graph-bound.js';
import { SurfaceComponentsModel } from './surface-components-model.js';
import { SurfaceModel } from './surface-model.js';
/**
 * Resolves the catalog a raw component definition belongs to on `surface`.
 */
export type ResolveComponentCatalog<T extends ComponentApi = ComponentApi> = (comp: Record<string, unknown>, surface: SurfaceModel<T>) => Catalog<T>;
/**
 * Recorded `ComponentGraphBound` and change count for a `SurfaceComponentsModel`.
 */
export interface RecordedGraphBound {
    bound: ComponentGraphBound;
    changes: number;
}
/**
 * Checks the composition constraints and, under a `validationConfig`, the
 * topology of the surface a batch of components would leave behind,
 * changing nothing.
 *
 * Under a config that allows dangling references and does not check
 * reachability (it allows orphans or a missing root), as an agent's
 * renderer state configures it, the batch is checked against the
 * components it changes when the last check of the surface left a
 * `ComponentGraphBound` that still holds: cycles and depth through the
 * bound, and composition constraints on the components whose parents,
 * children or types the batch changes. When that cannot show the batch
 * passes, the whole surface is checked, so a batch that fails reports the
 * same error as before. Under any other config every check walks the whole
 * surface.
 *
 * @param surface Surface the batch updates.
 * @param newComponents Components of the batch.
 * @param validationConfig Active validation configuration, if any.
 * @param resolveCatalog Callback resolving each component's catalog on the surface.
 * @param graphBounds Map holding the last recorded bound per surface components model.
 * @returns The bound of the surface with the batch applied, to record once
 *     it is applied, or undefined when there is none to record.
 */
export declare function validateComponentGraph<T extends ComponentApi>(surface: SurfaceModel<T>, newComponents: Array<Record<string, unknown>>, validationConfig: ValidationConfig | undefined, resolveCatalog: ResolveComponentCatalog<T>, graphBounds: WeakMap<SurfaceComponentsModel, RecordedGraphBound>): ComponentGraphBound | undefined;
/**
 * Records the `ComponentGraphBound` of a surface after its component batch has
 * been applied to `model`.
 */
export declare function recordComponentGraphBound(model: SurfaceComponentsModel, bound: ComponentGraphBound, graphBounds: WeakMap<SurfaceComponentsModel, RecordedGraphBound>): void;
/**
 * Whether `validationConfig` allows dangling references and does not
 * check reachability, because it allows orphans or a missing root.
 */
export declare function defersGraphChecks(validationConfig: ValidationConfig | undefined): boolean;
/**
 * Validates `allowedParents` and `allowedChildren` composition constraints
 * across the surface with `newComponents` applied.
 */
export declare function validateCompositionConstraints<T extends ComponentApi>(surface: SurfaceModel<T>, newComponents: Array<Record<string, unknown>>, resolveCatalog: ResolveComponentCatalog<T>, validationConfig: ValidationConfig | undefined): void;
/**
 * Checks the topology of the surface a batch would leave behind against
 * `validationConfig`, walking the whole surface.
 *
 * @param surface Surface the batch updates.
 * @param newComponents Components of the batch.
 * @param resolveCatalog Callback resolving each component's catalog on the surface.
 * @param validationConfig Active validation configuration, if any.
 * @param collectGraph Whether to return the references of that surface.
 * @returns When `collectGraph` is set, each component of that surface with
 *     the ids it references; otherwise, or without a config, undefined.
 */
export declare function validateCandidateTopology<T extends ComponentApi>(surface: SurfaceModel<T>, newComponents: Array<Record<string, unknown>>, resolveCatalog: ResolveComponentCatalog<T>, validationConfig: ValidationConfig | undefined, collectGraph?: boolean): Map<string, string[]> | undefined;
