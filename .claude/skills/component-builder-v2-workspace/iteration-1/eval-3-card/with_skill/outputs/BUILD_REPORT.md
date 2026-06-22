# Card — Build Report

## Composition Plan

### 1. The composition tree

Card is a **compound component** using the ShadCN sub-component-export pattern.
The pieces and what composes what:

```
Card                      ← root surface (border + bg-card), variant host, asChild
├── CardHeader            ← vertical stack (gap), padded
│   ├── CardTitle         ← <h3>, text-card-foreground, semibold
│   └── CardDescription   ← <p>, text-muted-foreground
├── CardContent           ← main body slot (p-6 pt-0)
└── CardFooter            ← action row: flex, justify-end, gap-2
        └── <Button> …    ← REUSED from components/v2/Button (Save / Cancel)
```

All parts are sibling named exports (`Card`, `CardHeader`, `CardTitle`,
`CardDescription`, `CardContent`, `CardFooter`). The consumer composes the tree;
the parts do not hard-nest each other, matching the shipped Dialog's
Header/Footer/Title/Description shape. This keeps every slot optional and
composable (a card can be header+content only).

### 2. Existing components inspected + reuse decision

Inspected:
- `components/v2/Button/` (Button.tsx, button-variants.ts, Button.types.ts,
  Button.stories.tsx) — the canonical simple-component reference.
- `components/v2/Dialog/` (Dialog.tsx, Dialog.types.ts) — the canonical
  compound reference; its `DialogHeader` / `DialogFooter` / `DialogTitle` /
  `DialogDescription` layout helpers are the direct precedent for Card's slots.
- `design-system/v2/semantics.css` — confirmed the tokens Card consumes exist:
  `card`, `card-foreground`, `border`, `muted-foreground`, `foreground`,
  `background`, `radius`.

**REUSE, do NOT rebuild:** the footer's action buttons (Save / Cancel) use the
existing `components/v2/Button`. Card does **not** ship, import-bundle, or
re-create any button — `CardFooter` is a neutral layout slot and the stories
import `Button` from `../Button/Button` to demonstrate the intended composition.
Rebuilding a button inside Card would duplicate styling and violate the
"is this worth its own file? it already exists" reuse discipline.

No other v2 component fit a sub-part of Card, so the remaining parts (Header,
Title, Description, Content, Footer) are new, thin, presentation-only wrappers.

### 3. Radix primitive verdict

**Verdict: NO Radix primitive.** Per `references/radix-primitive-map.md`,
the "When Radix does NOT apply" section explicitly lists **Card** among the
static, pure-presentation components ("Badge, Chip, Tag, Card, Skeleton … →
`cva` + `cn` only"). Card has no focus trap, no keyboard navigation, no portal,
no dismiss behavior, and no managed `aria-*` state — it is styled markup. The
rule of thumb ("if it traps focus, opens a layer, navigates with arrow keys,
manages aria-* state, or portals → Radix; if it's styled markup → hand-roll")
lands firmly on hand-roll.

The single Radix touch is `@radix-ui/react-slot` for `asChild` polymorphism
(a whole card rendered as an `<a>`/`<article>`) — exactly as Button uses it.
Slot is already installed; no new dependency. See INSTALL_NOTES.txt.

### 4. Build order (leaves-first)

1. **`card-variants.ts`** — `cva` base (surface) + `elevation` variant. Leaf, no deps.
2. **`Card.types.ts`** — props per part (native attrs + `CardVariantProps` + `asChild?`).
3. **`Card.tsx`** — root + the five sub-components, composed from the variants/types above.
4. **`Card.stories.tsx`** — composes the whole tree and pulls in the reused Button last.

Tokens were a no-op step (Phase 1 skipped): no new core semantic justified, no
brand-custom variant, so `design-system/v2/` was not touched and **no `--ext-*`
tokens were added**. `elevation` is expressed with standard `shadow-*` utilities.

---

## Build summary

### Files produced (mirror the Button/Dialog 4-file set; no README — anatomy is conventional ShadCN, no non-obvious keyboard behavior)

| File | Role |
|---|---|
| `Card.tsx` | Root + `CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter`, all `forwardRef` + `displayName`, `cn()` merge, `asChild` via Slot on the root. |
| `Card.types.ts` | `CardProps` (native div attrs + `CardVariantProps` + `asChild?`) + per-part prop aliases. |
| `card-variants.ts` | `cva`: base surface (`rounded-lg border border-border bg-card text-card-foreground`) + `elevation: flat | raised` (`shadow-none` / `shadow-md`). |
| `Card.stories.tsx` | `v2/Card`: Default (full anatomy w/ Save+Cancel Buttons), Elevation, HeaderAndContentOnly, AsChildLink, DarkMode (both `data-theme="dark"` + `.dark`, `max-w-2xl`). |
| `INSTALL_NOTES.txt` | Records that no new Radix package is needed. |

### Rule compliance check
- 2-tier integrity: consumes **semantics only** (`bg-card`, `text-card-foreground`, `border-border`, `text-muted-foreground`, `text-foreground`, `bg-background`); never references a primitive; no hardcoded hex/px; no bare arbitrary literals.
- No component-token tier written.
- No new core semantic invented; no `--ext-*` block touched.
- `forwardRef` + `displayName` (plain, not `memo(forwardRef)`); `cva` + `cn`; `asChild` + Slot.
- No hand-rolled a11y (none needed — Card is static).
- Relative imports only (`../lib/cn`, `../Button/Button`); no package paths between v2 files; no 3-tier imports.
- DarkMode story sets both selectors + `max-w-2xl`.

### Verification notes
Files were written to the test sandbox `outputs/` dir (not the live
`components/v2/` tree, per instructions), so the real `tsc`/Storybook/lint
pipeline was not run against them. The imports are authored as if the slice
lived at `components/v2/Card/` (`../lib/cn`, `../Button/Button`,
`../../../design-system/v2/index.css`), so dropping the four component files into
that folder is paste-and-go. Manual review confirms: types align with the native
elements, every utility used maps to a registered semantic in `semantics.css`,
and the pattern matches Button (simple) + Dialog (compound) exactly.
