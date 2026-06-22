import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
// Footer actions REUSE the shipped Button — Card does not rebuild a button.
import { Button } from "../Button/Button";

const meta: Meta<typeof Card> = {
  title: "v2/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    elevation: { control: "select", options: ["flat", "raised"] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

/* ── Default — the full anatomy: header (title + description), content, footer
      with Save / Cancel actions ───────────────────────────────────────────── */
export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[360px]">
      <CardHeader>
        <CardTitle>Project settings</CardTitle>
        <CardDescription>
          Update your project name and visibility.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          Changes are applied immediately and visible to all collaborators.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};

/* ── Elevation variants ──────────────────────────────────────────────────────*/
export const Elevation: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-6">
      <Card elevation="flat" className="w-[280px]">
        <CardHeader>
          <CardTitle>Flat</CardTitle>
          <CardDescription>Bordered, no shadow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Default elevation.</p>
        </CardContent>
      </Card>
      <Card elevation="raised" className="w-[280px]">
        <CardHeader>
          <CardTitle>Raised</CardTitle>
          <CardDescription>Lifted with a shadow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">shadow-md applied.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

/* ── Header only — content optional, footer optional ─────────────────────────*/
export const HeaderAndContentOnly: Story = {
  render: () => (
    <Card className="w-[360px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          A card without a footer is perfectly valid — slots are composable.
        </p>
      </CardContent>
    </Card>
  ),
};

/* ── asChild — the whole card rendered as a link via Radix Slot ──────────────*/
export const AsChildLink: Story = {
  render: () => (
    <Card asChild elevation="raised" className="w-[360px] cursor-pointer">
      <a href="#top">
        <CardHeader>
          <CardTitle>Clickable card</CardTitle>
          <CardDescription>
            The entire card is an anchor (asChild + Radix Slot).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Renders as &lt;a&gt;, keeping a single styling source.
          </p>
        </CardContent>
      </a>
    </Card>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────*/
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <Card elevation="raised" className="w-[360px]">
        <CardHeader>
          <CardTitle>Project settings</CardTitle>
          <CardDescription>
            Update your project name and visibility.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground">
            Only Tier-2 semantic vars are overridden — Card markup is untouched.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost">Cancel</Button>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Same Card under a dark theme. The wrapper sets both data-theme="dark" and .dark; bg-card / text-card-foreground / border-border re-theme live.',
      },
    },
  },
};
