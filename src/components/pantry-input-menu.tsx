import React, { useState } from 'react';
import { ProduceInputMenu } from './produce-input-menu';
import { TabGroup } from './tab-group';

export function PantryInputMenu() {
    const tabs = ['Produce', 'Pantry', 'Equipment'];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    function renderMenu() {
        switch (activeTab) {
            case 'Produce':
                return <ProduceInputMenu />;
            default:
                return 'Unknown input type';
        }
    }

    return (
        <div className="shadow-lg bg-slate-50 w-full max-w-screen-lg rounded-md text-base absolute top-24">
            <TabGroup
                activeTab={activeTab}
                onTabSelection={setActiveTab}
                tabs={tabs}
            />
            {renderMenu()}
        </div>
    );
}
