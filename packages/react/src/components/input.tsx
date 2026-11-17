import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const base = 'qzl-input';

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
