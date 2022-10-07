import React, { useState } from 'react';
import { KitchenItemInputMenuProps } from './kitchen-item-input-menu-props';
import { PantryItemInputMenu } from './pantry-item-input-menu';
import { EquipmentInputMenu } from './equipment-input-menu';
import { TabGroup } from '../../core/components/tab-group';
import { KitchenItemType } from '../models/kitchen-item-type';

export function KitchenItemInputMenu({
    name,
    price,
    onChange,
}: KitchenItemInputMenuProps) {
    const tabs = [
        KitchenItemType.Produce,
        KitchenItemType.Pantry,
        KitchenItemType.Equipment,
    ];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    function renderMenu() {
        switch (activeTab) {
            case KitchenItemType.Produce:
                return (
                    <KitchenItemInputMenu
                        price={price}
                        name={name}
                        onChange={onChange}
                    />
                );
            case KitchenItemType.Pantry:
                return (
                    <PantryItemInputMenu
                        price={price}
                        name={name}
                        onChange={onChange}
                    />
                );
            case KitchenItemType.Equipment:
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
                onTabSelection={(tab) => setActiveTab(tab as KitchenItemType)}
                tabs={tabs}
            />
            {renderMenu()}
        </div>
    );
}
