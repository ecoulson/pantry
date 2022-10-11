import { Delegate } from '../../../core/interfaces/delegate';
import { InMemoryEventHandlerRegistrationsStorageBroker } from '../brokers/storages/in-memory-event-handler-registrations-storage-broker';
import { Event } from '../models/events/event';
import { EventHandlerRegistrationService } from '../services/foundations/event-handler-registrations/event-handler-registration-service';
import { EventProcessingService } from '../services/processors/events/event-processing-service';
import { RingEventClient } from './ring-event-client';

export class LocalRingEventClient<T extends Event>
    implements RingEventClient<T>
{
    private readonly eventProcessingService: EventProcessingService<T>;

    constructor() {
        const broker = new InMemoryEventHandlerRegistrationsStorageBroker<T>();
        const eventHandlerRegistrationService =
            new EventHandlerRegistrationService<T>(broker);
        this.eventProcessingService = new EventProcessingService<T>(
            eventHandlerRegistrationService
        );
    }

    registerEventHandler(
        eventName: string,
        eventHandler: Delegate<T, Promise<void>>
    ): void {
        this.eventProcessingService.addEventHandler(eventName, eventHandler);
    }

    async publishEvent(event: T): Promise<void> {
        await this.eventProcessingService.publishEventAsync(event);
    }
}
