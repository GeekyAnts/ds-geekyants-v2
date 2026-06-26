import type { ComponentProps } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

/**
 * Props extend the matching react-resizable-panels parts (v4 API: Group / Panel
 * / Separator), so every prop (orientation, minSize, collapsible, onLayoutChange
 * …) flows through unchanged. We only add `withHandle` to the handle.
 */
export type ResizablePanelGroupProps = ComponentProps<typeof Group>;

export type ResizablePanelProps = ComponentProps<typeof Panel>;

export interface ResizableHandleProps extends ComponentProps<typeof Separator> {
  /**
   * Match the parent group's orientation so the handle sizes along the correct
   * axis ("horizontal" group → vertical divider). Defaults to "horizontal".
   */
  orientation?: "horizontal" | "vertical";
  /** Render a visible centered grip affordance on the handle. */
  withHandle?: boolean;
}
