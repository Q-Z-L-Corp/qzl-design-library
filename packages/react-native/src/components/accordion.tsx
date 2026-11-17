import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for the controlled or locally toggled accordion row. */
export interface AccordionProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Text shown in the pressable row. */
  title: string;
  /** Controls expansion when provided; otherwise the row maintains its own state. */
  open?: boolean;
  /** Initial expansion state used only when `open` is omitted. @default false */
  defaultOpen?: boolean;
  /**
   * Called after activation with the next expansion state.
   * @param open Whether the accordion should be expanded.
   */
  onOpenChange?: (open: boolean) => void;
  /** Palette used for row text and divider. @default 'light' */
  theme?: ThemeName;
  /** Content rendered below the title while expanded. */
  children: React.ReactNode;
  /** Style applied to the outer row container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders an accessible, pressable disclosure row with optional controlled state.
 *
 * @example
 * <Accordion title="Shipping" defaultOpen>Delivery takes 3–5 days.</Accordion>
 */
export function Accordion({ title, open, defaultOpen = false, onOpenChange, onPress, theme = 'light', children, style, ...props }: AccordionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const expanded = open ?? uncontrolledOpen;
  const colors = themes[theme];

  function toggle() {
    const nextOpen = !expanded;
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  return (
    <View style={[{ borderBottomWidth: 1, borderBottomColor: colors.border }, style]}>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        onPress={(event) => {
          toggle();
          onPress?.(event);
        }}
        style={{ minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 }}
        {...props}
      >
        <Text style={{ color: colors.text, fontSize: 15, fontWeight: '600' }}>{title}</Text>
        <Text accessibilityElementsHidden style={{ color: colors.textMuted, fontSize: 20 }}>{expanded ? '−' : '+'}</Text>
      </Pressable>
      {expanded && (
        <View accessibilityLiveRegion="polite" style={{ paddingBottom: 14 }}>
          {typeof children === 'string' || typeof children === 'number'
            ? <Text style={{ color: colors.textMuted }}>{children}</Text>
            : children}
        </View>
      )}
    </View>
  );
}
