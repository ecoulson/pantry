import { Exception } from '../../../../exceptions/exception';

export class NullEventException extends Exception {
    constructor() {
        super('Event is null.');
    }
}
