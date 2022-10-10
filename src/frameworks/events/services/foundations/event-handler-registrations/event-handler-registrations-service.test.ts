import { anyOfClass, instance, mock, reset, verify } from 'ts-mockito';
import { EventHandlerRegistrationsStorageBroker } from '../../../brokers/storages/event-handler-registrations-storage-broker';
import { EventHandlerRegistration } from '../../../models/event-handler-registration';
import { EventHandlerRegistrationsService } from './event-handler-registrations-service';

describe('Event Handler Registrations Service Test Suite', () => {
    const mockedBroker = mock<EventHandlerRegistrationsStorageBroker<number>>();
    const broker = instance(mockedBroker);
    const service = new EventHandlerRegistrationsService(broker);

    beforeEach(() => {
        reset(mockedBroker);
    });

    test('Adds an event handler to the storage broker', () => {
        const eventHandlerRegistration = new EventHandlerRegistration(
            Promise.resolve,
            'test-event'
        );

        service.addEventHandlerRegistration(eventHandlerRegistration);

        verify(
            mockedBroker.insertEventHandlerRegistration(
                anyOfClass(EventHandlerRegistration)
            )
        );
    });
});
