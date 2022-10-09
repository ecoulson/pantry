import React from 'react';
import { Container } from '../../core/bases/container';
import { Input } from '../../core/components/input';
import { useForm } from '../../core/hooks/use-form';
import { KitchenItemType } from '../models/kitchen-item-type';
import { KitchenItemInputMenuProps } from './kitchen-item-input-menu-props';

export function PantryItemInputMenu({
    name,
    price,
    onChange,
}: KitchenItemInputMenuProps) {
    const { formData, updateFormData } = useForm(
        {
            type: KitchenItemType.Pantry,
            price,
            name,
            quantity: '',
            volume: '',
            weight: '',
            dateOfExpiration: '',
            dateOfPurchase: '',
        },
        onChange
    );

    return (
        <Container>
            <Input
                value={formData.getOrDefaultField('quantity', '')}
                name="quantity"
                onChange={updateFormData('quantity')}
                placeholder="Enter quantity"
                label="Quantity"
            />
            <Input
                value={formData.getOrDefaultField('weight', '')}
                name="weight"
                onChange={updateFormData('weight')}
                placeholder="Enter weight in lbs"
                label="Weight"
            />
            <Input
                value={formData.getOrDefaultField('volume', '')}
                name="volume"
                onChange={updateFormData('volume')}
                placeholder="Enter volume in mL"
                label="Volume"
            />
            <Input
                value={formData.getOrDefaultField('dateOfPurchase', '')}
                name="dateOfPurchase"
                onChange={updateFormData('dateOfPurchase')}
                label="Date Of Purchase (mm/dd/yyyy)"
                placeholder="10/16/2000"
            />
            <Input
                value={formData.getOrDefaultField('dateOfExpiration', '')}
                name="dateOfExpiration"
                onChange={updateFormData('dateOfExpiration')}
                label="Date Of Expiration (mm/dd/yyyy)"
                placeholder="10/16/2000"
            />
        </Container>
    );
}
