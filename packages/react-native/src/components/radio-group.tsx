import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** One labeled choice in a radio group. */
export interface RadioOption {
  /** Value emitted when this choice is pressed. */
  value: string;
  /** Visible title and fallback accessibility label. */
  label: string;
  /** Optional supporting text, also included in the accessibility label. */
  description?: string;
  /** Prevents selecting this choice. */
  disabled?: boolean;
}

/** Props for a controlled, labeled set of radio choices. */
export interface RadioGroupProps {
  /** Accessible label for the group. */
  label: string;
  /** Choices rendered in input order. */
  options: RadioOption[];
  /** Currently selected option value. */
  value: string;
  /**
   * Called with the pressed option's value.
   * @param value Value belonging to the selected option.
   */
  onValueChange: (value: string) => void;
  /** Palette used for selected and unselected controls. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the group container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders React Native radio controls with checked and disabled accessibility states.
 *
 * @example
 * <RadioGroup label="Plan" options={[{ value: 'basic', label: 'Basic' }]} value={plan} onValueChange={setPlan} />
 */
export function RadioGroup({ label, options, value, onValueChange, theme = 'light', style }: RadioGroupProps) {
  const colors = themes[theme];
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={style}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityLabel={option.description ? `${option.label}. ${option.description}` : option.label}
            accessibilityState={{ checked: selected, disabled: option.disabled }}
            disabled={option.disabled}
            onPress={() => onValueChange(option.value)}
            style={{ minHeight: 44, flexDirection: 'row', alignItems: 'center', opacity: option.disabled ? 0.5 : 1 }}
          >
            <View style={{ width: 20, height: 20, borderWidth: 2, borderColor: selected ? colors.primary : colors.border, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              {selected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} />}
            </View>
            <View>
              <Text style={{ color: colors.text }}>{option.label}</Text>
              {option.description && <Text style={{ color: colors.textMuted, fontSize: 12 }}>{option.description}</Text>}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
