# GeekLego

An open-source, design-system-first React component library built on **Tailwind CSS v4 + Radix UI**, using a **2-tier token model** (primitives → standard ShadCN/Tailwind semantics).

Fork it, customize the brand palette, and ship your own themed component library.

## Get started

```bash
git clone https://github.com/geeklego/geeklego.git
cd geeklego
npm install
npm run dev:all
```

This starts two tools side-by-side:

| URL | What it is |
|---|---|
| `http://localhost:5173` | Token Editor — edit primitives, semantics, and themes |
| `http://localhost:6006` | Storybook — browse v2 components |

## Requirements

- Node.js 20+
- React 19
- Tailwind CSS v4

## Scripts

```bash
npm run dev:all          # Token editor + Storybook (recommended)
npm run dev              # Token editor only
npm run storybook        # Storybook only
npm run build            # Build library (JS + CSS)
npm run validate-tokens  # Validate primitive → semantic token chain
npm run lint             # ESLint (includes v2 import discipline)
npm run lint-css         # Stylelint over design-system/v2
npx vitest run           # Unit tests
npx tsc --noEmit         # Type-check
```

## Architecture (v2)

```
Tier 1 — Primitives     geeklego brand palette/scales (--color-brand-900, --spacing-4, …)
         ↓ aliased by
Tier 2 — Semantics      ShadCN standard vocabulary (--primary, --background, --border, …)
         ↓ consumed by
Components              Tailwind utilities (bg-primary, text-foreground, border-input)
```

| Path | Purpose |
|---|---|
| `design-system/v2/` | 2-tier CSS — entrypoint is `index.css` |
| `components/v2/` | ShadCN-pattern components (`cva` + `cn()` + Radix) |
| `components/v2/Button/` | Reference implementation — read before building anything new |
| `app/` | Token Editor cockpit (v2 model) |

**Governing docs:** [`CLAUDE.md`](CLAUDE.md) · [`PROTOTYPE-SHADCN-2TIER.md`](PROTOTYPE-SHADCN-2TIER.md)

> **Note:** `AGENTS.md`, `DESIGN_SYSTEM.md`, and `docs/` still describe the old 3-tier system. Ignore them until refreshed.

### Shipped v2 components

Button · Combobox · Command · CommandPalette · Dialog · Popover

## Using components & styles

Within this repo, import v2 components directly:

```tsx
import { Button } from "./components/v2/Button/Button";
import "./design-system/v2/index.css";

<Button variant="default">Click me</Button>
```

The published `@geeklego/ui` package currently exports shared utilities and CSS:

```tsx
import { GeeklegoI18nProvider } from "@geeklego/ui";
import "@geeklego/ui/styles";           // compiled CSS
// or during development:
import "@geeklego/ui/styles-source";   // source design-system/v2/index.css
```

v2 component re-exports through the package barrel are planned; for now use direct path imports or copy from `components/v2/`.

## Custom brand variants

Brand-specific variants use namespaced `--ext-*` tokens (e.g. Button's `gamified` variant), defined in `design-system/v2/semantics.css` and consumed via utilities like `bg-ext-button-gamified-bg`.

## AI-assisted development

This repo ships Claude Code skills under `.claude/skills/`:

| Skill | Purpose |
|---|---|
| `component-builder-v2` | Generate new v2 components |
| `figma-sync` | Sync design tokens from Figma |
| `security` | XSS / href sanitization audit |
| `i18n` | Localization patterns |
| `state-handling` | Visual state handling audit |

> Use **`component-builder-v2`**, not the deleted 3-tier `component-builder` skill.

## License

MIT

## Built by GeekyAnts

GeekLego is open-sourced and maintained by [GeekyAnts](https://geekyants.com) — engineering for the AI era, turning ambitious technology strategies into production-grade reality since 2006.

Building AI-native products? Explore [GeekyAnts AI Services](https://geekyants.com/ai).
