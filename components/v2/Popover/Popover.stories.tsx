import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "../Button/Button";
import { Label } from "../Label/Label";
import { Input } from "../Input/Input";

const meta: Meta<typeof Popover> = {
  title: "v2/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Popover>;

/* ── Default — trigger + a small floating panel ──────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-foreground">
          Radix owns positioning, click-outside, and escape-to-dismiss. We only
          style the surface with standard semantics.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

/* ── Form content — a labelled field inside the panel ────────────────────────── */
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Edit dimensions</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="auto" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/* ── Alignment — align="start" shifts the panel to the trigger's start edge ───── */
export const Aligned: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Align start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <p className="text-sm text-foreground">
          This panel is aligned to the start edge of its trigger.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ─────────
   The portal renders to <body>, so we flag both selectors on the
   documentElement (decorator) as well as the wrapper so the portalled surface
   re-themes from the same Tier-2 semantic overrides. */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover (dark)</Button>
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm text-foreground">
            The portalled content re-themes from the semantic overrides on the
            documentElement.
          </p>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Popover content is portalled to <body>, so this story sets data-theme="dark" and .dark on the documentElement (decorator) as well as the wrapper, proving the portalled surface re-themes from the same Tier-2 semantic overrides.',
      },
    },
  },
  decorators: [
    (StoryFn) => {
      const root = document.documentElement;
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      return <StoryFn />;
    },
  ],
};
