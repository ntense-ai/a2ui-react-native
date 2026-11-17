import { ProtocolVersion, VersionAdapter, VersionAdapterResolver } from './base.js';
/**
 * Resolves version adapters for protocol specification versions.
 */
export declare class VersionAdapterFactory implements VersionAdapterResolver {
    private readonly adapters;
    /**
     * Returns the aggregated set of all action keys supported by all registered adapters.
     *
     * @return A set of all supported action key strings.
     */
    getAllKnownActions(): ReadonlySet<string>;
    /**
     * Dynamically registers a version adapter on this factory instance.
     *
     * @param adapter The version adapter instance to register.
     */
    registerAdapter(adapter: VersionAdapter): void;
    /**
     * Resolves the version adapter for the specified version string from this factory instance.
     *
     * @param version The protocol version string (e.g. '1.0').
     * @return The matching version adapter.
     * @throws A2uiValidationError if the version string is unsupported.
     */
    getAdapter(version: ProtocolVersion | string): VersionAdapter;
    /**
     * Resolves the version adapter directly from an incoming message payload using this factory instance.
     *
     * @param payload The raw JSON message payload.
     * @returns The resolved version adapter.
     * @throws A2uiValidationError if the payload is missing a valid 'version' string.
     */
    resolveFromPayload(payload: unknown): VersionAdapter;
    /**
     * Registers a version adapter on the default singleton factory instance.
     *
     * @param adapter Version adapter instance to register.
     */
    static registerAdapter(adapter: VersionAdapter): void;
    /**
     * Resolves a version adapter for the specified version from the default singleton factory instance.
     *
     * @param version Protocol version string.
     * @return Matching version adapter.
     */
    static getAdapter(version: ProtocolVersion | string): VersionAdapter;
    /**
     * Resolves a version adapter directly from a payload using the default singleton factory instance.
     *
     * @param payload Raw JSON message payload.
     * @returns Resolved version adapter.
     */
    static resolveFromPayload(payload: unknown): VersionAdapter;
    /**
     * Returns the aggregated set of all action keys supported by all registered adapters
     * from the default singleton factory instance.
     *
     * @return A set of all supported action key strings.
     */
    static getAllKnownActions(): ReadonlySet<string>;
}
/** Default singleton version adapter factory instance. */
export declare const defaultVersionAdapterFactory: VersionAdapterFactory;
