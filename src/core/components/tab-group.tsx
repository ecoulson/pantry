import React, { useState } from 'react';
import { TabGroupProps } from './tab-group-props';

export function TabGroup({ activeTab, tabs, onTabSelection }: TabGroupProps) {
    const baseStyle =
        'text-lg py-2 border-b-2 w-full text-center hover:cursor-pointer';

    function getClassName(tab: string) {
        if (tab !== activeTab) {
            return baseStyle;
        }
        return `${baseStyle} border-violet-500`;
    }

    function createClickHandler(tab: string) {
        return () => {
            onTabSelection(tab);
        };
    }

    return (
        <div className="flex justify-evenly">
            {tabs.map((tab) => (
                <div
                    key={tab}
                    onClick={createClickHandler(tab)}
                    className={getClassName(tab)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
}
