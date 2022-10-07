import { Produce } from '../models/produce';

export interface ProduceStorageBroker {
    findAll(): Produce[];
    add(produce: Produce): Produce;
}
