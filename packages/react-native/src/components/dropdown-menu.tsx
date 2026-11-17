import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** One action in a dropdown menu. */
export interface DropdownMenuItem {
  /** Text shown in the menu item. */
  label: string;
  /**
   * Action invoked after this item is selected; the menu closes first.
   */
  onSelect: () => void;
  /** Prevents selecting this item. */
  disabled?: boolean;
}

/** Props for a locally opened dropdown list. */
export interface DropdownMenuProps {
  /** Text shown on the trigger and used as its React Native button accessibility label. */
  label: string;
  /** Menu items displayed when the trigger is pressed. */
  items: DropdownMenuItem[];
  /** Palette used for trigger and menu surfaces. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the wrapper. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Toggles a React Native list of actions; selecting an enabled item closes the list before calling it.
 *
 * @example
 * <DropdownMenu label="More" items={[{ label: 'Refresh', onSelect: refresh }]} />
 */
export function DropdownMenu({ label, items, theme = 'light', style }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const colors = themes[theme];

  return (
    <View style={style}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen(!open)}
        style={{ minHeight: 44, alignSelf: 'flex-start', justifyContent: 'center', paddingHorizontal: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.surface }}
      >
        <Text style={{ color: colors.text }}>{label} {open ? '▴' : '▾'}</Text>
      </Pressable>
      {open && (
        <View accessibilityRole="list" style={{ marginTop: 6, padding: 4, borderWidth: 1, borderColor: colors.border, borderRadius: 10, backgroundColor: colors.surface }}>
          {items.map((item, index) => (
            <Pressable
              key={`${index}-${item.label}`}
              accessibilityRole="button"
              accessibilityState={{ disabled: item.disabled }}
              disabled={item.disabled}
              onPress={() => {
                setOpen(false);
                item.onSelect();
              }}
              style={{ minHeight: 40, justifyContent: 'center', paddingHorizontal: 10, opacity: item.disabled ? 0.5 : 1 }}
            >
              <Text style={{ color: colors.text }}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
