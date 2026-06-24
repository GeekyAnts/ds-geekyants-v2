"use client";
import { forwardRef } from "react";
import { cn } from "../lib/cn";
import type { SkeletonProps } from "./Skeleton.types";

/**
 * Skeleton — pure-presentation placeholder for loading states (category C:
 * no a11y/keyboard/state surface, so hand-rolled with cn + forwardRef, no Radix).
 *
 * A muted rounded block with a pulse animation. Shape/size come from the
 * consumer's className (h-*, w-*, rounded-*, size-*), merged last-wins via cn().
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
