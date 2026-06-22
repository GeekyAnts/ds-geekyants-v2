"use client";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { cn } from "../lib/cn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../Dialog/Dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "../Command/Command";
import type {
  CommandDialogProps,
  UseCommandPaletteOptions,
} from "./CommandPalette.types";

/**
 * CommandPalette — the VS Code / Linear "Cmd+K" command palette.
 *
 * This is a COMPOSITION, not a new primitive. Every hard part already exists
 * in the v2 library and is reused verbatim:
 *
 *   • Dialog  (@radix-ui/react-dialog, via components/v2/Dialog) — owns the
 *     pop-open layer: focus trap, escape-to-dismiss, click-outside, scroll
 *     lock, portal, and aria-modal wiring.
 *   • Command (cmdk, via components/v2/Command)                 — owns the
 *     listbox engine: type-to-filter, arrow-key navigation, the active
 *     descendant (aria-activedescendant / aria-selected) tracking, and the
 *     empty state.
 *
 * The ONLY thing this file adds is the glue that nobody else owns:
 *   1. nesting Command inside DialogContent (the ShadCN "CommandDialog" recipe)
 *      and restyling Content to be a palette surface, and
 *   2. a global Cmd+K / Ctrl+K hotkey to toggle it open (`useCommandPalette`).
 *
 * The hotkey is hand-rolled deliberately: it is a global open-trigger, NOT an
 * a11y/keyboard-navigation surface — Radix has no primitive for "listen for a
 * chord on document". All the focus/keyboard/ARIA behavior still comes from
 * Radix + cmdk; we never re-roll those.
 */

/* ── CommandDialog — Command rendered inside a Dialog as a palette ──────────── */
export const CommandDialog = forwardRef<HTMLDivElement, CommandDialogProps>(
  (
    {
      open,
      onOpenChange,
      title = "Command palette",
      description = "Search for a command to run.",
      className,
      commandProps,
      children,
      ...props
    },
    ref,
  ) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        ref={ref}
        showClose={false}
        // override Dialog's default p-6/gap-4 — the palette is edge-to-edge,
        // with the search input flush to the top and the list below it.
        className={cn("max-w-xl gap-0 overflow-hidden p-0", className)}
        {...props}
      >
        {/* Title/Description wire aria-labelledby/aria-describedby onto Content.
            Visually hidden so the palette stays chromeless, but screen readers
            still announce what this surface is. */}
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command
          // a touch more breathing room than the default Popover-sized Command;
          // everything else (filter/keyboard/aria) is cmdk's, untouched.
          className="[&_[cmdk-group-heading]]:text-muted-foreground"
          {...commandProps}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  ),
);
CommandDialog.displayName = "CommandDialog";

/* Controlled/uncontrolled state helper (kept local — no extra dep). */
function useControllableState(
  controlled: boolean | undefined,
  onChange: ((open: boolean) => void) | undefined,
): [boolean, (next: boolean | ((prev: boolean) => boolean)) => void] {
  const [uncontrolled, setUncontrolled] = useState(false);
  const isControlled = controlled !== undefined;
  const value = isControlled ? controlled : uncontrolled;
  const setValue = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      const resolved =
        typeof next === "function"
          ? (next as (prev: boolean) => boolean)(value)
          : next;
      if (!isControlled) setUncontrolled(resolved);
      onChange?.(resolved);
    },
    [isControlled, onChange, value],
  );
  return [value, setValue];
}

/**
 * useCommandPalette — wires the global Cmd+K (macOS) / Ctrl+K (Win/Linux)
 * shortcut and returns the open state to hand to <CommandDialog>.
 *
 * Returns `{ open, setOpen }`; pass `open={open} onOpenChange={setOpen}` to
 * CommandDialog. Optionally pass your own `open`/`onOpenChange` to control it
 * externally — the hotkey still toggles whatever state you provide.
 */
export function useCommandPalette(
  options: UseCommandPaletteOptions = {},
): { open: boolean; setOpen: (open: boolean) => void } {
  const { open, onOpenChange, enabled = true, key = "k" } = options;
  const [value, setValue] = useControllableState(open, onOpenChange);

  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setValue((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [enabled, key, setValue]);

  return { open: value, setOpen: setValue };
}

/* Re-export the Command parts so consumers build the palette body from one
   import — no need to also reach into components/v2/Command directly. */
export {
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};
