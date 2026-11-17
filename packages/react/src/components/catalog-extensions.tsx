import React, { useEffect, useRef, useState } from 'react';
import { mergeClasses } from '@qzl/core';
import { Dialog } from './dialog.js';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

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

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: boolean;
}

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

export type IndicatorStatus = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface IndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  status?: IndicatorStatus;
}

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

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  removeLabel?: string;
  variant?: 'neutral' | 'primary' | 'success' | 'warning' | 'danger';
}

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

export type TypographyVariant = 'display' | 'heading-1' | 'heading-2' | 'heading-3' | 'body' | 'body-small' | 'caption';
export type TypographyElement = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
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

export function Typography({ variant = 'body', as, className, ...props }: TypographyProps) {
  const Element = as ?? typographyElements[variant];
  return <Element className={mergeClasses('qzl-typography', `qzl-typography--${variant}`, className)} {...props} />;
}

export interface PipsProps {
  count: number;
  index: number;
  onIndexChange?: (index: number) => void;
  label?: string;
  className?: string;
}

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

export interface CarouselProps {
  slides: React.ReactNode[];
  index?: number;
  defaultIndex?: number;
  label?: string;
  onIndexChange?: (index: number) => void;
}

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
  className?: string;
}

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
  className?: string;
}

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

export interface StarRatingProps {
  value: number;
  onValueChange?: (value: number) => void;
  max?: number;
  label?: string;
  className?: string;
}

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

export interface ProgressStep {
  label: string;
}

export interface SteppedProgressBarProps {
  steps: ProgressStep[];
  activeStep: number;
  label?: string;
  className?: string;
}

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

export interface StepperProps {
  steps: ProgressStep[];
  activeStep: number;
  onStepChange: (index: number) => void;
  label?: string;
  className?: string;
}

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

export interface FileUploadInputProps {
  label: string;
  onFilesSelected: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  helperText?: string;
  className?: string;
}

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

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  label?: string;
  className?: string;
}

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

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function BottomSheet({ className, ...props }: SheetProps) {
  return <Dialog {...props} className={mergeClasses('qzl-sheet', 'qzl-sheet--bottom', className)} />;
}

export function SideSheet({ className, ...props }: SheetProps) {
  return <Dialog {...props} className={mergeClasses('qzl-sheet', 'qzl-sheet--side', className)} />;
}
