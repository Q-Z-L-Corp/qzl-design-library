import React from 'react';
import { mergeClasses } from '@qzl/core';

/** Props for the controlled range input {@link Slider}. */
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
  /** Visible label and fallback accessible name for the range input. */
  label: string;
  /** Current numeric range value. */
  value: number;
  /**
   * Called on each HTML range input change.
   * @param value Current value converted to a number.
   */
  onValueChange: (value: number) => void;
  /**
   * Called when a pointer or keyboard interaction is released.
   * @param value Range value at the end of that interaction.
   */
  onValueCommit?: (value: number) => void;
}

/**
 * Renders a controlled range input with its label and current numeric value.
 *
 * @example
 * ```tsx
 * <Slider label="Volume" min={0} max={10} value={volume} onValueChange={setVolume} />
 * ```
 */
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
