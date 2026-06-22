import type { InputHTMLAttributes } from "react";
import type { InputVariantProps } from "./input-variants";

/**
 * Input props — native <input> attributes plus the cva variant axes.
 *
 * Note the size axis is exposed as `inputSize`, not `size`: the native input
 * `size` attribute (a number — visible character width) would otherwise collide
 * with a cva `size` variant. Keeping them separate preserves the HTML attribute.
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {
  /** Native input `size` attribute (visible character width). Rarely needed. */
  size?: number;
}
