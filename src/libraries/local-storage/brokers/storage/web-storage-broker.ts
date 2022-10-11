export interface WebStorageBroker {
    read(key: string): string | null;
    write(key: string, data: string): void;
    delete(key: string): void;
}
