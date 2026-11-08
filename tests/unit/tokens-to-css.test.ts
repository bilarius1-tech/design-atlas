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
    accent: "#E34234",
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
    expect(vars["--sp-color-accent"]).toBe("#E34234");
    expect(vars["--sp-radius"]).toBe("0px");
    expect(vars["--sp-font-heading"]).toContain("Helvetica");
  });

  it("serializes declarations for CSS export paths", () => {
    const css = cssVarsToDeclaration(tokensToCssVars(sampleTokens));
    expect(css).toContain("--sp-color-background: #F4F2EC;");
  });
});
