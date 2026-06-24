"use client";
import { forwardRef, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "../Button/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover/Popover";
import { Calendar } from "../Calendar/Calendar";
import type { DatePickerProps } from "./DatePicker.types";

/**
 * DatePicker — the ShadCN date-picker recipe on geeklego's 2-tier tokens.
 *
 * A COMPOSITION, not one primitive: a Button trigger (showing the formatted
 * date) inside a Popover (positioning, click-outside, escape, portal — all
 * Radix) wrapping our Calendar (react-day-picker date grid + keyboard). This
 * file only wires the selected-date state + the trigger label; every hard piece
 * comes from an already-shipped component. Styled with standard semantics.
 *
 * Controlled (`value` + `onChange`) or uncontrolled (`defaultValue` + optional
 * `onChange`). Closes the popover on selection.
 */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      defaultValue,
      placeholder = "Pick a date",
      disabled = false,
      locale,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState<Date | undefined>(defaultValue);
    const selected = value ?? internal;

    const setValue = (next: Date | undefined) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    const label = selected
      ? selected.toLocaleDateString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : placeholder;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-64 justify-start gap-2 font-normal",
              !selected && "text-muted-foreground",
              className,
            )}
          >
            <CalendarIcon className="size-4 shrink-0" />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setValue(date);
              setOpen(false);
            }}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);
DatePicker.displayName = "DatePicker";
