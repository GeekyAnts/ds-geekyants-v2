import { forwardRef } from "react";
import { cn } from "../lib/cn";
import { alertVariants } from "./alert-variants";
import type {
  AlertProps,
  AlertTitleProps,
  AlertDescriptionProps,
} from "./Alert.types";

/**
 * Alert — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * A static, non-interactive callout: a `role="alert"` region with an optional
 * leading icon (pass any <svg> as the first child) plus AlertTitle /
 * AlertDescription slots. Styled entirely with standard semantic utilities
 * (bg-background, text-foreground, text-destructive, border-border) — no
 * focus/keyboard surface, so no Radix primitive is needed.
 *
 * Compound: <Alert><AlertIcon/><AlertTitle/><AlertDescription/></Alert>, using
 * named sub-component exports rather than a hand-rolled context.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Alert.displayName = "Alert";

/**
 * AlertTitle — the heading line of an Alert. Renders a styled <div> (not a
 * heading element) so it never disrupts the page's heading outline; emphasis
 * comes from weight, not semantics.
 */
export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mb-1 font-medium leading-none tracking-tight",
        className,
      )}
      {...props}
    />
  ),
);
AlertTitle.displayName = "AlertTitle";

/**
 * AlertDescription — the supporting body text of an Alert, rendered at the
 * muted-foreground role so it sits below the title in emphasis.
 */
export const AlertDescription = forwardRef<
  HTMLDivElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground [&_p]:leading-relaxed",
      className,
    )}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { alertVariants };
