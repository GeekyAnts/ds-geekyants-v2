import type { Meta, StoryObj } from '@storybook/react'
import { EdIconButton } from './EdIconButton'
import { EdIconButtonProps } from './EdIconButton.types'
import { Plus, Trash, Settings, User } from 'lucide-react'

const meta: Meta<typeof EdIconButton> = {
  title: 'Editor Primitives/EdIconButton',
  component: EdIconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['ghost', 'secondary', 'danger'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
}

export default meta

type Story = StoryObj<typeof EdIconButton>

export const GhostWithPlus: Story = {
  args: {
    icon: <Plus size={16} />,
    variant: 'ghost',
    size: 'md',
    'aria-label': 'Add item',
  },
}

export const GhostWithTrash: Story = {
  args: {
    icon: <Trash size={16} />,
    variant: 'ghost',
    size: 'md',
    'aria-label': 'Delete item',
  },
}

export const Secondary: Story = {
  args: {
    icon: <Settings size={16} />,
    variant: 'secondary',
    size: 'md',
    'aria-label': 'Settings',
  },
}

export const DangerWithUser: Story = {
  args: {
    icon: <User size={16} />,
    variant: 'danger',
    size: 'md',
    'aria-label': 'User actions',
  },
}

export const Small: Story = {
  args: {
    icon: <Plus size={14} />,
    variant: 'ghost',
    size: 'sm',
    'aria-label': 'Add',
  },
}

export const Large: Story = {
  args: {
    icon: <Plus size={20} />,
    variant: 'ghost',
    size: 'lg',
    'aria-label': 'Add large',
  },
}
