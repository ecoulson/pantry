import { EventHandlerRegistration } from '../../models/event-handler-registrations/event-handler-registration';

export interface EventHandlerRegistrationsStorageBroker<T> {
    insertEventHandlerRegistration(
        eventHandlerRegistration: EventHandlerRegistration<T>
    ): void;

    selectAllEventHandlerRegistrations(): EventHandlerRegistration<T>[];
}
