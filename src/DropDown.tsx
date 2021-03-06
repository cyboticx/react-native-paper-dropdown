import { ImageSourcePropType, LayoutChangeEvent, ScrollView, TouchableWithoutFeedback, View, } from 'react-native';
import { Menu, TextInput, TouchableRipple, useTheme } from 'react-native-paper';
import React, { forwardRef, ReactNode, useEffect, useState } from 'react';

import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput';
import { Theme } from 'react-native-paper/lib/typescript/src/types';

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface DropDownItem {
	label: string;
	value: string | number;
	icon?: ImageSourcePropType;
	custom?: (label: string, value: string | number, icon?: ImageSourcePropType) => ReactNode;
}

export interface DropDownProps {
	visible: boolean;
	onDismiss: () => void;
	showDropDown: () => void;
	value?: string | number;
	setValue: ( _value: string | number ) => void;
	label?: string | undefined;
	placeholder?: string;
	mode?: 'outlined' | 'flat';
	inputProps?: TextInputPropsWithoutTheme;
	list: Array<DropDownItem>;
	dropDownContainerMaxHeight?: number;
	activeColor?: string;
	theme?: Theme;
}

type TextInputPropsWithoutTheme = Without<TextInputProps, 'theme'>;

const DropDown = forwardRef<TouchableWithoutFeedback, DropDownProps>(
	( props, ref ) => {
		const activeTheme = useTheme();
		const {
			visible,
			onDismiss,
			showDropDown,
			value,
			setValue,
			activeColor,
			mode,
			label,
			placeholder,
			inputProps,
			list,
			dropDownContainerMaxHeight,
			theme,
		} = props;
		const [ displayValue, setDisplayValue ] = useState( '' );
		const [ inputLayout, setInputLayout ] = useState( {
			height: 0,
			width: 0,
			x: 0,
			y: 0,
		} );
		
		const onLayout = ( event: LayoutChangeEvent ) => {
			setInputLayout( event.nativeEvent.layout );
		};
		
		useEffect( () => {
			const _label = list.find( ( _ ) => _.value === value )?.label;
			if (_label) {
				setDisplayValue( _label );
			}
		}, [ list, value ] );
		
		return (
			<Menu
				visible={ visible }
				onDismiss={ onDismiss }
				theme={ theme }
				anchor={
					<TouchableRipple ref={ ref } onPress={ showDropDown } onLayout={ onLayout }>
						<View pointerEvents={ 'none' }>
							<TextInput
								value={ displayValue }
								mode={ mode }
								label={ label }
								placeholder={ placeholder }
								pointerEvents={ 'none' }
								theme={ theme }
								{ ...inputProps }
							/>
						</View>
					</TouchableRipple>
				}
				style={ {
					maxWidth: inputLayout?.width,
					width: inputLayout?.width,
					marginTop: inputLayout?.height,
				} }
			>
				<ScrollView style={ { maxHeight: dropDownContainerMaxHeight || 200 } }>
					{ list.map( ( _item: DropDownItem, _index: number ) => (
						<Menu.Item
							key={ _index }
							theme={ theme }
							titleStyle={ {
								color:
									value === _item.value
										? activeColor || ( theme || activeTheme ).colors.primary
										: ( ( theme || activeTheme ) ? ( theme || activeTheme ).colors.text : undefined ),
							} }
							onPress={ () => {
								setValue( _item.value );
								if (onDismiss) {
									onDismiss();
								}
							} }
							title={ _item.custom ? _item.custom( _item.label, _item.value, _item.icon ) : _item.label }
							style={ { width: inputLayout?.width } }
						/>
					) ) }
				</ScrollView>
			</Menu>
		);
	}
);

export default DropDown;
