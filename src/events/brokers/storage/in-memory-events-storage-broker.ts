import { Delegate } from '../../interfaces/delegate';
import { EventsStorageBroker } from './events-storage-broker';

export class InMemoryEventsStorageBroker<T> implements EventsStorageBroker<T> {
    private static readonly eventHandlers: Delegate<any, Promise<void>>[] = [];

    insertEventHandler(eventHandler: Delegate<T, Promise<void>>): void {
        InMemoryEventsStorageBroker.eventHandlers.push(eventHandler);
    }

    selectAllEventHandlers(): Delegate<T, Promise<void>>[] {
        return InMemoryEventsStorageBroker.eventHandlers;
    }
}
