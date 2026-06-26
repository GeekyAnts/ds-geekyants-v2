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
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";

const meta: Meta<typeof Card> = {
  title: "v2/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Card>;

/* ── Default — header + content + footer ─────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Your project will be provisioned on the nearest region and a preview
          URL generated automatically.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  ),
};

/* ── Header-only ─────────────────────────────────────────────────────────────── */
export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Total revenue</CardTitle>
        <CardDescription>+20.1% from last month</CardDescription>
      </CardHeader>
    </Card>
  ),
};

/* ── With a form body ────────────────────────────────────────────────────────── */
export const WithForm: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Update your display name.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Label htmlFor="card-name">Name</Label>
        <Input id="card-name" placeholder="Ada Lovelace" />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Save</Button>
      </CardFooter>
    </Card>
  ),
};

/* ── Content-only (no header/footer chrome) ──────────────────────────────────── */
export const ContentOnly: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent className="pt-6">
        <p className="text-sm text-muted-foreground">
          A bare surface — just the card chrome wrapping arbitrary content.
        </p>
      </CardContent>
    </Card>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Card surface, border and text all re-theme from the Tier-2
            semantics — the markup is untouched.
          </p>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="ghost">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Same card under a dark theme. The wrapper sets both data-theme="dark" and .dark; only Tier-2 semantic vars (`--card`, `--card-foreground`, `--border`, `--muted-foreground`) are overridden — the component markup is unchanged.',
      },
    },
  },
};
