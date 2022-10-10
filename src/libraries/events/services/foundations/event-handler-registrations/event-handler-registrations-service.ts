import { isNil } from '../../../../../core/conditions/is-nil';
import { Delegate } from '../../../../../core/interfaces/delegate';
import { Exception } from '../../../../exceptions/exception';
import { tryCatch } from '../../../../exceptions/try-catch';
import { Validator } from '../../../../validations/validator';
import { EventHandlerRegistrationsStorageBroker } from '../../../brokers/storages/event-handler-registrations-storage-broker';
import { EventHandlerRegistration } from '../../../models/event-handler-registrations/event-handler-registration';
import { EventHandlerRegistrationValidationException } from '../../../models/event-handler-registrations/exceptions/event-handler-registration-validation-exception';
import { IllegalEventHandlerRegistrationException } from '../../../models/event-handler-registrations/exceptions/illegal-event-handler-registration-exception';
import { NullEventHandlerRegistrationException } from '../../../models/event-handler-registrations/exceptions/null-event-handler-registration-exception';
import { EventHandlerRegistrationServiceException } from './exceptions/event-handler-registration-service-exception';
import { FailedEventHandlerRegistrationServiceException } from './exceptions/failed-event-handler-registration-service-exception';
import { ValidationStep } from '/Users/evancoulson/Code/pantry/src/libraries/validations/models/validation-step';

export class EventHandlerRegistrationsService<T> {
    constructor(
        private readonly storageBroker: EventHandlerRegistrationsStorageBroker<T>
    ) {}

    addEventHandlerRegistration(
        eventHandlerRegistration: EventHandlerRegistration<T>
    ): void {
        return tryCatch(
            () => {
                this.validateEventHandlerRegistration(eventHandlerRegistration);
                this.storageBroker.insertEventHandlerRegistration(
                    eventHandlerRegistration
                );
            },
            (exception) => {
                switch (exception.constructor) {
                    case NullEventHandlerRegistrationException:
                    case IllegalEventHandlerRegistrationException:
                        return new EventHandlerRegistrationValidationException(
                            exception
                        );
                    default:
                        return this.createDefaultException(exception);
                }
            }
        );
    }

    private createDefaultException(exception: Exception) {
        const failedEventHandlerRegistrationServiceException =
            new FailedEventHandlerRegistrationServiceException(exception);
        return new EventHandlerRegistrationServiceException(
            failedEventHandlerRegistrationServiceException
        );
    }

    private validateEventHandlerRegistration(
        eventHandlerRegistration: EventHandlerRegistration<T>
    ) {
        if (isNil(eventHandlerRegistration)) {
            throw new NullEventHandlerRegistrationException();
        }
        Validator.validate(new IllegalEventHandlerRegistrationException(), [
            this.validateEventHandler(eventHandlerRegistration.eventHandler),
        ]);
    }

    private validateEventHandler(
        eventHandler: Delegate<T, Promise<void>>
    ): ValidationStep {
        return {
            name: 'eventHandler',
            rule: {
                condition: isNil(eventHandler),
                message: 'Event handler is required.',
            },
        };
    }

    listEventHandlerRegistrations(): EventHandlerRegistration<T>[] {
        return tryCatch(
            () => this.storageBroker.selectAllEventHandlerRegistrations(),
            this.createDefaultException
        );
    }
}
