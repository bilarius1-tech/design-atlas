import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type BadgeTone = "neutral" | "accent" | "success" | "warning" | "danger";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-border bg-surface-muted text-foreground",
  accent: "border-accent/20 bg-accent text-inverse",
  success: "border-success/20 bg-success-bg text-success",
  warning: "border-warning/20 bg-warning-bg text-warning",
  danger: "border-danger/20 bg-danger-bg text-danger",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium tracking-wide uppercase",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
