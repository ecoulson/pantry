import { Exception } from '../../../../exceptions/exception';

export class RecordNotFoundException extends Exception {
    constructor(id: string) {
        super(`Record with id '${id}' was not found.`);
    }
}
