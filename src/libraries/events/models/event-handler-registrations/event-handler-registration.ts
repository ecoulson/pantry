import { Delegate } from '../../../../core/interfaces/delegate';

export class EventHandlerRegistration<T> {
    constructor(
        public readonly eventHandler: Delegate<T, Promise<void>>,
        public readonly eventName: string
    ) {}
}
