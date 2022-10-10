import { Exception } from '../../../../exceptions/exception';

export class IllegalEventHandlerRegistrationException extends Exception {
    constructor() {
        super(
            'Invalid event handler registration error ocurred, fix errors and try again.'
        );
    }
}
