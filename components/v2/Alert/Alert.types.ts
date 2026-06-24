import type { HTMLAttributes } from "react";
import type { AlertVariantProps } from "./alert-variants";

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    AlertVariantProps {}

export type AlertTitleProps = HTMLAttributes<HTMLDivElement>;

export type AlertDescriptionProps = HTMLAttributes<HTMLDivElement>;
