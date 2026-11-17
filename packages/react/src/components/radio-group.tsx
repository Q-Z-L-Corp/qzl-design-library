import React from 'react';
import { mergeClasses } from '@qzl/core';

/** One radio choice shown by {@link RadioGroup}. */
export interface RadioOption {
  /** Value emitted when this option is selected. */
  value: string;
  /** Visible label for the option. */
  label: React.ReactNode;
  /** Optional secondary text rendered below the label. */
  description?: React.ReactNode;
  /** Prevents this option from being selected. */
  disabled?: boolean;
}

/** Props for the controlled {@link RadioGroup} component. */
export interface RadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  /** Text or content rendered in the fieldset legend. */
  label: React.ReactNode;
  /** Shared HTML radio `name` for this group. */
  name: string;
  /** Choices rendered in the group. */
  options: RadioOption[];
  /** Value of the currently selected choice. */
  value: string;
  /**
   * Called with the selected option's value when a radio changes.
   * @param value Value belonging to the selected option.
   */
  onValueChange: (value: string) => void;
}

/**
 * Renders a fieldset of radio choices controlled by `value`.
 *
 * @example
 * ```tsx
 * <RadioGroup label="Shipping" name="shipping" options={options} value={method} onValueChange={setMethod} />
 * ```
 */
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
