import React from 'react';
import { KitchenItemDisplayProps } from './kitchen-display-props';

export function KitchenItemTypeDisplay({
    children,
    displayName,
}: KitchenItemDisplayProps) {
    return (
        <div className="col-span-full py-5 px-10">
            <h2 className="text-xl">{displayName}</h2>
            <div className="flex flex-row gap-5">{children}</div>
        </div>
    );
}
