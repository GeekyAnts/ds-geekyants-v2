"use client";
import * as RadixAspectRatio from "@radix-ui/react-aspect-ratio";

/**
 * AspectRatio — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Constrains its content to a given width/height ratio (the `ratio` prop, e.g.
 * 16 / 9). Radix owns the padding-bottom layout technique; there's nothing to
 * style by default — the consumer styles the child (an <img>, <video>, etc.).
 *
 * A pure pass-through of Radix's single Root part, so no wrapper, no variants,
 * no token work.
 */
export const AspectRatio = RadixAspectRatio.Root;
