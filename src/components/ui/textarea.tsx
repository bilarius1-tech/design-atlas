import { cn } from "@/lib/cn";
import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export function Textarea({ className, invalid = false, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(
        "min-h-28 w-full rounded-md border bg-surface px-3 py-2 text-sm text-foreground",
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
