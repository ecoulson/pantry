import { PantryItemFormData } from '../forms/pantry-item-form-data';
import { PantryItem } from '../models/pantry-item';
import { PantryItemStorageBroker } from '../broker/pantry-item-storage-broker';

export class PantryItemService {
    constructor(private readonly broker: PantryItemStorageBroker) {}

    createFromFormData(formData: PantryItemFormData) {
        return this.broker.add(
            new PantryItem(
                formData.name,
                formData.price,
                formData.quantity,
                formData.weight,
                formData.volume,
                formData.dateOfPurchase,
                formData.dateOfExpiration
            )
        );
    }

    getAllPantryItems(): PantryItem[] {
        return this.broker.findAll();
    }
}
