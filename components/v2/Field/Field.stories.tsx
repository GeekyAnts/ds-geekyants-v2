import type { Meta, StoryObj } from "@storybook/react-vite";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./Field";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import "../../../design-system/v2/index.css";

/**
 * Field — the ShadCN Form recipe on react-hook-form. Stories drive it through a
 * real `useForm()` so validation, error state, and ARIA wiring are exercised the
 * way a consumer would, not faked with a manual error boolean.
 */
const meta: Meta<typeof FormField> = {
  title: "v2/Field",
  component: FormField,
  parameters: { layout: "centered" },
};
export default meta;

type Story = StoryObj<typeof FormField>;

/** A small typed form used by most stories. */
interface DemoValues {
  email: string;
}

function EmailForm({
  defaultEmail = "",
  description,
}: {
  defaultEmail?: string;
  description?: string;
}) {
  const form = useForm<DemoValues>({
    defaultValues: { email: defaultEmail },
    mode: "onSubmit",
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => {})}
        className="flex w-80 flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required.",
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: "Enter a valid email address.",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              {description ? (
                <FormDescription>{description}</FormDescription>
              ) : null}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export const Default: Story = {
  render: () => <EmailForm />,
};

export const WithDescription: Story = {
  render: () => (
    <EmailForm description="We'll only use this to send order receipts." />
  ),
};

/**
 * Submit with an empty field to see the validation error: the label turns
 * destructive, the input flips to its error border, and FormMessage renders the
 * RHF message — all from field state, no manual wiring.
 */
export const WithValidationError: Story = {
  render: () => <EmailForm description="Submit empty to trigger validation." />,
};

function DisabledForm() {
  const form = useForm<DemoValues>({ defaultValues: { email: "" } });
  return (
    <Form {...form}>
      <form className="flex w-80 flex-col gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" disabled {...field} />
              </FormControl>
              <FormDescription>This field is disabled.</FormDescription>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export const Disabled: Story = {
  render: () => <DisabledForm />,
};

export const DarkMode: Story = {
  render: () => (
    <div
      data-theme="dark"
      className="dark max-w-2xl rounded-lg bg-background p-8 text-foreground"
    >
      <EmailForm description="Themed live via @theme inline overrides." />
    </div>
  ),
};
