"use client";

import { cn } from "@/lib/cn";
import { useId, useState, type ReactNode } from "react";

export type TooltipProps = {
  content: string;
  children: ReactNode;
  className?: string;
};

/** Hover and focus tooltip. Use Hint when the tip should open by click. */
export function Tooltip({ content, children, className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="inline-flex" onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
        {children}
      </span>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="border-border bg-foreground text-inverse absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-56 -translate-x-1/2 border px-2 py-1 text-xs shadow-sm"
        >
          {content}
        </span>
      ) : null}
    </span>
  );
}
