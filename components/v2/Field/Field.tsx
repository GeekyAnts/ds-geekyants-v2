"use client";
import {
  createContext,
  forwardRef,
  useContext,
  useId,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { cn } from "../lib/cn";
import { Label } from "../Label/Label";
import type {
  FormDescriptionProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps,
} from "./Field.types";

/**
 * Field — the ShadCN Form recipe on geeklego's 2-tier tokens.
 *
 * The behavior/state engine is **react-hook-form** (Radix has no form-state
 * primitive). We own only the look (standard semantic utilities) + the ARIA
 * wiring that connects label ↔ control ↔ description ↔ error message. The parts:
 *
 *   <Form {...form}>                         // RHF FormProvider
 *     <FormField name="email" control={...}  // render-prop over RHF Controller
 *       render={({ field }) => (
 *         <FormItem>                          // owns the generated id
 *           <FormLabel>Email</FormLabel>      // htmlFor + error state, auto
 *           <FormControl><Input {...field}/></FormControl>  // Slot: aria-* wiring
 *           <FormDescription>…</FormDescription>
 *           <FormMessage />                   // renders the field's RHF error
 *         </FormItem>
 *       )} />
 *   </Form>
 *
 * No manual `error` boolean is threaded by hand — `useFormField` reads RHF's
 * field state, so the label's error styling, `aria-invalid`, `aria-describedby`,
 * and the message text all derive from validation automatically.
 */

/** Root provider — a direct alias of RHF's FormProvider. */
const Form = FormProvider;

// --- context: which field name this FormItem subtree belongs to --------------

interface FormFieldContextValue {
  name: string;
}
const FormFieldContext = createContext<FormFieldContextValue | null>(null);

interface FormItemContextValue {
  id: string;
}
const FormItemContext = createContext<FormItemContextValue | null>(null);

/**
 * useFormField — derives everything a field's parts need from RHF state +
 * the two contexts. Single source of truth for ids, error, and ARIA wiring.
 */
function useFormField() {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext?.name });

  if (!fieldContext) {
    throw new Error("useFormField must be used within a <FormField>");
  }
  if (!itemContext) {
    throw new Error("useFormField must be used within a <FormItem>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}

// --- FormField: typed pass-through of RHF Controller -------------------------

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: FormFieldProps<TFieldValues, TName>,
) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

// --- FormItem: layout wrapper that mints the field id ------------------------

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    const id = useId();
    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";

// --- FormLabel: our Label, auto-wired to the control + error state -----------

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();
    return (
      <Label
        ref={ref}
        htmlFor={formItemId}
        className={cn(error && "text-destructive", className)}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

// --- FormControl: Slot that injects id + aria-* onto the consumer's control --

const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error
          ? `${formDescriptionId} ${formMessageId}`
          : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

// --- FormDescription: helper text --------------------------------------------

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    return (
      <p
        ref={ref}
        id={formDescriptionId}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      />
    );
  },
);
FormDescription.displayName = "FormDescription";

// --- FormMessage: the field's validation error (or children) -----------------

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? "") : children;

    if (!body) return null;

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {body}
      </p>
    );
  },
);
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
