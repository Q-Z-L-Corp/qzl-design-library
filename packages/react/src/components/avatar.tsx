import React, { useEffect, useState } from 'react';
import { mergeClasses } from '@qzl/core';

/** Props for {@link Avatar}, in addition to span attributes. */
export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Name announced for the avatar and used to derive fallback initials. */
  name: string;
  /** Image URL; when loading fails, initials are shown instead. */
  src?: string;
  /**
   * Preset avatar dimensions.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
}

/**
 * Displays a named image, falling back to up to two initials when no image is available.
 *
 * @example
 * ```tsx
 * <Avatar name="Ada Lovelace" src="/ada.png" />
 * ```
 */
export function Avatar({ name, src, size = 'md', className, ...props }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(!src);

  useEffect(() => {
    setImageFailed(!src);
  }, [src]);

  return (
    <span
      role="img"
      aria-label={name}
      className={mergeClasses('qzl-avatar', `qzl-avatar--${size}`, className)}
      {...props}
    >
      {src && !imageFailed ? (
        <img src={src} alt="" onError={() => setImageFailed(true)} />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </span>
  );
}
