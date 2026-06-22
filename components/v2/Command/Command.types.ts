import type { ComponentPropsWithoutRef } from "react";
import type { Command as CommandPrimitive } from "cmdk";

/**
 * Each prop type extends the matching cmdk part, so cmdk's own props
 * (value, onValueChange, filter, shouldFilter, loop, onSelect, etc.)
 * pass straight through — we add nothing but styling.
 */
export type CommandProps = ComponentPropsWithoutRef<typeof CommandPrimitive>;
export type CommandInputProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Input
>;
export type CommandListProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.List
>;
export type CommandEmptyProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
>;
export type CommandGroupProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Group
>;
export type CommandItemProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Item
>;
export type CommandSeparatorProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Separator
>;
