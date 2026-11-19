import { mergeClasses } from '@qzlcorp/core';
import type { ButtonSize, ButtonVariant } from './button.js';

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

/**
 * Computes the composite CSS class string for button and link button elements.
 *
 * @param className Optional additional class name to merge.
 * @param variant Visual treatment applied to the button.
 * @param size Preset size of the button.
 * @param fullWidth Whether the button stretches to fill the container width.
 * @returns Combined CSS class name string.
 *
 * @example
 * ```tsx
 * const className = getButtonClassName('custom-link', 'primary', 'md', false);
 * ```
 */
export function getButtonClassName(
  className: string | undefined,
  variant: ButtonVariant | undefined,
  size: ButtonSize | undefined,
  fullWidth: boolean
) {
  return mergeClasses(base, size && sizes[size], variant && variants[variant], fullWidth && 'qzl-button--full', className);
}
