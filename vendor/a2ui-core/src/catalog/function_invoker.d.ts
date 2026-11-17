import { DataContext } from '../resolution/data-context.js';
/**
 * Invokes a catalog function by name and returns its result synchronously or as a Signal.
 *
 * @template T The expected return type of the function invocation (defaults to `any`).
 * @param name The name of the function to invoke.
 * @param args The arguments to pass to the function.
 * @param context The data context in which the function is being executed.
 * @param abortSignal An optional AbortSignal for asynchronous or long-running operations.
 * @returns The result of the function call, typically a primitive value or a Signal.
 */
export type FunctionInvoker<T = any> = (name: string, args: Record<string, unknown>, context: DataContext, abortSignal?: AbortSignal) => T;
