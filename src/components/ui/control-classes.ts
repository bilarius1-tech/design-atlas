import { cn } from "@/lib/cn";

/** Visible keyboard focus ring aligned with the shell token `color.focus`. */
export const focusRingClass =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

export const fieldClass = cn(
  "w-full rounded-md border bg-surface px-3 text-sm text-foreground",
  "placeholder:text-muted",
  "transition-colors hover:border-border-strong",
  "focus-visible:border-accent",
  focusRingClass,
  "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:opacity-60 disabled:hover:border-border",
  "read-only:bg-surface-muted read-only:text-muted read-only:hover:border-border",
);
