import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({
  className,
  title,
  description,
  action,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-3 border border-dashed border-border bg-surface px-6 py-10",
        className,
      )}
      {...props}
    >
      <h2 className="font-serif text-2xl tracking-tight text-foreground">{title}</h2>
      {description ? <p className="max-w-xl text-muted">{description}</p> : null}
      {action}
    </div>
  );
}
