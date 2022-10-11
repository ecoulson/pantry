import { Exception } from '../../../../exceptions/exception';

export class NullEventHandlerException extends Exception {
    constructor() {
        super('Event handler is null');
    }
}
