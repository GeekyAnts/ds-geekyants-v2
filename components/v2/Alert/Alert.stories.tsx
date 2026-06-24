import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Terminal, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "v2/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-lg">
      <Terminal />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  ),
};

/* ── Core variants — standard ShadCN semantics only ─────────────────────────── */
export const Variants: Story = {
  render: () => (
    <div className="flex max-w-lg flex-col gap-4">
      <Alert>
        <Info />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>
          A neutral callout on the page background.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTriangle />
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/* ── Without an icon ──────────────────────────────────────────────────────────*/
export const NoIcon: Story = {
  render: () => (
    <Alert className="max-w-lg">
      <AlertTitle>No icon</AlertTitle>
      <AlertDescription>
        When no leading SVG is present the icon column collapses to zero width.
      </AlertDescription>
    </Alert>
  ),
};

/* ── Title only ───────────────────────────────────────────────────────────────*/
export const TitleOnly: Story = {
  render: () => (
    <Alert className="max-w-lg">
      <Terminal />
      <AlertTitle>A single-line alert with just a title.</AlertTitle>
    </Alert>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <div className="flex flex-col gap-4">
        <Alert>
          <Info />
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>
            A neutral callout, re-themed live by the dark semantic overrides.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Same alerts under a dark theme. The dark wrapper sets both `data-theme="dark"` and `.dark`; only Tier-2 semantic vars are overridden — the component is untouched. Alert renders inline (no portal), so no document-root flag is needed.',
      },
    },
  },
};
