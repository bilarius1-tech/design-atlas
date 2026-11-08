import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type StackGap = "sm" | "md" | "lg" | "xl";

export type StackProps = HTMLAttributes<HTMLDivElement> & {
  gap?: StackGap;
  direction?: "vertical" | "horizontal";
};

const gapClasses: Record<StackGap, string> = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-10",
};

export function Stack({
  className,
  gap = "md",
  direction = "vertical",
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
        gapClasses[gap],
        className,
      )}
      {...props}
    />
  );
}
