import { z } from 'zod';
import { InternalOperation } from '../operations.js';
import { SemVer } from '../../common/semver.js';
/**
 * Union of supported A2UI protocol version strings.
 */
export type ProtocolVersion = 'v0.8' | 'v0.9' | 'v0.9.1' | '1.0' | (string & {});
/**
 * Canonical protocol versions supported by the A2UI runtime.
 */
export declare const SUPPORTED_PROTOCOL_VERSIONS: ReadonlySet<string>;
/**
 * Default explicit catalog-to-message protocol compatibility mapping.
 *
 * Maps an incoming message or surface protocol version to the set of catalog
 * protocol specification versions that it can accommodate.
 */
export declare const DEFAULT_CATALOG_COMPATIBILITY: Readonly<Record<string, ReadonlySet<string>>>;
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
export declare function isCatalogVersionCompatible(catalogVersion: string | SemVer | undefined | null, messageVersion: string | SemVer | undefined | null, compatibilityMap?: Readonly<Record<string, ReadonlySet<string>>>): boolean;
/**
 * Resolves a version adapter for a given protocol version or raw payload.
 */
export interface VersionAdapterResolver {
    /** Resolves an adapter by protocol version string. */
    getAdapter(version: ProtocolVersion | string): VersionAdapter;
    /** Resolves an adapter from a raw message payload. */
    resolveFromPayload(payload: unknown): VersionAdapter;
}
/**
 * Isolates protocol syntax differences across specification versions.
 */
export interface VersionAdapter {
    /** Protocol version string supported by this adapter (e.g. 'v1.0'). */
    readonly version: ProtocolVersion;
    /** Set of canonical catalog protocol versions compatible with this adapter. */
    readonly compatibleCatalogVersions?: ReadonlySet<string>;
    /** Set of action keys supported by this version adapter. */
    readonly validActions?: ReadonlySet<string>;
    /**
     * Checks if a catalog protocol version is compatible with this adapter.
     *
     * @param catalogVersion The catalog's declared protocol version.
     * @return Whether the catalog version is compatible.
     */
    isCatalogCompatible?(catalogVersion: string | SemVer | undefined | null): boolean;
    /**
     * Converts a raw message payload or payload list into canonical internal operations.
     *
     * @param payload The raw JSON message payload or message array.
     * @param options Optional validation configuration options.
     * @returns Array of canonical internal operations.
     */
    extractOperations(payload: unknown, options?: {
        allowUnknownElements?: boolean;
    }): InternalOperation[];
}
/** Provider callback returning the set of all known action keys across registered adapters. */
export type KnownActionsProvider = () => ReadonlySet<string>;
/**
 * Registers a provider callback to dynamically supply known action keys across adapters.
 *
 * @param provider Callback returning a ReadonlySet of all known action keys.
 */
export declare function registerKnownActionsProvider(provider: KnownActionsProvider): void;
/**
 * Base abstract class providing common payload unwrapping, schema validation,
 * and error formatting for protocol version adapters.
 */
export declare abstract class BaseVersionAdapter implements VersionAdapter {
    abstract readonly version: ProtocolVersion;
    protected abstract readonly schema: z.ZodTypeAny;
    /** Canonical catalog protocol versions compatible with this adapter. */
    get compatibleCatalogVersions(): ReadonlySet<string>;
    /** Set of valid message action keys supported by this protocol version. */
    get validActions(): ReadonlySet<string>;
    /** Checks if a catalog protocol version is compatible with this adapter. */
    isCatalogCompatible(catalogVersion: string | SemVer | undefined | null): boolean;
    protected abstract getNativeActionKeys(): string[];
    extractOperations(payload: unknown, options?: {
        allowUnknownElements?: boolean;
    }): InternalOperation[];
    /**
     * Normalizes the message object before running schema validation.
     *
     * Defaults to attaching `version` if not present.
     *
     * @param msgObj Raw message object.
     * @param _options Optional validation configuration options.
     * @returns Normalized message payload for schema validation.
     */
    protected preparePayloadForValidation(msgObj: Record<string, unknown>, _options?: {
        allowUnknownElements?: boolean;
    }): Record<string, unknown>;
    /**
     * Converts a validated message object into canonical internal operations.
     *
     * @param msgObj Validated message payload.
     * @returns Array of canonical internal operations.
     */
    protected abstract extractOperationsFromObject(msgObj: Record<string, unknown>): InternalOperation[];
}
