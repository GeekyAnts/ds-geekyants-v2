import type { Meta, StoryObj } from '@storybook/react-vite'
import { EdCard } from './EdCard'
import { EdCardProps } from './EdCard.types'

const meta: Meta<typeof EdCard> = {
  title: 'Editor Primitives/EdCard',
  component: EdCard,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'elevated'] },
    padding: { control: 'radio', options: ['none', 'sm', 'md', 'lg'] },
  },
}

export default meta

type Story = StoryObj<typeof EdCard>

export const Default: Story = {
  args: {
    children: 'Card Content',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated Card',
  },
}

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: 'Small Padding Card',
  },
}

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: 'Large Padding Card',
  },
}

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: <div className="text-sm">No padding card with tight layout</div>,
  },
}

export const WithContent: Story = {
  args: {
    children: (
      <div>
        <div className="font-semibold mb-2">Card Title</div>
        <div className="text-sm text-secondary">Card description or content goes here.</div>
      </div>
    ),
  },
}
