"use client";

import * as React from "react";
import {
  AtSign,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Lock,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  User,
  Zap,
} from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { RiskBadge } from "@/components/common/risk-badge";
import { EmptyState } from "@/components/common/empty-state";
import { ChartTooltip } from "@/components/common/chart-tooltip";
import { TogglePill } from "@/components/common/toggle-pill";
import { InputDate } from "@/components/common/input-date";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";

export default function ComponentsShowcasePage() {
  const { themeColors } = useTheme();
  const [textVal, setTextVal] = React.useState("");
  const [emailVal, setEmailVal] = React.useState("");
  const [passwordVal, setPasswordVal] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [dateVal, setDateVal] = React.useState("2026-08-19");
  const [selectVal, setSelectVal] = React.useState("blue");
  const [textareaVal, setTextareaVal] = React.useState("");
  const [checkboxVal, setCheckboxVal] = React.useState(true);
  const [activePill, setActivePill] = React.useState("all");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="UI Components & Inputs Kit"
        description="Comprehensive showcase of corporate design tokens, inputs, actions, metric cards, and feedback modals."
      >
        <Button
          onClick={() => {
            toast.success("Interactive Preview Active", {
              description: "All design tokens and theme settings apply live.",
            });
          }}
          className="gap-1.5 h-9 rounded-xl"
        >
          <Sparkles className="size-4" />
          Test Toast
        </Button>
      </PageHeader>

      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="h-10 w-fit rounded-xl bg-muted/40 p-1 gap-1">
          <TabsTrigger value="inputs" className="h-8 text-xs rounded-lg px-3.5 font-medium">
            Form Inputs & Controls
          </TabsTrigger>
          <TabsTrigger value="buttons" className="h-8 text-xs rounded-lg px-3.5 font-medium">
            Buttons & Actions
          </TabsTrigger>
          <TabsTrigger value="badges" className="h-8 text-xs rounded-lg px-3.5 font-medium">
            Badges, Avatars & Metrics
          </TabsTrigger>
          <TabsTrigger value="feedback" className="h-8 text-xs rounded-lg px-3.5 font-medium">
            Feedback & Overlays
          </TabsTrigger>
          <TabsTrigger value="layout" className="h-8 text-xs rounded-lg px-3.5 font-medium">
            Structure & Accordions
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: Inputs */}
        <TabsContent value="inputs" className="flex flex-col gap-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Text & Icon Inputs */}
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">
                Text & Filter Inputs
              </h2>
              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="standard-input">Standard Text Input</Label>
                  <Input
                    id="standard-input"
                    value={textVal}
                    onChange={(e) => setTextVal(e.target.value)}
                    placeholder="Enter full name..."
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="icon-email">Input with Leading Icon</Label>
                  <div className="relative">
                    <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="icon-email"
                      type="email"
                      value={emailVal}
                      onChange={(e) => setEmailVal(e.target.value)}
                      placeholder="user@example.com"
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password-input">Password with Toggle</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password-input"
                      type={showPassword ? "text" : "password"}
                      value={passwordVal}
                      onChange={(e) => setPasswordVal(e.target.value)}
                      placeholder="••••••••"
                      className="pl-9 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="invalid-input">Error / Invalid State</Label>
                  <Input
                    id="invalid-input"
                    defaultValue="invalid.email.com"
                    aria-invalid="true"
                  />
                  <p className="text-xs font-medium text-destructive">
                    Please provide a valid corporate email.
                  </p>
                </div>
              </div>
            </div>

            {/* Select, Date & Textarea */}
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">
                Selects, Pickers & Controls
              </h2>
              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <Label htmlFor="select-accent">Select Dropdown</Label>
                  <Select value={selectVal} onValueChange={setSelectVal}>
                    <SelectTrigger id="select-accent" className="w-full">
                      <SelectValue placeholder="Choose preset..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Theme Blue (Corporate)</SelectItem>
                      <SelectItem value="slate">Theme Slate (Minimal)</SelectItem>
                      <SelectItem value="violet">Theme Violet</SelectItem>
                      <SelectItem value="rose">Theme Rose</SelectItem>
                      <SelectItem value="orange">Theme Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="date-input">Date Input (`InputDate`)</Label>
                  <InputDate
                    id="date-input"
                    ariaLabel="Service Date"
                    value={dateVal}
                    onChange={(e) => setDateVal(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="demo-textarea">Textarea with Hint</Label>
                  <Textarea
                    id="demo-textarea"
                    rows={3}
                    value={textareaVal}
                    onChange={(e) => setTextareaVal(e.target.value)}
                    placeholder="Provide additional medical notes or diagnosis details..."
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <Label>Interactive Toggles & Checkboxes</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms-check"
                      checked={checkboxVal}
                      onCheckedChange={(v) => setCheckboxVal(Boolean(v))}
                    />
                    <label htmlFor="terms-check" className="text-xs font-medium text-muted-foreground cursor-pointer">
                      I accept the data processing terms and consent policy
                    </label>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <TogglePill
                      active={activePill === "all"}
                      onClick={() => setActivePill("all")}
                    >
                      All Types
                    </TogglePill>
                    <TogglePill
                      active={activePill === "outpatient"}
                      onClick={() => setActivePill("outpatient")}
                    >
                      Outpatient
                    </TogglePill>
                    <TogglePill
                      active={activePill === "inpatient"}
                      onClick={() => setActivePill("inpatient")}
                    >
                      Inpatient
                    </TogglePill>
                    <TogglePill
                      active={activePill === "lab"}
                      onClick={() => setActivePill("lab")}
                    >
                      Laboratory
                    </TogglePill>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: Buttons & Actions */}
        <TabsContent value="buttons" className="flex flex-col gap-6 pt-4">
          <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-6">
            <h2 className="text-base font-semibold text-foreground">
              Button Variants & Visual States
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">Variants</span>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" className="rounded-xl">Default Primary</Button>
                  <Button variant="secondary" className="rounded-xl">Secondary</Button>
                  <Button variant="outline" className="rounded-xl">Outline</Button>
                  <Button variant="ghost" className="rounded-xl">Ghost Action</Button>
                  <Button variant="destructive" className="rounded-xl">Destructive</Button>
                  <Button variant="link" className="rounded-xl">Link Style</Button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">Sizes</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" className="rounded-xl">Small (sm)</Button>
                  <Button size="default" className="rounded-xl">Default (md)</Button>
                  <Button size="lg" className="rounded-xl">Large (lg)</Button>
                  <Button size="icon" aria-label="Quick action" className="rounded-xl">
                    <Plus className="size-4" />
                  </Button>
                  <Button size="icon" variant="outline" aria-label="Refresh" className="rounded-xl">
                    <RefreshCw className="size-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">With Icons & Loading</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="gap-2 rounded-xl">
                    <Send className="size-4" />
                    Submit Claim
                  </Button>
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <Calendar className="size-4" />
                    Pick Date
                  </Button>
                  <Button disabled className="gap-2 rounded-xl">
                    <RefreshCw className="size-4 animate-spin" />
                    Processing...
                  </Button>
                  <Button disabled variant="outline" className="rounded-xl">
                    Disabled State
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 3: Badges, Avatars & Metrics */}
        <TabsContent value="badges" className="flex flex-col gap-6 pt-4">
          <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-6">
            <h2 className="text-base font-semibold text-foreground">
              Status, Risk Badges & Avatars
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  StatusBadge (`@/components/common/status-badge`)
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <StatusBadge status="APPROVED" />
                  <StatusBadge status="SUCCESS" />
                  <StatusBadge status="PENDING" />
                  <StatusBadge status="PROCESSING" />
                  <StatusBadge status="WARNING" />
                  <StatusBadge status="REJECTED" />
                  <StatusBadge status="FAILED" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  RiskBadge (`@/components/common/risk-badge`)
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <RiskBadge level="NORMAL" />
                  <RiskBadge level="LOW" />
                  <RiskBadge level="MEDIUM" />
                  <RiskBadge level="HIGH" />
                  <RiskBadge level="CRITICAL" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  Avatars & Tooltips
                </span>
                <TooltipProvider>
                  <div className="flex items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="size-10 cursor-pointer">
                          <AvatarImage src="" alt="Maria Santos" />
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            MS
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>Maria Santos (Corporate Admin)</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Avatar className="size-10 cursor-pointer">
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            <User className="size-5" />
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>Guest User</TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium text-muted-foreground block">
                  Primitive Badge Variants
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Primary Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Metric StatCard Showcase */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              title="Metric Demo 1"
              value="₱1,250,000"
              icon={Zap}
              hint="Updated 5m ago"
            />
            <StatCard
              title="Metric Demo 2"
              value="99.4%"
              icon={CheckCircle2}
              hint="Service SLA"
            />
            <StatCard
              title="Metric Demo 3"
              value="240 req"
              icon={Clock}
              hint="Under review"
            />
            <StatCard
              title="Loading State"
              value="—"
              loading={true}
              hint="Fetching..."
            />
          </div>

          {/* Theme-Responsive Interactive Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Theme-Responsive Bar Chart
                </h3>
                <p className="text-xs text-muted-foreground">
                  Uses active primary highlight ({themeColors.name})
                </p>
              </div>
              <div className="h-52 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { label: "Mon", value: 38 },
                      { label: "Tue", value: 52 },
                      { label: "Wed", value: 68 },
                      { label: "Thu", value: 90 },
                      { label: "Fri", value: 74 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <RechartsTooltip content={<ChartTooltip />} />
                    <Bar dataKey="value" name="Submissions" fill={themeColors.primary} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Theme-Responsive Area Chart
                </h3>
                <p className="text-xs text-muted-foreground">
                  Gradient fill automatically matching active theme accent
                </p>
              </div>
              <div className="h-52 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={[
                      { label: "09:00", val: 20 },
                      { label: "12:00", val: 55 },
                      { label: "15:00", val: 80 },
                      { label: "18:00", val: 45 },
                      { label: "21:00", val: 30 },
                    ]}
                  >
                    <defs>
                      <linearGradient id="compAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/40" />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <RechartsTooltip content={<ChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="val"
                      name="Active Users"
                      stroke={themeColors.primary}
                      strokeWidth={2.5}
                      fill="url(#compAreaGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* TAB 4: Feedback & Overlays */}
        <TabsContent value="feedback" className="flex flex-col gap-6 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Toast Triggers */}
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">
                Sonner Toast Notifications
              </h2>
              <p className="text-xs text-muted-foreground">
                Native non-blocking toasts integrated with corporate themes.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    toast.success("Transaction Approved", {
                      description: "Claim #REQ-1042 was approved and queued for payout.",
                    })
                  }
                >
                  Success Toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    toast.error("Validation Failed", {
                      description: "Please attach required hospital receipts before submitting.",
                    })
                  }
                >
                  Error Toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    toast.warning("Session Warning", {
                      description: "Your session will expire in 5 minutes due to inactivity.",
                    })
                  }
                >
                  Warning Toast
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-xl"
                  onClick={() =>
                    toast.info("Notice", {
                      description: "Scheduled maintenance planned for this Sunday at 2:00 AM.",
                    })
                  }
                >
                  Info Toast
                </Button>
              </div>
            </div>

            {/* Dialog Trigger */}
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-3">
              <h2 className="text-base font-semibold text-foreground">
                Accessible Dialog & Modals
              </h2>
              <p className="text-xs text-muted-foreground">
                Accessible Radix UI modal with animated transitions.
              </p>
              <div className="pt-2">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="rounded-xl">Open Confirmation Modal</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-2xl border-none bg-card shadow-2xl">
                    <DialogHeader>
                      <DialogTitle>Confirm Reimbursement Approval</DialogTitle>
                      <DialogDescription>
                        You are about to approve ₱18,900.00 for inpatient claims submitted by Juan Dela Cruz.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-2 text-xs text-muted-foreground">
                      This action will log an entry in the audit trail and send an automated notification email.
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                      <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl">
                        Cancel
                      </Button>
                      <Button
                        className="rounded-xl"
                        onClick={() => {
                          setDialogOpen(false);
                          toast.success("Approved successfully!");
                        }}
                      >
                        Confirm Approval
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Skeletons & Empty State Showcase */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-4">
              <h2 className="text-base font-semibold text-foreground">
                Skeleton Loading States
              </h2>
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-full" />
                  <div className="space-y-1.5 flex-1">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
            </div>

            <EmptyState
              title="Empty State Component"
              description="Use this component whenever tables, search results, or queues have zero items."
              action={
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => toast.info("Action Triggered")}
                >
                  Create First Item
                </Button>
              }
            />
          </div>
        </TabsContent>

        {/* TAB 5: Layout & Accordions */}
        <TabsContent value="layout" className="flex flex-col gap-6 pt-4">
          <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-4">
            <h2 className="text-base font-semibold text-foreground">
              Accordion & Collapsible Content
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border/20">
                <AccordionTrigger className="text-sm font-medium">
                  What authentication methods are supported?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  The template supports Laravel Sanctum session cookies (CSRF token verification), token-based API authentication, and mock demo mode.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-border/20">
                <AccordionTrigger className="text-sm font-medium">
                  How do design tokens and dark mode work?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  Design tokens are defined in Tailwind CSS v4 OKLCH format in `globals.css`. The `ThemeProvider` stores user preferences in localStorage and prevents flash of unstyled content.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="text-sm font-medium">
                  Where should shared components be placed?
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                  Primitive UI tokens live under `src/components/ui/` (shadcn), while corporate composite components live under `src/components/common/`.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
