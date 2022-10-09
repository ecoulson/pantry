import { PantryItem } from '../models/pantry-item';
import { PantryItemStorageBroker } from '../broker/pantry-item-storage-broker';
import { FormData } from '../../core/forms/form-data';

export class PantryItemService {
    constructor(private readonly broker: PantryItemStorageBroker) {}

    createFromFormData(formData: FormData) {
        return this.broker.add(
            new PantryItem(
                formData.getField('name'),
                formData.getField('price'),
                parseInt(formData.getField('quantity')),
                formData.getField('weight'),
                formData.getField('volume'),
                formData.getField('dateOfPurchase'),
                formData.getField('dateOfExpiration')
            )
        );
    }

    getAllPantryItems(): PantryItem[] {
        return this.broker.findAll();
    }
}
