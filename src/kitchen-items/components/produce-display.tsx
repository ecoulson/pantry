import React from 'react';
import { Text } from '../../core/bases/text';
import { Card } from '../../core/components/card';
import { LabeledDataDisplay } from '../../core/components/labeled-data-display';
import { KitchenItemSection } from '../bases/kitchen-item-section';
import { ProduceDisplayProps } from './produce-display-props';

export function ProduceDisplay({ produce }: ProduceDisplayProps) {
    return (
        <Card>
            <KitchenItemSection>
                <Text fontSize="text-lg">{produce.name}</Text>
                <Text fontSize="text-lg">{produce.price}</Text>
            </KitchenItemSection>
            <KitchenItemSection>
                <LabeledDataDisplay
                    label="Purchased On"
                    data={produce.dateOfPurchase}
                />
            </KitchenItemSection>
            <KitchenItemSection>
                <LabeledDataDisplay label="Quantity" data={produce.quantiy} />
                <LabeledDataDisplay label="Weight" data={produce.weight} />
            </KitchenItemSection>
        </Card>
    );
}
