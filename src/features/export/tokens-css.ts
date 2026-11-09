import type { StyleTokens } from "@/core/schemas";
import { cssVarsToDeclaration, tokensToCssVars } from "@/core/generators/tokens-to-css";

/** Export CSS uses --da-* prefix for drop-in projects (not preview --sp-*). */
export function tokensToExportCss(tokens: StyleTokens, styleId: string): string {
  const preview = tokensToCssVars(tokens);
  const lines = Object.entries(preview).map(([key, value]) => {
    const exportKey = key.replace(/^--sp-/, "--da-");
    return `  ${exportKey}: ${value};`;
  });

  return `/**
 * DESIGN ATLAS tokens — ${styleId}
 * Generated from content/styles/${styleId}/tokens.json
 * Prefer these variables; do not hard-code hex/spacing in UI.
 */
.style-${styleId} {
${lines.join("\n")}
}
`;
}

export function tokensSummaryForReadme(tokens: StyleTokens): string {
  return [
    `- background: ${tokens.colors.background}`,
    `- text: ${tokens.colors.text}`,
    `- primary: ${tokens.colors.primary}`,
    `- accent: ${tokens.colors.accent}`,
    `- heading: ${tokens.typography.heading}`,
    `- body: ${tokens.typography.body}`,
    `- spacing unit: ${tokens.spacing.unit}px`,
    `- radius: ${tokens.geometry.radius}`,
  ].join("\n");
}

export { cssVarsToDeclaration };
