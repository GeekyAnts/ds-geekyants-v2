import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./Tooltip";
import { Button } from "../Button/Button";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";

const meta: Meta<typeof Tooltip> = {
  title: "v2/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  // A single Provider shares the open/close delay across all tooltips, per the
  // ShadCN convention — wrap every story in it via a decorator.
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Add to library</TooltipContent>
    </Tooltip>
  ),
};

/* ── Sides — top / right / bottom / left ────────────────────────────────────── */
export const Sides: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              {side}
            </Button>
          </TooltipTrigger>
          <TooltipContent side={side}>On {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

/* ── Dark theme — portalled, so flag the document root via decorator ───────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </div>
  ),
  decorators: [withDarkPortalRoot],
  parameters: {
    docs: {
      description: {
        story:
          'Tooltip under a dark theme. The content is portalled to `<body>`, so `withDarkPortalRoot` flags `data-theme="dark"` on the document root; the bubble (primary / primary-foreground) re-themes from Tier-2 semantics.',
      },
    },
  },
};
