/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { z } from 'zod';
const annotations = new WeakMap();
const rawDescribeMethods = new WeakMap();
function cloneSchema(schema, description = schema.description) {
    const describeFn = rawDescribeMethods.get(schema) ?? z.ZodType?.prototype?.describe ?? schema.describe;
    return describeFn.call(schema, description);
}
function cloneWithDefAnnotation(schema, nextAnnotation, description = schema.description) {
    const copy = cloneSchema(schema, description);
    rawDescribeMethods.set(copy, z.ZodType?.prototype?.describe ?? copy.describe);
    annotations.set(copy, nextAnnotation);
    copy.describe = (nextDescription) => cloneWithDefAnnotation(copy, annotations.get(copy) ?? nextAnnotation, nextDescription);
    return copy;
}
/**
 * Returns a copy of a Zod schema that carries what a catalog document writes
 * about it beyond the schema itself.
 *
 * The copy validates exactly as `schema` does and has its type, so it can be
 * used wherever `schema` is. Annotating a copy keeps a shared schema, such as
 * a common type, free of the annotations of one of its uses.
 *
 * @param schema The schema to annotate.
 * @param annotation What the document writes about it.
 * @returns An annotated copy of `schema`.
 */
export function spec(schema, annotation) {
    const copy = cloneSchema(schema, schema.description);
    annotations.set(copy, { ...annotations.get(schema), ...annotation });
    return copy;
}
/**
 * Returns a copy of a Zod model that a catalog document declares under
 * `$defs` as `name`, such as the `CatalogComponentCommon` mixin of the v0.9
 * basic catalog or its `theme`.
 *
 * @param name The definition's name.
 * @param schema The definition's model.
 * @param annotation Anything else the document writes about the model.
 * @returns An annotated copy of `schema`.
 */
export function specDef(name, schema, annotation = {}) {
    const copy = cloneWithDefAnnotation(schema, {
        ...annotations.get(schema),
        ...annotation,
        defName: name,
    });
    annotations.set(copy, {
        ...annotations.get(copy),
        defName: name,
        defModel: copy,
    });
    return copy;
}
/**
 * Returns the annotation of a Zod schema itself, if any.
 *
 * @param schema A Zod schema.
 */
export function getSpecAnnotation(schema) {
    return typeof schema === 'object' && schema !== null ? annotations.get(schema) : undefined;
}
