# Phase 3 — Verification Checklist

Run after all components in the tree are generated. Fix any failure before presenting.

## Token integrity
- [ ] Every component token references a semantic, never a primitive
- [ ] No primitive token references in TSX files — run `npm run validate-tokens` (pass 5 catches `var(--spacing-*)`, `var(--color-brand-*)`, `var(--font-size-*)`, `var(--font-family-sans)`, `var(--font-weight-*)`, hardcoded hex values, etc.). See **Primitive Token Blocklist** in SKILL.md.
- [ ] No duplicate token blocks in geeklego.css — if regenerated, old block deleted in the same edit
- [ ] No duplicate property declarations anywhere in the file (semantic sections, `@theme` block, AND component blocks): `node scripts/dedup-component-tokens.cjs --check` exits 0
- [ ] **Variant state symmetry** — For every component with 2+ variants, all visual state groups (selected, unselected, hover, active, disabled, focus) use the same token granularity. No variant-specific tokens for one state while sharing tokens for another state within the same role. Run detection: `rg '--[a-z]+-[a-z]+-[a-z]+-.*--[a-z]+-[a-z]+-[a-z]+-' design-system/geeklego.css | rg -v 'generated|:root'` and audit the results.
- [ ] All tokens go into `geeklego.css` only. Verify `geeklego.default.css` stays in sync: after writing to `geeklego.css`, check that `geeklego.default.css` has the same component token block structure (unified selector, same values).
- [ ] No shared/cross-component tokens defined inside a component block. Every token with a generic property prefix (`--size-`, `--color-`, `--spacing-`, `--content-`, `--radius-`, `--border-`, `--shadow-`) lives at `:root` level — never inside a `/* ComponentName — generated */` block. If any such token exists in a component block, extract it to `:root` and verify all consumers still resolve via `npm run validate-tokens`
- [ ] **No cross-component token chaining** — Every `var()` reference in a component token's value resolves to a `:root`-level semantic token, never to another component's `--component-*` token. Verify by scanning: `rg '--[a-z]+-[a-z]+-.*var\(--[a-z]+-[a-z]+-' design-system/geeklego.css` and manually reviewing matches where the prefix before `var(--` differs from the prefix inside `var(--`
- [ ] No hardcoded values in TSX — `npm run validate-tokens` pass 6 catches hardcoded `px`/`rem`/hex in component files. Also check `--{component}-*` CSS values for raw `px`/`rem` (exception: `0`/`0px` for resets, `--spacing-raw-` primitives in `@theme`). Run the validator and fix any violations before proceeding.
- [ ] No hardcoded color values in component CSS tokens (`rgb()`, `hsl()`, `#hex`) — every color must reference a semantic token. Before writing a color value, search `geeklego.css` for existing shared semantics like `--color-overlay-backdrop`, `--color-state-selected`, `--color-text-error`. See `references/common-token-mistakes.md` ❌13 for examples.
- [ ] `npm run validate-tokens` exits code 0 — confirms no broken references, no naming violations, and all TSX `var(--)` refs have matching CSS definitions (caught by the TSX→CSS cross-file scan in pass 2)
- [ ] Token naming follows `--{component}-{property}-{state}` ordering — `--button-bg-hover`, not `--bg-button-hover`
- [ ] Every CSS class name used in `className` that isn't a standard Tailwind utility is defined in `geeklego.css` after the token block — this includes size modifier classes, pseudo-element selectors, and animation `@keyframes`. Manually verify; the validator does not catch missing CSS class rules.
- [ ] `npm run lint-css` exits code 0 — Stylelint confirms geeklego.css has no CSS violations
- [ ] `npx tsc --noEmit` exits code 0 — confirms no type errors introduced by the new component

## Registration integrity — REQUIRED for Docs Site + Token Editor
- [ ] Component name added to the correct array in `components/catalog.ts` (see what's already there for alphabetical position)
- [ ] Barrel exports added in `components/index.ts`:
  ```
  export * from './atoms/ComponentName/ComponentName';
  export type * from './atoms/ComponentName/ComponentName.types';
  ```
  (Replace `atoms/` with `molecules/` or `organisms/` as appropriate)
- [ ] Once `catalog.ts` is updated, the Token Editor and Docs Site automatically discover the component — no additional registration needed in `classify.ts`, `componentTokenParser.ts`, or `storybook.ts`

## Theme completeness
- [ ] Every semantic token referenced by component tokens has overrides in `[data-theme="dark"]` — check geeklego.css directly
- [ ] Main component token block uses `:root, [data-theme="dark"]` unified selector — not bare `:root`. No separate `[data-theme="dark"]` override block exists at the component level.
- [ ] Run the split-block detector: `rg '^\s*\[data-theme="dark"\]' design-system/geeklego.css -n` — review any matches in the GENERATED COMPONENT TOKENS section. Each should either be a legitimate exception (elevated shadow variant, documented with comment) or merged into the main unified block.
- [ ] Shadow tokens resolve to visible shadows in dark mode (not invisible against dark backgrounds)
- [ ] Dark mode action primary uses a lighter shade than light mode (brand-400 not brand-500/600)
- [ ] Dark mode text on any filled colored bg uses correct contrast pair:
      light bg (shade 50–400) → dark text (neutral-900/950);
      dark bg (shade 700–950) → light text (neutral-0/50)
- [ ] Dark mode selected state bg uses --color-state-selected (brand-950), NOT --color-action-primary
- [ ] Dark mode status subtle tokens use -900 tints, not -50 tints

## File integrity
- [ ] Exactly 5 files per component — no more, no fewer
- [ ] `'use client'` directive on the first line of `[ComponentName].tsx` (required for React Server Component compatibility with the docs site)
- [ ] No inline `style` prop used for CSS property values (color, background, width, height, border, shadow, transition, etc.)
- [ ] Every inline `style` usage falls into one of the four acceptable categories (CSS var injection, consumer passthrough, SVG presentation attribute, dynamic data-driven positioning) — see `references/design-standards.md`
- [ ] All acceptable inline `style` sites have: (a) a comment explaining why the value cannot be a class, (b) `as React.CSSProperties` type assertion on the style object
- [ ] CSS var injection style objects contain ONLY `--custom-prop` keys — never background, width, color, etc.
- [ ] No `--{component}` key in any inline style object duplicates a CSS variable already defined in the component's token block in `geeklego.css` — those values must be removed and left to cascade from CSS. Verify by cross-referencing every `'--{component}'` key in the inline style object against the component's token block.
- [ ] No arbitrary Tailwind values (`bg-[#xxx]`, `h-[40px]`) — only `bg-[var(--token)]` syntax (must include `var()`). Pass 6 of `npm run validate-tokens` enforces this automatically.
- [ ] No clsx, cva, cn(), or class-merging utilities imported
- [ ] All icon imports use lucide-react only

## Import integrity
- [ ] Atoms import nothing from `components/`
- [ ] Molecules import only atoms
- [ ] Organisms import molecules and/or atoms
- [ ] No same-level imports, no circular dependencies
- [ ] All imports are relative paths

## Storybook completeness
- [ ] All 8 required stories present (Default, Variants, Sizes, States, DarkMode, Playground, Mobile, Accessibility)
- [ ] DarkMode uses `data-theme` wrapper with `max-w-2xl`
- [ ] Playground has all props as controls
- [ ] Accessibility story tagged `['a11y']`

## Design quality
- [ ] Variants are visually distinct — different *types* of treatment, not just color shifts
- [ ] Hover changes at least two properties
- [ ] Disabled state: muted, no shadow, no hover/active, `cursor-not-allowed`
- [ ] Loading state preserves component dimensions (no layout shift)
- [ ] Focus ring present on every focusable element
- [ ] `transition-default` on every element that changes visual state

## Responsive layout protection
- [ ] Card-shell components use `.card-shell`, `.card-header-row`, `.card-header-title`, `.card-metric-row`
- [ ] Title text uses `.truncate-label`
- [ ] No raw `flex-1 min-w-0` — use `.content-flex`
- [ ] DarkMode story includes `max-w-2xl`
- [ ] Component has `--{component}-min-width` token (for card-shell components)

## Accessibility — WCAG 2.2 AA

Read `references/aria-patterns.md` for the full ARIA reference tables. Key checks:

**Semantic structure**
- [ ] Semantic HTML used throughout (see `.claude/references/semantic-html-guide.md`)
- [ ] No `<div>` where a semantic element exists
- [ ] No `onClick` on `<div>` or `<span>`
- [ ] No redundant `role` overriding native element semantics

**Accessible names**
- [ ] Every interactive element has an accessible name
- [ ] Icon-only buttons have `aria-label`
- [ ] Every `<nav>` landmark has `aria-label`
- [ ] Decorative icons have `aria-hidden="true"` on wrapper

**Interactive states**
- [ ] Toggle controls have `aria-expanded` — use `getDisclosureProps()`
- [ ] Controls with panels have `aria-controls` + matching `id` — use `useId()`
- [ ] Disabled: both `disabled` attribute AND `aria-disabled={true}`
- [ ] Loading: `aria-busy={true}` with visible spinner

**Focus and keyboard**
- [ ] Every focusable element has `focus-visible:outline-none focus-visible:focus-ring`
- [ ] Inputs use `focus-visible:focus-ring-inset`
- [ ] Arrow-navigated groups use `useRovingTabindex`
- [ ] Overlays use `useFocusTrap` and `useEscapeDismiss`
- [ ] No positive `tabIndex` values

**Touch targets**
- [ ] All interactive elements minimum 24x24px CSS

## Schema.org (when applicable)
- [ ] Component checked against mapping table in `references/schema-org.md`
- [ ] `schema?: boolean` prop added if applicable
- [ ] Microdata attributes only render when `schema={true}`

## Performance
- [ ] L1/L2: `memo(forwardRef(...))` wrapping — **mandatory** (memo outer, forwardRef inner)
- [ ] L3+: `memo(forwardRef(...))` — recommended for consistency; `memo()` minimum allowed
- [ ] `displayName` set immediately after component declaration
- [ ] `useMemo` for computed className strings
- [ ] Static class strings hoisted to module scope
- [ ] `useCallback` for internal event handlers
- [ ] No index-based keys in `.map()`
- [ ] `.perf-contain-content` on repeated list items
- [ ] `.perf-content-auto` for off-screen collapsible panels

## Cross-browser
- [ ] No `color-mix()`, vendor prefixes, `@supports`, or `@property` in component code
- [ ] All TSX values via `var(--token-name)` — no raw hex, px, or rem
- [ ] All component CSS token values alias semantics — no raw `rem`, `px`, or color values in `--{component}-*` tokens (exception: `0`/`0px` for resets)

## Security

**Read `.claude/skills/security/SKILL.md` for full implementation patterns.**

- [ ] Every component that renders `<a href={...}>` imports `sanitizeHref` from `'../../utils/security/sanitize'`
- [ ] Every `href` value is passed through `sanitizeHref()` — never rendered verbatim; wrapped in `useMemo`
- [ ] Components with `external` prop or `target` prop use `getSafeExternalLinkProps()` instead
- [ ] `target`/`rel` are destructured from `...rest` before anchor props are constructed (for polymorphic `<a>` components)
- [ ] No `dangerouslySetInnerHTML` anywhere (covered by CLAUDE.md rule — confirm)
- [ ] New component row added to `.claude/skills/security/references/component-security-audit.md`

## i18n — Internationalisation (mandatory for ALL components)

**Check `.claude/skills/i18n/references/string-inventory.md` before marking this section complete.**

For EVERY generated component, run through this checklist:

- [ ] Scan JSX for hardcoded system strings — any string a user reads or a screen reader announces that isn't consumer-supplied `children`/`label`/`title`/`placeholder` must be externalised
- [ ] `i18nStrings?` prop added to `.types.ts` with a typed per-component interface (e.g. `SpinnerI18nStrings`)
- [ ] `useComponentI18n('key', i18nStrings)` **actually called** as first line inside the component function — import via `import { useComponentI18n } from '../../utils/i18n/useGeeklegoI18n'` (NOT from the barrel export). Verify the hook is NOT dead code (both imported AND called).
- [ ] `GeeklegoI18nProvider.types.ts` updated: add interface + key to `GeeklegoI18nStrings` + entry in `DEFAULT_STRINGS`
- [ ] `index.ts` updated: export the new `*I18nStrings` type from the barrel
- [ ] `string-inventory.md` updated: add row to "Components with System Strings" table
- [ ] Existing content props (`label`, `placeholder`, `deltaLabel`) are never replaced — use augment pattern: `const resolved = propValue ?? i18n.default`
- [ ] Template label functions typed as `(arg: T) => string`, not inline concatenation
- [ ] **Barrel import check:** The component's `.types.ts` imports the i18n type from `../../utils/i18n` (the public barrel), NOT from the private path `GeeklegoI18nProvider.types`
- [ ] **No duplicate interface:** The component's `.types.ts` must NOT define the i18n interface inline — it should import and re-export it from the provider
- [ ] **Forwarding check:** If the component delegates to a child component (e.g. FormField → Label), ensure `i18nStrings` is forwarded so the per-instance override reaches the child

## RTL — Logical Properties
- [ ] No `pl-*` / `pr-*` for directional padding — use `ps-*` / `pe-*`
- [ ] No `ml-*` / `mr-*` for directional margin — use `ms-*` / `me-*`
- [ ] No `left-[var(--token)]` / `right-[var(--token)]` for icon/content inset — use `start-[var(--token)]` / `end-[var(--token)]`
- [ ] Symmetric padding (`px-*`), block axis (`py-*`, `pt-*`, `pb-*`, `mt-*`, `mb-*`), and overlay anchors (`left-0 top-full`) are exempt
- [ ] No `direction:` or `writing-mode:` set in component TSX — `dir` is read from `<html>`

## Reuse Audit

After the verification checklist passes, scan all existing components at the same level or above as the newly generated component.

For each existing component file, check whether it inlines markup, styling, or logic that the new component now owns — e.g. hand-rolled spinners, raw badge-like spans, custom dividers, inline avatar markup.

If violations are found:
1. Print a terminal summary in this format:
   ```
   ⚠ Reuse audit — N refactor candidates found:
     → [Filename]   [what is inlined] → replace with <[NewComponent]>
   ↳ Logged to REFACTOR.md
   ```

2. Append a new block to `REFACTOR.md` in the project root (create the file if it does not exist) in this format:
   ```
   ## [NewComponent] — [Month Year]
   - [ ] `[Filename]` — [what is inlined], replace with <[NewComponent]>
   ```

Each generation session appends a new dated block. Never overwrite existing entries.

If no violations are found, print:
```
✓ Reuse audit — no refactor candidates found
```
And do not touch REFACTOR.md.
