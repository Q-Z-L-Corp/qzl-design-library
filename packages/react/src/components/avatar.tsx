import React, { useEffect, useState } from 'react';
import { mergeClasses } from '@qzl/core';

export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || '?';
}

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
