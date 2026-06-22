import { cva, type VariantProps } from "class-variance-authority";

/**
 * Badge variants (ShadCN pattern, geeklego semantics).
 *
 * A Badge is pure presentation — a small pill-shaped status label. No Radix
 * behavioral primitive is needed; it's styled markup only (cva + cn).
 *
 * All variants use ONLY standard ShadCN/Tailwind semantic utilities
 * (bg-primary, bg-secondary, bg-destructive, border-input …) — zero custom
 * vocabulary, so no --ext-* tokens are required.
 */
export const badgeVariants = cva(
  // base — shared by every variant
  [
    "inline-flex items-center justify-center gap-1 shrink-0 whitespace-nowrap",
    "rounded-full border px-2.5 py-0.5",
    "text-xs font-medium leading-none select-none",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "border-input bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
