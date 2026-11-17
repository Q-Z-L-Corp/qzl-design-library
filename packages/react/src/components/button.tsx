import React from 'react';
import { mergeClasses } from '@qzl/core';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const base = 'qzl-button';

const sizes: Record<ButtonSize, string> = {
  sm: 'qzl-button--sm',
  md: 'qzl-button--md',
  lg: 'qzl-button--lg'
};

const variants: Record<ButtonVariant, string> = {
  primary: 'qzl-button--primary',
  secondary: 'qzl-button--secondary',
  ghost: 'qzl-button--ghost',
  danger: 'qzl-button--danger'
};

export function Button({ className, variant = 'primary', size = 'md', fullWidth = false, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={mergeClasses(base, sizes[size], variants[variant], fullWidth && 'qzl-button--full', className)}
      {...props}
    />
  );
}
