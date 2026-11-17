import React from 'react';
import TestRenderer, {act, type ReactTestRenderer} from 'react-test-renderer';

jest.mock('react-native', () => ({
  NativeModules: {}, View: 'View', Text: 'Text', TextInput: 'TextInput', Pressable: 'Pressable', ScrollView: 'ScrollView',
  Image: 'Image', Switch: 'Switch', Modal: 'Modal', Platform: {OS: 'ios'},
  StyleSheet: {create: (styles: unknown) => styles}, Linking: {openURL: jest.fn()},
}));
jest.mock('@react-native-community/slider', () => 'Slider');
jest.mock('@react-native-community/datetimepicker', () => 'DateTimePicker');
jest.mock('react-native-video', () => 'Video');
jest.mock('react-native-svg', () => ({__esModule: true, default: 'Svg', Path: 'Path'}));

import {createA2uiJSONLParser} from '../v1/parser';
import {useA2uiStream, type A2uiStreamOptions} from '../v1/hooks';
import {BASIC_CATALOG_ID} from '../v1/catalog';
import type {RendererToAgentMessage} from '../v1/core';

const message = {version: '1.0', createSurface: {
  surfaceId: 'stream', catalogId: BASIC_CATALOG_ID,
  components: [{id: 'root', component: 'Text', text: 'Streamed'}],
}};
const update = {version: '1.0', updateDataModel: {surfaceId: 'stream', path: '/value', value: 'Updated'}};
const event: RendererToAgentMessage = {version: '1.0', action: {
  name: 'tap', surfaceId: 'stream', sourceComponentId: 'root', timestamp: '2026-11-17T00:00:00Z', context: {},
}};

describe('v1.0 JSONL parser', () => {
  it('accepts envelopes, arrays, wrappers, CRLF, split chunks, and EOF without newline', () => {
    const received = jest.fn();
    const parser = createA2uiJSONLParser({onMessage: received});
    const input = `${JSON.stringify(message)}\r\n${JSON.stringify([update])}\n${JSON.stringify({messages: [update]})}`;
    for (let offset = 0; offset < input.length; offset += 7) parser.feed(input.slice(offset, offset + 7));
    parser.end();
    expect(received.mock.calls.map(call => call[0])).toEqual([message, [update], {messages: [update]}]);
  });
  it('reports malformed envelopes and recovers at the next complete line', () => {
    const onMessage = jest.fn();
    const onError = jest.fn();
    const parser = createA2uiJSONLParser({onMessage, onError});
    parser.feed(`null\n{"version":"0.9","createSurface":{}}\n${JSON.stringify(message)}\n`);
    expect(onError).toHaveBeenCalledTimes(2);
    expect(onMessage).toHaveBeenCalledTimes(1);
  });
  it('accepts empty lists and rejects wrapper fields and oversized incomplete messages', () => {
    const onMessage = jest.fn();
    const parser = createA2uiJSONLParser({onMessage, maxBufferLength: 24});
    parser.feed('[]\n{"messages":[]}\n');
    expect(onMessage).toHaveBeenCalledTimes(2);
    expect(() => parser.feed('x'.repeat(25))).toThrow('maxBufferLength');
    const strict = createA2uiJSONLParser({onMessage});
    expect(() => strict.feed('{"messages":[],"extra":true}\n')).toThrow('wrappers');
  });
  it('discards unfinished content on reset', () => {
    const onMessage = jest.fn();
    const parser = createA2uiJSONLParser({onMessage});
    parser.feed('{unfinished'); parser.reset();
    parser.feed(JSON.stringify(message)); parser.end();
    expect(onMessage).toHaveBeenCalledWith(message);
  });
});

describe('v1.0 stream lifecycle', () => {
  let tree: ReactTestRenderer;
  let result: ReturnType<typeof useA2uiStream>;
  let fetchMock: jest.SpyInstance;
  const flush = async () => {for (let i = 0; i < 6; i++) await Promise.resolve();};
  function Probe({options}: {options: A2uiStreamOptions}) {result = useA2uiStream(options); return null;}
  beforeEach(() => {fetchMock = jest.spyOn(globalThis, 'fetch');});
  afterEach(() => {if (tree) act(() => tree.unmount()); fetchMock.mockRestore();});

  it('handles buffered native fetch, preserves its session on rerender, and processes POST responses', async () => {
    fetchMock.mockResolvedValueOnce({ok: true, body: null, text: async () => JSON.stringify(message)})
      .mockResolvedValueOnce({ok: true, text: async () => JSON.stringify(update)});
    await act(async () => {tree = TestRenderer.create(<Probe options={{url: 'https://example.com/stream?token=1'}} />); await flush();});
    expect(result!.surfaces).toHaveLength(1);
    expect(result!.isLoading).toBe(false);
    const client = result!.client;
    await act(async () => {
      tree.update(<Probe options={{url: 'https://example.com/stream?token=1', headers: {Authorization: 'updated'}}} />);
      await flush();
    });
    expect(result!.client).toBe(client);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await act(async () => {await result!.sendMessage(event); await flush();});
    expect(fetchMock.mock.calls[1][0]).toBe('https://example.com/stream/action');
    expect(fetchMock.mock.calls[1][1].headers.Authorization).toBe('updated');
    expect(JSON.parse(fetchMock.mock.calls[1][1].body)).toEqual(event);
    expect(result!.client!.getSurface('stream')!.dataModel.get('/value')).toBe('Updated');
    act(() => tree.unmount());
    expect(client!.getSurfaces().size).toBe(0);
  });

  it('decodes split UTF-8 stream chunks and releases the reader', async () => {
    const bytes = new TextEncoder().encode(JSON.stringify({...message, createSurface: {...message.createSurface, components: [{id: 'root', component: 'Text', text: '你好'}]}}));
    const read = jest.fn().mockResolvedValueOnce({done: false, value: bytes.slice(0, bytes.length - 6)})
      .mockResolvedValueOnce({done: false, value: bytes.slice(bytes.length - 6)}).mockResolvedValueOnce({done: true});
    const releaseLock = jest.fn();
    fetchMock.mockResolvedValue({ok: true, body: {getReader: () => ({read, releaseLock})}});
    await act(async () => {tree = TestRenderer.create(<Probe options={{url: 'https://example.com/stream'}} />); await flush();});
    expect(result!.surfaces).toHaveLength(1);
    expect(releaseLock).toHaveBeenCalledTimes(1);
  });

  it('reports failed HTTP status without creating a surface', async () => {
    const onError = jest.fn();
    fetchMock.mockResolvedValue({ok: false, status: 503});
    await act(async () => {tree = TestRenderer.create(<Probe options={{url: 'https://example.com/stream', onError}} />); await flush();});
    expect(result!.error?.message).toContain('503');
    expect(result!.isLoading).toBe(false);
    expect(result!.surfaces).toHaveLength(0);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('uses WebSocket frames for incoming messages and outbound envelopes', async () => {
    class Socket {
      static instances: Socket[] = [];
      readyState = 0;
      onopen?: () => void;
      onmessage?: (event: {data: string}) => void;
      onclose?: () => void;
      onerror?: () => void;
      send = jest.fn();
      close = jest.fn(() => {this.readyState = 3; this.onclose?.();});
      constructor() {Socket.instances.push(this);}
    }
    const original = Object.getOwnPropertyDescriptor(globalThis, 'WebSocket');
    Object.defineProperty(globalThis, 'WebSocket', {configurable: true, writable: true, value: Socket});
    try {
      await act(async () => {tree = TestRenderer.create(<Probe options={{url: 'wss://example.com/stream'}} />); await flush();});
      const socket = Socket.instances[0];
      await act(async () => {
        socket.readyState = 1; socket.onopen?.(); socket.onmessage?.({data: JSON.stringify(message)}); await flush();
      });
      expect(result!.isConnected).toBe(true);
      expect(result!.surfaces).toHaveLength(1);
      await result!.sendMessage(event);
      expect(socket.send).toHaveBeenCalledWith(JSON.stringify(event));
      act(() => result!.disconnect());
      expect(socket.close).toHaveBeenCalledTimes(1);
      expect(result!.isConnected).toBe(false);
      expect(fetchMock).not.toHaveBeenCalled();
    } finally {
      if (original) Object.defineProperty(globalThis, 'WebSocket', original);
      else Reflect.deleteProperty(globalThis, 'WebSocket');
    }
  });
});
