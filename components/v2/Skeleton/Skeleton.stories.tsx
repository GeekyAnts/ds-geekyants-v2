import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "v2/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => <Skeleton className="h-4 w-48" />,
};

/* ── Shapes — size/shape come from className ────────────────────────────────── */
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-28" />
      </div>
    </div>
  ),
};

/* ── Card placeholder — a realistic loading block ───────────────────────────── */
export const CardPlaceholder: Story = {
  render: () => (
    <div className="w-72 space-y-3 rounded-lg border border-border p-4">
      <Skeleton className="h-32 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Skeletons under a dark theme. The wrapper sets both data-theme="dark" and .dark; the muted placeholder fill re-themes from the Tier-2 --muted semantic.',
      },
    },
  },
};
