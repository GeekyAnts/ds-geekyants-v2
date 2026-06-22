# GeekLego v2 — ShadCN + 2-Tier Clean-Room Prototype

> **Status:** Prototype brief · **Owner:** Bitta · **Date:** 2026-06-21
> **Nature:** LOCAL-ONLY throwaway spike. No GitHub, no connection to the production repo. Validate the architecture before committing anything. If it works → it becomes the migration target. If it doesn't → delete the folder, lose days not months.

---

## 1. The idea in one paragraph

Take a local copy of geeklego-public, **delete all components and the component-token tier**, collapse the token system from **3 tiers → 2 tiers** (primitives → semantics), and rebuild components on **ShadCN + Radix UI**, using geeklego's design system (primitives) as the source of truth. Adopt **ShadCN/Tailwind's standard semantic vocabulary** as tier 2 so the system is industry-standard, LLM-readable, and paste-and-go. Repurpose the **Token Editor into a cockpit**: edit primitives + semantics, manage themes, and export to all targets in the chain (CSS, IR/JSON, design.md; React Native + Flutter stubbed — owned by another team, deferred).

This is **not** a rewrite of production. It is a clean-room test with a generous blast radius, isolated from git until proven.

---

## Phase 0 — Start here (new-session orientation & ordering)

> **If you are a fresh session opening this repo, read this section first.** It tells you which docs to trust, what NOT to do yet, and the exact order of the first steps.

### Which docs to trust in this repo

| Doc | Status | Use |
|---|---|---|
| `PROTOTYPE-SHADCN-2TIER.md` (this file) | **v2 truth — primary** | Drives the work. Locked decisions + build steps. |
| `MULTI-TARGET-ARCHITECTURE.md` | **v2 truth — context** | The "why": IR-as-contract, fork-per-brand, two-repo rule. |
| `CLAUDE.md`, `AGENTS.md`, `DESIGN_SYSTEM.md` | ⚠️ **STALE — old 3-tier** | Describe the OLD 3-tier monorepo system + `packages/geeklego/...` paths + component-token-first flow that v2 **deletes**. Will actively mislead. Ignore until refreshed (Step 3 below). |

**Note on paths:** the two v2 docs were written in the monorepo and still say `packages/geeklego/...`. This repo (`geeklego-v2`) is **flat** — mentally drop that prefix (`packages/geeklego/design-system/geeklego.css` → `design-system/geeklego.css`). Fixing these is part of Step 1.

**Note on memory:** the decision-history memory file lives under the `geeklego-monorepo` project path, so it will **not** auto-load when working in `geeklego-v2`. This doc is the source of truth here.

> ⚠️ **GUARDRAIL — do NOT use the `component-builder` skill yet.** The skill sitting in `.claude/skills/component-builder/` is still the **OLD 3-tier version** (component-token blocks, `memo(forwardRef)`, atom/molecule/organism folders). It triggers on "build me a X component" and will generate the **wrong v2 architecture**. **Build v2 components BY HAND** (as the Step-2 Button was) until Step 3 rebuilds the skill as `component-builder-v2` per §6.5. Only after that rebuild is it safe to generate v2 components via the skill.

### Ordering of first steps (do NOT reorder)

**Step 1 — Neutralize the stale docs (cheap, ~2 min). DO THIS FIRST. ✅ COMPLETED (2026-06-21).**
Do **not** rewrite `CLAUDE.md` / `AGENTS.md` / `DESIGN_SYSTEM.md` yet — you don't have the facts to write them accurately. Just add a one-line banner at the top of each:
> ⚠️ This describes the OLD 3-tier system. v2 is being rebuilt — see `PROTOTYPE-SHADCN-2TIER.md`. Ignore this file until refreshed.
Also fix the `packages/geeklego/...` paths in the two v2 docs to the flat layout.
> ✅ **Done 2026-06-21:** banner added to the top of `CLAUDE.md`, `AGENTS.md`, `DESIGN_SYSTEM.md`. Stripped the `packages/geeklego/` prefix from all 9 occurrences in `MULTI-TARGET-ARCHITECTURE.md` (paths verified to resolve on disk). The 3 `packages/geeklego/...` mentions in this file were left as-is — they are meta-instructions about the path fix, not stale refs.

**Step 2 — Build the Button vertical slice (the real first work). ✅ COMPLETED (2026-06-21).**
Semantic layer (ShadCN standard vocab, aliased to kept primitives) + Radix Button with standard utilities (`bg-primary text-primary-foreground`) + one gamified `--ext-button-gamified-*` custom variant. See §7 for the full slice. This step *generates the facts* Step 3 needs.
> ✅ **Done 2026-06-21.** Files created (isolated in `v2/` subfolders so the Step-4 delete is a clean `rm -rf` and nothing mixes with the stale 3-tier code):
> - **2-tier CSS** — `design-system/v2/primitives.css` (geeklego `@theme` + `:root` mirror, copied **unchanged**), `semantics.css` (ShadCN vocab aliased to primitives, registered as Tailwind utilities via `@theme inline` so `.dark` re-themes at runtime; `--ext-button-gamified-*` block kept separate), `themes/dark.css` (semantic overrides under `[data-theme="dark"], .dark`), `index.css` (entrypoint).
> - **Component** — `components/v2/Button/{Button.tsx, Button.types.ts, button-variants.ts, Button.stories.tsx}` + `components/v2/lib/cn.ts`. ShadCN/Radix pattern: `cva` variants, `asChild` via `@radix-ui/react-slot`, `cn()` = `clsx`+`tailwind-merge`. Core variants use **only** standard semantics; `gamified` uses **only** `--ext-*` tokens (the containment canary).
> - **Verified:** `tsc --noEmit` clean; Storybook build of the v2 story succeeds through the full Vite/Tailwind pipeline; built CSS confirms the chain `--color-brand-900:#18181b → --primary → bg-primary`, the `--ext-*` utilities resolve, and the dark override emits for both `[data-theme="dark"]` and `.dark`.
> - **Deps added:** `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge`. Tailwind v4 gate confirmed (`tailwindcss@4.3.0`, `@theme`-based).
> - **Note for Step 3 (facts generated):** the real component pattern is `cva` + `cn` + Radix `Slot` (NOT the old `memo(forwardRef)` + `var(--component-*)` token-block pattern). No component-token block is written. The old `transition-default`/`focus-ring`/`content-nowrap` utilities and `utils/accessibility/VisuallyHidden` were **not** needed for Button — re-audit which `utils/*` survive as Radix components land (Dialog/Combobox) in Step 4.
> - **Known unrelated issue:** the full-repo `storybook build` fails on pre-existing boilerplate `stories/Configure.mdx` (missing `stories/assets/github.svg`) — not a v2 problem; verified v2 via a scoped temp config.

**Step 3 — NOW rewrite `CLAUDE.md` for v2 (accurate the first time). ✅ COMPLETED (2026-06-21).**
With Button done you know the real component pattern, the real token vocabulary, and which `utils/*` helpers Radix made redundant. Write CLAUDE.md once, pointing at Button as the reference example. (Writing it before Button = documenting guesses, then rewriting after — don't.) **Also build `component-builder-v2` per the spec in §6.5** (atomic design re-homed: keep decomposition/extraction/composition-tree + ESLint import discipline; generate ShadCN `cva`/`cn` + compound-component code; add the "use the Radix primitive if it exists" check; drop folders/catalog/tier-labels/`memo(forwardRef)`/component-token blocks).
> **Use the `skill-creator` skill/plugin to author `component-builder-v2`** — don't hand-write the skill scaffold. Invoke `skill-creator`, feed it the §6.5 spec + the Step-2 Button as the canonical reference component, and let it produce the new skill (SKILL.md + references). Create it as a NEW skill `component-builder-v2`; leave the old `component-builder` in place until the v2 skill is validated on Dialog/Combobox in Step 4, then remove the old one.
> ✅ **Done 2026-06-21.** Both deliverables complete, grounded in the real Step-2 Button slice (not guesses):
> - **`CLAUDE.md` rewritten for v2** — full 2-tier ShadCN/Radix doc. Covers: two-systems-coexist repo state (v2 active under `components/v2/` + `design-system/v2/`; old 3-tier frozen at root until Step 4), the 2-tier token model + chain rule, the `@theme inline` wiring (semantics register as live-themeable Tailwind utilities → write `bg-primary` **not** `bg-[var(--primary)]`; `.dark` re-themes without a rebuild), the ShadCN component pattern (`cva` + `cn` + **plain** `forwardRef` + `Slot`; drops the old `memo(forwardRef)` mandate; reverses the 3-tier `cva`/`cn`/`clsx` ban), the Radix-first rule, the 4-file set (README only when warranted), `--ext-*` containment, and hard never/always lists — each pointed at `components/v2/Button/` as the reference.
> - **`component-builder-v2` skill built** via `skill-creator` at `.claude/skills/component-builder-v2/`: `SKILL.md` (146 lines, lean — decompose → Radix-check → tokens-only-if-needed → write files → stories → verify) + `references/radix-primitive-map.md` (the "does Radix already provide this primitive?" lookup table — the one genuinely new §6.5 decision) + `references/composition-example.md` (worked Dialog-on-Radix compound-component example showing every hand-rolled 3-tier mechanism — `useFocusTrap`/`cloneElement`/`__slot`/component-tokens — deleted). Skill is registered/available. Old `component-builder` left intact (remove after v2 is validated on Dialog/Combobox in Step 4).
> - **Validation status:** the skill is validated *by construction* against the Button slice; the `skill-creator` eval/benchmark loop was **not** run (no test-case evals authored). Acceptable for a throwaway spike — the real validation is *using* the skill on Dialog/Combobox in Step 4 per §7.

**Step 4 — Roll forward. ✅ COMPLETE (2026-06-21): build phase + §7 gate (PASSED) + §7.5 cut (CSS + components scope) done. One sub-scope deferred: the Token Editor `app/` 2-tier rebuild.** Dialog/Modal → Combobox (§7) — these are where the new `component-builder-v2` flow and the "does Radix already provide this primitive?" check (§6.5) get validated on real compound components. Then the bulk delete of old components + component-tier tokens + the migration, per §5 and the decision gate.
> ⏳ **Validation-slice build COMPLETE (2026-06-21); decision gate (§7) + the destructive 2-tier cut (§7.5) NOT yet done — awaiting user.** All three validation-slice components built via the `component-builder-v2` skill, each verified (isolated `tsc` clean + scoped Storybook build resolving the full Tailwind chain in the emitted CSS):
> - **Dialog** (`@radix-ui/react-dialog@1.1.17`) — compound component: `Dialog`/`Trigger`/`Content`/`Close`/`Portal` pass-through + styled `Overlay`/`Content`/`Title`/`Description` + `Header`/`Footer` layout helpers + a `showClose` prop. Confirms Radix deletes the entire hand-rolled `useFocusTrap`/`useEscapeDismiss`/`useClickOutside`/`createContext`/`cloneElement` stack — none reimplemented. Styled with `bg-popover`/`border-border`/`text-muted-foreground` (no component tokens).
> - **Combobox** (`@radix-ui/react-popover@1.1.17` + `cmdk@1.1.1`) — the highest-a11y-surface test. Built as a **composition**, decomposed bottom-up into two reusable leaves first (extraction heuristic): `components/v2/Popover/` (Radix — positioning/click-outside/escape/portal) and `components/v2/Command/` (cmdk — the listbox: role/option, `aria-activedescendant`/`aria-selected`, arrow-key nav, type-to-filter, empty state), then `components/v2/Combobox/` composes Popover + Command + Button (`asChild` trigger) with a data-driven `options`/`value`/`onChange` API + selected checkmark. Built CSS confirms the cmdk keyboard-active highlight resolves through the chain: `data-[selected=true]:bg-accent → var(--accent) → var(--color-accent-500)`.
> - **Verdict on open question #1 (Radix redundancy):** Radix + cmdk clearly earn their place — the focus trap, listbox a11y, and `aria-activedescendant` bookkeeping the old 3-tier hand-rolled in `utils/keyboard`/`utils/aria` all come for free. No custom variants / `--ext-*` tokens were needed for any of the three; semantics covered everything (no `--ext-*` sprawl — open question #2 stays clean through component #3).
> - **Deps added** (pnpm): `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `cmdk`. v2 component tree now: Button, Dialog, Popover, Command, Combobox + `lib/cn.ts`.
> - **⚠️ Gap found — ESLint does NOT enforce v2 import discipline.** `eslint.config.mjs` is bare (`@eslint/js` recommended only — matches `.js`, no TS parser, no `files` glob for `.tsx`, no `no-restricted-imports`). So `npm run lint` currently lints **nothing** under `components/v2/`, contradicting the CLAUDE.md/skill claim that ESLint machine-enforces the import rule (§6.5's re-homing of the atomic import graph). Verification fell back to isolated `tsc` + scoped Storybook build. A background task is queued to wire the TS parser + import-discipline rule. **This should be fixed before relying on lint as a migration gate.**
> - **Minor:** v2 story `@storybook/react` imports were corrected to `@storybook/react-vite` (the v10 path) for Dialog + Combobox; Button's story still uses the old path (pre-existing, harmless).
>
> 📄 **DEFERRED Token Editor rebuild — plan written, not started: [`TOKEN-EDITOR-V2-REBUILD-PLAN.md`](TOKEN-EDITOR-V2-REBUILD-PLAN.md).** A full investigation (2026-06-21) found the editor `app/` doesn't just need un-breaking — its semantic model is the OLD 3-tier vocab wired into ~30 files, and it reads/writes `geeklego.css` (which v2 doesn't consume) instead of `design-system/v2/`. User chose the **full v2 cockpit rebuild** (re-target to the v2 split files + flat ShadCN semantic model + strip component tier), phased 0→5. See that plan file before starting.
>
> ✅ **§7 GATE: PASSED (user decision, 2026-06-21).** The 3-component slice (Button, Dialog, Combobox) is clearly cleaner than the 3-tier originals — standard ShadCN vocab, a11y for free via Radix/cmdk, zero `--ext-*` sprawl, custom-variant containment held. v2 is now the migration target.
>
> ✅ **§7.5 2-tier cut: DONE (scope = CSS + components only; editor `app/` rebuild deferred by user choice).** Executed in order:
> - **Pre-check** — grepped `components/v2/` for `var(--<component>-*)`: clean (the only `var(--radix-*)` hit is Radix's own runtime transform-origin var, not a geeklego component token).
> - **Truncated** `design-system/geeklego.css` from the `GENERATED COMPONENT TOKENS` marker (was line 1949) to EOF: **6044 → 1948 lines**. No `--ext-*` tokens lived in this file (they're in `design-system/v2/semantics.css`), so nothing needed preserving here. The hand-written `.color-picker-*` utility classes just above the marker were kept (they're upper-section, not generated component tokens). Backup in scratchpad.
> - **Deleted** old `components/{atoms,molecules,organisms}/` (81 components) + `components/catalog.ts` + `scripts/catalog.ts`. Backup in scratchpad.
> - **Kept** `components/utils/` (keyboard/accessibility/security/i18n/StructuredData) per §5 — Radix-redundancy audit of these is a separate follow-up, not a blind delete.
> - **Repointed** `components/index.ts` to export only the surviving `utils/*` (dropped all old-component + catalog re-exports) and fixed `package.json` (`build` no longer bundles `components/catalog.ts`; removed the dangling `./catalog` export). This keeps the package barrel/build coherent.
> - **Removed** the old 3-tier `component-builder` skill (now that v2 is validated on Dialog/Combobox). `component-builder-v2` remains.
> - **Verified post-cut:** scoped `tsc --noEmit` on all v2 components → exit 0; scoped Storybook build of v2 stories → success; emitted CSS confirms the full chain survives — `--color-brand-900:#18181b → --primary → bg-primary`, `--ext-button-gamified-bg → --color-accent-500`, combobox `--accent`/`data-[selected]` highlight, and the dark override.
>
> ⏳ **DEFERRED (not done this run — by user scope choice):** the Token Editor `app/` 2-tier cockpit rebuild (§4). The component-token cut intentionally left `app/` in a broken state: `app/src/utils/componentTokenParser.ts` (imports the deleted `components/catalog`), `app/src/ia/classify.ts`, `app/src/utils/storybook.ts`, `app/src/vite-plugin/token-api.ts` (reads/writes the now-gone `GENERATED COMPONENT TOKENS` marker — will throw), and the 6+ shell panes that consume component-token groups all still reference 3-tier machinery. Adapting `cssParser.ts`/`cssGenerator.ts`/`validate-tokens.ts` to 2-tier (per §4/§7.5 step 3) is part of this deferred work. **`design-system/geeklego.default.css` was NOT truncated** — it's the ExportModal "reset" target and still holds the 3-tier block; a reset would currently re-introduce component tokens. Fold its truncation into the editor rebuild. **Also still open (flagged at build time): ESLint does not enforce v2 import discipline** (`eslint.config.mjs` is bare) — wire the TS parser + `no-restricted-imports` before relying on `npm run lint` as a migration gate.

**Why this order:** the destructive "delete all components / component-tier tokens" step happens at Step 4, *after* the decision gate — never up front. Deleting first just leaves a broken repo while the new pattern is still being figured out.

### Setup not yet done (prerequisites for Step 2)
- No git yet (intentional — isolation). `git init` for local-only history when you want it; never add a remote.
- `node_modules` missing → run install (pnpm per the repo's lockfile/config).
- Radix not installed → see "Dependencies" below.

### Dependencies — what to install, and WHEN

> **"ShadCN" is not an installed dependency.** Its CLI *copies component source into your repo* (those files then depend on Radix). For this heavily-customized throwaway, prefer **hand-writing off the ShadCN pattern** over the CLI — the CLI wants its own `components.json`, path aliases, `cn()` util, and base CSS vars that fight the geeklego token setup.

**Gate before ANY Radix install:** confirm the repo is on **Tailwind v4** (§9). ShadCN's CSS-variable wiring differs between v3 and v4 (v4 uses `@theme` + `@import "tailwindcss"`, which `geeklego.css` already does). If still on v3, resolve that first — it changes how the semantic layer is wired.

Install **per-component, not all up front** — a throwaway shouldn't accumulate deps it may not use:

| When | Install | Why |
|---|---|---|
| Phase 0 | `pnpm install` (existing deps only) | Restore the repo's current `node_modules`. Nothing new. |
| **Start of Step 2 (Button)** | `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, `tailwind-merge` | Slot powers `asChild`; `cva` is the variant pattern; `clsx`+`tailwind-merge` = the `cn()` helper. The ShadCN Button baseline. |
| Step 4 — Dialog | `@radix-ui/react-dialog` | Add when you build Dialog, not before. |
| Step 4 — Combobox | `@radix-ui/react-popover` + `cmdk` | ShadCN's Combobox = Popover + cmdk. Add when you reach it. |
| If a component animates | `tailwindcss-animate` | Some ShadCN components assume it. Add on demand. |

---

## 2. Decisions locked

| Decision | Choice | Rationale |
|---|---|---|
| **Token tiers** | 2-tier: primitives → semantics | Components consume semantics directly (ShadCN model). Simpler editor, fewer indirections. |
| **Semantic vocabulary** | **Adopt ShadCN/Tailwind standard names** | `--primary`, `--primary-foreground`, `--background`, `--border`, `--ring`, `--muted`, `--accent`, `--destructive`, `--card`, `--popover`, `--input`. Industry standard, in every LLM's training set, native Tailwind v4 utilities. |
| **Primitives** | **Keep geeklego's, unchanged** | `--color-brand-*`, spacing/radius/typography scales = brand identity + fork seam. Only the *semantic* layer is standardized. |
| **Primitive base** | **Radix UI** | ShadCN default, largest ecosystem, best LLM familiarity, safest evaluation base. |
| **Editor scope (prototype)** | **Primitives + Semantics + Export** | Drop component-token tier. Themes = semantic override sets. Add multi-target export panel. |
| **Custom variants** | Namespaced extension tokens (`--ext-<component>-<variant>-*`) | Kept structurally separate from core semantics so brand variants don't pollute the themeable layer. |
| **RN / Flutter** | Deferred (other team) | Export panel stubs these targets; not built here. |
| **Git** | None until proven | Local folder only. |

---

## 3. The token model

```
Tier 1 — PRIMITIVES (geeklego's own, unchanged — brand identity)
   --color-brand-500: #...      --spacing-4: 1rem      --radius-md: 0.5rem
   (full palettes, scales, typography, motion — exactly as today's @theme block)

Tier 2 — SEMANTICS (ShadCN / Tailwind standard vocabulary — the interface)
   --background / --foreground
   --primary / --primary-foreground          → var(--color-brand-500) / var(--color-neutral-50)
   --secondary / --secondary-foreground
   --muted / --muted-foreground
   --accent / --accent-foreground
   --destructive / --destructive-foreground
   --border   --input   --ring
   --card / --card-foreground
   --popover / --popover-foreground
   --radius   (+ component-relevant tokens ShadCN expects)

COMPONENTS (ShadCN + Radix, paste-and-go)
   className="bg-primary text-primary-foreground border-border ring-ring"
   → standard Tailwind v4 utilities, zero custom vocabulary

THEMES         a theme = a set of Tier-2 overrides:  .dark { --primary: ...; --background: ... }
BRAND FORKS    re-point Tier-2 semantics at different primitives
CUSTOM VARIANTS  --ext-button-gamified-bg: ...   (namespaced, outside core semantics)
```

**Why this hits all three goals:** industry-standard (ShadCN names), LLM-readable (no custom vocab to learn), Tailwind-aligned (native `@theme` utilities) — while keeping geeklego's primitive palette as the brand seam.

---

## 4. The Token Editor → Cockpit

The current editor is coupled to 3-tier (parses `componentGroups`, the `GENERATED COMPONENT TOKENS` block, variant-first grouping, component-token alias picker). Removing the component tier **deletes ~1/3 of the editor's surface — which is the simplification we want.**

**Cockpit mandate: Primitives → Semantics (Themes) → Export.**

| Pane | What it does | Reuse / change |
|---|---|---|
| **Primitives** | Edit raw palettes & scales | Reuse existing primitive editing UI largely as-is |
| **Semantics** | Edit the ShadCN standard token set; alias each to a primitive | Simplify existing semantic UI; pre-label with standard ShadCN tokens + descriptions |
| **Themes** | A theme = a semantic override set (light/dark/brand) | Promote existing light/dark split to a first-class concept |
| **Export** | Multi-target: CSS, IR (DTCG JSON), design.md (RN/Flutter stubbed) | NEW panel — occupies space freed by deleting component-token machinery |

**To strip out:** `componentGroups` parsing/UI, `GENERATED COMPONENT TOKENS` handling, variant-first grouping, component-token alias picker, Add-Token-for-component flow.
**To adapt:** `cssParser.ts` / `cssGenerator.ts` → 2-tier only (no component section). This also simplifies the IR exporter (no component-tier resolution).

---

## 5. What to copy from the public repo (vs build fresh)

**Copy & keep:**
- Primitive token definitions (the `@theme` block) — your design identity.
- `cssParser.ts` / `cssGenerator.ts` — *adapt* to 2-tier (delete component handling).
- Token Editor app shell, primitive/semantic editing UI — *adapt*.
- `validate-tokens.ts` — *adapt* (drop the component-tier passes; keep primitive→semantic chain checks; drop "no primitives in TSX" rule since ShadCN components reference semantics).
- Utility modules worth keeping: `utils/keyboard`, `utils/aria`, `utils/i18n`, `utils/security` — but **audit against Radix first**, which provides much of the a11y/keyboard behavior natively (may make several redundant).

**Delete / don't copy:**
- All `components/` (rebuild on ShadCN/Radix).
- Component-tier tokens & the generated block.
- `component-builder` skill's component-token-first flow (rewrite — see §6).

**Build fresh:**
- ShadCN/Radix component layer.
- ShadCN-standard semantic token set.
- Multi-target export panel (CSS / IR / design.md).

---

## 6. Skills to update

- **`component-builder`** — biggest change. Today it writes a component-token block first, then TSX referencing `var(--component-*)`. New flow: scaffold a ShadCN/Radix component, style with standard semantic utilities (`bg-primary` etc.), no component-token block. The "write tokens first / validate twice" token-chain rule is replaced by "use standard semantics; only create `--ext-*` tokens for genuine custom variants."
- **`figma-sync`** — unaffected by tiers in principle, but Ujwal's deterministic Figma work should consume the new IR. Defer.
- **`doc-generator`** — adapt to 2-tier; can largely drive off the new design.md export.
- Others (`security`, `state-handling`, `i18n`, `screenshot-workflow`) — likely minor; re-audit after Button is rebuilt.

---

## 6.5. Atomic design in v2 — what survives, what dies (spec for `component-builder-v2`)

> **Investigated 2026-06-21** by reading the old `component-builder` skill AND the real composition code in molecules/organisms. **Headline finding: GeekLego's atomic composition patterns are the SAME patterns ShadCN/Radix are built on** — compound sub-components + React context — just hand-rolled with `memo(forwardRef)` and a tier label. So composition transfers ~1:1 to Radix, which additionally *deletes* the two hairiest hand-rolled mechanisms. Atomic design as a **taxonomy** dies; atomic design as a **composition discipline** survives, re-homed.

### What atomic design actually controlled (it's architecture, not styling)

The atom/molecule/organism distinction barely touched tokens/visuals. It was load-bearing in exactly these places, and each maps cleanly to a v2 home:

| Old atomic rule | Status in v2 | New home |
|---|---|---|
| **Import graph** (atom imports nothing, molecule→atoms, organism→molecules+atoms; no circular/same-level) | **Keep** | **ESLint** `no-restricted-imports` / dependency rule — machine-enforced, not folders |
| **Extraction heuristic** ("a styled interactive control must become its own primitive" — the BarChart `<select>` case) | **Keep** | `component-builder-v2` decomposition phase — reworded "extract a reusable primitive", no "atom" label |
| **Composition-tree planning** (decompose UI → plan which pieces compose which) | **Keep — this is the skill's heart** | `component-builder-v2` Phase 1, bottom-up generation order (leaves first) |
| **Compound slots** (`Object.assign(Card,{Header,Body})`, internal consts) | **Keep, restyle** | ShadCN sub-component-export pattern (same shape; often wrapping a Radix primitive) |
| **Context coordination** (Header/Tabs `createContext`+`useContext`) | **Keep — Radix does it better** | Prefer the Radix primitive's built-in context over hand-rolling |
| `memo(forwardRef)` mandatory on L1/L2 | **Dies** | Radix primitives + `cva`/`cn` (Button already proved this) |
| `cloneElement` injection (Tabs `_tabIndex`) | **Dies** | Radix context handles it natively |
| `__slot` marker classification (InputGroup) | **Dies** | Radix `Slot` / `asChild` |
| `catalog.ts` + `scripts/catalog.ts` + folder tiers + `getComponentLevel` | **Dies** | Flat `components/<Name>/`; no catalog regeneration |
| Tier labels atom/molecule/organism | **Demoted** | Optional `level` metadata field ONLY if something consumes it (docs site is just a website — does NOT define logic, so not a blocker) |

### The composition patterns transfer 1:1 (evidence)

Real GeekLego patterns ↔ ShadCN/Radix equivalents (all confirmed in code):
- **Compound slots** `Object.assign(Card,{Header,Body})` ↔ ShadCN `Card`/`CardHeader`/`CardContent` — *identical*.
- **Context** Header/Tabs `createContext` ↔ every Radix primitive is provider+consumers — *identical, Radix does it better*.
- **Direct atom composition** FormField renders `<Label>`/`<Input>` ↔ ShadCN FormField does the same — *identical*.
- **`cloneElement` injection** & **`__slot` markers** ↔ Radix context / `Slot` — *Radix replaces these; stop hand-writing them*.

### The ONE genuinely new skill responsibility

**"Does Radix already provide this primitive?"** Before generating a compound component by hand, `component-builder-v2` must check `@radix-ui/react-*` (Dialog, Popover, Tabs, Tooltip, etc.) and build on it instead of reimplementing. This is the single biggest new decision the skill makes — and Step 4 (Dialog, Combobox) is exactly where it gets validated.

### Net for `component-builder-v2`
Keep: decomposition + extraction + composition-tree planning + bottom-up order. Re-home import discipline to ESLint. Generate ShadCN compound-component + `cva`/`cn` code (not `memo(forwardRef)` + component-token blocks). Add the "use the Radix primitive if it exists" check. Drop: folders, catalog, tier labels, `cloneElement`/`__slot` hand-rolling.

---

## 7. Validation slice — prove it before scaling

Don't rebuild 81 components on faith. Rebuild **3, spanning complexity**, and look:

1. **Button** — trivial. Proves the ShadCN-semantic vocabulary + Tailwind utilities + your primitives render correctly. Also build **one custom variant (gamified)** here to test the `--ext-*` namespacing.
2. **Dialog/Modal** — focus trap + portal. Radix handles a11y; proves how much of `utils/keyboard` becomes redundant.
3. **Combobox** — listbox / `aria-activedescendant`. Highest a11y surface; the real test of "does Radix earn its place."

For each: confirm it renders with geeklego primitives, theming works (toggle a `.dark` semantic override), and an LLM can generate a screen using only standard ShadCN vocabulary.

**Decision gate:** if the 3-component slice is clearly cleaner than today's 3-tier versions (less code, standard vocab, a11y for free, custom variant contained) → roll forward and this becomes the migration target. If custom-variant `--ext-*` sprawl bites or theming breaks → you learned it for 3 components, not 81.

---

## 7.5. When `geeklego.css` becomes a 2-tier file (the component-token deletion)

> **TL;DR: NOT now, NOT during the Button slice. This happens at Step 4 — AFTER the decision gate (§7). Deleting earlier breaks all 81 existing components instantly.**

`geeklego.css` currently holds all three tiers. The component tokens are **not** scattered — they live in one contiguous block **below the marker**:

```
/* ─── GENERATED COMPONENT TOKENS ─────────────────────────────────────────── */
```

The parser (`cssParser.ts`) already uses this exact marker as the boundary between semantics and component tokens. That makes the eventual cut mechanical.

**Sequencing — do it in this order:**

1. **Step 2 (Button slice): ADD, don't delete.** Write the new ShadCN semantic layer *alongside* the existing tokens. The old `--button-*`, `--accordion-*`, etc. just sit there unused while the new Button is proven. The file temporarily holds **both** systems — unused tokens hurt nothing, and the old components stay rendering as a live comparison.

2. **Step 4 (after the §7 gate passes): cut to 2-tier.** Concretely:
   - **Confirm first** that nothing in the new component layer references any `var(--<component>-*)` token (grep the new `components/`).
   - **Truncate** everything from the `GENERATED COMPONENT TOKENS` marker onward. What remains = primitives (`@theme`) + the standard ShadCN semantic layer + `--ext-*` custom-variant tokens. That's the clean 2-tier file.
   - **Keep** any `--ext-<component>-<variant>-*` tokens — those are intentional (custom variants), not component-tier tokens. Place them in their own clearly-labeled block, *not* under the deleted marker.

3. **Adapt the tooling in the same step** (these currently *require* the component block to exist, so they break the moment it's gone — see §4, §5):
   - `cssParser.ts` — stop parsing the `GENERATED COMPONENT TOKENS` section / `componentGroups`.
   - `cssGenerator.ts` — stop emitting that section.
   - `validate-tokens.ts` — drop the component-tier passes and the "no primitives in TSX" rule (ShadCN components reference semantics directly).
   - Token Editor — strip the component-token panes (§4).

**Why this is safe at Step 4 but not before:** every one of the 81 existing components references `var(--<component>-*)`. Delete those tokens while the old components still exist → they all render unstyled at once, and you're debugging a broken repo while *also* still figuring out the new pattern. By Step 4 the old components are being replaced anyway, so the deletion lands on code that's already on its way out.

---

## 8. Layout — `v2/`-nested (ACTUAL, as built in Step 2)

> **Why nested, not the flat root layout originally sketched:** this prototype runs **inside the existing repo**, where `design-system/` and `components/` already hold the live 3-tier system. Nesting all new work under `v2/` subfolders keeps the two systems unambiguous and makes the Step-4 cleanup a clean `rm -rf` (no "which sibling is new vs old?" guesswork). Even though the flat root names (`primitives.css`, `semantics.css`, `themes/`, `components/Button/`) don't *collide* today, sitting beside the live system invites import ambiguity. **Keep the `v2/` nesting.** (The earlier sketch assumed a fresh empty `~/geeklego-v2-prototype/` folder, which isn't how this is being built.)

```
geeklego-v2/                       # existing repo; old 3-tier system still present at root until Step 4
  design-system/
    geeklego.css                   # OLD 3-tier source — untouched until Step 4 (see §7.5)
    v2/                            # NEW 2-tier system, isolated
      primitives.css               #   geeklego @theme + :root mirror, copied unchanged
      semantics.css                #   ShadCN standard vocab, aliased to primitives (+ --ext-* block)
      themes/dark.css              #   semantic overrides ([data-theme="dark"], .dark)
      index.css                    #   entrypoint
  components/
    atoms/ molecules/ organisms/   # OLD components — untouched until Step 4
    v2/                            # NEW ShadCN/Radix components
      Button/{Button.tsx, Button.types.ts, button-variants.ts, Button.stories.tsx}
      lib/cn.ts                    #   clsx + tailwind-merge helper
  app/                             # Token Editor — adapt to 2-tier cockpit in Step 4 (untouched in Step 2)
  scripts/                        # validate-tokens.ts etc. — adapt in Step 4; NEW export-ir.ts / export-design-md.ts
  .claude/skills/
    component-builder/             # OLD 3-tier skill — do NOT use (see Phase 0 guardrail)
    component-builder-v2/          # NEW — built via skill-creator in Step 3 (§6.5)
```

At the Step-4 decision gate, promotion is mechanical: `v2/` contents move up to root (or stay nested — your call), and the old `design-system/geeklego.css` component block + old `components/{atoms,molecules,organisms}/` get deleted per §7.5.

---

## 9. Open questions / risks to watch

- **Radix redundancy with existing utils** — quantify how much of `utils/keyboard` + `utils/aria` Radix replaces. Could be a large simplification win or a source of double-handling.
- **Custom-variant sprawl** — the `--ext-*` namespace is the containment strategy; the Button gamified variant is the canary. Watch whether it stays clean at variant #5, not just #1.
- **ShadCN's token set vs geeklego's richer needs** — ShadCN's vocabulary is intentionally minimal. If geeklego needs semantics ShadCN doesn't define (e.g. status/info colors, data-series for charts), extend the standard set deliberately and document the additions as "geeklego extends ShadCN."
- **Tailwind v4** — prototype on v4 (pilot fork already upgraded per MOM); `@theme` is the integration point for primitives → utilities.
- **Don't let the prototype quietly become production** — keep it git-free and clearly labeled until the decision gate passes.
```

---

## 10. Explicitly deferred

- React Native & Flutter targets (other team; export panel stubs only).
- Figma deterministic sync (Ujwal, consumes the IR).
- V2 "configurable variants as variables" (MOM) — beyond this prototype.
- Any migration of the production repo — only after the decision gate.
