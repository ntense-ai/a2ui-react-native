import {createContext} from 'react';
import {URL} from 'react-native-url-polyfill';
import {sanitizeMediaUrl} from './core';

export const MediaBaseUrl = createContext<string | undefined>(undefined);

/** Validate before resolving relative agent URLs against an application-owned base. */
export function resolveNativeMediaUrl(value: unknown, baseUrl?: string): string | undefined {
  const safe = sanitizeMediaUrl(value);
  if (!safe || !baseUrl || /^[a-z][a-z0-9+.-]*:/i.test(safe)) return safe;
  try {return sanitizeMediaUrl(new URL(safe, baseUrl).href);} catch {return undefined;}
}
