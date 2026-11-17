import {AgentToRendererMessageSchema, type ProcessableMessagePayload} from './core';

export interface A2uiJSONLParserOptions {
  onMessage: (message: ProcessableMessagePayload) => void;
  onError?: (error: Error, line: string) => void;
  onComplete?: () => void;
  maxBufferLength?: number;
}

/** Accepts v1.0 envelopes, message arrays, and {messages: [...]} transport wrappers. */
export function createA2uiJSONLParser(options: A2uiJSONLParserOptions): {
  feed: (chunk: string) => void;
  end: () => void;
  reset: () => void;
} {
  let buffer = '';
  const limit = options.maxBufferLength ?? 8 * 1024 * 1024;
  function line(raw: string): void {
    if (!raw.trim()) return;
    try {
      const value: unknown = JSON.parse(raw);
      const messages = Array.isArray(value) ? value
        : value && typeof value === 'object' && 'messages' in value ? value.messages : [value];
      if (!Array.isArray(messages)) throw new Error('Expected an A2UI message or message list.');
      if (!Array.isArray(value) && value && typeof value === 'object' && 'messages' in value && Object.keys(value).length !== 1) {
        throw new Error('A2UI message list wrappers may only contain messages.');
      }
      for (const message of messages) AgentToRendererMessageSchema.parse(message);
      options.onMessage(value as ProcessableMessagePayload);
    } catch (error) {
      if (!options.onError) throw error;
      options.onError(error instanceof Error ? error : new Error(String(error)), raw);
    }
  }
  return {
    feed(chunk) {
      buffer += chunk;
      let newline: number;
      while ((newline = buffer.indexOf('\n')) !== -1) {
        const complete = buffer.slice(0, newline);
        buffer = buffer.slice(newline + 1);
        if (complete.length > limit) throw new Error('A2UI message exceeds maxBufferLength.');
        line(complete);
      }
      if (buffer.length > limit) {buffer = ''; throw new Error('A2UI message exceeds maxBufferLength.');}
    },
    end() {const remaining = buffer; buffer = ''; line(remaining); options.onComplete?.();},
    reset() {buffer = '';},
  };
}
