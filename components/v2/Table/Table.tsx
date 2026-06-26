import { forwardRef } from "react";
import { cn } from "../lib/cn";
import type {
  TableProps,
  TableSectionProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./Table.types";

/**
 * Table — ShadCN pattern on geeklego's 2-tier token system.
 *
 * Semantic table markup with no a11y/keyboard/state surface, so it's styled
 * markup (rung 3) — hand-rolled with cn + forwardRef. Styled entirely with
 * standard semantic utilities (border-border, bg-muted, text-muted-foreground).
 * The root wraps the <table> in a horizontal-overflow container so wide tables
 * scroll instead of breaking layout.
 *
 * Compound: <Table><TableHeader><TableRow><TableHead/></TableRow></TableHeader>
 *   <TableBody><TableRow><TableCell/></TableRow></TableBody></Table>
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-x-auto">
      <table
        ref={ref}
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = "Table";

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, TableSectionProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  ),
);
TableBody.displayName = "TableBody";

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  TableSectionProps
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border transition-colors",
        "hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-start align-middle font-medium text-muted-foreground",
        "[&:has([role=checkbox])]:pe-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-2 align-middle [&:has([role=checkbox])]:pe-0", className)}
      {...props}
    />
  ),
);
TableCell.displayName = "TableCell";

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";
