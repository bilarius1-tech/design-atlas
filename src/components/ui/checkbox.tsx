import { focusRingClass } from "@/components/ui/control-classes";
import { cn } from "@/lib/cn";
import type { InputHTMLAttributes, ReactNode } from "react";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: ReactNode;
  invalid?: boolean;
};

export function Checkbox({
  className,
  label,
  invalid = false,
  id,
  disabled,
  ...props
}: CheckboxProps) {
  const input = (
    <input
      id={id}
      type="checkbox"
      aria-invalid={invalid || undefined}
      disabled={disabled}
      className={cn(
        "border-border accent-accent size-4 shrink-0 rounded-sm border",
        focusRingClass,
        "disabled:cursor-not-allowed disabled:opacity-60",
        invalid && "border-danger",
        className,
      )}
      {...props}
    />
  );

  if (label == null) {
    return input;
  }

  return (
    <label
      className={cn(
        "text-foreground inline-flex items-center gap-2 text-sm",
        disabled && "text-muted cursor-not-allowed",
      )}
    >
      {input}
      <span>{label}</span>
    </label>
  );
}
