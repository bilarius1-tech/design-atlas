import { cn } from "@/lib/cn";
import { fieldClass } from "@/components/ui/control-classes";
import type { TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
  errorMessage?: string;
};

export function Textarea({
  className,
  invalid = false,
  errorMessage,
  id,
  ...props
}: TextareaProps) {
  const describedBy = errorMessage && invalid ? `${id ?? "field"}-error` : undefined;

  const area = (
    <textarea
      id={id}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className={cn(
        "min-h-28 py-2",
        fieldClass,
        invalid ? "border-danger hover:border-danger" : "border-border",
        className,
      )}
      {...props}
    />
  );

  if (!errorMessage) {
    return area;
  }

  return (
    <span className="block w-full">
      {area}
      {invalid ? (
        <span id={describedBy} className="text-danger mt-1 block text-sm">
          {errorMessage}
        </span>
      ) : null}
    </span>
  );
}
