import { z } from 'zod';
export declare const FunctionCallValidationSchemaSchema: z.ZodObject<{
    type: z.ZodLiteral<"object">;
    description: z.ZodOptional<z.ZodString>;
    properties: z.ZodObject<{
        '@call': z.ZodObject<{
            const: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            const: string;
        }, {
            const: string;
        }>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strict", z.ZodTypeAny, {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    }, {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    }>;
    required: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "object";
    properties: {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    };
    required: string[];
    description?: string | undefined;
}, {
    type: "object";
    properties: {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    };
    required: string[];
    description?: string | undefined;
}>;
export type FunctionCallValidationSchema = z.infer<typeof FunctionCallValidationSchemaSchema>;
export type FunctionCallValidationSchemaInput = z.input<typeof FunctionCallValidationSchemaSchema>;
export declare const FunctionDefinitionSchema: z.ZodEffects<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodObject<{
    type: z.ZodLiteral<"object">;
    description: z.ZodOptional<z.ZodString>;
    properties: z.ZodObject<{
        '@call': z.ZodObject<{
            const: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            const: string;
        }, {
            const: string;
        }>;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    }, "strict", z.ZodTypeAny, {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    }, {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    }>;
    required: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "object";
    properties: {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    };
    required: string[];
    description?: string | undefined;
}, {
    type: "object";
    properties: {
        '@call': {
            const: string;
        };
        args?: Record<string, any> | undefined;
    };
    required: string[];
    description?: string | undefined;
}>, z.ZodIntersection<z.ZodObject<{
    returnType: z.ZodEnum<["string", "number", "boolean", "array", "object", "validationResult", "any", "void"]>;
    allowedCallers: z.ZodDefault<z.ZodEnum<["rendererOnly", "agentOnly", "rendererOrAgent"]>>;
    requiresUserActivation: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    returnType: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | "validationResult";
    allowedCallers: "rendererOnly" | "agentOnly" | "rendererOrAgent";
    requiresUserActivation: boolean;
}, {
    returnType: "string" | "number" | "boolean" | "object" | "array" | "void" | "any" | "validationResult";
    allowedCallers?: "rendererOnly" | "agentOnly" | "rendererOrAgent" | undefined;
    requiresUserActivation?: boolean | undefined;
}>, z.ZodAny>>>, any, any>;
export type FunctionDefinition = z.infer<typeof FunctionDefinitionSchema>;
export type FunctionDefinitionInput = z.input<typeof FunctionDefinitionSchema>;
export declare const LeafDefinitionSchema: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodEffects<z.ZodAny, any, any>>>;
export type LeafDefinition = z.infer<typeof LeafDefinitionSchema>;
export type LeafDefinitionInput = z.input<typeof LeafDefinitionSchema>;
export declare const ComponentDefinitionSchema: z.ZodEffects<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodObject<{
    allowedParents: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
    allowedChildren: z.ZodOptional<z.ZodEffects<z.ZodArray<z.ZodString, "many">, string[], string[]>>;
    metadata: z.ZodOptional<z.ZodObject<{
        extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
    }, "strict", z.ZodTypeAny, {
        extensions?: Record<string, unknown> | undefined;
    }, {
        extensions?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    metadata?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
    allowedParents?: string[] | undefined;
    allowedChildren?: string[] | undefined;
}, {
    metadata?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
    allowedParents?: string[] | undefined;
    allowedChildren?: string[] | undefined;
}>>>, Record<string, any> & {
    metadata?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
    allowedParents?: string[] | undefined;
    allowedChildren?: string[] | undefined;
}, Record<string, any> & {
    metadata?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
    allowedParents?: string[] | undefined;
    allowedChildren?: string[] | undefined;
}>;
export type ComponentDefinition = z.infer<typeof ComponentDefinitionSchema>;
export type ComponentDefinitionInput = z.input<typeof ComponentDefinitionSchema>;
export declare const ValidationResultSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    code: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<["error", "warning", "info"]>>;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    severity: "error" | "info" | "warning";
    code?: string | undefined;
    message?: string | undefined;
}, {
    valid: boolean;
    code?: string | undefined;
    message?: string | undefined;
    severity?: "error" | "info" | "warning" | undefined;
}>;
export type ValidationResult = z.infer<typeof ValidationResultSchema>;
export type ValidationResultInput = z.input<typeof ValidationResultSchema>;
