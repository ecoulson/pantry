import React from 'react';
import { BaseProps } from '../../core/bases/base-props';
import { Flex } from '../../core/bases/flex';
import { Section } from '../../core/bases/section';

export function KitchenItemSection({ children }: BaseProps) {
    return (
        <Section>
            <Flex direction="flex-row" justifyContent="justify-between">
                {children}
            </Flex>
        </Section>
    );
}
