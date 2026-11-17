import React from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for a themed content container. */
export interface CardProps extends ViewProps {
  /** Adds platform elevation when true. @default true */
  elevated?: boolean;
  /** Palette used for the border and surface. @default 'light' */
  theme?: ThemeName;
}

/**
 * Provides a padded React Native view with a themed surface and optional elevation.
 *
 * @example
 * <Card><Text>Account details</Text></Card>
 */
export function Card({ elevated = true, theme = 'light', style, ...props }: CardProps) {
  const colors = themes[theme];

  return (
    <View
      style={[
        {
          padding: 16,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 18,
          backgroundColor: colors.surface,
          ...(elevated ? { elevation: 3 } : {})
        },
        style
      ]}
      {...props}
    />
  );
}
