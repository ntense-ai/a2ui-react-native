import { z } from 'zod';
import { type ChildRefKind, type RefSchemaOptions, markChildRef, childRefKindOf } from '../../types/child-ref-helpers.js';
import { ChildListSchema, ComponentIdSchema } from './common-types.js';
export { type ChildRefKind, type RefSchemaOptions, markChildRef, childRefKindOf };
export declare const TemplateChildListSchema: z.ZodObject<{
    componentId: z.ZodLazy<z.ZodString>;
    path: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
    componentId: string;
}, {
    path: string;
    componentId: string;
}>;
export type TemplateChildList = z.infer<typeof TemplateChildListSchema>;
export declare function componentId(options?: RefSchemaOptions): typeof ComponentIdSchema;
export declare function dynamicString(description?: string): z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
}>, z.ZodAny>>]>;
export declare function dynamicNumber(description?: string): z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
}>, z.ZodAny>>]>;
export declare function dynamicBoolean(description?: string): z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
}>, z.ZodAny>>]>;
export declare function dynamicValue(description?: string): z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
}>, z.ZodAny>>]>;
export declare function dynamicStringList(description?: string): z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
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
}>, z.ZodAny>>]>;
export declare function childList(options?: RefSchemaOptions): typeof ChildListSchema;
/**
 * Zod schema validating any component payload in a v1.0 message (excluding Surface).
 *
 * Only the structural `id` and `component` are checked here. The envelope
 * mixins (`@metadata`, `@catalogId`, `@accessibility`, `@checks`, and during
 * the transition their legacy bare names) are checked by `PayloadValidator`
 * against the component's schema, which may declare custom properties named
 * `metadata`, `catalogId`, `accessibility`, or `checks`.
 */
export declare const AnyComponentSchema: z.ZodType<any>;
export type AnyComponent = z.infer<typeof AnyComponentSchema>;
/** Zod schema validating a non-empty array of UI component payloads. */
export declare const ComponentsListSchema: z.ZodArray<z.ZodType<any, z.ZodTypeDef, any>, "many">;
export type ComponentsList = z.infer<typeof ComponentsListSchema>;
/** Zod schema validating multi-version renderer capabilities maps across protocol versions. */
export declare const RendererCapabilitiesSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
export type RendererCapabilities = z.infer<typeof RendererCapabilitiesSchema>;
