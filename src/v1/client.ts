import {MessageProcessor, type MessageProcessorOptions, type RendererToAgentMessage} from './core';
import {createNativeCatalog, type NativeCatalogOptions, type NativeComponentImplementation} from './catalog';
import type {Catalog} from './core';

export interface A2uiClientOptions extends Omit<MessageProcessorOptions, 'outboundListener' | 'version' | 'unifiedOutbound'>, NativeCatalogOptions {
  /** Every outbound v1.0 action, error, or function envelope. */
  outboundListener?: (message: RendererToAgentMessage) => void | Promise<void>;
  /** Additional catalogs; components must supply native render implementations. */
  catalogs?: Catalog<NativeComponentImplementation>[];
}

/** Create a v1.0 client with one standard outbound channel for actions, errors, and RPC. */
export function createA2uiClient(options: A2uiClientOptions = {}): MessageProcessor<NativeComponentImplementation> {
  return new MessageProcessor<NativeComponentImplementation>([createNativeCatalog(options), ...(options.catalogs ?? [])], undefined, {
    ...options,
    version: '1.0',
    outboundListener: options.outboundListener ? message => {
      if (message.version !== '1.0') throw new Error('The native client expects A2UI v1.0 envelopes.');
      return options.outboundListener!(message as RendererToAgentMessage);
    } : undefined,
    unifiedOutbound: Boolean(options.outboundListener),
  });
}
