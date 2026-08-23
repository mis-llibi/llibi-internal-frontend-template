import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardMainProps = {
  children: ReactNode;
  className?: string;
};

export function CardMain({ children, className }: CardMainProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-card p-4 text-card-foreground lg:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default CardMain;
