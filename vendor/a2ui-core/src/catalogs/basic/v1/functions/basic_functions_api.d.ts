import { z } from 'zod';
/**
 * Checks that the value is not null, undefined, or empty.
 */
export declare const RequiredApi: {
    name: "required";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodEffects<z.ZodAny, any, any>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
};
/**
 * Checks that the value matches a regular expression string.
 */
export declare const RegexApi: {
    name: "regex";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        pattern: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        pattern: string;
        value?: any;
    }, {
        pattern: string;
        value?: any;
    }>;
};
/**
 * Checks string length constraints.
 */
export declare const LengthApi: {
    name: "length";
    returnType: "validationResult";
    description: string;
    schema: z.ZodEffects<z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
};
/**
 * Checks numeric range constraints.
 */
export declare const NumericApi: {
    name: "numeric";
    returnType: "validationResult";
    description: string;
    schema: z.ZodEffects<z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
};
/**
 * Checks that the value is a valid email address.
 */
export declare const EmailApi: {
    name: "email";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
};
/**
 * Performs string interpolation of data model values and other functions in the catalog functions list and returns the resulting string. The value string can contain interpolated expressions in the `${expression}` format. Supported expression types include: JSON Pointer paths to the data model (e.g., `${/absolute/path}` or `${relative/path}`), and renderer-side function calls (e.g., `${now()}`). Function arguments must be named (e.g., `${formatDate(value:${/currentDate}, format:'MM-dd')}`). To include a literal `${` sequence, escape it as `\${`.
 */
export declare const FormatStringApi: {
    name: "formatString";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
};
/**
 * Formats a number with the specified grouping and decimal precision.
 */
export declare const FormatNumberApi: {
    name: "formatNumber";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        decimals: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        grouping: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        decimals?: any;
        grouping?: any;
    }, {
        value?: any;
        decimals?: any;
        grouping?: any;
    }>;
};
/**
 * Formats a number as a currency string.
 */
export declare const FormatCurrencyApi: {
    name: "formatCurrency";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        currency: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        decimals: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        grouping: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        decimals?: any;
        grouping?: any;
        currency?: any;
    }, {
        value?: any;
        decimals?: any;
        grouping?: any;
        currency?: any;
    }>;
};
/**
 * Formats a timestamp into a string using a pattern.
 */
export declare const FormatDateApi: {
    name: "formatDate";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        format: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        format?: any;
    }, {
        value?: any;
        format?: any;
    }>;
};
/**
 * Returns a localized string based on the Common Locale Data Repository (CLDR) plural category of the count (zero, one, two, few, many, other). Requires an 'other' fallback. For English, just use 'one' and 'other'.
 */
export declare const PluralizeApi: {
    name: "pluralize";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        zero: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        one: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        two: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        few: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        many: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        other: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        many?: any;
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        other?: any;
    }, {
        value?: any;
        many?: any;
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        other?: any;
    }>;
};
/**
 * Opens the specified URL in a browser or handler (requires user activation). This function has no return value.
 */
export declare const OpenUrlApi: {
    name: "openUrl";
    returnType: "void";
    requiresUserActivation: true;
    description: string;
    schema: z.ZodObject<{
        url: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        url?: any;
    }, {
        url?: any;
    }>;
};
/**
 * Performs a logical AND operation on a list of boolean values.
 */
export declare const AndApi: {
    name: "and";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        values: z.ZodArray<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>, "many">;
    }, "strict", z.ZodTypeAny, {
        values: any[];
    }, {
        values: any[];
    }>;
};
/**
 * Performs a logical OR operation on a list of boolean values.
 */
export declare const OrApi: {
    name: "or";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        values: z.ZodArray<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>, "many">;
    }, "strict", z.ZodTypeAny, {
        values: any[];
    }, {
        values: any[];
    }>;
};
/**
 * Performs a logical NOT operation on a boolean value.
 */
export declare const NotApi: {
    name: "not";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
};
export declare const BASIC_FUNCTION_APIS: ({
    name: "required";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodEffects<z.ZodAny, any, any>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
} | {
    name: "regex";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        pattern: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        pattern: string;
        value?: any;
    }, {
        pattern: string;
        value?: any;
    }>;
} | {
    name: "length";
    returnType: "validationResult";
    description: string;
    schema: z.ZodEffects<z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
} | {
    name: "numeric";
    returnType: "validationResult";
    description: string;
    schema: z.ZodEffects<z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
} | {
    name: "email";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
} | {
    name: "formatString";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
} | {
    name: "formatNumber";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        decimals: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        grouping: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        decimals?: any;
        grouping?: any;
    }, {
        value?: any;
        decimals?: any;
        grouping?: any;
    }>;
} | {
    name: "formatCurrency";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        currency: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        decimals: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        grouping: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        decimals?: any;
        grouping?: any;
        currency?: any;
    }, {
        value?: any;
        decimals?: any;
        grouping?: any;
        currency?: any;
    }>;
} | {
    name: "formatDate";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        format: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        format?: any;
    }, {
        value?: any;
        format?: any;
    }>;
} | {
    name: "pluralize";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        zero: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        one: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        two: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        few: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        many: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        other: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        many?: any;
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        other?: any;
    }, {
        value?: any;
        many?: any;
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        other?: any;
    }>;
} | {
    name: "openUrl";
    returnType: "void";
    requiresUserActivation: true;
    description: string;
    schema: z.ZodObject<{
        url: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        url?: any;
    }, {
        url?: any;
    }>;
} | {
    name: "and";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        values: z.ZodArray<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>, "many">;
    }, "strict", z.ZodTypeAny, {
        values: any[];
    }, {
        values: any[];
    }>;
} | {
    name: "or";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        values: z.ZodArray<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>, "many">;
    }, "strict", z.ZodTypeAny, {
        values: any[];
    }, {
        values: any[];
    }>;
} | {
    name: "not";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
})[];
export declare const V10_SPEC_FUNCTION_APIS: ({
    name: "required";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodEffects<z.ZodAny, any, any>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
} | {
    name: "regex";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        pattern: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        pattern: string;
        value?: any;
    }, {
        pattern: string;
        value?: any;
    }>;
} | {
    name: "length";
    returnType: "validationResult";
    description: string;
    schema: z.ZodEffects<z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
} | {
    name: "numeric";
    returnType: "validationResult";
    description: string;
    schema: z.ZodEffects<z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        min: z.ZodOptional<z.ZodNumber>;
        max: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
} | {
    name: "email";
    returnType: "validationResult";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
} | {
    name: "formatString";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
} | {
    name: "formatNumber";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        decimals: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        grouping: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        decimals?: any;
        grouping?: any;
    }, {
        value?: any;
        decimals?: any;
        grouping?: any;
    }>;
} | {
    name: "formatCurrency";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        currency: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        decimals: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        grouping: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        decimals?: any;
        grouping?: any;
        currency?: any;
    }, {
        value?: any;
        decimals?: any;
        grouping?: any;
        currency?: any;
    }>;
} | {
    name: "formatDate";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        format: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        format?: any;
    }, {
        value?: any;
        format?: any;
    }>;
} | {
    name: "pluralize";
    returnType: "string";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
        zero: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        one: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        two: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        few: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        many: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>>;
        other: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        many?: any;
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        other?: any;
    }, {
        value?: any;
        many?: any;
        zero?: any;
        one?: any;
        two?: any;
        few?: any;
        other?: any;
    }>;
} | {
    name: "openUrl";
    returnType: "void";
    requiresUserActivation: true;
    description: string;
    schema: z.ZodObject<{
        url: z.ZodUnion<[z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        url?: any;
    }, {
        url?: any;
    }>;
} | {
    name: "and";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        values: z.ZodArray<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>, "many">;
    }, "strict", z.ZodTypeAny, {
        values: any[];
    }, {
        values: any[];
    }>;
} | {
    name: "or";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        values: z.ZodArray<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>, "many">;
    }, "strict", z.ZodTypeAny, {
        values: any[];
    }, {
        values: any[];
    }>;
} | {
    name: "not";
    returnType: "boolean";
    description: string;
    schema: z.ZodObject<{
        value: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>]>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
})[];
