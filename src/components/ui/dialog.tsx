"use client";

import { focusRingClass } from "@/components/ui/control-classes";
import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { useEffect, useId, useRef, type ReactNode } from "react";

export type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Dialog({ open, onClose, title, description, children, className }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;

    if (open && !node.open) {
      node.showModal();
    } else if (!open && node.open) {
      node.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "border-border bg-background text-foreground m-auto max-h-[min(90dvh,40rem)] w-[min(100%-1.5rem,42rem)] border p-0 shadow-md open:flex open:flex-col",
        "backdrop:bg-foreground/40",
        className,
      )}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="border-border flex items-start justify-between gap-3 border-b px-4 py-3 sm:px-5">
        <div className="min-w-0 space-y-1">
          <h2 id={titleId} className="font-serif text-xl tracking-tight">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="text-muted text-sm">
              {description}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className={cn(
            "border-border text-muted hover:text-foreground inline-flex h-9 w-9 shrink-0 items-center justify-center border",
            focusRingClass,
          )}
          aria-label="Закрыть"
          onClick={onClose}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">{children}</div>
    </dialog>
  );
}
