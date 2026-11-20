import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

export type EmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ className, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface flex flex-col items-start gap-3 border border-dashed px-6 py-10",
        className,
      )}
      {...props}
    >
      <h2 className="text-foreground font-serif text-2xl tracking-tight">{title}</h2>
      {description ? <p className="text-muted max-w-xl">{description}</p> : null}
      {action}
    </div>
  );
}
