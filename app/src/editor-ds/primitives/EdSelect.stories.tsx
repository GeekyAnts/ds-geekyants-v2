import type { Meta, StoryObj } from '@storybook/react-vite'
import { EdSelect } from './EdSelect'
import { EdSelectProps } from './EdSelect.types'

const options = [
  { value: 'option1', label: 'Option One' },
  { value: 'option2', label: 'Option Two' },
  { value: 'option3', label: 'Option Three' },
  { value: 'disabled', label: 'Disabled Option', disabled: true },
]

const meta: Meta<typeof EdSelect> = {
  title: 'Editor Primitives/EdSelect',
  component: EdSelect,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
  },
}

export default meta

type Story = StoryObj<typeof EdSelect>

export const Default: Story = {
  args: {
    label: 'Select an option',
    options,
  },
}

export const WithHint: Story = {
  args: {
    label: 'Frequency',
    options: [
      { value: 'hourly', label: 'Hourly' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
    ],
    hint: 'Choose how often to sync data',
  },
}

export const WithError: Story = {
  args: {
    label: 'Invalid Selection',
    options,
    error: 'Please select a valid option',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options,
    disabled: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    options,
  },
}
