import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Checkbox({ className, error = false, type = 'checkbox', ...props }: CheckboxProps) {
  return (
    <input
      type={type}
      className={mergeClasses('qzl-checkbox', error && 'qzl-checkbox--error', className)}
      {...props}
    />
  );
}
