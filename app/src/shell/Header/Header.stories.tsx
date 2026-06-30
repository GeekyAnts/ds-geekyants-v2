import type { Meta, StoryObj } from '@storybook/react-vite'
import { Header } from './Header'

const meta = {
  title: 'EditorShell/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    pendingCount: 0,
    onOpenCommandPalette: () => alert('Open command palette'),
    onOpenExport: () => alert('Open export'),
    onOpenPending: () => alert('Open pending changes'),
  },
}

export const WithPendingChanges: Story = {
  args: {
    ...Default.args,
    pendingCount: 5,
  },
}
