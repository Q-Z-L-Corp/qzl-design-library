"use client";

import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for {@link Select}, in addition to HTML select attributes. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Apply the component's error styling; this does not set browser form-validation state.
   * @default false
   */
  error?: boolean;
}

/**
 * Renders an HTML select with the library's input styling.
 *
 * @example
 * ```tsx
 * <Select aria-label="Plan" value={plan} onChange={(event) => setPlan(event.target.value)}>
 *   <option value="basic">Basic</option>
 * </Select>
 * ```
 */
export function Select({ className, error = false, ...props }: SelectProps) {
  return (
    <select
      className={mergeClasses('qzl-input qzl-select', error && 'qzl-input--error', className)}
      {...props}
    />
  );
}
