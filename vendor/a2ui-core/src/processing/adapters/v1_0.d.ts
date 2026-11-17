import { BaseVersionAdapter, ProtocolVersion } from './base.js';
import { InternalOperation } from '../operations.js';
/**
 * Protocol version adapter for specification v1.0.
 */
export declare class V1Point0Adapter extends BaseVersionAdapter {
    readonly version: ProtocolVersion;
    protected readonly schema: import("zod").ZodUnion<[import("zod").ZodObject<{
        version: import("zod").ZodLiteral<"1.0">;
        createSurface: import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
            sendDataModel: import("zod").ZodOptional<import("zod").ZodBoolean>;
            components: import("zod").ZodOptional<import("zod").ZodArray<import("zod").ZodType<any, import("zod").ZodTypeDef, any>, "many">>;
            dataModel: import("zod").ZodOptional<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>>;
            metadata: import("zod").ZodOptional<import("zod").ZodObject<{
                extensions: import("zod").ZodOptional<import("zod").ZodEffects<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
            }, "strict", import("zod").ZodTypeAny, {
                extensions?: Record<string, unknown> | undefined;
            }, {
                extensions?: Record<string, unknown> | undefined;
            }>>;
        }, "strict", import("zod").ZodTypeAny, {
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
    }, "strict", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        version: import("zod").ZodLiteral<"1.0">;
        updateComponents: import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            components: import("zod").ZodArray<import("zod").ZodType<any, import("zod").ZodTypeDef, any>, "many">;
        }, "strict", import("zod").ZodTypeAny, {
            surfaceId: string;
            components: any[];
        }, {
            surfaceId: string;
            components: any[];
        }>;
    }, "strict", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        version: import("zod").ZodLiteral<"1.0">;
        updateDataModel: import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            path: import("zod").ZodOptional<import("zod").ZodString>;
            value: import("zod").ZodAny;
        }, "strict", import("zod").ZodTypeAny, {
            surfaceId: string;
            path?: string | undefined;
            value?: any;
        }, {
            surfaceId: string;
            path?: string | undefined;
            value?: any;
        }>;
    }, "strict", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        version: import("zod").ZodLiteral<"1.0">;
        deleteSurface: import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
        }, "strict", import("zod").ZodTypeAny, {
            surfaceId: string;
        }, {
            surfaceId: string;
        }>;
    }, "strict", import("zod").ZodTypeAny, {
        deleteSurface: {
            surfaceId: string;
        };
        version: "1.0";
    }, {
        deleteSurface: {
            surfaceId: string;
        };
        version: "1.0";
    }>, import("zod").ZodObject<{
        version: import("zod").ZodLiteral<"1.0">;
        callRendererFunction: import("zod").ZodObject<{
            surfaceId: import("zod").ZodOptional<import("zod").ZodString>;
            functionCallId: import("zod").ZodString;
            callFunction: import("zod").ZodIntersection<import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
                '@call': import("zod").ZodOptional<import("zod").ZodString>;
                call: import("zod").ZodOptional<import("zod").ZodString>;
                catalogId: import("zod").ZodOptional<import("zod").ZodString>;
            }, "strip", import("zod").ZodTypeAny, {
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
            }>, import("zod").ZodAny>>, import("zod").ZodObject<{
                catalogId: import("zod").ZodString;
            }, "passthrough", import("zod").ZodTypeAny, import("zod").objectOutputType<{
                catalogId: import("zod").ZodString;
            }, import("zod").ZodTypeAny, "passthrough">, import("zod").objectInputType<{
                catalogId: import("zod").ZodString;
            }, import("zod").ZodTypeAny, "passthrough">>>;
        }, "strict", import("zod").ZodTypeAny, {
            functionCallId: string;
            surfaceId?: string | undefined;
            callFunction?: any;
        }, {
            functionCallId: string;
            surfaceId?: string | undefined;
            callFunction?: any;
        }>;
    }, "strict", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        version: import("zod").ZodLiteral<"1.0">;
        agentFunctionResponse: import("zod").ZodEffects<import("zod").ZodObject<{
            functionCallId: import("zod").ZodString;
            value: import("zod").ZodOptional<import("zod").ZodAny>;
            error: import("zod").ZodOptional<import("zod").ZodObject<{
                code: import("zod").ZodString;
                message: import("zod").ZodString;
            }, "strict", import("zod").ZodTypeAny, {
                code: string;
                message: string;
            }, {
                code: string;
                message: string;
            }>>;
        }, "strict", import("zod").ZodTypeAny, {
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
    }, "strict", import("zod").ZodTypeAny, {
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
    protected getNativeActionKeys(): string[];
    protected preparePayloadForValidation(msgObj: Record<string, unknown>, options?: {
        allowUnknownElements?: boolean;
    }): Record<string, unknown>;
    protected extractOperationsFromObject(msgObj: Record<string, unknown>): InternalOperation[];
}
