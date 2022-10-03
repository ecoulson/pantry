import React, { useState } from 'react';
import { InventoryItemInputMenuProps } from './inventory-item-input-menu-props';
import { PantryItemInputMenu } from './pantry-item-input-menu';
import { PantryItemType } from '../models/pantry-item-type';
import { ProduceInputMenu } from './produce-input-menu';
import { TabGroup } from './tab-group';
import { EquipmentInputMenu } from './equipment-input-menu';

export function PantryInputMenu({
    name,
    price,
    onChange,
}: InventoryItemInputMenuProps) {
    const tabs = [
        PantryItemType.Produce,
        PantryItemType.Pantry,
        PantryItemType.Equipment,
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    function renderMenu() {
        switch (activeTab) {
            case PantryItemType.Produce:
                return (
                    <ProduceInputMenu
                        price={price}
                        name={name}
                        onChange={onChange}
                    />
                );
            case PantryItemType.Pantry:
                return (
                    <PantryItemInputMenu
                        price={price}
                        name={name}
                        onChange={onChange}
                    />
                );
            case PantryItemType.Equipment:
                return (
                    <EquipmentInputMenu
                        price={price}
                        name={name}
                        onChange={onChange}
                    />
                );
            default:
                return 'Unknown input type';
        }
    }

    return (
        <div className="shadow-lg bg-slate-50 w-full max-w-screen-lg rounded-md text-base absolute top-24 z-10">
            <TabGroup
                activeTab={activeTab}
                onTabSelection={(tab) => setActiveTab(tab as PantryItemType)}
                tabs={tabs}
            />
            {renderMenu()}
        </div>
    );
}
