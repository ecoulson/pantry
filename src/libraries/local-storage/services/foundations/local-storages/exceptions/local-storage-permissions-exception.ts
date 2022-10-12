import { Exception } from '../../../../../exceptions/exception';

export class LocalStoragePermissionsException extends Exception {
    constructor(innerException: Exception) {
        super(
            'Check your permissions and allow this site to access cookies so it can persist data.',
            innerException
        );
    }
}
