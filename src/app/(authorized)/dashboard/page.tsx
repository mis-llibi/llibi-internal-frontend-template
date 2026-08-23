"use client";

import * as React from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  FileCheck2,
  FileSpreadsheet,
  Layers,
  LineChart as LineChartIcon,
  PlusCircle,
  RefreshCw,
  RotateCcw,
  ShieldAlert,
  Users,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import {
  FilterBar,
  FilterDateRange,
  FilterSelect,
  FilterSearch,
} from "@/components/common/filter-bar";
import { StatusBadge } from "@/components/common/status-badge";
import { RiskBadge, RISK_COLORS, type RiskLevel } from "@/components/common/risk-badge";
import { EmptyState } from "@/components/common/empty-state";
import { ChartTooltip } from "@/components/common/chart-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { DataTable, type DataTablePaginationMeta } from "@/components/ui/data-table";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

// Demo data for activity trend
const activitySeries = [
  { period: "00:00", count: 42, approved: 35 },
  { period: "03:00", count: 28, approved: 22 },
  { period: "06:00", count: 65, approved: 58 },
  { period: "09:00", count: 180, approved: 160 },
  { period: "12:00", count: 245, approved: 210 },
  { period: "15:00", count: 310, approved: 280 },
  { period: "18:00", count: 195, approved: 175 },
  { period: "21:00", count: 90, approved: 80 },
];

const categoryBarSeries = [
  { category: "Outpatient", claims: 892, approved: 820 },
  { category: "Inpatient", claims: 240, approved: 215 },
  { category: "Laboratory", claims: 180, approved: 170 },
  { category: "Specialist", claims: 95, approved: 80 },
  { category: "Emergency", claims: 45, approved: 42 },
];

// Demo data for status distribution
const riskDistribution = [
  { risk_level: "NORMAL", count: 450, fill: "#a3a3a3" },
  { risk_level: "LOW", count: 280, fill: "#3b82f6" },
  { risk_level: "MEDIUM", count: 120, fill: "#f59e0b" },
  { risk_level: "HIGH", count: 45, fill: "#f97316" },
  { risk_level: "CRITICAL", count: 18, fill: "#ef4444" },
];

const sampleRequests = [
  {
    id: "REQ-2026-1042",
    member: "Maria Santos",
    company: "Acme Corp",
    type: "Outpatient",
    amount: "₱3,250.00",
    status: "Approved",
    risk: "LOW",
    submitted: "2026-08-18 14:30",
  },
  {
    id: "REQ-2026-1041",
    member: "Juan Dela Cruz",
    company: "Global Logistics",
    type: "Inpatient",
    amount: "₱18,900.00",
    status: "Pending",
    risk: "MEDIUM",
    submitted: "2026-08-18 11:15",
  },
  {
    id: "REQ-2026-1040",
    member: "Ana Reyes",
    company: "Apex Tech Inc.",
    type: "Outpatient",
    amount: "₱1,150.00",
    status: "Processing",
    risk: "NORMAL",
    submitted: "2026-08-17 16:45",
  },
  {
    id: "REQ-2026-1039",
    member: "Pedro Garcia",
    company: "First Pacific Ltd",
    type: "Laboratory",
    amount: "₱5,600.00",
    status: "Approved",
    risk: "LOW",
    submitted: "2026-08-17 09:20",
  },
  {
    id: "REQ-2026-1038",
    member: "Elena Bautista",
    company: "Metro Retailers",
    type: "Specialist",
    amount: "₱4,800.00",
    status: "Rejected",
    risk: "HIGH",
    submitted: "2026-08-16 15:10",
  },
  {
    id: "REQ-2026-1037",
    member: "Carlo Mendoza",
    company: "Zenith Holdings",
    type: "Inpatient",
    amount: "₱42,500.00",
    status: "Pending",
    risk: "CRITICAL",
    submitted: "2026-08-16 10:05",
  },
];

export default function DashboardPage() {
  const { themeColors } = useTheme();
  const [chartMode, setChartMode] = React.useState<"area" | "bar">("area");
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [type, setType] = React.useState("");
  const [dateRange, setDateRange] = React.useState({
    from: "2026-08-01",
    to: "2026-08-19",
  });

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Dashboard refreshed", {
        description: "Latest metrics and audit events loaded.",
      });
    }, 600);
  };

  const handleExport = () => {
    toast.success("Report Export Started", {
      description: "Downloading summary spreadsheet in XLSX format...",
    });
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setType("");
    setDateRange({ from: "2026-08-01", to: "2026-08-19" });
    setPage(1);
  };

  const filteredRows = sampleRequests.filter((row) => {
    if (status && row.status.toLowerCase() !== status.toLowerCase()) return false;
    if (type && row.type.toLowerCase() !== type.toLowerCase()) return false;
    const q = search.trim().toLowerCase();
    if (
      q &&
      ![row.id, row.member, row.company, row.type, row.status, row.risk].some((v) =>
        v.toLowerCase().includes(q),
      )
    ) {
      return false;
    }
    return true;
  });

  const meta: DataTablePaginationMeta = {
    current_page: page,
    last_page: 1,
    per_page: perPage,
    total: filteredRows.length,
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Dashboard"
        description="Overview of healthcare reimbursement claims, transaction volumes, and system health."
      >
        <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 h-9 rounded-xl">
          <Download className="size-4" />
          Export
        </Button>
        <Button size="sm" className="gap-1.5 h-9 rounded-xl">
          <PlusCircle className="size-4" />
          New Request
        </Button>
      </PageHeader>

      {/* Modern Frameless Filter Toolbar */}
      <FilterBar className="justify-between items-center bg-muted/30 dark:bg-muted/15 p-3 rounded-2xl">
        <div className="flex flex-wrap items-end gap-3">
          <FilterSearch
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search by ID, member, company..."
          />
          <FilterSelect
            label="Status"
            value={status}
            onChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            options={[
              { label: "Approved", value: "approved" },
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
          <FilterSelect
            label="Type"
            value={type}
            onChange={(val) => {
              setType(val);
              setPage(1);
            }}
            options={[
              { label: "Outpatient", value: "outpatient" },
              { label: "Inpatient", value: "inpatient" },
              { label: "Laboratory", value: "laboratory" },
              { label: "Specialist", value: "specialist" },
            ]}
          />
          <FilterDateRange
            from={dateRange.from}
            to={dateRange.to}
            onChange={setDateRange}
          />
        </div>

        <div className="flex items-center gap-2">
          {(search || status || type) && (
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

      {/* 8-Grid High-Density Frameless KPI StatCards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        <StatCard
          title="Total Claims"
          value="1,420"
          icon={FileSpreadsheet}
          hint="+12% from last week"
          loading={loading}
        />
        <StatCard
          title="Approved YTD"
          value="₱4.85M"
          icon={CheckCircle2}
          hint="92.4% approval rate"
          loading={loading}
        />
        <StatCard
          title="Pending Actions"
          value="18"
          icon={Clock}
          hint="Avg response: 1.2 hrs"
          loading={loading}
        />
        <StatCard
          title="Outpatient"
          value="892"
          icon={Layers}
          hint="62.8% of total volume"
          loading={loading}
        />
        <StatCard
          title="Inpatient"
          value="240"
          icon={FileCheck2}
          hint="16.9% of total volume"
          loading={loading}
        />
        <StatCard
          title="Critical Flags"
          value="4"
          icon={ShieldAlert}
          hint="Audited manually"
          loading={loading}
        />
        <StatCard
          title="Active Members"
          value="3,480"
          icon={Users}
          hint="Across 42 companies"
          loading={loading}
        />
        <StatCard
          title="Sync Health"
          value="99.98%"
          icon={Zap}
          hint="Latency: 42ms"
          loading={loading}
        />
      </div>

      {/* Visual Analytics & Health Row (Frameless) */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Dynamic Chart (Area & Bar Mode) */}
        <div className="lg:col-span-6 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {chartMode === "area"
                  ? "Transaction & Request Activity"
                  : "Volume Breakdown by Category"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {chartMode === "area"
                  ? "Real-time incoming claims stream over 24 hours"
                  : "Processed claims vs approvals by classification"}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-xl">
              <Button
                variant={chartMode === "area" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartMode("area")}
                className="h-7 text-xs px-2.5 rounded-lg"
              >
                <LineChartIcon className="size-3.5 mr-1" />
                Trends
              </Button>
              <Button
                variant={chartMode === "bar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setChartMode("bar")}
                className="h-7 text-xs px-2.5 rounded-lg"
              >
                <BarChart3 className="size-3.5 mr-1" />
                Bar Chart
              </Button>
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === "area" ? (
                <AreaChart
                  data={activitySeries}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={themeColors.primary}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="95%"
                        stopColor={themeColors.primary}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-muted/40"
                  />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Total Submissions"
                    stroke={themeColors.primary}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              ) : (
                <BarChart
                  data={categoryBarSeries}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-muted/40"
                  />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar
                    dataKey="claims"
                    name="Total Claims"
                    fill={themeColors.primary}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="approved"
                    name="Approved"
                    fill={themeColors.secondary}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk / Category Distribution Donut Chart */}
        <div className="lg:col-span-3 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Risk Distribution
            </h3>
            <p className="text-xs text-muted-foreground">Audit & severity breakdown</p>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  dataKey="count"
                  nameKey="risk_level"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                >
                  {riskDistribution.map((entry) => (
                    <Cell
                      key={entry.risk_level}
                      fill={RISK_COLORS[entry.risk_level as RiskLevel] || entry.fill}
                    />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  formatter={(val) => <span className="text-xs text-muted-foreground">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System & Connector Health Card */}
        <div className="lg:col-span-3 rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 flex flex-col justify-between space-y-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Service Health
                </h3>
                <p className="text-xs text-muted-foreground">API & DB Connector</p>
              </div>
              <StatusBadge status="SUCCESS" />
            </div>

            <div className="space-y-2.5 text-xs pt-1">
              <div className="flex items-center justify-between py-1 border-b border-border/20">
                <span className="text-muted-foreground">Database Engine</span>
                <span className="font-semibold text-foreground">PostgreSQL 16</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/20">
                <span className="text-muted-foreground">Last Sync</span>
                <span className="font-medium text-foreground">1 min ago</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/20">
                <span className="text-muted-foreground">Ingestion Pipeline</span>
                <Badge variant="secondary" className="text-[11px] text-emerald-600 bg-emerald-500/10 border-0">
                  Healthy (0 lag)
                </Badge>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-muted-foreground">Uptime 30d</span>
                <span className="font-semibold text-foreground">99.98%</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="sm" className="w-full text-xs h-8.5 rounded-xl">
              View System Telemetry
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Activity Table (Frameless) */}
      <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Recent Reimbursement Activity
            </h3>
            <p className="text-xs text-muted-foreground">
              Audit log of member submissions and evaluation updates
            </p>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            Showing {filteredRows.length} transactions
          </span>
        </div>

        {filteredRows.length === 0 ? (
          <div className="p-8">
            <EmptyState
              title="No matching requests found"
              description="Try clearing search filters or modifying the selected date range."
              action={
                <Button variant="outline" size="sm" onClick={clearFilters} className="rounded-xl">
                  Clear Filters
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
            emptyMessage="No requests match these filters."
            header={
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-muted/40">
                  <TableHead className="w-36">Reference</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Severity</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
            }
          >
            {filteredRows.map((row) => (
              <TableRow key={row.id} className="transition-colors hover:bg-muted/40">
                <TableCell className="font-mono text-xs font-semibold text-foreground">
                  {row.id}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {row.member}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {row.company}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal text-xs">
                    {row.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {row.submitted}
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {row.amount}
                </TableCell>
                <TableCell className="text-center">
                  <RiskBadge level={row.risk} />
                </TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={row.status} />
                </TableCell>
              </TableRow>
            ))}
          </DataTable>
        )}
      </div>
    </div>
  );
}
