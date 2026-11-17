import React, {createContext, useContext, useEffect, useState} from 'react';
import {
  View, Text, TextInput, Pressable, ScrollView, Image, Switch, Modal, Platform,
  StyleSheet, type ViewStyle, type AccessibilityProps,
} from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import Video from 'react-native-video';
import Svg, {Path} from 'react-native-svg';
import {type NodeAction} from './core';
import type {NativeComponentProps} from './catalog';
import {useA2UITheme} from '../theme';
import {MediaBaseUrl, resolveNativeMediaUrl} from './native-runtime';

const ContentColor = createContext<string | undefined>(undefined);
const icons: Record<string, string> = {
  accountCircle: '◉', add: '+', arrowBack: '←', arrowForward: '→', attachFile: '📎',
  calendarToday: '📅', call: '☎', camera: '📷', check: '✓', close: '✕', delete: '🗑',
  download: '↓', edit: '✎', event: '📅', error: '⊗', fastForward: '⏩', favorite: '♥',
  favoriteOff: '♡', folder: '📁', help: '?', home: '⌂', info: 'ⓘ', locationOn: '📍',
  lock: '🔒', lockOpen: '🔓', mail: '✉', menu: '☰', moreVert: '⋮', moreHoriz: '⋯',
  notificationsOff: '🔕', notifications: '🔔', pause: '⏸', payment: '💳', person: '👤',
  phone: '☎', photo: '▧', play: '▶', print: '⎙', refresh: '↻', rewind: '⏪', search: '⌕',
  send: '➤', settings: '⚙', share: '↗', shoppingCart: '🛒', skipNext: '⏭', skipPrevious: '⏮',
  star: '★', starHalf: '◐', starOff: '☆', stop: '■', upload: '↑', visibility: '◉',
  visibilityOff: '⊘', volumeDown: '🔉', volumeMute: '🔈', volumeOff: '🔇', volumeUp: '🔊', warning: '⚠',
};
const string = (value: unknown): string => value == null ? '' : String(value);
const alignments: Record<string, ViewStyle['alignItems']> = {start: 'flex-start', end: 'flex-end', center: 'center', stretch: 'stretch'};
const justifications: Record<string, ViewStyle['justifyContent']> = {
  start: 'flex-start', end: 'flex-end', center: 'center', spaceBetween: 'space-between',
  spaceAround: 'space-around', spaceEvenly: 'space-evenly',
};

export function nativeAccessibility(props: Record<string, unknown>): AccessibilityProps {
  const accessibility = (props.accessibility ?? {}) as Record<string, unknown>;
  return {
    accessibilityLabel: typeof accessibility.label === 'string' ? accessibility.label : typeof props.label === 'string' ? props.label : typeof props.description === 'string' ? props.description : undefined,
    accessibilityHint: typeof accessibility.description === 'string' ? accessibility.description : undefined,
    accessibilityLiveRegion: accessibility.live as AccessibilityProps['accessibilityLiveRegion'],
    accessibilityElementsHidden: accessibility.hidden === true,
    importantForAccessibility: accessibility.hidden === true ? 'no-hide-descendants' : 'auto',
  };
}

function Field({props, children}: {props: Record<string, unknown>; children: React.ReactNode}): React.ReactElement {
  const {colors} = useA2UITheme();
  const errors = Array.isArray(props.validationErrors) ? props.validationErrors : [];
  return <View style={styles.leaf}>
    {props.label != null && <Text style={{color: colors.text.primary, marginBottom: 4}}>{string(props.label)}</Text>}
    {children}
    {errors.map((error, index) => <Text key={index} accessibilityLiveRegion="polite" style={{color: colors.error}}>{string(error)}</Text>)}
  </View>;
}

function ChoicePicker({props, setValue}: NativeComponentProps): React.ReactElement {
  const {colors} = useA2UITheme();
  const [filter, setFilter] = useState('');
  const selected = Array.isArray(props.value) ? props.value.map(string) : [];
  const options = (Array.isArray(props.options) ? props.options : []) as {label: string; value: string}[];
  const multiple = props.variant === 'multipleSelection';
  return <Field props={props}>
    {props.filterable === true && <TextInput accessibilityLabel="Filter options" placeholder="Filter options" value={filter} onChangeText={setFilter} style={[styles.input, {color: colors.text.primary, borderColor: colors.border}]} />}
    <View style={props.displayStyle === 'chips' ? styles.chips : undefined}>
      {options.filter(option => string(option.label).toLowerCase().includes(filter.toLowerCase())).map(option => {
        const checked = selected.includes(option.value);
        return <Pressable key={option.value} accessibilityRole={multiple ? 'checkbox' : 'radio'}
          accessibilityLabel={string(option.label)} accessibilityState={{checked}}
          onPress={() => setValue('value', multiple
            ? checked ? selected.filter(value => value !== option.value) : [...selected, option.value]
            : [option.value])}
          style={[styles.option, {borderColor: checked ? colors.primary : colors.border, backgroundColor: checked ? colors.primary : colors.surface}]}>
          <Text style={{color: checked ? colors.text.inverse : colors.text.primary}}>
            {props.displayStyle !== 'chips' && (checked ? '✓ ' : '○ ')}{string(option.label)}
          </Text>
        </Pressable>;
      })}
    </View>
  </Field>;
}

function Tabs({props, renderChild}: NativeComponentProps): React.ReactElement {
  const {colors} = useA2UITheme();
  const [selected, select] = useState(0);
  const tabs = (Array.isArray(props.tabs) ? props.tabs : []) as {title: string; child: unknown}[];
  const active = Math.min(selected, Math.max(tabs.length - 1, 0));
  return <View style={styles.leaf}>
    <ScrollView horizontal accessibilityRole="tablist">
      {tabs.map((tab, index) => <Pressable key={index} accessibilityRole="tab" accessibilityState={{selected: active === index}}
        onPress={() => select(index)} style={[styles.tab, {borderBottomColor: active === index ? colors.primary : 'transparent'}]}>
        <Text style={{color: colors.text.primary}}>{string(tab.title)}</Text>
      </Pressable>)}
    </ScrollView>
    {renderChild(tabs[active]?.child)}
  </View>;
}

function NativeModal({props, renderChild}: NativeComponentProps): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const {colors} = useA2UITheme();
  return <>
    <View accessibilityRole="button" onStartShouldSetResponderCapture={() => true} onResponderRelease={() => setVisible(true)}>
      {renderChild(props.trigger)}
    </View>
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => setVisible(false)}>
      <View style={styles.overlay} accessibilityViewIsModal>
        <View style={[styles.dialog, {backgroundColor: colors.surface}]}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close dialog" onPress={() => setVisible(false)} style={styles.close}>
            <Text style={{color: colors.text.primary, fontSize: 24}}>✕</Text>
          </Pressable>
          {renderChild(props.content)}
        </View>
      </View>
    </Modal>
  </>;
}

/** Convert all supported wire date/time forms without treating a time as a date. */
export function parseNativeDate(value: unknown): Date | undefined {
  if (typeof value !== 'string' || !value) return undefined;
  const text = /^\d{2}:\d{2}/.test(value) ? `1970-01-01T${value}` : /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function DateInput({props, setValue}: NativeComponentProps): React.ReactElement {
  const {colors} = useA2UITheme();
  const [mode, setMode] = useState<'date' | 'time' | null>(null);
  const date = parseNativeDate(props.value) ?? (props.enableDate === true ? new Date() : new Date(1970, 0, 1));
  const min = parseNativeDate(props.min);
  const max = parseNativeDate(props.max);
  const commit = (next: Date) => {
    if ((min && next < min) || (max && next > max)) return;
    const pad = (part: number) => String(part).padStart(2, '0');
    const value = props.enableDate === true && props.enableTime === true ? next.toISOString()
      : props.enableDate === true ? `${next.getFullYear()}-${pad(next.getMonth() + 1)}-${pad(next.getDate())}`
      : `${pad(next.getHours())}:${pad(next.getMinutes())}:${pad(next.getSeconds())}`;
    setValue('value', value);
  };
  const modes = (['date', 'time'] as const).filter(part => props[part === 'date' ? 'enableDate' : 'enableTime'] === true);
  return <Field props={props}>
    <Text style={{color: colors.text.primary}}>{string(props.value)}</Text>
    {modes.map(part => Platform.OS === 'android'
      ? <Pressable key={part} accessibilityRole="button" accessibilityLabel={`Choose ${part}`} onPress={() => setMode(part)} style={styles.option}>
          <Text style={{color: colors.text.primary}}>Choose {part}</Text>
        </Pressable>
      : <DateTimePicker key={part} {...nativeAccessibility(props)} value={date} mode={part} minimumDate={min} maximumDate={max}
          onChange={(_event, next) => {if (next) commit(next);}} />)}
    {Platform.OS === 'android' && mode && <DateTimePicker {...nativeAccessibility(props)} value={date} mode={mode} minimumDate={min} maximumDate={max}
      onChange={(event, next) => {setMode(null); if (event.type === 'set' && next) commit(next);}} />}
  </Field>;
}

function Media({props, audio}: {props: Record<string, unknown>; audio: boolean}): React.ReactElement | null {
  const [paused, setPaused] = useState(audio);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = useContext(MediaBaseUrl);
  const url = resolveNativeMediaUrl(props.url, baseUrl);
  const poster = resolveNativeMediaUrl(props.posterUrl, baseUrl);
  useEffect(() => {setPaused(audio); setError(null);}, [url, audio]);
  if (!url) return null;
  return <View style={styles.leaf}>
    <Video {...nativeAccessibility(props)} source={{uri: url}} controls paused={paused}
      poster={poster || undefined} resizeMode="contain" style={{width: '100%', height: audio ? 64 : 220}}
      onError={() => setError('Unable to play media.')} />
    {audio && <Pressable accessibilityRole="button" accessibilityLabel={paused ? 'Play audio' : 'Pause audio'} onPress={() => setPaused(!paused)}>
      <Text>{paused ? '▶' : '⏸'} {string(props.description)}</Text>
    </Pressable>}
    {error && <Text accessibilityRole="alert">{error}</Text>}
  </View>;
}

export function NativeComponent(component: NativeComponentProps): React.ReactElement | null {
  const {node, props, renderChild, setValue} = component;
  const {colors} = useA2UITheme();
  const inherited = useContext(ContentColor);
  const baseUrl = useContext(MediaBaseUrl);
  const color = inherited ?? colors.text.primary;
  const accessibility = nativeAccessibility(props);
  switch (node.type) {
    case 'Text':
      // The basic catalog explicitly permits raw Markdown as the fallback.
      return <Text {...accessibility} style={[styles.leaf, {color, fontSize: props.variant === 'caption' ? 13 : 16}]}>{string(props.text)}</Text>;
    case 'Icon': {
      const name = props.name;
      const path = name && typeof name === 'object' ? (name as {svgPath?: string}).svgPath : undefined;
      return path ? <Svg {...accessibility} width={24} height={24} viewBox="0 0 24 24" style={styles.leaf}><Path d={path} fill={color} /></Svg>
        : <Text {...accessibility} style={[styles.leaf, {color, fontSize: 24}]}>{icons[string(name)] ?? string(name)}</Text>;
    }
    case 'Image': {
      const url = resolveNativeMediaUrl(props.url, baseUrl);
      if (!url) return null;
      const sizes: Record<string, {width: number | '100%'; height: number; borderRadius?: number}> = {
        icon: {width: 24, height: 24}, avatar: {width: 40, height: 40, borderRadius: 20}, smallFeature: {width: 100, height: 100},
        mediumFeature: {width: '100%', height: 200}, largeFeature: {width: '100%', height: 400}, header: {width: '100%', height: 200},
      };
      const modes = {fill: 'stretch', none: 'center', scaleDown: 'contain', cover: 'cover', contain: 'contain'} as const;
      return <Image accessibilityLabel={string(props.description)} {...accessibility} source={{uri: url}}
        resizeMode={modes[props.fit as keyof typeof modes] ?? 'stretch'} style={[styles.leaf, sizes[string(props.variant)] ?? sizes.mediumFeature]} />;
    }
    case 'Row':
    case 'Column':
      return <View {...accessibility} style={{flexDirection: node.type === 'Row' ? 'row' : 'column', width: '100%',
        justifyContent: justifications[string(props.justify)], alignItems: alignments[string(props.align)]}}>{renderChild(props.children)}</View>;
    case 'List':
      return <ScrollView {...accessibility} horizontal={props.direction === 'horizontal'} showsHorizontalScrollIndicator={false}
        contentContainerStyle={{alignItems: alignments[string(props.align)]}}>{renderChild(props.children)}</ScrollView>;
    case 'Card':
      return <View {...accessibility} style={[styles.leaf, styles.card, {borderColor: colors.border}]}>{renderChild(props.child)}</View>;
    case 'Divider':
      return <View {...accessibility} style={[styles.leaf, {backgroundColor: colors.divider}, props.axis === 'vertical' ? {width: 1, height: '100%', minHeight: 24, alignSelf: 'stretch'} : {height: 1}]} />;
    case 'Button': {
      const disabled = props.isValid === false;
      const primary = props.variant === 'primary';
      return <Field props={props}>
        <Pressable {...accessibility} accessibilityRole="button" disabled={disabled} accessibilityState={{disabled}}
          onPress={() => {if (typeof props.action === 'function') void (props.action as NodeAction)();}}
          style={[styles.button, {opacity: disabled ? 0.5 : 1, backgroundColor: primary ? colors.primary : 'transparent', borderColor: props.variant === 'borderless' ? 'transparent' : colors.border}]}>
          <ContentColor.Provider value={primary ? colors.text.inverse : color}>{renderChild(props.child)}</ContentColor.Provider>
        </Pressable>
      </Field>;
    }
    case 'TextField':
      return <Field props={props}><TextInput {...accessibility} value={string(props.value)} placeholder={string(props.placeholder)}
        onChangeText={value => setValue('value', value)} multiline={props.variant === 'longText'} secureTextEntry={props.variant === 'obscured'}
        keyboardType={props.variant === 'number' ? 'numeric' : 'default'} style={[styles.input, {color, borderColor: props.isValid === false ? colors.error : colors.border}]} /></Field>;
    case 'CheckBox':
      return <Field props={props}><Switch {...accessibility} value={props.value === true} onValueChange={value => setValue('value', value)} /></Field>;
    case 'Slider': {
      const min = typeof props.min === 'number' ? props.min : 0;
      const max = typeof props.max === 'number' ? props.max : 1;
      return <Field props={props}><Slider {...accessibility} minimumValue={min} maximumValue={max}
        value={typeof props.value === 'number' ? props.value : min} step={typeof props.steps === 'number' && props.steps > 0 ? (max - min) / props.steps : 0}
        onValueChange={value => setValue('value', value)} /></Field>;
    }
    case 'ChoicePicker': return <ChoicePicker {...component} />;
    case 'DateTimeInput': return <DateInput {...component} />;
    case 'Tabs': return <Tabs {...component} />;
    case 'Modal': return <NativeModal {...component} />;
    case 'Video': return <Media props={props} audio={false} />;
    case 'AudioPlayer': return <Media props={props} audio />;
    default: return null;
  }
}

const styles = StyleSheet.create({
  leaf: {margin: 8},
  card: {padding: 16, borderWidth: 1, borderRadius: 12},
  input: {borderWidth: 1, borderRadius: 6, padding: 12},
  button: {borderWidth: 1, borderRadius: 6, padding: 4, alignItems: 'center'},
  option: {padding: 10, borderWidth: 1, borderRadius: 8, margin: 3},
  chips: {flexDirection: 'row', flexWrap: 'wrap'},
  tab: {padding: 12, borderBottomWidth: 2},
  overlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end'},
  dialog: {padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: '90%'},
  close: {alignSelf: 'flex-end', padding: 8},
});
