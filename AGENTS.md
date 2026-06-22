> ⚠️ This describes the OLD 3-tier system. v2 has landed — see `CLAUDE.md` for the authoritative v2 rules. Ignore this file until refreshed.

# AGENTS.md — Geeklego

## First Things

Read `CLAUDE.md` (616 lines) — it's the single-source-of-truth project guide with all styling rules, component architecture, and "never" rules. `AGENTS.md` only adds what `CLAUDE.md` omits.

## Commands

```bash
npm run dev:all          # Token editor (5173) + Storybook (6006) side-by-side
npm run dev              # Token editor only (vite config at root, app/ directory)
npm run storybook        # Storybook only (port 6006, .storybook/main.ts)
npm run build            # tsup (no config file — uses defaults) + build:css
npm run build-storybook  # Static Storybook site
npm run validate-tokens  # Checks all var() refs, naming conventions, hardcoded values, cross-file refs
npm run lint-css         # Stylelint with custom tier-guard plugin
npx vitest              # 2-project config: unit (node) + storybook (Playwright/Chromium)
npx tsc --noEmit        # Type-checks app/ ONLY — components are checked by Storybook/Vite
npx vitest components/atoms/Button/Button.stories.tsx  # Single story test
npx tsx scripts/catalog.ts  # Regenerate components/catalog.ts after adding a new component
```

**No lint script for TS/TSX** — only `lint-css` for `geeklego.css`.

## Repo Structure

- **`vite.config.ts`** — configures the app dev server + Vitest + inline API plugin (token CRUD endpoints). Storybook uses its own `.storybook/main.ts` with a `viteFinal` hook that deletes `config.root` (token editor sets `root: app/`).
- **`vitest.config.ts`** — independent vitest config for unit tests (`app/src/**/*.test.ts`, `scripts/**/*.test.ts`). Overlaps with `vite.config.ts` test section which handles storybook tests.
- **`tsup`** — no config file; library build uses tsup defaults for `components/index.ts` entry.
- **No ESLint** — only `stylelint` for CSS.

## Styling Rules (not repeated in CLAUDE.md)

- `"use client"` directive on every component .tsx.
- All var() references use `var(--token)` syntax — never `var(--token,)` or bare brackets without `var()`.
- Template literal brackets (`className={\`...\`}`) are forbidden — use `useMemo` with `.join(' ')` or the hoisted-object pattern.
- L1/L2 components wrapped with `memo(forwardRef(...))` (mandatory). L3+ with `memo(forwardRef(...))` (recommended). Bare `memo()` only when component cannot accept a ref. Always set `displayName`.

## New Component Workflow

1. Add CSS tokens in `design-system/geeklego.css` under the `GENERATED COMPONENT TOKENS` section
2. Run `npm run validate-tokens` — must exit 0
3. Create 5 files: `ComponentName.tsx`, `ComponentName.types.ts`, `ComponentName.stories.tsx`, `README.md`, `mock-data.json`
4. Add barrel exports to `components/index.ts`
5. Run `npx tsx scripts/catalog.ts` to update `components/catalog.ts`

## Testing Quirks

- Stories **are** the tests — no separate `.test.ts` files for components.
- Storybook tests run headless Chromium via Playwright (configured in `vite.config.ts` test section).
- A11y checks are `"todo"` mode — violations reported but don't fail CI.
- Unit tests in `vitest.config.ts` cover only `app/src/**/*.test.ts` and `scripts/**/*.test.ts`.
- Vitest has 2 project configs (`unit` and `storybook`).

## Agent Skills

- External skills in `.agents/skills/` are managed by `skills-lock.json` — do not edit by hand.
- Local skills in `.claude/skills/`: `component-builder`, `i18n`, `security`, `state-handling`, `figma-sync`, `screenshot-workflow`.
- Reference docs in `.claude/references/`: component generation flow, storybook templates, token chain examples, cross-browser compat, semantic HTML, component variants.
- Component generation skill lives at `.claude/skills/component-builder/SKILL.md` with token quick reference at `.claude/skills/component-builder/references/token-quick-reference.md`.

## Key Constraints

- `react` 19, `lucide-react` >=0.400, `react-dom` 19 are peer deps — never bundle them.
- `pnpm` is the package manager (per `pnpm-lock.yaml`); `package-lock.json` is gitignored.
- Node >= 20.0.0.
- No `clsx`, `cva`, `cn()`, `styled-components`, `emotion`, or CSS modules.
- All component colors must work in light AND dark mode — token chain ensures this.
- Schema.org is opt-in via `schema?: boolean` prop, default `false`. Microdata on L1-L3, JSON-LD at L4+.
