import React from 'react';
import { Flex } from '../bases/flex';
import { LabeledDataProps } from './labeled-data-props';

export function LabeledDataDisplay({ label, data }: LabeledDataProps) {
    return (
        <Flex direction="flex-col">
            <p className="font-bold">{label}</p>
            <p>{data}</p>
        </Flex>
    );
}
