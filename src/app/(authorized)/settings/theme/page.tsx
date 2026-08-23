"use client";

import * as React from "react";
import {
  AlertCircle,
  BarChart3,
  Check,
  CheckCircle2,
  Maximize2,
  PlusCircle,
  Sparkles,
  Type,
  Undo2,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { StatusBadge } from "@/components/common/status-badge";
import { RiskBadge } from "@/components/common/risk-badge";
import { ChartTooltip } from "@/components/common/chart-tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  useTheme,
  type AccentTheme,
  type FontFamily,
  type FontSize,
  type Radius,
} from "@/components/theme-provider";

export default function ThemeSettingsPage() {
  const {
    theme,
    fontFamily,
    fontSize,
    radius,
    themeColors,
    setTheme,
    setFontFamily,
    setFontSize,
    setRadius,
  } = useTheme();

  const colorThemes: { id: AccentTheme; name: string; colorClass: string; desc: string }[] = [
    { id: "theme-blue", name: "Blue (Corporate - Default)", colorClass: "bg-blue-600", desc: "Corporate blue branding & primary theme" },
    { id: "default", name: "Corporate Blue (Alias)", colorClass: "bg-blue-600", desc: "Default system corporate appearance" },
    { id: "theme-slate", name: "Slate", colorClass: "bg-slate-800", desc: "Professional slate/cool gray look" },
    { id: "theme-violet", name: "Violet", colorClass: "bg-violet-600", desc: "Vibrant purple accenting" },
    { id: "theme-rose", name: "Rose", colorClass: "bg-rose-500", desc: "Warm and modern deep pink theme" },
    { id: "theme-orange", name: "Orange", colorClass: "bg-orange-500", desc: "Energetic and amber tones" },
  ];

  const fonts: { id: FontFamily; name: string; fontClass: string; desc: string }[] = [
    { id: "font-geist", name: "Geist Sans", fontClass: "font-sans", desc: "Clean & modern geometric UI font" },
    { id: "font-outfit", name: "Outfit", fontClass: "font-outfit", desc: "Sleek and round modern brand feel" },
    { id: "font-lora", name: "Lora", fontClass: "font-lora", desc: "Elegant serif with classic style" },
    { id: "font-playfair", name: "Playfair Display", fontClass: "font-playfair", desc: "Traditional luxury editorial display font" },
    { id: "font-mono", name: "Geist Mono", fontClass: "font-mono", desc: "Technical, precise coding/terminal look" },
    { id: "font-roboto", name: "Roboto", fontClass: "font-roboto", desc: "Popular, highly legible humanist sans-serif" },
  ];

  const fontSizes: { id: FontSize; name: string; desc: string }[] = [
    { id: "size-sm", name: "Small", desc: "Compact layout spacing (14px)" },
    { id: "size-md", name: "Medium", desc: "Standard readable sizing (16px)" },
    { id: "size-lg", name: "Large (Default)", desc: "Enhanced readability layout (18px)" },
  ];

  const borderRadii: { id: Radius; name: string; desc: string }[] = [
    { id: "radius-none", name: "Sharp", desc: "0px border-radius" },
    { id: "radius-sm", name: "Slightly Rounded", desc: "Approx. 5px border-radius" },
    { id: "radius-md", name: "Default", desc: "Approx. 10px border-radius" },
    { id: "radius-lg", name: "Round", desc: "Approx. 15px border-radius" },
    { id: "radius-xl", name: "Extra Round", desc: "Approx. 20px border-radius" },
  ];

  const resetToDefaults = () => {
    setTheme("theme-blue");
    setFontFamily("font-geist");
    setFontSize("size-lg");
    setRadius("radius-sm");
  };

  const previewChartData = [
    { name: "Mon", claims: 45 },
    { name: "Tue", claims: 65 },
    { name: "Wed", claims: 88 },
    { name: "Thu", claims: 72 },
    { name: "Fri", claims: 94 },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Appearance & Theme Settings"
        description="Customize brand color accents, typography families, base scaling, and corner radii."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={resetToDefaults}
          className="gap-1.5 h-9 rounded-xl"
        >
          <Undo2 className="size-4" />
          Reset Defaults
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Accent Color Selection */}
          <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Color Accent Theme
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Choose the primary highlight color applied across buttons, badges, tabs, charts, and active states.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {colorThemes.map((item) => {
                const isActive = theme === item.id || (item.id === "default" && theme === "theme-blue");
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTheme(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary/10 ring-2 ring-primary/60 text-foreground"
                        : "bg-muted/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className={`size-5 rounded-full ${item.colorClass} shrink-0 shadow-xs`} />
                    <div className="grid flex-1">
                      <span className="text-xs font-medium text-foreground">{item.name}</span>
                      <span className="text-[11px] text-muted-foreground line-clamp-1">{item.desc}</span>
                    </div>
                    {isActive && <Check className="size-4 text-primary shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Selection */}
          <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <Type className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Typography (Font Family)
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Select your preferred font typeface. Updates are applied instantly across the entire interface.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {fonts.map((item) => {
                const isActive = fontFamily === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFontFamily(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary/10 ring-2 ring-primary/60 text-foreground"
                        : "bg-muted/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="grid">
                      <span className={`text-sm font-semibold text-foreground ${item.fontClass}`}>{item.name}</span>
                      <span className="text-[11px] text-muted-foreground">{item.desc}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs text-muted-foreground ${item.fontClass} hidden sm:inline`}>
                        Aa Bb Cc 123
                      </span>
                      {isActive && <Check className="size-4 text-primary shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sizing & Border Radius */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Font Size Selector */}
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-4 space-y-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Type className="size-3.5 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">
                    Base Density
                  </h3>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Layout scaling factor</p>
              </div>

              <div className="space-y-1.5 pt-1">
                {fontSizes.map((item) => {
                  const isActive = fontSize === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFontSize(item.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs cursor-pointer ${
                        isActive
                          ? "bg-primary/10 ring-2 ring-primary/60 text-foreground"
                          : "bg-muted/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div>
                        <span className="font-medium text-foreground block">{item.name}</span>
                        <span className="text-muted-foreground text-[10px]">{item.desc}</span>
                      </div>
                      {isActive && <Check className="size-3 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Border Radius Selector */}
            <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-4 space-y-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <Maximize2 className="size-3.5 text-primary" />
                  <h3 className="text-xs font-semibold text-foreground">
                    Corner Radius
                  </h3>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5">Card & button curves</p>
              </div>

              <div className="space-y-1.5 pt-1">
                {borderRadii.map((item) => {
                  const isActive = radius === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRadius(item.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs cursor-pointer ${
                        isActive
                          ? "bg-primary/10 ring-2 ring-primary/60 text-foreground"
                          : "bg-muted/40 hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div>
                        <span className="font-medium text-foreground block">{item.name}</span>
                        <span className="text-muted-foreground text-[10px]">{item.desc}</span>
                      </div>
                      {isActive && <Check className="size-3 text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview Column (Frameless) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-2xl bg-muted/30 dark:bg-muted/15 p-5 sm:p-6 space-y-5">
            <div className="flex flex-row items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Preview
                </h3>
                <p className="text-xs text-muted-foreground">Real-time theme render</p>
              </div>
              <Badge variant="outline" className="text-xs font-mono">
                {themeColors.name}
              </Badge>
            </div>

            {/* StatCards preview */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                title="Approved YTD"
                value="₱1,250,450"
                icon={CheckCircle2}
                hint="Clean audit record"
              />
              <StatCard
                title="Action Items"
                value="2 pending"
                icon={AlertCircle}
                hint="Requires review"
              />
            </div>

            {/* Live Chart Preview (Dynamic Recharts Theme Test) */}
            <div className="rounded-2xl bg-muted/40 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <BarChart3 className="size-3.5 text-primary" />
                  Live Theme Chart Preview
                </span>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {themeColors.primary}
                </span>
              </div>
              <div className="h-32 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={previewChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted/30" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <RechartsTooltip content={<ChartTooltip />} />
                    <Bar dataKey="claims" name="Claims" fill={themeColors.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sample Badges preview */}
            <div className="space-y-2 rounded-2xl bg-muted/40 p-3.5 text-xs">
              <span className="text-muted-foreground block font-medium">Status & Risk Badges</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <StatusBadge status="APPROVED" />
                <StatusBadge status="PENDING" />
                <RiskBadge level="LOW" />
                <RiskBadge level="CRITICAL" />
              </div>
            </div>

            {/* Sample Form Input */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="preview-input" className="text-xs font-medium">Sample Corporate Input</Label>
                <Input
                  id="preview-input"
                  defaultValue="Healthcare Reimbursement Claims"
                />
              </div>

              <div className="flex gap-2 justify-end pt-1">
                <Button variant="outline" size="sm" className="rounded-xl">Cancel</Button>
                <Button size="sm" className="gap-1.5 rounded-xl">
                  <PlusCircle className="size-4" />
                  Submit Request
                </Button>
              </div>
            </div>

            <Separator className="bg-border/20" />

            {/* Applied Theme Spec */}
            <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
              <span className="px-2 py-1 bg-muted/60 rounded-md">Primary: <b className="text-foreground capitalize">{theme.replace("theme-", "")}</b></span>
              <span className="px-2 py-1 bg-muted/60 rounded-md">Font: <b className="text-foreground capitalize">{fontFamily.replace("font-", "")}</b></span>
              <span className="px-2 py-1 bg-muted/60 rounded-md">Scale: <b className="text-foreground capitalize">{fontSize.replace("size-", "")}</b></span>
              <span className="px-2 py-1 bg-muted/60 rounded-md">Radius: <b className="text-foreground capitalize">{radius.replace("radius-", "")}</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
