import React from 'react';
import { clamp, mergeClasses } from '@qzl/core';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  min?: number;
  max?: number;
  label: string;
}

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
