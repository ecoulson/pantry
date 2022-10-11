import { Exception } from '../../../../../exceptions/exception';

export class EventProcessingDependencyValidationException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Event processing dependency validation exception occured, contact support.',
            innerException
        );
    }
}
