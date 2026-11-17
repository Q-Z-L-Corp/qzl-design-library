import React from 'react';
import type { StyleProp, TextStyle } from 'react-native';
import { Input } from './input.js';
import type { InputProps } from './input.js';

/** Props for a multiline input; all other input options are inherited from {@link InputProps}. */
export interface TextareaProps extends InputProps {
  /** Additional style applied to the multiline text input after its top-aligned minimum-height style. */
  inputStyle?: StyleProp<TextStyle>;
}

/**
 * Renders the themed {@link Input} in multiline, top-aligned mode with four displayed lines.
 *
 * @example
 * <Textarea accessibilityLabel="Message" value={message} onChangeText={setMessage} placeholder="Write a message" />
 */
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
