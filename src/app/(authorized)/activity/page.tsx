"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  Code2,
  Copy,
  Download,
  Eye,
  FileCode,
  History,
  RefreshCw,
  RotateCcw,
} from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import {
  FilterBar,
  FilterDateRange,
  FilterSelect,
  FilterSearch,
} from "@/components/common/filter-bar";
import { StatusBadge } from "@/components/common/status-badge";
import { RiskBadge } from "@/components/common/risk-badge";
import { EmptyState } from "@/components/common/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DataTable, type DataTablePaginationMeta } from "@/components/ui/data-table";
import { toast } from "sonner";

type AuditRecord = {
  id: string;
  timestamp: string;
  actor: string;
  clientIp: string;
  module: string;
  action: string;
  risk: "NORMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "APPROVED" | "PENDING" | "PROCESSING" | "REJECTED" | "SUCCESS" | "FAILED";
  details: Record<string, unknown>;
  sqlQuery?: string;
};

const initialEvents: AuditRecord[] = [
  {
    id: "EVT-98421",
    timestamp: "2026-08-19 10:04:12",
    actor: "maria.santos@llibi.com",
    clientIp: "192.168.10.45",
    module: "Reimbursements",
    action: "UPDATE_CLAIM_STATUS",
    risk: "LOW",
    status: "APPROVED",
    details: {
      claimId: "REQ-2026-1042",
      previousStatus: "PENDING",
      newStatus: "APPROVED",
      approvedAmount: 3250.0,
      notes: "Receipts and prescription verified.",
    },
    sqlQuery: "UPDATE reimbursement_claims SET status = 'APPROVED', approved_at = NOW() WHERE id = 1042;",
  },
  {
    id: "EVT-98420",
    timestamp: "2026-08-19 09:51:30",
    actor: "system_cron",
    clientIp: "10.0.4.12",
    module: "Sync Connector",
    action: "BATCH_IMPORT_MEMBERS",
    risk: "NORMAL",
    status: "SUCCESS",
    details: {
      batchId: "BCH-8411",
      recordsProcessed: 480,
      durationMs: 1420,
    },
    sqlQuery: "INSERT INTO member_directory (employee_id, company_code, status) VALUES (...) ON CONFLICT DO UPDATE;",
  },
  {
    id: "EVT-98419",
    timestamp: "2026-08-19 09:22:15",
    actor: "admin.user@llibi.com",
    clientIp: "203.177.88.19",
    module: "User Access",
    action: "GRANT_ADMIN_ROLE",
    risk: "CRITICAL",
    status: "SUCCESS",
    details: {
      targetUser: "carlo.mendoza@llibi.com",
      assignedRole: "Administrator",
      authorizedBy: "admin.user@llibi.com",
    },
    sqlQuery: "UPDATE users SET role = 'Administrator', is_cae_admin = true WHERE email = 'carlo.mendoza@llibi.com';",
  },
  {
    id: "EVT-98418",
    timestamp: "2026-08-19 08:45:00",
    actor: "juan.delacruz@llibi.com",
    clientIp: "192.168.10.88",
    module: "Claims Ingestion",
    action: "SUBMIT_CLAIM",
    risk: "MEDIUM",
    status: "PENDING",
    details: {
      claimId: "REQ-2026-1041",
      amount: 18900.0,
      claimType: "Inpatient",
      hospital: "St. Luke's Medical Center",
    },
    sqlQuery: "INSERT INTO reimbursement_claims (member_id, amount, type, status) VALUES (402, 18900.0, 'Inpatient', 'PENDING');",
  },
  {
    id: "EVT-98417",
    timestamp: "2026-08-19 08:12:44",
    actor: "unknown_client",
    clientIp: "45.33.32.156",
    module: "Authentication",
    action: "FAILED_LOGIN_ATTEMPT",
    risk: "HIGH",
    status: "FAILED",
    details: {
      attemptedEmail: "root@llibi.com",
      reason: "Account not found",
      geo: "Dallas, US",
    },
  },
  {
    id: "EVT-98416",
    timestamp: "2026-08-18 21:30:19",
    actor: "elena.bautista@llibi.com",
    clientIp: "192.168.12.10",
    module: "Reimbursements",
    action: "REJECT_CLAIM",
    risk: "HIGH",
    status: "REJECTED",
    details: {
      claimId: "REQ-2026-1038",
      reason: "Incomplete hospital discharge summary.",
    },
    sqlQuery: "UPDATE reimbursement_claims SET status = 'REJECTED', rejection_code = 'INCOMPLETE_DOCS' WHERE id = 1038;",
  },
];

export default function ActivityExplorerPage() {
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [actor, setActor] = React.useState("");
  const [module, setModule] = React.useState("");
  const [risk, setRisk] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");
  const [dateRange, setDateRange] = React.useState({
    from: "2026-08-01",
    to: "2026-08-19",
  });
  const [selectedRecord, setSelectedRecord] = React.useState<AuditRecord | null>(null);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Activity Log Updated", {
        description: "Fetched recent audit records.",
      });
    }, 500);
  };

  const handleExport = () => {
    toast.success("Audit Log Exported", {
      description: "Downloaded complete activity logs in CSV format.",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setActor("");
    setModule("");
    setRisk("");
    setStatus("");
    setDateRange({ from: "2026-08-01", to: "2026-08-19" });
    setPage(1);
  };

  const filteredRows = initialEvents.filter((row) => {
    if (actor && !row.actor.toLowerCase().includes(actor.toLowerCase())) return false;
    if (module && row.module.toLowerCase() !== module.toLowerCase()) return false;
    if (risk && row.risk.toLowerCase() !== risk.toLowerCase()) return false;
    if (status && row.status.toLowerCase() !== status.toLowerCase()) return false;
    const q = search.trim().toLowerCase();
    if (
      q &&
      ![row.id, row.actor, row.clientIp, row.module, row.action, row.risk, row.status].some(
        (v) => v.toLowerCase().includes(q),
      )
    ) {
      return false;
    }
    return true;
  });

  const sortedRows = [...filteredRows].sort((a, b) => {
    return sortDirection === "desc"
      ? b.timestamp.localeCompare(a.timestamp)
      : a.timestamp.localeCompare(b.timestamp);
  });

  const meta: DataTablePaginationMeta = {
    current_page: page,
    last_page: 1,
    per_page: perPage,
    total: sortedRows.length,
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Activity Explorer"
        description="Search, filter, and inspect detailed audit trails and transaction events."
      >
        <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 h-9 rounded-xl">
          <Download className="size-4" />
          Export CSV
        </Button>
      </PageHeader>

      {/* Frameless Filter Toolbar */}
      <FilterBar className="justify-between items-center bg-muted/30 dark:bg-muted/15 p-3 rounded-2xl">
        <div className="flex flex-wrap items-end gap-3">
          <FilterSearch
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search actor, action, SQL, IP..."
          />
          <FilterSelect
            label="Module"
            value={module}
            onChange={(val) => {
              setModule(val);
              setPage(1);
            }}
            options={[
              { label: "Reimbursements", value: "reimbursements" },
              { label: "User Access", value: "user access" },
              { label: "Authentication", value: "authentication" },
              { label: "Sync Connector", value: "sync connector" },
            ]}
          />
          <FilterSelect
            label="Risk Level"
            value={risk}
            onChange={(val) => {
              setRisk(val);
              setPage(1);
            }}
            options={[
              { label: "Critical", value: "critical" },
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
              { label: "Normal", value: "normal" },
            ]}
          />
          <FilterSelect
            label="Result"
            value={status}
            onChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            options={[
              { label: "Approved / Success", value: "approved" },
              { label: "Pending", value: "pending" },
              { label: "Failed / Rejected", value: "failed" },
            ]}
          />
          <FilterDateRange
            from={dateRange.from}
            to={dateRange.to}
            onChange={setDateRange}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortDirection((dir) => (dir === "desc" ? "asc" : "desc"))}
            title="Toggle sort direction"
            className="h-9 w-9 rounded-xl"
          >
            {sortDirection === "desc" ? <ArrowDown className="size-4" /> : <ArrowUp className="size-4" />}
          </Button>

          {(search || module || risk || status) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="gap-1.5 text-xs text-muted-foreground h-9 rounded-xl"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="gap-1.5 h-9 rounded-xl"
          >
            <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} />
            Refresh
          </Button>
        </div>
      </FilterBar>

      {/* Frameless Table Container */}
      <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Audit Trails
            </h3>
            <p className="text-xs text-muted-foreground">
              Showing {sortedRows.length} events matching current query
            </p>
          </div>
          <Badge variant="secondary" className="text-xs font-normal">
            Click row for payload details
          </Badge>
        </div>

        {sortedRows.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No events found"
              description="Try adjusting your filter criteria or broadening the search window."
              action={
                <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-xl">
                  Reset Filters
                </Button>
              }
            />
          </div>
        ) : (
          <DataTable
            meta={meta}
            page={page}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={setPerPage}
            emptyMessage="No events match."
            header={
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/40">
                  <TableHead className="w-32">Timestamp</TableHead>
                  <TableHead>Actor</TableHead>
                  <TableHead>Client IP</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-center">Risk</TableHead>
                  <TableHead className="text-center">Result</TableHead>
                  <TableHead className="text-right">Inspect</TableHead>
                </TableRow>
              </TableHeader>
            }
          >
            {sortedRows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => setSelectedRecord(row)}
                className="cursor-pointer transition-colors hover:bg-muted/40"
              >
                <TableCell className="text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {row.timestamp}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {row.actor}
                </TableCell>
                <TableCell className="text-xs font-mono text-muted-foreground">
                  {row.clientIp}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {row.module}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs font-semibold text-foreground">
                  {row.action}
                </TableCell>
                <TableCell className="text-center">
                  <RiskBadge level={row.risk} />
                </TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={row.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-lg">
                    <Eye className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </DataTable>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={Boolean(selectedRecord)} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border-none bg-card shadow-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <History className="size-5 text-primary" />
              Event Details — {selectedRecord?.id}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Recorded at {selectedRecord?.timestamp}
            </DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="space-y-4 pt-2 text-sm">
              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/40 p-4 text-xs">
                <div>
                  <span className="text-muted-foreground block">Actor</span>
                  <span className="font-semibold text-foreground">{selectedRecord.actor}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Client IP</span>
                  <span className="font-mono font-semibold text-foreground">{selectedRecord.clientIp}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Module</span>
                  <span className="font-medium text-foreground">{selectedRecord.module}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block">Action</span>
                  <span className="font-mono font-medium text-foreground">{selectedRecord.action}</span>
                </div>
              </div>

              {selectedRecord.sqlQuery && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FileCode className="size-3.5" />
                      Executed SQL Statement
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(selectedRecord.sqlQuery || "");
                        toast.success("SQL copied to clipboard");
                      }}
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      <Copy className="size-3" />
                      Copy
                    </button>
                  </div>
                  <pre className="rounded-2xl bg-zinc-950 p-4 font-mono text-xs text-zinc-100 overflow-x-auto whitespace-pre-wrap">
                    {selectedRecord.sqlQuery}
                  </pre>
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <Code2 className="size-3.5" />
                  Payload & Context Metadata
                </span>
                <pre className="rounded-2xl bg-zinc-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
                  {JSON.stringify(selectedRecord.details, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
