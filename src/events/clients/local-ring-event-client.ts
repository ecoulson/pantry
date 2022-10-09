import { Delegate } from '../interfaces/delegate';
import { RingEventClient } from './ring-event-client';

export class LocalRingEventClient<T> implements RingEventClient<T> {
    registerEventHandler(
        eventHandler: Delegate<T, Promise<void>>,
        eventName: string
    ): void {
        throw new Error('Method not implemented.');
    }

    publishEvent(event: T, eventName: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
