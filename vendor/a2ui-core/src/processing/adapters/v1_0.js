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
import { BaseVersionAdapter } from './base.js';
import { INTERNAL_OPERATION_TYPES, } from '../operations.js';
import { A2uiValidationError } from '../../errors.js';
import { AgentToRendererMessageSchema } from '../../v1_0/schema/agent-to-renderer.js';
function assertObjectArgs(cf, version, functionCallId) {
    if (Object.prototype.hasOwnProperty.call(cf, 'args') &&
        cf.args !== undefined &&
        (typeof cf.args !== 'object' || cf.args === null || Array.isArray(cf.args))) {
        throw new A2uiValidationError(`Invalid ${version} message: callRendererFunction.callFunction.args: Expected object, received ${Array.isArray(cf.args) ? 'array' : typeof cf.args}`, undefined, 'VALIDATION_ERROR', { functionCallId: functionCallId || undefined });
    }
}
function extractCallRendererFunctionOp(crf, version) {
    const cf = (crf?.callFunction || {});
    const functionCallId = String(crf?.functionCallId || '');
    assertObjectArgs(cf, version, functionCallId);
    return {
        type: 'callRendererFunction',
        surfaceId: typeof crf?.surfaceId === 'string' ? crf.surfaceId : undefined,
        functionCallId,
        call: String(cf?.['@call'] || cf?.call || ''),
        version,
        catalogId: typeof cf?.catalogId === 'string' ? cf?.catalogId : undefined,
        args: cf?.args && typeof cf.args === 'object' && !Array.isArray(cf.args)
            ? cf.args
            : {},
    };
}
/**
 * Protocol version adapter for specification v1.0.
 */
export class V1Point0Adapter extends BaseVersionAdapter {
    constructor() {
        super(...arguments);
        this.version = '1.0';
        this.schema = AgentToRendererMessageSchema;
    }
    getNativeActionKeys() {
        return [...INTERNAL_OPERATION_TYPES];
    }
    preparePayloadForValidation(msgObj, options) {
        const payload = super.preparePayloadForValidation(msgObj, options);
        const allowUnknownElements = options ? (options.allowUnknownElements ?? false) : true;
        if (allowUnknownElements &&
            typeof payload.createSurface === 'object' &&
            payload.createSurface !== null &&
            !Array.isArray(payload.createSurface)) {
            const cs = payload.createSurface;
            if ('theme' in cs) {
                const withoutTheme = { ...cs };
                delete withoutTheme.theme;
                return { ...payload, createSurface: withoutTheme };
            }
        }
        return payload;
    }
    extractOperationsFromObject(msgObj) {
        const ops = [];
        if ('createSurface' in msgObj) {
            const cs = msgObj.createSurface;
            ops.push({
                type: 'createSurface',
                surfaceId: String(cs?.surfaceId || ''),
                catalogId: typeof cs?.catalogId === 'string' ? cs.catalogId : undefined,
                sendDataModel: Boolean(cs?.sendDataModel),
                components: Array.isArray(cs?.components)
                    ? cs.components
                    : undefined,
                dataModel: cs?.dataModel && typeof cs.dataModel === 'object' && !Array.isArray(cs.dataModel)
                    ? cs.dataModel
                    : undefined,
                version: typeof msgObj.version === 'string' ? msgObj.version : this.version,
                metadata: cs?.metadata && typeof cs.metadata === 'object' && !Array.isArray(cs.metadata)
                    ? cs.metadata
                    : undefined,
            });
        }
        if ('updateComponents' in msgObj) {
            const uc = msgObj.updateComponents;
            ops.push({
                type: 'updateComponents',
                surfaceId: String(uc?.surfaceId || ''),
                components: Array.isArray(uc?.components)
                    ? uc.components
                    : [],
            });
        }
        if ('updateDataModel' in msgObj) {
            const ud = msgObj.updateDataModel;
            ops.push({
                type: 'updateDataModel',
                surfaceId: String(ud?.surfaceId || ''),
                path: typeof ud?.path === 'string' ? ud.path : undefined,
                value: ud?.value,
            });
        }
        if ('deleteSurface' in msgObj) {
            const ds = msgObj.deleteSurface;
            ops.push({
                type: 'deleteSurface',
                surfaceId: String(ds?.surfaceId || ''),
            });
        }
        if ('callRendererFunction' in msgObj) {
            ops.push(extractCallRendererFunctionOp(msgObj.callRendererFunction, this.version));
        }
        if ('agentFunctionResponse' in msgObj) {
            const afr = msgObj.agentFunctionResponse;
            ops.push({
                type: 'agentFunctionResponse',
                functionCallId: String(afr?.functionCallId || ''),
                version: this.version,
                value: afr?.value,
                error: afr?.error && typeof afr.error === 'object'
                    ? afr.error
                    : undefined,
            });
        }
        return ops;
    }
}
