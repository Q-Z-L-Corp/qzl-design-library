import React from 'react';
import { TextInput } from 'react-native';
import type { TextInputProps, StyleProp, TextStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a themed React Native text input. */
export interface InputProps extends TextInputProps {
  /** Applies danger styling and overrides the React Native accessibility hint. @default false */
  error?: boolean;
  /** Palette used for text, surface, placeholder, and border colors. @default 'light' */
  theme?: ThemeName;
  /** Additional style applied after the input's base and inherited `style`. */
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * Renders React Native's text input with themed colors and an error accessibility hint.
 *
 * @example
 * <Input accessibilityLabel="Email address" keyboardType="email-address" placeholder="you@example.com" />
 */
export function Input({ error = false, theme = 'light', style, inputStyle, accessibilityHint, ...props }: InputProps) {
  const colors = themes[theme];

  return (
    <TextInput
      placeholderTextColor={colors.textSoft}
      accessibilityHint={error ? 'This field contains an error.' : accessibilityHint}
      style={[
        {
          minHeight: 44,
          paddingHorizontal: 12,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.border,
          borderRadius: 12,
          color: colors.text,
          backgroundColor: colors.surface,
          fontSize: 14
        },
        style,
        inputStyle
      ]}
      {...props}
    />
  );
}
