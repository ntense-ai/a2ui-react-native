import type { OutboundActionMessage } from '../rpc/rpc-handler.js';
import type { ActionPayload } from '../state/surface-model.js';
/**
 * Formats an emitted `ActionPayload` into a versioned renderer-to-agent `action`
 * wire envelope.
 *
 * @param action Emitted surface action payload.
 * @param version Surface or fallback protocol version string.
 * @returns The wire envelope for v0.9, v0.9.1, or v1.0+, or `undefined` when
 *   the version is v0.8 or cannot be parsed.
 */
export declare function toOutboundActionMessage(action: ActionPayload, version: string | undefined): OutboundActionMessage | undefined;
