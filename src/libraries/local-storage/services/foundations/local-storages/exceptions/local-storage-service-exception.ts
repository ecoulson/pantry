import { Exception } from '../../../../../exceptions/exception';

export class LocalStorageServiceException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Local storage service exception, contact support.',
            innerException
        );
    }
}
