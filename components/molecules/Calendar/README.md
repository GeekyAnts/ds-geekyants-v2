# Calendar

A standalone calendar grid molecule for date selection. Renders a month view with weekday headers, day cells, and month navigation. Supports controlled/uncontrolled usage, keyboard navigation, and full i18n.

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `Date \| null` | — | Currently selected date (controlled). |
| `displayMonth` | `{ year: number; month: number }` | Current month | Month/year to display. |
| `onChange` | `(date: Date) => void` | — | Fired when the user selects a date. |
| `onMonthChange` | `(month: { year: number; month: number }) => void` | — | Fired when the user navigates to a different month. |
| `min` | `Date` | — | Earliest selectable date. Days before this are disabled. |
| `max` | `Date` | — | Latest selectable date. Days after this are disabled. |
| `firstDayOfWeek` | `0 \| 1` | `1` | First day of week: 0 = Sunday, 1 = Monday. |
| `i18nStrings` | `CalendarI18nStrings` | — | Internationalisation strings for system-generated text. |

## Tokens Used

| Token | Semantic | Purpose |
|---|---|---|
| `--calendar-panel-bg` | `--color-surface-default` | Panel background |
| `--calendar-panel-border` | `--color-border-default` | Panel border |
| `--calendar-panel-radius` | `--radius-component-lg` | Panel corner radius |
| `--calendar-panel-shadow` | `--shadow-lg` | Panel elevation |
| `--calendar-panel-min-width` | `--content-min-width-md` | Minimum panel width |
| `--calendar-header-text` | `--color-text-primary` | Month/year label color |
| `--calendar-header-gap` | `--spacing-component-sm` | Header spacing |
| `--calendar-weekday-text` | `--color-text-tertiary` | Weekday header color |
| `--calendar-day-size` | `--size-component-sm` | Day cell dimensions |
| `--calendar-day-radius` | `--radius-component-md` | Day cell corner radius |
| `--calendar-day-text` | `--color-text-primary` | Default day text |
| `--calendar-day-bg-hover` | `--color-state-hover` | Hover background |
| `--calendar-day-bg-active` | `--color-state-pressed` | Active/pressed background |
| `--calendar-day-bg-selected` | `--color-action-primary` | Selected day background |
| `--calendar-day-text-selected` | `--color-text-on-primary` | Selected day text |
| `--calendar-day-border-today` | `--color-border-strong` | Today indicator border |
| `--calendar-day-text-outside` | `--color-text-disabled` | Outside-month day text |
| `--calendar-day-text-disabled` | `--color-text-disabled` | Disabled day text |

## Variants

- **Controlled** — `value` and `onChange` managed by parent
- **Uncontrolled** — internal state, no `value` prop

## States

| State | Visual |
|---|---|
| Default | Resting day cells with primary text |
| Hover | Background shifts to `--color-state-hover` |
| Selected | Filled background with `--color-action-primary`, inverted text |
| Today | Border ring with `--color-border-strong` |
| Outside month | Muted text, non-interactive |
| Disabled | Muted text, `cursor-not-allowed`, non-interactive |

## Accessibility

- Uses `<table>` with `<thead>`/`<tbody>` for semantic grid structure
- Weekday headers use `<th scope="col">` with `abbr` for full names
- Day cells are `<button>` elements with `aria-selected`, `aria-current="date"` for today, and `aria-disabled` for out-of-range days
- Each day button has a full-text `aria-label` (e.g. "15 May 2026, Today")
- Month/year label has `aria-live="polite"` to announce month changes
- Table has `aria-label` with month and year

### Keyboard Interaction

| Key | Action |
|---|---|
| ArrowLeft / ArrowRight | Previous / next day |
| ArrowUp / ArrowDown | Previous / next week |
| Home / End | Start / end of week |
| PageUp / PageDown | Previous / next month |
| Shift+PageUp / Shift+PageDown | Previous / next year |
| Enter / Space | Selects focused date |

## Usage

```tsx
import { Calendar } from '@geeklego/ui';

// Controlled
<Calendar
  value={selectedDate}
  onChange={(date) => setSelectedDate(date)}
/>

// With min/max constraints
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  min={new Date(2026, 0, 1)}
  max={new Date(2026, 11, 31)}
/>

// Sunday-first week
<Calendar
  value={selectedDate}
  onChange={setSelectedDate}
  firstDayOfWeek={0}
/>
```
