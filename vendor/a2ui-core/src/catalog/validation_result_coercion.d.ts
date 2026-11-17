import { z } from 'zod';
/**
 * The validity a v1.0 `ValidationResult` object carries, or `undefined` when
 * `value` is not one: an object whose `valid` member is a boolean.
 */
export declare function validityOf(value: unknown): boolean | undefined;
/**
 * Coerces a resolved `DynamicBoolean` value to a boolean.
 *
 * - A boolean is returned unchanged.
 * - A `ValidationResult` object (an object with a boolean `valid` member)
 *   coerces to its `valid` boolean.
 * - A string coerces to `true` only when it equals `"true"`
 *   case-insensitively; `"false"` and all other strings coerce to `false`.
 * - A number coerces to `value !== 0` (`NaN` coerces to `false`).
 * - `null`, `undefined`, any other object, or any array coerces to `false`.
 */
export declare function coerceDynamicBoolean(value: unknown): boolean;
/**
 * Whether `schema` is the common `DynamicBoolean` type, possibly wrapped.
 *
 * The type is recognized by the `REF:` description every copy of it carries,
 * so a schema defined in code and one loaded from a catalog document are
 * treated alike.
 */
export declare function isDynamicBooleanSchema(schema: z.ZodTypeAny): boolean;
/**
 * Coerces every value in `value` that `schema` types as `DynamicBoolean`
 * to a boolean using {@link coerceDynamicBoolean}.
 *
 * Follows the schema through object properties, array items and wrappers
 * such as `optional()`. Returns `value` itself when nothing is coerced.
 *
 * @param schema The schema of `value`, such as a function's argument schema.
 * @param value The resolved value to coerce.
 * @returns `value`, with every `DynamicBoolean` position coerced to a boolean.
 */
export declare function coerceDynamicBooleans(schema: z.ZodTypeAny, value: unknown): unknown;
/**
 * Coerces every `DynamicBoolean` position in `value` according to `schema`.
 *
 * @param schema The schema of `value`, such as a function's argument schema.
 * @param value The resolved value to coerce.
 * @returns `value`, with every `DynamicBoolean` position coerced to a boolean.
 */
export declare function coerceValidationResults(schema: z.ZodTypeAny, value: unknown): unknown;
