import type { Meta, StoryObj } from '@storybook/react-vite'
import { EdTooltip } from './EdTooltip'

const meta: Meta<typeof EdTooltip> = {
  title: 'Editor Primitives/EdTooltip',
  component: EdTooltip,
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'radio', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
  },
}

export default meta

type Story = StoryObj<typeof EdTooltip>

export const TopPosition: Story = {
  args: {
    content: 'This is a tooltip',
    children: <button className="px-4 py-2 bg-[var(--ed-accent)] rounded-[var(--ed-radius-button)]">Hover Me</button>,
    position: 'top',
  },
}

export const BottomPosition: Story = {
  args: {
    content: 'Info below',
    children: <button className="px-4 py-2 bg-[var(--ed-accent)] rounded-[var(--ed-radius-button)]">Hover Me</button>,
    position: 'bottom',
  },
}

export const LeftPosition: Story = {
  args: {
    content: 'To the left',
    children: <button className="px-4 py-2 bg-[var(--ed-accent)] rounded-[var(--ed-radius-button)]">Hover Me</button>,
    position: 'left',
  },
}

export const RightPosition: Story = {
  args: {
    content: 'To the right',
    children: <button className="px-4 py-2 bg-[var(--ed-accent)] rounded-[var(--ed-radius-button)]">Hover Me</button>,
    position: 'right',
  },
}

export const WithDelay: Story = {
  args: {
    content: 'Delayed tooltip (500ms)',
    children: <button className="px-4 py-2 bg-[var(--ed-accent)] rounded-[var(--ed-radius-button)]">Hover for Delay</button>,
    delay: 500,
  },
}

export const WithIcon: Story = {
  args: {
    content: 'Settings tooltip',
    children: (
      <button className="p-2 hover:bg-[var(--ed-border)] rounded-[var(--ed-radius-button)] transition-default">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
        </svg>
      </button>
    ),
  },
}
