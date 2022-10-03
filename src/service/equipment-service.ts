import { BrowserStorageBroker } from '../broker/browser-storage-broker';
import { EquipmentFormData } from '../forms/equipment-form-data';
import { InventoryItemFormData } from '../forms/inventory-item-form-data';
import { Equipment } from '../models/equipment';

export class EquipmentService {
    constructor(
        private readonly storage: BrowserStorageBroker<InventoryItemFormData>
    ) {}

    createFromFormData(formData: EquipmentFormData) {
        const equipment = new Equipment(
            formData.name,
            formData.brand,
            formData.price,
            formData.dateOfPurchase
        );
        this.storage.setItem(equipment.id(), equipment);
        return equipment;
    }
}
