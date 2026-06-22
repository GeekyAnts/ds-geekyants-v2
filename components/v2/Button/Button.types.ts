import type { ButtonHTMLAttributes } from "react";
import type { ButtonVariantProps } from "./button-variants";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  /**
   * Render as the child element instead of a <button>, merging props onto it
   * (Radix Slot). Use for links styled as buttons: `<Button asChild><a …/></Button>`.
   */
  asChild?: boolean;
}
