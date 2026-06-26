"use client";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { cn } from "../lib/cn";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../Table/Table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "../Pagination/Pagination";
import type { DataTableProps } from "./DataTable.types";

/**
 * DataTable — the ShadCN data-table recipe on geeklego's 2-tier tokens.
 *
 * A COMPOSITION on @tanstack/react-table (category B): the library owns the
 * headless table model (sorting, pagination, row state); our Table primitives
 * render it; our Pagination primitive drives page navigation (its Previous/Next
 * links wired to tanstack's previousPage()/nextPage() — disabled at the ends via
 * aria-disabled + pointer-events). This file wires only the model setup and the
 * rows→cells render. Header cells are clickable to toggle sorting.
 *
 * Generic over the row shape — pass `columns` (ColumnDef[]) + `data`, just like
 * the ShadCN recipe. Styling is standard semantics throughout.
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  pagination = true,
  pageSize = 10,
  emptyText = "No results.",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    initialState: pagination ? { pagination: { pageSize } } : undefined,
  });

  const canPrev = pagination && table.getCanPreviousPage();
  const canNext = pagination && table.getCanNextPage();

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      aria-sort={
                        sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : undefined
                      }
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-sm font-medium",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          )}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <span aria-hidden className="text-muted-foreground">
                            {sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : ""}
                          </span>
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Pagination className="mx-0 w-auto justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  role="button"
                  aria-disabled={!canPrev}
                  className={cn(
                    !canPrev && "pointer-events-none opacity-50",
                  )}
                  onClick={() => table.previousPage()}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  role="button"
                  aria-disabled={!canNext}
                  className={cn(
                    !canNext && "pointer-events-none opacity-50",
                  )}
                  onClick={() => table.nextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
DataTable.displayName = "DataTable";
