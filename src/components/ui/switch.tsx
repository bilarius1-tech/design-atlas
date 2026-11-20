"use client";

import { focusRingClass } from "@/components/ui/control-classes";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

export type SwitchProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
};

export function Switch({
  className,
  checked,
  onCheckedChange,
  disabled,
  label,
  ...props
}: SwitchProps) {
  const control = (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label ? undefined : props["aria-label"]}
      disabled={disabled}
      className={cn(
        "border-border relative inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors",
        checked ? "bg-accent" : "bg-surface-muted",
        "hover:border-border-strong",
        focusRingClass,
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className={cn(
          "bg-surface pointer-events-none inline-block size-4 rounded-full shadow-sm transition-transform",
          checked ? "translate-x-5" : "translate-x-1",
        )}
        aria-hidden
      />
    </button>
  );

  if (!label) {
    return control;
  }

  return (
    <label className={cn("inline-flex items-center gap-2 text-sm", disabled && "text-muted")}>
      {control}
      <span>{label}</span>
    </label>
  );
}
