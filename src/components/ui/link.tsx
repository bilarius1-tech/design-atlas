import { focusRingClass } from "@/components/ui/control-classes";
import { cn } from "@/lib/cn";
import NextLink from "next/link";
import type { ComponentProps } from "react";

export type LinkVariant = "underline" | "subtle";

export type LinkProps = ComponentProps<typeof NextLink> & {
  variant?: LinkVariant;
};

export function Link({ className, variant = "underline", ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        "rounded-sm transition-colors",
        focusRingClass,
        variant === "underline"
          ? "text-accent decoration-accent/40 hover:decoration-accent underline"
          : "text-foreground hover:text-accent",
        className,
      )}
      {...props}
    />
  );
}
