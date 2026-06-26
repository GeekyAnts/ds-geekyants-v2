import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../lib/cn";
import type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
} from "./Breadcrumb.types";

/**
 * Breadcrumb — ShadCN pattern on geeklego's 2-tier token system.
 *
 * A navigation trail built from semantic markup (<nav aria-label> → <ol> → <li>)
 * — no focus trap / keyboard / portal surface, so no Radix primitive; it's
 * styled markup (rung 3). The current page is marked with BreadcrumbPage
 * (aria-current="page"), not a link. Styled with standard semantic utilities
 * (text-muted-foreground, text-foreground).
 *
 * Compound: <Breadcrumb><BreadcrumbList>
 *   <BreadcrumbItem><BreadcrumbLink href>…</BreadcrumbLink></BreadcrumbItem>
 *   <BreadcrumbSeparator/>
 *   <BreadcrumbItem><BreadcrumbPage>…</BreadcrumbPage></BreadcrumbItem>
 * </BreadcrumbList></Breadcrumb>
 */
export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />,
);
Breadcrumb.displayName = "Breadcrumb";

/** Ordered list of crumbs; wraps and stays horizontally readable. */
export const BreadcrumbList = forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
);
BreadcrumbList.displayName = "BreadcrumbList";

/** A single crumb cell (holds a link, the page, an ellipsis, or a separator). */
export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  ),
);
BreadcrumbItem.displayName = "BreadcrumbItem";

/** A navigable crumb. `asChild` lets it wrap a router Link via Radix Slot. */
export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        className={cn(
          "transition-colors hover:text-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
BreadcrumbLink.displayName = "BreadcrumbLink";

/** The current page — not a link; carries aria-current="page". */
export const BreadcrumbPage = forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  ),
);
BreadcrumbPage.displayName = "BreadcrumbPage";

/**
 * Separator between crumbs — decorative (aria-hidden), so it's skipped by screen
 * readers. Defaults to a chevron; override by passing children.
 */
export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&_svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

/**
 * Collapsed-crumbs indicator (decorative). Use in place of the middle crumbs
 * when the trail is long; pair with a DropdownMenu to reveal them if needed.
 */
export const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
