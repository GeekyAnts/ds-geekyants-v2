import type { Meta, StoryObj } from '@storybook/react-vite'
import { EdInput } from './EdInput'
import { EdInputProps } from './EdInput.types'

const meta: Meta<typeof EdInput> = {
  title: 'Editor Primitives/EdInput',
  component: EdInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof EdInput>

export const Default: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    hint: 'This will be your public display name',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    error: 'Password must be at least 8 characters',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Read Only Field',
    value: 'Cannot edit this',
    disabled: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Search...',
  },
}
