import { WebStorageBroker } from './web-storage-broker';

export class LocalStorageBroker implements WebStorageBroker {
    constructor(private readonly localStorage: Storage) {}

    read(key: string): string | null {
        return this.localStorage.getItem(key);
    }

    write(key: string, data: string): void {
        this.localStorage.setItem(key, data);
    }

    delete(key: string): void {
        this.localStorage.removeItem(key);
    }
}
