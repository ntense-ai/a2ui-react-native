import { z } from 'zod';
export declare const A2uiClientActionSchema: z.ZodObject<{
    name: z.ZodString;
    surfaceId: z.ZodString;
    sourceComponentId: z.ZodString;
    timestamp: z.ZodString;
    context: z.ZodRecord<z.ZodString, z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    surfaceId: string;
    name: string;
    context: Record<string, any>;
    sourceComponentId: string;
    timestamp: string;
}, {
    surfaceId: string;
    name: string;
    context: Record<string, any>;
    sourceComponentId: string;
    timestamp: string;
}>;
export type A2uiClientAction = z.infer<typeof A2uiClientActionSchema>;
export declare const A2uiValidationErrorSchema: z.ZodObject<{
    code: z.ZodLiteral<"VALIDATION_FAILED">;
    surfaceId: z.ZodString;
    path: z.ZodString;
    message: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
    surfaceId: string;
    code: "VALIDATION_FAILED";
    message: string;
}, {
    path: string;
    surfaceId: string;
    code: "VALIDATION_FAILED";
    message: string;
}>;
export declare const A2uiGenericErrorSchema: z.ZodObject<{
    code: z.ZodEffects<z.ZodAny, any, any>;
    message: z.ZodString;
    surfaceId: z.ZodString;
}, "strip", z.ZodAny, z.objectOutputType<{
    code: z.ZodEffects<z.ZodAny, any, any>;
    message: z.ZodString;
    surfaceId: z.ZodString;
}, z.ZodAny, "strip">, z.objectInputType<{
    code: z.ZodEffects<z.ZodAny, any, any>;
    message: z.ZodString;
    surfaceId: z.ZodString;
}, z.ZodAny, "strip">>;
export declare const A2uiClientErrorSchema: z.ZodUnion<[z.ZodObject<{
    code: z.ZodLiteral<"VALIDATION_FAILED">;
    surfaceId: z.ZodString;
    path: z.ZodString;
    message: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
    surfaceId: string;
    code: "VALIDATION_FAILED";
    message: string;
}, {
    path: string;
    surfaceId: string;
    code: "VALIDATION_FAILED";
    message: string;
}>, z.ZodObject<{
    code: z.ZodEffects<z.ZodAny, any, any>;
    message: z.ZodString;
    surfaceId: z.ZodString;
}, "strip", z.ZodAny, z.objectOutputType<{
    code: z.ZodEffects<z.ZodAny, any, any>;
    message: z.ZodString;
    surfaceId: z.ZodString;
}, z.ZodAny, "strip">, z.objectInputType<{
    code: z.ZodEffects<z.ZodAny, any, any>;
    message: z.ZodString;
    surfaceId: z.ZodString;
}, z.ZodAny, "strip">>]>;
export type A2uiClientError = z.infer<typeof A2uiClientErrorSchema>;
export declare const A2uiClientMessageSchema: z.ZodIntersection<z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
}, "strip", z.ZodTypeAny, {
    version: "v0.9" | "v0.9.1";
}, {
    version: "v0.9" | "v0.9.1";
}>, z.ZodUnion<[z.ZodObject<{
    action: z.ZodObject<{
        name: z.ZodString;
        surfaceId: z.ZodString;
        sourceComponentId: z.ZodString;
        timestamp: z.ZodString;
        context: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    }, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    };
}, {
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    };
}>, z.ZodObject<{
    error: z.ZodUnion<[z.ZodObject<{
        code: z.ZodLiteral<"VALIDATION_FAILED">;
        surfaceId: z.ZodString;
        path: z.ZodString;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    }, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    }>, z.ZodObject<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, "strip", z.ZodAny, z.objectOutputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">, z.objectInputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">>]>;
}, "strip", z.ZodTypeAny, {
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    } | z.objectOutputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">;
}, {
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    } | z.objectInputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">;
}>]>>;
export type A2uiClientMessage = z.infer<typeof A2uiClientMessageSchema>;
export declare const A2uiClientDataModelSchema: z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    surfaces: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strict", z.ZodTypeAny, {
    version: "v0.9" | "v0.9.1";
    surfaces: Record<string, Record<string, any>>;
}, {
    version: "v0.9" | "v0.9.1";
    surfaces: Record<string, Record<string, any>>;
}>;
export type A2uiClientDataModel = z.infer<typeof A2uiClientDataModelSchema>;
export declare const A2uiClientMessageListSchema: z.ZodArray<z.ZodIntersection<z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
}, "strip", z.ZodTypeAny, {
    version: "v0.9" | "v0.9.1";
}, {
    version: "v0.9" | "v0.9.1";
}>, z.ZodUnion<[z.ZodObject<{
    action: z.ZodObject<{
        name: z.ZodString;
        surfaceId: z.ZodString;
        sourceComponentId: z.ZodString;
        timestamp: z.ZodString;
        context: z.ZodRecord<z.ZodString, z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    }, {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    };
}, {
    action: {
        surfaceId: string;
        name: string;
        context: Record<string, any>;
        sourceComponentId: string;
        timestamp: string;
    };
}>, z.ZodObject<{
    error: z.ZodUnion<[z.ZodObject<{
        code: z.ZodLiteral<"VALIDATION_FAILED">;
        surfaceId: z.ZodString;
        path: z.ZodString;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    }, {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    }>, z.ZodObject<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, "strip", z.ZodAny, z.objectOutputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">, z.objectInputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">>]>;
}, "strip", z.ZodTypeAny, {
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    } | z.objectOutputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">;
}, {
    error: {
        path: string;
        surfaceId: string;
        code: "VALIDATION_FAILED";
        message: string;
    } | z.objectInputType<{
        code: z.ZodEffects<z.ZodAny, any, any>;
        message: z.ZodString;
        surfaceId: z.ZodString;
    }, z.ZodAny, "strip">;
}>]>>, "many">;
export type A2uiClientMessageList = z.infer<typeof A2uiClientMessageListSchema>;
export declare const A2uiClientMessageListWrapperSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodIntersection<z.ZodObject<{
        version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    }, "strip", z.ZodTypeAny, {
        version: "v0.9" | "v0.9.1";
    }, {
        version: "v0.9" | "v0.9.1";
    }>, z.ZodUnion<[z.ZodObject<{
        action: z.ZodObject<{
            name: z.ZodString;
            surfaceId: z.ZodString;
            sourceComponentId: z.ZodString;
            timestamp: z.ZodString;
            context: z.ZodRecord<z.ZodString, z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            surfaceId: string;
            name: string;
            context: Record<string, any>;
            sourceComponentId: string;
            timestamp: string;
        }, {
            surfaceId: string;
            name: string;
            context: Record<string, any>;
            sourceComponentId: string;
            timestamp: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        action: {
            surfaceId: string;
            name: string;
            context: Record<string, any>;
            sourceComponentId: string;
            timestamp: string;
        };
    }, {
        action: {
            surfaceId: string;
            name: string;
            context: Record<string, any>;
            sourceComponentId: string;
            timestamp: string;
        };
    }>, z.ZodObject<{
        error: z.ZodUnion<[z.ZodObject<{
            code: z.ZodLiteral<"VALIDATION_FAILED">;
            surfaceId: z.ZodString;
            path: z.ZodString;
            message: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
            surfaceId: string;
            code: "VALIDATION_FAILED";
            message: string;
        }, {
            path: string;
            surfaceId: string;
            code: "VALIDATION_FAILED";
            message: string;
        }>, z.ZodObject<{
            code: z.ZodEffects<z.ZodAny, any, any>;
            message: z.ZodString;
            surfaceId: z.ZodString;
        }, "strip", z.ZodAny, z.objectOutputType<{
            code: z.ZodEffects<z.ZodAny, any, any>;
            message: z.ZodString;
            surfaceId: z.ZodString;
        }, z.ZodAny, "strip">, z.objectInputType<{
            code: z.ZodEffects<z.ZodAny, any, any>;
            message: z.ZodString;
            surfaceId: z.ZodString;
        }, z.ZodAny, "strip">>]>;
    }, "strip", z.ZodTypeAny, {
        error: {
            path: string;
            surfaceId: string;
            code: "VALIDATION_FAILED";
            message: string;
        } | z.objectOutputType<{
            code: z.ZodEffects<z.ZodAny, any, any>;
            message: z.ZodString;
            surfaceId: z.ZodString;
        }, z.ZodAny, "strip">;
    }, {
        error: {
            path: string;
            surfaceId: string;
            code: "VALIDATION_FAILED";
            message: string;
        } | z.objectInputType<{
            code: z.ZodEffects<z.ZodAny, any, any>;
            message: z.ZodString;
            surfaceId: z.ZodString;
        }, z.ZodAny, "strip">;
    }>]>>, "many">;
}, "strict", z.ZodTypeAny, {
    messages: ({
        version: "v0.9" | "v0.9.1";
    } & ({
        action: {
            surfaceId: string;
            name: string;
            context: Record<string, any>;
            sourceComponentId: string;
            timestamp: string;
        };
    } | {
        error: {
            path: string;
            surfaceId: string;
            code: "VALIDATION_FAILED";
            message: string;
        } | z.objectOutputType<{
            code: z.ZodEffects<z.ZodAny, any, any>;
            message: z.ZodString;
            surfaceId: z.ZodString;
        }, z.ZodAny, "strip">;
    }))[];
}, {
    messages: ({
        version: "v0.9" | "v0.9.1";
    } & ({
        action: {
            surfaceId: string;
            name: string;
            context: Record<string, any>;
            sourceComponentId: string;
            timestamp: string;
        };
    } | {
        error: {
            path: string;
            surfaceId: string;
            code: "VALIDATION_FAILED";
            message: string;
        } | z.objectInputType<{
            code: z.ZodEffects<z.ZodAny, any, any>;
            message: z.ZodString;
            surfaceId: z.ZodString;
        }, z.ZodAny, "strip">;
    }))[];
}>;
export type A2uiClientMessageListWrapper = z.infer<typeof A2uiClientMessageListWrapperSchema>;
