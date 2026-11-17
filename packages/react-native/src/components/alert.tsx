import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Alert({ children, variant = 'info', theme = 'light', style }: AlertProps) {
  const colors = themes[theme];
  const palette = {
    info: { color: colors.primary, background: colors.primarySubtle, border: colors.primaryBorder },
    success: { color: colors.success, background: colors.successSubtle, border: colors.successBorder },
    warning: { color: colors.warning, background: colors.warningSubtle, border: colors.warningBorder },
    danger: { color: colors.danger, background: colors.dangerSubtle, border: colors.dangerBorder }
  }[variant];

  return (
    <View
      accessibilityRole={variant === 'danger' ? 'alert' : 'text'}
      style={[{ padding: 12, borderWidth: 1, borderColor: palette.border, borderRadius: 12, backgroundColor: palette.background }, style]}
    >
      <Text style={{ color: palette.color, lineHeight: 20 }}>{children}</Text>
    </View>
  );
}
