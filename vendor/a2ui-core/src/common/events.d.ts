/** Standard cleanup interface returned by all subscriptions. */
export interface Subscription {
    /** Unsubscribes from the event source. */
    unsubscribe(): void;
}
/** Handler callback for emitted events. */
export type EventListener<T> = (data: T) => void | Promise<void>;
/**
 * Readonly event subscription interface exposed by models.
 *
 * Provides a subscription mechanism for event listeners without allowing event emission.
 */
export interface EventSource<T> {
    /**
     * Subscribes to the event.
     *
     * @param listener The listener function to call when the event is emitted.
     * @returns A subscription object that can be used to unsubscribe.
     */
    subscribe(listener: EventListener<T>): Subscription;
}
/**
 * Event emitter implementation supporting subscriptions and asynchronous broadcasting.
 */
export declare class EventEmitter<T> implements EventSource<T> {
    private listeners;
    /**
     * Subscribes to the event.
     *
     * @param listener The listener function to call when the event is emitted.
     * @returns A subscription object that can be used to unsubscribe.
     */
    subscribe(listener: EventListener<T>): Subscription;
    /**
     * Emits an event to all subscribers.
     *
     * @param data The data to pass to subscribers.
     */
    emit(data: T): Promise<void>;
    /**
     * Removes all registered listeners and disposes the emitter.
     */
    dispose(): void;
}
