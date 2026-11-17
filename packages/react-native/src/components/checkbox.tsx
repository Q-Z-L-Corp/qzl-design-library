import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for a controlled React Native checkbox row. */
export interface CheckboxProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Whether the checkbox is currently selected. */
  checked: boolean;
  /**
   * Called when the user presses the row with the next checked state.
   * @param checked The requested checked state.
   */
  onCheckedChange: (checked: boolean) => void;
  /** Visible label and accessibility label. */
  label: string;
  /** Palette used for the check mark and control. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the pressable row. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a labeled, controlled checkbox using React Native press and accessibility semantics.
 *
 * @example
 * <Checkbox label="Remember me" checked={remember} onCheckedChange={setRemember} />
 */
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
