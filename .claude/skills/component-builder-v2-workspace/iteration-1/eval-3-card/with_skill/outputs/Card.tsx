import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../lib/cn";
import { cardVariants } from "./card-variants";
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";

/**
 * Card — ShadCN/Radix-pattern compound component on geeklego's 2-tier tokens.
 *
 * Card is PURE PRESENTATION: no focus trap, no keyboard nav, no portal, no
 * aria-state. Per references/radix-primitive-map.md ("Badge, Chip, Tag, Card …
 * static; cva + cn only"), it needs NO Radix behavioral primitive. It uses the
 * ShadCN sub-component-export compound shape (Card + Header/Title/Description/
 * Content/Footer), each part styled with standard semantic utilities (bg-card,
 * text-card-foreground, border-border, text-muted-foreground).
 *
 * The footer is a plain layout slot intended to hold the existing
 * `components/v2/Button` (e.g. Save / Cancel) — Card does NOT bundle or rebuild
 * a button.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ elevation }), className)}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

/* Header — title + description block. Pure layout. */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

/* Title — defaults to an <h3>; override the tag with asChild via the consumer
   if a different heading level is needed for document outline correctness. */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-card-foreground",
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* Content — the main body. Top padding is dropped so it sits flush under the
   header (header already supplies the gap). */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

/* Footer — action row. Typically holds the existing Button (Save / Cancel),
   right-aligned with a gap. Consumers compose the buttons in. */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center justify-end gap-2 p-6 pt-0", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { cardVariants };
