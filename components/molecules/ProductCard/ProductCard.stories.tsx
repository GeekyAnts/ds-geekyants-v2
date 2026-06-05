import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import { Badge } from '../../atoms/Badge/Badge';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    imageAlt: 'Premium watch on a white surface',
    title: 'Premium Minimalist Watch',
    price: '$149.00',
    originalPrice: '$199.00',
    rating: 4,
    ratingCount: 128,
    variant: 'elevated',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    badge: <Badge variant="soft" color="error" size="sm">Sale</Badge>,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-[var(--spacing-layout-sm)] max-w-2xl">
      {(['elevated', 'outlined', 'filled', 'ghost'] as const).map((variant) => (
        <ProductCard
          key={variant}
          {...args}
          variant={variant}
          title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Card`}
          badge={<Badge variant="soft" color="info" size="sm">{variant}</Badge>}
        />
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-[var(--spacing-layout-sm)] max-w-4xl items-start">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <ProductCard
          key={size}
          {...args}
          size={size}
          title={`Size ${size.toUpperCase()} — Minimalist Watch`}
          badge={<Badge variant="solid" color="success" size="sm">New</Badge>}
        />
      ))}
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-[var(--spacing-layout-sm)] max-w-4xl items-start">
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-[var(--spacing-component-sm)]">Default</p>
        <ProductCard {...args} />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-[var(--spacing-component-sm)]">Loading</p>
        <ProductCard {...args} loading />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-[var(--spacing-component-sm)]">Disabled</p>
        <ProductCard {...args} disabled />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-[var(--spacing-component-sm)]">With href</p>
        <ProductCard {...args} href="/products/watch" />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-[var(--spacing-component-sm)]">No rating</p>
        <ProductCard {...args} rating={undefined} ratingCount={undefined} />
      </div>
      <div>
        <p className="text-label-sm text-[var(--color-text-secondary)] mb-[var(--spacing-component-sm)]">No sale price</p>
        <ProductCard {...args} originalPrice={undefined} />
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  render: (args) => (
    <div
      data-theme="dark"
      className="bg-[var(--color-bg-primary)] p-[var(--spacing-layout-md)] rounded-[var(--radius-component-lg)] max-w-2xl"
    >
      <div className="grid grid-cols-2 gap-[var(--spacing-layout-sm)]">
        {(['elevated', 'outlined', 'filled', 'ghost'] as const).map((variant) => (
          <ProductCard
            key={variant}
            {...args}
            variant={variant}
            badge={<Badge variant="soft" color="error" size="sm">Sale</Badge>}
          />
        ))}
      </div>
    </div>
  ),
};

export const Playground: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    schema: { control: 'boolean' },
    price: { control: 'text' },
    originalPrice: { control: 'text' },
    title: { control: 'text' },
    rating: { control: { type: 'range', min: 0, max: 5, step: 0.5 } },
    ratingCount: { control: 'number' },
    ctaLabel: { control: 'text' },
    href: { control: 'text' },
  },
  args: {
    badge: undefined,
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile' },
  },
  render: (args) => (
    <div className="flex flex-col gap-[var(--spacing-layout-sm)] p-[var(--spacing-component-md)]">
      <ProductCard
        {...args}
        badge={<Badge variant="soft" color="error" size="sm">Sale</Badge>}
      />
      <ProductCard
        {...args}
        variant="outlined"
        title="Another Product with a Longer Title That May Truncate"
        originalPrice={undefined}
      />
    </div>
  ),
};

export const Accessibility: Story = {
  tags: ['a11y'],
  render: (args) => (
    <div className="grid grid-cols-2 gap-[var(--spacing-layout-sm)] max-w-2xl">
      {/* Explicit aria-label on CTA, title as link */}
      <ProductCard
        {...args}
        href="/products/watch"
        badge={<Badge variant="soft" color="error" size="sm">Sale</Badge>}
        aria-label="Premium Minimalist Watch product card"
      />
      {/* Loading state with aria-busy */}
      <ProductCard
        {...args}
        loading
        aria-label="Loading product"
      />
      {/* Disabled with aria-disabled */}
      <ProductCard
        {...args}
        disabled
        aria-label="Premium Minimalist Watch — unavailable"
      />
      {/* Schema.org microdata */}
      <ProductCard
        {...args}
        schema
        aria-label="Premium Minimalist Watch product card with structured data"
      />
    </div>
  ),
};
