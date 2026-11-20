import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
  padded?: boolean;
  interactive?: boolean;
};

export function Card({
  as: Component = "article",
  className,
  padded = true,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "border-border bg-surface border shadow-sm",
        padded && "p-6",
        interactive && "hover:border-accent focus-visible:border-accent transition-colors",
        className,
      )}
      {...props}
    />
  );
}
