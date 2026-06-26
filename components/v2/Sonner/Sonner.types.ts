import type { ComponentProps } from "react";
import type { Toaster as SonnerToaster } from "sonner";

/**
 * Props extend sonner's Toaster, so every prop (position, richColors, expand,
 * duration, closeButton …) flows through unchanged. We only preset the styling
 * via toastOptions.classNames in the component.
 */
export type ToasterProps = ComponentProps<typeof SonnerToaster>;
