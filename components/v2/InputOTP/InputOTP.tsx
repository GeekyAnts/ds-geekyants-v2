"use client";
import { forwardRef, useContext } from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { cn } from "../lib/cn";
import type {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps,
} from "./InputOTP.types";

/**
 * InputOTP — ShadCN pattern on geeklego's 2-tier token system, built on the
 * `input-otp` library (category B). The library owns the hard parts — a single
 * hidden input that drives caret position, paste handling, mobile autofill and
 * keyboard nav — exposing per-slot render state via OTPInputContext. We own the
 * styling: each slot is standard semantic markup (border-input, ring-ring, …).
 *
 * Compound: <InputOTP maxLength={6}><InputOTPGroup><InputOTPSlot index={0}/>…
 * </InputOTPGroup></InputOTP>. No cva variants — slots have fixed classes and
 * per-instance tweaks come through consumer `className` (cn() merge).
 */
export const InputOTP = forwardRef<HTMLInputElement, InputOTPProps>(
  ({ className, containerClassName, ...props }, ref) => (
    <OTPInput
      ref={ref}
      containerClassName={cn(
        "flex items-center gap-2 has-[:disabled]:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  ),
);
InputOTP.displayName = "InputOTP";

/** InputOTPGroup — a visual cluster of adjacent slots (e.g. 3 + separator + 3). */
export const InputOTPGroup = forwardRef<HTMLDivElement, InputOTPGroupProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  ),
);
InputOTPGroup.displayName = "InputOTPGroup";

/**
 * InputOTPSlot — one character cell. Reads its char / fake-caret / active state
 * from OTPInputContext (provided by InputOTP) by `index`. Active slot lifts to
 * the ring semantics; the blinking caret is rendered from the same theme color.
 */
export const InputOTPSlot = forwardRef<HTMLDivElement, InputOTPSlotProps>(
  ({ index, className, ...props }, ref) => {
    const inputOTPContext = useContext(OTPInputContext);
    const slot = inputOTPContext?.slots[index];
    const { char, hasFakeCaret, isActive } = slot ?? {};

    return (
      <div
        ref={ref}
        data-active={isActive ? "" : undefined}
        className={cn(
          "relative flex size-10 items-center justify-center text-sm",
          "border-y border-r border-input bg-background text-foreground",
          "transition-all duration-150 ease-out",
          "first:rounded-l-md first:border-l last:rounded-r-md",
          "data-[active]:z-10 data-[active]:ring-2 data-[active]:ring-ring data-[active]:ring-offset-1 data-[active]:ring-offset-background",
          className,
        )}
        {...props}
      >
        {char}
        {hasFakeCaret && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
          </div>
        )}
      </div>
    );
  },
);
InputOTPSlot.displayName = "InputOTPSlot";

/** InputOTPSeparator — a non-interactive divider between groups (a dash). */
export const InputOTPSeparator = forwardRef<
  HTMLDivElement,
  InputOTPSeparatorProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn("flex items-center text-muted-foreground", className)}
    {...props}
  >
    <Minus className="size-4" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";
