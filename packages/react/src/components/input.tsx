import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for {@link Input}, in addition to HTML input attributes. */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Apply the component's error styling; this does not set browser form-validation state.
   * @default false
   */
  error?: boolean;
}

const base = 'qzl-input';

/**
 * Renders an HTML input with the library's input styling.
 *
 * @example
 * ```tsx
 * <Input aria-label="Email" type="email" error={hasError} />
 * ```
 */
export function Input({ className, error = false, ...props }: InputProps) {
  return (
    <input
      className={mergeClasses(
        base,
        error ? 'qzl-input--error' : '',
        className
      )}
      {...props}
    />
  );
}
