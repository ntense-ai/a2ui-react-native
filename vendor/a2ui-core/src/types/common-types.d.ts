/**
 * @fileoverview Shared runtime types and helper schemas for A2UI rendering
 * engines.
 *
 * Defines unversioned, internal types, schemas, and helper utilities consumed
 * by shared runtime modules (such as GenericBinder, DataContext,
 * ExpressionParser, and SchemaLoader).
 *
 * This module represents the runtime superset of the modern protocol lineage
 * (v0.9 and above), aligned with the most recent dynamic value evaluation
 * model. Version-isolated wire validation and catalog schemas are maintained
 * separately in src/v<version>/ directories, e.g. src/v1_0/.
 */
import { z } from 'zod';
export declare const ComponentIdSchema: z.ZodString;
/** REF:common_types.json#/$defs/ComponentId|The unique identifier for a component, used for both definitions and references within the same surface. */
export type ComponentId = z.infer<typeof ComponentIdSchema>;
export declare const DataBindingSchema: z.ZodEffects<z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
    '@path': z.ZodOptional<z.ZodString>;
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
}>;
/** REF:common_types.json#/$defs/DataBinding */
export type DataBinding = z.infer<typeof DataBindingSchema>;
export type DataBindingType = DataBinding;
export declare const FunctionCallSchema: z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodString>;
    '@call': z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>;
/** REF:common_types.json#/$defs/FunctionCall|Invokes a named function, combining common function properties with the catalog function definition. */
export type FunctionCall = z.infer<typeof FunctionCallSchema>;
export type FunctionCallType = FunctionCall;
export declare const DynamicStringSchema: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
    '@path': z.ZodOptional<z.ZodString>;
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
}>, z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodString>;
    '@call': z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>]>;
/** REF:common_types.json#/$defs/DynamicString|Represents a string */
export type DynamicString = z.infer<typeof DynamicStringSchema>;
export declare const DynamicBooleanSchema: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
    '@path': z.ZodOptional<z.ZodString>;
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
}>, z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodString>;
    '@call': z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>]>;
/** REF:common_types.json#/$defs/DynamicBoolean|A boolean value that can be a literal, a path, or a function call returning a boolean or a validation result object (coerced to its \'valid\' boolean). */
export type DynamicBoolean = z.infer<typeof DynamicBooleanSchema>;
export declare const AccessibilityAttributesSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>>;
    live: z.ZodOptional<z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>>;
    hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>>;
}, "strip", z.ZodTypeAny, {
    label?: string | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    } | undefined;
    description?: string | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    } | undefined;
    live?: "off" | "polite" | "assertive" | undefined;
    hidden?: boolean | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    } | undefined;
}, {
    label?: string | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    } | undefined;
    description?: string | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    } | undefined;
    live?: "off" | "polite" | "assertive" | undefined;
    hidden?: boolean | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    } | undefined;
}>;
/** REF:common_types.json#/$defs/AccessibilityAttributes|Attributes to enhance accessibility when using assistive technologies like screen readers or model understanding. */
export type AccessibilityAttributes = z.infer<typeof AccessibilityAttributesSchema>;
export declare const ExtensionsSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>;
/** REF:common_types.json#/$defs/Extensions|Optional extension metadata. Keys MUST be Unicode identifiers (UAX #31). Keys starting with \'a2ui_\' are reserved for official extensions. */
export type Extensions = z.infer<typeof ExtensionsSchema>;
export declare const ComponentCommonSchema: z.ZodObject<{
    id: z.ZodString;
    accessibility: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
        live: z.ZodOptional<z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>>;
        hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }, {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }>>;
    '@catalogId': z.ZodOptional<z.ZodString>;
    '@accessibility': z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
        live: z.ZodOptional<z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>>;
        hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }, {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }>>;
    '@metadata': z.ZodOptional<z.ZodObject<{
        extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
    }, "strict", z.ZodTypeAny, {
        extensions?: Record<string, unknown> | undefined;
    }, {
        extensions?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    accessibility?: {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
    '@catalogId'?: string | undefined;
    '@accessibility'?: {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
    '@metadata'?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
}, {
    id: string;
    accessibility?: {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
    '@catalogId'?: string | undefined;
    '@accessibility'?: {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
    '@metadata'?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
}>;
/** REF:common_types.json#/$defs/ComponentCommon */
export type ComponentCommon = z.infer<typeof ComponentCommonSchema>;
export declare const ChildListSchema: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
    componentId: z.ZodString;
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    componentId: string;
}, {
    path: string;
    componentId: string;
}>]>;
/** REF:common_types.json#/$defs/ChildList */
export type ChildList = z.infer<typeof ChildListSchema>;
export declare const DynamicValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodUnknown, "many">, z.ZodEffects<z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
    '@path': z.ZodOptional<z.ZodString>;
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
}>, z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodString>;
    '@call': z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>]>;
/** REF:common_types.json#/$defs/DynamicValue|A value that can be a literal, a path, or a function call returning any type. */
export type DynamicValue = z.infer<typeof DynamicValueSchema>;
export declare const DynamicNumberSchema: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
    '@path': z.ZodOptional<z.ZodString>;
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
}>, z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodString>;
    '@call': z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>]>;
/** REF:common_types.json#/$defs/DynamicNumber|Represents a value that can be either a literal number, a path to a number in the data model, or a function call returning a number. */
export type DynamicNumber = z.infer<typeof DynamicNumberSchema>;
export declare const DynamicStringListSchema: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodEffects<z.ZodObject<{
    path: z.ZodOptional<z.ZodString>;
    '@path': z.ZodOptional<z.ZodString>;
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
}>, z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodString>;
    '@call': z.ZodOptional<z.ZodString>;
    args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    args?: Record<string, unknown> | undefined;
    returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
    catalogId?: string | undefined;
}>]>;
/** REF:common_types.json#/$defs/DynamicStringList|Represents a value that can be either a literal array of strings, a path to a string array in the data model, or a function call returning a string array. */
export type DynamicStringList = z.infer<typeof DynamicStringListSchema>;
export declare const CheckRuleSchema: z.ZodObject<{
    condition: z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    condition: boolean | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    };
    message?: string | undefined;
}, {
    condition: boolean | {
        path?: string | undefined;
        '@path'?: string | undefined;
    } | {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    };
    message?: string | undefined;
}>;
/** REF:common_types.json#/$defs/CheckRule|A single validation check rule applied to an input component. The condition function or path evaluates to a structured validation result object or a boolean (which is coerced to a validation result object). */
export type CheckRule = z.infer<typeof CheckRuleSchema>;
export declare const CheckableSchema: z.ZodObject<{
    checks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        condition: z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }, {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }>, "many">>;
    '@checks': z.ZodOptional<z.ZodArray<z.ZodObject<{
        condition: z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }, {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    checks?: {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }[] | undefined;
    '@checks'?: {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }[] | undefined;
}, {
    checks?: {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }[] | undefined;
    '@checks'?: {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }[] | undefined;
}>;
/** REF:common_types.json#/$defs/Checkable|Properties for components that support renderer-side checks. */
export type Checkable = z.infer<typeof CheckableSchema>;
export declare const ActionSchema: z.ZodUnion<[z.ZodObject<{
    event: z.ZodObject<{
        name: z.ZodString;
        context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        context?: Record<string, unknown> | undefined;
    }, {
        name: string;
        context?: Record<string, unknown> | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    event: {
        name: string;
        context?: Record<string, unknown> | undefined;
    };
}, {
    event: {
        name: string;
        context?: Record<string, unknown> | undefined;
    };
}>, z.ZodObject<{
    functionCall: z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    functionCall: {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    };
}, {
    functionCall: {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    };
}>, z.ZodObject<{
    event: z.ZodObject<{
        name: z.ZodString;
        userMessage: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
        context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        context?: Record<string, unknown> | undefined;
        userMessage?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }, {
        name: string;
        context?: Record<string, unknown> | undefined;
        userMessage?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    event: {
        name: string;
        context?: Record<string, unknown> | undefined;
        userMessage?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    };
}, {
    event: {
        name: string;
        context?: Record<string, unknown> | undefined;
        userMessage?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    };
}>, z.ZodObject<{
    functionCall: z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    functionCall: {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    };
}, {
    functionCall: {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    };
}>]>;
/** REF:common_types.json#/$defs/Action|Defines an interaction handler that can either trigger an agent-side event or execute a local renderer-side function. */
export type Action = z.infer<typeof ActionSchema>;
export declare const CallIdSchema: z.ZodString;
/** REF:common_types.json#/$defs/CallId|The unique identifier for a function call. */
export type CallId = z.infer<typeof CallIdSchema>;
export declare const ChildSchema: z.ZodString;
/** REF:common_types.json#/$defs/Child|A reference to a single child component ID. */
export type Child = z.infer<typeof ChildSchema>;
export declare const FunctionCommonSchema: z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodString>;
    '@call': z.ZodOptional<z.ZodString>;
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
}>;
/** REF:common_types.json#/$defs/FunctionCommon|Baseline envelope properties common to all function calls. Function-specific argument schemas (\'args\') are defined individually by each function in the active catalog. */
export type FunctionCommon = z.infer<typeof FunctionCommonSchema>;
export declare const IndexSystemFunctionSchema: z.ZodEffects<z.ZodObject<{
    call: z.ZodOptional<z.ZodLiteral<"@index">>;
    '@call': z.ZodOptional<z.ZodLiteral<"@index">>;
    args: z.ZodOptional<z.ZodObject<{
        offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        offset?: number | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }, {
        offset?: number | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: number | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: number | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
}>, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: number | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
}, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: number | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    } | undefined;
}>;
/** REF:common_types.json#/$defs/IndexSystemFunction|Returns the 0-based index of the current item when rendering a dynamic list from a template. This function MUST ONLY be available when evaluating template items within a list context. */
export type IndexSystemFunction = z.infer<typeof IndexSystemFunctionSchema>;
export declare const SurfaceSchema: z.ZodObject<{
    component: z.ZodOptional<z.ZodLiteral<"Surface">>;
    child: z.ZodOptional<z.ZodLiteral<"root">>;
}, "strict", z.ZodTypeAny, {
    component?: "Surface" | undefined;
    child?: "root" | undefined;
}, {
    component?: "Surface" | undefined;
    child?: "root" | undefined;
}>;
/** REF:common_types.json#/$defs/Surface|The reserved canonical container component representing an A2UI surface. The Surface component is immutable and always has \'child\': \'root\'. */
export type Surface = z.infer<typeof SurfaceSchema>;
export declare const FunctionResponseSchema: z.ZodObject<{
    functionCallId: z.ZodString;
    value: z.ZodOptional<z.ZodUnknown>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        code: string;
        message: string;
    }, {
        code: string;
        message: string;
    }>>;
}, "strict", z.ZodTypeAny, {
    functionCallId: string;
    value?: unknown;
    error?: {
        code: string;
        message: string;
    } | undefined;
}, {
    functionCallId: string;
    value?: unknown;
    error?: {
        code: string;
        message: string;
    } | undefined;
}>;
/** REF:common_types.json#/$defs/FunctionResponse|The return response matching a callAgentFunction or callRendererFunction invocation. */
export type FunctionResponse = z.infer<typeof FunctionResponseSchema>;
/**
 * Registry of reusable common schema definitions across A2UI catalogs and protocols.
 */
export declare const CommonSchemas: {
    ComponentId: z.ZodString;
    DataBinding: z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>;
    FunctionCall: z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>;
    DynamicString: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>;
    DynamicBoolean: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>;
    AccessibilityAttributes: z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
        live: z.ZodOptional<z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>>;
        hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }, {
        label?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        description?: string | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        } | undefined;
    }>;
    Extensions: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>;
    ComponentCommon: z.ZodObject<{
        id: z.ZodString;
        accessibility: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
            description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
            live: z.ZodOptional<z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>>;
            hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }, {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }>>;
        '@catalogId': z.ZodOptional<z.ZodString>;
        '@accessibility': z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
            description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
            live: z.ZodOptional<z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>>;
            hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }, {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }>>;
        '@metadata': z.ZodOptional<z.ZodObject<{
            extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
        }, "strict", z.ZodTypeAny, {
            extensions?: Record<string, unknown> | undefined;
        }, {
            extensions?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        accessibility?: {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
        '@catalogId'?: string | undefined;
        '@accessibility'?: {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
        '@metadata'?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }, {
        id: string;
        accessibility?: {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
        '@catalogId'?: string | undefined;
        '@accessibility'?: {
            label?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            description?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
        '@metadata'?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }>;
    ChildList: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
        componentId: z.ZodString;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        componentId: string;
    }, {
        path: string;
        componentId: string;
    }>]>;
    DynamicValue: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodUnknown, "many">, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>]>;
    DynamicNumber: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>;
    DynamicStringList: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodEffects<z.ZodObject<{
        path: z.ZodOptional<z.ZodString>;
        '@path': z.ZodOptional<z.ZodString>;
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
    }>, z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        args?: Record<string, unknown> | undefined;
        returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
        catalogId?: string | undefined;
    }>]>;
    CheckRule: z.ZodObject<{
        condition: z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>, z.ZodEffects<z.ZodObject<{
            path: z.ZodOptional<z.ZodString>;
            '@path': z.ZodOptional<z.ZodString>;
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
        }>, z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }, {
        condition: boolean | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
        message?: string | undefined;
    }>;
    Checkable: z.ZodObject<{
        checks: z.ZodOptional<z.ZodArray<z.ZodObject<{
            condition: z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }, {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }>, "many">>;
        '@checks': z.ZodOptional<z.ZodArray<z.ZodObject<{
            condition: z.ZodUnion<[z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>;
            message: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }, {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        checks?: {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }[] | undefined;
        '@checks'?: {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }[] | undefined;
    }, {
        checks?: {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }[] | undefined;
        '@checks'?: {
            condition: boolean | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            };
            message?: string | undefined;
        }[] | undefined;
    }>;
    Action: z.ZodUnion<[z.ZodObject<{
        event: z.ZodObject<{
            name: z.ZodString;
            context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strict", z.ZodTypeAny, {
            name: string;
            context?: Record<string, unknown> | undefined;
        }, {
            name: string;
            context?: Record<string, unknown> | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        event: {
            name: string;
            context?: Record<string, unknown> | undefined;
        };
    }, {
        event: {
            name: string;
            context?: Record<string, unknown> | undefined;
        };
    }>, z.ZodObject<{
        functionCall: z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        functionCall: {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
    }, {
        functionCall: {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
    }>, z.ZodObject<{
        event: z.ZodObject<{
            name: z.ZodString;
            userMessage: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
            context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strict", z.ZodTypeAny, {
            name: string;
            context?: Record<string, unknown> | undefined;
            userMessage?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }, {
            name: string;
            context?: Record<string, unknown> | undefined;
            userMessage?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        event: {
            name: string;
            context?: Record<string, unknown> | undefined;
            userMessage?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        };
    }, {
        event: {
            name: string;
            context?: Record<string, unknown> | undefined;
            userMessage?: string | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        };
    }>, z.ZodObject<{
        functionCall: z.ZodEffects<z.ZodObject<{
            call: z.ZodOptional<z.ZodString>;
            '@call': z.ZodOptional<z.ZodString>;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        functionCall: {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
    }, {
        functionCall: {
            call?: string | undefined;
            '@call'?: string | undefined;
            args?: Record<string, unknown> | undefined;
            returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
            catalogId?: string | undefined;
        };
    }>]>;
    CallId: z.ZodString;
    Child: z.ZodString;
    FunctionCommon: z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodString>;
        '@call': z.ZodOptional<z.ZodString>;
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
    }>;
    IndexSystemFunction: z.ZodEffects<z.ZodObject<{
        call: z.ZodOptional<z.ZodLiteral<"@index">>;
        '@call': z.ZodOptional<z.ZodLiteral<"@index">>;
        args: z.ZodOptional<z.ZodObject<{
            offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
                path: z.ZodOptional<z.ZodString>;
                '@path': z.ZodOptional<z.ZodString>;
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
            }>, z.ZodEffects<z.ZodObject<{
                call: z.ZodOptional<z.ZodString>;
                '@call': z.ZodOptional<z.ZodString>;
                args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                returnType: z.ZodOptional<z.ZodEnum<["string", "number", "boolean", "array", "object", "any", "void"]>>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            offset?: number | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }, {
            offset?: number | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: number | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: number | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
    }>, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: number | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
    }, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: number | {
                path?: string | undefined;
                '@path'?: string | undefined;
            } | {
                call?: string | undefined;
                '@call'?: string | undefined;
                args?: Record<string, unknown> | undefined;
                returnType?: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | undefined;
                catalogId?: string | undefined;
            } | undefined;
        } | undefined;
    }>;
    Surface: z.ZodObject<{
        component: z.ZodOptional<z.ZodLiteral<"Surface">>;
        child: z.ZodOptional<z.ZodLiteral<"root">>;
    }, "strict", z.ZodTypeAny, {
        component?: "Surface" | undefined;
        child?: "root" | undefined;
    }, {
        component?: "Surface" | undefined;
        child?: "root" | undefined;
    }>;
    FunctionResponse: z.ZodObject<{
        functionCallId: z.ZodString;
        value: z.ZodOptional<z.ZodUnknown>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            code: string;
            message: string;
        }, {
            code: string;
            message: string;
        }>>;
    }, "strict", z.ZodTypeAny, {
        functionCallId: string;
        value?: unknown;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }, {
        functionCallId: string;
        value?: unknown;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }>;
};
