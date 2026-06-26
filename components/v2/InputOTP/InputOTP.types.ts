import type { ComponentPropsWithoutRef, HTMLAttributes, ReactNode } from "react";
import type { OTPInput } from "input-otp";

/**
 * InputOTP — a one-time-passcode field built on the `input-otp` headless library
 * (category B: the lib owns caret/paste/keyboard/state, we own the look).
 *
 * Props mirror `OTPInput`'s public API (maxLength, value, onChange, …); we add
 * a styling-only `containerClassName` separate from the hidden input's
 * `className`, matching the ShadCN recipe.
 */
export interface InputOTPProps
  extends Omit<ComponentPropsWithoutRef<typeof OTPInput>, "render" | "children"> {
  /** The slot/group markup (InputOTPGroup + InputOTPSlot). Required. */
  children: ReactNode;
  /** className applied to the slot container (the visible row). */
  containerClassName?: string;
}

export type InputOTPGroupProps = HTMLAttributes<HTMLDivElement>;

export interface InputOTPSlotProps extends HTMLAttributes<HTMLDivElement> {
  /** Index into the OTPInput context's slots array. */
  index: number;
}

export type InputOTPSeparatorProps = HTMLAttributes<HTMLDivElement>;
