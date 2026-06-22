import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Command as CommandPrimitive } from "cmdk";
import type { DialogContentProps } from "../Dialog/Dialog.types";

/**
 * CommandPalette — a Cmd/Ctrl+K command palette (VS Code / Linear style).
 *
 * It is a COMPOSITION of two already-shipped v2 primitives:
 *   - Dialog (Radix)  — the modal pop-open: focus trap, escape, scroll lock, portal.
 *   - Command (cmdk)  — the listbox: type-to-filter, arrow-key nav, aria-activedescendant.
 *
 * Nothing here re-implements filtering or keyboard navigation; those come from
 * cmdk. The only genuinely-new surface is the global Cmd/Ctrl+K shortcut and the
 * action wiring, which this file owns.
 */

/** A single runnable action shown in the palette. */
export interface CommandAction {
  /** Stable id (used as the React key and the cmdk value if `keywords` omitted). */
  id: string;
  /** Visible label — also what cmdk filters against. */
  label: string;
  /** Optional leading icon (e.g. a lucide-react element). */
  icon?: ReactNode;
  /** Optional trailing hint, e.g. a keyboard shortcut badge. */
  shortcut?: string;
  /** Extra terms to match on beyond the label (synonyms, ids). */
  keywords?: string[];
  /** Optional group heading this action belongs under. */
  group?: string;
  /** Disable this single action. */
  disabled?: boolean;
  /** Invoked when the action is chosen (Enter or click). The palette closes after. */
  run: () => void;
}

export interface CommandPaletteProps {
  /** The actions to list. They are grouped by `action.group` when present. */
  actions: CommandAction[];
  /** Controlled open state. Omit both to let the palette manage its own. */
  open?: boolean;
  /** Fires when the open state changes (controlled usage). */
  onOpenChange?: (open: boolean) => void;
  /**
   * Bind a global open hotkey. `true` (default) = Cmd/Ctrl+K.
   * Pass a single lowercase key (e.g. "p") to use Cmd/Ctrl+<key>, or `false`
   * to disable the global listener entirely (e.g. when you trigger it yourself).
   */
  hotkey?: boolean | string;
  /** Placeholder inside the filter input. */
  placeholder?: string;
  /** Message shown when the filter matches nothing. */
  emptyText?: string;
  /** Accessible title for the dialog (visually hidden). */
  title?: string;
  /** Accessible description for the dialog (visually hidden). */
  description?: string;
  /** Forwarded to the underlying DialogContent (sizing, etc.). */
  contentProps?: DialogContentProps;
}

/** Props for the standalone CommandDialog shell (Command-inside-Dialog). */
export interface CommandDialogProps
  extends ComponentPropsWithoutRef<typeof CommandPrimitive> {
  /** Controlled open state. */
  open?: boolean;
  /** Fires when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** Visually-hidden accessible title. */
  title?: string;
  /** Visually-hidden accessible description. */
  description?: string;
  /** Forwarded to DialogContent. */
  contentProps?: DialogContentProps;
}
