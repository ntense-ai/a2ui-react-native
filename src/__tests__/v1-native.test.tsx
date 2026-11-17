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

import {createA2uiClient} from '../v1/client';
import {A2uiSurface} from '../v1/adapter';
import {BASIC_CATALOG_ID, createNativeCatalog} from '../v1/catalog';
import {parseNativeDate} from '../v1/components';
import {
  NodeResolver, peekValue, ResolvedBinding, isWritable, createFunctionImplementation, Catalog,
  BASIC_COMPONENTS, BASIC_FUNCTIONS, type RendererToAgentMessage,
} from '../v1/core';

type Client = ReturnType<typeof createA2uiClient>;
const create = (components: Record<string, unknown>[], dataModel = {}, surfaceId = 'main') => ({
  version: '1.0' as const, createSurface: {surfaceId, catalogId: BASIC_CATALOG_ID, components, dataModel},
});
const text = (id: string, value: unknown) => ({id, component: 'Text', text: value});
const flush = async () => {await Promise.resolve(); await Promise.resolve();};
const hosts = (tree: ReactTestRenderer, type: string) => tree.root.findAll(node => node.type === type);

async function mount(client: Client, surfaceId = 'main'): Promise<ReactTestRenderer> {
  let tree!: ReactTestRenderer;
  await act(async () => {
    tree = TestRenderer.create(<A2uiSurface surface={client.getSurface(surfaceId)!} />);
    await flush();
  });
  return tree;
}

describe('official v1.0 core and native adapter', () => {
  let client: Client;
  let tree: ReactTestRenderer | undefined;
  const outbound: RendererToAgentMessage[] = [];
  beforeEach(() => {
    outbound.length = 0;
    client = createA2uiClient({outboundListener: message => {outbound.push(message);}});
  });
  afterEach(() => {
    if (tree) act(() => tree?.unmount());
    tree = undefined;
    client.dispose();
  });

  it('loads the complete official basic schema and function set without a browser', () => {
    expect('window' in globalThis).toBe(false);
    expect('document' in globalThis).toBe(false);
    const catalog = createNativeCatalog();
    expect([...catalog.components.keys()]).toEqual(BASIC_COMPONENTS.map(api => api.name));
    expect([...catalog.functions.keys()]).toEqual(BASIC_FUNCTIONS.map(fn => fn.name));
    expect(catalog.components.size).toBe(18);
    expect(client.getRendererCapabilities({versions: ['1.0']})).toBeDefined();
  });

  it('reactively renders nested templates with relative and absolute bindings', async () => {
    client.processMessages(create([
      {id: 'root', component: 'Column', children: {componentId: 'card', path: '/items'}},
      {id: 'card', component: 'Card', child: 'body'},
      {id: 'body', component: 'Column', children: ['name', 'shared', 'index']},
      text('name', {'@path': 'name'}), text('shared', {'@path': '/title'}),
      text('index', {'@call': 'formatString', args: {value: 'Item ${@index(offset: 1)}'}}),
    ], {title: 'Shared', items: [{name: 'Alpha'}, {name: 'Beta'}]}));
    tree = await mount(client);
    expect(hosts(tree, 'Text').map(node => node.props.children)).toEqual(['Alpha', 'Shared', 'Item 1', 'Beta', 'Shared', 'Item 2']);
    await act(async () => {
      client.processMessages({version: '1.0', updateDataModel: {surfaceId: 'main', path: '/items/1/name', value: 'Updated'}});
      await flush();
    });
    expect(hosts(tree, 'Text').map(node => node.props.children)).toContain('Updated');
  });

  it('writes inputs to the model and resolves action context when pressed', async () => {
    client.processMessages(create([
      {id: 'root', component: 'Column', children: ['field', 'submit']},
      {id: 'field', component: 'TextField', label: 'Name', value: {'@path': '/name'}},
      {id: 'submit', component: 'Button', child: 'label', action: {event: {name: 'save', context: {name: {'@path': '/name'}}}}},
      text('label', 'Save'),
    ], {name: 'Before'}));
    tree = await mount(client);
    await act(async () => {hosts(tree!, 'TextInput')[0].props.onChangeText('After'); await flush();});
    expect(client.getSurface('main')!.dataModel.get('/name')).toBe('After');
    await act(async () => {hosts(tree!, 'Pressable')[0].props.onPress(); await flush();});
    expect(outbound).toContainEqual({version: '1.0', action: expect.objectContaining({
      name: 'save', surfaceId: 'main', sourceComponentId: 'submit', context: {name: 'After'}, timestamp: expect.any(String),
    })});
  });

  it('renders reactive checks and disables invalid buttons until input is valid', async () => {
    const checks = [{condition: {'@call': 'required', args: {value: {'@path': '/name'}}}, message: 'Enter a name'}];
    client.processMessages(create([
      {id: 'root', component: 'Column', children: ['field', 'submit']},
      {id: 'field', component: 'TextField', label: 'Name', value: {'@path': '/name'}, '@checks': checks},
      {id: 'submit', component: 'Button', child: 'label', '@checks': checks, action: {event: {name: 'save'}}},
      text('label', 'Save'),
    ], {name: ''}));
    tree = await mount(client);
    expect(hosts(tree, 'Pressable')[0].props.disabled).toBe(true);
    expect(hosts(tree, 'Text').map(node => node.props.children)).toContain('Enter a name');
    await act(async () => {hosts(tree!, 'TextInput')[0].props.onChangeText('Valid'); await flush();});
    expect(hosts(tree, 'Pressable')[0].props.disabled).toBe(false);
  });

  it('supports every standard component using native hosts', async () => {
    client.processMessages(create([
      {id: 'root', component: 'Column', children: ['row', 'list', 'tabs', 'modal', 'divider', 'image', 'icon', 'video', 'audio', 'field', 'check', 'choices', 'slider', 'date']},
      {id: 'row', component: 'Row', children: ['button']},
      {id: 'button', component: 'Button', child: 'buttonLabel', variant: 'primary', action: {event: {name: 'tap'}}},
      text('buttonLabel', 'Tap'),
      {id: 'list', component: 'List', direction: 'horizontal', children: ['card']},
      {id: 'card', component: 'Card', child: 'caption'}, text('caption', 'Caption'),
      {id: 'tabs', component: 'Tabs', tabs: [{title: 'First', child: 'tabBody'}, {title: 'Second', child: 'tabOther'}]},
      text('tabBody', 'First body'), text('tabOther', 'Second body'),
      {id: 'modal', component: 'Modal', trigger: 'trigger', content: 'dialog'}, text('trigger', 'Open'), text('dialog', 'Dialog'),
      {id: 'divider', component: 'Divider'},
      {id: 'image', component: 'Image', url: 'https://example.com/image.png', description: 'Image'},
      {id: 'icon', component: 'Icon', name: {svgPath: 'M0 0 L24 24'}},
      {id: 'video', component: 'Video', url: 'https://example.com/video.mp4'},
      {id: 'audio', component: 'AudioPlayer', url: 'https://example.com/audio.mp3'},
      {id: 'field', component: 'TextField', label: 'Name', value: {'@path': '/text'}},
      {id: 'check', component: 'CheckBox', value: {'@path': '/checked'}, label: 'Agree'},
      {id: 'choices', component: 'ChoicePicker', value: {'@path': '/choices'}, options: [{value: 'a', label: 'Option A'}], filterable: true},
      {id: 'slider', component: 'Slider', value: {'@path': '/number'}, min: 0, max: 10, steps: 5},
      {id: 'date', component: 'DateTimeInput', value: {'@path': '/date'}, enableDate: true},
    ], {text: '', checked: false, choices: [], number: 2, date: '2026-11-17'}));
    tree = await mount(client);
    for (const type of ['Text', 'Image', 'Svg', 'Video', 'Switch', 'Slider', 'DateTimePicker', 'Modal', 'ScrollView']) {
      expect(hosts(tree, type).length).toBeGreaterThan(0);
    }
    await act(async () => {
      hosts(tree!, 'Switch')[0].props.onValueChange(true);
      hosts(tree!, 'Slider')[0].props.onValueChange(6);
      hosts(tree!, 'Pressable').find(node => node.props.accessibilityLabel === 'Option A')!.props.onPress();
      hosts(tree!, 'DateTimePicker')[0].props.onChange({type: 'set'}, new Date(2026, 10, 18));
      await flush();
    });
    expect(client.getSurface('main')!.dataModel.get('/checked')).toBe(true);
    expect(client.getSurface('main')!.dataModel.get('/choices')).toEqual(['a']);
    expect(client.getSurface('main')!.dataModel.get('/number')).toBe(6);
    expect(client.getSurface('main')!.dataModel.get('/date')).toBe('2026-11-18');
    expect(hosts(tree, 'Slider')[0].props.step).toBe(2);
    await act(async () => {hosts(tree!, 'Pressable').find(node => node.props.children?.props?.children === 'Second')!.props.onPress();});
    expect(hosts(tree, 'Text').map(node => node.props.children)).toContain('Second body');
    expect(hosts(tree, 'Text').map(node => node.props.children)).not.toContain('First body');
  });

  it('maps explicit accessibility bindings and updates them with the model', async () => {
    client.processMessages(create([
      {id: 'root', component: 'TextField', label: 'Name', value: '', '@accessibility': {label: {'@path': '/label'}, description: 'Input hint', live: 'polite'}},
    ], {label: 'Explicit label'}));
    tree = await mount(client);
    expect(hosts(tree, 'TextInput')[0].props).toMatchObject({accessibilityLabel: 'Explicit label', accessibilityHint: 'Input hint', accessibilityLiveRegion: 'polite'});
  });

  it('rejects unsafe media and blocks passive or agent-initiated openUrl', async () => {
    const openUrl = jest.fn();
    const local = createA2uiClient({openUrl, outboundListener: message => {outbound.push(message);}});
    local.processMessages(create([{id: 'root', component: 'Image', url: 'file:///private/data'}]));
    tree = await mount(local);
    expect(hosts(tree, 'Image')).toHaveLength(0);
    await local.processMessagesAsync({version: '1.0', callRendererFunction: {
      functionCallId: 'blocked', callFunction: {'@call': 'openUrl', catalogId: BASIC_CATALOG_ID, args: {url: 'https://example.com'}},
    }});
    expect(openUrl).not.toHaveBeenCalled();
    expect(outbound).toContainEqual({version: '1.0', rendererFunctionResponse: expect.objectContaining({functionCallId: 'blocked', error: expect.objectContaining({code: 'INVALID_FUNCTION_CALL'})})});
    act(() => local.dispose());
  });

  it('executes a user-activated local action with a safe native URL', async () => {
    const openUrl = jest.fn();
    const local = createA2uiClient({openUrl, baseUrl: 'https://example.com/app/'});
    local.processMessages(create([
      {id: 'root', component: 'Button', child: 'label', action: {functionCall: {'@call': 'openUrl', args: {url: '../help'}}}},
      text('label', 'Help'),
    ]));
    tree = await mount(local);
    await act(async () => {hosts(tree!, 'Pressable')[0].props.onPress(); await flush();});
    expect(openUrl).toHaveBeenCalledWith('https://example.com/help');
    act(() => local.dispose());
  });

  it('isolates surfaces and supports replacement, deletion, and reporting of data models', () => {
    client.processMessages([create([text('root', {'@path': '/value'})], {value: 'First'}), create([text('root', 'Second')], {value: 'Second'}, 'other')]);
    client.processMessages({version: '1.0', updateDataModel: {surfaceId: 'main', value: {nested: {key: 1}}}});
    client.processMessages({version: '1.0', updateDataModel: {surfaceId: 'main', path: '/nested/key', value: null}});
    expect(client.getSurface('main')!.dataModel.get('/')).toEqual({nested: {}});
    expect(client.getSurface('other')!.dataModel.get('/value')).toBe('Second');
    client.processMessages({version: '1.0', deleteSurface: {surfaceId: 'main'}});
    expect(client.getSurface('main')).toBeUndefined();
    expect(client.getSurface('other')).toBeDefined();
  });

  it('keeps function-valued bindings read-only and path bindings writable', () => {
    client.processMessages(create([{id: 'root', component: 'TextField', label: 'Name', value: {'@path': '/value'}}], {value: 'Editable'}));
    const resolver = new NodeResolver(client.getSurface('main')!);
    const root = peekValue(resolver.rootNode)!;
    const binding = peekValue(root.props).value;
    expect(binding).toBeInstanceOf(ResolvedBinding);
    expect(isWritable(binding as ResolvedBinding<unknown>)).toBe(true);
    client.processMessages({version: '1.0', updateComponents: {surfaceId: 'main', components: [{
      id: 'root', component: 'TextField', label: 'Computed', value: {'@call': 'formatString', args: {value: 'Read only'}},
    }]}});
    const computed = peekValue(peekValue(resolver.rootNode)!.props).value as ResolvedBinding<unknown>;
    expect(computed.value).toBe('Read only');
    expect(isWritable(computed)).toBe(false);
    resolver.dispose();
    expect(resolver.activeNodeCount).toBe(0);
  });

  it('returns renderer RPC results and correlates agent RPC responses', async () => {
    const catalog = new Catalog('test:rpc', '1.0', [], [createFunctionImplementation({
      name: 'echo', returnType: 'string', allowedCallers: 'rendererOrAgent', schema: BASIC_FUNCTIONS.find(fn => fn.name === 'formatString')!.schema,
    }, args => args.value)]);
    const local = createA2uiClient({catalogs: [catalog], outboundListener: message => {outbound.push(message);}});
    await local.processMessagesAsync({version: '1.0', callRendererFunction: {functionCallId: 'echo_call', callFunction: {'@call': 'echo', catalogId: 'test:rpc', args: {value: 'Returned'}}}});
    expect(outbound).toContainEqual({version: '1.0', rendererFunctionResponse: {functionCallId: 'echo_call', value: 'Returned'}});
    local.processMessages(create([text('root', 'RPC')]));
    const pending = local.callAgentFunction('main', {'@call': 'remote', catalogId: BASIC_CATALOG_ID, args: {value: 1}}, {functionCallId: 'agent_call'});
    await flush();
    local.processMessages({version: '1.0', agentFunctionResponse: {functionCallId: 'agent_call', value: 'Remote result'}});
    await expect(pending).resolves.toBe('Remote result');
    act(() => local.dispose());
  });

  it('reactively renders an agent function result after its correlated response', async () => {
    client.processMessages(create([text('root', {'@call': 'remoteGreeting', args: {name: 'Alice'}})]));
    tree = await mount(client);
    const call = outbound.find(message => 'callAgentFunction' in message);
    expect(call && 'callAgentFunction' in call).toBe(true);
    if (!call || !('callAgentFunction' in call)) throw new Error('Expected an agent RPC call');
    await act(async () => {
      client.processMessages({version: '1.0', agentFunctionResponse: {
        functionCallId: call.callAgentFunction.functionCallId, value: 'Hello Alice',
      }});
      await flush();
    });
    expect(hosts(tree, 'Text')[0].props.children).toBe('Hello Alice');
  });

  it('upgrades unresolved child placeholders as component definitions stream in', async () => {
    client.processMessages(create([{id: 'root', component: 'Column', children: ['later']}]));
    tree = await mount(client);
    expect(hosts(tree, 'Text')).toHaveLength(0);
    await act(async () => {
      client.processMessages({version: '1.0', updateComponents: {surfaceId: 'main', components: [text('later', 'Arrived')]}});
      await flush();
    });
    expect(hosts(tree, 'Text')[0].props.children).toBe('Arrived');
  });

  it('parses date, time, and date-time values', () => {
    expect(parseNativeDate('2026-11-17')?.getFullYear()).toBe(2026);
    expect(parseNativeDate('13:45:00')?.getHours()).toBe(13);
    expect(parseNativeDate('invalid')).toBeUndefined();
  });
});
