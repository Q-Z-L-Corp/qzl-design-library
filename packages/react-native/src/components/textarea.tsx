import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Input } from './input.js';
import type { InputProps } from './input.js';

export interface TextareaProps extends InputProps {
  inputStyle?: StyleProp<TextStyle>;
}

export function Textarea({ inputStyle, ...props }: TextareaProps) {
  return (
    <Input
      {...props}
      multiline
      numberOfLines={4}
      inputStyle={[{ minHeight: 112, textAlignVertical: 'top' }, inputStyle]}
    />
  );
}
