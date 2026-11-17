import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** One option in the locally expanded select list. */
export interface SelectOption {
  /** Value reported to the controlled change callback. */
  value: string;
  /** Text shown for the option. */
  label: string;
  /** Prevents selecting this option. */
  disabled?: boolean;
}

/** Props for a controlled React Native disclosure list used for selection. */
export interface SelectProps {
  /** Visible label and accessibility label for the trigger. */
  label: string;
  /** Choices shown when the trigger is expanded. */
  options: SelectOption[];
  /** Currently selected option value. */
  value: string;
  /**
   * Called with the chosen option's value before the option list closes.
   * @param value Value belonging to the selected option.
   */
  onValueChange: (value: string) => void;
  /** Trigger text used when `value` does not match an option. @default 'Choose an option' */
  placeholder?: string;
  /** Palette used for the trigger and option list. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the outer wrapper. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Toggles a React Native list of radio-style choices; it is not a platform picker control.
 *
 * @example
 * <Select label="Country" options={countries} value={country} onValueChange={setCountry} />
 */
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
