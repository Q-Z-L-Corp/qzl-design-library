import React from 'react';
import { mergeClasses } from '@qzl/core';

/** Props for the controlled {@link Switch} component. */
export interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** Whether the switch is currently on. */
  checked: boolean;
  /**
   * Called after activation with the inverse of the current `checked` value.
   * @param checked The requested next switch state.
   */
  onCheckedChange: (checked: boolean) => void;
}

/**
 * Renders a controlled switch using a button with switch semantics.
 *
 * @example
 * ```tsx
 * <Switch checked={enabled} onCheckedChange={setEnabled} />
 * ```
 */
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
