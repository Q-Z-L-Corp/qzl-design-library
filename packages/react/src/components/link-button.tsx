import React from 'react';
import { getButtonClassName } from './button-styles.js';
import type { ButtonSize, ButtonVariant } from './button.js';

/** Props for {@link LinkButton}, in addition to HTML anchor attributes. */
export interface LinkButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** Destination for the link. */
  href: string;
  /**
   * Visual treatment of the link.
   * @default 'primary'
   */
  variant?: ButtonVariant;
  /**
   * Preset size of the link.
   * @default 'md'
   */
  size?: ButtonSize;
  /**
   * Stretch the link to fill the width of its container.
   * @default false
   */
  fullWidth?: boolean;
  /**
   * Override the rendered element. Pass a Next.js `Link`, React Router `Link`,
   * or any component that accepts `href`, `className`, and `children`.
   * @default 'a'
   * @example
   * import Link from 'next/link';
   * <LinkButton href="/dashboard" renderAs={Link}>Dashboard</LinkButton>
   */
  renderAs?: React.ElementType;
}

/**
 * Renders a semantic HTML link with the visual treatment of a button.
 *
 * @example
 * ```tsx
 * <LinkButton href="/projects" variant="secondary">View projects</LinkButton>
 * ```
 */
export function LinkButton({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  renderAs: Component = 'a',
  ...props
}: LinkButtonProps) {
  return (
    <Component className={getButtonClassName(className, variant, size, fullWidth)} {...props} />
  );
}
