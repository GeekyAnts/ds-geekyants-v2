import { cva, type VariantProps } from "class-variance-authority";

/**
 * Badge variants (ShadCN pattern, geeklego semantics).
 *
 * A Badge is static, pill-shaped presentational markup — no a11y/keyboard/portal
 * surface — so it is hand-rolled with `cva` + `cn` (no Radix behavioral primitive;
 * see the skill's radix-primitive-map: Badge is explicitly "Radix does NOT apply").
 *
 * Every variant uses ONLY standard ShadCN/Tailwind semantic utilities
 * (bg-primary, bg-secondary, bg-destructive, border-input …) — zero custom
 * vocabulary, so no token work was required.
 */
export const badgeVariants = cva(
  // base — shared by every variant. `rounded-full` gives the pill shape.
  [
    "inline-flex items-center justify-center gap-1 w-fit shrink-0",
    "rounded-full border px-2.5 py-0.5",
    "text-xs font-semibold leading-none whitespace-nowrap select-none",
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
        outline: "border-input bg-transparent text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
