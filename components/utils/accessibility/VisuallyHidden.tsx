"use client"
import { forwardRef, memo, useMemo } from 'react';
import type { ElementType } from 'react';
import type { VisuallyHiddenProps } from './VisuallyHidden.types';

const BASE_CLASSES = 'sr-only';

export const VisuallyHidden = memo(
  forwardRef<HTMLElement, VisuallyHiddenProps>(
    ({ as = 'span', children, className, ...rest }, ref) => {
      const Element = as as ElementType;

      const classes = useMemo(
        () => [BASE_CLASSES, className].filter(Boolean).join(' '),
        [className],
      );

      return (
        <Element ref={ref} className={classes} {...rest}>
          {children}
        </Element>
      );
    },
  ),
);

VisuallyHidden.displayName = 'VisuallyHidden';
