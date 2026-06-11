# Common Token Mistakes — What Not to Do

These patterns caused the most regressions in the design system's history. They are silent at build time and only reveal themselves visually — which is why they survived undetected for months.

**❌ 1 — Hardcoding a Tier 1 primitive in a component token**
```css
/* Wrong — neutral-950 is a primitive, not a semantic */
--badge-text-disabled: var(--color-neutral-950);

/* Right — route through the semantic that captures the intent */
--badge-text-disabled: var(--color-text-on-status-solid);
```
If the needed semantic doesn't exist, create it in `:root` first. Hardcoding the primitive means this token becomes a maintenance liability: one palette change breaks every component that used the shortcut.

**❌ 2 — Naming the token with property before component**
```css
/* Wrong — violates --{component}-{property} ordering */
--size-avatar-md: 2rem;
--icon-color-button: var(--color-text-primary);

/* Right — component name always leads */
--avatar-size-md: 2rem;
--button-icon-color: var(--color-text-primary);
```
The validator (`npm run validate-tokens`) enforces this pattern on component blocks and exits with code 1 on violations. Fixing after the fact requires hunting down every consumer.

**⚠️ Special case — component names starting with a MISPLACED_PREFIX:** If the component's kebab-case name starts with `color-`, `size-`, `spacing-`, `icon-`, `radius-`, `border-`, `shadow-`, or `text-`, you must abbreviate the token prefix. For example:
- `ColorPicker` → use `--picker-*`, NOT `--color-picker-*`
- `ColorSwatch` → use `--swatch-*`, NOT `--color-swatch-*`
- `IconButton` → use `--icon-btn-*`, NOT `--icon-button-*` (if `icon-` were in MISPLACED_PREFIXES)
Always check the kebab-case of your component name against the MISPLACED_PREFIXES list before writing tokens. If they collide, drop the MISPLACED_PREFIX portion from the token prefix.

**❌ 3 — Borrowing a global motion token as a per-element delay**
```css
/* Wrong — steals the interaction-level duration as an animation stagger */
--typing-dot-delay-2: var(--duration-interaction);
--typing-dot-delay-3: var(--duration-transition);

/* Right — use dedicated stagger semantics */
--typing-dot-delay-2: var(--duration-stagger-sm);
--typing-dot-delay-3: var(--duration-stagger-md);
```
Global durations are tuned for their interaction category. Reusing them for unrelated timing couples two unrelated design decisions — tune one, break the other.

**❌ 4 — Leaving duplicate token blocks after regeneration**
```css
/* Wrong — both blocks exist; cascade picks the second silently */
/* Button — generated 2026-01-15 */
:root { --button-bg-primary: var(--color-action-primary); }   /* old value */

/* Button — generated 2026-04-27 */
:root { --button-bg-primary: var(--color-brand-600); }        /* new value */
```
When you regenerate tokens, delete the old block in the same edit. Two blocks pass the validator and compile cleanly — the bug only shows up in the browser.

**❌ 6 — Hardcoding px or rem values directly in component tokens**
```css
/* Wrong — raw px values that skip the design token system */
--picker-min-width:                  200px;
--picker-thumb-size:                 14px;
--picker-track-height:               12px;
--picker-slider-thumb-size:          18px;
--picker-spectrum-height-sm:         120px;

/* Right — route through existing design tokens for each dimension */
--picker-min-width:                  var(--content-min-width-md);
--picker-thumb-size:                 var(--control-indicator-size-sm);
--picker-track-height:               var(--spacing-3);
--picker-slider-thumb-size:          var(--control-indicator-size-md);
--picker-spectrum-height-sm:         var(--spacing-30);
```
Every measurement in a component token — even small ones like thumb sizes, track
heights, and spectrum dimensions — must use an existing design token. The project
has dedicated tokens for small dimensions (`--spacing-raw-2` = 2px, `--spacing-3` = 12px,
`--control-indicator-size-sm` = 14px (formerly `--size-control-indicator-sm`), `--size-fixed-1` = 4px, etc.) that cover the
full range. If no exact match exists, use the closest token — the uniformity gains
from design system consistency far outweigh the 1-2px visual difference.

**❌ 7 — Hardcoding hex colors in inline styles or useState fallbacks**
```tsx
// Wrong — hardcoded hex in an inline style gradient
background: 'linear-gradient(to right, #fff, var(--spectrum-hue-color))'

// Wrong — SSR fallback hex doesn't match the CSS variable's resolved value
const cssDefault = getComputedStyle(...).getPropertyValue('--picker-default-color');
return parseColor(cssDefault || '#6366f1');

// Right — use a CSS variable defined in the token block
background: 'linear-gradient(to right, var(--picker-spectrum-start), var(--spectrum-hue-color))'

// Right — the fallback hex must match the light-mode resolution of the CSS variable
return parseColor(cssDefault || '#3b82f6');  // matches --color-status-info light-mode value
```
Every visual color in an inline `style` prop must reference a CSS variable from
the component's token block. For useState initializers that read a CSS variable
at runtime, the JavaScript fallback hex (used during SSR when `document` is
unavailable) must exactly match the light-mode resolved value of that CSS variable.
A mismatch causes a flash between SSR and hydration — the user sees one color,
then it snaps to another.

**❌ 8 — Creating a separate `[data-theme="dark"]` override block at the component level**
```css
/* Wrong — NO separate [data-theme="dark"] block allowed at component level */
:root {
  --picker-bg:               var(--color-bg-primary);
  --picker-border:           var(--color-border-subtle);
  --picker-shadow:           var(--shadow-md);             /* defined only in :root — different per theme */
}
[data-theme="dark"] {
  --picker-shadow:           var(--shadow-md);
}

/* Right — unified :root, [data-theme="dark"] selector only */
:root,
[data-theme="dark"] {
  --picker-bg:               var(--color-bg-primary);
  --picker-border:           var(--color-border-subtle);
  --picker-shadow:           var(--shadow-md);
}
```
All semantic tokens in a component block re-resolve correctly in dark mode via
their own `[data-theme="dark"]` overrides at the foundation layer. A separate
`[data-theme="dark"]` block at the component level is always redundant or
wrong — it duplicates declarations and creates maintenance burden. If a shadow
token does not resolve visibly on dark surfaces, fix the semantic shadow token's
dark override — never patch at the component level.

The unified selector `:root, [data-theme="dark"]` makes it clear at a glance
that these tokens are theme-invariant.

**Detection command — run after every token write to catch accidental split blocks:**
```bash
# Find any standalone [data-theme="dark"] blocks that only contain component tokens
# (expect shadow/variant overrides that genuinely need per-theme values)
rg '^\s*\[data-theme="dark"\]' design-system/geeklego.css -n
```
If this returns blocks inside the GENERATED COMPONENT TOKENS section, review each:
- If the block only overrides `--component-*` bg/border/shadow tokens, it should be merged into the main `:root, [data-theme="dark"]` unified selector block for that component.
- Legitimate exceptions: elevated-variant shadow tokens where the light-mode value is `none`/`var(--shadow-sm)` and dark-mode needs `var(--shadow-md)` — these genuinely need per-theme values and indicate a missing theme-aware semantic shadow token.

**❌ 10 — Defining the same CSS custom property twice within the same selector block**
```css
/* Wrong -- duplicate declaration in same block: second silently wins */
:root,
[data-theme="dark"] {
  --card-elevated-shadow:       var(--shadow-sm);    /* dead code */
  --card-elevated-shadow:       var(--shadow-md);    /* wins in ALL themes */
}

/* Right — unified selector, no duplicates */
:root,
[data-theme="dark"] {
  --card-elevated-shadow:       var(--shadow-md);
}
```
This is the Card elevated variant bug (May 2026): the shadow token was defined
with `--shadow-sm` followed by `--shadow-md` in the same unified block, making
`--shadow-sm` dead code for all themes and giving light mode a shadow depth
designed for dark surfaces. The `dedup-component-tokens.cjs --check` catches
this. **Rule: never write the same `--property-name` twice in the same CSS rule
block.** If the value needs to differ per theme, fix the semantic shadow token's
dark override — never create a separate component-level `[data-theme="dark"]`
block.

**❌ 9 — Defining shared/cross-component tokens inside a component block**
```css
/* Wrong — --control-indicator-size-* (formerly --size-control-indicator-*) are used by Checkbox, Radio, Slider, Picker
   but defined inside the TreeView block */
/* TreeView — generated 2026-03-21 */
:root, [data-theme="dark"] {
  --tree-view-bg:                            transparent;
  --control-indicator-size-sm:               var(--spacing-raw-14);   /* ← shared! */
  --control-indicator-size-md:               var(--spacing-4);         /* ← shared! */
  --control-indicator-size-lg:               var(--spacing-5);         /* ← shared! */
}

/* Right — shared tokens live at :root, component tokens stay in their own block */
:root, [data-theme="dark"] {
  --control-indicator-size-sm:               var(--spacing-raw-14);
  --control-indicator-size-md:               var(--spacing-4);
  --control-indicator-size-lg:               var(--spacing-5);
}
/* TreeView — generated 2026-03-21 */
:root, [data-theme="dark"] {
  --tree-view-bg:                            transparent;
}
```
**Detection rule:** If a token is named with a generic property prefix (`--size-`, `--color-`,
`--spacing-`, `--content-`, `--radius-`, `--border-`, `--shadow-`) rather than a component
prefix (`--tree-view-`, `--button-`, `--checkbox-`), it is a shared semantic and MUST live
at `:root`. The standalone block header audit catches this: if a `:root`-level token appears
inside a component block, the block's header won't match the token's purpose.

**❌ 5 — Inverting a semantic in dark mode instead of correcting it**
```css
/* Wrong — surface-overlay becomes opaque solid white in dark mode (inverted!) */
[data-theme="dark"] { --color-surface-overlay: var(--color-neutral-0); }

/* Right — an overlay is a transparent scrim in both modes */
[data-theme="dark"] { --color-surface-overlay: var(--color-overlay-backdrop); }
```
Dark mode overrides should adjust opacity or shade, never invert the semantic's role. When in doubt, check: does the dark value still describe the same concept the token name promises?

**❌ 11 — Hardcoding rem values in component CSS tokens instead of aliasing semantic tokens**
```css
/* Wrong — 16rem is a raw value; --sidebar-width-mobile is also raw */
--sidebar-width:              16rem;
--sidebar-width-mobile:       18rem;

/* Right — route through size-fixed semantics that alias spacing primitives */
--sidebar-width:              var(--size-fixed-64);    /* = 16rem */
--sidebar-width-mobile:       var(--size-fixed-72);    /* = 18rem */
```
Every measurement in a component CSS token — height, width, spacing — must alias an existing
semantic token. If no matching size-fixed token exists for the intended dimension, add a new
`--spacing-{n}` primitive in `@theme` (following the spacing scale pattern) and a
`--size-fixed-{n}` semantic in `:root`, THEN alias it from the component token. Never write a
raw `rem` value in a component token block. The one exception is `0`/`0px` for resetting properties.

**❌ 12 — Setting CSS variables in inline `style` that duplicate the token block defaults**
```tsx
// Wrong — both values are already defined in the CSS token block; inline duplicates are
// dead code that inevitably drift from the source-of-truth values
<div style={{
  '--sidebar-width': '16rem',
  '--sidebar-width-icon': 'var(--size-component-2xl)',
  ...style,
}}>

// Right — let the CSS token block provide default values; only pass consumer overrides
<div style={style as React.CSSProperties}>
```
Never set a CSS custom property in an inline `style` object whose value matches what the
component's token block already defines. This creates a second source of truth that silently
diverges when the token block is updated. If the component must allow consumers to override a
specific token, expose it via a dedicated prop or rely on the CSS cascade — remove the inline
default entirely. The `...style` spread pattern for consumer overrides is correct; the
inline defaults are the bug.

**❌ 13 — Hardcoding color values in component CSS tokens when a shared semantic exists**
```css
/* Wrong — rgb(0 0 0 / 0.5) is a hardcoded color; Drawer and Modal use a shared semantic */
--sidebar-overlay-bg:             rgb(0 0 0 / 0.5);

/* Right — reuse the existing shared overlay-backdrop semantic token */
--sidebar-overlay-bg:             var(--color-overlay-backdrop);
```
Before writing any color value in a component token, search `geeklego.css` for existing
semantic tokens that match the design intent. Common shared semantics include:
`--color-overlay-backdrop`, `--color-state-selected`, `--color-state-hover`,
`--color-state-active`, `--color-text-error`, `--color-text-on-status-solid`,
`--color-bg-inverse`, `--color-border-interactive`. A hardcoded color bypasses the token
chain entirely — it won't adapt to dark mode, won't update with palette changes, and
creates an inconsistent visual pattern across components.

**❌ 14 — Component A's tokens referencing Component B's tokens (cross-component chaining)**
```css
/* Wrong — Card's tokens reference Button's tokens */
:root, [data-theme="dark"] {
  --card-bg:              var(--color-bg-primary);           /* ✓ semantic */
  --card-surface:         var(--button-bg);                  /* ✗ references Button's token! */
  --card-radius:          var(--button-radius);              /* ✗ references Button's token! */
}

/* Right — alias :root-level semantics instead */
--card-surface:         var(--color-surface-default);        /* ✓ :root semantic */
--card-radius:          var(--radius-component-lg);          /* ✓ :root semantic */
```

**Why this is wrong:** Every component token creates an implicit dependency. When `--card-surface` aliases `--button-bg`, the Card component breaks if Button's token block is regenerated and `--button-bg` is renamed or removed. The design system's token hierarchy is strictly vertical (primitive → semantic → component). Horizontal references between component tokens violate this architecture and create brittle, unmaintainable dependencies.

**Detection:** Run `rg '--[a-z]+-[a-z]+-.*var\(--[a-z]+-[a-z]+-' design-system/geeklego.css` and manually verify that every match's LHS token prefix differs from the RHS token prefix. If they differ (e.g., `--textarea-*: var(--input-*)`), replace with a direct `:root` semantic reference.

**❌ 15 — Variant state asymmetry (SegmentedControl regression)**
```css
/* Wrong — selected state has variant-specific tokens, unselected state is shared */
--segmented-default-selected-bg:       var(--color-surface-default);   /* ← variant-specific */
--segmented-outline-selected-bg:       var(--color-action-primary);     /* ← variant-specific */
--segmented-segment-bg:                transparent;                     /* ← SHARED across variants! */
--segmented-segment-bg-hover:          var(--color-state-hover);        /* ← SHARED across variants! */

/* Right — every state group has identical granularity */
--segmented-default-segment-bg:        transparent;                     /* ← default variant's unselected */
--segmented-default-segment-bg-hover:  var(--color-state-hover);
--segmented-outline-segment-bg:        transparent;                     /* ← outline variant's unselected */
--segmented-outline-segment-bg-hover:  var(--color-state-hover);
--segmented-default-selected-bg:       var(--color-surface-default);    /* ← default variant's selected */
--segmented-outline-selected-bg:       var(--color-action-primary);      /* ← outline variant's selected */
```

**Why this is wrong:** When a component has variant-specific tokens for one visual state (e.g., selected) but shared tokens for another (e.g., unselected), the variant concept is incomplete. A consumer using variant tokens to theme the component cannot independently control each variant's unselected appearance — changing `--segmented-segment-bg` affects all variants simultaneously. This defeats the purpose of variant-specific tokens and creates a maintenance trap: when a designer later wants variant-specific unselected colors, they must split the shared tokens and update every `var()` reference, which risks introducing broken references.

**Detection rule — audit after writing tokens:** For every component with 2+ variants, check that every visual state group has the same token granularity pattern. Group tokens by their visual role (track, segment-selected, segment-unselected, segment-disabled, etc.) and verify:
- If ANY variant has a variant-prefixed token for a role (e.g., `--component-default-role-*`), ALL variants must have one.
- If ANY variant uses a shared unprefixed token for a role (e.g., `--component-role-*`), ALL variants must use the same shared token.
- No mixing of "variant-specific for variant A but shared for variant B" within the same role.

```bash
# Detection command — find variant-prefixed tokens and check for shared counterparts
rg '--[a-z]+-[a-z]+-[a-z]+-.*--[a-z]+-[a-z]+-[a-z]+-' design-system/geeklego.css | rg -v 'generated|:root'
# For each match, verify: does every visual state have the same prefix pattern?
```

**❌ 16 — Inlining a styled interactive control instead of extracting it as an atom (BarChart case)**

BarChart contained a styled `<select>` with a custom chevron, border, hover background, and focus ring. That is a full Select atom — not a `<select>` inlined in a chart. Because the control was inlined, BarChart was mis-classified as L1 Atom. The corrected tree:

```
BarChart (Molecule — L2)
└── Select (Atom — L1)   ← must exist and be approved before BarChart is written
```

**Decision rule:** if you are giving a native HTML control custom visual styling (border, background, radius, hover, focus ring), it is an atom waiting to be born. The parent that uses it becomes a molecule or higher.

**❌ 17 — TSX referencing component tokens that never made it into geeklego.css (ProductCard / ChatHeader case)**

ProductCard's TSX referenced ~30 `--product-card-*` tokens that were never defined in `geeklego.css`. ChatHeader referenced `--chat-header-title-gap` with the same omission. Both passed the legacy CSS-only token check because the validator did not cross-reference TSX `var()` usage against CSS definitions.

The fix lives in `validate-tokens`: pass 2 scans every `*.tsx` for `var(--)` and confirms a matching `--name:` exists in `geeklego.css`. Run it after writing TSX — never defer.

**❌ 18 — Missing CSS class rules for a non-Tailwind class name (Slider case)**

The Slider component's TSX referenced `.slider-input` and several pseudo-element selectors (`::-webkit-slider-thumb`, `::-moz-range-track`) that were never added to `geeklego.css`. The component shipped looking like a browser-default unstyled range input for months.

`validate-tokens` only checks `var()` references — it does not check CSS class names. After writing TSX, grep every `className` for non-Tailwind class names and verify each one has a matching rule in `geeklego.css`:

```bash
rg -o 'className="([^"]+)"' components/ --include '*.tsx'
```

Cross-reference against CSS rules in `geeklego.css`. Standard Tailwind utilities (`.bg-*`, `.text-*`, `.flex`, `.gap-*`, `.rounded-*`, etc.) are exempt.

**❌ 19 — Child-component token prefix pollution in a parent's block (Navbar / NavItem case)**

Navbar's token block defined `--navbar-item-height-sm/md/lg` and `--navbar-item-label-*`. The `--navbar-item-*` prefix conceptually overlaps with NavItem's `--navitem-*` namespace. The size tokens were dead — no CSS class rule consumed them. The label tokens were never referenced by any file.

The correct pattern is a CSS class rule that overrides the child's token directly. The child's tokens re-resolve via CSS cascade — no intermediate tokens needed.

```css
/* ✅ Correct — CSS class rule overrides child token directly */
.navbar-size-sm {
  --navitem-height: var(--size-component-sm);
}
.navbar-variant-underline {
  --navitem-bg-active: transparent;
  --navitem-text-active: var(--color-action-primary);
}

/* ❌ Wrong — intermediate tokens in parent block pollute child namespace */
/* In Navbar token block: */
  --navbar-item-height-sm: var(--size-component-sm);
```

**Detection:** after writing a parent's tokens, search for any token whose `--[parent]-{part}-*` pattern has `{part}` matching another component's name. If found, remove the token and add a CSS class rule that overrides the child's token directly.
