import { z } from 'zod';
export declare const ValueMapSchema: z.ZodEffects<z.ZodType<any, z.ZodTypeDef, any>, any, any>;
export declare const ComponentPropertiesSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>;
export declare const AnyComponentSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>;
export declare const ComponentInstanceSchema: z.ZodObject<{
    id: z.ZodString;
    weight: z.ZodOptional<z.ZodNumber>;
    component: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    component: Record<string, any>;
    weight?: number | undefined;
}, {
    id: string;
    component: Record<string, any>;
    weight?: number | undefined;
}>;
export declare const BeginRenderingMessageSchema: z.ZodObject<{
    surfaceId: z.ZodString;
    catalogId: z.ZodOptional<z.ZodString>;
    root: z.ZodString;
    styles: z.ZodOptional<z.ZodObject<{
        font: z.ZodOptional<z.ZodString>;
        primaryColor: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        font?: string | undefined;
        primaryColor?: string | undefined;
    }, {
        font?: string | undefined;
        primaryColor?: string | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    surfaceId: string;
    root: string;
    catalogId?: string | undefined;
    styles?: {
        font?: string | undefined;
        primaryColor?: string | undefined;
    } | undefined;
}, {
    surfaceId: string;
    root: string;
    catalogId?: string | undefined;
    styles?: {
        font?: string | undefined;
        primaryColor?: string | undefined;
    } | undefined;
}>;
export declare const SurfaceUpdateMessageSchema: z.ZodEffects<z.ZodObject<{
    surfaceId: z.ZodString;
    components: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        weight: z.ZodOptional<z.ZodNumber>;
        component: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>;
    }, "strict", z.ZodTypeAny, {
        id: string;
        component: Record<string, any>;
        weight?: number | undefined;
    }, {
        id: string;
        component: Record<string, any>;
        weight?: number | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    surfaceId: string;
    components: {
        id: string;
        component: Record<string, any>;
        weight?: number | undefined;
    }[];
}, {
    surfaceId: string;
    components: {
        id: string;
        component: Record<string, any>;
        weight?: number | undefined;
    }[];
}>, {
    surfaceId: string;
    components: {
        id: string;
        component: Record<string, any>;
        weight?: number | undefined;
    }[];
}, {
    surfaceId: string;
    components: {
        id: string;
        component: Record<string, any>;
        weight?: number | undefined;
    }[];
}>;
export declare const DataModelUpdateMessageSchema: z.ZodObject<{
    surfaceId: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
    contents: z.ZodArray<z.ZodEffects<z.ZodType<any, z.ZodTypeDef, any>, any, any>, "many">;
}, "strict", z.ZodTypeAny, {
    surfaceId: string;
    contents: any[];
    path?: string | undefined;
}, {
    surfaceId: string;
    contents: any[];
    path?: string | undefined;
}>;
export declare const DeleteSurfaceMessageSchema: z.ZodObject<{
    surfaceId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    surfaceId: string;
}, {
    surfaceId: string;
}>;
export declare const A2uiMessageSchema: z.ZodEffects<z.ZodObject<{
    beginRendering: z.ZodOptional<z.ZodObject<{
        surfaceId: z.ZodString;
        catalogId: z.ZodOptional<z.ZodString>;
        root: z.ZodString;
        styles: z.ZodOptional<z.ZodObject<{
            font: z.ZodOptional<z.ZodString>;
            primaryColor: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            font?: string | undefined;
            primaryColor?: string | undefined;
        }, {
            font?: string | undefined;
            primaryColor?: string | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        root: string;
        catalogId?: string | undefined;
        styles?: {
            font?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    }, {
        surfaceId: string;
        root: string;
        catalogId?: string | undefined;
        styles?: {
            font?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    }>>;
    surfaceUpdate: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        surfaceId: z.ZodString;
        components: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            weight: z.ZodOptional<z.ZodNumber>;
            component: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodAny>, Record<string, any>, Record<string, any>>;
        }, "strict", z.ZodTypeAny, {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }, {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    }, {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    }>, {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    }, {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    }>>;
    dataModelUpdate: z.ZodOptional<z.ZodObject<{
        surfaceId: z.ZodString;
        path: z.ZodOptional<z.ZodString>;
        contents: z.ZodArray<z.ZodEffects<z.ZodType<any, z.ZodTypeDef, any>, any, any>, "many">;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
        contents: any[];
        path?: string | undefined;
    }, {
        surfaceId: string;
        contents: any[];
        path?: string | undefined;
    }>>;
    deleteSurface: z.ZodOptional<z.ZodObject<{
        surfaceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        surfaceId: string;
    }, {
        surfaceId: string;
    }>>;
}, "strict", z.ZodTypeAny, {
    deleteSurface?: {
        surfaceId: string;
    } | undefined;
    beginRendering?: {
        surfaceId: string;
        root: string;
        catalogId?: string | undefined;
        styles?: {
            font?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    } | undefined;
    surfaceUpdate?: {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    } | undefined;
    dataModelUpdate?: {
        surfaceId: string;
        contents: any[];
        path?: string | undefined;
    } | undefined;
}, {
    deleteSurface?: {
        surfaceId: string;
    } | undefined;
    beginRendering?: {
        surfaceId: string;
        root: string;
        catalogId?: string | undefined;
        styles?: {
            font?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    } | undefined;
    surfaceUpdate?: {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    } | undefined;
    dataModelUpdate?: {
        surfaceId: string;
        contents: any[];
        path?: string | undefined;
    } | undefined;
}>, {
    deleteSurface?: {
        surfaceId: string;
    } | undefined;
    beginRendering?: {
        surfaceId: string;
        root: string;
        catalogId?: string | undefined;
        styles?: {
            font?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    } | undefined;
    surfaceUpdate?: {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    } | undefined;
    dataModelUpdate?: {
        surfaceId: string;
        contents: any[];
        path?: string | undefined;
    } | undefined;
}, {
    deleteSurface?: {
        surfaceId: string;
    } | undefined;
    beginRendering?: {
        surfaceId: string;
        root: string;
        catalogId?: string | undefined;
        styles?: {
            font?: string | undefined;
            primaryColor?: string | undefined;
        } | undefined;
    } | undefined;
    surfaceUpdate?: {
        surfaceId: string;
        components: {
            id: string;
            component: Record<string, any>;
            weight?: number | undefined;
        }[];
    } | undefined;
    dataModelUpdate?: {
        surfaceId: string;
        contents: any[];
        path?: string | undefined;
    } | undefined;
}>;
export type A2uiMessage = z.infer<typeof A2uiMessageSchema>;
