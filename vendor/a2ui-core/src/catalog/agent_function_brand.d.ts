import type { AgentFunction } from './agent_function.js';
/**
 * Brand set on every `AgentFunction`, so `isAgentFunction` recognizes one
 * from another copy of this package.
 *
 * Kept apart from `AgentFunction` so that modules `AgentFunction` depends on,
 * such as the catalog serializer, can recognize one without a circular
 * import.
 */
export declare const AGENT_FUNCTION_BRAND: unique symbol;
/**
 * Type guard checking whether a value is an {@link AgentFunction}.
 */
export declare function isAgentFunction(value: unknown): value is AgentFunction;
