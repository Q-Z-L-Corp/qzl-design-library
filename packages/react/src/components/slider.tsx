import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  onValueCommit?: (value: number) => void;
}

export function Slider({ label, value, onValueChange, onValueCommit, className, ...props }: SliderProps) {
  return (
    <label className={mergeClasses('qzl-slider', className)}>
      <span className="qzl-slider__label">{label}<output>{value}</output></span>
      <input
        {...props}
        type="range"
        value={value}
        aria-label={props['aria-label'] ?? label}
        onChange={(event) => onValueChange(event.currentTarget.valueAsNumber)}
        onMouseUp={(event) => onValueCommit?.(event.currentTarget.valueAsNumber)}
        onTouchEnd={(event) => onValueCommit?.(event.currentTarget.valueAsNumber)}
        onKeyUp={(event) => onValueCommit?.(event.currentTarget.valueAsNumber)}
      />
    </label>
  );
}
