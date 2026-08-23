import React, { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardBodyProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function CardBody({ title, children, className }: CardBodyProps) {
  return (
    <section className={cn("rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6", className)}>
      {title && <h2 className="text-base font-semibold text-foreground">{title}</h2>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default CardBody;
