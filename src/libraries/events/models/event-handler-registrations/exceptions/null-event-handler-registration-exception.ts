import { Exception } from '../../../../exceptions/exception';

export class NullEventHandlerRegistrationException extends Exception {
    constructor() {
        super('Event handler registration is null');
    }
}
