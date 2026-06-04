import type { Meta, StoryObj } from '@storybook/react'
import { EdMenu } from './EdMenu'
import { EdMenuProps, EdMenuItem } from './EdMenu.types'
import { MoreHorizontal, Edit, Trash2, Copy, Share2 } from 'lucide-react'

const menuItems: EdMenuItem[] = [
  { id: 'edit', label: 'Edit', icon: <Edit size={16} /> },
  { id: 'duplicate', label: 'Duplicate', icon: <Copy size={16} /> },
  { id: 'share', label: 'Share', icon: <Share2 size={16} /> },
  { id: 'delete', label: 'Delete', icon: <Trash2 size={16} />, disabled: false },
]

const meta: Meta<typeof EdMenu> = {
  title: 'Editor Primitives/EdMenu',
  component: EdMenu,
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'radio', options: ['bottom-left', 'bottom-right'] },
  },
}

export default meta

type Story = StoryObj<typeof EdMenu>

export const Default: Story = {
  args: {
    trigger: <button className="p-2 hover:bg-[var(--ed-border)] rounded-[var(--ed-radius-button)] transition-default">
      <MoreHorizontal size={18} />
    </button>,
    items: menuItems,
  },
}

export const WithActions: Story = {
  args: {
    trigger: <button className="px-3 py-1.5 bg-[var(--ed-accent)] rounded-[var(--ed-radius-button)] text-sm">
      Options
    </button>,
    items: [
      { id: 'save', label: 'Save Changes' },
      { id: 'export', label: 'Export' },
      { id: 'settings', label: 'Settings' },
    ],
  },
}

export const DisabledItem: Story = {
  args: {
    trigger: <button className="p-2 hover:bg-[var(--ed-border)] rounded-[var(--ed-radius-button)] transition-default">
      <MoreHorizontal size={18} />
    </button>,
    items: [
      { id: 'active', label: 'Active Action' },
      { id: 'disabled', label: 'Disabled Action', disabled: true },
      { id: 'another', label: 'Another Action' },
    ],
  },
}

export const WithIcon: Story = {
  args: {
    trigger: <button className="p-2 hover:bg-[var(--ed-border)] rounded-[var(--ed-radius-button)] transition-default">
      <MoreHorizontal size={18} />
    </button>,
    items: [
      { id: 'view', label: 'View', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg> },
      { id: 'edit-action', label: 'Edit', icon: <Edit size={16} /> },
    ],
  },
}

export const BottomRight: Story = {
  args: {
    trigger: <button className="p-2 hover:bg-[var(--ed-border)] rounded-[var(--ed-radius-button)] transition-default">
      <MoreHorizontal size={18} />
    </button>,
    items: menuItems,
    position: 'bottom-right',
  },
}
