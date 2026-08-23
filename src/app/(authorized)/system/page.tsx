"use client";

import * as React from "react";
import {
  Activity,
  Database,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { ChartTooltip } from "@/components/common/chart-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useTheme } from "@/components/theme-provider";

const lagSeries = [
  { time: "10:00", lagMs: 14, throughput: 120 },
  { time: "10:05", lagMs: 18, throughput: 145 },
  { time: "10:10", lagMs: 24, throughput: 210 },
  { time: "10:15", lagMs: 19, throughput: 180 },
  { time: "10:20", lagMs: 15, throughput: 135 },
  { time: "10:25", lagMs: 12, throughput: 110 },
  { time: "10:30", lagMs: 16, throughput: 160 },
  { time: "10:35", lagMs: 14, throughput: 140 },
];

const nodes = [
  {
    name: "worker-node-primary-01",
    role: "Ingestion Worker",
    status: "SUCCESS",
    cpu: "24%",
    mem: "1.4 GB / 4.0 GB",
    processed: "428,910",
    uptime: "14d 8h",
  },
  {
    name: "worker-node-primary-02",
    role: "Ingestion Worker",
    status: "SUCCESS",
    cpu: "19%",
    mem: "1.1 GB / 4.0 GB",
    processed: "392,104",
    uptime: "14d 8h",
  },
  {
    name: "db-replica-reader-01",
    role: "PostgreSQL Read Replica",
    status: "SUCCESS",
    cpu: "38%",
    mem: "6.2 GB / 16.0 GB",
    processed: "1,842,000",
    uptime: "45d 12h",
  },
  {
    name: "cron-scheduler-service",
    role: "Scheduler Daemon",
    status: "SUCCESS",
    cpu: "4%",
    mem: "320 MB / 2.0 GB",
    processed: "12,400",
    uptime: "7d 2h",
  },
];

export default function SystemHealthPage() {
  const { themeColors } = useTheme();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast.success("Telemetry Synced", {
        description: "Node stats and lag measurements updated.",
      });
    }, 500);
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="System Telemetry"
        description="Monitor pipeline ingestion health, database query lag, worker pools, and memory pressure."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="gap-1.5 h-9 rounded-xl"
        >
          <RefreshCw className={refreshing ? "size-4 animate-spin" : "size-4"} />
          Refresh Metrics
        </Button>
      </PageHeader>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-4">
        <StatCard
          title="Pipeline Throughput"
          value="1,240 msg/s"
          icon={Activity}
          hint="Within optimal thresholds"
        />
        <StatCard
          title="Average Ingestion Lag"
          value="14.2 ms"
          icon={Zap}
          hint="Target: < 50 ms"
        />
        <StatCard
          title="Active DB Connections"
          value="28 / 100"
          icon={Database}
          hint="Pool utilization: 28%"
        />
        <StatCard
          title="Cluster Nodes Online"
          value="4 / 4"
          icon={Server}
          hint="Zero degraded services"
        />
      </div>

      {/* Latency & Throughput Chart (Frameless) */}
      <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Ingestion Lag & Real-Time Queue Pressure
            </h3>
            <p className="text-xs text-muted-foreground">
              Latency (ms) vs Message Throughput over past 45 minutes
            </p>
          </div>
          <Badge variant="secondary" className="text-xs text-emerald-600 bg-emerald-500/10 border-0 font-normal">
            Normal Operating State
          </Badge>
        </div>

        <div className="h-64 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lagSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.35} />
                  <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<ChartTooltip suffix=" ms" />} />
              <Area
                type="monotone"
                dataKey="lagMs"
                name="Lag Latency (ms)"
                stroke={themeColors.primary}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLag)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cluster Node Status (Frameless) */}
      <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Cluster Nodes & Worker Pool Status
          </h3>
          <p className="text-xs text-muted-foreground">
            Health and capacity metrics across distributed services
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent bg-muted/40">
              <TableHead>Node Name</TableHead>
              <TableHead>Service Role</TableHead>
              <TableHead>CPU Load</TableHead>
              <TableHead>Memory Usage</TableHead>
              <TableHead className="text-right">Processed Records</TableHead>
              <TableHead>Uptime</TableHead>
              <TableHead className="text-right">Health</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nodes.map((node) => (
              <TableRow key={node.name} className="hover:bg-muted/40">
                <TableCell className="font-mono text-xs font-semibold text-foreground">
                  {node.name}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {node.role}
                </TableCell>
                <TableCell className="text-xs font-mono font-medium">
                  {node.cpu}
                </TableCell>
                <TableCell className="text-xs font-mono font-medium">
                  {node.mem}
                </TableCell>
                <TableCell className="text-xs text-right font-medium">
                  {node.processed}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {node.uptime}
                </TableCell>
                <TableCell className="text-right">
                  <StatusBadge status={node.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
