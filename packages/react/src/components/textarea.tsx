import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({ className, error = false, ...props }: TextareaProps) {
  return (
    <textarea
      className={mergeClasses('qzl-input qzl-textarea', error && 'qzl-input--error', className)}
      {...props}
    />
  );
}
