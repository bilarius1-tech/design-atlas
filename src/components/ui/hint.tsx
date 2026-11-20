"use client";

import { focusRingClass } from "@/components/ui/control-classes";
import { cn } from "@/lib/cn";
import { CircleHelp } from "lucide-react";
import { useId, useState } from "react";

export type HintProps = {
  label: string;
  className?: string;
};

/** Accessible one-line tip for “что это и зачем”, opened by click or keyboard. */
export function Hint({ label, className }: HintProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  return (
    <span className={cn("relative inline-flex align-middle", className)}>
      <button
        type="button"
        className={cn(
          "text-muted hover:text-foreground inline-flex h-7 w-7 items-center justify-center rounded-sm transition-colors",
          focusRingClass,
        )}
        aria-label="Подсказка"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        onBlur={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
      >
        <CircleHelp className="size-4" aria-hidden />
      </button>
      {open ? (
        <span
          id={id}
          role="tooltip"
          className="border-border bg-surface text-foreground absolute top-full left-0 z-20 mt-1 w-56 border px-2.5 py-2 text-left text-xs leading-snug shadow-sm"
        >
          {label}
        </span>
      ) : null}
    </span>
  );
}
