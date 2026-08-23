"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type DataTablePaginationMeta = {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
};

export type DataTablePaginationProps = {
  meta: DataTablePaginationMeta | null | undefined;
  page: number;
  perPage: number;
  perPageOptions?: number[];
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  isLoading?: boolean;
  className?: string;
  /**
   * Where the page navigation controls sit. The summary + page input always
   * renders on the opposite side so the bar reads naturally in either layout.
   * "right" (default): controls on the right, summary on the left.
   * "left": controls on the left, summary on the right.
   */
  controlsAlign?: "left" | "right";
  disabled?: boolean;
};

export function DataTablePagination({
  meta,
  page,
  perPage,
  perPageOptions = [10, 20, 50, 100],
  onPageChange,
  onPerPageChange,
  isLoading = false,
  className,
  controlsAlign = "right",
  disabled = false,
}: DataTablePaginationProps) {
  const lastPage = Number(meta?.last_page) || 1;
  const currentPage = Number(meta?.current_page) || page;
  const total = Number(meta?.total) || 0;
  const from = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, total);

  const [pageInput, setPageInput] = React.useState({
    page: currentPage,
    value: String(currentPage),
  });
  const pageInputValue = pageInput.page === currentPage ? pageInput.value : String(currentPage);

  const commitPage = (raw: string) => {
    const next = Number.parseInt(raw, 10);
    if (!Number.isFinite(next) || next < 1) {
      setPageInput({ page: currentPage, value: String(currentPage) });
      return;
    }
    const clamped = Math.min(Math.max(next, 1), lastPage);
    if (clamped !== currentPage) onPageChange(clamped);
    else setPageInput({ page: currentPage, value: String(currentPage) });
  };

  const goto = (target: number) => {
    const clamped = Math.min(Math.max(target, 1), lastPage);
    if (clamped !== currentPage) onPageChange(clamped);
  };

  const navButtons = (
    <div className="flex items-center gap-1.5">
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="First page"
        disabled={disabled || isLoading || currentPage <= 1}
        onClick={() => goto(1)}
      >
        <ChevronsLeft />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Previous page"
        disabled={disabled || isLoading || currentPage <= 1}
        onClick={() => goto(currentPage - 1)}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Next page"
        disabled={disabled || isLoading || currentPage >= lastPage}
        onClick={() => goto(currentPage + 1)}
      >
        <ChevronRight />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        aria-label="Last page"
        disabled={disabled || isLoading || currentPage >= lastPage}
        onClick={() => goto(lastPage)}
      >
        <ChevronsRight />
      </Button>
    </div>
  );

  const pageSize = (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline">Rows</span>
      <Select
        value={String(perPage)}
        onValueChange={(value) => onPerPageChange(Number.parseInt(value, 10))}
        disabled={disabled || isLoading}
      >
        <SelectTrigger size="sm" className="h-8 w-[72px]" aria-label="Rows per page">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {perPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  const pageJump = (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span className="hidden sm:inline">Page</span>
      <Input
        type="number"
        min={1}
        max={lastPage}
        value={pageInputValue}
        disabled={disabled || isLoading || lastPage <= 1}
        onChange={(event) => setPageInput({ page: currentPage, value: event.target.value })}
        onBlur={(event) => commitPage(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        aria-label="Go to page"
        className="h-8 w-14 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span className="whitespace-nowrap">of {lastPage}</span>
    </div>
  );

  const summary = (
    <p className="text-sm text-muted-foreground" aria-live="polite">
      {isLoading ? "Loading…" : total === 0 ? "No results" : (
        <>
          Showing <span className="font-medium text-foreground">{from}</span>–
          <span className="font-medium text-foreground">{to}</span> of{" "}
          <span className="font-medium text-foreground">{total}</span>
        </>
      )}
    </p>
  );

  const controls = (
    <div className="flex items-center gap-3 sm:gap-4">
      {pageSize}
      {pageJump}
      {navButtons}
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-3 px-1 py-3 sm:flex-row sm:items-center sm:justify-between",
        controlsAlign === "left" && "sm:flex-row-reverse",
        className,
      )}
      data-slot="data-table-pagination"
    >
      {summary}
      {controls}
    </div>
  );
}
