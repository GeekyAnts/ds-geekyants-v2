import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./Tooltip";
import { Button } from "../Button/Button";
import "../../../design-system/v2/index.css";

/**
 * Tooltip stories.
 *
 * Every story is wrapped in a TooltipProvider (Radix requires one ancestor
 * provider; in an app you mount it once near the root). Each Tooltip shows a
 * small text label on hover AND keyboard focus, positioned above by default.
 */
const meta: Meta<typeof TooltipContent> = {
  title: "v2/Tooltip",
  component: TooltipContent,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <div className="p-16">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof TooltipContent>;

/** Default — label appears above the trigger on hover/focus. */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover or focus me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
};

/** Sides — top (default), right, bottom, left. */
export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>Tooltip on {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

/** On an icon button — the common a11y case: a label for an icon-only control. */
export const IconTrigger: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          {/* simple inline glyph; real usage would use a lucide icon */}
          <span aria-hidden>⚙</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>Settings</TooltipContent>
    </Tooltip>
  ),
};

/** Longer text — wraps within max-w-xs. */
export const LongText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">What is this?</Button>
      </TooltipTrigger>
      <TooltipContent>
        Tooltips are for short, supplementary hints — keep them brief and never
        put essential or interactive content inside one.
      </TooltipContent>
    </Tooltip>
  ),
};

/** Dark mode — both selectors set so theming re-themes live. */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-16"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me (dark)</Button>
        </TooltipTrigger>
        <TooltipContent>Themed via semantic tokens</TooltipContent>
      </Tooltip>
    </div>
  ),
};
