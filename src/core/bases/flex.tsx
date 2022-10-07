import React from 'react';
import { ClassBuilder } from './class-builder';
import { FlexProps } from './flex-props';

export function Flex({
    children,
    basis,
    direction,
    wrap,
    grow,
    shrink,
    order,
    gap,
    justifyContent,
    justifyItems,
    justifySelf,
    alignContent,
    alignItems,
    alignSelf,
}: FlexProps) {
    const classBuilder = new ClassBuilder();

    function getClassName() {
        classBuilder.addClasses(
            basis,
            direction,
            wrap,
            grow,
            shrink,
            order,
            gap,
            justifyContent,
            justifyItems,
            justifySelf,
            alignContent,
            alignItems,
            alignSelf
        );
        return `flex ${classBuilder.build()}`;
    }

    return <div className={getClassName()}>{children}</div>;
}
