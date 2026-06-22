import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn — the ShadCN class-merge helper.
 * clsx resolves conditional/array class inputs; tailwind-merge dedupes
 * conflicting Tailwind utilities (last-wins), so consumer `className`
 * overrides cleanly compose over the variant defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
