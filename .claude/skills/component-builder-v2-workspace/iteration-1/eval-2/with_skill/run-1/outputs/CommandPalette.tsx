"use client";
import { useEffect, useMemo, useState } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "../lib/cn";
import { Dialog, DialogContent } from "../Dialog/Dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../Command/Command";
import type {
  CommandAction,
  CommandPaletteProps,
  CommandDialogProps,
} from "./CommandPalette.types";

/**
 * CommandPalette — a Cmd/Ctrl+K command palette (VS Code / Linear style).
 *
 * Pure COMPOSITION of shipped v2 primitives — no behavior is re-rolled here:
 *   - Dialog (Radix)  owns the pop-open: focus trap, escape-to-dismiss,
 *     scroll lock, portal, aria-modal.
 *   - Command (cmdk)  owns the listbox: type-to-filter, ArrowUp/Down nav,
 *     Enter-to-select, and aria-activedescendant / role wiring.
 *
 * This file adds only what those primitives don't: the global Cmd/Ctrl+K
 * shortcut and mapping each row to an action's `run()`. Per the Radix-first
 * rule, none of the focus/keyboard/filter machinery is hand-rolled.
 */

/* ── CommandDialog — the reusable shell: a cmdk Command inside a Dialog ──────── */
export function CommandDialog({
  open,
  onOpenChange,
  title = "Command palette",
  description = "Search for an action and run it.",
  contentProps,
  className,
  children,
  ...commandProps
}: CommandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showClose={false}
        {...contentProps}
        className={cn(
          "overflow-hidden p-0 sm:max-w-xl",
          contentProps?.className,
        )}
      >
        {/* Visually-hidden labelling so Radix wires aria-labelledby/-describedby
            without showing chrome — the palette is all input + list. */}
        <RadixDialog.Title className="sr-only">{title}</RadixDialog.Title>
        <RadixDialog.Description className="sr-only">
          {description}
        </RadixDialog.Description>
        <Command className={cn("bg-transparent", className)} {...commandProps}>
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}
CommandDialog.displayName = "CommandDialog";

/* ── useCommandHotkey — the only genuinely-new piece: the global Cmd/Ctrl+K ──── */
function useCommandHotkey(
  hotkey: boolean | string,
  setOpen: (updater: (prev: boolean) => boolean) => void,
) {
  useEffect(() => {
    if (hotkey === false) return;
    const key = (typeof hotkey === "string" ? hotkey : "k").toLowerCase();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [hotkey, setOpen]);
}

/* ── CommandPalette — the batteries-included widget over CommandDialog ───────── */
export function CommandPalette({
  actions,
  open: openProp,
  onOpenChange,
  hotkey = true,
  placeholder = "Type a command or search…",
  emptyText = "No results found.",
  title = "Command palette",
  description = "Search for an action and run it.",
  contentProps,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;

  const setOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(open) : next;
    if (!isControlled) setInternalOpen(resolved);
    onOpenChange?.(resolved);
  };

  useCommandHotkey(hotkey, setOpen);

  // Bucket actions by group, preserving first-seen order. Ungrouped actions
  // share a single nameless group rendered first.
  const groups = useMemo(() => {
    const order: string[] = [];
    const byGroup = new Map<string, CommandAction[]>();
    for (const action of actions) {
      const key = action.group ?? "";
      if (!byGroup.has(key)) {
        byGroup.set(key, []);
        order.push(key);
      }
      byGroup.get(key)!.push(action);
    }
    return order.map((key) => ({ heading: key, items: byGroup.get(key)! }));
  }, [actions]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      description={description}
      contentProps={contentProps}
    >
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        {groups.map(({ heading, items }) => (
          <CommandGroup
            key={heading || "ungrouped"}
            heading={heading || undefined}
            // cmdk needs a heading OR a unique value; supply one when ungrouped.
            {...(heading ? {} : { value: "ungrouped" })}
          >
            {items.map((action) => (
              <CommandItem
                key={action.id}
                value={action.label}
                keywords={action.keywords}
                disabled={action.disabled}
                onSelect={() => {
                  setOpen(false);
                  action.run();
                }}
              >
                {action.icon}
                <span className="flex-1">{action.label}</span>
                {action.shortcut && (
                  <kbd className="ms-auto text-xs tracking-widest text-muted-foreground">
                    {action.shortcut}
                  </kbd>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
CommandPalette.displayName = "CommandPalette";
