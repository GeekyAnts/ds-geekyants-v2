---
name: component-builder
description: >
  Generate production-grade, visually polished React components for the Geeklego
  design system, producing exactly 5 files per component (TSX, types, stories,
  README, mock-data) plus CSS design tokens — all fully wired into the token
  chain. Use this skill whenever the user asks to build, create, scaffold, add,
  wire up, or generate any UI component, atom, molecule, organism, or template
  — even if they don't say "component". Triggers on: "build a Button", "create
  a Card", "add a Sidebar", "generate a NavItem", "I need a search bar", "make
  a modal", "add a form field", "I want a data table", "build the header",
  "create a badge", "add a spinner", "scaffold a form input", "I need a loading
  state component", or any request involving UI elements, component library work,
  design system component generation, or implementing a design spec. Also
  triggers when the user pastes a Figma/design spec and asks to implement it,
  or when they ask to add a new component to the library even without specifying
  the exact file output format.
---

# Geeklego Component Builder

## Foundation — Read Before Every Session

Read these files at the start of every component generation session. Do not skip.

| File | What's in it |
|---|---|
| `CLAUDE.md` (project root) | Full project context, architecture rules, naming conventions, token chain rule, 5-file structure, "Never Do" / "Always Do" lists |
| `design-system/geeklego.css` | Live source of truth — all primitives, semantics, existing component tokens |
| `.claude/references/semantic-html-guide.md` | Element decision table, form/table/heading/landmark patterns |
| `components/utils/accessibility/aria-helpers.ts` | ARIA helper types and functions for disclosure, navigation, live regions, loading/disabled states |

All paths are relative to the repo root.

Scan `geeklego.css` to know what tokens already exist. Every component you generate must integrate with what's already there — never duplicate, never conflict.

**⚡ Use code-review-graph tools first.** Before reaching for Grep or Read to explore the codebase, check whether `semantic_search_nodes`, `get_impact_radius`, or `query_graph` can answer the question faster. Fall back to file reads only when the graph doesn't cover what you need.

### Reference files (read on demand, not upfront)

| File | When to read |
|---|---|
| `references/aria-patterns.md` | When determining ARIA roles, keyboard patterns, or which helper/hook to use |
| `references/schema-org.md` | When the component maps to a Schema.org type (check the mapping table and status column) |
| `references/seo-guide.md` | When implementing SEO — Schema.org patterns, cascade rules, semantic HTML rules, and the step 4.7 checklist |
| `references/token-quick-reference.md` | When you need to look up available token names while writing component tokens |
| `references/design-standards.md` | Design quality rules: shadow elevation, spacing rhythm, variant distinctness, transitions, states, dark mode, inline style policy, prop naming |
| `references/common-token-mistakes.md` | 19 real-world regressions with wrong/right examples — check before finalizing any token block |
| `references/verification-checklist.md` | Full post-generation checklist: token integrity, registration, theme, a11y, i18n, RTL, reuse audit |
| `design-system/SIZE_TAXONOMY.md` | **Every component generation session** — determines which size scale (Micro/Standard/Extended/Avatar/Overlay) to use. Read before Phase 1 step 5. |
| `.claude/references/storybook-stories.md` | When writing the 8 required stories — full template with JSX examples |
| `.claude/references/component-generation-flow.md` | When you need the full 5-step generation workflow with accessibility + performance audit checklists |
| `.claude/skills/state-handling/SKILL.md` | When implementing visual states (loading, disabled, error, selected) — decision matrix, patterns, and token naming. **Required for all interactive atoms and all L3 organisms.** |

---

## Design Quality

**Read `references/design-standards.md` before generating any component.** This covers:
- Shadow elevation rule (theme-aware depth, overlays only)
- Spacing rhythm (component vs layout scale)
- Variant distinctness (different visual strategies per variant)
- Transitions (hover changes 2+ properties)
- State visual treatments (default/hover/focus/active/disabled/loading/error)
- Dark mode color rules (contrast check, shade selection)
- Inline style policy (4 acceptable exceptions)
- Standardized prop naming (checked, loading, error, isActive conventions)

Components must feel intentionally designed — not just structurally valid.

---

## Workflow — 3 Phases

```
Phase 1 — Plan     → Decompose, classify, present tree, wait for approval
Phase 2 — Build    → Write tokens + component files together (co-developed)
Phase 3 — Verify   → Run checklist, fix failures before presenting output
```

Phase 1 has one approval gate (the dependency tree). After that, building is continuous — no more pauses. Tokens and code are co-developed, not written in rigid sequential order. If you realize mid-implementation that a new token is needed, go add it immediately and continue.

---

## Phase 1 — Atomic Decomposition

Every component request — no matter how simple — goes through decomposition first.

### Protocol

1. Identify the requested component's atomic level (atom / molecule / organism / template)
2. Recursively break it into every sub-component it needs
3. **Run the Semantic HTML Selection** (see below) — mandatory before classifying
4. **Run the Interactive Control Scan** (see below) — mandatory before classifying
5. **Run the Size Taxonomy Selection** (see below) — mandatory before classifying. Determines which size scale to use for each new component based on `design-system/SIZE_TAXONOMY.md`.
6. **Run the Token Block Audit** (see below) — mandatory before classifying. Scans `components/` for any component whose `.tsx` references `var(--component-*)` tokens that DON'T have a matching token block in `geeklego.css`. Report every mismatch. If mismatches exist, flag them before proceeding — no new component should be built while existing components have broken token references.
7. Classify each sub-component by level
8. Check `components/` — note which already exist (reuse) vs. need to be generated
9. Flatten the tree into bottom-up generation order: atoms first, then molecules, then organisms
10. Present the full tree (including HTML element choices, size scale for each new component, and generation passes) to the user. **Wait for approval.**

Do not write any code or touch any files until the user confirms.

### Semantic HTML Selection — Mandatory Step 3

Before classifying any component, determine the correct HTML element for each piece in the decomposition.

1. Open `.claude/references/semantic-html-guide.md`
2. For each component identified, look up its purpose in the **Element Decision Table** (Section A)
3. Record the correct HTML element in the decomposition tree
4. If the component contains both links AND buttons, apply the **Link vs Button Rule** (Section B)
5. If the component renders headings, determine the heading level using **Section C**
6. If the component is a form control, verify patterns against **Section D**
7. If the component is tabular data, verify structure against **Section E**
8. Check **Section G** — never add a redundant `role` that matches the native element's implicit role

Include the element choices in the dependency tree presented to the user. Example:

```
Sidebar (L3 Organism) → <aside> + <nav>
├── NavItem (L1 Atom) → <li> containing <a> or <button>
├── Divider (L1 Atom) → <hr>
└── Avatar (L1 Atom) → <span>
```

### Interactive Control Scan — Mandatory Step 4

Before classifying any component, scan the design for every styled interactive HTML control.
Each one that has custom visual styling, hover/focus states, or reuse potential **must** be
factored out as its own L1 Atom — never inlined into a parent.

| If you see in the design... | Required atom | Why it can't be inlined |
|---|---|---|
| A styled dropdown / `<select>` | **Select** (L1 Atom) | Has its own states, tokens, chevron icon, focus ring |
| A styled text field / `<input>` | **Input** (L1 Atom) | Has its own variants, sizes, validation states |
| A styled checkbox | **Checkbox** (L1 Atom) | Has checked, indeterminate, disabled states |
| A styled radio button | **Radio** (L1 Atom) | Grouped state logic belongs at atom level |
| A styled toggle / switch | **Switch** (L1 Atom) | on/off animation + accessible role |
| A styled range slider | **Slider** (L1 Atom) | Track, thumb, and fill are token-driven |
| A standalone CTA / icon button | **Button** (L1 Atom) | Already exists — import it, don't re-implement |
| A styled textarea | **Textarea** (L1 Atom) | Resize behavior + validation states |

**Decision rule:** If you are giving a native HTML element custom visual styling (border, background, radius, hover, focus ring), it is an atom waiting to be born. The parent that uses it becomes a molecule or higher.

**The BarChart case study — how the violation happened:** BarChart contained a styled `<select>` with a custom chevron, border, hover background, and focus ring. That is a full Select atom. Because it was inlined, BarChart was mis-classified as L1 Atom. The correct tree is:
```
BarChart (Molecule — L2)
└── Select (Atom — L1)   ← must exist and be approved before BarChart is written
```

### Size Taxonomy Selection — Mandatory Step 5

Before classifying or generating a new component, determine which size scale it uses. Open `design-system/SIZE_TAXONOMY.md` and apply the decision tree:

```
Is the component a person/photo element (Avatar, SkeletonCircle)?
  → Use Avatar scale (xs → 2xl)

Is the component a container overlay or full-screen toggle?
  → Use Overlay scale (sm → full)

Is the component a primary action, loading indicator, or progress display?
  → Use Extended scale (xs → xl)

Is the component a decorative/status element (badge, label, tag, notification)?
  → Use Micro scale (sm, md)

Otherwise (interactive controls, form inputs, navigation, content blocks):
  → Use Standard scale (sm, md, lg) — this is the default
```

**Record the chosen scale in the decomposition tree** next to each component that has a `size` prop. Example:

```
Button (L1 Atom) → Extended scale (xs-xl)
├── Badge (L1 Atom) → Micro scale (sm, md)
└── Input (L1 Atom) → Standard scale (sm, md, lg)
```

**Why this matters:** The size scale determines the size type definition, the number of CSS tokens, and the Sizes story. Applying the wrong scale creates inconsistency that has historically been the #2 source of design system drift (after hardcoded values). There is no valid reason for a component to use a different scale from the taxonomy — if you believe a component is an exception, raise it in the presentation.

### Token Block Audit — Mandatory Step 6

Before classifying the new component, scan the existing `components/` directory for any component whose `.tsx` file references `var(--component-*)` CSS custom properties that do NOT have a matching token block in `geeklego.css`.

**How to run:**
```bash
# 1. Extract all var(--*) references from TSX files
rg -o 'var\(--[\w-]+\)' components/ --include '*.tsx' | sort -u > /tmp/tsx-vars.txt

# 2. Extract all custom property definitions from geeklego.css
rg -o '--[\w-]+(?=:)' design-system/geeklego.css | sort -u > /tmp/css-vars.txt

# 3. Find TSX vars that have no CSS definition
comm -23 /tmp/tsx-vars.txt /tmp/css-vars.txt

# 4. Run the official validator
npm run validate-tokens
```

**If mismatches are found:**
- Report every component + specific missing token(s) to the user
- Do NOT proceed with generating a new component until existing token gaps are resolved
- This is how the ProductCard bug occurred: ~30 `--product-card-*` tokens were referenced in the TSX but never defined in `geeklego.css`

**CSS class rule check — run this after the var() check:**
In addition to token checking, scan every component's TSX for CSS class names used in `className` that are NOT standard Tailwind utilities and verify each one has a matching CSS rule in `geeklego.css`. The Slider component's `.slider-input` class rules were missing from `geeklego.css`, causing it to render as a browser-default unstyled range input.
- Use `rg -o 'className="([^"]+)"' components/ --include '*.tsx'` to find class strings, then cross-reference against CSS rules in `geeklego.css`.
- Standard Tailwind utilities (`.bg-*`, `.text-*`, `.h-*`, `.p-*`, `.flex`, `.gap-*`, `.rounded-*`, etc.) are exempt — they come from Tailwind's generated stylesheet.

### Level Rules

See CLAUDE.md "Component Architecture — 5-Level Hierarchy" for the full level rules. Key reminders:
- Atoms import nothing from `components/`. Tokens + Tailwind only.
- Same-level imports are invalid. Circular dependencies are invalid.
- Compound organism slot components are internal consts, not separate 5-file folders.

### Example — Sidebar Decomposition

```
Sidebar (Organism — L3)
│
├── NavItem (Atom — L1)          ← self-contained, no sub-components
│   └── [optional Badge slot]    ← passed as ReactNode prop, not imported
│
└── Divider (Atom — L1)

Internal slot components (not standalone — defined inside Sidebar.tsx):
  Sidebar.Header   — sticky top, app/workspace selector
  Sidebar.Content  — scrollable nav region, owns <nav>
  Sidebar.Group    — labeled section within Content
  Sidebar.Footer   — sticky bottom, user profile
```

**Flattened generation order:**
- Pass 1 (Atoms): NavItem, Divider
- Pass 2 (Organism): Sidebar — with Header/Content/Group/Footer defined
  internally as compound slots, not as separate molecule folders

---

## Phase 2 — Build (Tokens + Code, Co-Developed)

For each component in bottom-up order, build the tokens and code together.

### Token Chain

Follow the token chain rule in CLAUDE.md. Key reminders:
- Every component token must alias a semantic — never a primitive, never hardcoded, **and never another component's token**.
- **Crucially, that semantic must be a `:root`-level semantic token — never another component's `--component-*` token.** A component token that references another component's token (e.g., `--card-bg: var(--button-bg)`) creates a hidden cross-component dependency. If the referenced component's block is regenerated, the dependent component silently breaks. Component tokens must only alias `:root` semantic tokens.
- Before writing a component token that references a semantic — **verify it exists** in `geeklego.css`. A token that references an undefined variable resolves to `unset` and is silent at runtime.
- If a semantic is missing, create it first (aliasing a primitive), then create the component token from it
- Never auto-create primitives — STOP and ask the user

**Cross-file validation — ⚠️ MANDATORY GATES ⚠️:**

**After writing tokens to `geeklego.css`, before writing TSX:**
```bash
npm run validate-tokens   # Catch #1: CSS-internal broken var() refs
```

**After writing the TSX file:**
```bash
# Verify the TSX file starts with "use client";
head -n 1 [ComponentName].tsx | grep -q "'use client';" || (echo "Error: TSX file must start with 'use client';" && exit 1)

npm run validate-tokens   # Catch #2: TSX var() refs not defined in CSS + hardcoded values
npx tsc --noEmit         # Confirms no type errors in TSX
```

**Pass 1 (after writing tokens, before TSX):** `validate-tokens` checks that every `var(--)` reference inside `geeklego.css` itself has a matching `--name:` declaration. This catches tokens that reference misspelled or nonexistent semantics.

**Pass 2 (after writing TSX):** The same `validate-tokens` script also scans all `*.tsx` component files for `var(--)` references and cross-references them against CSS definitions. A second pass here catches newly-introduced `var()` refs added during TSX authoring that have no matching CSS token. This is the pass that would have caught the ChatHeader `--chat-header-title-gap` gap.

**Pass 6 — Hardcoded value detection (after writing TSX):** `npm run validate-tokens` now includes a 6th pass that scans all component TSX files for hardcoded `px`, `rem`, and hex values. It flags:
- Tailwind arbitrary values with hardcoded units (`w-[8rem]`, `h-[40px]`) — must use `var(--token)` syntax
- Inline style values with raw units (`'8px'`, `'2rem'`) — must use CSS variables
- Hardcoded hex colors in className or inline styles (`bg-[#6366f1]`, `'#000'`) — must use color tokens
- Exemptions: `0`/`0px` for resetting properties

This catches what Pass 5 (primitive ref check) cannot — literal hardcoded values that bypass the token chain entirely.

**"use client" check (after writing TSX):** Verifies that the TSX file starts with `'use client';` as required for React Server Component compatibility with the docs site.

### Primitive Token Blocklist — Never Reference in TSX

Component TSX files must **never** reference Tier 1 primitive tokens directly. The token chain rule (primitive → semantic → component) must never be skipped.

| Primitive pattern | Forbidden in TSX | Correct replacement |
|---|---|---|
| `var(--color-brand-*)` | Tier 1 color | `var(--color-action-primary)` or relevant semantic |
| `var(--color-neutral-*)` | Tier 1 color | `var(--color-text-primary)` / `var(--color-bg-subtle)` etc. |
| `var(--color-{success,warning,error,info}-*)` | Tier 1 color | `var(--color-status-*)` semantic tokens |
| `var(--color-{slate,blue,green,red,yellow,orange,purple,pink,cyan,teal}-*)` | Tier 1 color | Semantic alias for the intent |
| `var(--spacing-{0..96})` | Tier 1 spacing | `var(--size-fixed-*)`, `var(--spacing-component-*)`, or `var(--spacing-layout-*)` |
| `var(--font-size-*)` | Tier 1 typography | `.text-body-md` / `.text-label-sm` etc. typography classes |
| `var(--font-weight-*)` | Tier 1 typography | Typography utility classes (e.g. `.text-label-xs`) |
| `var(--font-family-sans)` / `var(--font-family-mono)` | Tier 1 font | `var(--font-family-body)` / `var(--font-family-code)` |
| `var(--line-height-*)` / `var(--letter-spacing-*)` | Tier 1 typography | Typography utility classes |
| Hardcoded hex (`#000`, `#3b82f6`) | Not a token | `var(--color-bg-inverse)`, `var(--color-status-info)` etc. |

**SVG numeric props** (e.g. Recharts `fontSize={11}`): Resolve via `useMemo` + `getComputedStyle` reading a component token (e.g. `--areachart-axis-label-font-size`), with a numeric SSR fallback.

**⚠️ Standalone block header audit — same gate, manual step:**
After writing tokens, verify the component has its own standalone section header. Search for the component name followed by ` — generated`:
```bash
rg '/* ComponentName' design-system/geeklego.css
```
If the search returns the component name as a standalone header (e.g., `/* Toggle — generated 2026-03-23 */`), the block is correctly scoped. If the search returns zero results, the tokens are embedded inside another component's block — a cross-contamination bug. Fix by extracting them into their own block before proceeding.

**⚠️ Shared token contamination audit — same gate, additional check:**
After writing tokens, verify that no tokens with a generic property prefix (`--size-`, `--color-`, `--spacing-`, `--content-`, `--radius-`, `--border-`, `--shadow-`) appear inside the component's block. Search for property-prefix tokens inside component blocks:
```bash
rg '^\s*--(size|color|spacing|content|radius|border|shadow)-' design-system/geeklego.css -B 5 | rg 'generated'
```
If a generic-prefix token appears within 5 lines of a `/* ComponentName — generated */` header, it is a shared semantic masquerading as a component token — move it to `:root` before proceeding.

**⚠️ Parent-child token prefix pollution audit — same gate, additional check:**
After writing tokens for a parent component that renders child components, verify that no token in the parent's block has a sub-prefix matching a child component's name. For example, in a Navbar block, tokens like `--navbar-item-height-sm` have the sub-prefix `item` which collides with the NavItem component's `--navitem-*` namespace. These tokens are dead code or stale overrides. Replace them with CSS cascade class rules (see "Parent-child token prefix pollution" section above). Search after writing tokens:
```bash
# List all component token prefixes to find potential child-component collisions
rg '^\s*--([a-z]+)-([a-z]+)-' design-system/geeklego.css -B 5 | rg 'generated'
# Cross-reference the second segment against existing component names in components/
```

**⚠️ CSS class rule audit — same gate, manual step:**
After writing TSX, grep for every CSS class name used in `className` that IS NOT a standard Tailwind utility and verify it has a matching CSS rule in `geeklego.css`. This check exists because `validate-tokens` only catches `var()` references — a missing CSS class rule (like `.slider-input` with pseudo-elements) is silent at build time and only shows up as an unstyled component in the browser.

Both must exit 0 before you proceed to Phase 3. Do not skip. Do not defer.

### Token Metadata Generation — Mandatory Step (after tokens + TSX)

After writing component tokens to `geeklego.css` and verifying with `npm run validate-tokens`, generate metadata entries for every new component token in `design-system/tokens.metadata.json`.

**Why:** The token editor, auto-generated docs, and IA classification all rely on `tokens.metadata.json`. Metadata must be generated at the same time as the component — never deferred.

**Procedure:**

1. Read the current `design-system/tokens.metadata.json`
2. For each component token you created (e.g., `--button-bg`, `--button-bg-hover`, `--button-text`, etc.), add an entry:
   ```json
   "--button-bg": {
     "description": "Background color for the Button component in resting state",
     "category": "component",
     "subcategory": "Button",
     "type": "color"
   }
   ```
3. Use the following schema for each field:
   - `description`: One sentence describing what the token controls and in which state. Include the component name and state (resting/hover/focus/active/disabled/loading/error).
   - `category`: Always `"component"` for component tokens.
   - `subcategory`: The component name (e.g., `"Button"`, `"Card"`, `"Input"`).
   - `type`: The CSS property type — `"color"`, `"spacing"`, `"size"`, `"radius"`, `"shadow"`, `"border"`, `"typography"`, or `"other"`.
   - `tags` (optional): Array of context tags like `["interactive", "filled", "primary"]`.
   - `relatedTokens` (optional): Array of semantically related token names (e.g., `["--button-bg-hover", "--button-bg-active"]`).
4. Write the updated JSON back to `design-system/tokens.metadata.json`. Preserve existing entries — only add new ones and update `lastUpdated`.

**Example for a Button component:**
```json
{
  "version": "1.0",
  "lastUpdated": "2026-05-26T00:00:00.000Z",
  "tokens": {
    "--button-bg": {
      "description": "Background color for the Button component in resting state",
      "category": "component",
      "subcategory": "Button",
      "type": "color",
      "relatedTokens": ["--button-bg-hover", "--button-bg-active", "--button-bg-disabled"]
    },
    "--button-bg-hover": {
      "description": "Background color for the Button component on hover",
      "category": "component",
      "subcategory": "Button",
      "type": "color",
      "relatedTokens": ["--button-bg", "--button-bg-active"]
    },
    "--button-text": {
      "description": "Text color for the Button component in resting state",
      "category": "component",
      "subcategory": "Button",
      "type": "color",
      "relatedTokens": ["--button-text-hover"]
    },
    "--button-height-md": {
      "description": "Height for the Button component at medium size",
      "category": "component",
      "subcategory": "Button",
      "type": "size"
    },
    "--button-radius": {
      "description": "Border radius for the Button component",
      "category": "component",
      "subcategory": "Button",
      "type": "radius"
    }
  }
}
```

**Detection rule — audit after writing tokens:** Verify that every component token in the newly written block has a matching entry in `tokens.metadata.json`. Count tokens in the block, count metadata entries for that subcategory, and ensure they match.


**Post-refactor JSX validation — after replacing an inlined pattern with a sub-component import (e.g. `<StatCard>`, `<FormField>`, `<Breadcrumb>`):**
Verify no orphaned JSX wrappers remain from the inlined version:
```bash
npx tsc --noEmit   # Catches unmatched </div>, ), or )}
```
A common regression: removing a conditional wrapper but leaving its closing tags behind (e.g. four orphaned `</div>){)}</div>)}` lines after simplifying a chart header). TypeScript will catch these immediately.

**useId audit — when an id-like variable appears in JSX (e.g. gradient IDs, panel IDs, tooltip IDs):**
```bash
# Find all template-literal id references
rg 'id={`' components/
# Then verify each referenced variable has a corresponding useId() call
rg 'const \w+ = useId' components/
```
A common regression: referencing `gradientId` in a template literal without ever calling `const gradientId = useId()`. The import of `useId` exists but the variable is never declared — this compiles under Storybook's Vite config but fails at runtime.

**Type↔CSS contract:** If you add a new semantic group structure (e.g. a nested object in `types.ts`), `tokenValidator.ts` and `cssGenerator.ts` must be updated in the same session. The two sources diverging is what caused 75 TypeScript errors and token editor crashes in past regressions — the fix was always more expensive than the original alignment would have been.

### Content flexibility tokens are mandatory

After writing colour/spacing/sizing tokens, add content flexibility tokens for each text slot:
- Single-line slots: `--{component}-{slot}-overflow: var(--content-overflow-label)`, `--{component}-{slot}-whitespace: var(--content-whitespace-label)`, `--{component}-{slot}-text-overflow: var(--content-text-overflow-label)`
- Multi-line slots: `--{component}-{slot}-lines: var(--content-lines-description)` or `var(--content-lines-body)`
- Container slots: `--{component}-{slot}-max-width: var(--content-max-width-label)`, `--{component}-{slot}-min-width: var(--content-min-width-label)`

### Responsive layout protection is mandatory for card-shell components

Any L2/L3 component with a header + body pattern (cards, charts, panels, modals): Add a `--{component}-min-width: var(--content-min-width-md)` token and apply `.card-shell` on the outermost container. Use `.card-header-row` for the header row (title + action), `.card-header-title` for the title area, and `.card-metric-row` for metric + delta rows.

### Semantic naming test — before creating a new semantic

Ask: *"Could three different components plausibly use this token for the same design concept?"*

- **YES** → it belongs in `:root` as a semantic. Name it by **concept**, not by the component that needs it first.
  - `--color-data-series-1` (any data visualisation component can use it)
  - `--color-action-destructive` (any component with a destructive action needs this)
  - NOT `--color-chart-series-1` or `--color-button-destructive` (component name in a semantic is always wrong)

- **NO** → it belongs only in the component token block, aliasing the closest existing semantic.

### Shared token detection — never embed cross-component tokens in a component block

Before adding any token to a component's block, check the token name prefix:

- If the token name starts with `--color-`, `--size-`, `--spacing-`, `--content-`, `--radius-`, `--border-`, or `--shadow-` (i.e., a **property-name prefix**, not a component-name prefix like `--tree-view-` or `--button-`), it MUST NOT live inside a component token block. Place it at `:root` level in the semantic tokens section (above the `GENERATED COMPONENT TOKENS` marker).

**This rule exists because `--control-indicator-size-sm/md/lg` (formerly `--size-control-indicator-sm/md/lg`) were defined inside the TreeView block but consumed by Checkbox, Radio, Slider, and ColorPicker — four separate components. When TreeView tokens were regenerated, three other components silently lost their sizing.**

**Detection heuristic:** If the token's purpose is a generic design concept (indicator size, overlay backdrop, empty-state content colors, control thumb size), it is a shared semantic — not a component token. Name it by concept, not by the first component that uses it. A generic property prefix in the token name is a red flag that the token belongs at `:root`.

**⚠️ Editing existing semantic tokens:** When modifying a semantic token value (e.g., `--color-overlay-backdrop`), the entire file is scanned for duplicate declarations. If you accidentally define the same property twice in the same CSS block (e.g., three `--color-overlay-backdrop` lines in `[data-theme="dark"]`), both `npm run validate-tokens` and `node scripts/dedup-component-tokens.cjs --check` now catch it — no matter where in the file the duplicate lives.

**Moving a misplaced shared token to `:root`:**
1. Cross-reference `validate-tokens.test.ts` to update any test data referencing the old location
2. If the token's value differs per theme, add both `:root` (light) and `[data-theme="dark"]` entries — define each exactly once per CSS block
3. Remove the token from the component block
4. Run `npm run validate-tokens` after the move to confirm no broken references

### Cross-component token chaining — never reference another component's tokens

A component token that uses `var(--some-other-component-*)` in its value creates a horizontal coupling that violates the token chain's vertical-only design. If the referenced component's block is regenerated, the dependent component's tokens silently break.

**Every `var()` in a component token's value must resolve to a `:root`-level semantic token, never to another component's `--component-*` token.**

Detection command:
```bash
rg '--[a-z]+-[a-z]+-.*var\(--[a-z]+-[a-z]+-' design-system/geeklego.css
```
Review each match manually: if the prefix before `var(--` differs from the prefix inside `var(--`, it's a cross-component reference that must be replaced with a `:root` semantic.

### Parent-child token prefix pollution — never define child-component tokens in the parent's block

When a parent component (e.g. Navbar) renders a child component (e.g. NavItem) and needs to override the child's tokens per variant/size, do NOT create intermediate tokens like `--navbar-item-height-sm` inside the parent's token block. These pollute the child component's namespace and become dead code or stale values when the child's own block is regenerated.

**The bug:** Navbar's token block defined `--navbar-item-height-sm/md/lg` and `--navbar-item-label-*`. The `--navbar-item-*` prefix conceptually overlaps with NavItem's `--navitem-*` namespace. The size tokens were dead (no CSS class rules consumed them). The label tokens were never referenced by any file.

**The correct pattern — CSS cascade class rules:**

If a parent needs to override a child's token per variant/size context, add a CSS class rule that directly overrides the child's token on the parent element. The child's tokens re-resolve via CSS cascade — no intermediate tokens needed.

```css
/* ✅ Correct — CSS class rule overrides child token directly */
.navbar-size-sm {
  --navitem-height: var(--size-component-sm);
}
.navbar-size-lg {
  --navitem-height: var(--size-component-lg);
}
.navbar-variant-underline {
  --navitem-bg-active: transparent;
  --navitem-text-active: var(--color-action-primary);
}

/* ❌ Wrong — intermediate tokens in parent block pollute child namespace */
/* In Navbar token block: */
  --navbar-item-height-sm: var(--size-component-sm);
  --navbar-item-height-lg: var(--size-component-lg);
```

**Detection rule:** After writing a parent component's tokens, search for any token whose `--[parent]-{part}-*` pattern has `{part}` matching another component's name (e.g. `--navbar-item-*` where "item" = NavItem). If found, remove the token and replace it with a CSS class rule that overrides the child component's token directly.

```bash
# After writing tokens, check for child-component namespace pollution
rg '-----[a-z]+-[a-z]+-' design-system/geeklego.css | rg -v 'generated'
# Then manually verify any matches aren't a child component name
```

### Token naming conventions

| Pattern | Example |
|---|---|
| `--[component]-[property]` | `--button-bg` |
| `--[component]-[property]-[state]` | `--button-bg-hover` |
| `--[component]-[variant]-[property]` | `--button-ghost-bg` |
| `--[component]-[variant]-[property]-[state]` | `--button-ghost-bg-hover` |
| `--[component]-[property]-[size]` | `--button-height-md` |
| `--[component]-[part]-[property]` | `--card-header-bg` |

**⚠️ The `[component]` prefix must not start with a MISPLACED_PREFIX** (`color-`, `size-`, `spacing-`, `icon-`, `radius-`, `border-`, `shadow-`, `text-`). If your component's kebab-case name would start with one of these when using the full name, drop the MISPLACED_PREFIX from the token prefix:
- `ColorPicker` → token prefix `picker-` (not `color-picker-`)
- `ColorSwatch` → token prefix `swatch-` (not `color-swatch-`)

### Writing tokens and CSS class rules into geeklego.css

Open `design-system/geeklego.css`. **First, search for an existing token block** by looking for `/* ComponentName — generated YYYY-MM-DD */` (replace ComponentName with your component name). 

- **If found**: Delete the old block entirely, then insert the new block in its place. This is the most common case — you are updating an existing component.
- **If NOT found**: Append the new block at the end of the **GENERATED COMPONENT TOKENS** section. Search for `/* GENERATED COMPONENT TOKENS */`. If that comment doesn't exist, create it at the very end, then append beneath it.

**CRITICAL — never append a second block for the same component.** CSS cascade silently picks the last duplicate declaration, creating dead code and maintenance confusion. A script exists to clean up accidental duplicates: `node scripts/dedup-component-tokens.cjs`.

**After the token block, add any CSS class rules** the component needs: pseudo-element selectors (range input thumb/track), size modifier classes, `@keyframes` animations, etc. These rules MUST go in `geeklego.css`.

**CRITICAL — ALWAYS use the unified multi-selector pattern:** Every component
token block MUST use the `:root, [data-theme="dark"]` unified selector. Never
create a separate `[data-theme="dark"]` override block at the component level.

```css
/* [ComponentName] — generated [YYYY-MM-DD] */
:root,
[data-theme="dark"] {
  --component-token-1: var(--some-semantic);
  --component-token-2: var(--some-semantic-hover);
}
```

The unified selector ensures all tokens are defined in one self-contained block.
If a token needs a different resolved value per theme, that is the semantic
token's responsibility — fix the `[data-theme="dark"]` override at the semantic
level in `:root` / `[data-theme="dark"]` foundation block, not at the component
level. A separate `[data-theme="dark"]` override block at the component level
is always wrong — it duplicates declarations, creates maintenance burden, and
breaks the principle that component tokens are thin aliases of semantics.

This rule applies to ALL component token blocks — including elevated/overlay
variants that use shadows. If `--shadow-sm` does not resolve visibly on dark
surfaces, fix the semantic shadow token's dark override, not the component token.

**Rules:**
- **One token block per component, one declaration per property name.** Never define the same `--component-property` more than once within the same CSS block. If you need to override a token value while adding a new section, update the original declaration in-place rather than appending a second one. CSS source-order cascade silently picks the last duplicate — two declarations for the same property is a guaranteed silent regression.
- **Search for an existing block first.** Before writing any token, search for `/* ComponentName — generated YYYY-MM-DD */`. If found, replace the entire block (do not append a second one). If not found, append at the end of the GENERATED COMPONENT TOKENS section.
 - **Run dedup check after writing tokens:** `node scripts/dedup-component-tokens.cjs --check` must exit 0 before proceeding to TSX. This catches accidental within-block duplicates. The check exits 1 if any CSS property name appears more than once in the same selector block, even if the values differ.
 - **Run cross-block dup check after writing tokens:** `npm run validate-tokens` now includes a cross-block duplicate pass. It flags any component token that appears in more than one CSS block for the same component (e.g., `--chat-border` in both the unified `:root, [data-theme="dark"]` block AND a separate `[data-theme="dark"]` block). Must exit 0 before proceeding to TSX.
- **Each component MUST have its OWN dedicated token block with a standalone `/* ComponentName — generated YYYY-MM-DD */` header.** NEVER embed tokens for one component inside another component's block. Every component's tokens must begin and end under its own header — no exceptions.
- Every token aliases a semantic — never a primitive, never a hardcoded value
- Include tokens for all variants, sizes, states, and sub-parts
- **⚠️ Variant state symmetry — every visual state group (selected, unselected, hover, active, disabled, focus, etc.) must be treated consistently across all variants.** Either ALL variants get their own token block for that state group, or ALL variants share a single token set. Never define variant-specific tokens for one state group (e.g., `--segmented-default-selected-bg`, `--segmented-outline-selected-bg`) while using shared tokens for another state group (e.g., `--segmented-segment-bg` shared across variants). This asymmetry creates incomplete variant isolation — consumers cannot tune one variant's unselected appearance without affecting all variants. If state tokens are currently shared, split them into variant-specific blocks with identical values initially, then allow per-variant tuning. **Detection:** After writing tokens, audit each state group: for any token group that has a variant prefix (like `--component-default-*` and `--component-outline-*`), verify that EVERY state within that group uses the same variant prefix pattern. If any state misses the variant prefix (e.g., `--ed-segment-*` instead of `--ed-default-segment-*`), the state is shared and must be split.
- **Never create typography tokens** at the component level — typography is handled by utility classes (`.text-button-md`, `.text-body-sm`, etc.)
- **Every component — including layout/passthrough atoms — MUST have a token block.** Even when every token is a thin 1:1 alias of a semantic, the block is required for pattern consistency, Token Editor discoverability, and per-component customization. The previous exception for "passthrough atoms" is removed.
- If you discover mid-coding that a token is missing, go add it now and continue

**Component CSS class rules (not just custom properties):**
If the component uses any CSS class rule — including pseudo-element selectors (`::-webkit-slider-thumb`, `::-moz-range-track`), size modifier classes (`--sm`, `--lg`), animation `@keyframes`, or any other non-token CSS — add them immediately after the token block in `geeklego.css`. Use this pattern:

```css
@keyframes component-animation-name {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.component-class-name {
  animation: component-animation-name var(--component-duration-token, var(--duration-slowest)) linear infinite;
  transform-origin: center;
}
```

**Known regression — Slider component:** The `.slider-input` class rules (range input pseudo-elements, size variants, hover/disabled states) were defined without matching CSS rules in `geeklego.css`. The Slider rendered as a browser-default unstyled range input for months before detection. **Every CSS class name used in a component's `className` — or pseudo-element selector applied via CSS — that is not a standard Tailwind utility must be defined in `geeklego.css`.**

**Critical — the `validate-tokens` script only checks `var()` references.** A missing CSS class rule, pseudo-element selector, or `@keyframes` produces a silent visual bug with no build-time error. After writing CSS class rules, manually verify that every CSS class name used in `className` that isn't a standard Tailwind utility is defined in `geeklego.css`.

**Duplicate token validation (MANDATORY):** After writing or modifying any CSS block (component tokens, semantic section, or `@theme`), run both checks:
1. `npm run validate-tokens` — verifies all `var()` references resolve; also scans the entire file for duplicate declarations within any CSS rule block (catches accidental triplicates like `--color-overlay-backdrop` or `--duration-stagger-*` in `@theme`)
2. `node scripts/dedup-component-tokens.cjs --check` — same full-file duplicate check; can auto-fix duplicates when run without `--check`
Both must exit 0 before proceeding to TSX.

### Progressive Enhancement Check

Before writing the component TSX, verify that all CSS features used in the token block are safe per `.claude/references/cross-browser-compat.md`. Components **NEVER** contain `@supports`, `@media`, or `@container` blocks — all feature detection lives in `geeklego.css`. If you need a new progressively-enhanced CSS feature, add it to `cssGenerator.ts` first.

---

### The 5 Files — Structural Templates

Every component gets exactly 5 files in `components/[level]/[ComponentName]/`. See CLAUDE.md "Component File Structure" for the full specification. Below are the key structural patterns.

#### File 1: `[ComponentName].tsx`

**Every component file starts with `'use client'`** — components use React hooks (useMemo, forwardRef, etc.) and must be client-rendered when consumed by the docs site (which is a React Server Component page).

```tsx
'use client';

import { forwardRef, memo, useMemo } from 'react';
import type { ComponentProps, ComponentVariant, ComponentSize } from './Component.types';

// Variant classes — each variant uses a DIFFERENT visual strategy
const variantClasses: Record<ComponentVariant, string> = {
  primary: [
    'bg-[var(--component-primary-bg)] text-[var(--component-primary-text)] border border-transparent',
    'hover:bg-[var(--component-primary-bg-hover)] active:bg-[var(--component-primary-bg-active)]',
    'shadow-[var(--component-primary-shadow)] hover:shadow-[var(--component-primary-shadow-hover)]',
  ].join(' '),
  ghost: [
    'bg-transparent text-[var(--component-ghost-text)] border border-transparent',
    'hover:bg-[var(--component-ghost-bg-hover)] active:bg-[var(--component-ghost-bg-active)]',
  ].join(' '),
};

// Size classes — always pair base dimensions with typography
const sizeClasses: Record<ComponentSize, { base: string; text: string }> = {
  sm: { base: 'h-[var(--component-height-sm)] px-[var(--component-px-sm)]', text: 'text-button-sm' },
  md: { base: 'h-[var(--component-height-md)] px-[var(--component-px-md)]', text: 'text-button-md' },
  lg: { base: 'h-[var(--component-height-lg)] px-[var(--component-px-lg)]', text: 'text-button-lg' },
};

export const Component = memo(forwardRef<HTMLButtonElement, ComponentProps>(
  ({ variant = 'primary', size = 'md', disabled, className, children, ...rest }, ref) => {
    const classes = useMemo(() => [
      'inline-flex items-center justify-center gap-[var(--component-gap)]',
      'rounded-[var(--component-radius)]',
      sizeClasses[size].text,
      'transition-default',
      'focus-visible:outline-none focus-visible:focus-ring',
      disabled
        ? 'bg-[var(--component-bg-disabled)] text-[var(--component-text-disabled)] border-transparent cursor-not-allowed shadow-none pointer-events-none'
        : variantClasses[variant],
      sizeClasses[size].base,
      className,
    ].filter(Boolean).join(' '), [disabled, variant, size, className]);

    return (
      <button ref={ref} disabled={disabled} aria-disabled={disabled || undefined} className={classes} {...rest}>
        {children}
      </button>
    );
  },
));
Component.displayName = 'Component';
```

**Key patterns** (full rules in CLAUDE.md):
- L1/L2: `memo(forwardRef())` — **mandatory**. L3+: `memo(forwardRef())` (recommended for consistency, `memo()` minimum).
- Set `displayName` immediately after the closing `)));` — never skip.
- Token-based Tailwind only: `bg-[var(--token)]` — `var()` wrapper required in Tailwind v4.2
- Variant/size maps as plain `Record<Variant, string>` — no clsx, no cva
- Array join pattern: `[a, b, c].filter(Boolean).join(' ')`
- `transition-default` on all elements that change visual state
- `focus-visible:outline-none focus-visible:focus-ring` on all focusable elements
- Content flexibility: `.truncate-label` for single-line, `.clamp-description` for multi-line, `.content-nowrap` for buttons/chips, `.content-flex` for flex children. **Never use `flex-1 min-w-0` — always use `.content-flex` instead.**

#### File 2: `[ComponentName].types.ts`

```tsx
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ComponentVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface ComponentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to 'primary'. */
  variant?: ComponentVariant;
  /** Height and typography size. Defaults to 'md'. */
  size?: ComponentSize;
  children: ReactNode;
}
```

- Extends native HTML element props
- JSDoc comment on every prop
- Export the prop interface AND the union types

#### File 3: `[ComponentName].stories.tsx`

All **8 stories** are non-negotiable:

| Story | What it shows |
|---|---|
| `Default` | Single most-common usage with args |
| `Variants` | All visual variants side by side |
| `Sizes` | All size variants side by side |
| `States` | default, hover (via CSS), focus-visible, active, disabled, loading, error |
| `DarkMode` | Wrapped in `data-theme="dark"` with `bg-primary` container and `max-w-2xl` |
| `Playground` | All args exposed as controls |
| `Mobile` | Rendered at 375px viewport using the `mobile` Storybook preset — verifies layout doesn't break at small widths; no dark mode wrapper required |
| `Accessibility` | Tagged `['a11y']`; renders with explicit aria-label, aria-expanded, aria-busy, aria-disabled |

Story title format: `'Atoms/Button'`, `'Molecules/Card'` (matches level hierarchy).

**Compound organism stories** — compose all slot children in the Default story to show realistic usage.

#### File 4: `README.md`

All sections required: Description, Props table, Tokens Used, Variants, Sizes, States, Accessibility (semantic element, role, ARIA attributes, keyboard interaction, screen reader announcement), Usage. See CLAUDE.md for the full template.

#### File 5: `mock-data.json`

Must cover: `default`, `variants` (array), `sizes` (array), `states` (object: loading, disabled, error), `edge_cases` (empty string, very long string, icon-only, etc.)

---

## Common Token Mistakes

**Read `references/common-token-mistakes.md` for 19 real-world regressions** with wrong/right examples and detection commands:

| # | Mistake | Detection |
|---|---|---|
| 1 | Hardcoding primitives in component tokens | `npm run validate-tokens` |
| 2 | Property-before-component naming | `--button-bg-hover`, not `--bg-button-hover` |
| 3 | Borrowing global motion as per-element delay | Use `--duration-stagger-*` instead |
| 4 | Duplicate token blocks after regeneration | Delete old block before inserting new |
| 6 | Hardcoding px/rem in component tokens | Alias existing design tokens |
| 7 | Hardcoding hex in inline styles/fallbacks | SSR fallback must match light-mode resolved value |
| 8 | Separate `[data-theme="dark"]` component block | Use unified `:root, [data-theme="dark"]` selector |
| 10 | Duplicate property declarations in same block | `dedup-component-tokens.cjs --check` |
| 9 | Shared/cross-component tokens in component block | Generic prefix (`--size-`, `--color-`) → must be `:root` |
| 5 | Inverting semantics in dark mode | Dark value must still match token name's concept |
| 11 | Hardcoding rem in component CSS tokens | Route through `--size-fixed-*` semantics |
| 12 | Inline style duplicating token block defaults | Remove inline default, let CSS cascade provide it |
| 13 | Hardcoding color when shared semantic exists | Search for `--color-overlay-backdrop`, etc. |
| 14 | Cross-component token chaining | LHS prefix != RHS prefix in `var()` reference |
| 15 | Variant state asymmetry | All state groups must have same prefix pattern |
| 16 | Inlining a styled interactive control instead of extracting it as an atom | BarChart's `<select>` should be `<Select>` atom |
| 17 | TSX referencing component tokens not defined in `geeklego.css` | `validate-tokens` Pass 2 scans TSX `var()` refs against CSS |
| 18 | Missing CSS class rules for non-Tailwind class names (Slider case) | Grep every `className` for non-Tailwind classes; verify each has a CSS rule |
| 19 | Child-component token prefix pollution in parent's block (Navbar/NavItem) | Use CSS class rule to override child's token directly; never create intermediate `--parent-child-*` tokens |

Check for regressions before finalizing any token block.

---

## Phase 3 — Verification Checklist

**Run `references/verification-checklist.md` after all components are generated.** Fix every failure before presenting output.

The checklist covers: token integrity, registration, theme completeness, file integrity, import integrity, Storybook completeness, design quality, responsive layout, accessibility (WCAG 2.2 AA), Schema.org, performance, cross-browser, security, i18n, RTL logical properties, and reuse audit.

---

## Icons — lucide-react Only

All icons must come from `lucide-react`. Size and color always via tokens:

```tsx
import { ChevronDown, Search, X, Plus } from 'lucide-react';

// Size via token — use --size-icon-* (component-ready token, Tier 2 alias → Tier 1 primitive)
// NEVER use --icon-size-* directly (that is the raw primitive — skips the token chain)
<Search size="var(--size-icon-md)" />

// Color via parent or prop
<span className="text-[var(--color-text-secondary)]"><Search /></span>

// Icon slots: pass as React nodes, not strings
<Button leftIcon={<Plus size="var(--size-icon-sm)" />}>Add item</Button>
```

---

## Industry-Standard Variants

Use these as the baseline for all components. For unlisted components, research industry-standard patterns before designing.

| Component | Variants | Sizes |
|---|---|---|
| Button | primary, secondary, outline, ghost, destructive, link | xs, sm, md, lg, xl |
| Input | default, filled, flushed, unstyled | sm, md, lg |
| Badge | solid, soft, outline, dot | sm, md (heights: 16px, 24px) |
| Card | elevated, outlined, filled, ghost | — |
| Avatar | image, initials, icon, fallback | xs, sm, md, lg, xl, 2xl — shapes: circle, rounded |
| Modal | — | sm, md, lg, xl, full |
| Alert/Banner | info, success, warning, error | styles: solid, subtle, outline, left-accent |
| Checkbox | default, indeterminate | sm, md, lg |
| Switch | default | sm, md, lg |
| Spinner | default, inverse | xs, sm, md, lg, xl |
| ProgressBar | default, success, warning, error, neutral | xs, sm, md, lg, xl |
| Divider | horizontal, vertical | styles: solid, dashed, dotted |
| Chip | solid, outline, ghost | sm, md |
| Tag | default, dismissible | sm, md |
| FormField | default, inline | — |
| Navbar | default | — |

**All components must handle these states:** default, hover, focus-visible, active, disabled, loading, error (where applicable).

---

## Effects Tokens — Mandatory Usage

| Need | What to use | Never use |
|---|---|---|
| Resting shadow — light/dark mode | `none` — static elements do not float | Raw `box-shadow:` |
| Elevated surface (card, popover) | `var(--shadow-lg)` or `var(--shadow-xl)` | — |
| All state transitions | `.transition-default` class | Raw `transition: property` |
| Element entry animations | `.transition-enter` class | `transition-duration:` in component |
| Focus indicator | `focus-visible:focus-ring` | `outline:` directly |
| Input focus ring | `focus-visible:focus-ring-inset` | `box-shadow:` directly |
| Loading placeholder | `.skeleton` class | Custom shimmer |

---

## Error Handling

| Situation | Action |
|---|---|
| Missing dependency component | Generate it first with the full 5-file treatment before the current component |
| Missing semantic token for an intent | Create the semantic `:root` entry aliasing the correct primitive, then create the component token from it |
| Missing primitive | **STOP** — ask the user. Never auto-create primitives. |
| Component already exists in `components/` | **STOP** — ask: "Update it, replace it, or skip and reuse it?" |
| Circular dependency detected | **STOP** — show the cycle, propose restructuring |
| Dark mode token gap | Verify semantic has a `[data-theme="dark"]` override AND that the dark value follows the Dark Mode Color Rules in `references/design-standards.md`. If not, fix geeklego.css first before writing the component token. If a component dark override produces light-text-on-light-bg or dark-text-on-dark-bg — STOP. Fix the semantic, never patch contrast failures by hardcoding a color. |

---

## What This Skill Must Never Do

These rules are documented in detail in the sections above. This is a quick reference:

| Rule | Where documented |
|---|---|
| No standalone 5-file folder for slot components | Level Rules |
| No molecule classification for self-contained units | Level Rules / Interactive Control Scan |
| No inlined interactive controls | Interactive Control Scan |
| L1/L2: `memo(forwardRef(...))` mandatory | 5-file templates / Verification Checklist |
| No inline style duplicating token block defaults | `references/design-standards.md` (Inline Style Policy) |
| No MISPLACED_PREFIX in token names | Token naming conventions |
| No separate `[data-theme="dark"]` component block | `references/common-token-mistakes.md` ❌8 |
| No cross-component token chaining | `references/common-token-mistakes.md` ❌14 |

See CLAUDE.md for the full 47 project-level "Never Do" rules.