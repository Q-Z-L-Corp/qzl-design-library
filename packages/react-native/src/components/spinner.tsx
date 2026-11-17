import React from 'react';
import { ActivityIndicator } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for a React Native activity indicator. */
export interface SpinnerProps {
  /** Accessible label announced by platform accessibility services. @default 'Loading' */
  label?: string;
  /** `sm` maps to the small indicator; `md` and `lg` map to the large indicator. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Palette used for the indicator color. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the React Native activity indicator. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays React Native's activity indicator with a progressbar accessibility role.
 *
 * @example
 * <Spinner label="Loading account" />
 */
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
