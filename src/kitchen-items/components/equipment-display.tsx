import React from 'react';
import { Card } from '../../core/components/card';
import { LabeledDataDisplay } from '../../core/components/labeled-data-display';
import { KitchenItemSection } from '../bases/kitchen-item-section';
import { EquipmentDisplayProps } from './equipment-display-props';

export function EquipmentDisplay({ equipment }: EquipmentDisplayProps) {
    return (
        <Card>
            <KitchenItemSection>
                <h3 className="text-lg">{equipment.name}</h3>
                <p className="text-lg">{equipment.price}</p>
            </KitchenItemSection>
            <KitchenItemSection>
                <LabeledDataDisplay label="Brand" data={equipment.brand} />
                <LabeledDataDisplay
                    label="Purchased On"
                    data={equipment.dateOfPurchase}
                />
            </KitchenItemSection>
        </Card>
    );
}
