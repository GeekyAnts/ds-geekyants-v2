import type {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  OlHTMLAttributes,
  LiHTMLAttributes,
} from "react";

/**
 * Breadcrumb is semantic navigation markup (a <nav> → <ol> → <li> tree) with no
 * focus/keyboard/portal/state surface — styled markup (rung 3). No variant axis;
 * each sub-part is a thin styled wrapper, per-instance tweaks via consumer
 * className. Compound: Breadcrumb > BreadcrumbList > BreadcrumbItem >
 * (BreadcrumbLink | BreadcrumbPage) with BreadcrumbSeparator / BreadcrumbEllipsis.
 */
export type BreadcrumbProps = ComponentPropsWithoutRef<"nav">;
export type BreadcrumbListProps = OlHTMLAttributes<HTMLOListElement>;
export type BreadcrumbItemProps = LiHTMLAttributes<HTMLLIElement>;

export interface BreadcrumbLinkProps
  extends ComponentPropsWithoutRef<"a"> {
  /**
   * Render as the child element instead of an <a> (Radix Slot) — e.g. to wrap a
   * router <Link>: `<BreadcrumbLink asChild><Link to="/x">…</Link></BreadcrumbLink>`.
   */
  asChild?: boolean;
}

export type BreadcrumbPageProps = ComponentPropsWithoutRef<"span">;
export type BreadcrumbSeparatorProps = LiHTMLAttributes<HTMLLIElement>;
export type BreadcrumbEllipsisProps = HTMLAttributes<HTMLSpanElement>;
