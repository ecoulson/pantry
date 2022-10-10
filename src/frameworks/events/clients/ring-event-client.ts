import { Delegate } from '../../../core/interfaces/delegate';

export interface RingEventClient<T> {
    registerEventHandler(
        eventHandler: Delegate<T, Promise<void>>,
        eventName: string
    ): void;

    publishEvent(event: T, eventName: string): Promise<void>;
}
