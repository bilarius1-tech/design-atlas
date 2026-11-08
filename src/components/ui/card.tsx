import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "section" | "div";
  padded?: boolean;
};

export function Card({
  as: Component = "article",
  className,
  padded = true,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "border border-border bg-surface shadow-sm",
        padded && "p-6",
        className,
      )}
      {...props}
    />
  );
}
