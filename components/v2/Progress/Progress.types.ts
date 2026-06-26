import type { ComponentPropsWithoutRef } from "react";
import type * as RadixProgress from "@radix-ui/react-progress";

export interface ProgressProps
  extends ComponentPropsWithoutRef<typeof RadixProgress.Root> {
  /**
   * Current progress value (0–100). Omit / pass `null` for an indeterminate
   * bar (no known completion), which Radix flags via data-state="indeterminate".
   */
  value?: number | null;
  /** Upper bound of the scale. Defaults to 100. */
  max?: number;
}
