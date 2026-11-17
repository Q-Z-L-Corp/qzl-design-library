import React from 'react';
import { mergeClasses } from '@qzlcorp/core';

/** Props for {@link Spinner}, in addition to span attributes. */
export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Accessible status name.
   * @default 'Loading'
   */
  label?: string;
  /**
   * Preset spinner size.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Renders a loading indicator with a status role and accessible name.
 *
 * @example
 * ```tsx
 * <Spinner label="Saving changes" size="sm" />
 * ```
 */
export function Spinner({ className, label = 'Loading', size = 'md', ...props }: SpinnerProps) {
  return (
    <span
      className={mergeClasses('qzl-spinner', `qzl-spinner--${size}`, className)}
      role="status"
      aria-label={label}
      {...props}
    />
  );
}
