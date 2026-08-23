import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_CLASSES: Record<string, string> = {
  APPROVED:
    "border-transparent bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400",
  SUCCESS:
    "border-transparent bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400",
  COMPLETED:
    "border-transparent bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400",
  PENDING:
    "border-transparent bg-amber-500/10 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400",
  WARNING:
    "border-transparent bg-amber-500/10 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400",
  PROCESSING:
    "border-transparent bg-blue-500/10 text-blue-600 hover:bg-blue-500/15 dark:text-blue-400",
  REJECTED:
    "border-transparent bg-rose-500/10 text-rose-600 hover:bg-rose-500/15 dark:text-rose-400",
  FAILED:
    "border-transparent bg-rose-500/10 text-rose-600 hover:bg-rose-500/15 dark:text-rose-400",
  ERROR:
    "border-transparent bg-rose-500/10 text-rose-600 hover:bg-rose-500/15 dark:text-rose-400",
};

const NEUTRAL_BADGE_CLASS =
  "border-transparent bg-muted text-muted-foreground hover:bg-muted/80";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const upper = (status || "").toUpperCase();
  const badgeClass = STATUS_CLASSES[upper] ?? NEUTRAL_BADGE_CLASS;

  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize px-2 py-0.5 text-xs", badgeClass, className)}
    >
      {status}
    </Badge>
  );
}

export default StatusBadge;
