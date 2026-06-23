import type { ComponentPropsWithoutRef } from "react";
import type * as RadixAccordion from "@radix-ui/react-accordion";

/**
 * Props extend the matching Radix Accordion part, so every native + Radix prop
 * flows through unchanged — `type` ("single" | "multiple"), `collapsible`,
 * `value` / `defaultValue` / `onValueChange`, `disabled`, `orientation`, etc.
 * We add nothing of our own; Accordion is pure restyle over the Radix behavior.
 */

export type AccordionProps = ComponentPropsWithoutRef<typeof RadixAccordion.Root>;

export type AccordionItemProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Item
>;

export type AccordionTriggerProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Trigger
>;

export type AccordionContentProps = ComponentPropsWithoutRef<
  typeof RadixAccordion.Content
>;
