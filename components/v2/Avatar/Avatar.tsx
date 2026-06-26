"use client";
import { forwardRef } from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "../lib/cn";
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./Avatar.types";

/**
 * Avatar — ShadCN/Radix pattern on geeklego's 2-tier token system.
 *
 * Radix owns the image load/fallback state machine: AvatarImage renders only
 * once the image loads, otherwise AvatarFallback shows (after an optional
 * delay). We only supply the look via standard semantic utilities (bg-muted,
 * text-muted-foreground). No variant axis — size comes from consumer className
 * (the root defaults to size-10).
 *
 * Compound: <Avatar><AvatarImage src alt/><AvatarFallback>AB</AvatarFallback></Avatar>
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <RadixAvatar.Root
      ref={ref}
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  ),
);
Avatar.displayName = "Avatar";

/** The avatar image; Radix hides it until it loads, revealing the fallback. */
export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <RadixAvatar.Image
      ref={ref}
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  ),
);
AvatarImage.displayName = "AvatarImage";

/** Shown while the image is loading or if it fails — typically initials. */
export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <RadixAvatar.Fallback
      ref={ref}
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
AvatarFallback.displayName = "AvatarFallback";
