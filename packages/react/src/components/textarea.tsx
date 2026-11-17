import React from 'react';
import { mergeClasses } from '@qzl/core';

/** Props for {@link Textarea}, in addition to HTML textarea attributes. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Apply the component's error styling; this does not set browser form-validation state.
   * @default false
   */
  error?: boolean;
}

/**
 * Renders an HTML textarea with the library's input styling.
 *
 * @example
 * ```tsx
 * <Textarea aria-label="Notes" rows={4} />
 * ```
 */
export function Textarea({ className, error = false, ...props }: TextareaProps) {
  return (
    <textarea
      className={mergeClasses('qzl-input qzl-textarea', error && 'qzl-input--error', className)}
      {...props}
    />
  );
}
