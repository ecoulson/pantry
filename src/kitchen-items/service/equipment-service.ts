import { EquipmentStorageBroker } from '../broker/equipment-storage-broker';
import { EquipmentFormData } from '../forms/equipment-form-data';
import { Equipment } from '../models/equipment';

export class EquipmentService {
    constructor(private readonly storage: EquipmentStorageBroker) {}

    createFromFormData(formData: EquipmentFormData) {
        return this.storage.add(
            new Equipment(
                formData.name,
                formData.brand,
                formData.price,
                formData.dateOfPurchase
            )
        );
    }

    getAllEquipment(): Equipment[] {
        return this.storage.findAll();
    }
}
