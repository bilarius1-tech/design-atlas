import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "./container";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  width?: "default" | "wide" | "narrow";
};

export function Section({
  className,
  eyebrow,
  title,
  description,
  actions,
  width = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-12 sm:py-16", className)} {...props}>
      <Container width={width}>
        {(eyebrow || title || description || actions) && (
          <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              {eyebrow ? (
                <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
                  {title}
                </h2>
              ) : null}
              {description ? <p className="text-base text-muted sm:text-lg">{description}</p> : null}
            </div>
            {actions}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
