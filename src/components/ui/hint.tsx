"use client";

import { cn } from "@/lib/cn";
import { CircleHelp } from "lucide-react";
import { useId, useState } from "react";

export type HintProps = {
  label: string;
  className?: string;
};

/** Accessible one-line tip for “что это и зачем”. */
export function Hint({ label, className }: HintProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className={cn("relative inline-flex align-middle", className)}>
      <button
        type="button"
        className="inline-flex h-5 w-5 items-center justify-center rounded-sm text-muted transition-colors hover:text-foreground"
        aria-label="Подсказка"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <CircleHelp className="h-3.5 w-3.5" aria-hidden />
      </button>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="absolute top-full left-0 z-20 mt-1 w-56 border border-border bg-surface px-2.5 py-2 text-left text-xs leading-snug text-foreground shadow-sm"
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
