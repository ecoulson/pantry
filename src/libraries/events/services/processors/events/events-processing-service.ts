import { isNil } from '../../../../../core/conditions/is-nil';
import { Delegate } from '../../../../../core/interfaces/delegate';
import { Exception } from '../../../../exceptions/exception';
import { tryCatch, tryCatchAsync } from '../../../../exceptions/try-catch';
import { EventHandlerRegistration } from '../../../models/event-handler-registrations/event-handler-registration';
import { EventHandlerRegistrationValidationException } from '../../../models/event-handler-registrations/exceptions/event-handler-registration-validation-exception';
import { NullEventHandlerException } from '../../../models/event-handler/exceptions/null-event-handler-exception';
import { Event } from '../../../models/events/event';
import { NullEventException } from '../../../models/events/exceptions/null-event-exception';
import { EventHandlerRegistrationService } from '../../foundations/event-handler-registrations/event-handler-registration-service';
import { EventHandlerRegistrationServiceException } from '../../foundations/event-handler-registrations/exceptions/event-handler-registration-service-exception';
import { FailedEventHandlerRegistrationServiceException } from '../../foundations/event-handler-registrations/exceptions/failed-event-handler-registration-service-exception';
import { EventProcessingDependencyException } from './exceptions/event-processing-dependency-exception';
import { EventProcessingDependencyValidationException } from './exceptions/event-processing-dependency-validation-exception';
import { EventProcessingServiceException } from './exceptions/event-processing-service-exception';
import { EventProcessingValidationException } from './exceptions/event-processing-validation-exception';

export class EventsProcessingService<T extends Event> {
    constructor(
        private readonly eventHandlerRegistrationService: EventHandlerRegistrationService<T>
    ) {}

    addEventHandler(
        eventName: string,
        eventHandler: Delegate<T, Promise<void>>
    ): void {
        tryCatch(
            () => {
                this.validateEventHandler(eventHandler);
                const eventHandlerRegistration = new EventHandlerRegistration(
                    eventHandler,
                    eventName
                );
                this.eventHandlerRegistrationService.addEventHandlerRegistration(
                    eventHandlerRegistration
                );
            },
            (exception) => {
                switch (exception.constructor) {
                    case NullEventHandlerException:
                        return new EventProcessingValidationException(
                            exception
                        );
                    case EventHandlerRegistrationValidationException:
                        return new EventProcessingDependencyValidationException(
                            exception
                        );
                    case EventHandlerRegistrationServiceException:
                        return new EventProcessingDependencyException(
                            exception
                        );
                    default:
                        return this.createDefaultException(exception);
                }
            }
        );
    }

    private validateEventHandler(eventHandler: Delegate<T, Promise<void>>) {
        if (isNil(eventHandler)) {
            throw new NullEventHandlerException();
        }
    }

    private createDefaultException(exception: Exception) {
        const failedEventProcessingServiceException =
            new FailedEventHandlerRegistrationServiceException(exception);
        return new EventProcessingServiceException(
            failedEventProcessingServiceException
        );
    }

    async publishEventAsync(event: T): Promise<void> {
        return tryCatchAsync(
            async () => {
                this.validateEvent(event);
                const eventHandlerRegistrationList =
                    this.eventHandlerRegistrationService.listEventHandlerRegistrations();
                const eventHandlers = eventHandlerRegistrationList
                    .filter(
                        (eventHandlerRegistration) =>
                            eventHandlerRegistration.eventName === event.name
                    )
                    .map(
                        (eventHandlerRegistration) =>
                            eventHandlerRegistration.eventHandler
                    );
                await Promise.all(
                    eventHandlers.map((handler) => handler(event))
                );
            },
            (exception) => {
                switch (exception.constructor) {
                    case NullEventException:
                        return new EventProcessingValidationException(
                            exception
                        );
                    default:
                        return this.createDefaultException(exception);
                }
            }
        );
    }

    private validateEvent(event: T) {
        if (isNil(event)) {
            throw new NullEventException();
        }
    }
}
