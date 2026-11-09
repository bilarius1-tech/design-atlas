import { describe, expect, it } from "vitest";
import { cssVarsToDeclaration, tokensToCssVars } from "@/core/generators/tokens-to-css";
import type { StyleTokens } from "@/core/schemas";

const sampleTokens: StyleTokens = {
  schemaVersion: "1.0.0",
  meta: { styleId: "swiss-international", name: "Swiss" },
  colors: {
    background: "#F4F2EC",
    surface: "#FFFFFF",
    text: "#171717",
    muted: "#6B6B6B",
    primary: "#171717",
    accent: "#E30613",
    border: "#D8D5CD",
  },
  typography: {
    heading: "Helvetica",
    body: "Helvetica",
    mono: "IBM Plex Mono",
    scale: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "20px",
      xl: "28px",
      "2xl": "40px",
      display: "72px",
    },
  },
  spacing: { unit: 4, section: "96px", container: "1200px" },
  geometry: { radius: "0px", borderWidth: "1px" },
  effects: { shadow: "none", transition: "180ms" },
};

describe("tokensToCssVars", () => {
  it("maps accent and radius into scoped --sp variables", () => {
    const vars = tokensToCssVars(sampleTokens);
    expect(vars["--sp-color-accent"]).toBe("#E30613");
    expect(vars["--sp-radius"]).toBe("0px");
    expect(vars["--sp-font-heading"]).toContain("Helvetica");
  });

  it("serializes declarations for CSS export paths", () => {
    const css = cssVarsToDeclaration(tokensToCssVars(sampleTokens));
    expect(css).toContain("--sp-color-background: #F4F2EC;");
  });

  it("stacks optional inset shadow and exposes blur for glass packs", () => {
    const vars = tokensToCssVars({
      ...sampleTokens,
      colors: { ...sampleTokens.colors, accentSecondary: "#FFB86B" },
      effects: {
        shadow: "8px 8px 24px rgba(0,0,0,.12)",
        shadowInset: "inset -4px -4px 12px rgba(255,255,255,.7)",
        blur: "16px",
        transition: "180ms",
      },
    });
    expect(vars["--sp-shadow"]).toContain("8px 8px 24px");
    expect(vars["--sp-shadow"]).toContain("inset -4px -4px 12px");
    expect(vars["--sp-blur"]).toBe("16px");
    expect(vars["--sp-color-accent-secondary"]).toBe("#FFB86B");
  });
});
