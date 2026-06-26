import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "v2/Typography",
  component: Typography,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { variant: "body", children: "The quick brown fox jumps over the lazy dog." },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "lead",
        "body",
        "large",
        "small",
        "muted",
        "blockquote",
        "code",
      ],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Typography>;

/* ── Default (playground) ────────────────────────────────────────────────────── */
export const Default: Story = {};

/* ── All variants — the full scale, each rendering its semantic element ──────── */
export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-2xl flex-col gap-4">
      <Typography variant="h1">Heading 1 — text-4xl extrabold</Typography>
      <Typography variant="h2">Heading 2 — text-3xl semibold</Typography>
      <Typography variant="h3">Heading 3 — text-2xl semibold</Typography>
      <Typography variant="h4">Heading 4 — text-xl semibold</Typography>
      <Typography variant="lead">
        Lead — a larger, muted intro paragraph that sets up the section below.
      </Typography>
      <Typography variant="body">
        Body — the default paragraph style at text-base with normal leading for
        comfortable reading.
      </Typography>
      <Typography variant="large">Large — text-lg semibold</Typography>
      <Typography variant="small">Small — text-sm medium, tight leading</Typography>
      <Typography variant="muted">Muted — text-sm in muted-foreground</Typography>
      <Typography variant="blockquote">
        Blockquote — “Design systems are products that serve products.”
      </Typography>
      <Typography variant="body">
        Inline <Typography variant="code">npm install</Typography> renders in
        the mono font.
      </Typography>
    </div>
  ),
};

/* ── A composed article — how variants read together ────────────────────────── */
export const Article: Story = {
  render: () => (
    <article className="max-w-2xl space-y-4">
      <Typography variant="h1">Building with GeekLego</Typography>
      <Typography variant="lead">
        A design-system-first component library on a 2-tier token model.
      </Typography>
      <Typography variant="h2">Why tokens first?</Typography>
      <Typography variant="body">
        Components consume semantic utilities, never raw values. The Token Editor
        owns every size, weight, and colour — so a rebrand propagates everywhere
        without touching component code.
      </Typography>
      <Typography variant="blockquote">
        The component is the stable semantic layer; the editor is the tunable
        value layer. They meet at the token.
      </Typography>
      <Typography variant="muted">Last updated June 2026.</Typography>
    </article>
  ),
};

/* ── asChild — heading style on a link element ───────────────────────────────── */
export const AsChild: Story = {
  render: () => (
    <Typography variant="h3" asChild>
      <a href="#" className="underline-offset-4 hover:underline">
        A link that reads as a heading
      </a>
    </Typography>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <div className="space-y-3">
        <Typography variant="h1">Heading in dark</Typography>
        <Typography variant="body">
          Body text inherits the foreground colour from the dark surface.
        </Typography>
        <Typography variant="muted">Muted text stays legible too.</Typography>
        <Typography variant="blockquote">A quote on the dark surface.</Typography>
      </div>
    </div>
  ),
};
