import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange, className, disabled, onClick, ...props }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={mergeClasses('qzl-switch', checked && 'qzl-switch--checked', className)}
      disabled={disabled}
      onClick={(event) => {
        onCheckedChange(!checked);
        onClick?.(event);
      }}
      {...props}
    >
      <span className="qzl-switch__thumb" aria-hidden="true" />
    </button>
  );
}
