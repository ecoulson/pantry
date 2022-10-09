import { EventHandlerRegistration } from '../../models/event-handler-registration';

export interface EventHandlerRegistrationsStorageBroker<T> {
    insertEventHandlerRegistration(
        eventHandlerRegistration: EventHandlerRegistration<T>
    ): void;

    selectAllEventHandlerRegistrations(): EventHandlerRegistration<T>[];
}
