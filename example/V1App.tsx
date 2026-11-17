import React from 'react';
import {Text, View} from 'react-native';
import {A2uiSurface, useA2uiStream} from '../src/v1';

/** Point url at a server streaming A2UI v1.0 envelopes. */
export default function V1App() {
  const {surfaces, isLoading, error} = useA2uiStream({
    url: 'wss://example.com/a2ui',
    baseUrl: 'https://example.com/',
  });
  return <View style={{flex: 1}}>
    {isLoading && <Text>Connecting…</Text>}
    {error && <Text accessibilityRole="alert">{error.message}</Text>}
    {surfaces.map(surface => <A2uiSurface key={surface.id} surface={surface} />)}
  </View>;
}
