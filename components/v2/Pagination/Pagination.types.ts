import type { ComponentProps, HTMLAttributes } from "react";
import type { ButtonVariantProps } from "../Button/button-variants";

/**
 * Pagination is semantic navigation markup (<nav> → <ul> → <li> with page <a>
 * links) — styled markup (rung 3), no focus-trap/keyboard/state surface beyond
 * native links. No cva variants of its own; the page links reuse Button's
 * variant/size axes to stay visually identical to the library's buttons.
 *
 * Compound: Pagination > PaginationContent > PaginationItem >
 *   (PaginationLink | PaginationPrevious | PaginationNext | PaginationEllipsis)
 */
export type PaginationProps = ComponentProps<"nav">;
export type PaginationContentProps = HTMLAttributes<HTMLUListElement>;
export type PaginationItemProps = HTMLAttributes<HTMLLIElement>;

export interface PaginationLinkProps extends ComponentProps<"a"> {
  /** Marks the current page (aria-current="page") and uses the outline look. */
  isActive?: boolean;
  /** Reuse Button's size axis. Default "icon" for number links. */
  size?: ButtonVariantProps["size"];
}

export type PaginationPreviousProps = PaginationLinkProps;
export type PaginationNextProps = PaginationLinkProps;
export type PaginationEllipsisProps = HTMLAttributes<HTMLSpanElement>;
