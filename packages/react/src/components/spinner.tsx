import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

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
