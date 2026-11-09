import { buildStyleRegistry, loadStyleBundle, templateToDemoDefinition, loadPageTemplate } from "@/core/content";
import { describe, expect, it } from "vitest";

const R2_STYLE_IDS = ["swiss-international", "midnight-console", "poster-brutal"] as const;

describe("R2 multi-style compare fixtures", () => {
  it("registers three published styles for Studio compare", () => {
    const registry = buildStyleRegistry();
    for (const id of R2_STYLE_IDS) {
      expect(registry.knownIds.has(id)).toBe(true);
      expect(loadStyleBundle(id).style.status).toBe("published");
    }
  });

  it("keeps the same template content across styles (Same Content, Different Looks)", () => {
    const template = loadPageTemplate("saas-landing");
    const demos = R2_STYLE_IDS.map((id) => templateToDemoDefinition(template, id));

    const headlines = demos.map((demo) => {
      const hero = demo.sections.find((section) => section.id === "hero");
      return hero?.headline?.ru;
    });

    expect(new Set(headlines).size).toBe(1);
    expect(demos.map((demo) => demo.styleId)).toEqual([...R2_STYLE_IDS]);
    expect(demos.every((demo) => demo.compositionId === template.defaultCompositionId)).toBe(true);
  });

  it("keeps visually distinct token signatures", () => {
    const signatures = R2_STYLE_IDS.map((id) => {
      const { colors, geometry, effects } = loadStyleBundle(id).tokens;
      return `${colors.background}|${colors.accent}|${geometry.borderWidth}|${effects.shadow}`;
    });

    expect(new Set(signatures).size).toBe(R2_STYLE_IDS.length);
  });
});
