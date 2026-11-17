import { z } from 'zod';
import { type ChildRefKind, type RefSchemaOptions, markChildRef, childRefKindOf } from './child-ref-helpers.js';
import { ChildListSchema, ComponentIdSchema } from './common-types.js';
export { type ChildRefKind, type RefSchemaOptions, markChildRef, childRefKindOf };
/**
 * The maximum number of arguments accepted in a single function call.
 *
 * Caps the work a single call can schedule, so an oversized `args` payload
 * cannot exhaust memory by creating one reactive listener per key (CWE-400).
 * Enforced by `DataContext.validateFunctionArgs` before any argument is
 * resolved.
 */
export declare const MAX_FUNCTION_CALL_ARGS = 1000;
/**
 * Creates or customizes a ComponentId schema without losing its reference pointer metadata.
 *
 * @param options Configuration options including custom description.
 * @returns The configured ComponentId schema.
 */
export declare function componentId(options?: RefSchemaOptions): typeof ComponentIdSchema;
/**
 * Creates or customizes a ChildList schema without losing its reference pointer metadata.
 *
 * @param options Configuration options including custom description.
 * @returns The configured ChildList schema.
 */
export declare function childList(options?: RefSchemaOptions): typeof ChildListSchema;
/**
 * Generic component definition payload schema.
 */
export declare const AnyComponentSchema: z.ZodObject<{
    component: z.ZodString;
    id: z.ZodOptional<z.ZodLazy<z.ZodString>>;
    weight: z.ZodOptional<z.ZodNumber>;
}, "passthrough", z.ZodTypeAny, z.objectOutputType<{
    component: z.ZodString;
    id: z.ZodOptional<z.ZodLazy<z.ZodString>>;
    weight: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">, z.objectInputType<{
    component: z.ZodString;
    id: z.ZodOptional<z.ZodLazy<z.ZodString>>;
    weight: z.ZodOptional<z.ZodNumber>;
}, z.ZodTypeAny, "passthrough">>;
/** Generic component definition payload. */
export type AnyComponent = z.infer<typeof AnyComponentSchema>;
