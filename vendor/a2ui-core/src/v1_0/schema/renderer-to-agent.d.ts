import { z } from 'zod';
export declare const ActionMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    action: z.ZodObject<{
        name: z.ZodString;
        userMessage: z.ZodOptional<z.ZodString>;
        surfaceId: z.ZodString;
        sourceComponentId: z.ZodString;
        timestamp: z.ZodString;
        context: z.ZodRecord<z.ZodString, z.ZodAny>;
        metadata: z.ZodOptional<z.ZodObject<{
            extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
        }, "strict", z.ZodTypeAny, {
            extensions?: Record<string, unknown> | undefined;
        }, {
            extensions?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    };
}, {
    version: "1.0";
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    };
}>;
export type ActionMessage = z.infer<typeof ActionMessageSchema>;
export declare const CallAgentFunctionMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    callAgentFunction: z.ZodObject<{
        surfaceId: z.ZodString;
        functionCallId: z.ZodString;
        callFunction: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    }, {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    }>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    callAgentFunction: {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    };
}, {
    version: "1.0";
    callAgentFunction: {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    };
}>;
export type CallAgentFunctionMessage = z.infer<typeof CallAgentFunctionMessageSchema>;
export declare const RendererFunctionResponseMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    rendererFunctionResponse: z.ZodEffects<z.ZodObject<{
        functionCallId: z.ZodString;
        value: z.ZodOptional<z.ZodAny>;
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
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }>, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    rendererFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
}, {
    version: "1.0";
    rendererFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
}>;
export type RendererFunctionResponseMessage = z.infer<typeof RendererFunctionResponseMessageSchema>;
export declare const ErrorMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    error: z.ZodUnion<[z.ZodObject<{
        code: z.ZodEnum<["VALIDATION_FAILED", "UNALLOWED_PARENT", "UNALLOWED_CHILD"]>;
        surfaceId: z.ZodString;
        path: z.ZodString;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    }, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    }>, z.ZodIntersection<z.ZodObject<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodAny, z.objectOutputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">, z.objectInputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">>, z.ZodUnion<[z.ZodObject<{
        surfaceId: z.ZodString;
        functionCallId: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        surfaceId: string;
        functionCallId?: undefined;
    }, {
        surfaceId: string;
        functionCallId?: undefined;
    }>, z.ZodObject<{
        functionCallId: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        functionCallId: string;
        surfaceId?: undefined;
    }, {
        functionCallId: string;
        surfaceId?: undefined;
    }>]>>]>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    } | ({
        message: string;
        surfaceId?: string | undefined;
        functionCallId?: string | undefined;
        code?: any;
    } & {
        [k: string]: any;
    } & ({
        surfaceId: string;
        functionCallId?: undefined;
    } | {
        functionCallId: string;
        surfaceId?: undefined;
    }));
}, {
    version: "1.0";
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    } | ({
        message: string;
        surfaceId?: string | undefined;
        functionCallId?: string | undefined;
        code?: any;
    } & {
        [k: string]: any;
    } & ({
        surfaceId: string;
        functionCallId?: undefined;
    } | {
        functionCallId: string;
        surfaceId?: undefined;
    }));
}>;
export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;
/** Union schema validating any outgoing v1.0 renderer-to-agent message envelope. */
export declare const RendererToAgentMessageSchema: z.ZodUnion<[z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    action: z.ZodObject<{
        name: z.ZodString;
        userMessage: z.ZodOptional<z.ZodString>;
        surfaceId: z.ZodString;
        sourceComponentId: z.ZodString;
        timestamp: z.ZodString;
        context: z.ZodRecord<z.ZodString, z.ZodAny>;
        metadata: z.ZodOptional<z.ZodObject<{
            extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
        }, "strict", z.ZodTypeAny, {
            extensions?: Record<string, unknown> | undefined;
        }, {
            extensions?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    };
}, {
    version: "1.0";
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
        userMessage?: string | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    };
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    callAgentFunction: z.ZodObject<{
        surfaceId: z.ZodString;
        functionCallId: z.ZodString;
        callFunction: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    }, {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    }>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    callAgentFunction: {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    };
}, {
    version: "1.0";
    callAgentFunction: {
        surfaceId: string;
        functionCallId: string;
        callFunction?: any;
    };
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    rendererFunctionResponse: z.ZodEffects<z.ZodObject<{
        functionCallId: z.ZodString;
        value: z.ZodOptional<z.ZodAny>;
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
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }>, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    rendererFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
}, {
    version: "1.0";
    rendererFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    error: z.ZodUnion<[z.ZodObject<{
        code: z.ZodEnum<["VALIDATION_FAILED", "UNALLOWED_PARENT", "UNALLOWED_CHILD"]>;
        surfaceId: z.ZodString;
        path: z.ZodString;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    }, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    }>, z.ZodIntersection<z.ZodObject<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodAny, z.objectOutputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">, z.objectInputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodOptional<z.ZodString>;
    }, z.ZodAny, "strip">>, z.ZodUnion<[z.ZodObject<{
        surfaceId: z.ZodString;
        functionCallId: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        surfaceId: string;
        functionCallId?: undefined;
    }, {
        surfaceId: string;
        functionCallId?: undefined;
    }>, z.ZodObject<{
        functionCallId: z.ZodString;
        surfaceId: z.ZodOptional<z.ZodNever>;
    }, "strip", z.ZodTypeAny, {
        functionCallId: string;
        surfaceId?: undefined;
    }, {
        functionCallId: string;
        surfaceId?: undefined;
    }>]>>]>;
}, "strict", z.ZodTypeAny, {
    version: "1.0";
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    } | ({
        message: string;
        surfaceId?: string | undefined;
        functionCallId?: string | undefined;
        code?: any;
    } & {
        [k: string]: any;
    } & ({
        surfaceId: string;
        functionCallId?: undefined;
    } | {
        functionCallId: string;
        surfaceId?: undefined;
    }));
}, {
    version: "1.0";
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED" | "UNALLOWED_PARENT" | "UNALLOWED_CHILD";
        message: string;
    } | ({
        message: string;
        surfaceId?: string | undefined;
        functionCallId?: string | undefined;
        code?: any;
    } & {
        [k: string]: any;
    } & ({
        surfaceId: string;
        functionCallId?: undefined;
    } | {
        functionCallId: string;
        surfaceId?: undefined;
    }));
}>]>;
export type RendererToAgentMessage = z.infer<typeof RendererToAgentMessageSchema>;
