import type { NextPage } from 'next';
import { LocalStorageBroker } from '../broker/local-storage-broker';
import { PantryInput } from '../components/pantry-input';
import { PantryItemFormData } from '../components/pantry-item-form-data';
import { PantryItemType } from '../components/pantry-item-type';
import { ProduceFormData } from '../components/produce-form-data';
import { ProduceService } from '../service/produce-service';

const Home: NextPage = () => {
    const service = new ProduceService(
        new LocalStorageBroker<PantryItemFormData>('pantry_items')
    );

    function addPantryItem(formData: PantryItemFormData) {
        switch (formData.type) {
            case PantryItemType.Produce:
                service.createProduceFromFormData(formData as ProduceFormData);
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
