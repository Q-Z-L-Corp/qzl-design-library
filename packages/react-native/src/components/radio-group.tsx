import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onValueChange: (value: string) => void;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function RadioGroup({ label, options, value, onValueChange, theme = 'light', style }: RadioGroupProps) {
  const colors = themes[theme];
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={style}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityLabel={option.description ? `${option.label}. ${option.description}` : option.label}
            accessibilityState={{ checked: selected, disabled: option.disabled }}
            disabled={option.disabled}
            onPress={() => onValueChange(option.value)}
            style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', opacity: option.disabled ? 0.5 : 1 }}
          >
            <View style={{ width: 20, height: 20, borderWidth: 2, borderColor: selected ? colors.primary : colors.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              {selected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} />}
            </View>
            <View>
              <Text style={{ color: colors.text }}>{option.label}</Text>
              {option.description && <Text style={{ color: colors.textMuted, fontSize: 12 }}>{option.description}</Text>}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
