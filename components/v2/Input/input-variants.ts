import { cva, type VariantProps } from "class-variance-authority";

/**
 * Input variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Styled entirely with standard ShadCN/Tailwind semantic utilities
 * (border-input, bg-background, ring-ring, text-foreground …) — zero custom
 * vocabulary. The `error` variant reuses the standard --destructive semantics
 * rather than inventing brand tokens, so it themes for free.
 */
export const inputVariants = cva(
  // base — shared by every variant
  [
    "flex w-full min-w-0 rounded-md border bg-background text-foreground",
    "shadow-xs transition-colors duration-150 ease-out",
    "placeholder:text-muted-foreground",
    "selection:bg-primary selection:text-primary-foreground",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-ring",
        error:
          "border-destructive focus-visible:ring-destructive text-foreground",
      },
      inputSize: {
        sm: "h-8 px-2.5 py-1 text-xs file:py-1",
        md: "h-10 px-3 py-2 text-sm file:py-1.5",
        lg: "h-11 px-4 py-2.5 text-base file:py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  },
);

export type InputVariantProps = VariantProps<typeof inputVariants>;
