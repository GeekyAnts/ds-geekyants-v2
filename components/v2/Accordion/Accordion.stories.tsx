import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "v2/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const ITEMS = [
  {
    value: "item-1",
    q: "Is it accessible?",
    a: "Yes. It follows the WAI-ARIA disclosure pattern — Radix wires aria-expanded, aria-controls, and full keyboard navigation (arrows, Home, End).",
  },
  {
    value: "item-2",
    q: "Is it styled?",
    a: "Yes — entirely from standard ShadCN/Tailwind semantic utilities on geeklego's primitives. No hardcoded values, no component tokens.",
  },
  {
    value: "item-3",
    q: "Is it animated?",
    a: "Yes. The panel height transitions off Radix's measured --radix-accordion-content-height; no animation library is involved.",
  },
];

/* ── Default — single, collapsible ───────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/* ── Multiple — more than one panel open at once ─────────────────────────────── */
export const Multiple: Story = {
  render: () => (
    <Accordion
      type="multiple"
      defaultValue={["item-1", "item-2"]}
      className="w-96"
    >
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/* ── Default open — single with a defaultValue ───────────────────────────────── */
export const DefaultOpen: Story = {
  render: () => (
    <Accordion
      type="single"
      collapsible
      defaultValue="item-2"
      className="w-96"
    >
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

/* ── Disabled item — Radix skips it in keyboard nav and dims the trigger ──────── */
export const DisabledItem: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      <AccordionItem value="item-1">
        <AccordionTrigger>Enabled</AccordionTrigger>
        <AccordionContent>This panel opens normally.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled</AccordionTrigger>
        <AccordionContent>You won't reach this.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Also enabled</AccordionTrigger>
        <AccordionContent>This one opens too.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ─────────── */
export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8"
    >
      <Accordion type="single" collapsible defaultValue="item-1" className="w-96">
        {ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ),
};
