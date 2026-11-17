import { z } from 'zod';
/** Zod schema validating the strict v1.0 protocol renderer capabilities payload. */
export declare const V10RendererCapabilitiesSchema: z.ZodObject<{
    supportedCatalogIds: z.ZodArray<z.ZodString, "many">;
    inlineCatalogs: z.ZodOptional<z.ZodArray<z.ZodRecord<z.ZodString, z.ZodAny>, "many">>;
}, "strip", z.ZodTypeAny, {
    supportedCatalogIds: string[];
    inlineCatalogs?: Record<string, any>[] | undefined;
}, {
    supportedCatalogIds: string[];
    inlineCatalogs?: Record<string, any>[] | undefined;
}>;
export type V10RendererCapabilities = z.infer<typeof V10RendererCapabilitiesSchema>;
