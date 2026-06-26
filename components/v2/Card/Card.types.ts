import type { HTMLAttributes } from "react";

/**
 * Card is a compound component with no variant axis — each sub-part is a thin
 * styled wrapper over a native element, so every part shares the same prop
 * shape: native <div>/heading attributes plus the standard `className` merge.
 * Per-instance differences come from consumer `className` (merged via cn()),
 * not a cva variant — hence no *-variants.ts file.
 */
export type CardProps = HTMLAttributes<HTMLDivElement>;
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
