import React from 'react';
import { KitchenItemInputMenuProps } from './kitchen-item-input-menu-props';
import { Input } from '../../core/components/input';
import { KitchenItemType } from '../models/kitchen-item-type';
import { Container } from '../../core/bases/container';
import { useForm } from '../../core/hooks/use-form';

export function EquipmentInputMenu({
    name,
    price,
    onChange,
}: KitchenItemInputMenuProps) {
    const { formData, updateFormData } = useForm(
        {
            type: KitchenItemType.Equipment,
            name: name,
            brand: '',
            price: price,
            dateOfPurchase: '',
        },
        onChange
    );

    return (
        <Container>
            <Input
                value={formData.getOrDefaultField('brand', '')}
                name="brand"
                onChange={updateFormData('brand')}
                label="Brand"
                placeholder="Miele"
            />
            <Input
                value={formData.getOrDefaultField('dateOfPurchase', '')}
                name="dateOfPurchase"
                onChange={updateFormData('dateOfPurchase')}
                label="Date Of Purchase (mm/dd/yyyy)"
                placeholder="10/16/2000"
            />
        </Container>
    );
}
