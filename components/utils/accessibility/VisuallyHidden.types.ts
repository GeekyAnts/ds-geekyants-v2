import type { HTMLAttributes, ReactNode } from 'react';

export type VisuallyHiddenElement = 'span' | 'div' | 'p';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLElement> {
  as?: VisuallyHiddenElement;
  children: ReactNode;
}
