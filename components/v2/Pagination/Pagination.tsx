import { forwardRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../lib/cn";
import { buttonVariants } from "../Button/button-variants";
import type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationNextProps,
  PaginationEllipsisProps,
} from "./Pagination.types";

/**
 * Pagination — ShadCN pattern on geeklego's 2-tier token system.
 *
 * Semantic navigation markup (<nav aria-label> → <ul> → <li> → page <a> links)
 * — no focus-trap/keyboard/state surface beyond native links, so it's styled
 * markup (rung 3). The page links reuse Button's variants so they match the
 * library's buttons exactly: the active page uses the `outline` look, others
 * `ghost`. PaginationLink renders an <a> by default; pass a router Link or a
 * <button> via the standard child props for app integration / DataTable wiring.
 *
 * Compound: <Pagination><PaginationContent>
 *   <PaginationItem><PaginationPrevious href/></PaginationItem>
 *   <PaginationItem><PaginationLink href isActive>1</PaginationLink></PaginationItem>
 *   <PaginationItem><PaginationEllipsis/></PaginationItem>
 *   <PaginationItem><PaginationNext href/></PaginationItem>
 * </PaginationContent></Pagination>
 */
export const Pagination = ({ className, ...props }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

export const PaginationContent = forwardRef<
  HTMLUListElement,
  PaginationContentProps
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn(className)} {...props} />
  ),
);
PaginationItem.displayName = "PaginationItem";

/* PaginationLink — a single page link. Active page reads as outline + aria-current. */
export const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, isActive, size = "icon", ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: isActive ? "outline" : "ghost", size }),
        "cursor-pointer font-normal",
        className,
      )}
      {...props}
    />
  ),
);
PaginationLink.displayName = "PaginationLink";

export const PaginationPrevious = forwardRef<
  HTMLAnchorElement,
  PaginationPreviousProps
>(({ className, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    aria-label="Go to previous page"
    size="md"
    className={cn("gap-1 ps-2.5", className)}
    {...props}
  >
    <ChevronLeft className="size-4" />
    <span>Previous</span>
  </PaginationLink>
));
PaginationPrevious.displayName = "PaginationPrevious";

export const PaginationNext = forwardRef<HTMLAnchorElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <PaginationLink
      ref={ref}
      aria-label="Go to next page"
      size="md"
      className={cn("gap-1 pe-2.5", className)}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="size-4" />
    </PaginationLink>
  ),
);
PaginationNext.displayName = "PaginationNext";

/* Ellipsis — decorative collapsed-pages indicator (aria-hidden). */
export const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";
