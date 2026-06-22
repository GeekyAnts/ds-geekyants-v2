"use client";
import { forwardRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/cn";
import { Button } from "../Button/Button";
import { Popover, PopoverTrigger, PopoverContent } from "../Popover/Popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "../Command/Command";
import type { ComboboxProps } from "./Combobox.types";

/**
 * Combobox — the Step-4 high-a11y-surface validation component.
 *
 * It is a COMPOSITION, not one primitive: a Radix Popover (positioning,
 * click-outside, escape, portal) wrapping a cmdk Command (the listbox —
 * role/aria-activedescendant/aria-selected, arrow-key nav, type-to-filter),
 * triggered by our own Button via asChild. Every hard piece comes from a
 * library; this file only wires data (options/value/onChange) and the
 * selected-state checkmark. This is the real test of "does Radix earn its
 * place" — answer: the listbox a11y the old 3-tier had to hand-roll is free.
 *
 * Controlled or uncontrolled: pass `value` + `onChange` to control, or omit
 * both to let it manage its own selection.
 */
export const Combobox = forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select…",
      searchPlaceholder = "Search…",
      emptyText = "No results found.",
      disabled = false,
      className,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState("");
    const selected = value ?? internal;

    const setValue = (next: string) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    const selectedLabel = options.find((o) => o.value === selected)?.label;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn("w-64 justify-between font-normal", className)}
          >
            <span className={cn(!selectedLabel && "text-muted-foreground")}>
              {selectedLabel ?? placeholder}
            </span>
            <ChevronsUpDown className="ms-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-64 p-0", className)} align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  disabled={option.disabled}
                  onSelect={() => {
                    // toggle off if re-selecting the current value
                    setValue(option.value === selected ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      selected === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
Combobox.displayName = "Combobox";
