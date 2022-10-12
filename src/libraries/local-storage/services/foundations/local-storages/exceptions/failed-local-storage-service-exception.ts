import { Exception } from '../../../../../exceptions/exception';

export class FailedLocalStorageServiceException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Failed local storage service exception, contact support.',
            innerException
        );
    }
}
