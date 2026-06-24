import type { ColumnDef } from "@tanstack/react-table";

/**
 * DataTable is a COMPOSITION on @tanstack/react-table (category B): the lib owns
 * the headless table model — sorting, filtering, pagination, row state — and our
 * Table primitives render it. Generic over the row shape; consumers pass column
 * defs + data, exactly like the ShadCN recipe.
 */
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  /** Show prev/next pagination controls. Default true. */
  pagination?: boolean;
  /** Rows per page when pagination is enabled. Default 10. */
  pageSize?: number;
  /** Text shown when there are no rows. */
  emptyText?: string;
}
