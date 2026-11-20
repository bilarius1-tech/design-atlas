import { cn } from "@/lib/cn";
import { fieldClass } from "@/components/ui/control-classes";
import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  errorMessage?: string;
};

export function Input({
  className,
  invalid = false,
  errorMessage,
  type = "text",
  id,
  ...props
}: InputProps) {
  const describedBy = errorMessage && invalid ? `${id ?? "field"}-error` : undefined;

  const input = (
    <input
      id={id}
      type={type}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        "h-10",
        fieldClass,
        invalid ? "border-danger hover:border-danger" : "border-border",
        className,
      )}
      {...props}
    />
  );

  if (!errorMessage) {
    return input;
  }

  return (
    <span className="block w-full">
      {input}
      {invalid ? (
        <span id={describedBy} className="text-danger mt-1 block text-sm">
          {errorMessage}
        </span>
      ) : null}
    </span>
  );
}
