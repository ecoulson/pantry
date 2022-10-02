export interface BrowserStorageBroker<T> {
    setItem(key: string, object: T): void;
    getItem(key: string): T;
    deleteItem(key: string): boolean;
}
