import { BrowserStorageBroker } from '../broker/browser-storage-broker';
import { InventoryItemFormData } from '../forms/inventory-item-form-data';
import { ProduceFormData } from '../forms/produce-form-data';
import { Produce } from '../models/produce';

export class ProduceService {
    constructor(
        private readonly storage: BrowserStorageBroker<InventoryItemFormData>
    ) {}

    createFromFormData(formData: ProduceFormData) {
        const produce = new Produce(
            formData.name,
            formData.price,
            formData.weight,
            formData.quantity,
            formData.dateOfPurchase
        );
        this.storage.setItem(produce.id(), produce);
        return produce;
    }
}
