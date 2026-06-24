import { cva, type VariantProps } from "class-variance-authority";

/**
 * Toggle variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * A two-state pressable. The "on" look comes from Radix's data-[state=on]
 * (a quiet `accent` highlight — the role-appropriate semantic for a
 * selected/active control, not a loud `primary` fill). Core variants use ONLY
 * standard semantic utilities.
 *
 * Shared by Toggle and ToggleGroupItem (ShadCN reuses this cva for both).
 */
export const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
    "rounded-md text-sm font-medium select-none",
    "transition-colors duration-150 ease-out",
    "hover:bg-muted hover:text-muted-foreground",
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 min-w-8 px-2",
        md: "h-10 min-w-10 px-3",
        lg: "h-11 min-w-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type ToggleVariantProps = VariantProps<typeof toggleVariants>;
