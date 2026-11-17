/*
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { signal as preactSignal, computed as preactComputed, effect as preactEffect, batch as preactBatch, Computed as PreactComputed, } from '@preact/signals-core';
let signalImpl;
let computedImpl;
let effectImpl;
let batchWriteImpl;
let isSignalImpl;
let getValueImpl;
let setValueImpl;
let peekValueImpl;
/** Default signal implementations. Exported only for testing purposes. */
export const _PRIVATE_DEFAULT_SIGNAL_IMPLEMENTATION = {
    signal: preactSignal,
    computed: preactComputed,
    effect: preactEffect,
    batchWrite: preactBatch,
    isSignal: (val) => typeof val === 'function' ||
        (!!val && typeof val === 'object' && ('value' in val || 'peek' in val)),
    getValue: (signal) => {
        if (typeof signal === 'function') {
            return signal();
        }
        return signal.value;
    },
    setValue: (signal, value) => {
        if (typeof signal?.set === 'function') {
            signal.set(value);
            return;
        }
        if (signal instanceof PreactComputed || typeof signal === 'function') {
            throw new TypeError('Cannot set value of a read-only computed signal.');
        }
        signal.value = value;
    },
    peekValue: (signal) => {
        if (typeof signal?.peek === 'function') {
            return signal.peek();
        }
        if (typeof signal === 'function') {
            return signal();
        }
        if (signal && typeof signal === 'object' && 'value' in signal) {
            return signal.value;
        }
        return signal;
    },
};
setSignalImplementation(_PRIVATE_DEFAULT_SIGNAL_IMPLEMENTATION);
/**
 * Configures the active reactive signals implementation backend.
 *
 * Enables swapping the underlying reactivity library at runtime.
 *
 * @param impl Pluggable signal implementation operations.
 */
export function setSignalImplementation(impl) {
    // Intentionally only store the functions so we ignore any mutations of the implementation.
    signalImpl = impl.signal;
    computedImpl = impl.computed;
    effectImpl = impl.effect;
    batchWriteImpl = impl.batchWrite;
    isSignalImpl = impl.isSignal;
    getValueImpl = impl.getValue;
    setValueImpl = impl.setValue;
    peekValueImpl = impl.peekValue;
}
/**
 * Creates a reactive state signal initialized to the specified value.
 *
 * @param initialValue Initial value of the signal.
 * @returns A reactive state signal.
 */
export function signal(initialValue) {
    return signalImpl(initialValue);
}
/**
 * Creates a derived reactive signal that recomputes when dependencies change.
 *
 * @param computeFn Calculation callback producing the derived value.
 * @returns A reactive read-only computed signal.
 */
export function computed(computeFn) {
    return computedImpl(computeFn);
}
/**
 * Runs a side-effect callback reactively when accessed signals change.
 *
 * @param effectFn Callback to execute, optionally returning a cleanup function.
 * @returns A disposal function that cancels the effect subscription.
 */
export function effect(effectFn) {
    return effectImpl(effectFn);
}
/**
 * Batches multiple signal updates to defer subscriber notifications until complete.
 *
 * @param batchFn Callback enclosing signal mutations.
 */
export function batchWrite(batchFn) {
    return batchWriteImpl(batchFn);
}
/**
 * Checks whether a given value is a reactive Signal.
 *
 * @param val Value to test.
 * @returns Whether the value is a Signal.
 */
export function isSignal(val) {
    return isSignalImpl(val);
}
/**
 * Reads the current value of a signal, subscribing the active reactive context.
 *
 * @param signal Target signal to read.
 * @returns The current value of the signal.
 */
export function getValue(signal) {
    return getValueImpl(signal);
}
/**
 * Updates the current value of a writable signal, notifying subscribers.
 *
 * @param signal Target signal to update.
 * @param value New value to assign.
 */
export function setValue(signal, value) {
    setValueImpl(signal, value);
}
/**
 * Reads the current value of a signal without creating a reactive subscription.
 *
 * @param signal Target signal to read.
 * @returns The current value of the signal.
 */
export function peekValue(signal) {
    return peekValueImpl(signal);
}
