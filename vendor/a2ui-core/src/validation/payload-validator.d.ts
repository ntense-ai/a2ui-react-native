import { CatalogInterface } from '../catalog/types.js';
import type { ValidationConfig } from './integrity-checker.js';
/**
 * Builds the error message for a v1.0 function call whose `catalogId` is not
 * a string.
 *
 * @param name Name of the function being called.
 * @returns The error message.
 */
export declare function nonStringCatalogIdMessage(name: string): string;
/**
 * Rejects a renderer call to a catalog function whose `allowedCallers` is
 * `agentOnly`.
 *
 * A call held in a component (a property binding, a check or an action) is
 * made by the renderer. A function whose `allowedCallers` is `agentOnly` runs
 * only for an agent's `callRendererFunction`, so it can't be bound into a
 * component. `DataContext` refuses such a call when it is evaluated, with the
 * same message.
 *
 * @param catalog The catalog the call runs in.
 * @param name The called function.
 * @throws {A2uiValidationError} If the catalog declares the function
 *   `agentOnly`. The error names no path; the caller sets the call's location.
 */
export declare function assertRendererMayCall(catalog: {
    readonly functions: ReadonlyMap<string, {
        readonly allowedCallers?: string;
    }>;
}, name: string): void;
/**
 * Decides whether a v1.0 nested function call runs in its component's catalog.
 *
 * A call runs in the catalog it names, or else in the surface's default
 * catalog. So a call that names no `catalogId` runs in the component's
 * catalog only when that catalog is the surface default.
 *
 * @param callCatalogId The `catalogId` the call names, if any.
 * @param catalogId ID of the component's catalog.
 * @param options.catalogIsDefault Whether the component's catalog is the
 *   surface's default catalog.
 * @returns Whether the call runs in the component's catalog.
 */
export declare function nestedCallRunsInCatalog(callCatalogId: string | undefined, catalogId: string, { catalogIsDefault }: {
    catalogIsDefault: boolean;
}): boolean;
/**
 * Validates A2UI payloads against the schemas of a single catalog.
 *
 * The validator is deliberately scoped to one catalog. Multi-catalog payloads
 * are resolved to a target catalog by the caller, which then constructs a
 * validator for it; that keeps catalog resolution and schema checking in
 * separate places and mirrors Python's `PayloadValidator`.
 *
 * From v1.0 `validateComponent` fully validates a nested function call that
 * runs in this catalog (see `nestedCallRunsInCatalog`): a call that names
 * this catalog, or names no `catalogId` in a component that names none
 * either. Any other call runs in a catalog this validator can't see, so only
 * its identifiers are checked; `MessageProcessor` resolves such a call's
 * catalog and checks it there. Any string, the empty string included, names a
 * catalog, and a non-string `catalogId` on a call is rejected. Reserved `@`
 * system functions belong to no catalog: they are always validated fully, and
 * a `catalogId` on one is rejected. A call held in a component is a renderer
 * call, so a fully checked call may not call an `agentOnly` function (see
 * `assertRendererMayCall`). Below v1.0, which has no `allowedCallers`, that
 * check is skipped.
 *
 * A component that names no `catalogId` is taken to be in the surface's
 * default catalog, where calls that name none run, so its catalogless calls
 * are judged here. `MessageProcessor` knows the surface default and passes a
 * component's `catalogId` only when its catalog is another one.
 *
 * Below v1.0 a call cannot select a catalog, so every nested call is
 * validated against this catalog whatever `catalogId` it carries.
 *
 * Every method throws on failure rather than returning a list of problems.
 * Python's `validate_component` returns its errors instead, but TypeScript
 * callers, in particular `MessageProcessor`, depend on an exception to trigger
 * atomic rollback of a partially applied update.
 *
 * Identifier checks apply only to catalogs declaring protocol version 1.0 or
 * later, matching the version gate Python applies.
 */
export declare class PayloadValidator {
    private readonly catalog;
    private readonly config?;
    /** Whether this catalog's protocol version mandates UAX #31 identifiers. */
    private readonly enforceIdentifiers;
    /**
     * Initializes a new `PayloadValidator`.
     *
     * @param catalog Catalog whose schemas define what a valid payload is.
     * @param config Validation strictness. When omitted, unknown components and
     *   functions are tolerated.
     */
    constructor(catalog: CatalogInterface<any, any>, config?: ValidationConfig | undefined);
    /**
     * Whether unrecognized components and functions are tolerated.
     *
     * An absent config means the caller is not validating at all, so unknown
     * elements pass. This preserves the gate `MessageProcessor` applied before
     * this class existed, and matches Python, whose `validate_components_update`
     * returns early when `config is None`.
     */
    private get allowUnknown();
    /**
     * Validates a single component payload against its catalog definition,
     * including any nested function calls within its properties.
     *
     * @param comp Raw component payload, including its `id` and `component`
     *   envelope keys.
     * @param knownType Component type to assume when the payload omits
     *   `component`, as happens on a partial update to an existing component.
     * @param options Validation options. `skipNestedFunctions` leaves the
     *   function calls in the properties unchecked, as pre-1.0 renderers did
     *   when validation was off.
     * @throws {A2uiValidationError} If the identifier, the component type, any
     *   property, or any nested function call fails validation.
     */
    validateComponent(comp: Record<string, unknown>, knownType?: string, options?: {
        skipNestedFunctions?: boolean;
    }): void;
    /**
     * Validates a pre-1.0 component's `ComponentCommon` `accessibility` when the
     * component schema does not declare it, removing it from `properties`
     * before strict component schema parsing.
     *
     * Below v1.0 `metadata` and `catalogId` are not part of the protocol, so a
     * component carrying them is checked against its own schema like any other
     * property.
     */
    private validateLegacyAccessibility;
    /**
     * Validates the v1.0 envelope mixins a component carries.
     *
     * A mixin the component's schema declares with its standard schema (such
     * as `checks` on a `Checkable` component) is put back into `properties`
     * under that schema's key, so the component schema checks it. Any other
     * mixin is checked here: `@metadata` against `ComponentCommon` (including
     * the UAX #31 `extensions` keys), `@catalogId` as a string,
     * `@accessibility` against `AccessibilityAttributes`. `@checks` is
     * rejected on a component that is not checkable.
     *
     * @param mixins The component's envelope mixins.
     * @param layout The component's mixin layout, or `undefined` when the
     *   component type is unknown to the catalog.
     * @param properties The component's own properties, which this may extend.
     * @param componentType The component's type, for error messages.
     * @param id The component's id, for error messages.
     * @param componentCatalogId The catalog the component names, if any.
     * @throws {A2uiValidationError} If a mixin is invalid.
     */
    private validateEnvelopeMixins;
    /**
     * Parses an envelope value against its schema.
     *
     * @throws {A2uiValidationError} If the value does not satisfy the schema,
     *   with paths under `path`.
     */
    private parseEnvelopeValue;
    /**
     * Asserts that a v1.0 call's envelope is well formed without consulting its
     * catalog: the function name and all argument keys satisfy UAX #31
     * identifier syntax, and `args`, when present, is an object.
     *
     * @param name Function name to check.
     * @param args Function arguments object whose keys are checked.
     * @throws {A2uiValidationError} If the function name or any argument key is
     *   not a valid UAX #31 identifier, or `args` is not an object.
     */
    private assertFunctionIdentifiers;
    /**
     * Recursively walks a component's property values and validates any nested
     * function call objects.
     *
     * From v1.0 a call that runs in this catalog (see `nestedCallRunsInCatalog`)
     * is validated against this catalog. Any other call runs in a catalog this
     * validator cannot see, so only its envelope (name and argument
     * identifiers) is checked; `MessageProcessor` validates it against the
     * catalog it resolves to. A non-string `catalogId` is rejected. Reserved `@`
     * system functions belong to no catalog and are validated fully.
     *
     * @param val Property value or subtree to inspect.
     * @param componentCatalogId The `catalogId` the component names, if any.
     * @throws {A2uiValidationError} If any nested function call fails schema or identifier validation.
     */
    private checkNestedCallRecord;
    /**
     * Validates a pre-1.0 function call's `returnType` against both the catalog
     * function definition and the enclosing typed `Dynamic*` slot schema.
     */
    private assertPreV10ReturnType;
    private validateNestedFunctions;
    private validateNestedArray;
    private validateRecordDirectives;
    private validateNestedRecordChildren;
    private resolveCallArgsSchema;
    /**
     * Validates the arguments of a function call against the catalog definition.
     *
     * @param name Name of the function being called.
     * @param args Arguments supplied by the payload.
     * @returns The parsed arguments object (including any schema defaults).
     * @throws {A2uiValidationError} If the function name, an argument name, or an
     *   argument value fails validation.
     */
    validateFunction(name: string, args?: Record<string, unknown>): Record<string, unknown>;
    /**
     * Validates a surface theme against the catalog's theme schema.
     *
     * A catalog that declares no theme schema accepts any theme.
     *
     * @param theme Theme payload supplied on `createSurface`.
     * @returns The parsed theme, which a schema may have defaulted or coerced.
     * @throws {A2uiValidationError} If the theme does not satisfy the schema.
     */
    validateTheme(theme: unknown): unknown;
    /**
     * Asserts that an identifier is valid if identifier enforcement is enabled.
     *
     * @param name Identifier to check.
     * @param message Error message to use when validation fails.
     * @param allowLeadingAt Whether a leading `@` is permitted.
     * @param path Optional JSON Pointer path for error context.
     * @throws {A2uiValidationError} If identifier enforcement is active and `name` is invalid.
     */
    private assertIdentifier;
}
