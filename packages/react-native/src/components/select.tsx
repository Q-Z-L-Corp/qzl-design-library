import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Select({ label, options, value, onValueChange, placeholder = 'Choose an option', theme = 'light', style }: SelectProps) {
  const [open, setOpen] = useState(false);
  const colors = themes[theme];
  const selected = options.find((option) => option.value === value);
  return (
    <View style={style}>
      <Text style={{ color: colors.text, fontWeight: '600', marginBottom: 6 }}>{label}</Text>
      <Pressable
        accessibilityRole="combobox"
        accessibilityLabel={label}
        accessibilityValue={{ text: selected?.label ?? placeholder }}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen(!open)}
        style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.surface }}
      >
        <Text style={{ color: selected ? colors.text : colors.textSoft }}>{selected?.label ?? placeholder}</Text>
        <Text style={{ color: colors.textMuted }}>▾</Text>
      </Pressable>
      {open && (
        <View style={{ marginTop: 4, padding: 4, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.surface }}>
          {options.map((option) => (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: option.value === value, disabled: option.disabled }}
              disabled={option.disabled}
              onPress={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
              style={{ minHeight: 40, justifyContent: 'center', paddingHorizontal: 10, opacity: option.disabled ? 0.5 : 1 }}
            >
              <Text style={{ color: option.value === value ? colors.primary : colors.text }}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
