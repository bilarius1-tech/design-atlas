import { cn } from "@/lib/cn";
import { focusRingClass } from "@/components/ui/control-classes";
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-inverse hover:bg-accent-hover active:brightness-90 disabled:bg-border-strong disabled:text-muted disabled:hover:bg-border-strong",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:border-accent hover:text-accent active:bg-surface-muted disabled:opacity-50 disabled:hover:border-border-strong disabled:hover:text-foreground",
  tertiary:
    "bg-surface-muted text-foreground hover:bg-border active:brightness-95 disabled:opacity-50",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-muted active:bg-border disabled:opacity-50",
  danger: "bg-danger text-inverse hover:opacity-90 active:brightness-90 disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-5 text-base",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cn(
    "relative inline-flex items-center justify-center rounded-md font-medium transition-colors no-underline",
    focusRingClass,
    "disabled:cursor-not-allowed",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          className="absolute inline-flex size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : null}
      {loading ? <span className="sr-only">Загрузка</span> : null}
      <span
        className={cn(
          "gap-inherit inline-flex items-center justify-center",
          loading && "invisible",
        )}
      >
        {children}
      </span>
    </button>
  );
}
