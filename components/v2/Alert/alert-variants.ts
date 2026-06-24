import { cva, type VariantProps } from "class-variance-authority";

/**
 * Alert variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Both variants use ONLY standard ShadCN/Tailwind semantic utilities — zero
 * custom vocabulary. `default` reads as a quiet bordered surface on the page
 * background; `destructive` recolors text, border, and icon via the standard
 * --destructive role.
 *
 * The grid layout reserves an optional leading-icon column: when an <svg> is
 * the first child it occupies the col-start-1 track, and the title/description
 * flow in column 2 — matching the canonical ShadCN Alert composition.
 */
export const alertVariants = cva(
  [
    "relative w-full rounded-lg border px-4 py-3 text-sm",
    // Any first-child <svg> is absolutely positioned in the top-left; when an
    // icon is present the whole alert is inset (pl-11) so the text clears it.
    // Uses only registered spacing utilities — no arbitrary track math.
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-3.5 [&>svg]:size-4 [&>svg]:text-current",
    "[&:has(>svg)]:pl-11",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive:
          "bg-background text-destructive border-destructive/50 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type AlertVariantProps = VariantProps<typeof alertVariants>;
