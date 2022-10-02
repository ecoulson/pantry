import React from 'react';
import { InputProps } from './input-props';

export function Input({
    value,
    name,
    label,
    placeholder,
    onChange,
}: InputProps) {
    return (
        <div className="px-8 py-4 text-lg flex flex-col gap-1 ">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="bg-transparent outline-none"
                placeholder={placeholder ?? ''}
            />
        </div>
    );
}
