import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type AlertTone = "info" | "success" | "warning" | "danger";

export type AlertProps = HTMLAttributes<HTMLDivElement> & {
  tone?: AlertTone;
  title?: string;
};

const toneClasses: Record<AlertTone, string> = {
  info: "border-border bg-surface text-foreground",
  success: "border-success/30 bg-success-bg text-success",
  warning: "border-warning/30 bg-warning-bg text-warning",
  danger: "border-danger/30 bg-danger-bg text-danger",
};

export function Alert({ className, tone = "info", title, children, ...props }: AlertProps) {
  return (
    <div
      role="status"
      className={cn("rounded-md border px-4 py-3 text-sm", toneClasses[tone], className)}
      {...props}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
