import { Exception } from '../../../../../exceptions/exception';

export class EventHandlerRegistrationServiceException extends Exception {
    constructor(innerException: Exception) {
        super('Event service error occurred, contact support.', innerException);
    }
}
