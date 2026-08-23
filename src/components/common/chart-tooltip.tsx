import * as React from "react";

export type TooltipPayloadItem = {
  name?: string;
  value?: string | number;
  color?: string;
  fill?: string;
  dataKey?: string;
};

export type CustomChartTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  prefix?: string;
  suffix?: string;
};

export function ChartTooltip({
  active,
  payload,
  label,
  prefix = "",
  suffix = "",
}: CustomChartTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-border/40 bg-card p-3 text-xs text-card-foreground shadow-2xl backdrop-blur-md">
        {label && <p className="mb-1.5 font-semibold text-foreground">{label}</p>}
        <div className="space-y-1">
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className="size-2.5 rounded-full shrink-0 shadow-xs"
                  style={{ backgroundColor: item.color || item.fill || "var(--primary)" }}
                />
                <span className="text-muted-foreground">{item.name || item.dataKey}:</span>
              </div>
              <span className="font-mono font-semibold text-foreground">
                {prefix}
                {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                {suffix}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export default ChartTooltip;
