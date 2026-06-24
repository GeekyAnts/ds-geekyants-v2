import type { ComponentPropsWithoutRef } from "react";
import type * as RadixCheckbox from "@radix-ui/react-checkbox";

/**
 * Props extend the Radix Checkbox.Root part, so every native + Radix prop
 * (checked, defaultChecked, onCheckedChange, disabled, required, the
 * indeterminate `checked="indeterminate"` value, etc.) flows through unchanged.
 * No variant axis — size via consumer className.
 */
export type CheckboxProps = ComponentPropsWithoutRef<typeof RadixCheckbox.Root>;
