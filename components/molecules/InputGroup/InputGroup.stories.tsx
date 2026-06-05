import type { Meta, StoryObj } from '@storybook/react';
import { Search, Globe, Lock, Mail, DollarSign, AtSign, Copy, ChevronDown, Send } from 'lucide-react';
import { InputGroup } from './InputGroup';

const meta = {
  title: 'Molecules/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'InputGroup composes an input with addon elements (icons, text, or buttons) sharing a unified border and visual boundary. Use the composition API: InputGroup.Input, InputGroup.Addon, and InputGroup.Button.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'flushed', 'unstyled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 1. Default ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <InputGroup aria-label="Search">
        <InputGroup.Addon align="inline-start">
          <Search size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Search…" />
      </InputGroup>
    </div>
  ),
};

// ── 2. Variants ───────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-component-lg)] max-w-sm">
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">default</span>
        <InputGroup aria-label="URL input default">
          <InputGroup.Addon align="inline-start">
            <Globe size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="https://example.com" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">filled</span>
        <InputGroup variant="filled" aria-label="Email input filled">
          <InputGroup.Addon align="inline-start">
            <Mail size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="you@example.com" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">flushed</span>
        <InputGroup variant="flushed" aria-label="Username input flushed">
          <InputGroup.Addon align="inline-start">
            <AtSign size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="username" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">with button suffix</span>
        <InputGroup aria-label="Docs search with button">
          <InputGroup.Addon align="inline-start">
            <Search size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="Search the docs…" />
          <InputGroup.Button>Search</InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  ),
};

// ── 3. Sizes ──────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-component-lg)] max-w-sm">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <div key={size} className="flex flex-col gap-[var(--spacing-component-xs)]">
          <span className="text-body-sm text-[var(--color-text-tertiary)]">{size}</span>
          <InputGroup size={size} aria-label={`Search size ${size}`}>
            <InputGroup.Addon align="inline-start">
              <Search size="var(--size-icon-sm)" aria-hidden="true" />
            </InputGroup.Addon>
            <InputGroup.Input placeholder={`Size ${size}`} />
            <InputGroup.Addon align="inline-end">
              <span aria-hidden="true" className="text-[var(--input-group-addon-text)] text-body-sm">⌘K</span>
            </InputGroup.Addon>
          </InputGroup>
        </div>
      ))}
    </div>
  ),
};

// ── 4. States ─────────────────────────────────────────────────────────────────

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-component-lg)] max-w-sm">
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">default</span>
        <InputGroup aria-label="Password default">
          <InputGroup.Addon align="inline-start">
            <Lock size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="Default state" type="password" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">error</span>
        <InputGroup error aria-label="Password error">
          <InputGroup.Addon align="inline-start">
            <Lock size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="Error state" type="password" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">disabled</span>
        <InputGroup disabled aria-label="Password disabled">
          <InputGroup.Addon align="inline-start">
            <Lock size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="Disabled state" type="password" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">loading</span>
        <InputGroup loading aria-label="Search loading">
          <InputGroup.Addon align="inline-start">
            <Search size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="Loading state" />
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">text prefix + suffix (currency)</span>
        <InputGroup aria-label="Amount in USD">
          <InputGroup.Addon align="inline-start">
            <span aria-hidden="true" className="text-[var(--input-group-addon-text)]">$</span>
          </InputGroup.Addon>
          <InputGroup.Input placeholder="0.00" type="number" />
          <InputGroup.Addon align="inline-end">
            <span aria-hidden="true" className="text-[var(--input-group-addon-text)]">USD</span>
          </InputGroup.Addon>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">button suffix (CTA)</span>
        <InputGroup aria-label="Email subscription">
          <InputGroup.Addon align="inline-start">
            <Mail size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="Enter your email" type="email" />
          <InputGroup.Button>Subscribe</InputGroup.Button>
        </InputGroup>
      </div>
      <div className="flex flex-col gap-[var(--spacing-component-xs)]">
        <span className="text-body-sm text-[var(--color-text-tertiary)]">button suffix (icon-only)</span>
        <InputGroup aria-label="Copy URL">
          <InputGroup.Input placeholder="https://example.com/page" />
          <InputGroup.Button aria-label="Copy URL">
            <Copy size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Button>
        </InputGroup>
      </div>
    </div>
  ),
};

// ── 5. DarkMode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="flex flex-col gap-[var(--spacing-component-lg)] p-8 bg-primary rounded-[var(--radius-component-lg)] max-w-2xl"
    >
      <InputGroup aria-label="Search dark">
        <InputGroup.Addon align="inline-start">
          <Search size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Search…" />
      </InputGroup>
      <InputGroup variant="filled" aria-label="Email dark">
        <InputGroup.Addon align="inline-start">
          <Mail size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Email address" />
      </InputGroup>
      <InputGroup aria-label="Amount dark">
        <InputGroup.Addon align="inline-start">
          <span aria-hidden="true" className="text-[var(--input-group-addon-text)]"><DollarSign size="var(--size-icon-sm)" /></span>
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Amount" type="number" />
        <InputGroup.Addon align="inline-end">
          <span aria-hidden="true" className="text-[var(--input-group-addon-text)]">USD</span>
        </InputGroup.Addon>
      </InputGroup>
      <InputGroup error aria-label="Error dark">
        <InputGroup.Addon align="inline-start">
          <Lock size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Invalid input" />
      </InputGroup>
      <InputGroup aria-label="Docs search dark">
        <InputGroup.Addon align="inline-start">
          <Search size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Search the docs…" />
        <InputGroup.Button>Search</InputGroup.Button>
      </InputGroup>
    </div>
  ),
};

// ── 6. Playground ─────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'md',
    error: false,
    loading: false,
    disabled: false,
    'aria-label': 'Playground input group',
    children: (
      <>
        <InputGroup.Addon align="inline-start">
          <Search size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Placeholder text…" />
      </>
    ),
  },
};

// ── 7. Mobile ─────────────────────────────────────────────────────────────────

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
  render: () => (
    <div className="p-4">
      <InputGroup aria-label="Mobile search">
        <InputGroup.Addon align="inline-start">
          <Search size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Search…" />
      </InputGroup>
      <div className="mt-4">
        <InputGroup aria-label="Mobile email signup">
          <InputGroup.Addon align="inline-start">
            <Mail size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Addon>
          <InputGroup.Input placeholder="your@email.com" type="email" />
          <InputGroup.Button>
            <Send size="var(--size-icon-sm)" aria-hidden="true" />
          </InputGroup.Button>
        </InputGroup>
      </div>
      <div className="mt-4">
        <InputGroup size="lg" aria-label="Mobile amount">
          <InputGroup.Addon align="inline-start">
            <span aria-hidden="true" className="text-[var(--input-group-addon-text)] text-body-lg">$</span>
          </InputGroup.Addon>
          <InputGroup.Input placeholder="0.00" type="number" />
        </InputGroup>
      </div>
    </div>
  ),
};

// ── 8. Accessibility ──────────────────────────────────────────────────────────

export const Accessibility: Story = {
  tags: ['a11y'],
  name: 'Accessibility',
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-component-lg)] p-[var(--spacing-layout-xs)] max-w-sm">
      {/*
        Keyboard: Tab enters the inner input · input has focus-ring-inset on focus-visible
        Screen reader: group label announced, then input placeholder/label
        Decorative addons (icons, text) have aria-hidden="true" on their content
        Interactive buttons retain their own accessible name
      */}

      {/* Fully labelled: group aria-label + visible input placeholder */}
      <InputGroup aria-label="Search documentation">
        <InputGroup.Addon align="inline-start">
          <Search size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Search…" />
      </InputGroup>

      {/* Phone with country-code prefix — prefix text has semantic value (no aria-hidden) */}
      <InputGroup aria-label="Phone number">
        <InputGroup.Addon align="inline-start">
          <span className="text-[var(--input-group-addon-text)] text-body-sm content-nowrap">+1</span>
        </InputGroup.Addon>
        <InputGroup.Input type="tel" placeholder="(555) 000-0000" />
      </InputGroup>

      {/* Error: aria-invalid communicated via inner Input */}
      <InputGroup
        aria-label="Email address"
        error
        aria-describedby="ig-email-error"
      >
        <InputGroup.Addon align="inline-start">
          <Mail size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input type="email" placeholder="you@example.com" />
      </InputGroup>
      <span id="ig-email-error" className="text-body-sm text-[var(--color-text-error)]">
        Enter a valid email address.
      </span>

      {/* Disabled: both disabled + aria-disabled on group */}
      <InputGroup aria-label="Locked field" disabled>
        <InputGroup.Addon align="inline-start">
          <Lock size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input placeholder="Not editable" />
      </InputGroup>

      {/* Interactive button suffix: Button retains its own accessible name */}
      <InputGroup aria-label="Newsletter signup">
        <InputGroup.Addon align="inline-start">
          <Mail size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Addon>
        <InputGroup.Input type="email" placeholder="your@email.com" />
        <InputGroup.Button>Subscribe</InputGroup.Button>
      </InputGroup>

      {/* Icon-only button suffix with aria-label */}
      <InputGroup aria-label="Copy link">
        <InputGroup.Input placeholder="https://example.com" />
        <InputGroup.Button aria-label="Copy link to clipboard">
          <Copy size="var(--size-icon-sm)" aria-hidden="true" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  ),
};
