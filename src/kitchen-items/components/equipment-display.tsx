import React from 'react';
import { Card } from '../../core/components/card';
import { EquipmentDisplayProps } from './equipment-display-props';

export function EquipmentDisplay({ equipment }: EquipmentDisplayProps) {
    return (
        <Card>
            <div className="flex flex-row justify-between">
                <h3>{equipment.name}</h3>
                <p>{equipment.price}</p>
            </div>
            <div>
                <h4>Additional Information</h4>
                <p>Brand {equipment.brand}</p>
                <p>Purchased On {equipment.dateOfPurchase}</p>
            </div>
            <div></div>
        </Card>
    );
}
