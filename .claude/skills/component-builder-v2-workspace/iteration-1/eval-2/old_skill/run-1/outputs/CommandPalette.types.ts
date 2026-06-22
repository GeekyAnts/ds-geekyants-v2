import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { DialogContentProps } from "../Dialog/Dialog.types";
import type { CommandProps } from "../Command/Command.types";

/**
 * CommandDialogProps — extends the styled DialogContent props (so every Radix
 * Content prop flows through), minus the open-state controls which we hoist to
 * the top level for the Dialog.Root, plus the bits unique to a palette.
 */
export interface CommandDialogProps
  extends Omit<DialogContentProps, "children"> {
  /** Controlled open state for the underlying Dialog. */
  open?: boolean;
  /** Open-state change handler (Escape, click-outside, hotkey, selection). */
  onOpenChange?: (open: boolean) => void;
  /** Accessible title for the palette surface (visually hidden). */
  title?: string;
  /** Accessible description for the palette surface (visually hidden). */
  description?: string;
  /** Props forwarded to the inner cmdk Command (e.g. filter, shouldFilter, loop). */
  commandProps?: Omit<CommandProps, "children">;
  /** The palette body: CommandInput + CommandList(+ Groups / Items). */
  children?: ReactNode;
}

/** Options for the global-hotkey hook. */
export interface UseCommandPaletteOptions {
  /** Externally controlled open state (omit for self-managed). */
  open?: boolean;
  /** Change handler when controlled, or to observe self-managed changes. */
  onOpenChange?: (open: boolean) => void;
  /** Disable the global hotkey listener. Default true. */
  enabled?: boolean;
  /** The key pressed with Cmd/Ctrl to toggle. Default "k". */
  key?: string;
}

/** Re-export Command part prop types so consumers type the body from one import. */
export type {
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandSeparatorProps,
} from "../Command/Command.types";

/** Convenience: a plain action descriptor for data-driven palettes. */
export interface CommandAction {
  /** Stable id / cmdk value used for filtering + selection. */
  value: string;
  /** Visible label. */
  label: string;
  /** Optional leading icon (e.g. a lucide-react element). */
  icon?: ReactNode;
  /** Optional right-aligned shortcut hint, e.g. "⌘P". */
  shortcut?: string;
  /** Optional group heading to bucket this action under. */
  group?: string;
  /** Disable this action. */
  disabled?: boolean;
  /** Invoked when the action is chosen (Enter / click). */
  onSelect?: () => void;
}

/** Allow `commandProps` consumers to reference the full cmdk Command prop set. */
export type CommandPaletteCommandProps = ComponentPropsWithoutRef<"div"> &
  Omit<CommandProps, "children">;
