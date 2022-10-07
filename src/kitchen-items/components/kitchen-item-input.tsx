import React, { useState } from 'react';
import { KitchenItemFormData } from '../forms/kitchen-item-form-data';
import { KitchenItemInputBar } from './kitchen-item-input-bar';
import { KitchenItemInputMenu } from './kitchen-item-input-menu';
import { KitchenItemInputProps } from './kitchen-item-input-props';

export function KitchenItemInput({ onPantryItemAdded }: KitchenItemInputProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [formData, setFormData] = useState<KitchenItemFormData | null>(null);

    function renderInputMenu() {
        if (name.trim().length === 0 && price.trim().length === 0) {
            return null;
        }
        return (
            <KitchenItemInputMenu
                price={price}
                name={name}
                onChange={setFormData}
            />
        );
    }

    function addKitchenItem() {
        if (formData) {
            setName('');
            setPrice('');
            onPantryItemAdded(formData);
        }
    }

    return (
        <div className="col-start-2 col-end-4 relative">
            <KitchenItemInputBar
                name={name}
                price={price}
                onAddItem={addKitchenItem}
                onNameChange={setName}
                onPriceChange={setPrice}
            />
            {renderInputMenu()}
        </div>
    );
}
