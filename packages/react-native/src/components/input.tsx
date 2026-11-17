import React from 'react';
import { TextInput } from 'react-native';
import type { TextInputProps, StyleProp, TextStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface InputProps extends TextInputProps {
  error?: boolean;
  theme?: ThemeName;
  inputStyle?: StyleProp<TextStyle>;
}

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
