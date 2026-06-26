import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./InputOTP";
import { Label } from "../Label/Label";

const meta: Meta<typeof InputOTP> = {
  title: "v2/InputOTP",
  component: InputOTP,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof InputOTP>;

/* ── Default — 6 digits in one group ─────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── Separated — two groups split by a dash (3 + 3) ──────────────────────────── */
export const WithSeparator: Story = {
  render: () => (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── Four digits — a shorter PIN ─────────────────────────────────────────────── */
export const FourDigits: Story = {
  render: () => (
    <InputOTP maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── Controlled — read the value live ────────────────────────────────────────── */
function ControlledDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col items-center gap-3">
        <Label htmlFor="otp">Verification code</Label>
        <InputOTP id="otp" maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-sm text-muted-foreground">
          {value === "" ? "Enter your code" : `Entered: ${value}`}
        </p>
      </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

/* ── Disabled ────────────────────────────────────────────────────────────────── */
export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={6} disabled>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── Dark theme ──────────────────────────────────────────────────────────────── */
export const DarkMode: Story = {
  render: () => (
    <div className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground" data-theme="dark">
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'InputOTP under a dark theme. The wrapper sets both `data-theme="dark"` and `.dark`; slot borders/ring re-theme from the standard input/ring semantics. InputOTP is not portalled, so a plain dark wrapper is sufficient.',
      },
    },
  },
};
