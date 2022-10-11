import { Exception } from '../../../../../exceptions/exception';

export class EventProcessingDependencyException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Event processing dependency exception occured, contact support.',
            innerException
        );
    }
}
