import { BrowserStorageBroker } from '../broker/browser-storage-broker';
import { PantryItemFormData } from '../components/pantry-item-form-data';
import { ProduceFormData } from '../components/produce-form-data';
import { Produce } from '../models/produce';

export class ProduceService {
    constructor(
        private readonly storage: BrowserStorageBroker<PantryItemFormData>
    ) {}

    createProduceFromFormData(formData: ProduceFormData) {
        const produce = new Produce(
            formData.name,
            formData.weight,
            formData.quantity,
            formData.dateOfPurchase
        );
        this.storage.setItem(produce.id(), produce);
        return produce;
    }
}
