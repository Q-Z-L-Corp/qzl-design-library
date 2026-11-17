import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import type { ModalProps, StyleProp, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzlcorp/tokens';

/** Props for a controlled React Native modal dialog. */
export interface DialogProps extends Omit<ModalProps, 'visible' | 'onRequestClose' | 'children'> {
  /** Controls whether the React Native modal is visible. */
  open: boolean;
  /**
   * Requests a visibility change, including platform close requests and the close button.
   * @param open Whether the dialog should be open.
   */
  onOpenChange: (open: boolean) => void;
  /** Heading displayed in the modal. */
  title: string;
  /** Optional supporting text displayed below the heading. */
  description?: string;
  /** Dialog body rendered inside the modal. */
  children: React.ReactNode;
  /** Palette used for modal surface and text. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the dialog content panel. */
  contentStyle?: StyleProp<ViewStyle>;
}

/**
 * Presents content in a React Native modal, defaulting to a transparent fade transition, and reports
 * close requests through `onOpenChange` (including platform close requests such as
 * Android hardware back).
 *
 * @example
 * <Dialog open={open} onOpenChange={setOpen} title="Delete item">
 *   <Text>This action cannot be undone.</Text>
 * </Dialog>
 */
export function Dialog({ open, onOpenChange, title, description, children, theme = 'light', contentStyle, ...props }: DialogProps) {
  const colors = themes[theme];
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
      {...props}
    >
      <View accessibilityViewIsModal style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.55)' }}>
        <View style={[{ width: '100%', maxWidth: 480, alignSelf: 'center', borderRadius: 18, backgroundColor: colors.surface, overflow: 'hidden' }, contentStyle]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 18, borderBottomWidth: 1, borderColor: colors.border }}>
            <View style={{ flex: 1, paddingRight: 12 }}>
              <Text accessibilityRole="header" style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
              {description && <Text style={{ color: colors.textMuted, marginTop: 4 }}>{description}</Text>}
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel="Close dialog" onPress={() => onOpenChange(false)} hitSlop={8}>
              <Text style={{ color: colors.textMuted, fontSize: 22 }}>×</Text>
            </Pressable>
          </View>
          <View style={{ padding: 18 }}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}
