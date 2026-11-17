import { BaseVersionAdapter, ProtocolVersion } from './base.js';
import { InternalOperation } from '../operations.js';
/**
 * Protocol version adapter for specification v0.8.
 */
export declare class V0Point8Adapter extends BaseVersionAdapter {
    readonly version: ProtocolVersion;
    protected readonly schema: import("zod").ZodEffects<import("zod").ZodObject<{
        beginRendering: import("zod").ZodOptional<import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
            root: import("zod").ZodString;
            styles: import("zod").ZodOptional<import("zod").ZodObject<{
                font: import("zod").ZodOptional<import("zod").ZodString>;
                primaryColor: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strict", import("zod").ZodTypeAny, {
                font?: string | undefined;
                primaryColor?: string | undefined;
            }, {
                font?: string | undefined;
                primaryColor?: string | undefined;
            }>>;
        }, "strict", import("zod").ZodTypeAny, {
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
        surfaceUpdate: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            components: import("zod").ZodArray<import("zod").ZodObject<{
                id: import("zod").ZodString;
                weight: import("zod").ZodOptional<import("zod").ZodNumber>;
                component: import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, Record<string, any>, Record<string, any>>;
            }, "strict", import("zod").ZodTypeAny, {
                id: string;
                component: Record<string, any>;
                weight?: number | undefined;
            }, {
                id: string;
                component: Record<string, any>;
                weight?: number | undefined;
            }>, "many">;
        }, "strict", import("zod").ZodTypeAny, {
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
        dataModelUpdate: import("zod").ZodOptional<import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            path: import("zod").ZodOptional<import("zod").ZodString>;
            contents: import("zod").ZodArray<import("zod").ZodEffects<import("zod").ZodType<any, import("zod").ZodTypeDef, any>, any, any>, "many">;
        }, "strict", import("zod").ZodTypeAny, {
            surfaceId: string;
            contents: any[];
            path?: string | undefined;
        }, {
            surfaceId: string;
            contents: any[];
            path?: string | undefined;
        }>>;
        deleteSurface: import("zod").ZodOptional<import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
        }, "strict", import("zod").ZodTypeAny, {
            surfaceId: string;
        }, {
            surfaceId: string;
        }>>;
    }, "strict", import("zod").ZodTypeAny, {
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
    protected getNativeActionKeys(): string[];
    protected preparePayloadForValidation(msgObj: Record<string, unknown>): Record<string, unknown>;
    protected extractOperationsFromObject(msgObj: Record<string, unknown>): InternalOperation[];
}
