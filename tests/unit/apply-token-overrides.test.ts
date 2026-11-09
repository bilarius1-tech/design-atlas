import { describe, expect, it } from "vitest";
import type { StyleTokens } from "@/core/schemas";
import {
  applyTokenOverrides,
  formatSystemOverridesNote,
  hasTokenOverrides,
} from "@/features/studio/apply-token-overrides";

const base: StyleTokens = {
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
  spacing: { unit: 4, section: "96px", container: "1180px" },
  geometry: { radius: "0px", borderWidth: "1px" },
  effects: { shadow: "none", transition: "180ms" },
};

describe("applyTokenOverrides", () => {
  it("returns the same object when overrides are empty", () => {
    expect(applyTokenOverrides(base, {})).toBe(base);
    expect(hasTokenOverrides({})).toBe(false);
  });

  it("merges palette, fonts, type scale, and split radii for preview", () => {
    const next = applyTokenOverrides(base, {
      background: "#0B0F14",
      accent: "#3D5AFE",
      headingFont: "Manrope",
      sizeH1: "48",
      radiusButton: "999px",
      radiusCard: "16px",
      container: "1200px",
    });
    expect(next.colors.background).toBe("#0B0F14");
    expect(next.colors.accent).toBe("#3D5AFE");
    expect(next.typography.heading).toContain("Manrope");
    expect(next.typography.scale["2xl"]).toBe("48px");
    expect(next.geometry.radiusButton).toBe("999px");
    expect(next.geometry.radiusCard).toBe("16px");
    expect(next.spacing.container).toBe("1200px");
  });

  it("formats a RU/EN note for the handoff prompt", () => {
    const ru = formatSystemOverridesNote({ accent: "#7C5CFF", radiusButton: "32px" }, "ru");
    const en = formatSystemOverridesNote({ accent: "#7C5CFF", radiusButton: "32px" }, "en");
    expect(ru).toContain("theme variables");
    expect(ru).toContain("#7C5CFF");
    expect(ru).toContain("radius кнопок: 32px");
    expect(en).toContain("button radius: 32px");
  });
});
