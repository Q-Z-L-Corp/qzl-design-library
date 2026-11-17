import React from 'react';
import { mergeClasses } from '@qzl/core';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  label: React.ReactNode;
  name: string;
  options: RadioOption[];
  value: string;
  onValueChange: (value: string) => void;
}

export function RadioGroup({ label, name, options, value, onValueChange, className, ...props }: RadioGroupProps) {
  return (
    <fieldset className={mergeClasses('qzl-radio-group', className)} {...props}>
      <legend>{label}</legend>
      {options.map((option) => (
        <label className="qzl-radio-group__option" key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onValueChange(option.value)}
          />
          <span>
            <span>{option.label}</span>
            {option.description && <small>{option.description}</small>}
          </span>
        </label>
      ))}
    </fieldset>
  );
}
