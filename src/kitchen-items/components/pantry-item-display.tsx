import React from 'react';
import { Text } from '../../core/bases/text';
import { Card } from '../../core/components/card';
import { LabeledDataDisplay } from '../../core/components/labeled-data-display';
import { KitchenItemSection } from '../bases/kitchen-item-section';
import { PantryItemDisplayProps } from './pantry-item-display-props';

export function PantryItemDisplay({ pantryItem }: PantryItemDisplayProps) {
    return (
        <Card>
            <KitchenItemSection>
                <Text fontSize="text-lg">{pantryItem.name}</Text>
                <Text fontSize="text-lg">{pantryItem.price}</Text>
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
