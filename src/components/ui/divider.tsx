import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

export type DividerProps = HTMLAttributes<HTMLHRElement> & {
  orientation?: "horizontal" | "vertical";
};

export function Divider({ className, orientation = "horizontal", ...props }: DividerProps) {
  return (
    <hr
      aria-orientation={orientation}
      className={cn(
        "bg-border border-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px self-stretch",
        className,
      )}
      {...props}
    />
  );
}
