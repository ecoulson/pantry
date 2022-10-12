import type { NextPage } from 'next';
import { LocalStorageClient } from '../libraries/local-storage/local-storage-client';
import { ProduceService } from '../kitchen-items/services/produce-service';
import { PantryItemService } from '../kitchen-items/services/pantry-item-service';
import { EquipmentService } from '../kitchen-items/services/equipment-service';
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
import { FormData } from '../core/forms/form-data';

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
        const localStorageClient = LocalStorageClient.create();
        if (!localStorageClient.hasCollection('produce')) {
            localStorageClient.createCollection('produce');
        }
        if (!localStorageClient.hasCollection('pantry_items')) {
            localStorageClient.createCollection('pantry_items');
        }
        if (!localStorageClient.hasCollection('equipment')) {
            localStorageClient.createCollection('equipment');
        }
        setProduceService(
            new ProduceService(
                new LocalStorageBroker(
                    localStorageClient.getCollection('produce')
                )
            )
        );
        setPantryItemService(
            new PantryItemService(
                new LocalStorageBroker(
                    localStorageClient.getCollection('pantry_items')
                )
            )
        );
        setEquipmentService(
            new EquipmentService(
                new LocalStorageBroker(
                    localStorageClient.getCollection('equipment')
                )
            )
        );
    }, []);

    useEffect(() => {
        if (equipmentService) {
            setEquipment([...equipment, ...equipmentService.getAllEquipment()]);
        }
    }, [equipmentService, equipment]);

    useEffect(() => {
        if (produceService) {
            setProduce([...produce, ...produceService.getAllProduce()]);
        }
    }, [produceService, produce]);

    useEffect(() => {
        if (pantryItemService) {
            setPantryItems([
                ...pantryItems,
                ...pantryItemService.getAllPantryItems(),
            ]);
        }
    }, [pantryItemService, pantryItems]);

    function addPantryItem(formData: FormData) {
        switch (formData.getField('type')) {
            case KitchenItemType.Produce:
                setProduce([
                    ...produce,
                    produceService!.createFromFormData(formData),
                ]);
                break;
            case KitchenItemType.Pantry:
                setPantryItems([
                    ...pantryItems,
                    pantryItemService!.createFromFormData(formData),
                ]);
                break;
            case KitchenItemType.Equipment:
            default:
                setEquipment([equipmentService!.createFromFormData(formData)]);
                break;
        }
    }

    return (
        <div className="grid gap-4 grid-cols-4 p-2">
            <KitchenItemInput onKitchenItemAdded={addPantryItem} />
            <KitchenItemTypeDisplay displayName="Produce">
                {produce.map((produce) => (
                    <ProduceDisplay key={produce.id} produce={produce} />
                ))}
            </KitchenItemTypeDisplay>
            <KitchenItemTypeDisplay displayName="Pantry Items">
                {pantryItems.map((pantryItem) => (
                    <PantryItemDisplay
                        key={pantryItem.id}
                        pantryItem={pantryItem}
                    />
                ))}
            </KitchenItemTypeDisplay>
            <KitchenItemTypeDisplay displayName="Equipment">
                {equipment.map((equipment) => (
                    <EquipmentDisplay
                        key={equipment.id}
                        equipment={equipment}
                    />
                ))}
            </KitchenItemTypeDisplay>
        </div>
    );
};

export default Home;
