import React from 'react'
import { ProduceInputMenu } from './produce-input-menu'
import { TabGroup } from './tab-group'

export function PantryInputMenu() {
    return (
        <div className="shadow-lg bg-slate-50 w-full max-w-screen-lg rounded-md text-base absolute top-24">
            <TabGroup tabs={['Produce', 'Pantry', 'Equipment']} />
            <ProduceInputMenu />
        </div>
    )
}
