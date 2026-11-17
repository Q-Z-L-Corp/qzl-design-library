import React from 'react';
import { mergeClasses } from '@qzl/core';

/** Props for {@link Checkbox}, in addition to HTML input attributes. */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Apply error styling without setting browser form-validation state. @default false */
  error?: boolean;
}

/**
 * Renders an HTML checkbox input with optional error styling. Its input type defaults
 * to `checkbox`.
 *
 * @example
 * ```tsx
 * <Checkbox checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />
 * ```
 */
export function Checkbox({ className, error = false, type = 'checkbox', ...props }: CheckboxProps) {
  return (
    <input
      type={type}
      className={mergeClasses('qzl-checkbox', error && 'qzl-checkbox--error', className)}
      {...props}
    />
  );
}
