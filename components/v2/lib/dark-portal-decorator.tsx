import { useEffect } from "react";
import type { ReactElement } from "react";

/**
 * withDarkPortalRoot — Storybook decorator for components whose content is
 * PORTALLED to <body> (Dialog, Popover, Select, DropdownMenu, Combobox).
 *
 * Portalled surfaces escape the story's wrapping `<div data-theme="dark">`, so
 * the dark theme must also be flagged on the document root. The naive way —
 * mutating `document.documentElement` inline in the decorator body — runs that
 * DOM write on EVERY render. Under React Strict Mode (dev) + Radix re-renders
 * (popper reposition, cmdk re-filter on each keystroke), that forces a
 * full-document style recalc per interaction and freezes the renderer.
 *
 * This version does the mutation in a `useEffect`:
 *   • runs once per mount, not per render (no per-keystroke recalc), and
 *   • restores the previous root state on unmount, so the `dark` flag does not
 *     leak onto every other story you visit afterward.
 *
 * Use as a story decorator; pair it with the wrapping `<div data-theme="dark"
 * className="dark …">` so the non-portalled trigger and the portalled surface
 * both theme from the same Tier-2 overrides (CLAUDE.md dual-selector rule).
 */
export const withDarkPortalRoot = (StoryFn: () => ReactElement): ReactElement => {
  return <DarkPortalRoot Story={StoryFn} />;
};

function DarkPortalRoot({ Story }: { Story: () => ReactElement }): ReactElement {
  useEffect(() => {
    const root = document.documentElement;
    const prevTheme = root.getAttribute("data-theme");
    const hadDarkClass = root.classList.contains("dark");

    root.setAttribute("data-theme", "dark");
    root.classList.add("dark");

    return () => {
      if (prevTheme === null) root.removeAttribute("data-theme");
      else root.setAttribute("data-theme", prevTheme);
      if (!hadDarkClass) root.classList.remove("dark");
    };
  }, []);

  return <Story />;
}
