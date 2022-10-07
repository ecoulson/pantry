import React from 'react';
import { Card } from '../../core/components/card';
import { LabeledDataDisplay } from '../../core/components/labeled-data-display';
import { KitchenItemSection } from '../bases/kitchen-item-section';
import { ProduceDisplayProps } from './produce-display-props';

export function ProduceDisplay({ produce }: ProduceDisplayProps) {
    return (
        <Card>
            <KitchenItemSection>
                <h3 className="text-lg">{produce.name}</h3>
                <p className="text-lg">{produce.price}</p>
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
