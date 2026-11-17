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
/**
 * All supported internal operation type discriminator strings.
 */
export const INTERNAL_OPERATION_TYPES = [
    'createSurface',
    'updateComponents',
    'updateDataModel',
    'deleteSurface',
    'callRendererFunction',
    'agentFunctionResponse',
];
/**
 * Determines whether a given value is a valid {@link InternalOperation}.
 *
 * @param payload The candidate value to inspect.
 * @returns `true` if the payload conforms to an internal operation structure; otherwise `false`.
 */
export function isInternalOperation(payload) {
    return (typeof payload === 'object' &&
        payload !== null &&
        'type' in payload &&
        typeof payload.type === 'string' &&
        INTERNAL_OPERATION_TYPES.includes(payload.type));
}
