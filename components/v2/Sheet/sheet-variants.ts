import { cva, type VariantProps } from "class-variance-authority";

/**
 * Sheet content variants — ShadCN pattern on geeklego's 2-tier semantics.
 *
 * The `side` axis pins the panel to one edge and sets the matching slide-in
 * transform (off Radix Dialog's data-[state]). Core utilities only
 * (bg-background, border-border). Top/bottom panels span the full width; left/
 * right span the full height at a capped width.
 */
export const sheetVariants = cva(
  [
    "fixed z-50 flex flex-col gap-4 bg-background p-6 shadow-lg",
    "transition-transform duration-300 ease-out",
  ].join(" "),
  {
    variants: {
      side: {
        top: [
          "inset-x-0 top-0 border-b border-border",
          "data-[state=closed]:-translate-y-full data-[state=open]:translate-y-0",
        ].join(" "),
        bottom: [
          "inset-x-0 bottom-0 border-t border-border",
          "data-[state=closed]:translate-y-full data-[state=open]:translate-y-0",
        ].join(" "),
        left: [
          "inset-y-0 left-0 h-full w-3/4 border-r border-border sm:max-w-sm",
          "data-[state=closed]:-translate-x-full data-[state=open]:translate-x-0",
        ].join(" "),
        right: [
          "inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm",
          "data-[state=closed]:translate-x-full data-[state=open]:translate-x-0",
        ].join(" "),
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
);

export type SheetVariantProps = VariantProps<typeof sheetVariants>;
