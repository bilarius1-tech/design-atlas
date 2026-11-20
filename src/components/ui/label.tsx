import { cn } from "@/lib/cn";
import type { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
  disabled?: boolean;
};

export function Label({
  className,
  required = false,
  disabled = false,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "text-foreground block text-sm font-medium tracking-wide",
        disabled && "text-muted",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span className="text-danger" aria-hidden>
          {" "}
          *
        </span>
      ) : null}
    </label>
  );
}
