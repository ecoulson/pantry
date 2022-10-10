import { EventHandlerRegistration } from '../../models/event-handler-registration';
import { EventHandlerRegistrationsStorageBroker } from './event-handler-registrations-storage-broker';

export class InMemoryEventHandlerRegistrationsStorageBroker<T>
    implements EventHandlerRegistrationsStorageBroker<T>
{
    private static eventHandlerRegistrations: EventHandlerRegistration<any>[] =
        [];

    insertEventHandlerRegistration(
        eventHandlerRegistration: EventHandlerRegistration<T>
    ): void {
        InMemoryEventHandlerRegistrationsStorageBroker.eventHandlerRegistrations.push(
            eventHandlerRegistration
        );
    }

    selectAllEventHandlerRegistrations(): EventHandlerRegistration<T>[] {
        return InMemoryEventHandlerRegistrationsStorageBroker.eventHandlerRegistrations;
    }
}
