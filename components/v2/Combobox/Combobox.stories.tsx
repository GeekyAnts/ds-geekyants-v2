import { useState } from "react";
import type { ReactElement } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { Combobox } from "./Combobox";
import type { ComboboxOption } from "./Combobox.types";

const frameworks: ComboboxOption[] = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "solid", label: "SolidStart", disabled: true },
];

const meta: Meta<typeof Combobox> = {
  title: "v2/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Combobox>;

/* ── Default — uncontrolled; type to filter, arrow keys + Enter to select ───── */
export const Default: Story = {
  render: () => (
    <Combobox options={frameworks} placeholder="Select framework…" />
  ),
};

/* ── Controlled — value + onChange, echoing the selection below ─────────────── */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("remix");
    return (
      <div className="flex flex-col items-start gap-3">
        <Combobox
          options={frameworks}
          value={value}
          onChange={setValue}
          placeholder="Select framework…"
        />
        <p className="text-sm text-muted-foreground">
          Selected: <code className="text-foreground">{value || "—"}</code>
        </p>
      </div>
    );
  },
};

/* ── Disabled control ───────────────────────────────────────────────────────── */
export const Disabled: Story = {
  render: () => (
    <Combobox options={frameworks} disabled placeholder="Unavailable" />
  ),
};

/* ── Empty state — filter that matches nothing shows emptyText ──────────────── */
export const CustomEmpty: Story = {
  render: () => (
    <Combobox
      options={frameworks}
      searchPlaceholder="Try typing 'zzz'…"
      emptyText="No framework matches that."
    />
  ),
};

/* ── Dark theme — the panel is portalled, so flag .dark on documentElement ──── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <Combobox options={frameworks} placeholder="Select framework…" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The Popover panel is portalled to <body>, so this story also sets data-theme=\"dark\" and .dark on the documentElement (decorator) so the portalled listbox surface re-themes from the same Tier-2 semantic overrides.",
      },
    },
  },
  decorators: [
    (StoryFn: () => ReactElement) => {
      const root = document.documentElement;
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
      return <StoryFn />;
    },
  ],
};
