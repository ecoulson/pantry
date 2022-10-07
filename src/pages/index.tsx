import type { NextPage } from 'next';
import { LocalStorage } from '../local-storage/local-storage';
import { KitchenItemFormData } from '../kitchen-items/forms/kitchen-item-form-data';
import { ProduceFormData } from '../kitchen-items/forms/produce-form-data';
import { ProduceService } from '../kitchen-items/service/produce-service';
import { PantryItemService } from '../kitchen-items/service/pantry-item-service';
import { PantryItemFormData } from '../kitchen-items/forms/pantry-item-form-data';
import { EquipmentService } from '../kitchen-items/service/equipment-service';
import { EquipmentFormData } from '../kitchen-items/forms/equipment-form-data';
import { useEffect, useState } from 'react';
import { LocalStorageBroker } from '../kitchen-items/broker/local-storage-broker';
import { PantryItem } from '../kitchen-items/models/pantry-item';
import { Equipment } from '../kitchen-items/models/equipment';
import { Produce } from '../kitchen-items/models/produce';
import { KitchenItemTypeDisplay } from '../kitchen-items/components/kitchen-item-type-display';
import { ProduceDisplay } from '../kitchen-items/components/produce-display';
import { EquipmentDisplay } from '../kitchen-items/components/equipment-display';
import { PantryItemDisplay } from '../kitchen-items/components/pantry-item-display';
import { KitchenItemType } from '../kitchen-items/models/kitchen-item-type';
import { KitchenItemInput } from '../kitchen-items/components/kitchen-item-input';

const Home: NextPage = () => {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
    const [produce, setProduce] = useState<Produce[]>([]);
    const [produceService, setProduceService] = useState<ProduceService | null>(
        null
    );
    const [pantryItemService, setPantryItemService] =
        useState<PantryItemService | null>(null);
    const [equipmentService, setEquipmentService] =
        useState<EquipmentService | null>(null);

    useEffect(() => {
        const localStorage = LocalStorage.create();
        if (!localStorage.hasCollection('produce')) {
            localStorage.createCollection('produce');
        }
        if (!localStorage.hasCollection('pantry_items')) {
            localStorage.createCollection('pantry_items');
        }
        if (!localStorage.hasCollection('equipment')) {
            localStorage.createCollection('equipment');
        }
        setProduceService(
            new ProduceService(
                new LocalStorageBroker(localStorage.getCollection('produce'))
            )
        );
        setPantryItemService(
            new PantryItemService(
                new LocalStorageBroker(
                    localStorage.getCollection('pantry_items')
                )
            )
        );
        setEquipmentService(
            new EquipmentService(
                new LocalStorageBroker(localStorage.getCollection('equipment'))
            )
        );
    }, []);

    useEffect(() => {
        if (equipmentService) {
            setEquipment([...equipment, ...equipmentService.getAllEquipment()]);
        }
    }, [equipmentService]);

    useEffect(() => {
        if (produceService) {
            setProduce([...produce, ...produceService.getAllProduce()]);
        }
    }, [produceService]);

    useEffect(() => {
        if (pantryItemService) {
            setPantryItems([
                ...pantryItems,
                ...pantryItemService.getAllPantryItems(),
            ]);
        }
    }, [pantryItemService]);

    function addPantryItem(formData: KitchenItemFormData) {
        switch (formData.type) {
            case KitchenItemType.Produce:
                setProduce([
                    ...produce,
                    produceService!.createFromFormData(
                        formData as ProduceFormData
                    ),
                ]);
                break;
            case KitchenItemType.Pantry:
                setPantryItems([
                    ...pantryItems,
                    pantryItemService!.createFromFormData(
                        formData as PantryItemFormData
                    ),
                ]);
                break;
            case KitchenItemType.Equipment:
            default:
                setEquipment([
                    equipmentService!.createFromFormData(
                        formData as EquipmentFormData
                    ),
                ]);
                break;
        }
    }

    return (
        <div className="grid gap-4 grid-cols-4 p-2">
            <KitchenItemInput onPantryItemAdded={addPantryItem} />
            <KitchenItemTypeDisplay displayName="Produce">
                {produce.map((produce) => (
                    <ProduceDisplay produce={produce} />
                ))}
            </KitchenItemTypeDisplay>
            <KitchenItemTypeDisplay displayName="Pantry Items">
                {pantryItems.map((pantryItem) => (
                    <PantryItemDisplay pantryItem={pantryItem} />
                ))}
            </KitchenItemTypeDisplay>
            <KitchenItemTypeDisplay displayName="Equipment">
                {equipment.map((equipment) => (
                    <EquipmentDisplay equipment={equipment} />
                ))}
            </KitchenItemTypeDisplay>
        </div>
    );
};

export default Home;
