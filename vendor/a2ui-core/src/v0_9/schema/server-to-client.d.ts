import { z } from 'zod';
export declare const CreateSurfaceMessageSchema: z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    createSurface: z.ZodObject<{
        surfaceId: z.ZodString;
        catalogId: z.ZodString;
        theme: z.ZodOptional<z.ZodAny>;
        sendDataModel: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    }, {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    createSurface: {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    };
    version: "v0.9" | "v0.9.1";
}, {
    createSurface: {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    };
    version: "v0.9" | "v0.9.1";
}>;
export type CreateSurfaceMessage = z.infer<typeof CreateSurfaceMessageSchema>;
export declare const UpdateComponentsMessageSchema: z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    updateComponents: z.ZodObject<{
        surfaceId: z.ZodString;
        components: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        components: Record<string, any>[];
    }, {
        surfaceId: string;
        components: Record<string, any>[];
    }>;
}, "strict", z.ZodTypeAny, {
    updateComponents: {
        surfaceId: string;
        components: Record<string, any>[];
    };
    version: "v0.9" | "v0.9.1";
}, {
    updateComponents: {
        surfaceId: string;
        components: Record<string, any>[];
    };
    version: "v0.9" | "v0.9.1";
}>;
export type UpdateComponentsMessage = z.infer<typeof UpdateComponentsMessageSchema>;
export declare const UpdateDataModelMessageSchema: z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    updateDataModel: z.ZodObject<{
        surfaceId: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodAny>;
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
    version: "v0.9" | "v0.9.1";
}, {
    updateDataModel: {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    };
    version: "v0.9" | "v0.9.1";
}>;
export type UpdateDataModelMessage = z.infer<typeof UpdateDataModelMessageSchema>;
export declare const DeleteSurfaceMessageSchema: z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
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
    version: "v0.9" | "v0.9.1";
}, {
    deleteSurface: {
        surfaceId: string;
    };
    version: "v0.9" | "v0.9.1";
}>;
export type DeleteSurfaceMessage = z.infer<typeof DeleteSurfaceMessageSchema>;
export declare const A2uiMessageSchema: z.ZodUnion<[z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    createSurface: z.ZodObject<{
        surfaceId: z.ZodString;
        catalogId: z.ZodString;
        theme: z.ZodOptional<z.ZodAny>;
        sendDataModel: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    }, {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    createSurface: {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    };
    version: "v0.9" | "v0.9.1";
}, {
    createSurface: {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    };
    version: "v0.9" | "v0.9.1";
}>, z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    updateComponents: z.ZodObject<{
        surfaceId: z.ZodString;
        components: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        components: Record<string, any>[];
    }, {
        surfaceId: string;
        components: Record<string, any>[];
    }>;
}, "strict", z.ZodTypeAny, {
    updateComponents: {
        surfaceId: string;
        components: Record<string, any>[];
    };
    version: "v0.9" | "v0.9.1";
}, {
    updateComponents: {
        surfaceId: string;
        components: Record<string, any>[];
    };
    version: "v0.9" | "v0.9.1";
}>, z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    updateDataModel: z.ZodObject<{
        surfaceId: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodAny>;
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
    version: "v0.9" | "v0.9.1";
}, {
    updateDataModel: {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    };
    version: "v0.9" | "v0.9.1";
}>, z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
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
    version: "v0.9" | "v0.9.1";
}, {
    deleteSurface: {
        surfaceId: string;
    };
    version: "v0.9" | "v0.9.1";
}>]>;
export type A2uiMessage = z.infer<typeof A2uiMessageSchema>;
export declare const A2uiMessageListSchema: z.ZodArray<z.ZodUnion<[z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    createSurface: z.ZodObject<{
        surfaceId: z.ZodString;
        catalogId: z.ZodString;
        theme: z.ZodOptional<z.ZodAny>;
        sendDataModel: z.ZodOptional<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    }, {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    createSurface: {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    };
    version: "v0.9" | "v0.9.1";
}, {
    createSurface: {
        surfaceId: string;
        catalogId: string;
        theme?: any;
        sendDataModel?: boolean | undefined;
    };
    version: "v0.9" | "v0.9.1";
}>, z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    updateComponents: z.ZodObject<{
        surfaceId: z.ZodString;
        components: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        components: Record<string, any>[];
    }, {
        surfaceId: string;
        components: Record<string, any>[];
    }>;
}, "strict", z.ZodTypeAny, {
    updateComponents: {
        surfaceId: string;
        components: Record<string, any>[];
    };
    version: "v0.9" | "v0.9.1";
}, {
    updateComponents: {
        surfaceId: string;
        components: Record<string, any>[];
    };
    version: "v0.9" | "v0.9.1";
}>, z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
    updateDataModel: z.ZodObject<{
        surfaceId: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodAny>;
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
    version: "v0.9" | "v0.9.1";
}, {
    updateDataModel: {
        surfaceId: string;
        path?: string | undefined;
        value?: any;
    };
    version: "v0.9" | "v0.9.1";
}>, z.ZodObject<{
    version: z.ZodEnum<["v0.9", "v0.9.1"]>;
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
    version: "v0.9" | "v0.9.1";
}, {
    deleteSurface: {
        surfaceId: string;
    };
    version: "v0.9" | "v0.9.1";
}>]>, "many">;
export type A2uiMessageList = z.infer<typeof A2uiMessageListSchema>;
export declare const A2uiMessageListWrapperSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        version: z.ZodEnum<["v0.9", "v0.9.1"]>;
        createSurface: z.ZodObject<{
            surfaceId: z.ZodString;
            catalogId: z.ZodString;
            theme: z.ZodOptional<z.ZodAny>;
            sendDataModel: z.ZodOptional<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            surfaceId: string;
            catalogId: string;
            theme?: any;
            sendDataModel?: boolean | undefined;
        }, {
            surfaceId: string;
            catalogId: string;
            theme?: any;
            sendDataModel?: boolean | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        createSurface: {
            surfaceId: string;
            catalogId: string;
            theme?: any;
            sendDataModel?: boolean | undefined;
        };
        version: "v0.9" | "v0.9.1";
    }, {
        createSurface: {
            surfaceId: string;
            catalogId: string;
            theme?: any;
            sendDataModel?: boolean | undefined;
        };
        version: "v0.9" | "v0.9.1";
    }>, z.ZodObject<{
        version: z.ZodEnum<["v0.9", "v0.9.1"]>;
        updateComponents: z.ZodObject<{
            surfaceId: z.ZodString;
            components: z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">;
        }, "strict", z.ZodTypeAny, {
            surfaceId: string;
            components: Record<string, any>[];
        }, {
            surfaceId: string;
            components: Record<string, any>[];
        }>;
    }, "strict", z.ZodTypeAny, {
        updateComponents: {
            surfaceId: string;
            components: Record<string, any>[];
        };
        version: "v0.9" | "v0.9.1";
    }, {
        updateComponents: {
            surfaceId: string;
            components: Record<string, any>[];
        };
        version: "v0.9" | "v0.9.1";
    }>, z.ZodObject<{
        version: z.ZodEnum<["v0.9", "v0.9.1"]>;
        updateDataModel: z.ZodObject<{
            surfaceId: z.ZodString;
            path: z.ZodOptional<z.ZodString>;
            value: z.ZodOptional<z.ZodAny>;
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
        version: "v0.9" | "v0.9.1";
    }, {
        updateDataModel: {
            surfaceId: string;
            path?: string | undefined;
            value?: any;
        };
        version: "v0.9" | "v0.9.1";
    }>, z.ZodObject<{
        version: z.ZodEnum<["v0.9", "v0.9.1"]>;
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
        version: "v0.9" | "v0.9.1";
    }, {
        deleteSurface: {
            surfaceId: string;
        };
        version: "v0.9" | "v0.9.1";
    }>]>, "many">;
}, "strict", z.ZodTypeAny, {
    messages: ({
        createSurface: {
            surfaceId: string;
            catalogId: string;
            theme?: any;
            sendDataModel?: boolean | undefined;
        };
        version: "v0.9" | "v0.9.1";
    } | {
        updateComponents: {
            surfaceId: string;
            components: Record<string, any>[];
        };
        version: "v0.9" | "v0.9.1";
    } | {
        updateDataModel: {
            surfaceId: string;
            path?: string | undefined;
            value?: any;
        };
        version: "v0.9" | "v0.9.1";
    } | {
        deleteSurface: {
            surfaceId: string;
        };
        version: "v0.9" | "v0.9.1";
    })[];
}, {
    messages: ({
        createSurface: {
            surfaceId: string;
            catalogId: string;
            theme?: any;
            sendDataModel?: boolean | undefined;
        };
        version: "v0.9" | "v0.9.1";
    } | {
        updateComponents: {
            surfaceId: string;
            components: Record<string, any>[];
        };
        version: "v0.9" | "v0.9.1";
    } | {
        updateDataModel: {
            surfaceId: string;
            path?: string | undefined;
            value?: any;
        };
        version: "v0.9" | "v0.9.1";
    } | {
        deleteSurface: {
            surfaceId: string;
        };
        version: "v0.9" | "v0.9.1";
    })[];
}>;
export type A2uiMessageListWrapper = z.infer<typeof A2uiMessageListWrapperSchema>;
