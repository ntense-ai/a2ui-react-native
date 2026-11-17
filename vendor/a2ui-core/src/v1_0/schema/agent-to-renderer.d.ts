import { z } from 'zod';
export declare const CreateSurfaceMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    createSurface: z.ZodObject<{
        surfaceId: z.ZodString;
        catalogId: z.ZodOptional<z.ZodString>;
        sendDataModel: z.ZodOptional<z.ZodBoolean>;
        components: z.ZodOptional<z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">>;
        dataModel: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        metadata: z.ZodOptional<z.ZodObject<{
            extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
        }, "strict", z.ZodTypeAny, {
            extensions?: Record<string, unknown> | undefined;
        }, {
            extensions?: Record<string, unknown> | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    }, {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    createSurface: {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    };
    version: "1.0";
}, {
    createSurface: {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    };
    version: "1.0";
}>;
export type CreateSurfaceMessage = z.infer<typeof CreateSurfaceMessageSchema>;
export declare const UpdateComponentsMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    updateComponents: z.ZodObject<{
        surfaceId: z.ZodString;
        components: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        components: any[];
    }, {
        surfaceId: string;
        components: any[];
    }>;
}, "strict", z.ZodTypeAny, {
    updateComponents: {
        surfaceId: string;
        components: any[];
    };
    version: "1.0";
}, {
    updateComponents: {
        surfaceId: string;
        components: any[];
    };
    version: "1.0";
}>;
export type UpdateComponentsMessage = z.infer<typeof UpdateComponentsMessageSchema>;
export declare const UpdateDataModelMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    updateDataModel: z.ZodObject<{
        surfaceId: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
        value: z.ZodAny;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    }, {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    }>;
}, "strict", z.ZodTypeAny, {
    updateDataModel: {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    };
    version: "1.0";
}, {
    updateDataModel: {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    };
    version: "1.0";
}>;
export type UpdateDataModelMessage = z.infer<typeof UpdateDataModelMessageSchema>;
export declare const DeleteSurfaceMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    deleteSurface: z.ZodObject<{
        surfaceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
    }, {
        surfaceId: string;
    }>;
}, "strict", z.ZodTypeAny, {
    deleteSurface: {
        surfaceId: string;
    };
    version: "1.0";
}, {
    deleteSurface: {
        surfaceId: string;
    };
    version: "1.0";
}>;
export type DeleteSurfaceMessage = z.infer<typeof DeleteSurfaceMessageSchema>;
export declare const CallRendererFunctionMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    callRendererFunction: z.ZodObject<{
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodString;
        callFunction: z.ZodIntersection<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>, z.ZodObject<{
            catalogId: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            catalogId: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            catalogId: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "strict", z.ZodTypeAny, {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    }, {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    }>;
}, "strict", z.ZodTypeAny, {
    callRendererFunction: {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    };
    version: "1.0";
}, {
    callRendererFunction: {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    };
    version: "1.0";
}>;
export type CallRendererFunctionMessage = z.infer<typeof CallRendererFunctionMessageSchema>;
export declare const AgentFunctionResponseMessageSchema: z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    agentFunctionResponse: z.ZodEffects<z.ZodObject<{
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
    agentFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
    version: "1.0";
}, {
    agentFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
    version: "1.0";
}>;
export type AgentFunctionResponseMessage = z.infer<typeof AgentFunctionResponseMessageSchema>;
export declare const AgentToRendererMessageSchema: z.ZodUnion<[z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    createSurface: z.ZodObject<{
        surfaceId: z.ZodString;
        catalogId: z.ZodOptional<z.ZodString>;
        sendDataModel: z.ZodOptional<z.ZodBoolean>;
        components: z.ZodOptional<z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">>;
        dataModel: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
        metadata: z.ZodOptional<z.ZodObject<{
            extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
        }, "strict", z.ZodTypeAny, {
            extensions?: Record<string, unknown> | undefined;
        }, {
            extensions?: Record<string, unknown> | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    }, {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    createSurface: {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    };
    version: "1.0";
}, {
    createSurface: {
        surfaceId: string;
        catalogId?: string | undefined;
        components?: any[] | undefined;
        metadata?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
        dataModel?: Record<string, any> | undefined;
        sendDataModel?: boolean | undefined;
    };
    version: "1.0";
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    updateComponents: z.ZodObject<{
        surfaceId: z.ZodString;
        components: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        components: any[];
    }, {
        surfaceId: string;
        components: any[];
    }>;
}, "strict", z.ZodTypeAny, {
    updateComponents: {
        surfaceId: string;
        components: any[];
    };
    version: "1.0";
}, {
    updateComponents: {
        surfaceId: string;
        components: any[];
    };
    version: "1.0";
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    updateDataModel: z.ZodObject<{
        surfaceId: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
        value: z.ZodAny;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    }, {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    }>;
}, "strict", z.ZodTypeAny, {
    updateDataModel: {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    };
    version: "1.0";
}, {
    updateDataModel: {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    };
    version: "1.0";
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    deleteSurface: z.ZodObject<{
        surfaceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
    }, {
        surfaceId: string;
    }>;
}, "strict", z.ZodTypeAny, {
    deleteSurface: {
        surfaceId: string;
    };
    version: "1.0";
}, {
    deleteSurface: {
        surfaceId: string;
    };
    version: "1.0";
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    callRendererFunction: z.ZodObject<{
        surfaceId: z.ZodOptional<z.ZodString>;
        functionCallId: z.ZodString;
        callFunction: z.ZodIntersection<z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
        }>, z.ZodAny>>, z.ZodObject<{
            catalogId: z.ZodString;
        }, "passthrough", z.ZodTypeAny, z.objectOutputType<{
            catalogId: z.ZodString;
        }, z.ZodTypeAny, "passthrough">, z.objectInputType<{
            catalogId: z.ZodString;
        }, z.ZodTypeAny, "passthrough">>>;
    }, "strict", z.ZodTypeAny, {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    }, {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    }>;
}, "strict", z.ZodTypeAny, {
    callRendererFunction: {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    };
    version: "1.0";
}, {
    callRendererFunction: {
        functionCallId: string;
        surfaceId?: string | undefined;
        callFunction?: any;
    };
    version: "1.0";
}>, z.ZodObject<{
    version: z.ZodLiteral<"1.0">;
    agentFunctionResponse: z.ZodEffects<z.ZodObject<{
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
    agentFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
    version: "1.0";
}, {
    agentFunctionResponse: {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    };
    version: "1.0";
}>]>;
export type AgentToRendererMessage = z.infer<typeof AgentToRendererMessageSchema>;
