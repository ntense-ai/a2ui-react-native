import React, {useCallback, useEffect, useMemo, useState, useSyncExternalStore} from 'react';
import {View, type AccessibilityProps} from 'react-native';
import {
  effect, getValue, peekValue, isComponentNode, ResolvedBinding, isWritable,
  NodeResolver, type ComponentNode, type Signal, type SurfaceModel,
} from './core';
import type {NativeComponentImplementation, NativeComponentProps} from './catalog';

export function useA2uiSignal<T>(signal: Signal<T>): T {
  const subscribe = useCallback((listener: () => void) => effect(() => {
    getValue(signal);
    listener();
  }), [signal]);
  const snapshot = useCallback(() => peekValue(signal), [signal]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

/** Unwrap bindings while preserving resolved child nodes and action closures. */
export function unwrapNativeValue(value: unknown): unknown {
  if (value instanceof ResolvedBinding) return unwrapNativeValue(value.value);
  if (isComponentNode(value)) return value;
  if (Array.isArray(value)) return value.map(unwrapNativeValue);
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, unwrapNativeValue(child)]));
  }
  return value;
}

function ResolvedNode({node}: {node: ComponentNode<NativeComponentImplementation>}): React.ReactElement | null {
  const raw = useA2uiSignal(node.props);
  const props = useMemo(() => unwrapNativeValue(raw) as Record<string, unknown>, [raw]);
  const renderChild = useCallback((child: unknown): React.ReactNode => {
    if (Array.isArray(child)) return child.map(renderChild);
    if (!isComponentNode(child)) return null;
    return <NativeNode key={child.id} node={child as ComponentNode<NativeComponentImplementation>} />;
  }, []);
  const setValue = useCallback((property: string, value: unknown) => {
    const binding = peekValue(node.props)[property];
    if (binding instanceof ResolvedBinding && isWritable(binding)) binding.set(value);
  }, [node]);
  if (node.disposed || !node.impl) return null;
  const Render = node.impl.render;
  const accessibility = (props.accessibility ?? {}) as Record<string, unknown>;
  const nativeAccessibility: AccessibilityProps = {
    accessibilityLabel: typeof accessibility.label === 'string' ? accessibility.label : undefined,
    accessibilityHint: typeof accessibility.description === 'string' ? accessibility.description : undefined,
    accessibilityLiveRegion: accessibility.live as AccessibilityProps['accessibilityLiveRegion'],
    accessibilityElementsHidden: accessibility.hidden === true,
    importantForAccessibility: accessibility.hidden === true ? 'no-hide-descendants' : 'auto',
  };
  return <View {...nativeAccessibility} style={typeof props.weight === 'number' ? {flexGrow: props.weight, flexBasis: 0} : undefined}>
    <Render node={node} props={props} renderChild={renderChild} setValue={setValue} />
  </View>;
}

export function NativeNode({node}: {node: ComponentNode<NativeComponentImplementation>}): React.ReactElement | null {
  if (node.isPlaceholder || node.disposed) return null;
  return <ResolvedNode node={node} />;
}

function SurfaceTree({resolver}: {resolver: NodeResolver<NativeComponentImplementation>}): React.ReactElement | null {
  const root = useA2uiSignal(resolver.rootNode);
  return root ? <NativeNode node={root} /> : null;
}

export interface A2uiSurfaceProps {
  surface: SurfaceModel<NativeComponentImplementation>;
}

/** Renders an official core surface with native components; no DOM host or portals. */
export function A2uiSurface({surface}: A2uiSurfaceProps): React.ReactElement {
  const [resolver, setResolver] = useState<{surface: A2uiSurfaceProps['surface']; resolver: NodeResolver<NativeComponentImplementation>} | null>(null);
  useEffect(() => {
    const instance = new NodeResolver(surface);
    setResolver({surface, resolver: instance});
    return () => instance.dispose();
  }, [surface]);
  return resolver?.surface === surface && !resolver.resolver.disposed ? <SurfaceTree resolver={resolver.resolver} /> : <></>;
}

export type {NativeComponentProps};
