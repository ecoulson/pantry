import React from 'react';
import { ClassBuilder } from './class-builder';
import { TextProps } from './text-props';

export function Text({
    children,
    fontFamily,
    fontSize,
    fontSmoothing,
    fontStyle,
    fontWeight,
    fontVariantNumeric,
    letterSpacing,
    lineHeight,
    listStyleType,
    listStylePosition,
    textAlign,
    textColor,
    textDecoration,
    textDecorationColor,
    textDecorationStyle,
    textDecorationThickness,
    textUnderlineOffset,
    textTransform,
    textIndent,
    verticalAlign,
    whitespace,
    wordBreak,
    content,
}: TextProps) {
    const classBuilder = new ClassBuilder();

    function getClass() {
        classBuilder.addClasses(
            fontFamily,
            fontSize,
            fontSmoothing,
            fontStyle,
            fontWeight,
            fontVariantNumeric,
            letterSpacing,
            lineHeight,
            listStyleType,
            listStylePosition,
            textAlign,
            textColor,
            textDecoration,
            textDecorationColor,
            textDecorationStyle,
            textDecorationThickness,
            textUnderlineOffset,
            textTransform,
            textIndent,
            verticalAlign,
            whitespace,
            wordBreak,
            content
        );

        return classBuilder.build();
    }

    return <p className={getClass()}>{children}</p>;
}
