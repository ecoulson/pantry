import { Exception } from '../../../../../exceptions/exception';

export class EventProcessingValidationException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Event processing validation exception occured, contact support',
            innerException
        );
    }
}
