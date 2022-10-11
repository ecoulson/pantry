import { FormData } from '../../core/forms/form-data';
import { EquipmentStorageBroker } from '../broker/equipment-storage-broker';
import { Equipment } from '../models/equipment';

export class EquipmentService {
    constructor(private readonly storage: EquipmentStorageBroker) {}

    createFromFormData(formData: FormData) {
        return this.storage.add(
            new Equipment(
                formData.getField('name'),
                formData.getField('brand'),
                formData.getField('price'),
                formData.getField('dateOfPurchase')
            )
        );
    }

    getAllEquipment(): Equipment[] {
        return this.storage.findAll();
    }
}
