import React, { useState } from 'react'
import { TabGroupProps } from './tab-group-props'

export function TabGroup({ tabs }: TabGroupProps) {
    const [activeTab, setActiveTab] = useState(tabs[0])

    return (
        <div className="flex justify-evenly">
            {tabs.map((tab) => {
                if (tab === activeTab) {
                    return (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="text-lg py-2 border-b-2 border-violet-500 w-full text-center hover:cursor-pointer"
                        >
                            {tab}
                        </div>
                    )
                } else {
                    return (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="text-lg py-2 border-b-2 border-transparent w-full text-center hover:cursor-pointer"
                        >
                            {tab}
                        </div>
                    )
                }
            })}
        </div>
    )
}
