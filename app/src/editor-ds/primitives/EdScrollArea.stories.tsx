import type { Meta, StoryObj } from '@storybook/react'
import { EdScrollArea } from './EdScrollArea'
import { EdScrollAreaProps } from './EdScrollArea.types'
import { useRef } from 'react'

const mockListItems = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1}`,
  description: `This is the description for item number ${i + 1} with some additional text.`,
}))

const meta: Meta<typeof EdScrollArea> = {
  title: 'Editor Primitives/EdScrollArea',
  component: EdScrollArea,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'radio', options: ['scrollable', 'hover', 'native'] },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
}

export default meta

type Story = StoryObj<typeof EdScrollArea>

export const VerticalScrollable: Story = {
  args: {
    children: (
      <div className="p-4">
        {mockListItems.map((item) => (
          <div key={item.id} className="py-2 border-b border-[var(--ed-border)]">
            <div className="font-medium text-sm">{item.name}</div>
            <div className="text-xs text-[var(--ed-text-muted)]">{item.description}</div>
          </div>
        ))}
      </div>
    ),
  },
}

export const HoverScrollbar: Story = {
  args: {
    type: 'hover',
    children: (
      <div className="p-4">
        {mockListItems.map((item) => (
          <div key={item.id} className="py-2 border-b border-[var(--ed-border)]">
            <div className="font-medium text-sm">{item.name}</div>
            <div className="text-xs text-[var(--ed-text-muted)]">{item.description}</div>
          </div>
        ))}
      </div>
    ),
  },
}

export const NativeScrollbar: Story = {
  args: {
    type: 'native',
    children: (
      <div className="p-4">
        {mockListItems.map((item) => (
          <div key={item.id} className="py-2 border-b border-[var(--ed-border)]">
            <div className="font-medium text-sm">{item.name}</div>
            <div className="text-xs text-[var(--ed-text-muted)]">{item.description}</div>
          </div>
        ))}
      </div>
    ),
  },
}

export const HorizontalScroll: Story = {
  args: {
    orientation: 'horizontal',
    children: (
      <div className="flex gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="w-40 h-24 bg-[var(--ed-surface)] border border-[var(--ed-border)] rounded-[var(--ed-radius-button)] p-3">
            <div className="text-sm font-medium">Card {i + 1}</div>
            <div className="text-xs text-[var(--ed-text-muted)] mt-1">Content</div>
          </div>
        ))}
      </div>
    ),
  },
}

export const CustomContent: Story = {
  args: {
    children: (
      <div className="p-6 bg-[var(--ed-surface)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-4">Data Table Preview</div>
        <div className="space-y-2">
          {Array.from({ length: 30 }, (_, i) => (
            <div key={i} className="flex justify-between text-xs">
              <span className="text-[var(--ed-text-secondary)]">Column 1</span>
              <span className="text-[var(--ed-text-muted)]">Value {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
}
