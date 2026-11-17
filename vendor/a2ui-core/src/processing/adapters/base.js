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
import { A2uiValidationError } from '../../errors.js';
import { formatZodIssue } from '../format-zod-issue.js';
import { extractEnvelopeErrorContext, mapErrorToRendererMessage } from '../message-error-mapper.js';
import { normalizeVersionString, toSemVer, toCanonicalVersion } from '../../common/semver.js';
/**
 * Canonical protocol versions supported by the A2UI runtime.
 */
export const SUPPORTED_PROTOCOL_VERSIONS = new Set([
    '0.8',
    '0.9',
    '0.9.1',
    '1.0',
]);
/**
 * Default explicit catalog-to-message protocol compatibility mapping.
 *
 * Maps an incoming message or surface protocol version to the set of catalog
 * protocol specification versions that it can accommodate.
 */
export const DEFAULT_CATALOG_COMPATIBILITY = {
    '0.8': new Set(['0.8']),
    '0.9': new Set(['0.9', '0.9.1']),
    '0.9.1': new Set(['0.9.1', '0.9']),
    '1.0': new Set(['1.0']),
};
/**
 * Evaluates whether a catalog protocol version is compatible with an incoming message or surface version.
 *
 * Compatibility is verified against explicit supported version sets.
 * Minor formatting differences ('v1.0', '1.0', '1.0.0', 'v1_0') normalize to the same canonical version.
 *
 * @param catalogVersion The catalog's declared protocol version.
 * @param messageVersion The incoming message or surface declared protocol version.
 * @param compatibilityMap Optional explicit compatibility mapping. Defaults to DEFAULT_CATALOG_COMPATIBILITY.
 * @return Whether the catalog version is compatible with the message version.
 */
export function isCatalogVersionCompatible(catalogVersion, messageVersion, compatibilityMap = DEFAULT_CATALOG_COMPATIBILITY) {
    if (!catalogVersion || !messageVersion) {
        return false;
    }
    const catalogCanonical = toCanonicalVersion(catalogVersion);
    const messageCanonical = toCanonicalVersion(messageVersion);
    if (catalogCanonical && messageCanonical) {
        if (catalogCanonical === messageCanonical) {
            return true;
        }
        const compatible = compatibilityMap[messageCanonical];
        if (compatible && compatible.has(catalogCanonical)) {
            return true;
        }
        // For SemVer >= 1.0.0, releases within the same major version are compatible,
        // ignoring pre-release identifiers.
        const catalogSemver = toSemVer(catalogVersion);
        const messageSemver = toSemVer(messageVersion);
        if (catalogSemver &&
            messageSemver &&
            catalogSemver.major >= 1 &&
            catalogSemver.major === messageSemver.major) {
            return true;
        }
        return false;
    }
    // Fallback for non-semver custom identifiers (e.g. 'custom' vs 'Vcustom')
    if (typeof catalogVersion !== 'string' || typeof messageVersion !== 'string') {
        return false;
    }
    const normalizedCatalog = normalizeVersionString(catalogVersion);
    const normalizedMessage = normalizeVersionString(messageVersion);
    return normalizedCatalog.length > 0 && normalizedCatalog === normalizedMessage;
}
let globalKnownActionsProvider;
/**
 * Registers a provider callback to dynamically supply known action keys across adapters.
 *
 * @param provider Callback returning a ReadonlySet of all known action keys.
 */
export function registerKnownActionsProvider(provider) {
    globalKnownActionsProvider = provider;
}
function validateActionSurfaceIds(msgObj, actionKeys) {
    for (const key of actionKeys) {
        const actionVal = msgObj[key];
        if (actionVal && typeof actionVal === 'object') {
            const actionObj = actionVal;
            if ('surfaceId' in actionObj &&
                actionObj.surfaceId !== undefined &&
                typeof actionObj.surfaceId !== 'string') {
                const msg = 'surfaceId must be a string';
                throw new A2uiValidationError(msg, [{ path: `/${key}/surfaceId`, code: 'type_mismatch', message: msg }], 'VALIDATION_ERROR', { path: '/surfaceId' });
            }
        }
    }
}
/**
 * Narrows a root-level `invalid_union` `ZodError` to the union branch matching `actionKey`
 * when the envelope defines a single native action key, avoiding unrelated union-branch noise.
 */
function selectActionUnionError(error, actionKey, nativeActionKeys) {
    if (error.issues.length !== 1) {
        return error;
    }
    const rootIssue = error.issues[0];
    if (rootIssue.code !== z.ZodIssueCode.invalid_union || rootIssue.path.length !== 0) {
        return error;
    }
    const matchingBranches = rootIssue.unionErrors.filter(branchErr => !branchErr.issues.some(issue => (issue.code === z.ZodIssueCode.unrecognized_keys &&
        issue.path.length === 0 &&
        issue.keys.includes(actionKey)) ||
        (issue.code === z.ZodIssueCode.invalid_type &&
            issue.path.length === 1 &&
            issue.path[0] !== actionKey &&
            nativeActionKeys.includes(String(issue.path[0])) &&
            issue.received === 'undefined')));
    return matchingBranches.length === 1 ? matchingBranches[0] : error;
}
/**
 * Base abstract class providing common payload unwrapping, schema validation,
 * and error formatting for protocol version adapters.
 */
export class BaseVersionAdapter {
    /** Canonical catalog protocol versions compatible with this adapter. */
    get compatibleCatalogVersions() {
        const canonical = toCanonicalVersion(this.version);
        return canonical ? new Set([canonical]) : new Set();
    }
    /** Set of valid message action keys supported by this protocol version. */
    get validActions() {
        return new Set(this.getNativeActionKeys());
    }
    /** Checks if a catalog protocol version is compatible with this adapter. */
    isCatalogCompatible(catalogVersion) {
        if (!catalogVersion) {
            return false;
        }
        return isCatalogVersionCompatible(catalogVersion, this.version);
    }
    extractOperations(payload, options) {
        if (!payload || typeof payload !== 'object')
            return [];
        if (Array.isArray(payload)) {
            return payload.flatMap(item => this.extractOperations(item, options));
        }
        const msgObj = payload;
        if (Array.isArray(msgObj.messages)) {
            return this.extractOperations(msgObj.messages, options);
        }
        const nativeActionKeys = this.getNativeActionKeys();
        validateActionSurfaceIds(msgObj, nativeActionKeys);
        const presentNativeKeys = nativeActionKeys.filter(k => Object.prototype.hasOwnProperty.call(msgObj, k)).sort();
        if (presentNativeKeys.length > 1) {
            throw new A2uiValidationError(`Message contains multiple conflicting update actions: ${presentNativeKeys.join(', ')}.`);
        }
        if (presentNativeKeys.length === 0) {
            const allKnown = globalKnownActionsProvider
                ? globalKnownActionsProvider()
                : new Set(nativeActionKeys);
            const otherAction = Object.keys(msgObj).find(k => allKnown.has(k) && !nativeActionKeys.includes(k));
            const sortedAllowed = nativeActionKeys.slice().sort().join(', ');
            if (otherAction) {
                const msg = `Invalid ${this.version} message: action '${otherAction}' is not supported in protocol version ${this.version}. Allowed actions: ${sortedAllowed}.`;
                throw new A2uiValidationError(msg, [{ path: '/version', code: 'invalid_value', message: msg }], 'VALIDATION_ERROR', { path: '/version' });
            }
            throw new A2uiValidationError(`Invalid ${this.version} message: message must contain exactly one update action: ${sortedAllowed}.`);
        }
        const preparedPayload = this.preparePayloadForValidation(msgObj, options);
        const parseResult = this.schema.safeParse(preparedPayload);
        if (!parseResult.success) {
            const scopedError = selectActionUnionError(parseResult.error, presentNativeKeys[0], nativeActionKeys);
            const formattedErrors = scopedError.errors.map(formatZodIssue).join('; ');
            const envCtx = extractEnvelopeErrorContext(msgObj, this.version);
            const preliminaryErr = new A2uiValidationError(`Invalid ${this.version} message: ${formattedErrors}`, scopedError, 'VALIDATION_ERROR');
            const mapped = mapErrorToRendererMessage(preliminaryErr, envCtx);
            preliminaryErr.path = mapped.error.path;
            preliminaryErr.surfaceId = mapped.error.surfaceId || undefined;
            preliminaryErr.functionCallId = mapped.error.functionCallId;
            throw preliminaryErr;
        }
        return this.extractOperationsFromObject(preparedPayload);
    }
    /**
     * Normalizes the message object before running schema validation.
     *
     * Defaults to attaching `version` if not present.
     *
     * @param msgObj Raw message object.
     * @param _options Optional validation configuration options.
     * @returns Normalized message payload for schema validation.
     */
    preparePayloadForValidation(msgObj, _options) {
        return 'version' in msgObj ? msgObj : { version: this.version, ...msgObj };
    }
}
