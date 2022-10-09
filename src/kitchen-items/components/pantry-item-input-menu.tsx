import React, { useEffect, useState } from 'react';
import { Container } from '../../core/bases/container';
import { Input } from '../../core/components/input';
import { FormData } from '../forms/form-data';
import { PantryItemFormData } from '../forms/pantry-item-form-data';
import { KitchenItemType } from '../models/kitchen-item-type';
import { KitchenItemInputMenuProps } from './kitchen-item-input-menu-props';

export function PantryItemInputMenu({
    name,
    price,
    onChange,
}: KitchenItemInputMenuProps) {
    const [formData, setFormData] = useState<FormData<PantryItemFormData>>({});

    useEffect(() => {
        onChange({
            type: KitchenItemType.Pantry,
            price,
            name,
            quantity: formData.quantity ?? 0,
            volume: formData.volume ?? 0,
            weight: formData.weight ?? 0,
            dateOfExpiration: formData.dateOfExpiration ?? '',
            dateOfPurchase: formData.dateOfPurchase ?? '',
        } as PantryItemFormData);
    }, [name, formData]);

    function updateFormData(key: keyof PantryItemFormData, value: string) {
        let newFormData = { ...formData };
        newFormData[key] = value;
        setFormData(newFormData);
    }

    return (
        <Container>
            <Input
                value={formData.quantity ?? ''}
                name="quantity"
                onChange={(quantity) => updateFormData('quantity', quantity)}
                placeholder="Enter quantity"
                label="Quantity"
            />
            <Input
                value={formData.weight ?? ''}
                name="weight"
                onChange={(weight) => updateFormData('weight', weight)}
                placeholder="Enter weight in lbs"
                label="Weight"
            />
            <Input
                value={formData.volume ?? ''}
                name="volume"
                onChange={(volume) => updateFormData('volume', volume)}
                placeholder="Enter volume in mL"
                label="Volume"
            />
            <Input
                value={formData.dateOfPurchase ?? ''}
                name="dateOfPurchase"
                onChange={(dateOfPurchase) =>
                    updateFormData('dateOfPurchase', dateOfPurchase)
                }
                label="Date Of Purchase (mm/dd/yyyy)"
                placeholder="10/16/2000"
            />
            <Input
                value={formData.dateOfExpiration ?? ''}
                name="dateOfExpiration"
                onChange={(dateOfExpiration) =>
                    updateFormData('dateOfExpiration', dateOfExpiration)
                }
                label="Date Of Expiration (mm/dd/yyyy)"
                placeholder="10/16/2000"
            />
        </Container>
    );
}
