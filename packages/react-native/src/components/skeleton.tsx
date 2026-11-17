import React from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for an accessibility-hidden loading placeholder. */
export interface SkeletonProps {
  /** Renders a 40-by-40 circular placeholder instead of the full-width bar. @default false */
  circle?: boolean;
  /** Palette used for the placeholder surface. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the placeholder view. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a static loading placeholder hidden from platform accessibility services.
 *
 * @example
 * <Skeleton />
 * <Skeleton circle />
 */
export function Skeleton({ circle = false, theme = 'light', style }: SkeletonProps) {
  const colors = themes[theme];
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[{ width: circle ? 40 : '100%', height: circle ? 40 : 14, borderRadius: circle ? 20 : 8, backgroundColor: colors.surfaceMuted }, style]}
    />
  );
}
