"use client";
import { GripVertical } from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { cn } from "../lib/cn";
import type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from "./Resizable.types";

/**
 * Resizable — ShadCN pattern on geeklego's 2-tier tokens, built on
 * react-resizable-panels (category B). The library owns ALL behaviour — the
 * drag-resize math, layout persistence, keyboard resizing, collapse/expand, and
 * the role="separator" / aria-orientation wiring. We only supply the look via
 * standard semantic utilities (bg-border for the divider, ring-ring on focus).
 *
 * Compound: <ResizablePanelGroup orientation="horizontal">
 *   <ResizablePanel/><ResizableHandle orientation="horizontal"/><ResizablePanel/>
 * </ResizablePanelGroup>. v4 of the lib exports Group / Panel / Separator; we
 * re-export them under the familiar ShadCN names.
 */
export const ResizablePanelGroup = ({
  className,
  orientation = "horizontal",
  ...props
}: ResizablePanelGroupProps) => (
  <Group
    orientation={orientation}
    className={cn("flex size-full", className)}
    {...props}
  />
);
ResizablePanelGroup.displayName = "ResizablePanelGroup";

export const ResizablePanel = (props: ResizablePanelProps) => <Panel {...props} />;
ResizablePanel.displayName = "ResizablePanel";

/* Handle — the draggable divider. `orientation` mirrors the group so the bar
   sizes along the correct axis; `withHandle` adds a visible grip. The library
   sets the cursor + drag state; we style the line + focus ring. */
export const ResizableHandle = ({
  className,
  orientation = "horizontal",
  withHandle = false,
  ...props
}: ResizableHandleProps) => (
  <Separator
    className={cn(
      "relative flex items-center justify-center bg-border",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      // horizontal group → a thin vertical divider
      orientation === "horizontal" && "w-px",
      // vertical group → a thin horizontal divider
      orientation === "vertical" && "h-px w-full",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div
        className={cn(
          "z-10 flex items-center justify-center rounded-sm border border-border bg-border",
          orientation === "horizontal" ? "h-4 w-3" : "h-3 w-4 rotate-90",
        )}
      >
        <GripVertical className="size-2.5 text-muted-foreground" aria-hidden />
      </div>
    )}
  </Separator>
);
ResizableHandle.displayName = "ResizableHandle";
