import type { Meta, StoryObj } from '@storybook/react-vite'
import { EdDialog } from './EdDialog'
import { EdDialogProps, EdDialogSize } from './EdDialog.types'
import { EdButton } from './EdButton'
import { useState } from 'react'

const meta: Meta<typeof EdDialog> = {
  title: 'Editor Primitives/EdDialog',
  component: EdDialog,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg', 'xl'] as EdDialogSize[] },
  },
}

export default meta

type Story = StoryObj<typeof EdDialog>

function DialogStory(args: EdDialogProps) {
  const [isOpen, setIsOpen] = useState(args.isOpen)
  
  return (
    <div>
      <EdButton onClick={() => setIsOpen(true)}>Open Dialog</EdButton>
      <EdDialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export const Default: Story = {
  render: (args) => DialogStory(args),
  args: {
    title: 'Dialog Title',
    isOpen: true,
    children: <p className="text-sm">This is the dialog content. Click outside or press Escape to close.</p>,
    footer: (
      <div className="flex justify-end gap-2">
        <EdButton variant="secondary" onClick={() => {}}>Cancel</EdButton>
        <EdButton>Confirm</EdButton>
      </div>
    ),
  },
}

export const WithDescription: Story = {
  render: (args) => DialogStory(args),
  args: {
    title: 'Confirm Action',
    description: 'This action cannot be undone. Please confirm before proceeding.',
    isOpen: true,
    children: <p className="text-sm">Additional details about the action.</p>,
    footer: (
      <div className="flex justify-end gap-2">
        <EdButton variant="secondary" onClick={() => {}}>Cancel</EdButton>
        <EdButton variant="danger">Delete</EdButton>
      </div>
    ),
  },
}

export const SmallSize: Story = {
  render: (args) => DialogStory(args),
  args: {
    ...Default.args,
    size: 'sm',
  },
}

export const LargeSize: Story = {
  render: (args) => DialogStory(args),
  args: {
    ...Default.args,
    size: 'lg',
  },
}

export const NoFooter: Story = {
  render: (args) => DialogStory(args),
  args: {
    ...Default.args,
    footer: undefined,
  },
}
