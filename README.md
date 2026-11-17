# A2UI React Native

Native rendering for the [A2UI v1.0 protocol](https://a2ui.org/specification/v1.0-a2ui/), built on the [official A2UI core](https://github.com/a2ui-project/a2ui).

The v1.0 implementation uses the official message processor, schemas, node resolver, reactive bindings, expression functions, validation, and RPC. A React Native adapter renders the resolved nodes without HTML, Web Components, or a WebView.

## Install

Requires React 18+ and React Native 0.73+ on iOS or Android.

```sh
npm install a2ui-react-native \
  @react-native-community/datetimepicker@^8.4.4 \
  @react-native-community/slider@^4.5.7 \
  react-native-svg@^15.8.0 \
  react-native-video@^6.18.0
```

Install iOS pods after adding the native dependencies. In Expo, use a development build that includes these native modules.

## Render v1.0 messages

```tsx
import React from 'react';
import {
  A2uiSurface,
  BASIC_CATALOG_ID,
  createA2uiClient,
  useA2uiSurfaces,
} from 'a2ui-react-native/v1';

// The transport/session owner creates this once and calls client.dispose()
// when the session ends.
const client = createA2uiClient({
  baseUrl: 'https://example.com/',
  outboundListener: async message => {
    // Receives complete v1.0 action, error, and function-response envelopes.
    const response = await fetch('https://example.com/agent/action', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  },
});

client.processMessages({
  version: '1.0',
  createSurface: {
    surfaceId: 'welcome',
    catalogId: BASIC_CATALOG_ID,
    dataModel: {name: ''},
    components: [
      {id: 'root', component: 'Column', children: ['name', 'submit']},
      {
        id: 'name', component: 'TextField', label: 'Your name',
        value: {'@path': '/name'},
      },
      {
        id: 'submit', component: 'Button', child: 'submitLabel',
        variant: 'primary',
        action: {event: {name: 'greet', context: {name: {'@path': '/name'}}}},
      },
      {id: 'submitLabel', component: 'Text', text: 'Say hello'},
    ],
  },
});

export default function App() {
  const surfaces = useA2uiSurfaces(client);
  return <>{surfaces.map(surface => <A2uiSurface key={surface.id} surface={surface} />)}</>;
}
```

The standard catalog ID is:

```text
https://a2ui.org/specification/v1_0/catalogs/basic/catalog.json
```

Components use `component`, the surface root has ID `root`, and bindings use `{"@path": "/name"}`. Input edits write to the model immediately; action context resolves when the user activates the action.

## Streaming

```tsx
import React from 'react';
import {Text} from 'react-native';
import {A2uiSurface, useA2uiStream} from 'a2ui-react-native/v1';

export default function StreamingApp() {
  const {surfaces, isLoading, error} = useA2uiStream({
    url: 'https://example.com/agent/stream', // Also accepts ws:// and wss://.
    actionUrl: 'https://example.com/agent/action',
    baseUrl: 'https://example.com/',
    autoConnect: true,
  });

  if (error) return <Text>{error.message}</Text>;
  if (isLoading) return <Text>Connecting…</Text>;
  return <>{surfaces.map(surface => <A2uiSurface key={surface.id} surface={surface} />)}</>;
}
```

`useA2uiStream` owns the client and connection and disposes them on unmount. It returns `client`, `surfaces`, `isLoading`, `isConnected`, `error`, `connect`, `disconnect`, and `sendMessage`. WebSocket messages travel over the socket. HTTP outbound envelopes are posted to `actionUrl` (default: the stream URL without its query string, followed by `/action`); JSONL responses to those posts are processed too.

HTTP uses `ReadableStream` when the networking implementation provides it and otherwise processes `response.text()` when the response completes. Use WebSocket for progressive delivery with React Native's default buffered fetch. Connection headers and error callbacks can be updated without repeatedly reconnecting. Catalogs and locale are configured when the session is created; changing `url` starts a new session.

For another transport, feed complete envelopes or arrays to `client.processMessages()`, or use `createA2uiJSONLParser({onMessage: message => client.processMessages(message)})`. The parser accepts newline-delimited envelopes, arrays, and `{messages: [...]}` wrappers, including split chunks and a final line without a newline. Call `end()` at EOF.

## Protocol and catalog coverage

- All six agent-to-renderer message types: `createSurface`, `updateComponents`, `updateDataModel`, `deleteSurface`, `callRendererFunction`, and `agentFunctionResponse`.
- Standard outbound action, error, renderer function response, and agent function call envelopes, including RPC correlation and timeouts.
- Multiple independent surfaces, inline initial state, incremental component replacement, JSON Pointer updates, and null deletion.
- Absolute and collection-relative `@path` bindings, nested child templates, `@index`, two-way input bindings, and reactive function expressions.
- `@checks`, structured validation results, disabled invalid buttons, and visible validation messages.
- Per-component `@catalogId`, mixed catalogs, `@metadata` extension payloads, and native mappings for `@accessibility`.
- Official caller restrictions and user activation boundaries for functions. Native `openUrl` permits HTTP(S), resolves relative links against `baseUrl`, and runs through `Linking.openURL`.

| Components | Native implementation |
| --- | --- |
| Text | Native text; raw Markdown fallback permitted by the catalog |
| Image | Native image, size variants, content fitting, sanitized URL |
| Icon | Bundled Unicode symbols for standard names; native SVG for `svgPath` |
| Row, Column | Native flex layouts, alignment, direct-child weights |
| List | ScrollView with static or templated children, horizontal or vertical |
| Card, Divider | Native views |
| Tabs | Selectable native tab headers and active child |
| Modal | Native modal with trigger interception and close control |
| Button | Pressable with resolved child and protocol action |
| TextField | TextInput, text/password/numeric/multiline variants |
| CheckBox | Native Switch with boolean binding |
| ChoicePicker | Single/multiple selection, chips, and optional filtering |
| Slider | Native slider with numeric binding and discrete divisions |
| DateTimeInput | Native date/time pickers with ISO strings and bounds |
| Video, AudioPlayer | Native playback and seeking via react-native-video |

All basic catalog functions come from upstream. This includes validation, safe regex evaluation, string interpolation, number/currency/date formatting, pluralization, and logical functions. For `Intl` formatting, the app's JavaScript engine must provide the requested locale data.

`client.getRendererCapabilities({versions: ['1.0']})` provides capability negotiation data. `client.getRendererDataModel('1.0')` provides models of surfaces with `sendDataModel: true`. A2A/MCP/AG-UI envelopes and their transport-specific metadata are the integrating application's responsibility; the included transports exchange plain A2UI messages.

## Customization

Wrap surfaces in the existing `A2UIThemeProvider` to use a custom native theme. Primary button content inherits contrasting text/icon colors through native React context.

Pass `components: {Text: MyTextView}` to `createA2uiClient` to override a standard native view while retaining its official schema. Views receive `{node, props, renderChild, setValue}`. `props` contains resolved values and action closures. Use `renderChild(props.child)` for a child node and `setValue('value', nextValue)` for writable input bindings. Read-only literal/function bindings cannot be written through this setter.

For custom catalogs, use `Catalog`, schemas, and `createFunctionImplementation` from `a2ui-react-native/core`, and supply a native `render` implementation on each component API. Pass these catalogs through the client's `catalogs` option. Importing `/core` is browser-free and does not import React Native.

Use `outboundListener` on the client for transport integration; it receives complete envelopes rather than the previous package's `actionId` payloads. `processMessagesAsync` is available when a caller needs to await renderer-function execution.

## Existing applications

The original `A2UIRenderer`, `useA2UIStream`, custom `type`-based message parser, and component exports remain available from the package root for compatibility. These are the legacy API. For specification-compliant v1.0 messages, migrate to the APIs above, exported from both the package root and `/v1`. The capitalization distinguishes `useA2uiStream` (v1.0) from `useA2UIStream` (legacy).

## Upstream port and validation

The browser-free core is vendored under `vendor/a2ui-core` from official commit [`1cbef31b115c854bb98048cdda2fbce6b7db9d0f`](https://github.com/a2ui-project/a2ui/tree/1cbef31b115c854bb98048cdda2fbce6b7db9d0f). The published core package at the time of this port predates the linked specification's reserved mixin fields. The vendored graph includes only protocol/core modules and basic catalog APIs/functions. It excludes Lit, DOM hosts, styles, and Web Components. `Object.hasOwn` calls are rewritten to the equivalent `hasOwnProperty.call` for older Hermes engines. Upstream copyright headers and Apache-2.0 licensing are retained.

To reproduce the port, install this repository's dependencies, check out that exact upstream commit, and run:

```sh
npm run vendor:core -- /path/to/a2ui
```

```sh
npm run typecheck
npm test -- --runInBand
npm run lint
npm run build
npm run test:metro -- ios
npm run test:metro -- android
```

Tests exercise the real upstream core and mocked native hosts. Metro and Hermes compilation check bundle compatibility; they do not replace device testing of native playback, platform pickers, or screen-reader behavior.

Apache-2.0. See [LICENSE](./LICENSE).
