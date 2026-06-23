import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import type {
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import type { Label } from "../Label/Label";

/**
 * Field (ShadCN Form recipe) prop types.
 *
 * The behavior/state engine is react-hook-form — these types only describe the
 * thin styled wrappers around it. `FormField` is a render-prop over RHF's
 * `Controller`, so it borrows `Controller`'s generics verbatim; the remaining
 * parts are plain styled elements.
 */

/** `FormField` = a typed pass-through of RHF's `Controller`. */
export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;

/** `FormItem` — layout wrapper that owns the generated field id (a <div>). */
export type FormItemProps = HTMLAttributes<HTMLDivElement>;

/** `FormLabel` — same surface as our Label; auto-wires `htmlFor` + error state. */
export type FormLabelProps = ComponentPropsWithoutRef<typeof Label>;

/** `FormDescription` — helper text under the control (a <p>). */
export type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

/** `FormMessage` — validation message; renders the field error or `children`. */
export type FormMessageProps = HTMLAttributes<HTMLParagraphElement>;
