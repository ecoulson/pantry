import { Exception } from '../../../../../exceptions/exception';

export class LocalStorageDependencyValidationException extends Exception {
    constructor(innerException: Exception) {
        super(
            `Local storage dependency validation exception, contact support.`,
            innerException
        );
    }
}
