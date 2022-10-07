import { Event } from './event';
import { EventListener } from './event-listener';

export class EventEmitter {
    private static listeners: Map<string, EventListener[]> = new Map();

    public static listen(eventType: string, listener: EventListener) {
        if (!EventEmitter.listeners.has(eventType)) {
            EventEmitter.listeners.set(eventType, []);
        }
        const listeners = EventEmitter.listeners.get(
            eventType
        ) as EventListener[];
        listeners.push(listener);
    }

    public static notify(event: Event) {
        const listeners = EventEmitter.listeners.get(event.type);
        if (listeners) {
            listeners.forEach((listener) => {
                listener(event);
            });
        }
    }
}
