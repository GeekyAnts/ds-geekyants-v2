import { cva, type VariantProps } from "class-variance-authority";

/**
 * ProductCard variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * ProductCard is composed markup (rung 3) on the Card primitives, so its only
 * variant axis is layout: `orientation` switches between a stacked (vertical)
 * and side-by-side (horizontal) arrangement. All classes are standard semantic
 * / layout utilities — zero custom vocabulary.
 */
export const productCardVariants = cva(
  "group overflow-hidden",
  {
    variants: {
      orientation: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  },
);

/** The media wrapper sizing differs per orientation. */
export const productCardMediaVariants = cva("relative overflow-hidden bg-muted", {
  variants: {
    orientation: {
      vertical: "w-full",
      horizontal: "w-40 shrink-0 self-stretch",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export type ProductCardVariantProps = VariantProps<typeof productCardVariants>;
