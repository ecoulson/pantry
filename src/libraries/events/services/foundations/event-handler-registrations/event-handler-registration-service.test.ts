import { anyOfClass, instance, mock, reset, verify, when } from 'ts-mockito';
import { Exception } from '../../../../exceptions/exception';
import { EventHandlerRegistrationsStorageBroker } from '../../../brokers/storages/event-handler-registrations-storage-broker';
import { EventHandlerRegistration } from '../../../models/event-handler-registrations/event-handler-registration';
import { EventHandlerRegistrationValidationException } from '../../../models/event-handler-registrations/exceptions/event-handler-registration-validation-exception';
import { IllegalEventHandlerRegistrationException } from '../../../models/event-handler-registrations/exceptions/illegal-event-handler-registration-exception';
import { NullEventHandlerRegistrationException } from '../../../models/event-handler-registrations/exceptions/null-event-handler-registration-exception';
import { EventHandlerRegistrationService } from './event-handler-registration-service';
import { EventHandlerRegistrationServiceException } from './exceptions/event-handler-registration-service-exception';
import { FailedEventHandlerRegistrationServiceException } from './exceptions/failed-event-handler-registration-service-exception';

describe('Event Handler Registration Service Test Suite', () => {
    const mockedBroker = mock<EventHandlerRegistrationsStorageBroker<number>>();
    const broker = instance(mockedBroker);
    const service = new EventHandlerRegistrationService(broker);

    beforeEach(() => {
        reset(mockedBroker);
    });

    describe('addEventHandlerRegistration', () => {
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
            ).once();
        });

        test('Throws when adding null event handler registration to the storage broker', () => {
            const eventHandlerRegistration =
                null as unknown as EventHandlerRegistration<number>;
            const nullEventHandlerException =
                new NullEventHandlerRegistrationException();
            const expectedException =
                new EventHandlerRegistrationValidationException(
                    nullEventHandlerException
                );

            expect(() =>
                service.addEventHandlerRegistration(eventHandlerRegistration)
            ).toThrow(expectedException);

            verify(
                mockedBroker.insertEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).never();
        });

        test('Throws when adding a registration with a null event handler', () => {
            const eventHandlerRegistration = new EventHandlerRegistration(
                null as any,
                'test-event'
            );
            const illegalEventHandlerRegistrationException =
                new IllegalEventHandlerRegistrationException();
            const expectedException =
                new EventHandlerRegistrationValidationException(
                    illegalEventHandlerRegistrationException
                );

            expect(() =>
                service.addEventHandlerRegistration(eventHandlerRegistration)
            ).toThrow(expectedException);

            verify(
                mockedBroker.insertEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).never();
        });

        test('Should throw a service exception when the broker fails', () => {
            const eventHandlerRegistration = new EventHandlerRegistration(
                Promise.resolve,
                'test-event'
            );
            const brokerException = new Exception();
            const failedEventHandlerRegistrationServiceException =
                new FailedEventHandlerRegistrationServiceException(
                    brokerException
                );
            const expectedException =
                new EventHandlerRegistrationServiceException(
                    failedEventHandlerRegistrationServiceException
                );
            when(
                mockedBroker.insertEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).thenThrow(brokerException);

            const action = () =>
                service.addEventHandlerRegistration(eventHandlerRegistration);
            expect(action).toThrow(expectedException);

            verify(
                mockedBroker.insertEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).once();
        });
    });

    describe('listEventHandlerRegistrations', () => {
        test('Should list all event handler registrations', () => {
            const eventHandlerRegistrationList = [
                new EventHandlerRegistration(Promise.resolve, 'test-event'),
            ];
            const storageEventHandlerRegistrationList =
                eventHandlerRegistrationList;
            const expectedEventHandlerRegistration =
                storageEventHandlerRegistrationList;
            when(mockedBroker.selectAllEventHandlerRegistrations()).thenReturn(
                storageEventHandlerRegistrationList
            );

            const registrations = service.listEventHandlerRegistrations();

            expect(registrations).toEqual(expectedEventHandlerRegistration);
            verify(mockedBroker.selectAllEventHandlerRegistrations()).once();
        });

        test('Throws an exception when the broker fails to select all event handler registrations', () => {
            const brokerException = new Exception();
            const failedEventHandlerRegistrationServiceException =
                new FailedEventHandlerRegistrationServiceException(
                    brokerException
                );
            const expectedException =
                new EventHandlerRegistrationServiceException(
                    failedEventHandlerRegistrationServiceException
                );
            when(mockedBroker.selectAllEventHandlerRegistrations()).thenThrow(
                brokerException
            );

            const action = () => service.listEventHandlerRegistrations();
            expect(action).toThrow(expectedException);

            verify(mockedBroker.selectAllEventHandlerRegistrations()).once();
        });
    });
});
