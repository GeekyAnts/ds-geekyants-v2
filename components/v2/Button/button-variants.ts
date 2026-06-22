import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * Core variants use ONLY standard ShadCN/Tailwind semantic utilities
 * (bg-primary, text-primary-foreground, border-input, ring-ring …) — zero
 * custom vocabulary, paste-and-go.
 *
 * `gamified` is the custom-variant canary: it consumes the namespaced
 * --ext-button-gamified-* tokens and nothing from the core semantic set,
 * keeping brand variants structurally contained.
 */
export const buttonVariants = cva(
  // base — shared by every variant
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
    "rounded-md text-sm font-medium select-none",
    "transition-colors duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
        outline:
          "border border-input bg-background text-foreground hover:bg-muted hover:text-foreground",
        ghost:
          "bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        link: "bg-transparent text-primary underline-offset-4 hover:underline h-auto px-0",

        // ── Custom variant (namespaced --ext-* tokens only) ──────────────────
        gamified: [
          "bg-ext-button-gamified-bg text-ext-button-gamified-foreground font-semibold uppercase tracking-wide",
          "shadow-[var(--ext-button-gamified-shadow)]",
          "hover:bg-ext-button-gamified-bg-hover hover:-translate-y-0.5",
          "active:bg-ext-button-gamified-bg-active active:translate-y-0 active:shadow-none",
          "focus-visible:ring-ext-button-gamified-ring",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-base",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
