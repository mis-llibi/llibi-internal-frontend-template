import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type RiskLevel = "NORMAL" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

const RISK_CLASSES: Record<RiskLevel, string> = {
  NORMAL:
    "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
  LOW:
    "border-transparent bg-blue-500/10 text-blue-600 hover:bg-blue-500/15 dark:text-blue-400",
  MEDIUM:
    "border-transparent bg-amber-500/10 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400",
  HIGH:
    "border-transparent bg-orange-500/10 text-orange-600 hover:bg-orange-500/15 dark:text-orange-400",
  CRITICAL:
    "border-transparent bg-rose-500/10 text-rose-600 hover:bg-rose-500/15 dark:text-rose-400",
};

export const RISK_COLORS: Record<RiskLevel, string> = {
  NORMAL: "var(--muted-foreground, #a3a3a3)",
  LOW: "#3b82f6",
  MEDIUM: "#f59e0b",
  HIGH: "#f97316",
  CRITICAL: "#ef4444",
};

export function RiskBadge({
  level,
  className,
}: {
  level: RiskLevel | string;
  className?: string;
}) {
  const upper = (level || "NORMAL").toUpperCase() as RiskLevel;
  const badgeClass = RISK_CLASSES[upper] ?? RISK_CLASSES.NORMAL;

  return (
    <Badge
      variant="outline"
      className={cn("font-medium px-2 py-0.5 text-xs", badgeClass, className)}
    >
      {upper}
    </Badge>
  );
}

export default RiskBadge;
