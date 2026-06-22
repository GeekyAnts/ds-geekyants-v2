import { cva, type VariantProps } from "class-variance-authority";

/**
 * Card variants (ShadCN pattern, geeklego semantics).
 *
 * The card surface uses ONLY standard ShadCN/Tailwind semantic utilities
 * (bg-card, text-card-foreground, border-border) — zero custom vocabulary.
 *
 * `elevation` toggles between a flat bordered card and a raised shadowed card;
 * both are achieved with standard utilities, so no --ext-* tokens are needed.
 */
export const cardVariants = cva(
  // base — shared by every card
  [
    "flex flex-col rounded-lg border border-border bg-card text-card-foreground",
  ].join(" "),
  {
    variants: {
      elevation: {
        flat: "shadow-none",
        raised: "shadow-md",
      },
    },
    defaultVariants: {
      elevation: "flat",
    },
  },
);

export type CardVariantProps = VariantProps<typeof cardVariants>;
