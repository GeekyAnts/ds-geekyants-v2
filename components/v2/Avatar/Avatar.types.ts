import type { ComponentPropsWithoutRef } from "react";
import type * as RadixAvatar from "@radix-ui/react-avatar";

/**
 * Props extend the matching Radix Avatar parts, so the image load/fallback state
 * machine props (onLoadingStatusChange, delayMs, etc.) flow through unchanged.
 * No variant axis — each part is a thin styled wrapper.
 */
export type AvatarProps = ComponentPropsWithoutRef<typeof RadixAvatar.Root>;
export type AvatarImageProps = ComponentPropsWithoutRef<
  typeof RadixAvatar.Image
>;
export type AvatarFallbackProps = ComponentPropsWithoutRef<
  typeof RadixAvatar.Fallback
>;
