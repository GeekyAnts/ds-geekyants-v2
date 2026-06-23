import type { Meta, StoryObj } from '@storybook/react-vite'
import { EdSplit } from './EdSplit'

const meta: Meta<typeof EdSplit> = {
  title: 'Editor Primitives/EdSplit',
  component: EdSplit,
  tags: ['autodocs'],
  argTypes: {
    initialSize: { control: 'number', min: 10, max: 90 },
    minSize: { control: 'number', min: 10, max: 50 },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
}

export default meta

type Story = StoryObj<typeof EdSplit>

export const HorizontalSplit: Story = {
  args: {
    children: [
      <div key="left" className="p-4 bg-[var(--ed-surface)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-2">Sidebar</div>
        <div className="text-xs text-[var(--ed-text-muted)]">Drag the gutter to resize</div>
        <div className="mt-4 space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-8 bg-[var(--ed-border)] rounded-[var(--ed-radius-button)]" />
          ))}
        </div>
      </div>,
      <div key="right" className="p-4 bg-[var(--ed-surface-elevated)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-4">Main Content</div>
        <div className="space-y-3">
          <div className="h-4 bg-[var(--ed-border)] rounded-[var(--ed-radius-button)]" />
          <div className="h-4 bg-[var(--ed-border)] rounded-[var(--ed-radius-button)] w-3/4" />
          <div className="h-32 bg-[var(--ed-border)]/50 rounded-[var(--ed-radius-button)] mt-4" />
        </div>
      </div>,
    ],
  },
}

export const VerticalSplit: Story = {
  args: {
    orientation: 'vertical',
    children: [
      <div key="top" className="p-4 bg-[var(--ed-surface)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-2">Header Panel</div>
        <div className="text-xs text-[var(--ed-text-muted)]">Resizes vertically</div>
      </div>,
      <div key="bottom" className="p-4 bg-[var(--ed-surface-elevated)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-4">Content Panel</div>
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="h-6 bg-[var(--ed-border)] rounded-[var(--ed-radius-button)]" />
          ))}
        </div>
      </div>,
    ],
  },
}

export const CustomSizes: Story = {
  args: {
    initialSize: 70,
    minSize: 15,
    children: [
      <div key="left" className="p-4 bg-[var(--ed-surface)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-2">Wide Panel (70%)</div>
      </div>,
      <div key="right" className="p-4 bg-[var(--ed-surface-elevated)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-2">Narrow Panel (30%)</div>
      </div>,
    ],
  },
}

export const EqualSplit: Story = {
  args: {
    initialSize: 50,
    children: [
      <div key="left" className="p-4 bg-[var(--ed-surface)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-2">50%</div>
      </div>,
      <div key="right" className="p-4 bg-[var(--ed-surface-elevated)] ed-radius-[var(--ed-radius-card)]">
        <div className="text-sm font-semibold mb-2">50%</div>
      </div>,
    ],
  },
}
