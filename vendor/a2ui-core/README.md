# Official A2UI core, headless port

Generated from the revision in [UPSTREAM.json](./UPSTREAM.json). Runtime code and declarations are copied from a TypeScript build of the official source. This directory intentionally contains no React, DOM, Lit, or Web Component implementation.

Regenerate from the pinned checkout with `npm run vendor:core -- /path/to/a2ui`. The generator follows imports from the core, v1.0 schemas, and basic catalog API/function entry points. It preserves upstream source and license headers, rewrites `Object.hasOwn` for older Hermes, and rejects browser component dependencies. Native `openUrl` is supplied by the React Native catalog instead of the upstream browser implementation.

Do not import the upstream npm package alongside this port: bindings and node resolution must use the same core classes and reactive context registry. Application customizations should import `a2ui-react-native/core`.
