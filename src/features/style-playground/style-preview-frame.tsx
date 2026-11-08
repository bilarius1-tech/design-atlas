import type { StyleTokens } from "@/core/schemas";
import { tokensToCssVars } from "@/core/generators/tokens-to-css";
import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";
import "./style-preview.css";

export type StylePreviewFrameProps = HTMLAttributes<HTMLDivElement> & {
  styleId: string;
  tokens: StyleTokens;
  children: ReactNode;
};

/**
 * Isolates catalog style tokens from the app shell via scoped CSS variables (ADR-0003).
 */
export function StylePreviewFrame({
  styleId,
  tokens,
  className,
  children,
  ...props
}: StylePreviewFrameProps) {
  return (
    <div
      className={cn("style-preview", className)}
      data-style-id={styleId}
      style={tokensToCssVars(tokens)}
      {...props}
    >
      {children}
    </div>
  );
}
