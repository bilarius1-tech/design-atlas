import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

type ContainerWidth = "default" | "wide" | "narrow";

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  width?: ContainerWidth;
};

const widthClasses: Record<ContainerWidth, string> = {
  default: "max-w-[var(--da-size-container)]",
  wide: "max-w-[var(--da-size-container-wide)]",
  narrow: "max-w-[var(--da-size-container-narrow)]",
};

export function Container({ className, width = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", widthClasses[width], className)}
      {...props}
    />
  );
}
