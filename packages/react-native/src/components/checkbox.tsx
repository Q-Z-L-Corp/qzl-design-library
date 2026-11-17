import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface CheckboxProps extends Omit<PressableProps, 'children' | 'style'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Checkbox({ checked, onCheckedChange, onPress, label, theme = 'light', disabled, style, ...props }: CheckboxProps) {
  const colors = themes[theme];
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={(event) => {
        onCheckedChange(!checked);
        onPress?.(event);
      }}
      style={[{ minHeight: 44, flexDirection: 'row', alignItems: 'center', opacity: disabled ? 0.5 : 1 }, style]}
      {...props}
    >
      <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center', marginRight: 10, borderWidth: 1.5, borderColor: checked ? colors.primary : colors.border, borderRadius: 5, backgroundColor: checked ? colors.primary : colors.surface }}>
        {checked && <Text style={{ color: colors.primaryForeground, fontSize: 13, fontWeight: '700' }}>✓</Text>}
      </View>
      <Text style={{ color: colors.text }}>{label}</Text>
    </Pressable>
  );
}
