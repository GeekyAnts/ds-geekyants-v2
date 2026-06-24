import { cva, type VariantProps } from "class-variance-authority";

/**
 * Typography variants — ShadCN-style cva on geeklego's 2-tier tokens.
 *
 * Each variant is a NAMED BUNDLE of standard type-scale utilities
 * (text-*, font-*, leading-*, tracking-*) + a semantic colour. It hardcodes
 * NOTHING — every utility resolves to a Tier-1 primitive the Token Editor owns
 * (--text-4xl, --font-weight-bold, --tracking-tight, …). Retune the scale in the
 * cockpit and every <Typography variant="h1"> re-sizes live; this file only
 * decides *which* tokens compose a heading vs. body vs. caption.
 *
 * The default DOM element per variant is resolved in Typography.tsx (h1→h1,
 * body→p, …); `asChild` / the `as` prop can override it.
 */
export const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      lead: "text-xl text-muted-foreground",
      body: "text-base leading-normal",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "border-s-2 border-border ps-6 italic",
      code: "relative rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-semibold",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TypographyVariantProps = VariantProps<typeof typographyVariants>;
