import React, { useEffect, useRef, useState } from 'react';
import { mergeClasses } from '@qzl/core';
import { Dialog } from './dialog.js';

/** Props for {@link Divider}, in addition to horizontal-rule attributes. */
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /**
   * Visual orientation and, when non-decorative, separator orientation.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Use presentation semantics instead of exposing a separator.
   * @default false
   */
  decorative?: boolean;
}

/**
 * Renders a horizontal or vertical visual divider.
 *
 * @example
 * ```tsx
 * <Divider orientation="horizontal" />
 * ```
 */
export function Divider({ orientation = 'horizontal', decorative = false, className, ...props }: DividerProps) {
  return (
    <hr
      role={decorative ? 'presentation' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={mergeClasses('qzl-divider', `qzl-divider--${orientation}`, className)}
      {...props}
    />
  );
}

/** Props for {@link HelperText}, in addition to paragraph attributes. */
export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Style and expose this text as an error message.
   * @default false
   */
  error?: boolean;
}

/**
 * Renders supporting text, optionally marked and announced as an error.
 *
 * @example
 * ```tsx
 * <HelperText error={invalid}>Enter a valid email address.</HelperText>
 * ```
 */
export function HelperText({ error = false, className, ...props }: HelperTextProps) {
  return (
    <p
      className={mergeClasses('qzl-helper-text', error && 'qzl-helper-text--error', className)}
      role={error ? 'alert' : undefined}
      aria-live={error ? 'polite' : undefined}
      {...props}
    />
  );
}

/** Status categories supported by {@link Indicator}. */
export type IndicatorStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

/** Props for {@link Indicator}, in addition to span attributes. */
export interface IndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Status text displayed beside the indicator dot. */
  label: string;
  /**
   * Visual status treatment.
   * @default 'neutral'
   */
  status?: IndicatorStatus;
}

/**
 * Renders a status message with a decorative dot and status role.
 *
 * @example
 * ```tsx
 * <Indicator label="All systems operational" status="success" />
 * ```
 */
export function Indicator({ label, status = 'neutral', className, ...props }: IndicatorProps) {
  return (
    <span
      role="status"
      className={mergeClasses('qzl-indicator', `qzl-indicator--${status}`, className)}
      {...props}
    >
      <span className="qzl-indicator__dot" aria-hidden="true" />
      {label}
    </span>
  );
}

/** Props for {@link Tag}, in addition to span attributes. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** When supplied, adds a removal button that invokes this callback. */
  onRemove?: () => void;
  /**
   * Accessible name of the removal button.
   * @default 'Remove tag'
   */
  removeLabel?: string;
  /**
   * Visual treatment of the tag.
   * @default 'neutral'
   */
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
}

/**
 * Renders a compact label with an optional accessible remove button.
 *
 * @example
 * ```tsx
 * <Tag onRemove={removeTag}>Design</Tag>
 * ```
 */
export function Tag({ onRemove, removeLabel = 'Remove tag', variant = 'neutral', className, children, ...props }: TagProps) {
  return (
    <span className={mergeClasses('qzl-tag', `qzl-tag--${variant}`, className)} {...props}>
      {children}
      {onRemove && (
        <button type="button" className="qzl-tag__remove" aria-label={removeLabel} onClick={onRemove}>
          ×
        </button>
      )}
    </span>
  );
}

/** Preset visual variants supported by {@link Typography}. */
export type TypographyVariant = 'display' | 'heading-1' | 'heading-2' | 'heading-3' | 'body' | 'body-small' | 'caption';
/** Allowed semantic elements rendered by {@link Typography}. */
export type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

/** Props for {@link Typography}, in addition to HTML attributes. */
export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Visual text style preset; also selects a default heading or paragraph element unless `as` overrides it.
   * @default 'body'
   */
  variant?: TypographyVariant;
  /** Override the element selected by the variant's default element mapping. */
  as?: TypographyElement;
}

const typographyElements: Record<TypographyVariant, TypographyElement> = {
  display: 'h1',
  'heading-1': 'h1',
  'heading-2': 'h2',
  'heading-3': 'h3',
  body: 'p',
  'body-small': 'p',
  caption: 'span'
};

/**
 * Renders content using a typography style and a semantic element.
 *
 * @example
 * ```tsx
 * <Typography variant="heading-2">Account settings</Typography>
 * ```
 */
export function Typography({ variant = 'body', as, className, ...props }: TypographyProps) {
  const Element = as ?? typographyElements[variant];
  return <Element className={mergeClasses('qzl-typography', `qzl-typography--${variant}`, className)} {...props} />;
}

/** Props for the selectable indicator buttons in {@link Pips}. */
export interface PipsProps {
  /** Number of indicators to render; must be a positive integer. */
  count: number;
  /** Zero-based index marked as current; must be within `count`. */
  index: number;
  /**
   * Called with the zero-based selected index. If omitted, the indicators are disabled.
   * @param index Index of the selected indicator.
   */
  onIndexChange?: (index: number) => void;
  /**
   * Accessible group name and prefix for each indicator's accessible name.
   * @default 'Choose item'
   */
  label?: string;
  /** Optional class name applied to the indicator group. */
  className?: string;
}

/**
 * Renders one button per item and optionally reports selected indicator changes.
 *
 * @example
 * ```tsx
 * <Pips count={slides.length} index={active} onIndexChange={setActive} label="Choose slide" />
 * ```
 */
export function Pips({ count, index, onIndexChange, label = 'Choose item', className }: PipsProps) {
  if (!Number.isInteger(count) || count < 1) throw new RangeError('Pips count must be a positive integer.');
  if (!Number.isInteger(index) || index < 0 || index >= count) throw new RangeError('Pips index must be within count.');
  return (
    <div role="group" aria-label={label} className={mergeClasses('qzl-pips', className)}>
      {Array.from({ length: count }, (_, item) => (
        <button
          key={item}
          type="button"
          className={mergeClasses('qzl-pips__pip', item === index && 'qzl-pips__pip--active')}
          aria-label={`${label} ${item + 1}`}
          aria-current={item === index ? 'true' : undefined}
          onClick={() => onIndexChange?.(item)}
          disabled={!onIndexChange}
        />
      ))}
    </div>
  );
}

/** Props for the controlled or uncontrolled {@link Carousel}. */
export interface CarouselProps {
  /** Slide content in navigation order; must contain at least one entry. */
  slides: React.ReactNode[];
  /** Controlled current slide index, starting at zero. */
  index?: number;
  /**
   * Initial slide index when `index` is not provided.
   * @default 0
   */
  defaultIndex?: number;
  /**
   * Accessible name of the carousel region.
   * @default 'Carousel'
   */
  label?: string;
  /**
   * Called with the requested zero-based slide index.
   * @param index Index of the newly selected slide.
   */
  onIndexChange?: (index: number) => void;
}

/**
 * Renders one current slide with previous/next controls and selectable position indicators.
 *
 * @example
 * ```tsx
 * <Carousel slides={[<p key="1">One</p>, <p key="2">Two</p>]} />
 * ```
 */
export function Carousel({ slides, index, defaultIndex = 0, label = 'Carousel', onIndexChange }: CarouselProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultIndex);
  const currentIndex = index ?? uncontrolledIndex;

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
    <section className="qzl-carousel" aria-label={label} aria-roledescription="carousel">
      <div className="qzl-carousel__slide" role="group" aria-roledescription="slide" aria-label={`${currentIndex + 1} of ${slides.length}`}>
        {slides[currentIndex]}
      </div>
      <div className="qzl-carousel__controls">
        <button type="button" onClick={() => changeIndex(currentIndex - 1)} disabled={currentIndex <= 0} aria-label="Previous slide">Previous</button>
        <Pips count={slides.length} index={currentIndex} onIndexChange={changeIndex} label="Choose slide" />
        <button type="button" onClick={() => changeIndex(currentIndex + 1)} disabled={currentIndex >= slides.length - 1} aria-label="Next slide">Next</button>
      </div>
    </section>
  );
}

/** One option rendered by {@link SegmentedButtons}. */
export interface SegmentedButtonOption {
  /** Stable value returned when this option is selected. */
  value: string;
  /** Visible option text. */
  label: string;
  /** Prevents selecting this option. */
  disabled?: boolean;
}

/** Props for the controlled {@link SegmentedButtons} group. */
export interface SegmentedButtonsProps {
  /** Options displayed in the group. */
  options: SegmentedButtonOption[];
  /** Value of the currently pressed option. */
  value: string;
  /**
   * Called with the selected option's value.
   * @param value Value of the activated option.
   */
  onValueChange: (value: string) => void;
  /** Accessible name of the button group. */
  label: string;
  /** Optional class name applied to the group. */
  className?: string;
}

/**
 * Renders a controlled set of mutually labeled buttons with pressed state.
 *
 * @example
 * ```tsx
 * <SegmentedButtons label="View" options={views} value={view} onValueChange={setView} />
 * ```
 */
export function SegmentedButtons({ options, value, onValueChange, label, className }: SegmentedButtonsProps) {
  return (
    <div role="group" aria-label={label} className={mergeClasses('qzl-segmented-buttons', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          disabled={option.disabled}
          onClick={() => onValueChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

/** One selectable card option rendered by {@link SelectCard}. */
export interface SelectCardOption {
  /** Stable option value. */
  value: string;
  /** Main visible heading for the option. */
  title: string;
  /** Optional supporting text, also included in the option's accessible name. */
  description?: string;
  /** Prevents selecting this option. */
  disabled?: boolean;
}

/** Props for the controlled {@link SelectCard} radio group. */
export interface SelectCardProps {
  /** Cards displayed in the radio group. */
  options: SelectCardOption[];
  /** Value of the currently checked card. */
  value: string;
  /**
   * Called with the selected card's value.
   * @param value Value of the activated option.
   */
  onValueChange: (value: string) => void;
  /** Accessible name of the radio group. */
  label: string;
  /** Optional class name applied to the group. */
  className?: string;
}

/**
 * Renders selectable card buttons with radio-group semantics and controlled selection.
 *
 * @example
 * ```tsx
 * <SelectCard label="Plan" options={plans} value={plan} onValueChange={setPlan} />
 * ```
 */
export function SelectCard({ options, value, onValueChange, label, className }: SelectCardProps) {
  return (
    <div role="radiogroup" aria-label={label} className={mergeClasses('qzl-select-card', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-label={option.description ? `${option.title}. ${option.description}` : option.title}
          aria-checked={option.value === value}
          disabled={option.disabled}
          onClick={() => onValueChange(option.value)}
        >
          <strong>{option.title}</strong>
          {option.description && <span>{option.description}</span>}
        </button>
      ))}
    </div>
  );
}

/** Props for {@link StarRating}. */
export interface StarRatingProps {
  /** Current integer score from zero through `max`. */
  value: number;
  /**
   * When provided, renders interactive star buttons and reports the chosen score.
   * When omitted, renders the score as static stars.
   * @param value Selected score from 1 through `max`.
   */
  onValueChange?: (value: number) => void;
  /**
   * Number of stars in the scale; must be a positive integer.
   * @default 5
   */
  max?: number;
  /**
   * Accessible rating label.
   * @default 'Rating'
   */
  label?: string;
  /** Optional class name applied to the rating group. */
  className?: string;
}

/**
 * Renders a static or selectable integer star rating.
 *
 * @example
 * ```tsx
 * <StarRating value={rating} onValueChange={setRating} />
 * ```
 */
export function StarRating({ value, onValueChange, max = 5, label = 'Rating', className }: StarRatingProps) {
  if (!Number.isInteger(max) || max < 1) throw new RangeError('Star rating max must be a positive integer.');
  if (!Number.isInteger(value) || value < 0 || value > max) throw new RangeError('Star rating value must be within max.');
  return (
    <div role="group" aria-label={`${label}: ${value} of ${max}`} className={mergeClasses('qzl-star-rating', className)}>
      {Array.from({ length: max }, (_, index) => {
        const score = index + 1;
        const star = <span aria-hidden="true">{score <= value ? '★' : '☆'}</span>;
        return onValueChange ? (
          <button key={score} type="button" aria-label={`${score} of ${max} stars`} aria-pressed={score === value} onClick={() => onValueChange(score)}>
            {star}
          </button>
        ) : <span key={score}>{star}</span>;
      })}
    </div>
  );
}

/** A named step used by {@link SteppedProgressBar} and {@link Stepper}. */
export interface ProgressStep {
  /** Text identifying the step. */
  label: string;
}

/** Props for the non-interactive {@link SteppedProgressBar}. */
export interface SteppedProgressBarProps {
  /** Ordered steps; must not be empty. */
  steps: ProgressStep[];
  /** Zero-based current step index. */
  activeStep: number;
  /**
   * Accessible name of the ordered progress list.
   * @default 'Progress'
   */
  label?: string;
  /** Optional class name applied to the list. */
  className?: string;
}

/**
 * Renders an ordered list with completed, current, and upcoming step states.
 *
 * @example
 * ```tsx
 * <SteppedProgressBar steps={steps} activeStep={1} />
 * ```
 */
export function SteppedProgressBar({ steps, activeStep, label = 'Progress', className }: SteppedProgressBarProps) {
  if (steps.length === 0 || !Number.isInteger(activeStep) || activeStep < 0 || activeStep >= steps.length) {
    throw new RangeError('Stepped progress requires a valid active step.');
  }
  return (
    <ol aria-label={label} className={mergeClasses('qzl-stepped-progress', className)}>
      {steps.map((step, index) => (
        <li key={`${index}-${step.label}`} aria-current={index === activeStep ? 'step' : undefined} data-state={index < activeStep ? 'complete' : index === activeStep ? 'current' : 'upcoming'}>
          <span className="qzl-stepped-progress__mark" aria-hidden="true">{index < activeStep ? '✓' : index + 1}</span>
          <span>{step.label}</span>
        </li>
      ))}
    </ol>
  );
}

/** Props for the interactive {@link Stepper}. */
export interface StepperProps {
  /** Ordered steps; must not be empty. */
  steps: ProgressStep[];
  /** Zero-based current step index. */
  activeStep: number;
  /**
   * Called with the adjacent requested step when Back or Continue is activated.
   * @param index Requested zero-based step index.
   */
  onStepChange: (index: number) => void;
  /**
   * Accessible name of the stepper navigation.
   * @default 'Setup steps'
   */
  label?: string;
  /** Optional class name applied to the navigation. */
  className?: string;
}

/**
 * Renders a step progress list with Back and Continue controls.
 *
 * @example
 * ```tsx
 * <Stepper steps={steps} activeStep={step} onStepChange={setStep} />
 * ```
 */
export function Stepper({ steps, activeStep, onStepChange, label = 'Setup steps', className }: StepperProps) {
  if (steps.length === 0 || !Number.isInteger(activeStep) || activeStep < 0 || activeStep >= steps.length) {
    throw new RangeError('Stepper requires a valid active step.');
  }
  return (
    <nav aria-label={label} className={mergeClasses('qzl-stepper', className)}>
      <SteppedProgressBar steps={steps} activeStep={activeStep} label={`${label} progress`} />
      <div className="qzl-stepper__controls">
        <button type="button" onClick={() => onStepChange(activeStep - 1)} disabled={activeStep === 0}>Back</button>
        <button type="button" onClick={() => onStepChange(activeStep + 1)} disabled={activeStep === steps.length - 1}>Continue</button>
      </div>
    </nav>
  );
}

/** Props for {@link FileUploadInput}. */
export interface FileUploadInputProps {
  /** Accessible name for the file input and visible chooser button. */
  label: string;
  /**
   * Called after the HTML input reports a non-null `FileList`.
   * @param files Selected files as provided by the browser.
   */
  onFilesSelected: (files: FileList) => void;
  /** HTML file input accept filter, such as `image/*` or `.pdf`. */
  accept?: string;
  /**
   * Allow selecting more than one file.
   * @default false
   */
  multiple?: boolean;
  /**
   * Disable both the HTML input and its chooser button.
   * @default false
   */
  disabled?: boolean;
  /** Optional helper text rendered below the input and button. */
  helperText?: string;
  /** Optional class name applied to the root element. */
  className?: string;
}

/**
 * Renders an HTML file input with a button that opens the browser's file picker.
 *
 * @example
 * ```tsx
 * <FileUploadInput label="Choose images" accept="image/*" multiple onFilesSelected={uploadFiles} />
 * ```
 */
export function FileUploadInput({ label, onFilesSelected, accept, multiple = false, disabled = false, helperText, className }: FileUploadInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={mergeClasses('qzl-file-upload', className)}>
      <input
        ref={inputRef}
        className="qzl-file-upload__input"
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        aria-label={label}
        onChange={(event) => {
          if (event.currentTarget.files) onFilesSelected(event.currentTarget.files);
        }}
      />
      <button type="button" disabled={disabled} onClick={() => inputRef.current?.click()}>{label}</button>
      {helperText && <p>{helperText}</p>}
    </div>
  );
}

/** Props for the disclosure-style {@link Popover}. */
export interface PopoverProps {
  /** Content of the button that opens or closes the popover. */
  trigger: React.ReactNode;
  /** Content displayed while the popover is open. */
  children: React.ReactNode;
  /**
   * Accessible name of the displayed dialog.
   * @default 'More information'
   */
  label?: string;
  /** Optional class name applied to the root element. */
  className?: string;
}

/**
 * Renders a button-controlled popover that closes on outside pointer press or Escape.
 *
 * @example
 * ```tsx
 * <Popover trigger="Help" label="Help"><p>Find setup instructions here.</p></Popover>
 * ```
 */
export function Popover({ trigger, children, label = 'More information', className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const contentId = React.useId();

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open]);

  return (
    <div ref={rootRef} className={mergeClasses('qzl-popover', className)} onKeyDown={(event) => {
      if (event.key === 'Escape') setOpen(false);
    }}>
      <button type="button" aria-expanded={open} aria-controls={contentId} onClick={() => setOpen(!open)}>{trigger}</button>
      {open && <div id={contentId} role="dialog" aria-label={label} className="qzl-popover__content">{children}</div>}
    </div>
  );
}

/** Props shared by {@link BottomSheet} and {@link SideSheet}. */
export interface SheetProps {
  /** Whether the modal sheet should be open. */
  open: boolean;
  /**
   * Called when the underlying dialog requests a state change.
   * @param open Requested dialog state.
   */
  onOpenChange: (open: boolean) => void;
  /** Sheet heading, used as the dialog's accessible name. */
  title: string;
  /** Optional text associated as the dialog description. */
  description?: string;
  /** Content rendered inside the sheet. */
  children: React.ReactNode;
  /** Optional class name added to the sheet's built-in classes. */
  className?: string;
}

/**
 * Renders the shared modal dialog as a bottom-positioned sheet.
 *
 * @example
 * ```tsx
 * <BottomSheet open={open} onOpenChange={setOpen} title="Filters"><p>Filter options</p></BottomSheet>
 * ```
 */
export function BottomSheet({ className, ...props }: SheetProps) {
  return <Dialog {...props} className={mergeClasses('qzl-sheet', 'qzl-sheet--bottom', className)} />;
}

/**
 * Renders the shared modal dialog as a side-positioned sheet.
 *
 * @example
 * ```tsx
 * <SideSheet open={open} onOpenChange={setOpen} title="Details"><p>Item details</p></SideSheet>
 * ```
 */
export function SideSheet({ className, ...props }: SheetProps) {
  return <Dialog {...props} className={mergeClasses('qzl-sheet', 'qzl-sheet--side', className)} />;
}
