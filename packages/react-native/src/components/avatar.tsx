import React, { useState } from 'react';
import { Image, Text, View } from 'react-native';
import type { ImageProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/**
 * Props for a remote-image avatar with an initials fallback.
 * Remaining image props are forwarded to React Native's `Image` when `uri` is present.
 */
export interface AvatarProps extends Omit<ImageProps, 'source' | 'accessibilityLabel' | 'style'> {
  /** Person or entity name, also used as the image accessibility label. */
  name: string;
  /** Remote image URI; initials are shown when omitted or when loading fails. */
  uri?: string;
  /** Preset circular diameter: 32, 40, or 56 logical pixels. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Palette used for the fallback background and initials. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the circular outer container. */
  style?: StyleProp<ViewStyle>;
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
}

/**
 * Shows a circular avatar image, falling back to the name's initials on failure.
 *
 * @example
 * <Avatar name="Ada Lovelace" uri="https://example.com/ada.png" />
 */
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
