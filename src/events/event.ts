export interface Event<T = any> {
    type: string;
    data: T;
}
