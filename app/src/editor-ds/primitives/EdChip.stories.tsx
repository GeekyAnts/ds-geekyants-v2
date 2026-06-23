import type { Meta, StoryObj } from '@storybook/react-vite'
import { EdChip } from './EdChip'

const meta: Meta<typeof EdChip> = {
  title: 'Editor Primitives/EdChip',
  component: EdChip,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'accent', 'success', 'warning', 'danger'] },
    removable: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof EdChip>

export const Default: Story = {
  args: {
    children: 'Default Chip',
  },
}

export const Accent: Story = {
  args: {
    children: 'Accent Chip',
    variant: 'accent',
  },
}

export const Success: Story = {
  args: {
    children: 'Active',
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    children: 'Pending Review',
    variant: 'warning',
  },
}

export const Danger: Story = {
  args: {
    children: 'Error',
    variant: 'danger',
  },
}

export const Removable: Story = {
  args: {
    children: 'Removable Item',
    removable: true,
    onRemove: () => console.log('Removed'),
  },
}
