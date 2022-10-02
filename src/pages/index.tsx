import type { NextPage } from 'next';
import { LocalStorageBroker } from '../broker/local-storage-broker';
import { PantryInput } from '../components/pantry-input';
import { PantryItemFormData } from '../components/pantry-item-form-data';
import { PantryService } from '../service/pantry-service';

const Home: NextPage = () => {
    const service = new PantryService(new LocalStorageBroker());

    function addPantryItem(formData: PantryItemFormData) {
        service.create(formData);
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
