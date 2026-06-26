"use client";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { buttonVariants } from "../Button/button-variants";
import type { CalendarProps } from "./Calendar.types";

/**
 * Calendar — ShadCN pattern on geeklego's 2-tier token system, built on
 * react-day-picker (category B). The library owns the date math, the
 * keyboard-navigable day grid, and the selection modes; we only restyle it with
 * standard semantic utilities (text-foreground, bg-primary, text-muted-
 * foreground, ring-ring …) and reuse Button's variants for the nav + day
 * buttons so the calendar matches the rest of the library.
 *
 * react-day-picker v10: nav icons are consolidated into a single `Chevron`
 * component (orientation-aware); class overrides merge onto getDefaultClassNames().
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: cn(defaults.months, "relative flex flex-col gap-4 sm:flex-row"),
        month: cn(defaults.month, "flex flex-col gap-4"),
        month_caption: cn(
          defaults.month_caption,
          "flex h-9 items-center justify-center px-9",
        ),
        caption_label: cn(defaults.caption_label, "text-sm font-medium"),
        nav: cn(defaults.nav, "absolute inset-x-0 top-0 flex items-center justify-between"),
        button_previous: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 p-0 opacity-50 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "size-7 p-0 opacity-50 hover:opacity-100",
        ),
        month_grid: cn(defaults.month_grid, "w-full border-collapse space-y-1"),
        weekdays: cn(defaults.weekdays, "flex"),
        weekday: cn(
          defaults.weekday,
          "w-9 text-xs font-normal text-muted-foreground",
        ),
        week: cn(defaults.week, "mt-2 flex w-full"),
        day: cn(
          defaults.day,
          "relative size-9 p-0 text-center text-sm focus-within:relative focus-within:z-20",
        ),
        day_button: cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "size-9 p-0 font-normal aria-selected:opacity-100",
        ),
        selected: cn(
          defaults.selected,
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary",
        ),
        today: cn(defaults.today, "[&>button]:bg-accent [&>button]:text-accent-foreground"),
        outside: cn(defaults.outside, "[&>button]:text-muted-foreground [&>button]:opacity-50"),
        disabled: cn(defaults.disabled, "[&>button]:text-muted-foreground [&>button]:opacity-50"),
        range_middle: cn(
          defaults.range_middle,
          "[&>button]:rounded-none [&>button]:bg-accent [&>button]:text-accent-foreground",
        ),
        hidden: cn(defaults.hidden, "invisible"),
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className: chevronClassName, ...chevronProps }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return (
            <Icon className={cn("size-4", chevronClassName)} {...chevronProps} />
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";
