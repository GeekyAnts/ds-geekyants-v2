import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";
import { Button } from "../Button/Button";

/**
 * Tooltip composes Radix's Tooltip primitive — hover/focus open, delay,
 * positioning, portal, and `aria-describedby` wiring are all native.
 * A TooltipProvider must wrap any tooltips to share open/skip-delay timing.
 */
const meta: Meta<typeof TooltipContent> = {
  title: "v2/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200}>
        <Story />
      </TooltipProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof TooltipContent>;

/* ── Default — label shown above the trigger on hover/focus ──────────────────── */
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

/* ── Sides — top is the default; all four supported via Radix `side` ─────────── */
export const Sides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Top</Button>
        </TooltipTrigger>
        <TooltipContent side="top">Above (default)</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">To the right</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Below</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Left</Button>
        </TooltipTrigger>
        <TooltipContent side="left">To the left</TooltipContent>
      </Tooltip>
    </div>
  ),
};

/* ── On an icon button — the classic accessible-label use case ──────────────── */
export const IconTrigger: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Settings">
          {/* a glyph stands in for an icon */}
          ⚙
        </Button>
      </TooltipTrigger>
      <TooltipContent>Settings</TooltipContent>
    </Tooltip>
  ),
};

/* ── Long content wraps within max-w ─────────────────────────────────────────── */
export const LongLabel: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Details</Button>
      </TooltipTrigger>
      <TooltipContent>
        This tooltip holds a longer explanation that wraps onto multiple lines
        once it reaches the max width.
      </TooltipContent>
    </Tooltip>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <div className="flex flex-wrap items-center gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me</Button>
          </TooltipTrigger>
          <TooltipContent>Add to library</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Settings">
              ⚙
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Settings</TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tooltips under a dark theme. The wrapper sets both data-theme="dark" and .dark; only Tier-2 semantics (--popover, --popover-foreground, --border) are overridden — the component is untouched.',
      },
    },
  },
};
