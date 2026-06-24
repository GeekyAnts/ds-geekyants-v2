import type { ComponentProps } from "react";
import type { DayPicker } from "react-day-picker";

/**
 * Calendar props = react-day-picker's DayPicker props, verbatim. The lib owns
 * ALL behavior — date math, the keyboard-navigable day grid, single/range/
 * multiple selection modes, disabled days, etc. We only restyle it with
 * standard semantic utilities. No variant axis.
 */
export type CalendarProps = ComponentProps<typeof DayPicker>;
