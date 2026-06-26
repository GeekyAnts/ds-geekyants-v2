"use client";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { typographyVariants } from "./typography-variants";
import type { TypographyVariantProps } from "./typography-variants";
import type { TypographyProps } from "./Typography.types";

/**
 * Typography — the semantic text layer over geeklego's 2-tier tokens.
 *
 * Styled markup (rung 3): no Radix behaviour, no library. Each `variant` is a
 * named bundle of standard type-scale utilities (see typography-variants.ts);
 * this component just picks the right default DOM element for the variant and
 * renders it. Because every utility resolves to a Token-Editor-owned primitive,
 * retuning the scale in the cockpit re-themes all Typography live — this file
 * hardcodes no size, weight, or colour.
 *
 * `asChild` (Radix Slot) keeps the type style while swapping the element, e.g.
 * a heading-styled link. Otherwise the variant's semantic tag is used.
 */
const variantElement: Record<
  NonNullable<TypographyVariantProps["variant"]>,
  React.ElementType
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  large: "div",
  small: "small",
  muted: "p",
  blockquote: "blockquote",
  code: "code",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : variantElement[variant ?? "body"];
    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant }), className)}
        {...props}
      />
    );
  },
);
Typography.displayName = "Typography";

export { typographyVariants };
