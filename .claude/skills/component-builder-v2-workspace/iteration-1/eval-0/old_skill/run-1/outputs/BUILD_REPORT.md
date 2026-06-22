# Badge — v2 build report

## Files created
- `Badge.tsx` — implementation (forwardRef + cn + Slot for asChild)
- `Badge.types.ts` — `BadgeProps` (native `HTMLSpanElement` attrs + `BadgeVariantProps` + `asChild?`)
- `badge-variants.ts` — `cva` variants (default, secondary, destructive, outline)
- `Badge.stories.tsx` — Storybook stories
- `INSTALL_NOTES.txt` — install note (none required)

In the real repo these would live under `components/v2/Badge/`.

## Radix usage
No Radix **behavioral** primitive. The radix-primitive-map reference explicitly lists Badge as
"pure presentation with no a11y/keyboard/portal surface — build by hand with cva + cn + forwardRef."
A badge traps no focus, opens no layer, has no arrow-key nav and no aria-state — so there is nothing
for Radix to own. The only Radix piece used is `Slot` (via `asChild`), which is the standard
polymorphism mechanism mirrored from Button, not a behavioral primitive. `@radix-ui/react-slot` is
already installed.

## Semantic tokens used (all standard, already in semantics.css)
- default  → `bg-primary` / `text-primary-foreground`
- secondary → `bg-secondary` / `text-secondary-foreground`
- destructive → `bg-destructive` / `text-destructive-foreground`
- outline → `border-input` + `bg-transparent` + `text-foreground`
- base/focus → `border`, `ring-ring`, `ring-offset-background`

No new core semantics invented, and **no `--ext-*` tokens** added — every requested variant maps
cleanly onto the existing standard ShadCN vocabulary, so `design-system/v2/` was untouched (correct
per Phase 1: touch tokens only for a genuinely new core semantic or a brand-custom variant).

## Decisions
- **Element = `<span>`** (inline, embeds in card text/headings) rather than a block element.
- **Pill shape** via `rounded-full` + `px-2.5 py-0.5`; "small" via `text-xs` / tight padding.
  No `size` variant added — the request asked only for a single small pill, so a size axis would be
  speculative gold-plating. Easy to add later if needed.
- **Mirrored Button exactly** for shape: `"use client"`, plain `forwardRef` (not `memo(forwardRef)`),
  `cn(badgeVariants({ variant }), className)` last-wins merge, `displayName`, `Slot` for `asChild`,
  and `export { badgeVariants }`.
- **outline variant** uses `bg-transparent` + `border-input` and is the one variant that keeps a
  visible border; the filled variants set `border-transparent` so the base `border` doesn't double up.
- Stories cover Default, Variants, an in-context "status tags on a card" story (the stated use case),
  asChild, and DarkMode with both `data-theme="dark"` and `.dark` plus `max-w-2xl`.

## Verification note
Files were written to the sandbox outputs dir (not `components/v2/`), so the repo pipeline
(`tsc --noEmit`, scoped Storybook build, `npm run lint`, `npm run validate-tokens`) was not run here.
The code follows the Button reference shape and uses only pre-registered utilities, so the chain
(`--color-brand-900 → --primary → bg-primary`) resolves and no token validation is implicated.
