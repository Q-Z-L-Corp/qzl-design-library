import React from 'react';
import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface SkeletonProps {
  circle?: boolean;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

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
