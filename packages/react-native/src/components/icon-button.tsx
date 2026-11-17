import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for an icon-only React Native pressable. */
export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Accessible name announced for the button. */
  label: string;
  /** Icon or other node shown inside the button. */
  children: React.ReactNode;
  /** Foreground color treatment. @default 'neutral' */
  variant?: 'neutral' | 'primary' | 'danger';
  /** Palette used for button border and icon color. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the pressable. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a compact React Native button whose accessible name comes from `label`.
 *
 * @example
 * <IconButton label="Add item" onPress={addItem}>＋</IconButton>
 */
export function IconButton({ label, children, variant = 'neutral', theme = 'light', style, ...props }: IconButtonProps) {
  const colors = themes[theme];
  const color = variant === 'primary' ? colors.primary : variant === 'danger' ? colors.danger : colors.text;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.surface, opacity: pressed ? 0.7 : 1 }, style]}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number'
        ? <Text style={{ color, fontSize: 18 }}>{children}</Text>
        : children}
    </Pressable>
  );
}
