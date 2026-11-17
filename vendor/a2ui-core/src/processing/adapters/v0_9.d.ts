import { BaseVersionAdapter, ProtocolVersion } from './base.js';
import { InternalOperation } from '../operations.js';
/**
 * Protocol version adapter for specification v0.9 and v0.9.1.
 */
export declare class V0Point9Adapter extends BaseVersionAdapter {
    readonly version: ProtocolVersion;
    protected readonly schema: import("zod").ZodUnion<[import("zod").ZodObject<{
        version: import("zod").ZodEnum<["v0.9", "v0.9.1"]>;
        createSurface: import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            catalogId: import("zod").ZodString;
            theme: import("zod").ZodOptional<import("zod").ZodAny>;
            sendDataModel: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "strict", import("zod").ZodTypeAny, {
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
    }, "strict", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        version: import("zod").ZodEnum<["v0.9", "v0.9.1"]>;
        updateComponents: import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            components: import("zod").ZodArray<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, "many">;
        }, "strict", import("zod").ZodTypeAny, {
            surfaceId: string;
            components: Record<string, any>[];
        }, {
            surfaceId: string;
            components: Record<string, any>[];
        }>;
    }, "strict", import("zod").ZodTypeAny, {
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
    }>, import("zod").ZodObject<{
        version: import("zod").ZodEnum<["v0.9", "v0.9.1"]>;
        updateDataModel: import("zod").ZodObject<{
            surfaceId: import("zod").ZodString;
            path: import("zod").ZodOptional<import("zod").ZodString>;
            value: import("zod").ZodOptional<import("zod").ZodAny>;
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
        version: "v0.9" | "v0.9.1";
    }, {
        updateDataModel: {
            surfaceId: string;
            path?: string | undefined;
            value?: any;
        };
        version: "v0.9" | "v0.9.1";
    }>, import("zod").ZodObject<{
        version: import("zod").ZodEnum<["v0.9", "v0.9.1"]>;
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
        version: "v0.9" | "v0.9.1";
    }, {
        deleteSurface: {
            surfaceId: string;
        };
        version: "v0.9" | "v0.9.1";
    }>]>;
    get compatibleCatalogVersions(): ReadonlySet<string>;
    protected getNativeActionKeys(): string[];
    protected extractOperationsFromObject(msgObj: Record<string, unknown>): InternalOperation[];
}
