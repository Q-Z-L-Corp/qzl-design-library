import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'neutral' | 'primary' | 'danger';
}

export function IconButton({ label, variant = 'neutral', className, type = 'button', ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={mergeClasses('qzl-icon-button', `qzl-icon-button--${variant}`, className)}
      {...props}
    />
  );
}
