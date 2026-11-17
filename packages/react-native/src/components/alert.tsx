import React from 'react';
import { Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for a non-interactive, themed status message. */
export interface AlertProps {
  /** Message content displayed in the alert. */
  children: React.ReactNode;
  /** Semantic color and React Native accessibility role. @default 'info' */
  variant?: 'info' | 'success' | 'warning' | 'danger';
  /** Palette used for the message. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the outer container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays a themed status message; danger alerts use the React Native alert role.
 *
 * @example
 * <Alert variant="warning">Check the required fields before continuing.</Alert>
 */
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
