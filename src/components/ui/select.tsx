import { fieldClass } from "@/components/ui/control-classes";
import { cn } from "@/lib/cn";
import type { SelectHTMLAttributes } from "react";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean;
};

export function Select({ className, invalid = false, children, ...props }: SelectProps) {
  return (
    <select
      aria-invalid={invalid || undefined}
      className={cn(
        "h-10",
        fieldClass,
        invalid ? "border-danger hover:border-danger" : "border-border",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
