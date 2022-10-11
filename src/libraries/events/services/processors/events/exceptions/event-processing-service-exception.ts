import { Exception } from '../../../../../exceptions/exception';

export class EventProcessingServiceException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Event processing service error occurred, contact support.',
            innerException
        );
    }
}
