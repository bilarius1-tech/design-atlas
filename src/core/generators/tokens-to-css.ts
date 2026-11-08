import type { CSSProperties } from "react";
import type { StyleTokens } from "@/core/schemas";

/** CSS custom properties for a scoped style preview (ADR-0003). */
export type StylePreviewCssVars = CSSProperties & Record<`--sp-${string}`, string>;

export function tokensToCssVars(tokens: StyleTokens): StylePreviewCssVars {
  return {
    "--sp-color-background": tokens.colors.background,
    "--sp-color-surface": tokens.colors.surface,
    "--sp-color-text": tokens.colors.text,
    "--sp-color-muted": tokens.colors.muted,
    "--sp-color-primary": tokens.colors.primary,
    "--sp-color-accent": tokens.colors.accent,
    "--sp-color-border": tokens.colors.border,
    "--sp-font-heading": tokens.typography.heading,
    "--sp-font-body": tokens.typography.body,
    "--sp-font-mono": tokens.typography.mono,
    "--sp-text-xs": tokens.typography.scale.xs,
    "--sp-text-sm": tokens.typography.scale.sm,
    "--sp-text-base": tokens.typography.scale.base,
    "--sp-text-lg": tokens.typography.scale.lg,
    "--sp-text-xl": tokens.typography.scale.xl,
    "--sp-text-2xl": tokens.typography.scale["2xl"],
    "--sp-text-display": tokens.typography.scale.display,
    "--sp-space-unit": `${tokens.spacing.unit}px`,
    "--sp-space-section": tokens.spacing.section,
    "--sp-size-container": tokens.spacing.container,
    "--sp-radius": tokens.geometry.radius,
    "--sp-border-width": tokens.geometry.borderWidth,
    "--sp-shadow": tokens.effects.shadow,
    "--sp-transition": tokens.effects.transition,
  };
}

export function cssVarsToDeclaration(vars: StylePreviewCssVars): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
}
