import React from 'react';
import { Text } from '../../core/bases/text';
import { Card } from '../../core/components/card';
import { LabeledDataDisplay } from '../../core/components/labeled-data-display';
import { KitchenItemSection } from '../bases/kitchen-item-section';
import { EquipmentDisplayProps } from './equipment-display-props';

export function EquipmentDisplay({ equipment }: EquipmentDisplayProps) {
    return (
        <Card>
            <KitchenItemSection>
                <Text fontSize="text-lg">{equipment.name}</Text>
                <Text fontSize="text-lg">{equipment.price}</Text>
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
