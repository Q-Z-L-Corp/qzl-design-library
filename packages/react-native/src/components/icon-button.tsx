import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  label: string;
  children: React.ReactNode;
  variant?: 'neutral' | 'primary' | 'danger';
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

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
