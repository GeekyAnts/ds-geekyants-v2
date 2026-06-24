import type { ComponentPropsWithoutRef } from "react";
import type * as RadixAspectRatio from "@radix-ui/react-aspect-ratio";

/**
 * Props extend the Radix AspectRatio.Root part, so `ratio` and every native div
 * prop flow through unchanged. No variant axis — Radix owns the layout behavior,
 * the consumer supplies the ratio.
 */
export type AspectRatioProps = ComponentPropsWithoutRef<
  typeof RadixAspectRatio.Root
>;
