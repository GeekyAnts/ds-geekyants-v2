import type { ComponentPropsWithoutRef } from "react";
import type * as RadixSwitch from "@radix-ui/react-switch";

/**
 * Props extend the Radix Switch.Root part, so every native + Radix prop
 * (checked, defaultChecked, onCheckedChange, disabled, required, name, value)
 * flows through unchanged. No variant axis — size via consumer className.
 */
export type SwitchProps = ComponentPropsWithoutRef<typeof RadixSwitch.Root>;
