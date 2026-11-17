import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import type { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Divider({ orientation = 'horizontal', decorative = false, theme = 'light', style }: DividerProps) {
  const colors = themes[theme];
  return (
    <View
      accessibilityRole={decorative ? 'none' : 'separator'}
      accessibilityLabel={decorative ? undefined : 'Divider'}
      style={[
        { backgroundColor: colors.border },
        orientation === 'horizontal' ? { width: '100%', height: 1 } : { width: 1, height: 24 },
        style
      ]}
    />
  );
}

export interface HelperTextProps {
  children: React.ReactNode;
  error?: boolean;
  theme?: ThemeName;
  style?: StyleProp<TextStyle>;
}

export function HelperText({ children, error = false, theme = 'light', style }: HelperTextProps) {
  const colors = themes[theme];
  return (
    <Text accessibilityRole={error ? 'alert' : 'text'} accessibilityLiveRegion={error ? 'polite' : 'none'} style={[{ color: error ? colors.danger : colors.textMuted, fontSize: 12, lineHeight: 18 }, style]}>
      {children}
    </Text>
  );
}

export type IndicatorStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface IndicatorProps {
  label: string;
  status?: IndicatorStatus;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Indicator({ label, status = 'neutral', theme = 'light', style }: IndicatorProps) {
  const colors = themes[theme];
  const color = {
    neutral: colors.textMuted,
    info: colors.primary,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger
  }[status];
  return (
    <View accessible accessibilityRole="text" accessibilityLabel={label} style={[{ flexDirection: 'row', alignItems: 'center', gap: 7 }, style]}>
      <View accessibilityElementsHidden style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
      <Text style={{ color: colors.text }}>{label}</Text>
    </View>
  );
}

export interface TagProps {
  children: React.ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
  variant?: IndicatorStatus;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Tag({ children, onRemove, removeLabel = 'Remove tag', variant = 'neutral', theme = 'light', style }: TagProps) {
  const colors = themes[theme];
  const color = {
    neutral: colors.textMuted,
    info: colors.primary,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger
  }[variant];
  const background = {
    neutral: colors.surfaceMuted,
    info: colors.primarySubtle,
    success: colors.successSubtle,
    warning: colors.warningSubtle,
    danger: colors.dangerSubtle
  }[variant];
  return (
    <View style={[{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 5, paddingLeft: 10, paddingRight: onRemove ? 4 : 10, borderRadius: 999, backgroundColor: background }, style]}>
      <Text style={{ color, fontSize: 12, fontWeight: '600' }}>{children}</Text>
      {onRemove && (
        <Pressable accessibilityRole="button" accessibilityLabel={removeLabel} hitSlop={6} onPress={onRemove} style={{ minWidth: 28, minHeight: 28, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color, fontSize: 17 }}>×</Text>
        </Pressable>
      )}
    </View>
  );
}

export type TypographyVariant = 'display' | 'heading-1' | 'heading-2' | 'heading-3' | 'body' | 'body-small' | 'caption';

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  theme?: ThemeName;
}

const typographyStyles: Record<TypographyVariant, TextStyle> = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '700', letterSpacing: -0.5 },
  'heading-1': { fontSize: 26, lineHeight: 32, fontWeight: '700' },
  'heading-2': { fontSize: 21, lineHeight: 27, fontWeight: '700' },
  'heading-3': { fontSize: 17, lineHeight: 23, fontWeight: '600' },
  body: { fontSize: 14, lineHeight: 21 },
  'body-small': { fontSize: 12, lineHeight: 18 },
  caption: { fontSize: 11, lineHeight: 16 }
};

export function Typography({ variant = 'body', theme = 'light', accessibilityRole, style, ...props }: TypographyProps) {
  const colors = themes[theme];
  const isHeading = variant.startsWith('heading') || variant === 'display';
  return (
    <Text
      accessibilityRole={accessibilityRole ?? (isHeading ? 'header' : undefined)}
      style={[{ color: colors.text }, typographyStyles[variant], style]}
      {...props}
    />
  );
}

export interface PipsProps {
  count: number;
  index: number;
  onIndexChange?: (index: number) => void;
  label?: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Pips({ count, index, onIndexChange, label = 'Choose item', theme = 'light', style }: PipsProps) {
  if (!Number.isInteger(count) || count < 1) throw new RangeError('Pips count must be a positive integer.');
  if (!Number.isInteger(index) || index < 0 || index >= count) throw new RangeError('Pips index must be within count.');
  const colors = themes[theme];
  return (
    <View accessibilityRole="list" accessibilityLabel={label} style={[{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }, style]}>
      {Array.from({ length: count }, (_, item) => (
        <Pressable
          key={item}
          accessibilityRole="button"
          accessibilityLabel={`${label} ${item + 1}`}
          accessibilityState={{ selected: item === index, disabled: !onIndexChange }}
          disabled={!onIndexChange}
          onPress={() => onIndexChange?.(item)}
          hitSlop={6}
          style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={{ width: item === index ? 10 : 7, height: item === index ? 10 : 7, borderRadius: 6, backgroundColor: item === index ? colors.primary : colors.border }} />
        </Pressable>
      ))}
    </View>
  );
}

export interface CarouselProps {
  slides: React.ReactNode[];
  index?: number;
  defaultIndex?: number;
  label?: string;
  onIndexChange?: (index: number) => void;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Carousel({ slides, index, defaultIndex = 0, label = 'Carousel', onIndexChange, theme = 'light', style }: CarouselProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const currentIndex = index ?? uncontrolledIndex;
  const colors = themes[theme];
  if (slides.length === 0) throw new RangeError('Carousel requires at least one slide.');
  if (!Number.isInteger(currentIndex) || currentIndex < 0 || currentIndex >= slides.length) {
    throw new RangeError('Carousel index must be within the slides array.');
  }
  function changeIndex(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= slides.length) return;
    if (index === undefined) setUncontrolledIndex(nextIndex);
    onIndexChange?.(nextIndex);
  }
  return (
    <View accessibilityLabel={label} style={style}>
      <View accessibilityRole="listitem" accessibilityLabel={`Slide ${currentIndex + 1} of ${slides.length}`} style={{ minHeight: 72, justifyContent: 'center' }}>
        {slides[currentIndex]}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Previous slide" disabled={currentIndex <= 0} onPress={() => changeIndex(currentIndex - 1)} style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 10, opacity: currentIndex <= 0 ? 0.5 : 1 }}>
          <Text style={{ color: colors.primary }}>Previous</Text>
        </Pressable>
        <Pips count={slides.length} index={currentIndex} onIndexChange={changeIndex} label="Choose slide" theme={theme} />
        <Pressable accessibilityRole="button" accessibilityLabel="Next slide" disabled={currentIndex >= slides.length - 1} onPress={() => changeIndex(currentIndex + 1)} style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 10, opacity: currentIndex >= slides.length - 1 ? 0.5 : 1 }}>
          <Text style={{ color: colors.primary }}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

export interface SegmentedButtonOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedButtonsProps {
  options: SegmentedButtonOption[];
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function SegmentedButtons({ options, value, onValueChange, label, theme = 'light', style }: SegmentedButtonsProps) {
  const colors = themes[theme];
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={[{ flexDirection: 'row', alignSelf: 'flex-start', gap: 3, padding: 4, borderRadius: 12, backgroundColor: colors.surfaceMuted }, style]}>
      {options.map((option) => (
        <Pressable key={option.value} accessibilityRole="radio" accessibilityLabel={option.label} accessibilityState={{ checked: value === option.value, disabled: option.disabled }} disabled={option.disabled} onPress={() => onValueChange(option.value)} style={{ minHeight: 40, justifyContent: 'center', paddingHorizontal: 12, borderRadius: 9, backgroundColor: value === option.value ? colors.surface : 'transparent', opacity: option.disabled ? 0.5 : 1 }}>
          <Text style={{ color: value === option.value ? colors.text : colors.textMuted }}>{option.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export interface SelectCardOption {
  value: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectCardProps {
  options: SelectCardOption[];
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function SelectCard({ options, value, onValueChange, label, theme = 'light', style }: SelectCardProps) {
  const colors = themes[theme];
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={label} style={[{ gap: 8 }, style]}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <Pressable key={option.value} accessibilityRole="radio" accessibilityLabel={option.description ? `${option.title}. ${option.description}` : option.title} accessibilityState={{ checked: selected, disabled: option.disabled }} disabled={option.disabled} onPress={() => onValueChange(option.value)} style={{ minHeight: 64, justifyContent: 'center', padding: 12, borderWidth: 1, borderColor: selected ? colors.primary : colors.border, borderRadius: 12, backgroundColor: selected ? colors.primarySubtle : colors.surface, opacity: option.disabled ? 0.5 : 1 }}>
            <Text style={{ color: colors.text, fontWeight: '600' }}>{option.title}</Text>
            {option.description && <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 3 }}>{option.description}</Text>}
          </Pressable>
        );
      })}
    </View>
  );
}

export interface StarRatingProps {
  value: number;
  onValueChange?: (value: number) => void;
  max?: number;
  label?: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function StarRating({ value, onValueChange, max = 5, label = 'Rating', theme = 'light', style }: StarRatingProps) {
  if (!Number.isInteger(max) || max < 1) throw new RangeError('Star rating max must be a positive integer.');
  if (!Number.isInteger(value) || value < 0 || value > max) throw new RangeError('Star rating value must be within max.');
  const colors = themes[theme];
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={`${label}: ${value} of ${max}`} style={[{ flexDirection: 'row', alignItems: 'center' }, style]}>
      {Array.from({ length: max }, (_, index) => {
        const score = index + 1;
        const star = <Text style={{ color: score <= value ? colors.warning : colors.border, fontSize: 24 }}>★</Text>;
        return onValueChange ? (
          <Pressable key={score} accessibilityRole="radio" accessibilityLabel={`${score} of ${max} stars`} accessibilityState={{ checked: score === value }} onPress={() => onValueChange(score)} style={{ minWidth: 40, minHeight: 44, alignItems: 'center', justifyContent: 'center' }}>
            {star}
          </Pressable>
        ) : <View key={score}>{star}</View>;
      })}
    </View>
  );
}

export interface ProgressStep {
  label: string;
}

export interface SteppedProgressBarProps {
  steps: ProgressStep[];
  activeStep: number;
  label?: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function SteppedProgressBar({ steps, activeStep, label = 'Progress', theme = 'light', style }: SteppedProgressBarProps) {
  if (steps.length === 0 || !Number.isInteger(activeStep) || activeStep < 0 || activeStep >= steps.length) throw new RangeError('Stepped progress requires a valid active step.');
  const colors = themes[theme];
  return (
    <View accessibilityRole="list" accessibilityLabel={label} style={[{ gap: 10 }, style]}>
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {steps.map((step, index) => <View key={`${index}-${step.label}`} accessibilityElementsHidden style={{ flex: 1, height: 5, borderRadius: 4, backgroundColor: index <= activeStep ? colors.primary : colors.border }} />)}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
        {steps.map((step, index) => (
          <Text key={`${index}-${step.label}`} accessibilityState={{ selected: index === activeStep }} style={{ flex: 1, color: index === activeStep ? colors.primary : colors.textMuted, fontSize: 11 }}>
            {step.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

export interface StepperProps extends SteppedProgressBarProps {
  onStepChange: (index: number) => void;
}

export function Stepper({ steps, activeStep, onStepChange, label = 'Setup steps', theme = 'light', style }: StepperProps) {
  const colors = themes[theme];
  if (steps.length === 0 || !Number.isInteger(activeStep) || activeStep < 0 || activeStep >= steps.length) throw new RangeError('Stepper requires a valid active step.');
  return (
    <View style={style}>
      <SteppedProgressBar steps={steps} activeStep={activeStep} label={`${label} progress`} theme={theme} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
        <Pressable accessibilityRole="button" onPress={() => onStepChange(activeStep - 1)} disabled={activeStep === 0} style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 12, opacity: activeStep === 0 ? 0.5 : 1 }}>
          <Text style={{ color: colors.primary }}>Back</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => onStepChange(activeStep + 1)} disabled={activeStep === steps.length - 1} style={{ minHeight: 44, justifyContent: 'center', paddingHorizontal: 12, opacity: activeStep === steps.length - 1 ? 0.5 : 1 }}>
          <Text style={{ color: colors.primary }}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

export interface FileUploadInputProps {
  label: string;
  onPress: () => void;
  selectedFiles?: string[];
  helperText?: string;
  disabled?: boolean;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function FileUploadInput({ label, onPress, selectedFiles = [], helperText, disabled = false, theme = 'light', style }: FileUploadInputProps) {
  const colors = themes[theme];
  return (
    <View style={style}>
      <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={{ minHeight: 48, justifyContent: 'center', paddingHorizontal: 14, borderWidth: 1, borderStyle: 'dashed', borderColor: colors.border, borderRadius: 12, opacity: disabled ? 0.5 : 1 }}>
        <Text style={{ color: colors.primary, fontWeight: '600' }}>{label}</Text>
      </Pressable>
      {helperText && <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 5 }}>{helperText}</Text>}
      {selectedFiles.map((name, index) => <Text key={`${index}-${name}`} style={{ color: colors.text, fontSize: 12, marginTop: 4 }}>{name}</Text>)}
    </View>
  );
}

export interface PopoverProps {
  trigger: string;
  children: React.ReactNode;
  label?: string;
  theme?: ThemeName;
  style?: StyleProp<ViewStyle>;
}

export function Popover({ trigger, children, label = 'More information', theme = 'light', style }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const colors = themes[theme];
  return (
    <View style={style}>
      <Pressable accessibilityRole="button" accessibilityState={{ expanded: open }} accessibilityLabel={trigger} onPress={() => setOpen(!open)} style={{ minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' }}>
        <Text style={{ color: colors.primary }}>{trigger}</Text>
      </Pressable>
      {open && <View accessibilityRole="summary" accessibilityLabel={label} style={{ padding: 12, borderWidth: 1, borderColor: colors.border, borderRadius: 12, backgroundColor: colors.surface }}>{children}</View>}
    </View>
  );
}

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  theme?: ThemeName;
  contentStyle?: StyleProp<ViewStyle>;
}

function Sheet({ open, onOpenChange, title, description, children, theme = 'light', contentStyle, position }: SheetProps & { position: 'bottom' | 'side' }) {
  const colors = themes[theme];
  const alignment = position === 'bottom'
    ? { justifyContent: 'flex-end' as const }
    : { justifyContent: 'flex-end' as const, flexDirection: 'row' as const };
  const panel = position === 'bottom'
    ? { width: '100%' as const, maxHeight: '85%' as const, borderTopLeftRadius: 20, borderTopRightRadius: 20 }
    : { width: '88%' as const, maxWidth: 420, height: '100%' as const, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 };
  return (
    <Modal visible={open} transparent animationType="slide" onRequestClose={() => onOpenChange(false)}>
      <View accessibilityViewIsModal style={[{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }, alignment]}>
        <Pressable accessible={false} accessibilityElementsHidden importantForAccessibility="no" onPress={() => onOpenChange(false)} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} />
        <View style={[{ padding: 18, backgroundColor: colors.surface, overflow: 'hidden' }, panel, contentStyle]}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text accessibilityRole="header" style={{ color: colors.text, fontSize: 18, fontWeight: '700' }}>{title}</Text>
              {description && <Text style={{ color: colors.textMuted, marginTop: 4 }}>{description}</Text>}
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel={`Close ${title}`} onPress={() => onOpenChange(false)} hitSlop={8}>
              <Text style={{ color: colors.textMuted, fontSize: 22 }}>×</Text>
            </Pressable>
          </View>
          <ScrollView style={{ marginTop: 14 }}>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
}

export function BottomSheet(props: SheetProps) {
  return <Sheet {...props} position="bottom" />;
}

export function SideSheet(props: SheetProps) {
  return <Sheet {...props} position="side" />;
}
