import React from 'react'
import { InputProps } from './input-props'

export default function Input({ name, label, placeholder }: InputProps) {
    return (
        <div className="px-8 py-4 text-lg flex flex-col gap-1 ">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                className="bg-transparent outline-none"
                placeholder={placeholder ?? ''}
            />
        </div>
    )
}
