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
import { A2uiMessageSchema } from '../../v0_8/schema/server-to-client.js';
function normalizeV08Component(comp) {
    if (!comp || typeof comp !== 'object') {
        return { id: '', component: '' };
    }
    const c = comp;
    let componentName = typeof c.component === 'string' ? c.component : '';
    const props = {};
    for (const [k, v] of Object.entries(c)) {
        if (k !== 'component' && k !== 'id') {
            props[k] = v;
        }
    }
    if (c.component && typeof c.component === 'object') {
        const obj = c.component;
        const keys = Object.keys(obj);
        if (keys.length > 0) {
            componentName = keys[0];
            const compProps = obj[keys[0]];
            if (compProps &&
                typeof compProps === 'object' &&
                compProps !== null &&
                !Array.isArray(compProps)) {
                Object.assign(props, compProps);
            }
        }
    }
    return {
        ...props,
        id: String(c.id ?? ''),
        component: componentName,
    };
}
/**
 * Protocol version adapter for specification v0.8.
 */
export class V0Point8Adapter extends BaseVersionAdapter {
    constructor() {
        super(...arguments);
        this.version = 'v0.8';
        this.schema = A2uiMessageSchema;
    }
    getNativeActionKeys() {
        return ['beginRendering', 'surfaceUpdate', 'dataModelUpdate', 'deleteSurface'];
    }
    preparePayloadForValidation(msgObj) {
        const msgWithoutVersion = { ...msgObj };
        delete msgWithoutVersion.version;
        return msgWithoutVersion;
    }
    extractOperationsFromObject(msgObj) {
        const ops = [];
        if ('beginRendering' in msgObj) {
            const cs = msgObj.beginRendering;
            ops.push({
                type: 'createSurface',
                surfaceId: String(cs?.surfaceId ?? ''),
                catalogId: typeof cs?.catalogId === 'string' ? cs.catalogId : undefined,
                theme: cs?.theme ?? cs?.styles,
                sendDataModel: Boolean(cs?.sendDataModel),
                components: Array.isArray(cs?.components)
                    ? cs.components.map(normalizeV08Component)
                    : undefined,
                dataModel: cs?.dataModel && typeof cs.dataModel === 'object' && !Array.isArray(cs.dataModel)
                    ? cs.dataModel
                    : undefined,
                version: typeof msgObj.version === 'string' ? msgObj.version : this.version,
                rootId: typeof cs?.root === 'string' && cs.root ? cs.root : undefined,
            });
        }
        if ('surfaceUpdate' in msgObj) {
            const uc = msgObj.surfaceUpdate;
            ops.push({
                type: 'updateComponents',
                surfaceId: String(uc?.surfaceId ?? ''),
                components: Array.isArray(uc?.components) ? uc.components.map(normalizeV08Component) : [],
            });
        }
        if ('dataModelUpdate' in msgObj) {
            const ud = msgObj.dataModelUpdate;
            const surfaceId = String(ud?.surfaceId ?? '');
            const rawPath = typeof ud?.path === 'string' ? ud.path.trim() : '';
            const basePath = rawPath && rawPath !== '/'
                ? (rawPath.startsWith('/') ? rawPath : `/${rawPath}`).replace(/\/+$/, '')
                : '';
            const extractContentValue = (entry) => {
                if ('valueNumber' in entry)
                    return entry.valueNumber;
                if ('valueString' in entry)
                    return entry.valueString;
                if ('valueBoolean' in entry)
                    return entry.valueBoolean;
                if ('valueObject' in entry)
                    return entry.valueObject;
                if ('valueArray' in entry)
                    return entry.valueArray;
                if (Array.isArray(entry.valueMap)) {
                    const nested = {};
                    for (const sub of entry.valueMap) {
                        if (sub && typeof sub === 'object' && typeof sub.key === 'string') {
                            nested[sub.key] = extractContentValue(sub);
                        }
                    }
                    return nested;
                }
                return entry.value;
            };
            if (Array.isArray(ud?.contents)) {
                for (const item of ud.contents) {
                    if (item && typeof item === 'object' && typeof item.key === 'string') {
                        const val = extractContentValue(item);
                        const itemKey = item.key.replace(/^\/+/, '');
                        const fullPath = itemKey === '.' || itemKey === '' ? basePath || '/' : `${basePath}/${itemKey}`;
                        ops.push({
                            type: 'updateDataModel',
                            surfaceId,
                            path: fullPath,
                            value: val,
                        });
                    }
                }
            }
            else {
                ops.push({
                    type: 'updateDataModel',
                    surfaceId,
                    path: typeof ud?.path === 'string' ? ud.path : undefined,
                    value: ud?.value,
                });
            }
        }
        if ('deleteSurface' in msgObj) {
            const ds = msgObj.deleteSurface;
            ops.push({
                type: 'deleteSurface',
                surfaceId: String(ds?.surfaceId ?? ''),
            });
        }
        return ops;
    }
}
