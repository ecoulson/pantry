import { BaseProps } from './base-props';

export interface FlexProps extends BaseProps {
    basis?: string;
    direction?: string;
    wrap?: string;
    grow?: string;
    shrink?: string;
    order?: string;
    gap?: string;
    justifyContent?: string;
    justifyItems?: string;
    justifySelf?: string;
    alignContent?: string;
    alignItems?: string;
    alignSelf?: string;
}
