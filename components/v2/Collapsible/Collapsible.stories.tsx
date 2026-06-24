import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
import { Button } from "../Button/Button";

const meta: Meta<typeof Collapsible> = {
  title: "v2/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Collapsible>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-border px-4 py-2 text-sm">
    {children}
  </div>
);

/* ── Default ──────────────────────────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Collapsible className="w-72 space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium">@geekyants starred 3 repos</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Toggle">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <Row>geeklego</Row>
      <CollapsibleContent className="space-y-2">
        <Row>gluestack-ui</Row>
        <Row>nativebase</Row>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/* ── Open by default ──────────────────────────────────────────────────────── */
export const OpenByDefault: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-72 space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          Show details
          <ChevronsUpDown />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pt-2">
        <Row>Detail line one</Row>
        <Row>Detail line two</Row>
      </CollapsibleContent>
    </Collapsible>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <Collapsible defaultOpen className="w-72 space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            Show details
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 pt-2">
          <Row>Detail line one</Row>
          <Row>Detail line two</Row>
        </CollapsibleContent>
      </Collapsible>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Collapsible under a dark theme. The wrapper sets both data-theme="dark" and .dark; the bordered rows and trigger re-theme from Tier-2 semantics. Content height animates off Radix\'s --radix-collapsible-content-height.',
      },
    },
  },
};
