import { Delegate } from '../../../core/interfaces/delegate';
import { Event } from '../models/events/event';

export interface RingEventClient<T extends Event> {
    registerEventHandler(
        eventName: string,
        eventHandler: Delegate<T, Promise<void>>
    ): void;

    publishEvent(event: T): Promise<void>;
}
