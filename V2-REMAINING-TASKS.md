# GeekLego v2 — Remaining Tasks (follow-up tracker)

> **Status:** Token Editor v2 cockpit rebuild is **fully done** (all phases 0–5 verified). This file tracks everything *still open* from the governing brief.
> **Date:** 2026-06-22 · **Owner:** Bitta
> **Read these first in a fresh session:** `PROTOTYPE-SHADCN-2TIER.md` (primary brief), `CLAUDE.md` ("Repo state" table + v2 rules), `TOKEN-EDITOR-V2-REBUILD-PLAN.md` (the finished rebuild, for context).
> **Note:** this repo is a local-only spike — no git, no remote. v2 lives under `design-system/v2/` and `components/v2/`. The editor `app/` is the v2 cockpit and now reads/writes `design-system/v2/`.

---

## ✅ Already complete (do NOT redo)

- **Steps 1–4** of the brief: stale-doc neutralize, Button slice, CLAUDE.md v2 rewrite, `component-builder-v2` skill, validation slice (Button/Dialog/Combobox), §7 gate PASSED, §7.5 2-tier cut.
- **`components/utils/` Radix-redundancy audit** (§5) — deleted `utils/keyboard`; kept accessibility/security/i18n/StructuredData.
- **Storybook config rewritten for v2** (globs `components/v2/**`, imports v2 CSS, dark toggle).
- **ESLint v2 import discipline** wired in `eslint.config.mjs`.
- **Token Editor `app/` 2-tier cockpit rebuild — ALL phases 0–5 done & verified** (flat `GeeklegoTokensV2` model, I/O re-targeted to `design-system/v2/` via the **inline `tokenApiPlugin()` in `vite.config.mts`**, component tier stripped, `validate-tokens.ts` → 2-tier, dead 3-tier code deleted). Gate green: tsc baseline · vitest 3/3 · `npm run validate-tokens` exit 0 · full `npm run build` OK.
- **Inspector dead-code residue** (`typoClasses`/`TypographyClass`) — already gone (verified 2026-06-22, no refs remain).

---

## 🔲 Remaining tasks

These chain: **#1 → #2 → #3 → #4**. The IR exporter (#1) is the keystone — it also unblocks the deferred `figma-sync` work (another team). #5 is independent and cheap.

### 1. IR exporter — `scripts/export-ir.ts` (DTCG JSON)
- **Source:** brief §5 ("Build fresh") + §8 (names the planned file).
- **Status:** ❌ not built — file does not exist.
- **What:** Export the v2 token system to a W3C DTCG-format JSON IR (the "IR-as-contract" from `MULTI-TARGET-ARCHITECTURE.md`). Reads `design-system/v2/{primitives,semantics,themes/dark}.css`.
- **Reuse:** the editor already has a working v2 parser — `parseGeeklegoV2(primCss, semCss, darkCss)` in `app/src/utils/cssParser.ts` produces the `GeeklegoTokensV2` model. Build the IR exporter on top of that model rather than re-parsing from scratch.
- **Why first:** keystone for #2/#3/#4 and the parked `figma-sync` (it consumes the IR).

### 2. design.md exporter — `scripts/export-design-md.ts`
- **Source:** brief §5/§8.
- **Status:** ❌ not built — file does not exist.
- **What:** Export the v2 tokens to a human-readable `design.md` (the doc-facing target in the export chain).
- **Depends on:** can share the same `GeeklegoTokensV2` model / IR from #1.

### 3. Multi-target Export panel (in the cockpit)
- **Source:** brief §4 (cockpit mandate: "Export — Multi-target: CSS, IR (DTCG JSON), design.md; RN/Flutter stubbed").
- **Status:** ❌ only CSS export exists in the editor today.
- **What:** Extend the editor's Export UI to offer CSS (done) + IR (#1) + design.md (#2), with RN/Flutter as stubs.
- **Depends on:** #1 and #2.
- **Note:** explicitly deferred during the rebuild ("strip-to-2-tier only for export") — see `TOKEN-EDITOR-V2-REBUILD-PLAN.md` "Deferred beyond this rebuild".

### 4. `doc-generator` skill — adapt to 2-tier
- **Source:** brief §6.
- **Status:** ❌ skill not present in `.claude/skills/` (current skills: component-builder-v2, figma-sync, i18n, screenshot-workflow, security, state-handling).
- **What:** Adapt/build the doc-generator skill for 2-tier; drive it off the `design.md` export.
- **Depends on:** #2 (design.md exporter).

### 5. Minor skill re-audit (independent, low-stakes)
- **Source:** brief §6 ("likely minor; re-audit after Button is rebuilt").
- **Status:** ⬜ never done.
- **What:** Re-audit `security`, `state-handling`, `i18n`, `screenshot-workflow` skills for 2-tier / ShadCN-Radix fit. Likely small edits or none.
- **No dependencies** — can be done anytime, including first.

---

## ⏸️ Intentionally parked (NOT gaps — don't action without a decision)

- **`figma-sync` skill** — brief §6 says "Defer" (waits on the IR from #1; another team / Ujwal's deterministic Figma work). Skill exists; parked by design.
- **Watch items** (brief §9, not tasks): `--ext-*` sprawl (still only 1 variant — `gamified`; watch at #5 variant); ShadCN token-set richness vs geeklego's needs (status/info, chart data-series) — extend deliberately + document only *if it bites*.
- **Storybook integrations to re-add** (from rebuild plan): (a) token-editor `postMessage` bridge re-pointed at v2 flat semantics; (b) Vitest–Storybook browser-test project. Re-add when live-edit-into-Storybook or story a11y testing is wanted.

## 🚫 Out of scope (brief §10)
- React Native & Flutter export targets (other team; export panel stubs only).
- Figma deterministic sync (consumes the IR).
- "Configurable variants as variables."
- Any migration of the production repo (only after the decision gate — which has passed, but migration itself is a separate effort).

---

## Suggested order
1. **#5 skill re-audit** if you want a quick self-contained win, **or** jump straight to —
2. **#1 IR exporter** (keystone) → **#2 design.md exporter** → **#3 Export panel** → **#4 doc-generator skill**.

Recommended: start with **#1 (IR exporter)** — it unblocks the most downstream work.
