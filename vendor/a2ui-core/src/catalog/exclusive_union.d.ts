import { z } from 'zod';
import { type OverrideCallback } from 'zod-to-json-schema';
/**
 * Returns a schema that accepts a value only when exactly one of `branches`
 * accepts it, the semantics of a JSON Schema `oneOf`. A plain `z.union` has
 * the semantics of `anyOf`.
 *
 * @param branches The union's branches, at least two.
 */
export declare function exclusiveUnion(branches: readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]): z.ZodTypeAny;
/**
 * A `zod-to-json-schema` override that writes a union made with
 * {@link exclusiveUnion} as `oneOf`, so that it keeps its semantics. Every
 * other schema, including a plain `z.union`, which `zod-to-json-schema`
 * writes as `anyOf`, is converted as usual.
 */
export declare const exclusiveUnionOverride: OverrideCallback;
