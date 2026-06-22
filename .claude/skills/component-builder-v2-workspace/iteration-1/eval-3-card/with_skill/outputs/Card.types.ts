import type { HTMLAttributes } from "react";
import type { CardVariantProps } from "./card-variants";

/**
 * Card is pure presentation (no a11y/keyboard/portal surface), so each part
 * just extends the native element attributes. The root adds variant props +
 * `asChild` for polymorphic rendering (e.g. a whole card as a link/article).
 */

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    CardVariantProps {
  /**
   * Render as the child element instead of a <div>, merging props onto it
   * (Radix Slot). Use for a card rendered as an <a> or <article>.
   */
  asChild?: boolean;
}

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>;
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;
export type CardContentProps = HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = HTMLAttributes<HTMLDivElement>;
