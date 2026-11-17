import React from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface CardProps extends ViewProps {
  elevated?: boolean;
  theme?: ThemeName;
}

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
