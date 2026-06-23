# AGENTS.md — GeekLego (v2)

## First Things

Read [`CLAUDE.md`](CLAUDE.md) — it's the single source of truth for the v2 system: the 2-tier
token model (primitives → standard ShadCN/Tailwind semantics), the ShadCN/Radix component
pattern, the file layout, and all the "never" / "always" rules. The reference implementation
is the **Button slice** at [`components/v2/Button/`](components/v2/Button/) — read it before
building anything. `AGENTS.md` only adds operational detail that `CLAUDE.md` omits; where the
two ever disagree, `CLAUDE.md` wins.

> **Package manager is pnpm.** `npm install` is hard-blocked by a `preinstall: only-allow pnpm`
> guard (npm's installer crashes on this pnpm-built tree). Install deps with `pnpm add <pkg>` —
> never `npm install`. Running *scripts* works under either runner (`pnpm run …` ≡ `npm run …`).

## Commands

```bash
pnpm run dev:all          # Token editor cockpit + Storybook side-by-side
pnpm run dev              # Token editor only (Vite, --config vite.config.mts, serves app/)
pnpm run storybook        # Storybook only (port 6006, .storybook/main.ts globs components/v2/**)
pnpm run build            # tsup bundle (components/index.ts, esm+cjs+dts) + build:css
pnpm run build:css        # Compile design-system/v2/index.css → dist/geeklego.css
pnpm run build-storybook  # Static Storybook site (passes — legacy stories/** are not globbed)
pnpm run lint             # ESLint, --max-warnings 0 (also enforces v2 import discipline)
pnpm run lint-css         # Stylelint over design-system/v2/**
pnpm run validate-tokens  # 2-tier chain check (primitive → semantic); must exit 0
pnpm run export-ir        # Export token IR
pnpm run export-design-md # Export design.md
npx tsc --noEmit          # Type-check
npx vitest run            # All tests (app/src/**/*.test.ts + scripts/**/*.test.ts)
```

There is **no `test` script** — run Vitest directly (`npx vitest run`).

## Repo Structure

- **`vite.config.mts`** — app dev server + a live inline plugin that reads/writes
  `design-system/v2/` and `design-system/tokens.metadata.json` (the cockpit's token-CRUD and
  `/api/merge-metadata` endpoints). There is no standalone token-api server.
- **`vitest.config.ts`** — single test project: `app/src/**/*.test.ts` + `scripts/**/*.test.ts`.
  (No separate Storybook/Playwright test project.)
- **`eslint.config.mjs`** — flat config. Enforces v2 import discipline via `no-restricted-imports`:
  bans `**/{atoms,molecules,organisms}/**` and direct `design-system/geeklego.css` imports.
  Baseline is **0 warnings** under `--max-warnings 0`; any new warning fails the gate.
- **`.stylelintrc.mjs`** — stylelint config (scoped to `design-system/v2/**`).
- **`tsup`** — no config file; library build uses tsup defaults for the `components/index.ts` entry.
- **`design-system/v2/`** is the only live stylesheet tree; `design-system/geeklego.css` was
  deleted in the 2-tier cut. `design-system/v2-defaults/` holds the factory-reset baseline.

## Styling / Component Rules (not repeated in CLAUDE.md)

- `"use client"` at the top of any component `.tsx` that uses hooks/refs/interactivity.
- Variants live in a separate `<name>-variants.ts` file using `cva`; merge with `cn()`
  (`clsx` + `tailwind-merge`) from [`components/v2/lib/cn.ts`](components/v2/lib/cn.ts).
- Plain `forwardRef` + `displayName` — **not** `memo(forwardRef(...))` (that was a 3-tier rule).
- Style with standard semantic utilities (`bg-primary`, `border-input`, `ring-ring`) — never
  hardcoded values, never bare arbitrary literals, never inline `style` for a value that could
  be a class. Custom brand variants use namespaced `--ext-*` tokens only.

## New Component Workflow

Author new v2 components via the **`component-builder-v2`** skill. Manually, the shape is:

1. Build under `components/v2/<ComponentName>/`. Check whether a `@radix-ui/react-*` primitive
   already provides the a11y/keyboard/portal surface before hand-rolling anything (Radix-first).
2. Files: `<ComponentName>.tsx`, `<ComponentName>.types.ts`, `<component-name>-variants.ts`
   (omit only if the component has no variants), `<ComponentName>.stories.tsx`. Add a `README.md`
   only when the API/a11y genuinely warrants it — no boilerplate READMEs or `mock-data.json`.
3. Add any genuinely-new core semantic to `design-system/v2/semantics.css` (both `:root` and
   `@theme inline`); add `--ext-*` brand-variant tokens to their own separate block.
4. Write a DarkMode story (set **both** `data-theme="dark"` and `.dark`).
5. Add the component to the [`components/index.ts`](components/index.ts) barrel
   (`export * from './v2/<Name>/<Name>'` + `export type * from './v2/<Name>/<Name>.types'`) so
   `pnpm build` bundles it into the published surface. `export *` also picks up compound
   sub-parts (e.g. `DialogTrigger`) in one line.
6. Verify: `npx tsc --noEmit` + a scoped Storybook/Vite build + `pnpm run lint` +
   `pnpm run validate-tokens` (must exit 0).

There is **no `catalog.ts`** in v2 — the old catalog and `scripts/catalog.ts` were deleted in
the cut. The barrel, however, is live: new v2 components must be re-exported from it (above).

## Testing Quirks

- Storybook content scan under Tailwind v4's `@tailwindcss/vite` does **not** reliably pick up
  classes in a brand-new component file via HMR — restart Storybook before concluding a missing
  utility is a code bug. `build:css` / `build-storybook` always emit it correctly.
- Tailwind v4 `rotate-180` sets the CSS `rotate` property, not `transform` — verify rotation via
  `getComputedStyle(el).rotate`, not `.transform`.
- `validate-tokens` allowlists framework-injected runtime vars (`tw-*`, `radix-*`) in both
  broken-ref passes, so Radix runtime vars used in keyframes/inline styles don't trip the chain.

## Agent Skills

- Local skills in `.claude/skills/`: **`component-builder-v2`** (the v2 generator — use this,
  not the deleted 3-tier `component-builder`) and **`figma-sync`**.
- `component-builder-v2` references live at
  `.claude/skills/component-builder-v2/references/` (`composition-example.md`,
  `radix-primitive-map.md`).

## Key Constraints

- `react` 19, `react-dom` 19, `lucide-react` (`>=0.400 || >=1.0`) are peer deps — never bundle them.
- `pnpm` is the package manager (`packageManager: pnpm@9.15.0`); Node `>=20.0.0`, pnpm `>=9.0.0`.
- Component layer uses `cva` + `cn()` + `clsx` + `tailwind-merge` + `@radix-ui/react-*`
  (install Radix packages per-component when you build). Still **no** `styled-components`,
  `emotion`, or CSS modules.
- All component colors must work in light AND dark mode — the `@theme inline` semantic layer
  makes theme overrides re-theme live.
- ShadCN is not a dependency and its CLI/`components.json` are never wired in — we hand-write off
  the pattern. Use relative imports between v2 files, never package paths.
