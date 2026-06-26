import { cva } from "class-variance-authority";

/**
 * navigationMenuTriggerStyle — the shared trigger/link look for the navigation
 * menu, exported as a cva so a plain NavigationMenuLink can adopt the exact same
 * style as a Trigger (the ShadCN pattern). Standard semantic utilities only;
 * `accent` is the hovered/focused/open highlight.
 *
 * No variant axis — it's a single style bundle, so it's a parameterless cva
 * rather than a true variants table.
 */
export const navigationMenuTriggerStyle = cva(
  [
    "group inline-flex h-10 w-max items-center justify-center gap-1",
    "rounded-md bg-background px-4 py-2 text-sm font-medium",
    "transition-colors",
    "hover:bg-accent hover:text-accent-foreground",
    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
  ].join(" "),
);
