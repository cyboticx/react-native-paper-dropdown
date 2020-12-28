import { TouchableWithoutFeedback } from 'react-native';
import React, { ReactNode } from 'react';
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';
import { Theme } from 'react-native-paper/lib/typescript/src/types';
declare type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export interface DropDownItem {
    label: string;
    value: string | number;
    icon?: string | number;
    custom?: (label: string, value: string | number) => ReactNode;
}
export interface DropDownProps {
    visible: boolean;
    onDismiss: () => void;
    showDropDown: () => void;
    value?: string | number;
    setValue: (_value: string | number) => void;
    label?: string | undefined;
    placeholder?: string;
    mode?: 'outlined' | 'flat';
    inputProps?: TextInputPropsWithoutTheme;
    list: Array<DropDownItem>;
    dropDownContainerMaxHeight?: number;
    activeColor?: string;
    theme?: Theme;
}
declare type TextInputPropsWithoutTheme = Without<TextInputProps, 'theme'>;
declare const DropDown: React.ForwardRefExoticComponent<DropDownProps & React.RefAttributes<TouchableWithoutFeedback>>;
export default DropDown;
