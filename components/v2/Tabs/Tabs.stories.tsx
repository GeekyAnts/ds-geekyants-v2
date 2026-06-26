import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "v2/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">
          Make changes to your account here.
        </p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">
          Change your password here.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

/* ── Three tabs ─────────────────────────────────────────────────────────────── */
export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">Overview panel.</p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-muted-foreground">Analytics panel.</p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-sm text-muted-foreground">Reports panel.</p>
      </TabsContent>
    </Tabs>
  ),
};

/* ── Disabled tab ───────────────────────────────────────────────────────────── */
export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active" className="w-80">
      <TabsList>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active">
        <p className="text-sm text-muted-foreground">
          The other tab is disabled.
        </p>
      </TabsContent>
    </Tabs>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <Tabs defaultValue="account" className="w-80">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-sm text-muted-foreground">Account panel.</p>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-sm text-muted-foreground">Password panel.</p>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Tabs under a dark theme. The wrapper sets both data-theme="dark" and .dark; the list background (muted) and the active trigger surface (background) re-theme from Tier-2 semantics.',
      },
    },
  },
};
