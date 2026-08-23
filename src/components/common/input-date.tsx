import * as React from "react";
import { cn } from "@/lib/utils";

type InputDateProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  type?: string;
  ariaLabel: string;
  className?: string;
  disabled?: boolean;
  id?: string;
};

export function InputDate({
  value,
  onChange,
  placeholder,
  type = "date",
  ariaLabel,
  className,
  disabled,
  id,
}: InputDateProps) {
  return (
    <input
      id={id}
      aria-label={ariaLabel}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={cn(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    />
  );
}

export default InputDate;
