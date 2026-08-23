"use client";

import * as React from "react";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  DataTablePagination,
  type DataTablePaginationMeta,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export type { DataTablePaginationMeta } from "@/components/ui/pagination";

export type DataTableProps = {
  /**
   * Pagination metadata from the server. When null/undefined the pagination
   * bar still renders but assumes a single page.
   */
  meta: DataTablePaginationMeta | null | undefined;
  page: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: number[];
  isLoading?: boolean;
  error?: React.ReactNode;
  /**
   * Number of columns in the table — used for the loading + empty + error
   * row colSpan. Defaults to the number of <th> rendered in header.
   */
  colSpan?: number;
  /**
   * Empty state message shown when there is no data and no error.
   */
  emptyMessage?: React.ReactNode;
  /**
   * Loading state message.
   */
  loadingMessage?: React.ReactNode;
  /**
   * Where the pagination controls sit (passed through to the pagination bar).
   */
  controlsAlign?: "left" | "right";
  className?: string;
  /**
   * Header row(s). Render your own <TableHeader> here so you fully control
   * column headers, sorting indicators, alignment, etc.
   */
  header: React.ReactNode;
  /**
   * Body rows. Render your own <TableBody> rows. When omitted, DataTable
   * auto-derives <TableBody> so you can pass <TableRow> children directly.
   */
  children?: React.ReactNode;
};

export function DataTable({
  meta,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions,
  isLoading = false,
  error,
  colSpan,
  emptyMessage = "No results match these filters.",
  loadingMessage = "Loading…",
  controlsAlign = "right",
  className,
  header,
  children,
}: DataTableProps) {
  const total = meta?.total ?? 0;
  const hasData = !isLoading && !error && total > 0;
  const showEmpty = !isLoading && !error && total === 0;

  const resolvedColSpan = React.useMemo(() => {
    if (typeof colSpan === "number" && colSpan > 0) return colSpan;
    let count = 0;
    React.Children.forEach(header, (node) => {
      if (!React.isValidElement(node)) return;
      React.Children.forEach((node.props as { children?: React.ReactNode }).children ?? [], (cell) => {
        if (React.isValidElement(cell) && (cell.type === "th" || (cell as React.ReactElement<{ "data-slot"?: string }>).props?.["data-slot"] === "table-head")) count++;
      });
    });
    return Math.max(count, 1);
  }, [colSpan, header]);

  return (
    <div className={cn("grid gap-2", className)} data-slot="data-table">
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          {header}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={resolvedColSpan} className="h-24 text-center text-muted-foreground">
                  {loadingMessage}
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={resolvedColSpan} className="h-24 text-center text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : showEmpty ? (
              <TableRow>
                <TableCell colSpan={resolvedColSpan} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : hasData ? (
              children
            ) : null}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        meta={meta}
        page={page}
        perPage={perPage}
        perPageOptions={perPageOptions}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        isLoading={isLoading}
        controlsAlign={controlsAlign}
      />
    </div>
  );
}