import React from 'react';
import { Text, TextInput, View } from 'react-native';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { parseMarkdown } from '@qzlcorp/core';
import type { MarkdownBlock } from '@qzlcorp/core';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a controlled multiline Markdown input with an optional rendered preview. */
export interface MarkdownEditorProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'multiline'> {
  /** Visible label and accessibility label for the text input. */
  label: string;
  /** Current Markdown source string. */
  value: string;
  /**
   * Called whenever the React Native text input changes.
   * @param value Updated Markdown source string.
   */
  onValueChange: (value: string) => void;
  /** Shows a lightweight React Native text rendering of parsed Markdown blocks. @default false */
  preview?: boolean;
  /** Palette used for the input and preview. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the wrapper containing the label, input, and optional preview. */
  style?: StyleProp<ViewStyle>;
  /** Additional style applied to the React Native text input. */
  inputStyle?: StyleProp<TextStyle>;
}

function MarkdownPreview({ blocks, theme }: { blocks: MarkdownBlock[]; theme: ThemeName }) {
  const colors = themes[theme];
  return (
    <View accessibilityLabel="Markdown preview" style={{ marginTop: 12, gap: 8 }}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return <Text key={index} accessibilityRole="header" style={{ color: colors.text, fontSize: 20 - block.level * 2, fontWeight: '700' }}>{block.text}</Text>;
        }
        if (block.type === 'list') {
          return block.items.map((item, itemIndex) => <Text key={`${index}-${itemIndex}`} style={{ color: colors.text }}>{`\u2022 ${item}`}</Text>);
        }
        if (block.type === 'quote') return <Text key={index} style={{ color: colors.textMuted, borderLeftWidth: 2, borderLeftColor: colors.border, paddingLeft: 10 }}>{block.text}</Text>;
        if (block.type === 'code') return <Text key={index} style={{ color: colors.text, fontFamily: 'monospace', backgroundColor: colors.surfaceMuted, padding: 10 }}>{block.text}</Text>;
        return <Text key={index} style={{ color: colors.text }}>{block.text}</Text>;
      })}
    </View>
  );
}

/**
 * Provides a controlled multiline React Native editor and an optional parsed-text preview.
 *
 * @example
 * <MarkdownEditor label="Notes" value={notes} onValueChange={setNotes} preview />
 */
export function MarkdownEditor({ label, value, onValueChange, preview = false, theme = 'light', style, inputStyle, ...props }: MarkdownEditorProps) {
  const colors = themes[theme];
  const blocks = parseMarkdown(value);

  return (
    <View style={style}>
      <Text style={{ color: colors.text, fontWeight: '600', marginBottom: 6 }}>{label}</Text>
      <TextInput
        {...props}
        accessibilityLabel={label}
        multiline
        textAlignVertical="top"
        value={value}
        onChangeText={onValueChange}
        style={[{ minHeight: 160, padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12, color: colors.text, backgroundColor: colors.surface, fontFamily: 'monospace', fontSize: 14 }, inputStyle]}
      />
      {preview && <MarkdownPreview blocks={blocks} theme={theme} />}
    </View>
  );
}
