import { Equipment } from '../models/equipment';
import { StorageBroker } from './storage-broker';

export interface EquipmentStorageBroker extends StorageBroker {
    findAll(): Equipment[];
    add(equipment: Equipment): Equipment;
}
