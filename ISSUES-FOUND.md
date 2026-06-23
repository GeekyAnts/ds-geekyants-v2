# Issues found during Accordion build (2026-06-22) — ALL FIXED

A log of every pre-existing issue, bug, and friction point encountered while building
`components/v2/Accordion/`. These are **not** caused by the Accordion work — they were
already present (except where noted as "introduced and fixed in this session").

> **STATUS: all five issues have now been fixed at the root** (see the "Fix applied"
> note under each, and the resolution summary at the bottom). Final state: `pnpm run lint`
> exits **0 warnings** under a `--max-warnings 0` gate, `npx tsc --noEmit` clean,
> `pnpm run validate-tokens` exits 0, 13/13 tests pass, `pnpm run build` +
> `pnpm run build-storybook` succeed.

---

## 1. `npm install` crashes on this repo's node_modules — BLOCKER

**Severity:** High (blocks the documented workflow)

- `npm install @radix-ui/react-accordion` fails immediately with:
  ```
  npm error Cannot read properties of null (reading 'matches')
      at Link.matches (.../@npmcli/arborist/lib/node.js:1183:41)
      at Link.canDedupe (.../@npmcli/arborist/lib/place-dep.js ...)
  ```
- Fails even with `--legacy-peer-deps`, `--prefer-offline`, and `--dry-run`.
- **Root cause:** `node_modules` was built by **pnpm** (there is a `node_modules/.pnpm`
  store and `pnpm-lock.yaml` is the live lockfile). npm's arborist cannot reconcile the
  pnpm-style symlinked tree during dedupe and throws.
- **Workaround that works:** `pnpm add <pkg>` (pnpm 9.15.0 is on PATH). Used this to
  install `@radix-ui/react-accordion@1.2.14`.

**Contradicts the docs.** Both `CLAUDE.md` and the `component-builder-v2` skill said:
> "use npm — it's what's wired here, despite pnpm appearing in `engines`."

That guidance was correct for `npm run <script>` (the scripts run fine) but **wrong for
installing new packages**.

**Fix applied (root cause):**
- Added a `preinstall: "only-allow pnpm"` script to `package.json` that **hard-blocks**
  `npm install`/`yarn` with a clear "Use pnpm install for this project" message.
  (`only-allow` pinned as a devDependency so preinstall uses the local copy.)
- `package.json` already had `packageManager: "pnpm@9.15.0"` + `engines.pnpm`; the guard
  makes it enforced rather than advisory.
- Rewrote the misleading line in `CLAUDE.md` (§Commands) and converted the command table
  to `pnpm run …`, with an explicit "Install a dependency → `pnpm add` (never npm)" row.
- Fixed the install instruction in `SKILL.md`, `references/radix-primitive-map.md`, and
  the `evals/evals.json` Tooltip eval (which had asserted "uses npm, NOT pnpm" — flipped).
- Also repointed two internal scripts (`dev:all`, `build`) from `npm run` to `pnpm run`.
- Verified: `pnpm install` still succeeds (guard passes pnpm); the guard fires for npm.

---

## 2. Token validator's CSS-chain pass did not allowlist framework runtime vars — BUG (fixed this session)

**Severity:** Medium (false-positive that fails `npm run validate-tokens`, a real gate)

- After adding the Accordion (which references Radix's runtime var
  `--radix-accordion-content-height` inside the `@keyframes`), `npm run validate-tokens`
  failed with:
  ```
  ✕  1 broken reference(s) found:
     var(--radix-accordion-content-height)   (first seen: concatenated line 728)
  ```
- **Root cause:** `scripts/validate-tokens.ts` has **two** passes that scan for broken
  `var()` references:
  - `validateComponentTokenRefs` (scans component `.tsx`) — **correctly** skips
    `FRAMEWORK_INTERNAL_PREFIXES = ['tw-', 'radix-']` (line ~221).
  - `validateCssTokens` (scans the concatenated CSS chain) — **did NOT** apply that same
    allowlist. So any `radix-*` / `tw-*` var used inside the design-system CSS (legitimately,
    e.g. in a keyframe) was reported as a broken chain.
- This is a latent bug: it would have fired for **any** component that uses a Radix runtime
  var in CSS, not just Accordion. The existing Popover/Dialog don't reference Radix runtime
  vars *in CSS* (they use `data-[state]` attribute variants in TSX only), so it had never
  been triggered before.
- **Fix applied (root cause):** added the same `FRAMEWORK_INTERNAL_PREFIXES` skip to
  `validateCssTokens` so both broken-ref passes behave identically. Validator unit tests
  pass; `validate-tokens` exits 0. Documented the allowlist in CLAUDE.md §Verification and
  SKILL.md §Verify so future Radix components using runtime vars in CSS won't re-trip it.

---

## 3. Storybook's live Tailwind compile is stale / unreliable on new files — FRICTION

**Severity:** Low–Medium (verification friction, not a shipped bug)

- After creating the Accordion story, the running Storybook's live stylesheet did **not**
  contain the `[&[data-state=open]>svg]:rotate-180` rule — the chevron read
  `rotate: 0deg` even when the item was open.
- A `window.location.reload()` did **not** fix it; the variant still wasn't compiled.
- **Only a full Storybook restart** (`preview_stop` + `preview_start`) made Tailwind
  re-scan and emit the rule. After restart the chevron correctly computed `rotate: 180deg`
  on open.
- **Root cause:** Tailwind v4's `@tailwindcss/vite` auto-source-detection under Storybook's
  dev server doesn't reliably pick up classes in brand-new files via HMR — the content scan
  is cached until a clean boot. The same class compiles fine in the standalone
  `tailwindcss` CLI build (`npm run build:css` → `dist/geeklego.css` contains the rule).
- **Impact:** purely a dev/verification gotcha. Shipped output is correct.
- Secondary confusion this caused: `getComputedStyle(el).transform` reads `none` for a
  Tailwind v4 `rotate-180` because v4 uses the standalone CSS `rotate` property, not
  `transform`. Check `.rotate`, not `.transform`, when verifying rotation.
- **Fix applied (documentation/process):** can't change Tailwind's HMR caching, so the fix
  is to make the gotcha known so it never costs debugging time again. Added a **"Storybook
  HMR caveat"** to CLAUDE.md §Verification and a matching note to SKILL.md §Verify:
  *if a just-written utility looks "missing" in the running Storybook, restart Storybook
  before assuming the code is wrong; `build:css` / `build-storybook` always emit it.* The
  `rotate` vs `transform` v4 detail is documented alongside it.

---

## 4. 60 pre-existing ESLint warnings across the repo — PRE-EXISTING

**Severity:** Low (warnings, not errors — lint still exits 0-error)

`npm run lint` reports **60 warnings, 0 errors**, spread across 37 files. None are in the
new Accordion files. Notable categories:

- **`react-hooks/rules-of-hooks` (real smell):**
  `components/v2/Combobox/Combobox.stories.tsx:37` — `useState` called inside a `render`
  function that isn't a component/hook. This is in shipped v2 library story code, not the
  app, so it's the most worth-fixing one.
- **`react-hooks/exhaustive-deps`:**
  `stories/DesignSystem.stories.tsx:57` — `useEffect` with a `setV` call and no dep array,
  flagged as a possible infinite-update chain.
- **Unused vars / args** (`@typescript-eslint/no-unused-vars`): `app/src/views/ScaleView.tsx`,
  `app/src/views/TokenRow.tsx`, `stories/DesignSystem.stories.tsx`, and others.
- **Unused eslint-disable directive:** `components/utils/i18n/useGeeklegoI18n.ts:51`.

Bulk: ~35 of the 37 files are under `app/` (the Token Editor cockpit) and
`app/src/editor-ds/` stories.

**Fix applied (root cause): all 60 warnings eliminated, then the gate hardened so they
can't come back.**
- **3 shipped-code warnings:**
  - `Combobox.stories.tsx` — extracted the controlled render into a real
    `ControlledCombobox` component so `useState` is a legitimate hook call (no more
    `rules-of-hooks`). Verified in-browser: still renders "Remix" + echoes `remix`.
  - `stories/DesignSystem.stories.tsx` — removed the dead `isBright` state and gave the
    `useEffect` its `[containerEl, token]` dep array.
  - `useGeeklegoI18n.ts` — removed the now-unnecessary `eslint-disable` directive (deps
    were already exhaustive).
- **~47 `no-unused-vars` in `app/`** — removed dead imports/locals, prefixed
  intentionally-unused positional args with `_`, and preserved used `useState` halves.
  Deleted helpers verified unreferenced (`getDefaultTokenValue`, `collectSemanticNames`).
  `tsc --noEmit` stayed clean throughout.
- **~8 `react-hooks/exhaustive-deps`** — handled by judgment, not blanket disabling:
  - Genuine bug fixed in `OnboardingTour.tsx`: wrapped `handleNext`/`handleBack` in
    `useCallback` and added them to the keydown effect's deps.
  - The `pendingVersion`/`tick` "unnecessary dependency" warnings (PendingModal,
    PendingDrawer ×2, CategoryPage ×2) are **load-bearing version counters** bumped by
    `subscribeToPendingChanges`/`subscribeToDraftChanges` to re-read non-reactive external
    stores. Removing them would break recompute-on-change, so each got a **scoped
    `eslint-disable` with an explanatory comment** — preserving behavior.
  - `router.tsx` `useRouteEffect` is a custom passthrough hook whose spread `...deps` and
    excluded `effect` are its intended API — scoped disable + comment.
- **Hardened the gate:** flipped `lint` to `eslint --max-warnings 0` in `package.json`, so
  **any** future warning fails the build. Repo baseline is now 0/0.

---

## 5. Documentation drift — PRE-EXISTING

**Severity:** Low

- `AGENTS.md` and `DESIGN_SYSTEM.md` described the old 3-tier architecture (and a Next.js
  docs-site aesthetic) that no longer exists.
- The `build-storybook` "fails on `stories/Configure.mdx`" caveat in CLAUDE.md was itself
  **stale** — `.storybook/main.ts` already globs only `components/v2/**`, so the legacy
  `stories/**` is excluded. Verified `pnpm run build-storybook` **passes** today.

**Fix applied (root cause):**
- Strengthened the deprecation banners on `AGENTS.md` + `DESIGN_SYSTEM.md` to "DEPRECATED —
  DO NOT FOLLOW," explicitly flagging the stale npm commands and pointing to CLAUDE.md.
- Corrected the CLAUDE.md `build-storybook` row to state it passes (and *why* — the glob
  scope), removing the false "known failure" caveat. Removed the matching stale caveat from
  SKILL.md §Verify too.

---

## Summary table

| # | Issue | Type | Status |
|---|---|---|---|
| 1 | `npm install` crashes (pnpm-built node_modules); docs said "use npm" | Blocker / doc bug | **FIXED** — `preinstall` guard blocks npm; all docs + scripts switched to pnpm |
| 2 | `validateCssTokens` didn't allowlist `radix-*`/`tw-*` runtime vars | Latent bug | **FIXED** — same allowlist added to the CSS-chain pass; documented |
| 3 | Storybook HMR misses Tailwind classes in new files; needs restart | Tooling friction | **FIXED (process)** — caveat documented in CLAUDE.md + SKILL.md |
| 4 | 60 ESLint warnings (incl. a real hooks-rule violation) | Code smell | **FIXED** — all 60 cleared; `--max-warnings 0` gate added so they can't recur |
| 5 | Stale 3-tier docs + a false `build-storybook` caveat | Doc drift | **FIXED** — banners hardened; CLAUDE.md/SKILL.md corrected |

**All five fixed at the root.** Verification: `pnpm run lint` → 0 warnings (under the new
`--max-warnings 0` gate) · `npx tsc --noEmit` clean · `pnpm run validate-tokens` exits 0 ·
`npx vitest run` 13/13 pass · `pnpm run build` + `pnpm run build-storybook` succeed ·
Token Editor and Storybook both render with no console errors.
