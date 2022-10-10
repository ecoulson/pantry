import { Exception } from '../../../../../exceptions/exception';

export class FailedEventHandlerRegistrationServiceException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Failed event handler registration service occurred, contact support.',
            innerException
        );
    }
}
