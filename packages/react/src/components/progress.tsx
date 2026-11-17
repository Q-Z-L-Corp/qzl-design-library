import React from 'react';
import { clamp, mergeClasses } from '@qzlcorp/core';

/** Props for a determinate or indeterminate {@link Progress} indicator. */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value; omit to render an indeterminate indicator. */
  value?: number;
  /**
   * Lower bound used to calculate the percentage.
   * @default 0
   */
  min?: number;
  /**
   * Upper bound used to calculate the percentage; must be greater than `min`.
   * @default 100
   */
  max?: number;
  /** Accessible name for the progress indicator. */
  label: string;
}

/**
 * Renders progress over the supplied range, clamping displayed values to its bounds.
 *
 * @example
 * ```tsx
 * <Progress label="Upload" value={uploaded} max={total} />
 * ```
 */
export function Progress({ value, min = 0, max = 100, label, className, ...props }: ProgressProps) {
  if (max <= min) throw new RangeError('Progress max must be greater than min.');
  const percentage = value === undefined ? undefined : clamp(((value - min) / (max - min)) * 100, 0, 100);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value === undefined ? undefined : clamp(value, min, max)}
      className={mergeClasses('qzl-progress', value === undefined && 'qzl-progress--indeterminate', className)}
      {...props}
    >
      <span className="qzl-progress__indicator" style={{ width: percentage === undefined ? undefined : `${percentage}%` }} />
    </div>
  );
}
