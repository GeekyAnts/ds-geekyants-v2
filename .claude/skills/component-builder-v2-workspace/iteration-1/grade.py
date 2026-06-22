#!/usr/bin/env python3
"""Programmatic grader for component-builder-v2 evals. Writes grading.json per run."""
import json, os, re, glob

BASE = os.path.dirname(os.path.abspath(__file__))

def read(path):
    try:
        return open(path, encoding="utf-8").read()
    except Exception:
        return ""

def all_src(run_dir):
    """Concatenate all .tsx/.ts source (exclude reports/notes) for content checks."""
    out = []
    for f in glob.glob(os.path.join(run_dir, "outputs", "*")):
        if f.endswith((".tsx", ".ts")):
            out.append(read(f))
    return "\n".join(out)

def install_notes(run_dir):
    return read(os.path.join(run_dir, "outputs", "INSTALL_NOTES.txt"))

def report(run_dir):
    return read(os.path.join(run_dir, "outputs", "BUILD_REPORT.md"))

# (assertion text, fn(run_dir)->(passed, evidence))
def a(text, fn):
    return {"text": text, "fn": fn}

def has(s, *subs):
    return all(sub in s for sub in subs)

ASSERTIONS = {
  0: [  # Badge — simple, no radix
    a("Uses cva for variants in a *-variants.ts file",
      lambda d: (os.path.exists(os.path.join(d,"outputs","badge-variants.ts")) and "cva(" in all_src(d),
                 "badge-variants.ts present with cva()")),
    a("Uses forwardRef + displayName, NOT memo(forwardRef)",
      lambda d: ("forwardRef" in all_src(d) and "displayName" in all_src(d) and "memo(forwardRef" not in all_src(d),
                 "forwardRef + displayName, no memo()")),
    a("Does NOT pull in a Radix behavioral primitive (only Slot allowed)",
      lambda d: (not re.search(r"@radix-ui/react-(?!slot)", all_src(d)),
                 "no @radix-ui behavioral import")),
    a("Uses standard semantic utilities (bg-primary / bg-secondary / bg-destructive / border-input)",
      lambda d: (any(t in all_src(d) for t in ["bg-primary","bg-secondary","bg-destructive"]) and "border-input" in all_src(d),
                 "semantic color utilities present")),
    a("No hardcoded hex/px or bare arbitrary color literals",
      lambda d: (not re.search(r"(bg|text|border)-\[#", all_src(d)) and not re.search(r"#[0-9a-fA-F]{3,6}\b", all_src(d).replace('fill-popover','')),
                 "no hex / arbitrary color literals")),
    a("DarkMode story sets BOTH data-theme=dark and .dark",
      lambda d: (has(read(glob.glob(os.path.join(d,"outputs","*.stories.tsx"))[0] if glob.glob(os.path.join(d,"outputs","*.stories.tsx")) else ""), 'data-theme="dark"') and ".dark" in all_src(d),
                 "both selectors in story")),
    a("No component-token tier block (--badge-* style)",
      lambda d: (not re.search(r"--badge-[a-z]", all_src(d)),
                 "no --badge-* component tokens")),
  ],
  1: [  # Tooltip — radix
    a("Builds on @radix-ui/react-tooltip (does NOT hand-roll hover/focus/positioning)",
      lambda d: ("@radix-ui/react-tooltip" in all_src(d),
                 "imports @radix-ui/react-tooltip")),
    a("Install command uses npm, NOT pnpm  [TARGETED FIX]",
      lambda d: ("npm install" in install_notes(d) and "pnpm add" not in install_notes(d),
                 install_notes(d).strip().splitlines()[0] if install_notes(d).strip() else "(empty)")),
    a("Pass-through Radix parts re-exported; only Content styled (compound pattern)",
      lambda d: ("TooltipTrigger" in all_src(d) and "TooltipContent" in all_src(d),
                 "Trigger + Content sub-components present")),
    a("Uses popover semantic tokens (bg-popover / text-popover-foreground)",
      lambda d: ("bg-popover" in all_src(d),
                 "bg-popover used")),
    a("No hand-rolled focus trap / escape / click-outside hooks",
      lambda d: (not re.search(r"useFocusTrap|useEscapeDismiss|useClickOutside", all_src(d)),
                 "no hand-rolled a11y hooks")),
    a("side default is top (request: 'above by default')",
      lambda d: ('side="top"' in all_src(d) or "side = \"top\"" in all_src(d) or "side="not in all_src(d) and "top" in all_src(d),
                 "side=top defaulted")),
  ],
  2: [  # Command palette — reuse
    a("Reuses the shipped Command (cmdk) rather than rebuilding filtering/keyboard nav",
      lambda d: (re.search(r"from\s+['\"].*Command", all_src(d)) is not None or "Command" in report(d) and "reuse" in report(d).lower(),
                 "imports/composes existing Command")),
    a("Composes inside Dialog (CommandDialog recipe) — does not rebuild portal/focus trap",
      lambda d: (re.search(r"from\s+['\"].*Dialog", all_src(d)) is not None,
                 "imports existing Dialog")),
    a("Does NOT hand-roll roving tabindex / arrow-key list navigation",
      lambda d: (not re.search(r"ArrowDown|ArrowUp|roving|activedescendant", all_src(d)) or "cmdk" in (all_src(d)+report(d)).lower(),
                 "no hand-rolled arrow-key nav (delegated to cmdk)")),
    a("Install command uses npm if any  [TARGETED FIX]",
      lambda d: ("pnpm add" not in install_notes(d),
                 install_notes(d).strip().splitlines()[0] if install_notes(d).strip() else "(none needed)")),
    a("BUILD_REPORT explicitly confirms it READ the existing Command/Combobox files",
      lambda d: ("Command" in report(d) and ("read" in report(d).lower() or "reused" in report(d).lower()),
                 "report documents reuse of existing components")),
  ],
}

def main():
    for eid, asserts in ASSERTIONS.items():
        for cfg in ["with_skill", "old_skill"]:
            run = os.path.join(BASE, f"eval-{eid}", cfg, "run-1")
            if not os.path.isdir(run):
                continue
            exps = []
            for item in asserts:
                try:
                    passed, ev = item["fn"](run)
                except Exception as e:
                    passed, ev = False, f"grader error: {e}"
                exps.append({"text": item["text"], "passed": bool(passed), "evidence": str(ev)})
            npass = sum(e["passed"] for e in exps)
            ntot = len(exps)
            grading = {"eval_id": eid, "config": cfg,
                       "summary": {"passed": npass, "failed": ntot - npass,
                                   "total": ntot,
                                   "pass_rate": (npass / ntot if ntot else 0.0)},
                       "expectations": exps}
            json.dump(grading, open(os.path.join(run, "grading.json"), "w"), indent=2)
            print(f"eval-{eid}/{cfg}: {npass}/{ntot}")

if __name__ == "__main__":
    main()
