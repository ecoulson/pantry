import React from 'react';
import { Card } from '../../core/components/card';
import { LabeledDataDisplay } from '../../core/components/labeled-data-display';
import { KitchenItemSection } from '../bases/kitchen-item-section';
import { PantryItemDisplayProps } from './pantry-item-display-props';

export function PantryItemDisplay({ pantryItem }: PantryItemDisplayProps) {
    return (
        <Card>
            <KitchenItemSection>
                <h3 className="text-lg">{pantryItem.name}</h3>
                <p className="text-lg">{pantryItem.price}</p>
            </KitchenItemSection>
            <KitchenItemSection>
                <LabeledDataDisplay
                    label="Purchased On"
                    data={pantryItem.dateOfPurchase}
                />
                <LabeledDataDisplay
                    label="Expires On"
                    data={pantryItem.dateOfExpiration}
                />
            </KitchenItemSection>
            <KitchenItemSection>
                <LabeledDataDisplay
                    label="Quantity"
                    data={pantryItem.quantity}
                />
                <LabeledDataDisplay label="Weight" data={pantryItem.weight} />
                <LabeledDataDisplay label="Volume" data={pantryItem.volume} />
            </KitchenItemSection>
        </Card>
    );
}
