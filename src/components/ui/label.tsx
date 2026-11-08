import { cn } from "@/lib/cn";
import type { LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn("block text-sm font-medium tracking-wide text-foreground", className)}
      {...props}
    />
  );
}
