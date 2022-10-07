import React from 'react';
import { Flex } from '../bases/flex';
import { InputProps } from './input-props';

export function Input({
    value,
    name,
    label,
    placeholder,
    onChange,
}: InputProps) {
    return (
        <div className="px-8 py-4 text-lg">
            <Flex direction="flex-col" gap="gap-1">
                <label htmlFor={name}>{label}</label>
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="bg-transparent outline-none"
                    placeholder={placeholder ?? ''}
                />
            </Flex>
        </div>
    );
}
