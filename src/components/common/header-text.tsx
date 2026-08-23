import React from "react";
import { cn } from "@/lib/utils";

type HeaderTextProps = {
  text: string;
  className?: string;
};

export function HeaderText({ text, className }: HeaderTextProps) {
  return (
    <h1
      className={cn(
        "text-2xl font-bold tracking-tight text-foreground text-center md:text-start",
        className,
      )}
    >
      {text}
    </h1>
  );
}

export default HeaderText;
