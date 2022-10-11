import { Exception } from '../../../../exceptions/exception';

export class RecordExistsException extends Exception {
    constructor(id: string) {
        super(`Record with id '${id}' already exists.`);
    }
}
