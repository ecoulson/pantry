import {
    anyOfClass,
    capture,
    instance,
    mock,
    reset,
    verify,
    when,
} from 'ts-mockito';
import { Exception } from '../../../../exceptions/exception';
import { EventHandlerRegistration } from '../../../models/event-handler-registrations/event-handler-registration';
import { EventHandlerRegistrationValidationException } from '../../../models/event-handler-registrations/exceptions/event-handler-registration-validation-exception';
import { NullEventHandlerException } from '../../../models/event-handler/exceptions/null-event-handler-exception';
import { NullEventException } from '../../../models/events/exceptions/null-event-exception';
import { EventHandlerRegistrationService } from '../../foundations/event-handler-registrations/event-handler-registration-service';
import { EventHandlerRegistrationServiceException } from '../../foundations/event-handler-registrations/exceptions/event-handler-registration-service-exception';
import { EventProcessingService } from './event-processing-service';
import { EventProcessingDependencyException } from './exceptions/event-processing-dependency-exception';
import { EventProcessingDependencyValidationException } from './exceptions/event-processing-dependency-validation-exception';
import { EventProcessingServiceException } from './exceptions/event-processing-service-exception';
import { EventProcessingValidationException } from './exceptions/event-processing-validation-exception';
import { FailedEventProcessingServiceException } from './exceptions/failed-event-processing-service-exception';

describe('Event Processing Service Test Suite', () => {
    const mockedFoundationService = mock(EventHandlerRegistrationService);
    const service = new EventProcessingService(
        instance(mockedFoundationService)
    );

    beforeEach(() => {
        reset(mockedFoundationService);
    });

    describe('addEventHandler', () => {
        test('Should add an event handler', () => {
            const eventName = 'test-event';
            const eventHandler = Promise.resolve;
            const expectedEventHandlerRegistration =
                new EventHandlerRegistration(eventHandler, eventName);

            service.addEventHandler(eventName, eventHandler);

            verify(
                mockedFoundationService.addEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).once();
            const [actualEventHandlerRegistration] = capture(
                mockedFoundationService.addEventHandlerRegistration
            ).last();
            expect(actualEventHandlerRegistration).toEqual(
                expectedEventHandlerRegistration
            );
        });

        test('Should throw an exception when the event handler is null', () => {
            const eventName = 'test-event';
            const eventHandler = null as any;
            const nullEventHandlerException = new NullEventHandlerException();
            const expectedException = new EventProcessingValidationException(
                nullEventHandlerException
            );

            const action = () =>
                service.addEventHandler(eventName, eventHandler);
            expect(action).toThrow(expectedException);

            verify(
                mockedFoundationService.addEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).never();
        });

        test('Should throw a dependency validation exception when the foundation service throws a validation exception', () => {
            const eventName = 'test-event';
            const eventHandler = Promise.resolve;
            const innerException = new Exception();
            const validationException =
                new EventHandlerRegistrationValidationException(innerException);
            const expectedException =
                new EventProcessingDependencyValidationException(
                    validationException
                );
            when(
                mockedFoundationService.addEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).thenThrow(validationException);

            const action = () =>
                service.addEventHandler(eventName, eventHandler);
            expect(action).toThrow(expectedException);

            verify(
                mockedFoundationService.addEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).once();
        });

        test('Should throw a dependency exception when the foundation service throws an exception', () => {
            const eventName = 'test-event';
            const eventHandler = Promise.resolve;
            const innerException = new Exception();
            const serviceException =
                new EventHandlerRegistrationServiceException(innerException);
            const expectedException = new EventProcessingDependencyException(
                serviceException
            );
            when(
                mockedFoundationService.addEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).thenThrow(serviceException);

            const action = () =>
                service.addEventHandler(eventName, eventHandler);
            expect(action).toThrow(expectedException);

            verify(
                mockedFoundationService.addEventHandlerRegistration(
                    anyOfClass(EventHandlerRegistration)
                )
            ).once();
        });
    });

    describe('publishEventAsync', () => {
        test('Should publish an event to all registered listeners', async () => {
            const event = {
                name: 'test-event',
            };
            const callback1 = jest.fn();
            const callback2 = jest.fn();
            const eventHandlerRegistrationList = [
                new EventHandlerRegistration(callback1, 'test-event'),
                new EventHandlerRegistration(callback2, 'test-event'),
                new EventHandlerRegistration(Promise.resolve, 'other-event'),
            ];
            const storageEventHandlerRegistrations =
                eventHandlerRegistrationList;
            when(
                mockedFoundationService.listEventHandlerRegistrations()
            ).thenReturn(storageEventHandlerRegistrations);

            await service.publishEventAsync(event);

            expect(callback1).toBeCalledTimes(1);
            expect(callback2).toBeCalledTimes(1);
            verify(
                mockedFoundationService.listEventHandlerRegistrations()
            ).once();
        });

        test('Should throw an exception when the event is null', async () => {
            const event = null as any;
            const nullEventException = new NullEventException();
            const expectedException = new EventProcessingValidationException(
                nullEventException
            );

            const action = service.publishEventAsync(event);
            await expect(action).rejects.toThrow(expectedException);

            verify(
                mockedFoundationService.listEventHandlerRegistrations()
            ).never();
        });

        test('Should throw an exception when the event is null', async () => {
            const event = {
                name: 'test-event',
            };
            const innerException = new Exception();
            const failedEventProcessingServiceException =
                new FailedEventProcessingServiceException(innerException);
            const expectedException = new EventProcessingServiceException(
                failedEventProcessingServiceException
            );
            when(
                mockedFoundationService.listEventHandlerRegistrations()
            ).thenThrow(innerException);

            const action = service.publishEventAsync(event);
            await expect(action).rejects.toThrow(expectedException);

            verify(
                mockedFoundationService.listEventHandlerRegistrations()
            ).once();
        });
    });
});
