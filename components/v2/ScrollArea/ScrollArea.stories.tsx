import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { ScrollArea, ScrollBar } from "./ScrollArea";
import { Separator } from "../Separator/Separator";

const meta: Meta<typeof ScrollArea> = {
  title: "v2/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof ScrollArea>;

const tags = Array.from({ length: 40 }).map((_, i) => `v1.2.0-beta.${40 - i}`);

/* ── Default — a vertical list that overflows ────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-56 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm text-foreground">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

/* ── Horizontal — add a horizontal ScrollBar ─────────────────────────────────── */
export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border border-border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <figure key={i} className="shrink-0">
            <div className="flex size-32 items-center justify-center rounded-md bg-muted text-muted-foreground">
              {i + 1}
            </div>
            <figcaption className="pt-2 text-xs text-muted-foreground">
              Photo {i + 1}
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

/* ── Prose block ─────────────────────────────────────────────────────────────── */
export const Prose: Story = {
  render: () => (
    <ScrollArea className="h-48 w-80 rounded-md border border-border p-4">
      <div className="space-y-3 text-sm text-foreground">
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i}>
            Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <ScrollArea className="h-72 w-56 rounded-md border border-border">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {tags.map((tag) => (
            <div key={tag}>
              <div className="text-sm text-foreground">{tag}</div>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  ),
};
