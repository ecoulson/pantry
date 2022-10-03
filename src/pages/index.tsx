import type { NextPage } from 'next';
import { LocalStorageBroker } from '../broker/local-storage-broker';
import { PantryInput } from '../components/pantry-input';
import { InventoryItemFormData } from '../forms/inventory-item-form-data';
import { PantryItemType } from '../models/pantry-item-type';
import { ProduceFormData } from '../forms/produce-form-data';
import { ProduceService } from '../service/produce-service';
import { PantryItemService } from '../service/pantry-item-service';
import { PantryItemFormData } from '../forms/pantry-item-form-data';
import { EquipmentService } from '../service/equipment-service';
import { EquipmentFormData } from '../forms/equipment-form-data';

const Home: NextPage = () => {
    const storageBroker = new LocalStorageBroker<InventoryItemFormData>(
        'pantry_items'
    );
    const produceService = new ProduceService(storageBroker);
    const pantryItemService = new PantryItemService(storageBroker);
    const equipmentService = new EquipmentService(storageBroker);

    function addPantryItem(formData: InventoryItemFormData) {
        switch (formData.type) {
            case PantryItemType.Produce:
                produceService.createFromFormData(formData as ProduceFormData);
                break;
            case PantryItemType.Pantry:
                pantryItemService.createFromFormData(
                    formData as PantryItemFormData
                );
                break;
            case PantryItemType.Equipment:
                equipmentService.createFromFormData(
                    formData as EquipmentFormData
                );
                break;
            default:
                break;
        }
    }

    return (
        <div className="grid gap-4 grid-cols-4 p-2">
            <div className="col-start-2 col-end-4 relative">
                <PantryInput onPantryItemAdded={addPantryItem} />
            </div>
        </div>
    );
};

export default Home;
