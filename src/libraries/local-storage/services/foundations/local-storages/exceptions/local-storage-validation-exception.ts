import { Exception } from '../../../../../exceptions/exception';

export class LocalStorageValidationException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Local storage validation exception, contact support.',
            innerException
        );
    }
}
