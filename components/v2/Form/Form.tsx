/**
 * Form — the ShadCN Form recipe.
 *
 * The implementation already lives in `../Field/Field` (built on react-hook-form:
 * Form / FormField / FormItem / FormLabel / FormControl / FormDescription /
 * FormMessage + the useFormField hook). "Form" and "Field" are the same recipe in
 * this library — this module is the canonical `Form` import path and re-exports
 * the single implementation verbatim, so there is exactly one source of truth
 * (no duplicate component).
 */
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "../Field/Field";
