import { cn } from "@/lib/cn";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export function Input({ className, invalid = false, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      aria-invalid={invalid || undefined}
      className={cn(
        "h-10 w-full rounded-md border bg-surface px-3 text-sm text-foreground",
        "placeholder:text-muted",
        "transition-colors focus-visible:border-accent",
        "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60",
        invalid ? "border-danger" : "border-border",
        className,
      )}
      {...props}
    />
  );
}
