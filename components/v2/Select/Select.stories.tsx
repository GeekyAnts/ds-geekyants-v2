import type { Meta, StoryObj } from "@storybook/react-vite";
import { withDarkPortalRoot } from "../lib/dark-portal-decorator";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./Select";

const meta: Meta<typeof Select> = {
  title: "v2/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Select>;

/* ── Default — placeholder + a flat list of options ──────────────────────────── */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* ── Grouped — labelled groups separated by a divider ────────────────────────── */
export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a food" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Vegetables</SelectLabel>
          <SelectItem value="carrot">Carrot</SelectItem>
          <SelectItem value="potato">Potato</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/* ── Disabled item + disabled trigger ────────────────────────────────────────── */
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="One option is disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="free">Free</SelectItem>
          <SelectItem value="pro">Pro</SelectItem>
          <SelectItem value="enterprise" disabled>
            Enterprise (contact sales)
          </SelectItem>
        </SelectContent>
      </Select>
      <Select disabled>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Whole control disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

/* ── Invalid — error affordance via aria-invalid (matches Input's error look) ─── */
export const Invalid: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56" aria-invalid>
        <SelectValue placeholder="Required field" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ──────────
   Content is portalled to <body>, so we flag both selectors on the
   documentElement (decorator) as well as the wrapper. */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <Select>
        <SelectTrigger className="w-56">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Select content is portalled to `<body>`, so this story sets `data-theme=\"dark\"` and `.dark` on the document root (decorator) as well as the wrapper, proving the portalled listbox re-themes from the same Tier-2 semantic overrides.",
      },
    },
  },
  decorators: [withDarkPortalRoot],
};
