import { cva, type VariantProps } from "class-variance-authority";

/**
 * Badge variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Small inline status/label pill. Core variants use ONLY standard ShadCN/Tailwind
 * semantic utilities (bg-primary, bg-secondary, bg-destructive, border-border …)
 * — zero custom vocabulary. `outline` is a low-emphasis, fill-less variant.
 */
export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 shrink-0 w-fit",
    "rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "[&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-border bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
