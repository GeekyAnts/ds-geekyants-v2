# GeekLego — Multi-Brand / Multi-Target Architecture

> **Status:** Draft for review · **Owner:** Bitta · **Date:** 2026-06-20
> **Purpose:** Turn the workshop MOM into a concrete, grounded plan. This document records *what we're actually building*, *where the work lives*, and *why the architecture decouples the way it does* — written against the real state of the codebase, not the whiteboard.

---

## 1. TL;DR

GeekLego is becoming a **fork-per-brand** design system. Each brand forks GeekLego, sets its own tokens, and runs scripts that emit a shared, deterministic **token Intermediate Representation (IR)**. Every other platform — React Native, Flutter, Figma, plain Design docs — consumes that IR. They do **not** import a shared runtime library.

**The IR file is the contract. Decoupling lives in the contract, not in shared code. That is the structural answer to the Jio problem** (4.5 years, 400 tightly-coupled libraries, low adoption).

**Bitta's scope is narrower than the MOM implies:**
- Own the **web-React component library** and the **architecture** other platforms plug into.
- Build the **export engine** that emits the token IR (+ an aggregate Design MD).
- Run a **ShadCN / Radix / Base UI spike** (evaluation only) for an accessible component base.
- **Do not** write RN, Flutter, or Figma code. Those teams build *against* the IR. Figma is Ujwal's.

---

## 2. The reality on the ground (why this plan is shaped the way it is)

Before planning, the codebase was inspected. The findings change the framing significantly:

### What already exists (stronger than the MOM suggests)

| Capability | Where | Notes |
|---|---|---|
| Single token source of truth | `design-system/geeklego.css` | ~3,249 token declarations across 3 tiers |
| CSS → JS token parser | `app/src/utils/cssParser.ts` | Separates tiers, **keeps light/dark split**, **preserves aliases unresolved** |
| JS → CSS generator | `app/src/utils/cssGenerator.ts` | Includes a reusable `color-mix() → rgba()` resolver |
| Token metadata | `scripts/generate-metadata.ts` → `tokens.metadata.json` | Descriptions + inferred types per token |
| Alias-chain walking | `app/src/shell/Inspector/Inspector.tsx` | Logic to resolve `var(--x)` to a final value |
| Tier classification | `app/src/vite-plugin/token-api.ts` (`/api/categorize`) | Atom/molecule/organism heuristic |
| ~81 web components | `components/{atoms,molecules,organisms}/` | 38 atoms, 27 molecules, 16 organisms |

> **The most important technical finding:** the parser **does not flatten aliases**. A semantic token like `--color-action-primary: var(--color-brand-500)` is stored as the literal string `var(--color-brand-500)`, not the resolved hex. This is exactly what a good token IR wants — the W3C standard expresses this as `"$value": "{color.brand.500}"`. So roughly 70% of the IR engine already exists; we are *repackaging* an existing pipeline, not building one from scratch.

### What does not exist at all

- No token export beyond CSS — no JSON, no W3C/DTCG format, no Dart, no TS tokens.
- No React Native or Flutter target of any kind.
- No aggregate "Design MD" generator (only per-component READMEs).
- No deterministic Figma export — the current `figma-sync` skill is **LLM-driven**, pushing one variable at a time via MCP. *(This is the source of the "~140k tokens for one input field" pain.)*
- Components are **100% web** — Tailwind `className` with `var(--token)` baked into DOM elements (`<button>`, etc.). There is **no platform abstraction layer.**

---

## 3. The key reframe: two problems, not five targets

The MOM treats "scripts compile to all targets" as a single workstream. In reality there are two very different problems:

### Problem A — Token targets (deterministic, buildable now)
Figma variables, Design MD, RN tokens, Flutter tokens. These are **data transformations** of the token tree. The parser, the tier separation, the light/dark split, and the alias preservation already exist. A single deterministic script can emit a canonical IR; each consumer transforms the IR into its own format.

### Problem B — Component targets (NOT Bitta's problem)
RN components, Flutter widgets. You cannot "compile" a web-React component (Tailwind + DOM) into a Flutter widget — that is a per-platform rewrite, not a script. **Per the clarified scope, this is owned by other teams**, who build their components against the IR + Design MD using Bitta's architecture.

**Consequence:** Bitta's build = **token IR engine + Design MD + ShadCN spike**, entirely inside GeekLego. No platform component compilation anywhere in this plan.

---

## 4. Where the work lives — the two-repo rule

You have two repos and the central risk is doing engine work in the brand fork, which strands the engine and silently recreates Jio-style coupling.

> ### **The rule: mechanism → GeekLego (engine). Content → the fork (`geekyants/design-system`).**

| | **GeekLego** (engine) | **`geekyants/design-system`** (first fork / pilot) |
|---|---|---|
| **Role** | The machine | A validation surface, not a build surface |
| **What goes here** | Export scripts, the IR emitter, the Design MD generator, the ShadCN spike, architecture changes, component library | Brand colors & tokens, brand config, *running* the engine's exports, proving the IR is consumable |
| **Why** | Every future brand fork inherits these for free | If you build scripts here, every brand re-pulls the same machinery — that **is** the Jio coupling problem, just inverted |

**Sync mechanism:** the fork periodically rebases/merges from GeekLego upstream to pull in engine improvements. Keep brand divergence confined to token files + brand config — **never** the scripts. If a thing would help a *second* brand, it's mechanism, and it belongs in GeekLego.

---

## 5. Why this avoids the Jio outcome

Jio failed because ~400 libraries were **tightly coupled** — every consumer imported shared runtime code, so every change rippled everywhere and adoption stalled.

Our decoupling is structural:

- **The contract is a file (the IR), not a library.** Downstream teams read `tokens.json`; they never `import` GeekLego at runtime.
- **The IR is versioned and stamped with a git SHA**, so a consumer knows exactly what it built against and upgrades on its own schedule.
- **Forks diverge in data, not in mechanism.** Brand differences are token values, not forked scripts.
- **The Design MD is the loosest coupling of all** — a team can consume *just the Markdown* and apply it to a stack we've never heard of, importing nothing.

This is the opposite of 400 coupled libraries: one small, standard, versioned contract that everyone reads and no one is chained to.

---

## 6. Deliverables

### Deliverable 1 — Strategy / Architecture doc *(this document)*
Align with Sanket and Pratik **before** writing the engine. Specifically nail down:
1. **IR-as-contract** principle (Section 5).
2. **Repo boundary** rule (Section 4).
3. **Scope fences** — make the MOM's implied "Bitta compiles all targets" *explicitly false* in writing, so nobody waits on RN/Flutter component code from Bitta.
4. **IR format = W3C DTCG JSON** (`$value`, `$type`, alias as `{group.token}`). Standard, tool-agnostic, Tokens-Studio/Figma-friendly (helps Ujwal), and preserves the alias relationships the parser already keeps.
5. **Versioning** — IR carries semver + source git SHA.

### Deliverable 2 — Token IR Export Engine *(the keystone)*
A standalone script, **no LLM**, that reads `geeklego.css` and emits a deterministic DTCG-format JSON IR.

- **New file:** `scripts/export-ir.ts` → outputs `dist/ir/tokens.json`.
- **Reuses:** `parseGeeklegoCss()` (as-is), the `color-mix` resolver from `cssGenerator.ts`, `tokens.metadata.json` for descriptions/types, the alias-walk from `Inspector.tsx`, the tier heuristic from `token-api.ts`.
- **Small net-new code:** an `resolveAlias()` helper, a `parseComponentTokens()` step (the parser doesn't currently capture the generated component-token block — a known gap), and the DTCG emitter.
- **Each token emits both** its alias reference *and* a resolved value, so each consumer takes whichever it needs.
- **Out of scope here:** emitting Dart/Swift/RN/Figma formats — those are downstream transforms of the IR, owned by their teams.

### Deliverable 3 — Design MD generator *(the loosely-coupled target)*
- **New file:** `scripts/export-design-md.ts` → outputs `dist/ir/design-system.md`.
- Consumes the IR (not the CSS directly — this proves the IR is sufficient as a contract).
- Aggregates token tables (name → value → alias), typography classes, and per-component token references pulled from existing `components/*/README.md`.

### Deliverable 4 — ShadCN / Radix / Base UI evaluation *(spike only)*
Decide whether to re-base web components on an accessible unstyled primitive layer — **without committing to migrating all 81.**

- Prototype **3 representative components** by complexity:
  - **Button** — trivial baseline.
  - **Modal/Dialog** — focus trap + portal (already uses `useFocusTrap`).
  - **Combobox** — listbox / `aria-activedescendant`, the highest a11y surface.
- For each: strip the primitive's default styles, wire GeekLego component tokens via the existing `var(--component-*)` className pattern, confirm `validate-tokens` and the component's vitest stories still pass.
- **Radix vs Base UI head-to-head** on: token-chain compatibility, bundle/tree-shaking, Next.js SSR & the `"use client"` boundary, and LLM-friendliness for screen generation (the stated benefit).
- **Output:** a recommendation memo (migrate / don't / partial), an effort estimate for the full 81, and 3 prototypes on a spike branch. **No mass migration in this plan.**

---

## 7. Sequencing

1. **Strategy doc (D1)** — first. Unblocks the Sanket/Pratik sync and fixes scope in writing. (~½ day drafting.)
2. **IR engine (D2)** — the keystone; everything downstream consumes it.
3. **Design MD (D3)** — right after IR; proves IR sufficiency. Can overlap the end of D2.
4. **ShadCN spike (D4)** — independent of the IR work; run it in parallel.
5. **Fork validation** — once IR + MD exist, run them in `geekyants/design-system` with GeekyAnts brand tokens. Confirm Ujwal can consume `tokens.json` for Figma and the RN/Flutter teams can consume it for theirs.

---

## 8. Critical files

| Purpose | Path | Action |
|---|---|---|
| Token source of truth | `design-system/geeklego.css` | read-only input |
| CSS → JS parser | `app/src/utils/cssParser.ts` | reuse as-is |
| `color-mix` resolver | `app/src/utils/cssGenerator.ts` | port helper |
| Alias-walk logic | `app/src/shell/Inspector/Inspector.tsx` | port `walkAliasChain` |
| Tier classifier | `app/src/vite-plugin/token-api.ts` | port heuristic |
| Metadata + types | `scripts/generate-metadata.ts`, `app/src/types.ts` | read / extend |
| **IR exporter** | `scripts/export-ir.ts` | **NEW** |
| **Design MD generator** | `scripts/export-design-md.ts` | **NEW** |
| **This doc** | `MULTI-TARGET-ARCHITECTURE.md` | **NEW** |
| package.json scripts | `package.json` | add `export-ir`, `export-design-md` |
| ShadCN spike targets | `components/atoms/Button`, `components/molecules/Modal`, `components/molecules/Combobox` | prototype on spike branch |

---

## 9. How we'll verify it works

- **IR engine:** `npm run export-ir` produces `dist/ir/tokens.json`; running it twice yields a byte-identical file (determinism). Every semantic/component token resolves to a real primitive (no dangling `var()` — reuse `validate-tokens.ts` assertions). Spot-check a known token (e.g. `--button-primary-bg`) carries the right alias + resolved value + light/dark modes.
- **Design MD:** `npm run export-design-md` produces `design-system.md`; eyeball token tables and per-component sections against the live CSS.
- **ShadCN spike:** for each of the 3 components, `npm run validate-tokens` exits at baseline and `npx vitest <component>.stories.tsx` passes; visual parity confirmed via the screenshot-workflow skill.
- **Fork validation:** in `geekyants/design-system`, set GeekyAnts brand tokens, run both exporters, hand `tokens.json` to Ujwal (Figma) and the RN/Flutter teams; confirm end-to-end consumption.

---

## 10. Open questions for the Sanket / Pratik sync

These do **not** block starting the IR engine, but should be settled before downstream teams commit:

1. **IR format = DTCG JSON** — do the RN, Flutter, and Figma teams agree to consume this as the contract?
2. **Fork ↔ engine sync cadence** — who owns keeping each brand fork current with engine improvements, and on what rebase strategy?
3. **V2 "configurable variants"** (from the MOM — variants becoming variables rather than predefined) is **not** in this plan. Flag it as a separate later track so it doesn't get folded into V1 expectations.

---

## Appendix — Mapping the MOM to reality

| MOM statement | Reality / adjustment |
|---|---|
| "Scripts generate compiled targets: RN, Flutter, Next.js, Figma, Design MD" | Split into **token targets** (deterministic, buildable) vs **component targets** (per-platform rewrites). Bitta builds the **token IR + Design MD**; component targets are downstream teams'. |
| "Bitta: write/integrate scripts for all targets" | Clarified: Bitta builds the **IR engine** (one canonical output). Each platform team transforms the IR into its own target. |
| "Figma sync is token-heavy (~140k tokens)" | Confirmed — caused by the LLM-driven `figma-sync` skill writing one variable at a time. The deterministic fix is the IR; **Ujwal owns the Figma emitter** on top of it. |
| "Design MD as loosely-coupled option" | Adopted as the lowest-coupling target — a team can consume only the MD, importing nothing. |
| "Component libraries published to NPM, optional" | Web-React library only (Bitta's). Publishing config exists in `package.json`; the publish step itself is not yet wired. Out of scope for this plan. |
| "Adopt ShadCN, strip styles, apply tokens" | Treated as a **3-component spike**, not a commitment to migrate all 81. Recommendation memo + effort estimate to follow. |
| "Custom variants — V1 predefined, V2 configurable" | V2 is explicitly **out of scope** here; flagged as a separate track. |
