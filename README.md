# A2UI React Native Renderer

A React Native renderer for [Google's A2UI](https://github.com/google/A2UI) declarative UI specification.

## What is A2UI?

A2UI (Agent-to-User Interface) is an open protocol from Google that allows AI agents to generate rich, native user interfaces through declarative JSON descriptions. Instead of returning plain text, agents can describe UI components that render natively on any platform.

This package provides the **React Native renderer** - allowing A2UI-compliant agents to generate native mobile UIs.

## Installation

```bash
npm install @bramamoorthy/a2ui-react-native
# or
yarn add @bramamoorthy/a2ui-react-native
```

## Quick Start

```tsx
import React from 'react';
import { View } from 'react-native';
import { A2UIRenderer } from '@bramamoorthy/a2ui-react-native';

const App = () => {
  // A2UI JSON from your agent
  const a2uiSpec = {
    components: [
      { id: 'text1', type: 'Text', content: 'Hello from A2UI!' },
      { id: 'btn1', type: 'Button', label: 'Click me', action: 'doSomething' }
    ],
    rootId: 'text1'
  };

  return (
    <View style={{ flex: 1 }}>
      <A2UIRenderer
        spec={a2uiSpec}
        onAction={(actionId, payload) => {
          console.log('Action triggered:', actionId, payload);
        }}
      />
    </View>
  );
};
```

## Supported Components (MVP)

| A2UI Component | React Native Equivalent |
|----------------|------------------------|
| Text | `<Text>` |
| Button | `<Pressable>` |
| Image | `<Image>` |
| Row | `<View style={{flexDirection: 'row'}}>` |
| Column | `<View>` |
| Card | `<View>` with shadow styling |
| List | `<FlatList>` |
| TextField | `<TextInput>` |

## Streaming Support

A2UI uses JSONL (JSON Lines) for streaming updates. This renderer handles real-time UI updates as the agent generates content:

```tsx
import { useA2UIStream } from '@bramamoorthy/a2ui-react-native';

const StreamingApp = () => {
  const { spec, isLoading, error } = useA2UIStream('wss://your-agent-server.com/stream');

  if (isLoading) return <LoadingIndicator />;
  if (error) return <ErrorView error={error} />;

  return <A2UIRenderer spec={spec} />;
};
```

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Agent Server                      │
│              (Gemini, OpenAI, etc.)                 │
└─────────────────────┬───────────────────────────────┘
                      │ A2UI JSONL Stream
                      ▼
┌─────────────────────────────────────────────────────┐
│              JSONL Stream Parser                     │
│         (parser/jsonl-parser.ts)                    │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              Message Dispatcher                      │
│    (beginRendering, surfaceUpdate, etc.)            │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              State Management                        │
│  (surfaces, components, data models)                │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│              Component Catalog                       │
│    (Text, Button, Image, Row, Column, etc.)         │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│            React Native Render Tree                  │
└─────────────────────────────────────────────────────┘
```

## A2UI Specification

This renderer follows the [A2UI Renderer Implementation Guide](https://a2ui.org/guides/renderer-development/).

### Message Types Handled

- `beginRendering` - Start rendering a surface
- `surfaceUpdate` - Update component definitions
- `dataModelUpdate` - Update data bindings
- `deleteSurface` - Remove a rendering surface

## Roadmap

### MVP (v0.1.0) - Current
- [x] Project setup
- [ ] JSONL stream parser
- [ ] Core components (Text, Button, Image, Row, Column, Card, List, TextField)
- [ ] Basic action handling
- [ ] Example app

### v0.2.0
- [ ] Modal, Tabs, Slider
- [ ] DateTimeInput, Checkbox, MultipleChoice
- [ ] Enhanced data binding

### v0.3.0
- [ ] Video, Audio playback
- [ ] Icon support
- [ ] Custom component catalog

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## Related Projects

- [A2UI](https://github.com/google/A2UI) - The official A2UI specification from Google
- [AG-UI](https://github.com/ag-ui-protocol/ag-ui) - Agent-User Interaction Protocol from CopilotKit
- [CopilotKit](https://www.copilotkit.ai) - Build in-app AI copilots

## License

Apache 2.0 - See [LICENSE](./LICENSE) for details.
