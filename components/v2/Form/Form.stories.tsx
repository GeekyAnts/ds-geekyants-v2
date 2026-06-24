import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./Form";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

const meta: Meta = {
  title: "v2/Form",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj;

interface Values {
  username: string;
}

function DemoForm() {
  const form = useForm<Values>({ defaultValues: { username: "" } });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex w-80 flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: "Username is required.",
            minLength: { value: 3, message: "At least 3 characters." },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="ada" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

/* ── Default — RHF-driven field with validation ───────────────────────────── */
export const Default: Story = {
  render: () => <DemoForm />,
  parameters: {
    docs: {
      description: {
        story:
          'The Form recipe on react-hook-form: FormField wraps RHF Controller, useFormField wires label↔control↔description↔error ARIA automatically. Submit with an empty/short value to see the validation message. (Form is the canonical import path for the same implementation shipped as Field.)',
      },
    },
  },
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground">
      <DemoForm />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Same form under a dark theme. The wrapper sets both data-theme="dark" and .dark; the input, label, description, and destructive error message re-theme from Tier-2 semantics.',
      },
    },
  },
};
