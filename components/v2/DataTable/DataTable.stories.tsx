import type { Meta, StoryObj } from "@storybook/react-vite";
// v2 prototype uses its own 2-tier stylesheet, imported here so the slice is
// self-contained and independent of the stale 3-tier geeklego.css.
import "../../../design-system/v2/index.css";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Badge } from "../Badge/Badge";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "success" | "failed";
  email: string;
}

const data: Payment[] = [
  { id: "1", amount: 316, status: "success", email: "ada@example.com" },
  { id: "2", amount: 242, status: "pending", email: "grace@example.com" },
  { id: "3", amount: 837, status: "failed", email: "alan@example.com" },
  { id: "4", amount: 721, status: "success", email: "linus@example.com" },
  { id: "5", amount: 199, status: "pending", email: "margaret@example.com" },
  { id: "6", amount: 458, status: "success", email: "katherine@example.com" },
  { id: "7", amount: 612, status: "failed", email: "dennis@example.com" },
  { id: "8", amount: 305, status: "success", email: "barbara@example.com" },
];

const statusVariant = {
  success: "default",
  pending: "secondary",
  failed: "destructive",
} as const;

const columns: ColumnDef<Payment>[] = [
  { accessorKey: "email", header: "Email" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return <Badge variant={statusVariant[status]}>{status}</Badge>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        ${row.original.amount.toFixed(2)}
      </span>
    ),
  },
];

const meta: Meta<typeof DataTable<Payment, unknown>> = {
  title: "v2/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof DataTable<Payment, unknown>>;

/* ── Default — sortable headers + pagination ──────────────────────────────── */
export const Default: Story = {
  render: () => <DataTable columns={columns} data={data} pageSize={5} />,
};

/* ── Empty ────────────────────────────────────────────────────────────────── */
export const Empty: Story = {
  render: () => <DataTable columns={columns} data={[]} />,
};

/* ── No pagination ────────────────────────────────────────────────────────── */
export const NoPagination: Story = {
  render: () => (
    <DataTable columns={columns} data={data.slice(0, 4)} pagination={false} />
  ),
};

/* ── Dark theme — semantic override set (the .dark / data-theme test) ────────── */
export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="dark max-w-3xl rounded-lg bg-background p-8 text-foreground">
      <DataTable columns={columns} data={data} pageSize={5} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'DataTable under a dark theme. The wrapper sets both data-theme="dark" and .dark; the table chrome, status Badges, and the composed Pagination controls all re-theme from Tier-2 semantics. Not portalled, so no document-root toggle is needed.',
      },
    },
  },
};
