# Storybook Story Structure — Template Reference

Every component's `.stories.tsx` must include exactly **7 stories**. All 7 are non-negotiable.

```tsx
// 1. Default story — most common usage
export const Default: Story = { ... }

// 2. Variants story — shows all visual variants side by side
export const Variants: Story = { ... }

// 3. Sizes story — shows all size variants side by side
export const Sizes: Story = { ... }

// 4. States story — default, hover, focus-visible, active, disabled, loading, error
export const States: Story = { ... }

// 5. DarkMode story — wraps in data-theme="dark"
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="flex flex-wrap gap-3 items-center p-8 bg-primary rounded-[var(--radius-component-lg)] max-w-2xl">
      {/* all variants */}
    </div>
  ),
}

// 6. Playground — all args exposed as Storybook controls
export const Playground: Story = {
  args: { /* all props with default values */ },
}

// 7. Accessibility — WCAG 2.2 compliance demo (tagged 'a11y' for Storybook A11y addon)
export const Accessibility: Story = {
  tags: ['a11y'],
  name: 'Accessibility',
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-component-lg)] p-[var(--spacing-layout-xs)]">
      {/*
        Keyboard: Tab to focus · Enter/Space to activate · Escape to dismiss overlays
        Screen reader: "[label], button" | "[label], dimmed, button" | "[label], busy, button"
      */}
      {/* Default: visible label provides accessible name */}
      <ComponentName>Accessible label</ComponentName>
      {/* Icon-only: aria-label provides the accessible name */}
      <ComponentName aria-label="Descriptive action name" iconOnly><Icon /></ComponentName>
      {/* Disabled: both disabled + aria-disabled */}
      <ComponentName disabled aria-disabled>Disabled</ComponentName>
      {/* Loading: aria-busy communicates async state */}
      <ComponentName loading aria-busy>Loading</ComponentName>
    </div>
  ),
}
```

## Story title format

`'Atoms/Button'`, `'Molecules/Card'` — matches level hierarchy.

## DarkMode rules

- Always wrap in `data-theme="dark"` with `bg-primary` container
- Always include `max-w-2xl` — unconstrained stories mask responsive bugs

## Compound organism stories

Compose all slot children in the Default story to show realistic usage.
