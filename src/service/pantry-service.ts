import { BrowserStorageBroker } from '../broker/browser-storage-broker';
import { PantryItemFormData } from '../components/pantry-item-form-data';

export class PantryService {
    constructor(
        private readonly storage: BrowserStorageBroker<PantryItemFormData>
    ) {}

    create(formData: PantryItemFormData) {
        this.storage.setItem(
            `pantry-item::${formData.name.toLowerCase()}`,
            formData
        );
    }
}
