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
let internals;
function getInternals() {
    if (!internals) {
        throw new Error('DataContext internals have not been registered.');
    }
    return internals;
}
/** Registers `DataContext`'s package-internal callbacks from its `static` initializer. */
export function registerDataContextInternals(impl) {
    internals = impl;
}
/**
 * Resolves a value once, as an argument of a function call.
 *
 * A pending result stays a Promise, and, from v1.0, a call that fails resolves
 * to a `FailedArgument` once its failure has been reported.
 *
 * @param ctx The context to resolve in.
 * @param value The DynamicValue to resolve.
 * @param depth The current recursion depth.
 * @param userActivated Whether the evaluation was initiated by an active user action.
 * @param options `allowAgentRouting: false` makes a call the renderer does not
 *   implement fail instead of going to the agent.
 * @returns The resolved value.
 */
export function resolveArgumentValue(ctx, value, depth, userActivated, options) {
    const impl = getInternals();
    const scope = options?.allowAgentRouting === false ? impl.withFlags(ctx, { noAgentRouting: true }) : ctx;
    return impl.resolveValue(scope, value, depth, userActivated, true);
}
/**
 * Whether a call the renderer does not implement may be sent to the agent
 * from this context. It may not where the result cannot wait for the answer,
 * such as the arguments of an agent's `callRendererFunction`.
 *
 * @param ctx The context the call is evaluated in.
 * @returns Whether the call may be routed.
 */
export function allowsAgentRouting(ctx) {
    return getInternals().allowsAgentRouting(ctx);
}
/**
 * Resolves a value into a Signal that holds pending results as Promises.
 *
 * While a function call in `value` waits on an asynchronous call, the signal
 * holds a Promise that settles to the value or, from v1.0, to a
 * `FailedArgument` once the failure has been reported.
 *
 * @param ctx The context to resolve in.
 * @param value The DynamicValue to resolve.
 * @returns The Signal, whose `unsubscribe` ends its subscriptions.
 */
export function resolveSignalKeepingPending(ctx, value) {
    return getInternals().resolveSignalValue(ctx, value, 0, true);
}
/**
 * Returns a view of `ctx` in which a call the renderer does not implement
 * fails instead of being sent to the agent.
 *
 * @param ctx The context to evaluate in.
 * @returns The view.
 */
export function withoutAgentRouting(ctx) {
    return getInternals().withFlags(ctx, { noAgentRouting: true });
}
/**
 * Returns the catalog ID of the catalog function currently executing in `ctx`,
 * if any.
 *
 * @param ctx The context to inspect.
 * @returns The active catalog ID, or `undefined`.
 */
export function activeCallCatalogId(ctx) {
    return getInternals().activeCatalogId(ctx);
}
/**
 * Returns a view of `ctx` scoped to `catalogId` as the active function catalog.
 *
 * @param ctx The context to evaluate in.
 * @param catalogId The catalog ID of the executing function.
 * @param catalog Optional catalog instance so standalone RPC or direct invoker
 *   catalogs not registered in `surface.availableCatalogs` still resolve nested calls.
 * @returns The view.
 */
export function withActiveCallCatalogId(ctx, catalogId, catalog) {
    const impl = getInternals();
    if (impl.activeCatalogId(ctx) === catalogId &&
        (catalog === undefined || impl.activeCatalog(ctx) === catalog)) {
        return ctx;
    }
    return impl.withFlags(ctx, { activeCatalogId: catalogId, activeCatalog: catalog });
}
