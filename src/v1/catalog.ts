import { Linking } from 'react-native';
import {
  Catalog, BASIC_COMPONENTS, BASIC_CATALOG_DOCUMENT_OPTIONS,
  createBasicCatalogFunctions, A2uiExpressionError,
  type ComponentApi, type ComponentNode, type FunctionImplementation,
} from './core';
import React from 'react';
import {URL} from 'react-native-url-polyfill';
import {MediaBaseUrl} from './native-runtime';
import { NativeComponent } from './components';

export const BASIC_CATALOG_ID = 'https://a2ui.org/specification/v1_0/catalogs/basic/catalog.json';

export interface NativeComponentProps {
  /** Resolved upstream node; bindings and child scopes are managed by the core. */
  node: ComponentNode<NativeComponentImplementation>;
  props: Record<string, unknown>;
  renderChild: (child: unknown) => React.ReactNode;
  /** Write a dynamic property only when it is backed by a writable path. */
  setValue: (property: string, value: unknown) => void;
}

export interface NativeComponentImplementation extends ComponentApi {
  render: React.ComponentType<NativeComponentProps>;
}

export interface NativeCatalogOptions {
  locale?: string;
  /** Application-owned base for relative media URLs and openUrl actions. */
  baseUrl?: string;
  /** Override native views by standard catalog component name. */
  components?: Record<string, React.ComponentType<NativeComponentProps>>;
  openUrl?: (url: string) => void | Promise<unknown>;
}

export function createNativeCatalog(options: NativeCatalogOptions = {}): Catalog<NativeComponentImplementation> {
  const functions: FunctionImplementation[] = createBasicCatalogFunctions({locale: options.locale})
    .map(fn => fn.name !== 'openUrl' ? fn : {
      ...fn,
      execute: async args => {
        let url: URL;
        try {
          url = new URL(String(args.url), options.baseUrl);
        } catch {
          throw new A2uiExpressionError('openUrl requires a valid URL or a configured baseUrl.', 'openUrl');
        }
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          throw new A2uiExpressionError('openUrl only accepts HTTP and HTTPS URLs.', 'openUrl');
        }
        // The upstream invoker enforces requiresUserActivation before execution.
        await (options.openUrl ?? Linking.openURL)(url.href);
      },
    });
  return new Catalog(BASIC_CATALOG_ID, '1.0', BASIC_COMPONENTS.map(api => ({
    ...api,
    render: options.components?.[api.name] ?? (props => React.createElement(
      MediaBaseUrl.Provider, {value: options.baseUrl}, React.createElement(NativeComponent, props),
    )),
  })), functions, BASIC_CATALOG_DOCUMENT_OPTIONS);
}
