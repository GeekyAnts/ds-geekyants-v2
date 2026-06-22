# Token Editor → v2 Cockpit Rebuild Plan

> **Status:** Approved plan, not yet started · **Owner:** Bitta · **Date:** 2026-06-21
> **Scope decision:** FULL v2 cockpit rebuild (user-confirmed).
> **Companion docs:** `PROTOTYPE-SHADCN-2TIER.md` (§4 cockpit mandate, §7.5 cut), `CLAUDE.md` (v2 architecture).
> **Pick-up note for a fresh session:** the §7 gate has PASSED and the §7.5 CSS+components cut is DONE. This plan is the deferred Step-4 tail — adapting the Token Editor `app/` to 2-tier. The editor is currently **broken on purpose** (imports the deleted `components/catalog`, reads the removed `GENERATED COMPONENT TOKENS` marker). Read this whole file, then `CLAUDE.md`'s "Repo state" table, before touching `app/`.

---

## Context — why this rebuild

The §7.5 cut truncated `design-system/geeklego.css` to 2-tier and deleted the old components + `components/catalog.ts`, deliberately leaving the **Token Editor (`app/`) broken**: it imports the deleted catalog (crash on load) and reads/writes the removed `GENERATED COMPONENT TOKENS` marker.

Deeper investigation revealed the real problem is bigger than "unbreak it": **the editor's entire semantic model is the OLD 3-tier vocabulary** — a deeply-nested `SemanticBlock` (`bg`/`surface`/`text`/`action`/`status`/`state` groups + shadows/spacing/typography/motion), keyed off names like `--color-bg-primary`. It also reads/writes the **wrong file** (`design-system/geeklego.css`, which **nothing in v2 consumes**). The live v2 design system lives in `design-system/v2/` (`primitives.css` + `semantics.css` + `themes/dark.css`) using the **flat ShadCN vocabulary** (`--primary`, `--background`, `--border`, …). The two models barely overlap, and **~30 editor files** are wired to the old shape.

**Decision (user): full v2 cockpit rebuild.** Make the editor genuinely control `design-system/v2/`: replace the semantic model with the flat v2 set, rewire the consumers, re-target file I/O to the three v2 files, and strip all component-tier machinery. Outcome: a working cockpit where editing a semantic (e.g. `--primary`) or a theme (light/dark) writes back to `design-system/v2/` and re-themes the live v2 components.

This is what makes the editor a **real v2 cockpit** — the rejected alternative (just unbreaking it against `geeklego.css`) would have left it editing a dead file that v2 components don't read.

---

## The v2 file structure the editor must read/write (verified on disk)

- **`design-system/v2/primitives.css`** (629 lines) — `@import "tailwindcss"` + `@source not "../../.claude"` + `@theme { palette }` (**canonical**) + a `:root { }` **mirror** of the same primitives (browsers can't read vars inside `@theme`). Tier 1, edited rarely.
- **`design-system/v2/semantics.css`** (106 lines) — three parts:
  1. `:root { --primary: var(--color-brand-900); … }` — flat aliases, the **canonical/editable** layer (~20 ShadCN tokens incl. `--radius`).
  2. `@theme inline { --color-primary: var(--primary); … }` — Tailwind registration, a **derived mirror** (regenerate). `--radius` expands to a fixed 4-line `calc()` scale (`--radius-sm/md/lg/xl`), **not** a `--color-radius`.
  3. A separate `--ext-*` custom-variant block with its **own** `:root` + `@theme inline` pair (e.g. `--ext-button-gamified-bg`). Note `--ext-button-gamified-shadow` is registered in `:root` but **NOT** in `@theme inline` (it's a shadow, not a color).
- **`design-system/v2/themes/dark.css`** (43 lines) — `[data-theme="dark"], .dark { … }` re-aliasing the same semantic keys to different primitives + one `--ext-button-gamified-shadow` override **interleaved inside** the same block.
- **`design-system/v2/index.css`** — just `@import`s the three in order.

**⚠ Two opposite canonical polarities (the central trap):**
- **Primitives:** `@theme` is canonical, `:root` mirror is regenerated.
- **Semantics:** `:root` is canonical, `@theme inline` is regenerated.

Easy to invert by analogy and silently lose edits. The generator must regenerate the correct mirror on each side.

---

## Approach — new flat v2 model alongside the old, then cut over

Introduce a `GeeklegoTokensV2` model + v2 parse/generate paths **rather than contorting the old `SemanticBlock`**. Cut the editor over, then delete the old 3-tier model + consumers. Staged so the app reaches a *running* state as early as possible (kill the crash first), with `tsc --noEmit` green at each phase boundary — not a big-bang.

### Phase 0 — Kill the crash (app loads again) ✅ DONE (2026-06-21)
> **Plan correction made during execution:** the original plan said *delete* `componentTokenParser.ts` and `storybook.ts` ("no surviving consumer"). That was wrong — both have live Phase-4/5 consumers (`componentTokenParser.ts` → `EditorShell.tsx`, `vite-plugin/token-api.ts`, `utils/exportFormatter.ts`; `storybook.ts` → `components/ComponentPreview.tsx`, `components/ComponentPreviewFrame.tsx`). Deleting them in Phase 0 would have cascaded **new** tsc errors into those files, violating the "app loads / tsc resolves" gate. The actual crash was solely the deleted `../../../components/catalog` import. So Phase 0 **severed only that import** and left the files (and their consumers) intact for Phase 5 to delete.

- **`app/src/ia/classify.ts`** — removed the `components/catalog` import; `KNOWN_COMPONENTS` is now `[]` (correct: v2 has no component tokens). Kept the now-empty-iterating `getComponentNameFromToken`/`getKnownComponents`/`getTokenCategory` + the component-discovery branch (they no-op against the empty list) so `ia/index.ts` re-exports and `classify.test.ts` still compile. Did **not** touch `ia/index.ts` (its re-exports still resolve).
- **`app/src/utils/storybook.ts`** — removed the catalog import; `COMPONENT_LEVEL_MAP = {}` (every component now resolves to the no-preview state, correct for v2). `componentToStoryId`/`getAvailableStories`/`hasStorybookStory` kept (consumers untouched).
- **`app/src/utils/componentTokenParser.ts`** — removed the catalog import; `COMPONENT_LEVEL_MAP = {}`. Whole file flagged in-comment as Phase-5 removal; left compiling for its consumers.
- **Gate met:** `npx tsc --noEmit` 27 → 18 errors (all 3 catalog errors + 6 downstream errors in the two utils files cleared); the remaining 18 are the **pre-existing, out-of-v2-scope `@storybook/react` import errors in `*.stories.tsx` only** (SB10 ships `@storybook/react-vite`). Zero non-storybook errors. App boots: `vite --config vite.config.mts app` ready in ~0.7s, `/` → HTTP 200, and the four previously-crashing modules (`classify.ts`, `storybook.ts`, `componentTokenParser.ts`, `EditorShell.tsx`) all transform 200 with no resolve errors. (`componentTokenParser.test.ts` was **not** deleted — file kept, so its test is fine.)

### Phase 1 — Types: the flat v2 model (`app/src/types.ts`) ✅ DONE (2026-06-21)
> **Scope resolved as additive-only (user-confirmed).** The original spec was internally contradictory — it said both "do **not** delete the old types yet" and "Remove component types … and `'components'` from `TabId`." The component types (`ComponentToken*`, `TypographyMapping`) and the `'components'` TabId are referenced by ~10 consumer files (EditorShell, Inspector, NavRail, ContextPane, PendingDrawer/Modal, classify.\*, routes.ts, exportFormatter, variantGrouping, ExportModal); removing them now would break the "tsc green at each phase boundary" gate. Their removal is **deferred to Phase 5** (which already owns "delete the now-unused old types/functions once no consumer references them"). Phase 1 only **added** the v2 model.
>
> **Added to `app/src/types.ts`** (after `GeeklegoTokens`): `V2SemanticKey` (20-key ShadCN union), `V2_SEMANTIC_KEYS` (the runtime allowlist const, for the Phase-2 `applyV2SemanticToken` strict match), `V2Semantics` (flat `{[key:string]: string}` map — string-keyed for forward-compat, allowlist enforced at parse/apply layer), `V2ExtBlock` (`{rawBlock, darkOverride}` opaque passthrough), and `GeeklegoTokensV2` (`{primitives: Primitives (reused), semantics: {light, dark}, ext}`). The old types/`TabId` left untouched.
> **Gate met:** `npx tsc --noEmit` output **byte-identical to baseline** (18 errors, all pre-existing `@storybook/react` story errors, 0 non-storybook errors).

Original spec (component-type removals re-scoped to Phase 5):
```ts
type V2SemanticKey = 'background'|'foreground'|'primary'|'primary-foreground'|
  'secondary'|'secondary-foreground'|'muted'|'muted-foreground'|'accent'|
  'accent-foreground'|'destructive'|'destructive-foreground'|'border'|'input'|
  'ring'|'card'|'card-foreground'|'popover'|'popover-foreground'|'radius'
interface V2Semantics { [k: string]: string }            // flat alias map
interface GeeklegoTokensV2 {
  primitives: Primitives                                  // reuse existing shape
  semantics: { light: V2Semantics; dark: V2Semantics }
  ext: { rawBlock: string; darkOverride: string }         // opaque passthrough
}
```
Remove component types (`ComponentToken*`, `TypographyMapping`) and `'components'` from `TabId`.

### Phase 2 — Parser (`app/src/utils/cssParser.ts`) ✅ DONE (2026-06-21)
> **Implemented (additive — old `parseGeeklegoCss` + `applySemanticToken` left untouched):** added `parseGeeklegoV2(primCss, semCss, darkCss): GeeklegoTokensV2` orchestrator + `parseV2Primitives` / `parseV2Semantics` / `parseV2Dark` + the `applyV2SemanticToken` allowlist (matches `V2_SEMANTIC_KEYS` via a `Set`; no-ops on everything else) + a brace-depth-aware `extractBlockBody(css, predicate)` helper + `splitV2SemanticsExt` (carves the opaque `--ext-*` blob off at the `CUSTOM VARIANTS` header).
> - **Polarity trap handled:** `parseV2Primitives` reads ONLY the `@theme` block (`:root` mirror ignored); `parseV2Semantics` reads ONLY the first `:root` (the `@theme inline` registration is ignored — regenerated by the Phase-3 generator). The allowlist makes feeding the *wrong* file harmless (verified: primitives.css → `parseV2Semantics` yields `{}`).
> - **`--ext-*` opaque:** `semantics.css` ext section captured verbatim into `ext.rawBlock` (header→EOF); the `themes/dark.css` interleaved `--ext-button-gamified-shadow` routed to `ext.darkOverride`; core dark keys go to `semantics.dark`. **(Refined in Phase 3:** `splitV2SemanticsExt` now rewinds to the preceding `/*` comment-open line so the captured `rawBlock` starts with a well-formed comment, not the bare marker line — see the Phase 3 bug note.)
> - **Bug found & fixed by the smoke test:** the dark selector is a **two-line preamble** (`[data-theme="dark"],\n.dark {`); the first `extractBlockBody` required `{` on the matched line, so the whole dark block was skipped. Fixed to allow a multi-line selector preamble (match selector → wait for `{` → collect body). Single-line openers (`:root {`, `@theme {`) behave identically.
> - **Verified:** `tsc --noEmit` byte-identical to baseline (18, all storybook). Functional smoke test against the **real** `design-system/v2/*` files — 20/20 (primitives from `@theme`, exactly 20 light semantics, `primary`/`radius`/dark `primary`+`background` correct, ext rawBlock + darkOverride captured, no mirror/registration/ext leakage into core). Polarity-trap probe 🟢.

Original spec:
- **Keep** `applyThemeToken` + the `@theme` state machine for primitives (unchanged — primitives round-trip today).
- Add `parseV2Primitives(css)` — run the existing machine, retain only the `@theme` result (ignore the `:root` mirror).
- Add `parseV2Semantics(css)` — parse the first `:root {}` into `semantics.light` (flat name→value); skip `@theme inline`; capture the `--ext-*` section (boundary = first `--ext-` token / the `CUSTOM VARIANTS` header) into `ext.rawBlock`.
- Add `parseV2Dark(css)` — parse `[data-theme="dark"], .dark {}` (existing `startsWith('[data-theme="dark"]')` check already matches); route non-ext → `semantics.dark`, `--ext-*` → `ext.darkOverride`.
- Add `applyV2SemanticToken` — **allowlisted to the `V2SemanticKey` set only**, no-ops on everything else (critical: must NOT match primitive mirror names). Parse each file with an explicit **mode flag** — a bare `:root {}` means "ignore (primitive mirror)" in primitives.css but "canonical light semantics" in semantics.css.
- Add orchestrator `parseGeeklegoV2(primCss, semCss, darkCss): GeeklegoTokensV2`.
- Remove dead `[data-theme="light"]` / `sawRootComma` two-line handling (v2 never uses it).

### Phase 3 — Generator (`app/src/utils/cssGenerator.ts`) ✅ DONE (2026-06-21)
> **Implemented (additive — old `generateCss` and its helpers untouched):** `generateGeeklegoV2(t): {primitives, semantics, dark}` orchestrator + `generateV2Semantics` / `generateV2Dark` / `generateV2Primitives`.
> - **Polarity mirrored correctly:** `generateV2Primitives` reuses `generateThemeBlock` (emits `@theme` canonical + `:root` mirror), splices in the v2 header + `@source not "../../.claude";`. `generateV2Semantics` emits the `:root` aliases (canonical, in fixed `V2_SEMANTIC_KEYS` order so output is deterministic regardless of parse order) then regenerates `@theme inline` as a derived mirror.
> - **`--radius` special case:** stays a single canonical alias; in `@theme inline` it expands to the fixed `--radius-sm/md/lg/xl` `calc()` scale — **no `--color-radius`** emitted (verified).
> - **`--ext-*` opaque:** `ext.rawBlock` appended to semantics verbatim; `ext.darkOverride` interleaved verbatim before the dark block's close brace.
> - **BUG found by eyeballing the generated output (not caught by the structural test):** the `CUSTOM VARIANTS` marker sits on the *middle* line of a multi-line comment whose `/*` opener is the line ABOVE it; the Phase-2 `splitV2SemanticsExt` cut at the marker line, so the generated `semantics.css` emitted a **dangling comment body with no `/*`** (malformed CSS). Fixed the splitter to rewind to a preceding unterminated `/*` comment-open line. Generated `semantics.css` now has balanced comments (5 `/*` / 5 `*/`).
> - **Verified:** `tsc --noEmit` byte-identical to baseline (18, all storybook). **Round-trip test (parse → generate → re-parse) 21/21:** `light`/`dark`/`primitives.colors`/`primitives.radius` models byte-identical across the cycle (Risk #1 polarity NOT inverted, no edits lost); ext rawBlock + darkOverride survive (Risk #3); **idempotent** — `gen(t1) === gen(parse(gen(t1)))` for all three files (no drift on repeated saves). Generated files structurally sound (`:root`+`@theme inline`+radius calc scale in semantics; dual `[data-theme="dark"], .dark` selector in dark; `@import`+`@source`+`@theme` in primitives).
> - **NOTE for Phase 4 verification:** primitives round-trip preserves all token *values* but **normalizes comment layout/indentation** (the source `primitives.css` has idiosyncratic leading-space indentation; the generator emits clean 2-space). Since primitives are Tier-1/rarely-edited and the cockpit's editing surface is semantics+themes, this is acceptable per plan; the live re-theme test (Phase 4/5) confirms the chain still resolves.

Original spec:
- Add `generateV2Primitives(t)` — adapt `generateThemeBlock` (already emits `@theme` + `:root` mirror); add the v2 header + `@source not "../../.claude";`.
- Add `generateV2Semantics(t)` — header → `:root {}` aliases → `@theme inline {}` rebuilt deterministically (`--color-X: var(--X);` per non-radius key; the fixed radius `calc()` scale as a template fragment) → append `ext.rawBlock` **verbatim**.
- Add `generateV2Dark(t)` — `[data-theme="dark"],\n.dark {` → `semantics.dark` aliases → `ext.darkOverride` → `}`.
- Do **not** reuse `generateLightBlock`/`generateDarkBlock` (old `--color-bg-*` vocab + color-mix machinery v2 doesn't use).

### Phase 4 — File I/O + cutover (the long pole) ✅ DONE (2026-06-21)
> **Scope:** user chose to **pull Phase 5's component-tier strip forward into Phase 4** so every consumer is rewired ONCE to the clean flat model (not twice). Phase 5 now only owns validator + defaults + dead-type cleanup.
>
> **⚠ PLAN CORRECTION (important):** the live token API is **NOT** `app/src/vite-plugin/token-api.ts` — that file is a dead/duplicate copy not wired into the build. The real plugin is an **inline `tokenApiPlugin()` in `vite.config.mts`** (it lazily `import()`s the parser/generator). The live round-trip test caught this (server kept returning the old nested shape after I'd edited the standalone file). I rewrote the **inline** `vite.config.mts` plugin to the v2 path; the standalone file was also rewritten to match (harmless, unimported — Phase 5 can delete it). Vite config plugins do NOT HMR — must restart the dev server to pick up changes.
>
> **Done:**
> - **`vite.config.mts` (live plugin):** `/api/load-tokens` reads the three v2 files → `parseGeeklegoV2`; `/api/save-tokens` → `generateGeeklegoV2` writes all three; `/api/restore-default` restores from a lazy `design-system/v2-defaults/` snapshot; **deleted** `/api/component-tokens` + `/api/save-component-tokens` + the marker-splice + the old no-op-date-compare. (`app/src/vite-plugin/token-api.ts` rewritten identically for consistency.)
> - **`EditorShell.tsx`:** state → `GeeklegoTokensV2`; removed `componentGroups` state + all 4 component-token fetches + the save-component POST; `flattenTokens`/`collectTokenNames` rewritten for the flat map (semantic CSS name = `--<key>`, classifier name = bare key); dropped `componentGroups` props from NavRail/ContextPane/Inspector/PendingDrawer/PendingModal/ExportModal.
> - **Consumers rewired to flat model (3 parallel agent groups):** `graph/build.ts`, `tokenValidator.ts`, `driftValidator.ts`, `exportFormatter.ts` (now uses `generateGeeklegoV2` + flat staged-edit application; `generateMergedTokens` takes/returns `GeeklegoTokensV2`), `ia/classify.ts`+`classify.types.ts` (dropped `'components'` IATopLevel), `Inspector`, `ContextPane`, `NavRail`, `CategoryPage`, `AddTokenDialog`, `PendingModal`, `PendingDrawer`, `ExportModal`. Plus 3 files no agent owned, fixed by hand (pure type swaps, no nested deref): `ImpactSummary.tsx`, `outOfScaleValidator.ts`, `validateAll.ts`.
> - **Component tier STRIPPED:** deleted `views/ComponentPage/`, `utils/componentTokenParser.ts`(+test), `utils/variantGrouping.ts`; removed the `'components'` route from `routing/routes.ts`+`index.ts`; removed `'components'`+`'typography'` from `TabId`. (Old `ComponentToken*`/`TypographyMapping` interfaces still in types.ts — Phase 5 deletes once confirmed unreferenced.)
> - **`package.json`** `build:css` input → `./design-system/v2/index.css` (verified: builds clean, dist resolves `--primary: var(--color-brand-900)` + dark override).
>
> **Verified END-TO-END via the real running dev server (not just tsc):**
> - `tsc --noEmit`: 18 errors, ALL pre-existing `@storybook/react` story errors, **0 non-storybook** (= baseline).
> - Live `GET /api/load-tokens` → correct v2 shape (top keys `primitives,semantics,ext`; 20 flat semantics; `light.primary`/`dark.primary`/`ext.rawBlock` all correct).
> - Live round-trip: edit `light.primary` → `POST /api/save-tokens` → `semantics.css :root` updated, `@theme inline` regenerated consistently, radius calc scale intact, `--ext-*` byte-preserved, `dark.css` dual-selector + dark primary untouched, snapshot taken.
> - Live re-theme: `build:css` after save → dist shows `--primary:var(--color-accent-500)` (cockpit controls the real system).
> - `restore-default` → all three files byte-identical to pre-test originals. Working tree left pristine (test snapshot dir removed, dist rebuilt from originals).

Original spec:
- **`app/src/vite-plugin/token-api.ts`:** repoint path constants to `design-system/v2/{primitives,semantics,themes/dark}.css`. `/api/load-tokens` reads all three → `parseGeeklegoV2`. `/api/save-tokens` generates + writes all three (drop the marker-splice logic). Delete `/api/component-tokens` + `/api/save-component-tokens`. `/api/restore-default` → per-file snapshots in a NEW `design-system/v2-defaults/` dir (snapshot lazily on first save; safer than `.default.css` siblings that `index.css` could accidentally import).
- **`package.json`** `build:css`: input `./design-system/geeklego.css` → `./design-system/v2/index.css`.
- **`app/src/EditorShell.tsx`:** switch to `GeeklegoTokensV2`; remove `componentGroups` state + the **4** `/api/component-tokens` fetches + the save-component POST; rewrite `flattenTokens`/`collectTokenNames`/`SEMANTIC_PREFIX` for the flat model.
- **Rewire the ~30 old-`SemanticBlock` consumers** to the flat model. Load-bearing first: `graph/build.ts` (token graph), `ia/classify.ts` + `ia/categoryCopy.ts` + `ia/classify.types.ts` (IA/nav vocab), `utils/exportFormatter.ts`, `utils/tokenValidator.ts` + `validators/driftValidator.ts`, views (`CategoryPage`/`CategoryGroup`/`ScaleView`/`Inspector`/`ContextPane`), dialogs (`AddTokenDialog`/`FilterBar`/`PendingModal`/`InlinePreview`/`OnboardingTour`). Pattern: replace nested-group iteration with iteration over the flat `V2Semantics` map — many simplify substantially. (`editor-ds/` stories are the editor's own UI kit — adjust only if they fail type-check.)

### Phase 5 — Strip remaining component UI + validator + defaults ✅ DONE (2026-06-22)
> **Implemented & verified end-to-end (tsc + vitest + validate-tokens + full build):**
> - **(a) `scripts/validate-tokens.ts` → 2-tier:** now reads the three v2 files concatenated (`design-system/v2/{primitives,semantics,themes/dark}.css`) and globs `components/v2/**/*.{tsx,ts}`. **Dropped** the component-tier passes `validateNoCrossBlockComponentDuplicates`, `validateTokenNamingConvention`, `validateNoPrimitiveRefsInComponents` (+ orphaned helpers `MISPLACED_PREFIXES`/`isPrimitiveRef`/`PRIMITIVE_TOKEN_PREFIXES`/`pascalToKebab`). **Kept** `validateCssTokens` (primitive→semantic chain / broken-`var()`), `validateComponentTokenRefs` (broken-`var()` in components), `validateNoDuplicateDeclarations`, `validateNoHardcodedValuesInComponents`. **New signal it caught + handled:** v2 Popover uses `var(--radix-popover-content-transform-origin)` — a *Radix-injected runtime var*, not a token. Added `radix-` to the internal-prefix allowlist (renamed `TAILWIND_INTERNAL_PREFIXES` → `FRAMEWORK_INTERNAL_PREFIXES = ['tw-','radix-']`). Emptied the stale 3-tier `INLINE_STYLE_VARS` set (kept the mechanism for future v2 runtime-injected vars). `npm run validate-tokens` → 287 tokens, 0 broken, exit 0.
> - **(a-tests):** `scripts/validate-tokens.test.ts` rewritten to v2 fixtures (semantic/`--ext-*`/Radix vocab; dropped the naming-convention + TreeItem 3-tier blocks) — 10/10. `app/src/utils/validate-tokens.test.ts` rewritten to read the v2 files and assert the chain (dropped dead ProgressIndicator component-token asserts) — 3/3. (`scripts/*.test.ts` is in tsconfig include but NOT in any vitest glob — type-checked, not run by `vitest`.)
> - **(b) `design-system/geeklego.default.css`** truncated 6043 → 1947 lines at the `GENERATED COMPONENT TOKENS` marker (backed up to scratchpad first; braces balanced 179/179). Defensive only — not consumed by v2; the editor reset target is being re-pointed at the `v2-defaults/` snapshot (Phase 4).
> - **(c) Dead 3-tier code deleted** (after a full internal call-graph audit, not just a name grep): `types.ts` — `SemanticColorGroup`, `SemanticBlock`, `GeeklegoTokens`, `ComponentToken`/`ComponentTokenSection`/`ComponentTokenGroup`, `TypographyMapping`, `ResponsiveOverride`, the dead `HistoryEntry` (the live one is local in `state/history.ts`). `cssParser.ts` — `parseGeeklegoCss`, `applySemanticToken`, `parseTypoClass`, `TypoClassAccumulator`, `ParseState`. `cssGenerator.ts` — `generateCss` + its whole subtree (`generateLightBlock`/`generateDarkBlock`/`generateSemanticColorGroup`/`generateColorMixSupportsBlock`/`generateTypographyBlock`/`generateResponsiveBlock`/`generateResponsiveTypography`/`buildText­Wrap`+`buildViewTransitions`+`generateSupportsBlocks` + the color-mix helpers `hexToRgba`/`colorMixToRgba`/`resolveVarRefsForFallback`/`hasColorMix`/`shadowFallbackValue` + consts `SEMANTIC_UTILITIES`/`ACCESSIBILITY_UTILITIES`/`PERFORMANCE_UTILITIES`/`RESPONSIVE_TYPO_MAP` + interface `ColorMixShadowEntry`). Deleted whole file `app/src/data/tokens.ts` (`DEFAULT_TOKENS`, unimported) + its now-empty `data/` dir. **KEPT (shared with v2):** `applyThemeToken`, `collectTokens`/`parseNumeric`/`stripSemicolon`/`stripInlineComment`/`TokenEntry`, `pad`, and `generateThemeBlock` — whose signature was narrowed `GeeklegoTokens` → `{ primitives: Primitives }` so the `GeeklegoTokens` type could go (call site in `generateV2Primitives` lost its `as GeeklegoTokens` cast). **KEPT** `TypographyClass` (still imported by `Inspector.tsx`, though only as the type of an always-empty `typoClasses` array — vestigial Phase-4 residue; see follow-up).
> - **Bonus (gate-driven):** deleted `app/src/ia/classify.test.ts` — a 3-tier-era manual console script (`runTests`, zero `describe`/`it`, 3-tier `--button-bg` sample data) that the vitest glob swept up and that errored "No test suite found." No importers, no real coverage lost.
> - **(d)** ~~delete dead standalone `app/src/vite-plugin/token-api.ts`~~ **DONE 2026-06-21**.
>
> **Final gate:** `tsc --noEmit` = 18 errors, ALL pre-existing `@storybook/react` story-import errors, **0 non-storybook** (baseline). `vitest` (unit project) = 3/3, no failing suites. `npm run validate-tokens` exit 0. `npm run build` (tsup ESM/CJS/DTS + `build:css`) succeeds; `dist/geeklego.css` resolves `--primary:var(--color-brand-900)` (light) + `--primary:var(--color-neutral-50)` (dark override) — the chain + theming are intact.
>
> **Follow-up noted (not in Phase 5 scope):** `Inspector.tsx:634-639 TypographyStyleInspector` still carries dead `typoClasses: TypographyClass[] = []` residue (the only thing keeping `TypographyClass` alive). Clean it + drop `TypographyClass` in a later pass.

Original spec (for reference):
> **NOTE:** most of this phase's component-UI/route/tab stripping was **pulled forward into Phase 4** (user choice). Remaining for Phase 5: the NavRail/ContextPane/Inspector cleanup is DONE; what's LEFT = (a) `scripts/validate-tokens.ts` 2-tier adaptation (+ its tests), (b) the `design-system/geeklego.default.css` defensive truncation, (c) deleting the now-unreferenced old types/functions (`ComponentToken*`, `TypographyMapping`, old `SemanticBlock`/`GeeklegoTokens`, old `parseGeeklegoCss`/`generateCss`/`applySemanticToken`/`generateLightBlock`/`generateDarkBlock`) once a final grep confirms zero consumers, (d) ~~optionally delete the dead standalone `app/src/vite-plugin/token-api.ts`~~ **DONE — deleted 2026-06-21** (confirmed unimported; the live plugin is inline in `vite.config.mts`; empty `vite-plugin/` dir also removed; tsc still clean).
- Delete `app/src/views/ComponentPage/` entirely; remove the `'components'` route (`app/src/routing/`), the COMPONENTS NavRail section, the ContextPane `components` branch + Home tile, the Inspector `inferCompTokenSemanticGroup` + `isCompToken` path, the PendingDrawer/PendingModal component-token maps.
- `scripts/validate-tokens.ts` (+ `app/src/utils/validate-tokens.test.ts`, `scripts/validate-tokens.test.ts`): drop component-tier passes (`validateNoCrossBlockComponentDuplicates`, the `--{component}-{property}-{scale}` rule) and the "no primitives in TSX" rule; keep primitive→semantic chain + broken-`var()` checks. Point it at the v2 files.
- Truncate `design-system/geeklego.default.css` at the `GENERATED COMPONENT TOKENS` marker (defensive; the editor no longer targets it, but keep it 2-tier-consistent). Back up first.
- Delete the now-unused old types/functions in `types.ts`, `cssParser.ts`, `cssGenerator.ts` once no consumer references them.

---

## Files NOT touched
- `components/v2/**`, `design-system/v2/**` **token content** (the editor reads/writes the latter, but this rebuild doesn't change the design values themselves).
- `components/utils/**` (separate §5 Radix-redundancy-audit follow-up).
- `eslint.config.mjs` (already wired with the v2 import-discipline rule).

---

## Verification
1. **Phase gates:** `npx tsc --noEmit` (app) green after each phase (0 → app loads; 4 → consumers compile; 5 → dead code gone).
2. **App loads:** `npm run dev` → editor opens with no catalog crash; shows Primitives + Semantics + Themes; no Components nav/tile/page.
3. **Round-trip:** edit `--primary` in the Semantics pane → Save → confirm `design-system/v2/semantics.css` `:root` updates AND its `@theme inline` mirror regenerates consistently (no drift); `--ext-*` block unchanged byte-for-byte.
4. **Theme:** edit a dark value → confirm `themes/dark.css` updates with the `[data-theme="dark"], .dark` dual selector intact.
5. **Live re-theme:** rebuild v2 Storybook (scoped) → emitted CSS reflects the edited semantic, proving the cockpit controls the real v2 system.
6. **Reset:** restore-default → the three v2 files return to the `v2-defaults/` snapshot.
7. **Tests + build:** `vitest` (trimmed suites pass) and `npm run build` succeed.

---

## Risks (in priority order)
1. **Polarity inversion** (primitives `@theme` canonical vs semantics `:root` canonical) — highest round-trip-corruption risk; verify the generator regenerates the correct mirror on each side.
2. **`applyV2SemanticToken` over-matching** the primitive `:root` mirror — strict allowlist + per-file parse mode.
3. **`--radius` / `--ext-*` special cases** — radius expands to a `calc()` scale, not `--color-radius`; the ext shadow is in `:root`/dark but NOT in `@theme inline` → treat the whole ext section as an **opaque blob** for now (passthrough, not regenerated token-by-token).
4. **Consumer surface (~30 files)** is the bulk of the work and where silent "empty data" bugs hide — Phase 4 is the long pole; load-bearing consumers (graph, IA, exporter, views) first, cosmetic ones last.
5. **Big multi-phase change** — keep the app type-checking and loadable at every phase boundary.

---

## Folded into this rebuild — Storybook integrations to re-add (2026-06-21)

When `.storybook/` was rewritten for v2 (new `main.ts` globbing only `components/v2/**`, `preview.ts` importing `design-system/v2/index.css` with a light/dark toolbar toggle), **two integrations were intentionally dropped** and must be re-added as part of this editor rebuild:

1. **Token-editor `postMessage` bridge** — the old `preview.ts` listened for `GEEKLEGO_TOKEN_OVERRIDES` (injects a `<style>` of live token CSS) and `GEEKLEGO_ATTRIBUTES` (`data-theme`/`dir`/`data-density`) from the editor on `localhost:5176+`. Re-add it **re-pointed at the v2 flat semantics** so the rebuilt cockpit can push live edits into Storybook stories. Belongs with Phase 4 (file-I/O + the editor↔preview channel).
2. **Vitest–Storybook browser-test project** — removed from `vite.config.mts` (the `name: 'storybook'` Playwright/chromium project + `storybookTest` plugin) along with `.storybook/vitest.setup.ts` and the `@storybook/addon-vitest` devDep. Re-add when story a11y/interaction testing is wanted again; the `name: 'unit'` node test project was kept untouched.

## Deferred beyond this rebuild (out of scope — noted for completeness)
- The brief's §4 **multi-target Export panel** (CSS + IR/DTCG JSON + design.md; RN/Flutter stubbed). User chose "strip-to-2-tier only" for export — the editor keeps the existing CSS export. The richer panel is a clean follow-up on top of the working v2 cockpit.
- `components/utils/**` Radix-redundancy audit (§5).
