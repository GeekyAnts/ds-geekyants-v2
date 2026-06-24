import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./Resizable";

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "v2/Resizable",
  component: ResizablePanelGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

const Cell = ({ label }: { label: string }) => (
  <div className="flex size-full items-center justify-center p-6">
    <span className="text-sm font-medium text-foreground">{label}</span>
  </div>
);

/* ── Default — two horizontal panels ─────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-48 w-96 rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <Cell label="One" />
      </ResizablePanel>
      <ResizableHandle orientation="horizontal" />
      <ResizablePanel defaultSize={50}>
        <Cell label="Two" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/* ── With a visible grip handle ──────────────────────────────────────────────── */
export const WithHandle: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-48 w-96 rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={40}>
        <Cell label="Sidebar" />
      </ResizablePanel>
      <ResizableHandle orientation="horizontal" withHandle />
      <ResizablePanel defaultSize={60}>
        <Cell label="Content" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/* ── Vertical orientation ────────────────────────────────────────────────────── */
export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="h-72 w-96 rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={40}>
        <Cell label="Header" />
      </ResizablePanel>
      <ResizableHandle orientation="vertical" withHandle />
      <ResizablePanel defaultSize={60}>
        <Cell label="Body" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/* ── Nested — a horizontal group with a vertical group inside ────────────────── */
export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-72 w-112 rounded-lg border border-border"
    >
      <ResizablePanel defaultSize={35}>
        <Cell label="Nav" />
      </ResizablePanel>
      <ResizableHandle orientation="horizontal" />
      <ResizablePanel defaultSize={65}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={55}>
            <Cell label="Editor" />
          </ResizablePanel>
          <ResizableHandle orientation="vertical" />
          <ResizablePanel defaultSize={45}>
            <Cell label="Terminal" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-48 w-96 rounded-lg border border-border"
      >
        <ResizablePanel defaultSize={50}>
          <Cell label="One" />
        </ResizablePanel>
        <ResizableHandle orientation="horizontal" withHandle />
        <ResizablePanel defaultSize={50}>
          <Cell label="Two" />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
