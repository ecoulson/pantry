import React, { useState } from 'react';
import { PantryInputMenuProps } from './pantry-input-menu-props';
import { ProduceInputMenu } from './produce-input-menu';
import { TabGroup } from './tab-group';

export function PantryInputMenu({ name }: PantryInputMenuProps) {
    const tabs = ['Produce', 'Pantry', 'Equipment'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    function renderMenu() {
        switch (activeTab) {
            case 'Produce':
                return <ProduceInputMenu name={name} onChange={console.log} />;
            default:
                return 'Unknown input type';
        }
    }

    return (
        <div className="shadow-lg bg-slate-50 w-full max-w-screen-lg rounded-md text-base absolute top-24 z-10">
            <TabGroup
                activeTab={activeTab}
                onTabSelection={setActiveTab}
                tabs={tabs}
            />
            {renderMenu()}
        </div>
    );
}
