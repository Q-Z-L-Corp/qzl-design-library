import React from 'react';
import { ActivityIndicator } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface SpinnerProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Spinner({ label = 'Loading', size = 'md', theme = 'light', style }: SpinnerProps) {
  return (
    <ActivityIndicator
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      size={size === 'sm' ? 'small' : 'large'}
      color={themes[theme].primary}
      style={style}
    />
  );
}
