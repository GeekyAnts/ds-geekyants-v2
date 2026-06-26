import { forwardRef } from "react";
import { cn } from "../lib/cn";
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";

/**
 * Card — ShadCN pattern on geeklego's 2-tier token system.
 *
 * A static surface container: it carries the `--card` / `--card-foreground`
 * semantics, a border, radius and shadow. No focus/keyboard/portal surface, so
 * no Radix primitive is needed — it's styled markup (rung 3).
 *
 * Compound: <Card><CardHeader><CardTitle/><CardDescription/></CardHeader>
 * <CardContent/><CardFooter/></Card>, built from named sub-component exports
 * rather than a hand-rolled context. No variant axis — each part has fixed
 * classes; per-instance tweaks come through consumer `className` (cn() merge).
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

/**
 * CardHeader — top section of the card; stacks title + description with a
 * consistent gap and the card's standard inset padding.
 */
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

/**
 * CardTitle — the card heading. Renders an <h3> by default; override the level
 * with `asChild`-free consumer markup if a different outline level is needed.
 */
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "font-semibold leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

/**
 * CardDescription — supporting text under the title, at the muted-foreground
 * role so it sits below the title in emphasis.
 */
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

/**
 * CardContent — the main body region. Inset padding matches the header but
 * drops the top padding so it tucks under CardHeader cleanly.
 */
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

/**
 * CardFooter — bottom action/meta row. Lays actions out in a horizontal,
 * vertically-centered row; same inset, no top padding.
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";
