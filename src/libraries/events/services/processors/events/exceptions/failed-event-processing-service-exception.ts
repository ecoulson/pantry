import { Exception } from '../../../../../exceptions/exception';

export class FailedEventProcessingServiceException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Failed event processing service error occurred, contact support.',
            innerException
        );
    }
}
