# Component Generation Flow — Detailed Reference

When asked to generate a component, follow this sequence every time.

---

## STEP 1 — Read design-system/geeklego.css

Understand what primitives, semantics, and existing component token blocks are present. Note the existing patterns.

## STEP 2 — Classify the component

- What level is it? (L1 atom, L2 molecule, etc.)
- What are its dependencies? Do they exist?
- If dependencies are missing — generate them first, recursively.

## STEP 3 — Define and write component tokens

Open `design-system/geeklego.css`. **First, search for an existing token block** for this component (`/* ComponentName — generated YYYY-MM-DD */`).

- **If the block exists**: Delete the entire old block, then insert the new tokens in its place. Never have two blocks for the same component.
- **If not found**: Append at the end of the `GENERATED COMPONENT TOKENS` section.

Within the block, define each `--component-property` exactly once. If you need to change a value, update the original declaration — never append a second declaration for the same property.

- Every token must alias a semantic — never a primitive, never hardcoded.
- Add a comment with the component name and generation date.
- **All components — including layout-only atoms — must have a token block.** Even a thin block with 1:1 semantic aliases is required for pattern consistency and Token Editor discoverability. There is no exception for "passthrough atoms."
- Include content flexibility tokens for each text slot:
  - Single-line slots: `--{component}-{slot}-overflow`, `-whitespace`, `-text-overflow` (alias `--content-overflow-label`, etc.)
  - Multi-line slots: `--{component}-{slot}-lines` (alias `--content-lines-description` or `-body`)
  - Container slots: `--{component}-{slot}-max-width`, `--{component}-{slot}-min-width`
- For card-shell components (L2/L3 with header + body): Add `--{component}-min-width: var(--content-min-width-md)`

### Step 3.5 — Validate tokens before writing code (⚠️ MANDATORY)

After writing the token block but before writing any TSX, run BOTH validations:

```bash
npm run validate-tokens                         # confirms all var() references resolve
node scripts/dedup-component-tokens.cjs --check # confirms no within-block duplicates
```

Both must exit 0 or STOP. A single duplicate declaration silently creates dead code and a maintenance trap — the first definition is never used but looks valid.

A missing token definition (like ProductCard's 29 undefined `--product-card-*` tokens) is silent at runtime — the component renders unstyled with no build error. This gate catches that failure before any TSX is written.

Run `npm run validate-tokens` again after writing the TSX to catch any new `var()` references introduced during authoring.

## STEP 4 — Write the 5 files

| File | Contents |
|---|---|
| `[ComponentName].tsx` | Component implementation using only Tailwind classes + component tokens |
| `[ComponentName].types.ts` | TypeScript props interface |
| `[ComponentName].stories.tsx` | All 8 required stories (see `.claude/references/storybook-stories.md`) |
| `README.md` | Props table, tokens, usage examples, Accessibility section |
| `mock-data.json` | Realistic test data |

## STEP 4.5 — Accessibility audit (mandatory — do not skip)

For every interactive element in the component:

- [ ] Has an accessible name (text content, aria-label, or aria-labelledby)
- [ ] Uses a semantic HTML element (button, a, input, nav, etc.)
- [ ] Has `focus-visible:outline-none focus-visible:focus-ring` on every focusable element
- [ ] Minimum 24x24px CSS (WCAG 2.5.8)
- [ ] Toggle controls: `aria-expanded` on the trigger
- [ ] Panel controls: `aria-controls` + matching `id` on the panel (use `useId()`)
- [ ] Disabled: both `disabled` attribute AND `aria-disabled={true}`
- [ ] Loading: `aria-busy={true}` on the loading container
- [ ] Error form fields: `aria-invalid="true"` + `aria-describedby` pointing to error message
- [ ] Decorative icons: `aria-hidden="true"` on the wrapper span
- [ ] Arrow-navigated groups use `useRovingTabindex` (not individual Tab stops)
- [ ] Overlay components use `useFocusTrap` (Modal, Dialog, responsive Sidebar)
- [ ] Dismissible overlays use `useEscapeDismiss`
- [ ] Floating panels use `useClickOutside`
- [ ] ARIA attribute objects use helpers from `components/utils/accessibility/aria-helpers.ts`
- [ ] README.md Accessibility section has all required fields including keyboard interaction table
- [ ] Accessibility story is written and tagged `['a11y']`

Fix any failure before proceeding. Do not leave accessibility issues as TODOs.

## STEP 4.6 — Performance audit (mandatory — do not skip)

For every component in this generation:

- [ ] Wrapped with `memo(forwardRef(...))` — memo is the outer wrapper
- [ ] `displayName` set after the memo-wrapped declaration
- [ ] Computed className strings use `useMemo` with correct dependency arrays
- [ ] Static className strings with no prop deps hoisted to module scope
- [ ] Internal event handlers (not pass-through props) wrapped with `useCallback`
- [ ] No index-based keys in `.map()` — use id, href, or unique data field
- [ ] List items use `.perf-contain-content` for CSS containment where applicable
- [ ] Off-screen collapsible panels use `.perf-content-auto`
- [ ] No permanent `will-change` — use `.perf-will-change-transform` (hover/focus only)

Fix any failure before proceeding.

## STEP 4.7 — SEO Audit (mandatory — do not skip)

Read `.claude/skills/component-builder/references/seo-guide.md` for full rules.

**Schema.org:**
- [ ] Check `references/schema-org.md` — does this component have a Schema.org mapping?
  - If yes: `schema?: boolean` declared in types file
  - If yes: conditional-spread Microdata implemented in TSX (`itemScope`, `itemType`, `itemProp`)
  - If yes: `<meta>` used for data with no visible DOM equivalent (position, ratingValue, etc.)
- [ ] Does this component wrap children that also have `schema` props? → cascade `schema={schema}` through every intermediary renderer
- [ ] L4+ templates with a page-level schema type → use `<StructuredData data={...} />` conditionally

**Semantic HTML:**
- [ ] Heading-bearing components accept `as?: 'h1'|'h2'|'h3'|'h4'|'h5'|'h6'` — never hardcode a level
- [ ] All `<a>` elements have descriptive visible text (not "click here" / "read more")
- [ ] All `<img>` elements have non-empty `alt` for user-facing images
- [ ] Lists use `<ul>` / `<ol>` — never a `<div>` stack of items
- [ ] Landmark elements used correctly; multiple same-type landmarks have `aria-label`

**README:**
- [ ] If `schema` is supported: README has a "Schema.org" subsection with type, itemProps table, and `schema={true}` usage example

Fix any failure before proceeding to step 5.

## STEP 4.8 — Security Audit (mandatory — do not skip)

Read `.claude/skills/security/SKILL.md` for full rules.

**For every component in this generation that renders `<a href={...}>`:**

- [ ] `sanitizeHref` imported from `'../../utils/security/sanitize'`
- [ ] Every `href` prop passed through `sanitizeHref()` before rendering on `<a>`, wrapped in `useMemo`
- [ ] If the component has an `external` prop or accepts a `target` prop: use `getSafeExternalLinkProps()` instead of `sanitizeHref` alone
- [ ] If `target`/`rel` arrive via `...rest` spread: destructure them explicitly before constructing safe anchor props
- [ ] `safeProps` (or `safeHref`) spread/used before `...rest` in JSX so the sanitized href wins
- [ ] No direct `href={someProp}` on `<a>` — always mediated by a security utility

**For every component that does NOT render `<a href={...}>`:**

- [ ] Confirm no anchor elements present — mark as N/A

**After generation:**
- [ ] Add a row to `.claude/skills/security/references/component-security-audit.md`

Fix any failure before proceeding to step 5. Do not leave security gaps as TODOs.

## STEP 4.9 — Inline Style Audit (mandatory — do not skip)

Scan the generated TSX for every `style` prop. Classify each occurrence:

- [ ] **CSS custom property injection:** Style sets only `--custom-prop` keys consumed by a `className` via `var(--custom-prop)`. Has comment explaining why the value is runtime-dynamic. No `--{component}` key duplicates a token in the component's token block.
- [ ] **Consumer passthrough:** Style comes from component props being forwarded. Comment confirms it's an intentional escape hatch.
- [ ] **SVG presentation attribute** — switch to camelCase React prop (`stopColor`, `fillOpacity`) instead of `style`.
- [ ] **Dynamic data-driven positioning** — `left`, `top`, `transform` from runtime geometry or data. Has comment explaining why it cannot be a class.
- [ ] **Unjustified** — Move to `className`.

Every surviving `style` prop must have `as React.CSSProperties` type assertion and an inline comment. If you find a `style` prop value that is `var(--something)`, move it to `className` instead.

## STEP 5 — Verify imports

- Imports between components use relative paths only.
- Example: `import { Button } from '../../atoms/Button/Button'`
- No package imports. No aliases. Just relative paths.
