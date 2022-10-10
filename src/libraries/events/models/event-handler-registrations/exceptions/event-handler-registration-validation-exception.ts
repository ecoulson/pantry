import { Exception } from '../../../../exceptions/exception';

export class EventHandlerRegistrationValidationException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Event handler validation error occurred, please fix and try again.',
            innerException
        );
    }
}
