import { z } from 'zod';
import { ActionDispatchOptions } from '../common/metadata.js';
import { Action, CheckRule, ChildList, DataBinding, FunctionCall } from '../types/common-types.js';
import type { Action as V1Action, CheckRule as V1CheckRule } from '../v1_0/schema/common-types.js';
import { ComponentContext } from './component-context.js';
import { type ChildRefAnalysisOptions } from './ref-fields.js';
/**
 * Represents the intended runtime behavior of a property parsed from its Zod
 * schema.
 *
 * - DYNAMIC: The property can be bound to the DataModel (e.g. DynamicString).
 *   The Binder will automatically subscribe to data changes and emit primitive
 *   values.
 * - ACTION: The property represents a user interaction (e.g. Action). The
 *   Binder will resolve deep payload bindings and output a ready-to-call () =>
 *   void closure.
 * - STRUCTURAL: The property dictates the rendering of child components (e.g.
 *   ChildList). The Binder outputs lists of objects containing { id, basePath }
 *   for structural layout.
 * - CHECKABLE: Special property for handling validation arrays (e.g. checks).
 *   The Binder will reactively evaluate the rules and inject isValid and
 *   validationErrors booleans into the parent object.
 * - STATIC: A primitive value that requires no reactive subscription or
 *   resolution.
 * - OBJECT / ARRAY: Recursive traversal nodes for complex nested schemas.
 */
export type BehaviorNode = {
    type: 'DYNAMIC';
    isBoolean?: boolean;
} | {
    type: 'ACTION';
} | {
    type: 'STRUCTURAL';
} | {
    type: 'CHECKABLE';
} | {
    type: 'STATIC';
} | {
    type: 'OBJECT';
    shape: Record<string, BehaviorNode>;
    catchall?: BehaviorNode;
} | {
    type: 'ARRAY';
    element: BehaviorNode;
    templateFallback?: boolean;
};
/**
 * Traverses a Zod schema tree to build a `BehaviorNode` map.
 *
 * Enables GenericBinder to determine how to handle raw JSON properties
 * without hardcoding logic for specific component types.
 *
 * @param schema Zod schema to inspect.
 * @param options Optional child-reference analysis options forwarded to ref extraction.
 * @returns Root BehaviorNode describing schema properties.
 */
export declare function scrapeSchemaBehavior(schema: z.ZodTypeAny, options?: ChildRefAnalysisOptions): BehaviorNode;
/**
 * Builds the root object `BehaviorNode` for a component's property map,
 * normalizing open non-object component schemas (`z.record(...)`, `z.any()`,
 * `z.unknown()`) into `{ type: 'OBJECT', shape }` with structural child-list
 * and `accessibility` behaviors attached.
 */
export declare function scrapeComponentBehavior(schema: z.ZodTypeAny, options?: ChildRefAnalysisOptions): BehaviorNode;
/** Types recognized as dynamic data bindings or expression function calls. */
type DynamicTypes = DataBinding | FunctionCall | {
    '@path': string;
} | {
    path: string;
} | {
    call: string;
    catalogId?: string;
    args?: Record<string, unknown>;
    returnType?: string;
} | {
    '@call': string;
    catalogId?: string;
    args?: Record<string, unknown>;
    returnType?: string;
};
/** Types recognized as user actions or function call events. */
type ActionLike = Action | V1Action | {
    event: {
        name: string;
        context?: Record<string, unknown>;
    };
} | {
    functionCall: {
        call: string;
        catalogId?: string;
        args?: Record<string, unknown>;
    };
} | {
    functionCall: {
        '@call': string;
        catalogId?: string;
        args?: Record<string, unknown>;
    };
};
/**
 * Evaluates to true for object types with a string index signature, such as
 * `Record<string, unknown>`. Every object type is assignable to the weak
 * `{functionCall?: any}` member of `ActionLike`, so these are checked
 * separately: they carry data, not an action.
 */
type HasStringIndex<T> = string extends keyof T ? true : false;
/** Evaluates to true if type T can contain a dynamic binding. */
type IsDynamic<T> = ({
    path: string;
} extends NonNullable<T> ? true : false) extends true ? true : ({
    '@path': string;
} extends NonNullable<T> ? true : false) extends true ? true : ({
    call: string;
} extends NonNullable<T> ? true : false) extends true ? true : ({
    '@call': string;
} extends NonNullable<T> ? true : false) extends true ? true : DataBinding extends NonNullable<T> ? true : FunctionCall extends NonNullable<T> ? true : false;
/**
 * Evaluates to true if type T is a child list, which can be a template as well as a list of
 * component ids. A plain list of strings is not one: the binder resolves only properties
 * declared as child lists.
 */
type IsChildList<T> = [NonNullable<T>] extends [ChildList] ? Extract<ChildList, {
    componentId: string;
}> extends NonNullable<T> ? true : false : false;
/**
 * Resolved reference to a child component with its unique identifier and data context path.
 */
export interface ResolvedChildRef {
    /** Unique identifier of the referenced child component. */
    id: string;
    /** Base data model path scoped to this child component instance. */
    basePath: string;
}
/**
 * Maps raw Zod inferred types to their resolved runtime equivalents.
 *
 * For example, an `Action` object becomes a callable `() => Promise<void>` function. The
 * binder walks lists and objects, so an action, binding or child list inside them resolves
 * too, as at the top level.
 */
export type ResolveA2uiProp<T> = [NonNullable<T>] extends [ActionLike] ? HasStringIndex<NonNullable<T>> extends true ? Exclude<T, DynamicTypes> : ((options?: ActionDispatchOptions) => Promise<void>) | Extract<T, undefined> : IsChildList<T> extends true ? (string | ResolvedChildRef)[] | Extract<T, undefined> : Exclude<T, DynamicTypes> extends never ? unknown : IsDynamic<T> extends true ? Exclude<T, DynamicTypes> : ResolveNested<T>;
/**
 * Resolves the items of a list and the properties of an object, as the binder does.
 *
 * A check rule or a list of them is left as it is, since the binder hands it on unresolved,
 * and so is an object with a string index signature, which carries data. A value bound to
 * the data model is not walked either: the binder hands on the value the model holds.
 */
type ResolveNested<T> = T extends CheckRule | V1CheckRule | readonly (CheckRule | V1CheckRule)[] ? T : T extends readonly (infer Item)[] ? ResolveA2uiProp<Item>[] : T extends (...args: never[]) => unknown ? T : T extends object ? HasStringIndex<T> extends true ? T : {
    [K in keyof T]: ResolveA2uiProp<T[K]>;
} & GenerateSetters<T> : T;
/**
 * Generates two-way binding setters for dynamic properties.
 *
 * For example, a `value: DynamicString` property produces a `setValue(val: string)` setter.
 * A property declared as a binding with no literal branch has no such value type, so its setter
 * falls back to `unknown`.
 */
export type GenerateSetters<T> = {
    [K in keyof T as IsDynamic<T[K]> extends true ? `set${Capitalize<string & K>}` : never]-?: (value: [Exclude<NonNullable<T[K]>, DynamicTypes>] extends [never] ? unknown : Exclude<NonNullable<T[K]>, DynamicTypes>) => void;
};
/**
 * Fully resolved component properties, setters, and validation flags.
 *
 * Used by framework adapters (such as createReactComponent) to provide
 * strongly-typed props to component views.
 */
export type ResolveA2uiProps<T> = (T extends object ? {
    [K in keyof T]: ResolveA2uiProp<T[K]>;
} : T) & GenerateSetters<T> & {
    isValid?: boolean;
    validationErrors?: string[];
    validationResults?: Array<{
        valid: boolean;
        message: string;
        code?: string;
        severity: 'error' | 'warning' | 'info';
    }>;
    accessibility?: ResolvedAccessibility;
    /** The v1.0 accessibility attributes, resolved. */
    '@accessibility'?: ResolvedAccessibility;
};
/** Resolved accessibility attributes of a component. */
export interface ResolvedAccessibility {
    label?: string;
    description?: string;
    live?: 'off' | 'polite' | 'assertive';
    hidden?: boolean;
}
/**
 * The maximum number of children materialized by dynamic ChildList templates.
 * Prevents unbounded resource consumption (CWE-400) when bound to massive arrays.
 */
export declare const MAX_DYNAMIC_CHILD_LIST_SIZE = 10000;
/**
 * Safely bounds array length for dynamic child lists to prevent unbounded memory allocation.
 * Returns an array of at most MAX_DYNAMIC_CHILD_LIST_SIZE items.
 */
export declare function getSafeChildList<T = unknown>(value: unknown): T[];
/**
 * Reactive property binder transforming raw A2UI component JSON into strongly-typed resolved props.
 *
 * Connects component properties to the data context, resolves dynamic bindings,
 * actions, structural templates, and validation checks.
 *
 * @template T Component property interface.
 */
export declare class GenericBinder<T> {
    private dataListeners;
    private propsListeners;
    /** Snapshot of currently resolved properties. */
    private currentProps;
    private compUnsub?;
    private isConnected;
    private context;
    private behaviorTree;
    /**
     * Whether `@accessibility` is mirrored onto `accessibility`. Decided by the
     * schema, not the payload, so that a custom `accessibility` property the
     * payload omits is not filled with the accessibility attributes.
     */
    private readonly mirrorsAccessibility;
    private actionClosures;
    private prevActionClosures?;
    /**
     * Creates a new binder for the given component context and schema.
     *
     * @param context Component context providing state and event dispatching.
     * @param schema Zod schema defining the component properties.
     * @param options Optional child-reference analysis options overriding protocol-version defaults.
     */
    constructor(context: ComponentContext, schema: z.ZodTypeAny, options?: ChildRefAnalysisOptions);
    private resolveInitialProps;
    private connect;
    private rebuildAllBindings;
    private bindDynamicValue;
    /**
     * Synchronously evaluates dynamic expressions within a nested object tree.
     *
     * Traverses objects and arrays, resolving JSON pointer paths and function calls
     * against the current data context without creating persistent reactive subscriptions.
     *
     * @param val Raw value, nested object, or dynamic expression to evaluate.
     * @param depth Current recursion depth, bounded by MAX_DYNAMIC_VALUE_DEPTH.
     * @returns Evaluated data structure with dynamic expressions resolved.
     */
    private resolveDeepSync;
    private bindAction;
    private mapTemplateChildren;
    private bindStructuralTemplate;
    private extractValidationResult;
    private bindCheckable;
    /**
     * Binds the condition of one check rule on a v1.0 surface.
     *
     * While the condition waits on an asynchronous call, such as a function
     * call routed to the agent, the rule is pending and counts as valid. When
     * the call settles the rule is evaluated; if the call failed the rule is
     * invalid. Either way subscribers are notified.
     *
     * @param condition The rule's condition.
     * @param isSync Whether the binding is resolved once, without subscriptions.
     * @param setResult Stores the rule's result.
     * @param onUpdate Recomputes the validation state and notifies subscribers.
     * @param explicitMessage Message that overrides the one the condition returns.
     * @param fallbackMessage Message used when the condition returns none.
     */
    private bindCheckCondition;
    /** The result of a check rule whose condition settled to `value`. */
    private checkResultOf;
    /** Whether a check condition is a data binding rather than a function call. */
    private isPathBoundCondition;
    private getWritableBindingPath;
    private bindObject;
    private resolveAndBind;
    private updateDeepValue;
    private cloneAndUpdate;
    /**
     * Disposes all active data subscriptions and detaches component listeners.
     */
    dispose(): void;
    private notify;
    /**
     * Subscribes to prop change notifications.
     *
     * @param listener Callback invoked whenever resolved properties update.
     * @returns A subscription object to unsubscribe.
     */
    subscribe(listener: (props: T) => void): {
        unsubscribe: () => void;
    };
    /**
     * Current snapshot of resolved component properties.
     */
    get snapshot(): T;
}
export {};
