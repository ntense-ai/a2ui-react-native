import { z } from 'zod';
/**
 * Classification kind for a schema marked as a child reference.
 */
export type ChildRefKind = 'component-id' | 'child-list';
/**
 * Stamps the child-reference kind into the schema's zod metadata. Methods
 * like `.describe()` and `.optional()` rebuild schemas from `_def`, so the
 * flag survives them; the `REF:` description remains the wire-facing pointer
 * the capabilities generator resolves into a `$ref`.
 */
export declare function markChildRef<T extends z.ZodTypeAny>(schema: T, ref: ChildRefKind): T;
/**
 * Extracts the child reference kind associated with a Zod schema, if present.
 *
 * @param schema Zod schema to inspect.
 * @returns The child reference kind or undefined if not marked.
 */
export declare function childRefKindOf(schema: z.ZodTypeAny): ChildRefKind | undefined;
/**
 * Options for generating child reference schemas with custom descriptions.
 */
export interface RefSchemaOptions {
    /** Prose appended after the `REF:` pointer; shown in generated capabilities. */
    readonly description?: string;
}
