import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { AspectRatio } from "./AspectRatio";

const meta: Meta<typeof AspectRatio> = {
  title: "v2/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof AspectRatio>;

/* ── Default — 16:9 ───────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border border-border">
        <div className="flex size-full items-center justify-center bg-muted text-sm text-muted-foreground">
          16 : 9
        </div>
      </AspectRatio>
    </div>
  ),
};

/* ── Square — 1:1 ─────────────────────────────────────────────────────────── */
export const Square: Story = {
  render: () => (
    <div className="w-64">
      <AspectRatio ratio={1} className="overflow-hidden rounded-md border border-border">
        <div className="flex size-full items-center justify-center bg-muted text-sm text-muted-foreground">
          1 : 1
        </div>
      </AspectRatio>
    </div>
  ),
};

/* ── With an image child ──────────────────────────────────────────────────── */
export const WithImage: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border border-border">
        <img
          src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=800&dpr=2&q=80"
          alt="Landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <div className="w-96">
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md border border-border">
          <div className="flex size-full items-center justify-center bg-muted text-sm text-muted-foreground">
            16 : 9
          </div>
        </AspectRatio>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'AspectRatio frame under a dark theme. The wrapper sets both data-theme="dark" and .dark; the muted placeholder surface and border re-theme from Tier-2 semantics.',
      },
    },
  },
};
