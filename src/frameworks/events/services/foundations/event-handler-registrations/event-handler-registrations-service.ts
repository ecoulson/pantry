import { EventHandlerRegistrationsStorageBroker } from '../../../brokers/storages/event-handler-registrations-storage-broker';
import { EventHandlerRegistration } from '../../../models/event-handler-registration';

export class EventHandlerRegistrationsService<T> {
    constructor(
        private readonly storageBroker: EventHandlerRegistrationsStorageBroker<T>
    ) {}

    addEventHandlerRegistration(
        eventHandlerRegistration: EventHandlerRegistration<T>
    ): void {
        this.storageBroker.insertEventHandlerRegistration(
            eventHandlerRegistration
        );
    }

    listEventHandlerRegistrations(): EventHandlerRegistration<T>[] {
        return this.storageBroker.selectAllEventHandlerRegistrations();
    }
}
