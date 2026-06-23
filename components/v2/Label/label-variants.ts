import { cva, type VariantProps } from "class-variance-authority";

/**
 * Label variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Styled with standard semantic utilities only (text-foreground). The
 * peer-disabled rules let a Label dim itself when its associated control is
 * disabled, the standard ShadCN affordance — no custom vocabulary.
 */
export const labelVariants = cva(
  [
    "text-sm font-medium leading-none text-foreground",
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  ].join(" "),
);

export type LabelVariantProps = VariantProps<typeof labelVariants>;
