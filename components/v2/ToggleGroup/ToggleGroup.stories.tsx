import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "v2/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ToggleGroup>;

/* ── Default — multiple selection (text formatting) ──────────────────────────── */
export const Default: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/* ── Single selection (alignment — exactly one active) ───────────────────────── */
export const SingleSelection: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/* ── Outline variant — set on the Root, cascades to items ────────────────────── */
export const Outline: Story = {
  render: () => (
    <ToggleGroup type="multiple" variant="outline" aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/* ── Sizes — set on the Root ─────────────────────────────────────────────────── */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <ToggleGroup key={size} type="single" size={size} defaultValue="b" aria-label={`Size ${size}`}>
          <ToggleGroupItem value="a" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="b" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="c" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  ),
};

/* ── Labeled items + disabled ────────────────────────────────────────────────── */
export const WithLabels: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="md" variant="outline" aria-label="Density">
      <ToggleGroupItem value="sm">Compact</ToggleGroupItem>
      <ToggleGroupItem value="md">Cozy</ToggleGroupItem>
      <ToggleGroupItem value="lg" disabled>
        Comfortable
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <ToggleGroup type="single" defaultValue="center" variant="outline" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};
