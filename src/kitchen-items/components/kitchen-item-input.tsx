import React, { useState } from 'react';
import { FormData } from '../../core/forms/form-data';
import { KitchenItemInputBar } from './kitchen-item-input-bar';
import { KitchenItemInputMenu } from './kitchen-item-input-menu';
import { KitchenItemInputProps } from './kitchen-item-input-props';

export function KitchenItemInput({
    onKitchenItemAdded,
}: KitchenItemInputProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [formData, setFormData] = useState(FormData.empty());

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
        formData.setField('name', name);
        formData.setField('price', price);
        setPrice('');
        setName('');
        onKitchenItemAdded(formData);
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
