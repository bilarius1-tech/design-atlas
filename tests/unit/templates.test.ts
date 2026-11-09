import { describe, expect, it } from "vitest";
import {
  listTemplateIdsFromDisk,
  loadPageTemplate,
  templateToDemoDefinition,
} from "@/core/content";
import { PageTemplateSchema } from "@/core/schemas";

describe("page templates", () => {
  it("lists saas-landing from disk", () => {
    expect(listTemplateIdsFromDisk()).toContain("saas-landing");
  });

  it("loads and validates saas-landing", () => {
    const template = loadPageTemplate("saas-landing");
    expect(PageTemplateSchema.parse(template).id).toBe("saas-landing");
    expect(template.category).toBe("saas");
    expect(template.sections.some((section) => section.id === "hero")).toBe(true);
  });

  it("binds template to a style for demo renderer", () => {
    const template = loadPageTemplate("saas-landing");
    const demo = templateToDemoDefinition(template, "swiss-international");
    expect(demo.styleId).toBe("swiss-international");
    expect(demo.compositionId).toBe(template.defaultCompositionId);
    expect(demo.sections).toHaveLength(template.sections.length);
  });
});
