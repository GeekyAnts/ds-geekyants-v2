# Geeklego Worked Examples

> Complete production-grade reference implementations. Read before generating any component.
> These set the quality bar for all output.
>
> **CRITICAL:** Tailwind v4.2 requires `bg-[var(--token)]` syntax — bare `bg-[--token]` outputs
> the literal string, not the resolved CSS variable value.

---

## Example 1: Button (Atom)

Shows: full token block, `React.forwardRef`, variant+size maps without clsx, loading state, shadow progression, all 7 Storybook stories.

---

### Token block → `design-system/geeklego.css`

```css
/* Button — generated 2026-03-16 */
:root,
[data-theme="dark"] {
  /* ── Shared ─────────────────────────────────────────────────────────────── */
  --button-radius:                     var(--radius-component-md);
  --button-gap:                        var(--spacing-component-xs);

  /* ── Primary (filled + shadow) ──────────────────────────────────────────── */
  --button-primary-bg:                 var(--color-action-primary);
  --button-primary-bg-hover:           var(--color-action-primary-hover);
  --button-primary-bg-active:          var(--color-action-primary-active);
  --button-primary-text:               var(--color-text-inverse);
  --button-primary-shadow:             var(--shadow-sm);
  --button-primary-shadow-hover:       var(--shadow-md);

  /* ── Secondary (filled muted, no shadow) ────────────────────────────────── */
  --button-secondary-bg:               var(--color-action-secondary);
  --button-secondary-bg-hover:         var(--color-action-secondary-hover);
  --button-secondary-bg-active:        var(--color-action-secondary-active);
  --button-secondary-text:             var(--color-text-primary);

  /* ── Outline (transparent + visible border) ─────────────────────────────── */
  --button-outline-bg:                 transparent;
  --button-outline-bg-hover:           var(--color-state-selected);
  --button-outline-bg-active:          var(--color-state-highlight);
  --button-outline-text:               var(--color-action-primary);
  --button-outline-border:             var(--color-action-primary);
  --button-outline-border-hover:       var(--color-action-primary);

  /* ── Ghost (transparent, appears on hover) ──────────────────────────────── */
  --button-ghost-bg:                   transparent;
  --button-ghost-bg-hover:             var(--color-action-secondary);
  --button-ghost-bg-active:            var(--color-action-secondary-hover);
  --button-ghost-text:                 var(--color-text-primary);

  /* ── Destructive (filled + shadow, danger) ──────────────────────────────── */
  --button-destructive-bg:             var(--color-action-destructive);
  --button-destructive-bg-hover:       var(--color-action-destructive-hover);
  --button-destructive-bg-active:      var(--color-action-destructive-active);
  --button-destructive-text:           var(--color-text-inverse);
  --button-destructive-shadow:         var(--shadow-sm);
  --button-destructive-shadow-hover:   var(--shadow-md);

  /* ── Link (inline text action) ──────────────────────────────────────────── */
  --button-link-text:                  var(--color-action-primary);
  --button-link-text-hover:            var(--color-action-primary-hover);

  /* ── Disabled (all variants) ────────────────────────────────────────────── */
  --button-bg-disabled:                var(--color-action-disabled);
  --button-text-disabled:              var(--color-text-disabled);

  /* ── Sizing ─────────────────────────────────────────────────────────────── */
  --button-height-xs:                  var(--size-component-xs);
  --button-height-sm:                  var(--size-component-sm);
  --button-height-md:                  var(--size-component-md);
  --button-height-lg:                  var(--size-component-lg);
  --button-height-xl:                  var(--size-component-xl);

  --button-px-xs:                      var(--spacing-component-sm);
  --button-px-sm:                      var(--spacing-component-md);
  --button-px-md:                      var(--spacing-component-lg);
  --button-px-lg:                      var(--spacing-component-xl);
  --button-px-xl:                      var(--spacing-component-xl);
}
```

---

### `Button.types.ts`

```typescript
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. Defaults to 'primary'. */
  variant?: ButtonVariant;
  /** Height and typography size. Defaults to 'md'. */
  size?: ButtonSize;
  /** Shows spinner and disables interaction. */
  loading?: boolean;
  /** Icon rendered before the label. */
  leftIcon?: ReactNode;
  /** Icon rendered after the label. */
  rightIcon?: ReactNode;
  /** Square icon-only button. Hides label visually; uses it as aria-label. */
  iconOnly?: boolean;
  children: ReactNode;
}
```

---

### `Button.tsx`

```tsx
import { forwardRef } from 'react';
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';

// Variant classes — each variant uses a DIFFERENT visual strategy
const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    'bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] border border-transparent',
    'shadow-[var(--button-primary-shadow)]',
    'hover:bg-[var(--button-primary-bg-hover)] hover:shadow-[var(--button-primary-shadow-hover)]',
    'active:bg-[var(--button-primary-bg-active)] active:shadow-none',
  ].join(' '),
  secondary: [
    'bg-[var(--button-secondary-bg)] text-[var(--button-secondary-text)] border border-transparent',
    'hover:bg-[var(--button-secondary-bg-hover)] hover:border-[var(--color-border-subtle)]',
    'active:bg-[var(--button-secondary-bg-active)]',
  ].join(' '),
  outline: [
    'bg-[var(--button-outline-bg)] text-[var(--button-outline-text)]',
    'border border-[var(--button-outline-border)]',
    'hover:bg-[var(--button-outline-bg-hover)] hover:border-[var(--button-outline-border-hover)]',
    'active:bg-[var(--button-outline-bg-active)]',
  ].join(' '),
  ghost: [
    'bg-[var(--button-ghost-bg)] text-[var(--button-ghost-text)] border border-transparent',
    'hover:bg-[var(--button-ghost-bg-hover)] hover:text-[var(--color-text-primary)]',
    'active:bg-[var(--button-ghost-bg-active)]',
  ].join(' '),
  destructive: [
    'bg-[var(--button-destructive-bg)] text-[var(--button-destructive-text)] border border-transparent',
    'shadow-[var(--button-destructive-shadow)]',
    'hover:bg-[var(--button-destructive-bg-hover)] hover:shadow-[var(--button-destructive-shadow-hover)]',
    'active:bg-[var(--button-destructive-bg-active)] active:shadow-none',
  ].join(' '),
  link: [
    'bg-transparent text-[var(--button-link-text)] border border-transparent',
    'hover:text-[var(--button-link-text-hover)] hover:underline underline-offset-4',
    'active:text-[var(--button-link-text-hover)]',
    'h-auto px-0',
  ].join(' '),
};

// Size classes — pair base dimensions with typography
const sizeClasses: Record<ButtonSize, { base: string; text: string; iconBox: string }> = {
  xs: { base: 'h-[var(--button-height-xs)] px-[var(--button-px-xs)]', text: 'text-button-xs', iconBox: 'size-component-xs px-0' },
  sm: { base: 'h-[var(--button-height-sm)] px-[var(--button-px-sm)]', text: 'text-button-sm', iconBox: 'size-component-sm px-0' },
  md: { base: 'h-[var(--button-height-md)] px-[var(--button-px-md)]', text: 'text-button-md', iconBox: 'size-component-md px-0' },
  lg: { base: 'h-[var(--button-height-lg)] px-[var(--button-px-lg)]', text: 'text-button-lg', iconBox: 'size-component-lg px-0' },
  xl: { base: 'h-[var(--button-height-xl)] px-[var(--button-px-xl)]', text: 'text-button-xl', iconBox: 'size-component-xl px-0' },
};

// Icon size classes — match icon size to button size
const iconSizeClasses: Record<ButtonSize, string> = {
  xs: 'w-[var(--size-icon-xs)] h-[var(--size-icon-xs)]',
  sm: 'w-[var(--size-icon-sm)] h-[var(--size-icon-sm)]',
  md: 'w-[var(--size-icon-md)] h-[var(--size-icon-md)]',
  lg: 'w-[var(--size-icon-lg)] h-[var(--size-icon-lg)]',
  xl: 'w-[var(--size-icon-xl)] h-[var(--size-icon-xl)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, iconOnly = false, children, disabled, className, ...rest }, ref) => {
    const isDisabled = disabled || loading;

    <button
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      className={classes}
    >
      {loading && (
          <svg className={`animate-spin shrink-0 ${iconSizeClasses[size]}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className={`shrink-0 inline-flex items-center justify-center ${iconSizeClasses[size]}`} aria-hidden="true">{leftIcon}</span>
        )}
        {iconOnly ? (
          <span className="sr-only">{children}</span>
        ) : (
          <span className={loading ? 'opacity-0' : ''}>{children}</span>
        )}
        {!loading && rightIcon && (
          <span className={`shrink-0 inline-flex items-center justify-center ${iconSizeClasses[size]}`} aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  },
);
Button.displayName = 'Button';
```

---

### `Button.stories.tsx`

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Plus, ArrowRight, Trash2, Download, Search } from 'lucide-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary','secondary','outline','ghost','destructive','link'] },
    size: { control: 'select', options: ['xs','sm','md','lg','xl'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: 'Get started', variant: 'primary', size: 'md' } };

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" leftIcon={<Download size="var(--size-icon-md)" />}>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive" leftIcon={<Trash2 size="var(--size-icon-md)" />}>Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3 items-end">
      {(['xs','sm','md','lg','xl'] as const).map(s => <Button key={s} size={s}>{s.toUpperCase()}</Button>)}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-label-sm text-secondary mb-2">Default</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      <div>
        <p className="text-label-sm text-secondary mb-2">Disabled</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="secondary" disabled>Secondary</Button>
          <Button variant="outline" disabled>Outline</Button>
        </div>
      </div>
      <div>
        <p className="text-label-sm text-secondary mb-2">Loading</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" loading>Saving</Button>
          <Button variant="destructive" loading>Deleting</Button>
        </div>
      </div>
      <div>
        <p className="text-label-sm text-secondary mb-2">With Icons</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button leftIcon={<Plus size="var(--size-icon-md)" />}>Add item</Button>
          <Button variant="secondary" rightIcon={<ArrowRight size="var(--size-icon-md)" />}>Continue</Button>
        </div>
      </div>
      <div>
        <p className="text-label-sm text-secondary mb-2">Icon Only</p>
        <div className="flex flex-wrap gap-3 items-center">
          {(['xs','sm','md','lg','xl'] as const).map(s => (
            <Button key={s} size={s} iconOnly leftIcon={<Plus size={`var(--size-icon-${s})`} />}>Add</Button>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="flex flex-wrap gap-3 items-center p-8 bg-primary rounded-[var(--radius-component-lg)]">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const Playground: Story = {
  args: { children: 'Click me', variant: 'primary', size: 'md', loading: false, disabled: false, iconOnly: false },
};
```

---

### `mock-data.json`

```json
{
  "default": { "variant": "primary", "size": "md", "children": "Get started" },
  "variants": [
    { "variant": "primary", "children": "Primary" },
    { "variant": "secondary", "children": "Secondary" },
    { "variant": "outline", "children": "Outline" },
    { "variant": "ghost", "children": "Ghost" },
    { "variant": "destructive", "children": "Delete" },
    { "variant": "link", "children": "Learn more" }
  ],
  "sizes": [
    { "size": "xs", "children": "Extra small" },
    { "size": "sm", "children": "Small" },
    { "size": "md", "children": "Medium" },
    { "size": "lg", "children": "Large" },
    { "size": "xl", "children": "Extra large" }
  ],
  "states": {
    "loading": { "loading": true, "children": "Saving…" },
    "disabled": { "disabled": true, "children": "Disabled" },
    "error": { "variant": "destructive", "children": "Try again" }
  },
  "edge_cases": [
    { "variant": "primary", "children": "" },
    { "variant": "primary", "children": "This is a very long button label that might overflow" },
    { "variant": "ghost", "size": "sm", "children": "Add", "iconOnly": true }
  ]
}
```

---

---

## Example 2: Card (Molecule)

Shows: compound component pattern, multi-part tokens, relative imports to atoms.

---

### Token block → `design-system/geeklego.css`

```css
/* Card — generated [date] */
:root,
[data-theme="dark"] {
  --card-bg:                      var(--color-surface-default);
  --card-bg-filled:               var(--color-bg-secondary);
  --card-radius:                  var(--radius-component-lg);
  --card-padding:                 var(--spacing-component-xl);
  --card-border-color:            var(--color-border-default);
  --card-border-width:            var(--border-container);
  --card-shadow:                  var(--shadow-lg);
  --card-header-padding-b:        var(--spacing-component-md);
  --card-header-border:           var(--color-border-subtle);
  --card-footer-padding-t:        var(--spacing-component-md);
  --card-footer-border:           var(--color-border-subtle);
  --card-gap:                     var(--spacing-component-lg);
}
```

---

### `Card.tsx` (key patterns)

```tsx
import { forwardRef } from 'react';
// Atom import — ALWAYS relative
import { Button } from '../../atoms/Button/Button';
import type { CardProps, CardSectionProps, CardVariant } from './Card.types';

const variantClasses: Record<CardVariant, string> = {
  elevated: 'bg-[var(--card-bg)] shadow-[var(--card-shadow)] border border-transparent',
  outlined: 'bg-[var(--card-bg)] border border-[var(--card-border-color)]',
  filled:   'bg-[var(--card-bg-filled)] border border-transparent',
  ghost:    'bg-transparent border border-transparent',
};

const Header = forwardRef<HTMLDivElement, CardSectionProps>(({ children, className, ...rest }, ref) => (
  <div ref={ref} className={['pb-[var(--card-header-padding-b)] border-b border-[var(--card-header-border)]', className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
));
Header.displayName = 'Card.Header';

const Body = forwardRef<HTMLDivElement, CardSectionProps>(({ children, className, ...rest }, ref) => (
  <div ref={ref} className={className} {...rest}>{children}</div>
));
Body.displayName = 'Card.Body';

const Footer = forwardRef<HTMLDivElement, CardSectionProps>(({ children, className, ...rest }, ref) => (
  <div ref={ref} className={['pt-[var(--card-footer-padding-t)] border-t border-[var(--card-footer-border)]', className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
));
Footer.displayName = 'Card.Footer';

export const Card = forwardRef<HTMLDivElement, CardProps>(({ variant = 'elevated', children, className, ...rest }, ref) => (
  <div ref={ref} className={['flex flex-col gap-[var(--card-gap)] p-[var(--card-padding)] rounded-[var(--card-radius)]', variantClasses[variant], className].filter(Boolean).join(' ')} {...rest}>
    {children}
  </div>
));
Card.displayName = 'Card';
Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
```

---

## Key Patterns Illustrated

1. **Token chain always respected** — component token → semantic → primitive. Never skip.
2. **`var()` wrapper required** — always `bg-[var(--token)]`, never `bg-[--token]` (Tailwind v4.2 outputs literal string without `var()`).
3. **No class merging utilities** — `[a, b].filter(Boolean).join(' ')` is allowed; `clsx()` is not.
4. **Relative imports in molecules** — `import { Button } from '../../atoms/Button/Button'` — never package paths.
5. **Theme support is automatic** — semantic tokens flip in dark mode without any component code change.
6. **`displayName` on every forwardRef** — required for Storybook and React DevTools.
7. **`React.forwardRef` on all composable elements** — atoms and molecules both use it.
8. **Shadow progression** — interactive elements: `shadow-sm` → `shadow-md` on hover → `shadow-none` on active.
9. **Hover changes 2+ properties** — bg + shadow, or bg + border, or text + underline.
