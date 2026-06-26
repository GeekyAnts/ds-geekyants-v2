import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";

/**
 * Table is semantic table markup (<table>/<thead>/<tbody>/<tr>/<th>/<td>) with
 * no focus/keyboard/state surface — styled markup (rung 3). No variant axis;
 * each sub-part is a thin styled wrapper, per-instance tweaks via consumer
 * className. The root wraps the <table> in an overflow container.
 */
export type TableProps = TableHTMLAttributes<HTMLTableElement>;
export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
export type TableCaptionProps = HTMLAttributes<HTMLTableCaptionElement>;
