import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export function Select({ className, error = false, ...props }: SelectProps) {
  return (
    <select
      className={mergeClasses('qzl-input qzl-select', error && 'qzl-input--error', className)}
      {...props}
    />
  );
}
