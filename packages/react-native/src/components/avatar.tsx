import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import type { ImageProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface AvatarProps extends Omit<ImageProps, 'source' | 'accessibilityLabel' | 'style'> {
  name: string;
  uri?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
}

export function Avatar({ name, uri, size = 'md', theme = 'light', style, onError, ...props }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const colors = themes[theme];
  const dimension = size === 'sm' ? 32 : size === 'lg' ? 56 : 40;

  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={name}
      style={[{ width: dimension, height: dimension, borderRadius: dimension / 2, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySubtle }, style]}
    >
      {uri && !imageFailed ? (
        <Image
          source={{ uri }}
          onError={(event) => {
            setImageFailed(true);
            onError?.(event);
          }}
          style={{ width: dimension, height: dimension }}
          {...props}
        />
      ) : (
        <Text style={{ color: colors.primary, fontWeight: '700' }}>{getInitials(name)}</Text>
      )}
    </View>
  );
}
