import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import type { StyleProp, TextProps, TextStyle, ViewStyle } from 'react-native';
import { themes, type ThemeName } from '@qzl/tokens';

/** Props for a horizontal or vertical divider. */
export interface DividerProps {
  /** Divider axis; horizontal dividers span the available width, vertical dividers are 24 points tall. @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';
  /** Uses the `none` accessibility role instead of exposing a separator. @default false */
  decorative?: boolean;
  /** Palette used for the separator color. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the divider view. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a themed line and exposes it with the separator accessibility role unless decorative.
 *
 * @example
 * <Divider orientation="horizontal" />
 */
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

/** Props for compact supporting or error text. */
export interface HelperTextProps {
  /** Text or nested content shown to the user. */
  children: React.ReactNode;
  /** Uses danger coloring and a polite alert announcement. @default false */
  error?: boolean;
  /** Palette used for normal helper text. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the React Native `Text` element. */
  style?: StyleProp<TextStyle>;
}

/**
 * Displays supporting text; error messages use a polite accessibility live region.
 *
 * @example
 * <HelperText error>Enter a valid email address.</HelperText>
 */
export function HelperText({ children, error = false, theme = 'light', style }: HelperTextProps) {
  const colors = themes[theme];
  return (
    <Text accessibilityRole={error ? 'alert' : 'text'} accessibilityLiveRegion={error ? 'polite' : 'none'} style={[{ color: error ? colors.danger : colors.textMuted, fontSize: 12, lineHeight: 18 }, style]}>
      {children}
    </Text>
  );
}

/** Semantic color states supported by {@link Indicator} and {@link Tag}. */
export type IndicatorStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

/** Props for a labeled status indicator. */
export interface IndicatorProps {
  /** Visible text and accessibility label. */
  label: string;
  /** Status color. @default 'neutral' */
  status?: IndicatorStatus;
  /** Palette used to resolve the status color. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the indicator row. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Pairs a status-colored marker with text; the marker itself is hidden from accessibility.
 *
 * @example
 * <Indicator label="Synced" status="success" />
 */
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

/** Props for a compact label that can optionally be removed. */
export interface TagProps {
  /** Tag content. */
  children: React.ReactNode;
  /** Optional action invoked by the remove button. */
  onRemove?: () => void;
  /** Accessible label for the remove button. @default 'Remove tag' */
  removeLabel?: string;
  /** Semantic color and surface treatment. @default 'neutral' */
  variant?: IndicatorStatus;
  /** Palette used for tag colors. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the outer tag container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays a compact status tag with an optional React Native remove button.
 *
 * @example
 * <Tag variant="info" onRemove={removeFilter}>Unreviewed</Tag>
 */
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

/** Text style presets supported by {@link Typography}. */
export type TypographyVariant = 'display' | 'heading-1' | 'heading-2' | 'heading-3' | 'body' | 'body-small' | 'caption';

/** Props for themed text with semantic heading roles for heading presets. */
export interface TypographyProps extends TextProps {
  /** Font-size and weight preset. @default 'body' */
  variant?: TypographyVariant;
  /** Palette used for text color. @default 'light' */
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

/**
 * Applies a named type scale; heading variants default to the header accessibility role.
 *
 * @example
 * <Typography variant="heading-2">Account</Typography>
 */
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

/** Props for a row of selectable or display-only pagination pips. */
export interface PipsProps {
  /** Number of pips; must be a positive integer. */
  count: number;
  /** Zero-based index of the selected pip; must be less than `count`. */
  index: number;
  /**
   * Enables the pips and reports the selected zero-based index when pressed.
   * When omitted, pips are disabled.
   * @param index Zero-based index of the pressed pip.
   */
  onIndexChange?: (index: number) => void;
  /** Accessible label prefix for the pip list and each pip. @default 'Choose item' */
  label?: string;
  /** Palette used for selected and unselected pips. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the pip list. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders React Native button pips, or disabled visual pips when no change callback is supplied.
 *
 * @example
 * <Pips count={4} index={selectedIndex} onIndexChange={setSelectedIndex} />
 */
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

/** Props for a controlled or locally managed slide selector. */
export interface CarouselProps {
  /** Non-empty slide contents in display order. */
  slides: React.ReactNode[];
  /** Controlled zero-based slide index; controls local state when supplied. */
  index?: number;
  /** Initial zero-based slide index when `index` is omitted. @default 0 */
  defaultIndex?: number;
  /** Accessible label for the carousel container. @default 'Carousel' */
  label?: string;
  /**
   * Called with the requested zero-based slide index after navigation.
   * @param index The new slide index.
   */
  onIndexChange?: (index: number) => void;
  /** Palette used for navigation controls and pips. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the outer carousel container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Shows one slide at a time with previous/next buttons and selectable React Native pips.
 *
 * @example
 * <Carousel slides={[<Text key="one">First</Text>, <Text key="two">Second</Text>]} />
 */
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

/** One option in a segmented button group. */
export interface SegmentedButtonOption {
  /** Value emitted when this option is pressed. */
  value: string;
  /** Visible option text and accessibility label. */
  label: string;
  /** Prevents selecting this option. */
  disabled?: boolean;
}

/** Props for a controlled segmented radio group. */
export interface SegmentedButtonsProps {
  /** Options rendered from left to right. */
  options: SegmentedButtonOption[];
  /** Currently selected option value. */
  value: string;
  /**
   * Called with the selected option's value.
   * @param value Value belonging to the pressed option.
   */
  onValueChange: (value: string) => void;
  /** Accessible label for the radio group. */
  label: string;
  /** Palette used for selected and unselected options. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the radio-group container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a compact React Native radio group styled as adjoining segmented buttons.
 *
 * @example
 * <SegmentedButtons label="View" options={[{ value: 'list', label: 'List' }]} value={view} onValueChange={setView} />
 */
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

/** One selectable card option. */
export interface SelectCardOption {
  /** Value emitted when this card is pressed. */
  value: string;
  /** Main visible heading for the option. */
  title: string;
  /** Optional supporting text, also included in the accessibility label. */
  description?: string;
  /** Prevents selecting this option. */
  disabled?: boolean;
}

/** Props for a controlled vertical group of selectable cards. */
export interface SelectCardProps {
  /** Options rendered in input order. */
  options: SelectCardOption[];
  /** Currently selected option value. */
  value: string;
  /**
   * Called with the pressed option's value.
   * @param value Value belonging to the selected card.
   */
  onValueChange: (value: string) => void;
  /** Accessible label for the radio group. */
  label: string;
  /** Palette used for selected and unselected cards. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the group container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Presents each choice as a React Native radio button with a bordered card layout.
 *
 * @example
 * <SelectCard label="Delivery" options={[{ value: 'standard', title: 'Standard' }]} value={method} onValueChange={setMethod} />
 */
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

/** Props for a selectable or display-only integer star rating. */
export interface StarRatingProps {
  /** Current integer rating from zero through `max`. */
  value: number;
  /**
   * Enables rating controls and reports the selected one-based score.
   * When omitted, stars are display-only.
   * @param value Selected rating from 1 through `max`.
   */
  onValueChange?: (value: number) => void;
  /** Number of stars; must be a positive integer. @default 5 */
  max?: number;
  /** Accessible label prefix. @default 'Rating' */
  label?: string;
  /** Palette used for filled and empty stars. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the rating row. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Displays an integer star rating; when interactive, each star is a React Native radio button.
 *
 * @example
 * <StarRating value={rating} onValueChange={setRating} />
 */
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

/** Label for a step in a stepped progress display. */
export interface ProgressStep {
  /** Text identifying this step. */
  label: string;
}

/** Props for a non-interactive stepped progress bar. */
export interface SteppedProgressBarProps {
  /** Steps shown in order; must contain at least one step. */
  steps: ProgressStep[];
  /** Zero-based current step index; must be within `steps`. */
  activeStep: number;
  /** Accessible label for the progress list. @default 'Progress' */
  label?: string;
  /** Palette used to distinguish completed/current and future steps. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the component's outer container. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Shows completed/current segments and step labels without navigation controls.
 * Its accessible label defaults to `Progress`.
 *
 * @example
 * <SteppedProgressBar steps={[{ label: 'Details' }, { label: 'Review' }]} activeStep={0} />
 */
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

/**
 * Props for the stepped progress display with back/continue actions.
 */
export interface StepperProps extends SteppedProgressBarProps {
  /** Accessible label; the progress list appends ` progress`. @default 'Setup steps' */
  label?: string;
  /**
   * Called with the adjacent zero-based step index after Back or Continue is pressed.
   * The component disables those actions at the first and last steps.
   * @param index Requested zero-based step index.
   */
  onStepChange: (index: number) => void;
}

/**
 * Combines a stepped progress display with React Native Back and Continue buttons.
 * Its default label is `Setup steps`, with ` progress` appended for the progress list.
 *
 * @example
 * <Stepper steps={steps} activeStep={step} onStepChange={setStep} />
 */
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

/** Props for a pressable file-selection affordance. */
export interface FileUploadInputProps {
  /** Visible button text and accessibility label. */
  label: string;
  /** Invoked on press; the application must perform any platform-specific file selection. */
  onPress: () => void;
  /** Selected file names displayed below the button. @default [] */
  selectedFiles?: string[];
  /** Optional supporting text shown below the button. */
  helperText?: string;
  /** Disables the pressable. @default false */
  disabled?: boolean;
  /** Palette used for button and file-name text. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the wrapper. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Renders a React Native button and selected-file labels; it does not open a file picker itself.
 *
 * @example
 * <FileUploadInput label="Choose documents" onPress={openDocumentPicker} selectedFiles={fileNames} />
 */
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

/** Props for an inline disclosure panel. */
export interface PopoverProps {
  /** Text shown on the pressable trigger and used as its accessibility label. */
  trigger: string;
  /** Content displayed while the disclosure is open. */
  children: React.ReactNode;
  /** Accessible label for the open summary panel. @default 'More information' */
  label?: string;
  /** Palette used for the trigger and panel. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the wrapper. */
  style?: StyleProp<ViewStyle>;
}

/**
 * Toggles an inline labeled summary panel from a React Native button; it is not a floating modal.
 *
 * @example
 * <Popover trigger="Details"><Text>Additional information.</Text></Popover>
 */
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

/** Shared controlled props for the modal bottom and side sheets. */
export interface SheetProps {
  /** Controls React Native modal visibility. */
  open: boolean;
  /**
   * Called when the React Native modal requests closure, the close button is pressed, or the backdrop is pressed.
   * @param open Whether the sheet should be open.
   */
  onOpenChange: (open: boolean) => void;
  /** Heading displayed in the panel. */
  title: string;
  /** Optional supporting text displayed below the heading. */
  description?: string;
  /** Sheet body content. */
  children: React.ReactNode;
  /** Palette used for the panel and text. @default 'light' */
  theme?: ThemeName;
  /** Style applied to the modal panel. */
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

/**
 * Presents a slide-animated React Native modal panel attached to the bottom edge.
 * The hardware/back close request and backdrop press call `onOpenChange(false)`.
 *
 * @example
 * <BottomSheet open={open} onOpenChange={setOpen} title="Filters"><Text>Filter options</Text></BottomSheet>
 */
export function BottomSheet(props: SheetProps) {
  return <Sheet {...props} position="bottom" />;
}

/**
 * Presents a slide-animated React Native modal panel attached to the right edge.
 * The hardware/back close request and backdrop press call `onOpenChange(false)`.
 *
 * @example
 * <SideSheet open={open} onOpenChange={setOpen} title="Details"><Text>Item details</Text></SideSheet>
 */
export function SideSheet(props: SheetProps) {
  return <Sheet {...props} position="side" />;
}
