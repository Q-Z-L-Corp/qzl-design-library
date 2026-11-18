"use client";

import React, { useId } from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Accessibility attributes supplied by {@link FormField} to its control. */
export interface FormFieldControlProps {
  /** Stable ID associated with the field label. */
  id?: string;
  /** Whether the control is required. */
  required?: boolean;
  /** IDs of the field hint and/or validation message. */
  'aria-describedby'?: string;
  /** Indicates an invalid value when an error message is present. */
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
}

/** Props for {@link FormField}. */
export interface FormFieldProps {
  /** Visible label associated with the control. */
  label: React.ReactNode;
  /** Control to associate with this field. The field supplies its ID and accessibility attributes. */
  control: React.ReactElement<FormFieldControlProps>;
  /** Optional supporting text associated with the control. */
  hint?: React.ReactNode;
  /** Optional validation message associated with and announced by the control. */
  error?: React.ReactNode;
  /**
   * Mark the control as required.
   * @default false
   */
  required?: boolean;
  /** Optional explicit control ID; otherwise a stable ID is generated. */
  controlId?: string;
  /** Additional class name for the field wrapper. */
  className?: string;
}

/**
 * Renders a labeled form field and gives its control linked accessibility attributes.
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email"
 *   required
 *   hint="Use your work address"
 *   error={emailError}
 *   control={<Input type="email" />}
 * />
 * ```
 */
export function FormField({
  label,
  control,
  hint,
  error,
  required = false,
  controlId,
  className
}: FormFieldProps) {
  const generatedId = useId();
  const id = controlId ?? `${generatedId}-control`;
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const hasHint = hint !== undefined && hint !== null && hint !== false;
  const hasError = error !== undefined && error !== null && error !== false;
  const describedBy = [
    hasHint ? hintId : undefined,
    hasError ? errorId : undefined
  ].filter(Boolean).join(' ');

  return (
    <div className={mergeClasses('qzl-form-field', className)}>
      <label className="qzl-form-field__label" htmlFor={id}>
        {label}
        {required && <span className="qzl-form-field__required" aria-hidden="true"> *</span>}
      </label>
      {React.cloneElement(control, {
        id,
        required,
        'aria-describedby': describedBy || undefined,
        'aria-invalid': hasError || undefined
      })}
      {hasHint && <div className="qzl-form-field__hint" id={hintId}>{hint}</div>}
      {hasError && <div className="qzl-form-field__error" id={errorId}>{error}</div>}
    </div>
  );
}
