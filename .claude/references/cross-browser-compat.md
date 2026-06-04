# Cross-Browser Compatibility Reference

> Geeklego browser support targets and CSS feature compatibility guide.
> Consult this before using any CSS feature not already in `geeklego.css`.

---

## Browser Targets

Defined in `package.json` → `browserslist`:

```json
"browserslist": [
  "last 2 Chrome versions",
  "last 2 Firefox versions",
  "last 2 Safari versions",
  "last 2 Edge versions",
  "not dead"
]
```

**Approximate floor (as of March 2026):** Chrome 130+, Firefox 131+, Safari 17.4+, Edge 130+.

**IE11 is not supported** — CSS custom properties are foundational to the design system.

---

## Build Pipeline

| Tool | Purpose |
|---|---|
| `@tailwindcss/vite` | Processes Tailwind utilities and `@theme` tokens |
| `autoprefixer` | Adds vendor prefixes (`-webkit-`, `-moz-`) automatically |
| `browserslist` | Tells autoprefixer which browsers to target |

Configured in `vite.config.ts` → `css.postcss.plugins`. Storybook inherits via `viteFinal`.

**Rule:** Never write vendor prefixes manually. Autoprefixer adds them at build time.

---

## Safe CSS Features (no fallback needed)

All of these are supported across the target browsers:

| Feature | Min browser | Notes |
|---|---|---|
| CSS custom properties (`var()`) | Chrome 49, Safari 9.1, Firefox 31 | Foundation of the design system |
| Flexbox + `gap` | Chrome 84, Safari 14.1, Firefox 63 | Used throughout |
| CSS Grid + `subgrid` | Chrome 117, Safari 16, Firefox 71 | |
| `:focus-visible` | Chrome 86, Safari 15.4, Firefox 85 | Falls back to `:focus` in older |
| `container-type: inline-size` | Chrome 105, Safari 16, Firefox 110 | |
| `@container` queries | Chrome 105, Safari 16, Firefox 110 | Default to mobile layout |
| `clamp()` | Chrome 79, Safari 13.1, Firefox 75 | |
| `aspect-ratio` | Chrome 88, Safari 15, Firefox 89 | |
| `inset` shorthand | Chrome 87, Safari 14.1, Firefox 66 | |
| `prefers-reduced-motion` | Chrome 63, Safari 10.1, Firefox 63 | Graceful degradation |
| `forced-colors` | Chrome 89, Edge 89 | Windows High Contrast only |
| `prefers-contrast: more` | Chrome 96, Safari 16, Firefox 101 | Graceful degradation |
| `grid-template-rows` animation | Chrome 107, Safari 17, Firefox 116 | See graceful degradation below |

---

## Features Requiring `@supports` Fallback

### `color-mix(in srgb, ...)`

**Min browser:** Chrome 111, Firefox 113, Safari 16.4

**Status:** Handled automatically by `cssGenerator.ts`.

The generator writes:
1. `rgba()` fallback values in the base `:root` and `[data-theme="dark"]` blocks
2. Original `color-mix()` values in an `@supports (color: color-mix(in srgb, red 50%, blue))` block

**Component code never touches `color-mix()`.** Components reference shadow tokens by name (`var(--shadow-sm)`), which resolve through the token chain.

**To add new shadow tokens:** Add them in `cssGenerator.ts` shadow section. The generator handles fallback creation automatically. Never hand-edit shadow tokens in `geeklego.css`.

---

## Progressively Enhanced Features (gated by `@supports` in `cssGenerator.ts`)

These features are used but wrapped in `@supports` blocks — older browsers get the fallback behavior automatically:

| Feature | `@supports` condition | Fallback behavior | Added by |
|---|---|---|---|
| `color-mix(in srgb, ...)` | `(color: color-mix(in srgb, red 50%, blue))` | Static `rgba()` values in base block | `cssGenerator.ts` shadow handling |
| `text-wrap: balance` | `(text-wrap: balance)` | Normal text wrapping (no visual breakage) | `cssGenerator.ts` typography block |
| View Transitions API | `(view-transition-name: none)` | Instant theme switch (no animation) | `cssGenerator.ts` semantic utilities |

**To add a new progressively-enhanced feature:** Add a `SupportsEntry` builder function in `cssGenerator.ts`, wire it into the `supportsEntries` array in `generateCss()`, and move the feature from "Forbidden" to this table.

---

## Forbidden CSS Features

Do not use these without first building fallback infrastructure in `cssGenerator.ts`:

| Feature | Why forbidden | Alternative |
|---|---|---|
| `@property` | Safari support incomplete | Use `var()` with defined defaults |
| `anchor-positioning` | Limited support | Use absolute/relative positioning |
| `round()` / `mod()` / `rem()` | Limited CSS math support | Use `calc()` instead |
| `backdrop-filter` without prefix | Needs `-webkit-` | Autoprefixer adds it, but avoid if possible |

---

## Known Graceful Degradations

These features work in all target browsers but degrade in specific older versions:

| Feature | Where used | Degradation | Impact |
|---|---|---|---|
| `grid-template-rows: 0fr→1fr` animation | NavItem expand/collapse | Snaps open/close in Safari <17 | Functional, animation-only loss |
| `container-type: inline-size` | Utility class (`.container-inline`) | Container query doesn't fire | Default (small) layout shown |
| `:focus-visible` | All focusable elements | Falls back to `:focus` | Focus ring shows on click too |

---

## Shadow Token Fallback Pattern

When `cssGenerator.ts` encounters a shadow value containing `color-mix()`:

```
Base block (:root):
  --shadow-sm: 0 1px 2px rgba(17, 24, 39, 0.06), ...;    ← static fallback

@supports (color: color-mix(in srgb, red 50%, blue)) {
  :root {
    --shadow-sm: 0 1px 2px color-mix(in srgb, ... 6%, transparent), ...;  ← dynamic
  }
}
```

The `colorMixToRgba()` function in `cssGenerator.ts` handles:
- Raw hex: `color-mix(in srgb, #111827 6%, transparent)` → `rgba(17, 24, 39, 0.06)`
- Var with fallback: `color-mix(in srgb, var(--color-shadow-neutral, #111827) 6%, transparent)` → uses the `#111827` inline fallback
- Var without fallback: resolves from `tokens.primitives.colors`

---

## Testing Checklist

Before shipping cross-browser sensitive changes:

- [ ] `npm run dev` starts without errors
- [ ] `npm run storybook` renders all stories
- [ ] Shadows visible in light and dark modes
- [ ] Token editor save round-trip preserves `color-mix()` values (not replaced by `rgba()`)
- [ ] `npx vitest` passes all tests
- [ ] (Optional) Open Storybook in Safari — verify shadow fallbacks render
