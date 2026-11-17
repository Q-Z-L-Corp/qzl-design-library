import React from 'react';
import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a compact themed text badge. */
export interface BadgeProps extends TextProps {
  /** Semantic color and background treatment. @default 'primary' */
  variant?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  /** Palette used to resolve the badge colors. @default 'light' */
  theme?: ThemeName;
}

/**
 * Renders a non-interactive badge using a themed React Native `Text` element.
 *
 * @example
 * <Badge variant="success">Available</Badge>
 */
export function Badge({ variant = 'primary', theme = 'light', style, ...props }: BadgeProps) {
  const colors = themes[theme];
  const foreground = {
    primary: colors.primary,
    neutral: colors.textMuted,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger
  }[variant];
  const background = {
    primary: colors.primarySubtle,
    neutral: colors.surfaceMuted,
    success: colors.successSubtle,
    warning: colors.warningSubtle,
    danger: colors.dangerSubtle
  }[variant];

  return (
    <Text
      style={[
        {
          alignSelf: 'flex-start',
          overflow: 'hidden',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 999,
          color: foreground,
          backgroundColor: background,
          fontSize: 12,
          fontWeight: '600'
        },
        style
      ]}
      {...props}
    />
  );
}
