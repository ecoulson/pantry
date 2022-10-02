import React from 'react'
import Input from './input'

export function ProduceInputMenu() {
    return (
        <div>
            <Input
                name="quantity"
                placeholder="Enter quantity"
                label="Quantity"
            />
        </div>
    )
}
