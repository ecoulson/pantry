import { Delegate } from '../../interfaces/delegate';

export interface EventsStorageBroker<T> {
    insertEventHandler(eventHandler: Delegate<T, Promise<void>>): void;

    selectAllEventHandlers(): Delegate<T, Promise<void>>[];
}
