import { LocalStorageBroker } from '../broker/local-storage-broker';
import { InventoryItemFormData } from '../forms/inventory-item-form-data';
import { PantryItemFormData } from '../forms/pantry-item-form-data';
import { PantryItem } from '../models/pantry-item';

export class PantryItemService {
    constructor(
        private readonly broker: LocalStorageBroker<InventoryItemFormData>
    ) {}

    createFromFormData(formData: PantryItemFormData) {
        const pantryItem = new PantryItem(
            formData.name,
            formData.price,
            formData.quantity,
            formData.weight,
            formData.volume,
            formData.dateOfPurchase,
            formData.dateOfExpiration
        );
        this.broker.setItem(pantryItem.id(), pantryItem);
        return pantryItem;
    }
}
