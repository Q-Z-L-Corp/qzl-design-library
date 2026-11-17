import React from 'react';
import { Text, TextInput, View } from 'react-native';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { parseMarkdown } from '@qzl/core';
import type { MarkdownBlock } from '@qzl/core';
import { themes, type ThemeName } from '@qzl/tokens';

export interface MarkdownEditorProps extends Omit<TextInputProps, 'value' | 'onChangeText' | 'multiline'> {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  preview?: boolean;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
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
