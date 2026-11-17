import { z } from 'zod';
import { FunctionImplementation } from '../../catalog/types.js';
/**
 * System function definition for computing iteration indices in array contexts.
 *
 * Evaluates the 0-based iteration index with an optional numerical offset.
 */
export declare const IndexApi: {
    /** Name of the system function. */
    name: "@index";
    /** Declared return type for catalog type checking. */
    returnType: "number";
    /** Scope of callers permitted to invoke this function. */
    allowedCallers: "rendererOnly";
    /**
     * Zod schema validating function arguments.
     *
     * `offset` is a DynamicNumber, so a payload may bind it to a path or a
     * nested call. Once resolved, the value is coerced to a number.
     */
    schema: z.ZodObject<{
        offset: z.ZodOptional<z.ZodUnion<[z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>, z.ZodNumber]>>;
    }, "strip", z.ZodTypeAny, {
        offset?: any;
    }, {
        offset?: any;
    }>;
};
/**
 * Implementation of the `@index` system function.
 *
 * Returns the 0-based iteration index of the enclosing collection template,
 * plus an optional offset.
 *
 * @throws {A2uiValidationError} If called outside a collection template iteration scope.
 */
export declare const IndexImplementation: FunctionImplementation;
/**
 * Standard v1.0 system function implementations.
 */
export declare const SYSTEM_FUNCTIONS: FunctionImplementation[];
