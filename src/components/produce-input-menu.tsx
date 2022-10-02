import React from 'react';
import Input from './input';

export function ProduceInputMenu() {
    return (
        <div>
            <Input
                name="quantity"
                onChange={() => {}}
                placeholder="Enter quantity"
                label="Quantity"
            />
        </div>
    );
}
