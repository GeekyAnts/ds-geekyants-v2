# GeekLego v2 — Demo Overview

> A one-page narrative for the prototype demo: what was wrong with v1, what we changed, and what's still open.

---

## The problem we set out to solve (GeekLego v1)

GeekLego v1 was a **3-tier design system** — `primitive → semantic → component-token` — with components hand-rolled on top.

**Where it hurt:**

1. **A whole component-token tier to maintain.** Every component got its own generated token block (`--button-bg`, `--accordion-border`, …). That's a third layer of indirection to keep in sync — more to edit, more to break, ~1/3 of the Token Editor existed just to manage it.
2. **Custom semantic vocabulary.** Our semantic names (`--color-bg-primary`, `--color-action-*`, nested `bg/surface/text/action/status` groups) were geeklego-specific. **No LLM knows them** — every AI-generated screen had to learn our vocabulary first. Not paste-and-go.
3. **Everything hand-rolled.** Focus traps, escape-to-close, click-outside, roving tabindex, `aria-activedescendant`, portals — all built and maintained by us (`utils/keyboard`, `cloneElement` injection, `__slot` markers). High a11y surface, all on us to get right and keep right.
4. **Heavy components.** `memo(forwardRef)` everywhere + component-token-first build flow = a lot of ceremony to ship one component.

**Net:** more tiers, more custom vocabulary, more hand-written a11y — slower to build, harder for AI to consume, more to maintain.

---

## What we built (GeekLego v2)

A **clean-room rebuild** on two big bets: **collapse the tokens** and **adopt the industry-standard component stack**.

### 1. 2-tier tokens (dropped the component tier)
```
Tier 1 — PRIMITIVES   our brand palette/scales, UNCHANGED (the brand seam / fork point)
Tier 2 — SEMANTICS    standard ShadCN/Tailwind vocabulary  (--primary, --background, --border, --ring …)
COMPONENTS            consume semantics directly via Tailwind utilities: `bg-primary text-primary-foreground`
```
- **No component-token tier.** One less layer to maintain.
- **Standard ShadCN vocabulary** = in every LLM's training set → **paste-and-go AI generation**. Our brand identity stays in the primitives (Tier 1), which we keep unchanged.
- Custom brand variants are contained in a namespaced `--ext-*` block, kept separate from the core semantics so they never pollute the themeable layer.

### 2. Components on ShadCN + Radix UI
- **Radix gives us a11y for free** — focus trap, escape, click-outside, roving tabindex, `aria-activedescendant`, portals — all the stuff we used to hand-roll. We **deleted** the entire `utils/keyboard` layer.
- Standard pattern: `cva` variants + `cn()` + `forwardRef` + Radix `Slot` (`asChild`). Lean, industry-standard, LLM-familiar.

### 3. Token Editor → v2 Cockpit
- Rebuilt to control the live v2 system: edit **primitives + semantics + themes**, and it writes back to the real `design-system/v2/` files that components actually consume.
- The component-token machinery (~1/3 of the old editor) is **gone** — that's the simplification, made visible.

---

## What we validated (the proof, not faith)

We rebuilt **3 components spanning complexity** before committing to scale:

| Component | What it proved |
|---|---|
| **Button** (+ a `gamified` custom variant) | Standard vocab + our primitives render correctly; `--ext-*` containment works |
| **Dialog** | Radix deletes the entire hand-rolled focus-trap/escape/portal stack |
| **Combobox** (Popover + cmdk) | Highest a11y surface — listbox / `aria-activedescendant` all free; Radix earns its place |

**Decision gate: PASSED.** The slice is clearly cleaner — standard vocabulary, a11y for free, zero custom-variant sprawl, less code. **v2 is now the migration target.**

---

## Talking points: why this matters

- **Less to maintain** — one fewer token tier; no hand-written a11y.
- **AI-native** — standard ShadCN names mean an LLM can generate a full screen with zero custom-vocabulary onboarding.
- **Brand identity preserved** — primitives are untouched; only the semantic *interface* was standardized. Re-pointing semantics at different primitives = a brand fork.
- **Theming is live** — semantics register as real Tailwind utilities, so light/dark (and brand) overrides re-theme at runtime without a rebuild.

---

## Still open — discussion pointers & next scope

These are deliberately **deferred / open**, not oversights:

1. **Sync script for existing apps (migration tooling)** — v2 is the migration target, but the actual **script to migrate/sync existing apps** off v1's component tokens onto v2 semantics is **not built yet**. This is the big "how do we roll this out" conversation.
2. **Multi-target export** — the editor exports CSS today. The **IR exporter (DTCG JSON)** and **design.md exporter** are next; they feed everything downstream.
3. **Figma deterministic sync** — parked, waiting on the IR above (another team consumes it).
4. **React Native + Flutter targets** — export panel stubs only; owned by another team.
5. **ShadCN's minimal token set vs our richer needs** — if we need semantics ShadCN doesn't define (status/info colors, chart data-series), we extend the standard set deliberately and document it as "geeklego extends ShadCN."
6. **`--ext-*` custom-variant sprawl** — the containment strategy works at 1 variant; watch it holds at 5+.
7. **`doc-generator` skill + minor skill re-audit** (security, state-handling, i18n) — adapt to 2-tier; low-stakes.

---

*Bottom line: we cut a token tier, adopted an LLM-native standard vocabulary, and got accessibility for free via Radix — proven on 3 components across the complexity range. The gate passed. What's left is rollout tooling (sync script) and the export/sync surface (IR → Figma/RN/Flutter).*
