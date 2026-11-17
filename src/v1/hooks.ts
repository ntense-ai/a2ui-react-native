import {useCallback, useEffect, useRef, useState, useSyncExternalStore} from 'react';
import {createA2uiClient, type A2uiClientOptions} from './client';
import {createA2uiJSONLParser} from './parser';
import type {MessageProcessor, SurfaceModel, RendererToAgentMessage} from './core';
import type {NativeComponentImplementation} from './catalog';

type Client = MessageProcessor<NativeComponentImplementation>;

/** Observe surface creation/deletion without taking ownership of the client. */
export function useA2uiSurfaces(client: Client | null): readonly SurfaceModel<NativeComponentImplementation>[] {
  const cache = useRef<readonly SurfaceModel<NativeComponentImplementation>[]>([]);
  const snapshot = useCallback(() => {
    const next = Array.from(client?.getSurfaces().values() ?? []);
    if (next.length !== cache.current.length || next.some((surface, index) => surface !== cache.current[index])) cache.current = next;
    return cache.current;
  }, [client]);
  const subscribe = useCallback((listener: () => void) => {
    if (!client) return () => {};
    const created = client.onSurfaceCreated(listener);
    const deleted = client.onSurfaceDeleted(listener);
    return () => {created.unsubscribe(); deleted.unsubscribe();};
  }, [client]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

export interface A2uiStreamOptions extends Omit<A2uiClientOptions, 'outboundListener'> {
  url: string;
  autoConnect?: boolean;
  /** HTTP POST endpoint for outbound envelopes; defaults to <url>/action. */
  actionUrl?: string;
  headers?: Record<string, string>;
  onError?: (error: Error) => void;
}

/** HTTP JSONL and WebSocket transport for the official v1.0 client. */
export function useA2uiStream(options: A2uiStreamOptions) {
  const optionsRef = useRef(options);
  optionsRef.current = options;
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setConnected] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const transport = useRef<{abort?: AbortController; socket?: WebSocket; generation: number}>({generation: 0});
  const clientRef = useRef<Client | null>(null);
  const mounted = useRef(false);
  const report = useCallback((value: unknown) => {
    const err = value instanceof Error ? value : new Error(String(value));
    if (!mounted.current) return;
    setError(err);
    optionsRef.current.onError?.(err);
  }, []);
  const disconnect = useCallback(() => {
    transport.current.generation++;
    transport.current.abort?.abort();
    transport.current.socket?.close();
    transport.current.abort = undefined;
    transport.current.socket = undefined;
    setConnected(false);
    setLoading(false);
  }, []);
  const sendMessage = useCallback(async (message: RendererToAgentMessage) => {
    const socket = transport.current.socket;
    if (socket) {
      if (socket.readyState !== 1) throw new Error('A2UI WebSocket is not connected.');
      socket.send(JSON.stringify(message));
      return;
    }
    const activeClient = clientRef.current;
    const config = optionsRef.current;
    if (/^wss?:/i.test(config.url)) throw new Error('A2UI WebSocket is not connected.');
    const response = await fetch(config.actionUrl ?? `${config.url.split('?')[0].replace(/\/$/, '')}/action`, {
      method: 'POST', headers: {'Content-Type': 'application/json', ...config.headers}, body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error(`A2UI action request failed: HTTP ${response.status}`);
    const body = await response.text();
    if (body.trim() && activeClient && clientRef.current === activeClient) {
      const parser = createA2uiJSONLParser({onMessage: value => activeClient.processMessages(value)});
      parser.feed(body); parser.end();
    }
  }, []);
  const connect = useCallback(async () => {
    disconnect();
    const activeClient = clientRef.current;
    if (!activeClient) return;
    const generation = transport.current.generation;
    const current = () => transport.current.generation === generation;
    setError(null); setLoading(true);
    const parser = createA2uiJSONLParser({
      onMessage: message => {if (current()) activeClient.processMessages(message);},
      onError: value => {if (current()) report(value);},
    });
    const config = optionsRef.current;
    if (/^wss?:/i.test(config.url)) {
      let socket: WebSocket;
      try {socket = new WebSocket(config.url, undefined, {headers: config.headers ?? {}});}
      catch (value) {report(value); setLoading(false); return;}
      transport.current.socket = socket;
      socket.onopen = () => {if (current()) {setConnected(true); setLoading(false);}};
      socket.onmessage = event => {
        if (!current()) return;
        try {parser.feed(String(event.data)); parser.feed('\n');} catch (value) {report(value);}
      };
      socket.onerror = () => {if (current()) {report(new Error('A2UI WebSocket connection failed.')); setConnected(false); setLoading(false);}};
      socket.onclose = () => {if (current()) {parser.end(); setConnected(false); setLoading(false);}};
      return;
    }
    const abort = new AbortController();
    transport.current.abort = abort;
    try {
      const response = await fetch(config.url, {headers: {Accept: 'application/x-ndjson', ...config.headers}, signal: abort.signal});
      if (!response.ok) throw new Error(`A2UI stream failed: HTTP ${response.status}`);
      if (!current()) return;
      setConnected(true); setLoading(false);
      // Some RN networking implementations expose only response.text().
      if (typeof TextDecoder !== 'undefined' && response.body && typeof response.body.getReader === 'function') {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        try {
          while (current()) {
            const next = await reader.read();
            if (next.done) break;
            parser.feed(decoder.decode(next.value, {stream: true}));
          }
          if (current()) parser.feed(decoder.decode());
        } finally {reader.releaseLock();}
      } else {
        const body = await response.text();
        if (current()) parser.feed(body);
      }
      if (current()) parser.end();
    } catch (value) {
      if (current() && !abort.signal.aborted) report(value);
    } finally {
      if (current()) {setConnected(false); setLoading(false);}
    }
  }, [disconnect, report]);
  const autoConnect = options.autoConnect ?? true;
  const url = options.url;
  useEffect(() => {
    mounted.current = true;
    const instance = createA2uiClient({...optionsRef.current, outboundListener: async message => {
      try {await sendMessage(message);} catch (value) {report(value); throw value;}
    }});
    clientRef.current = instance;
    setClient(instance);
    if (autoConnect) void connect();
    return () => {mounted.current = false; disconnect(); clientRef.current = null; instance.dispose();};
  }, [url, autoConnect, connect, disconnect, sendMessage, report]);
  const surfaces = useA2uiSurfaces(client);
  return {client, surfaces, isConnected, isLoading, error, connect, disconnect, sendMessage};
}
