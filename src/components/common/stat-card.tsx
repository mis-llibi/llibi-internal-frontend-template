import type { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type StatCardProps = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  hint?: string;
  loading?: boolean;
  className?: string;
};

export function StatCard({
  title,
  value,
  icon: Icon,
  hint,
  loading = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl bg-muted/30 dark:bg-muted/15 p-4 transition-colors hover:bg-muted/40",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {title}
        </span>
        {Icon && <Icon className="size-4 text-muted-foreground/80 shrink-0" />}
      </div>
      <div className="pt-2">
        {loading ? (
          <Skeleton className="h-7 w-20 rounded-lg" />
        ) : (
          <div className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </div>
        )}
        {hint && (
          <p className="mt-1 text-[11px] text-muted-foreground font-normal line-clamp-1">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;
