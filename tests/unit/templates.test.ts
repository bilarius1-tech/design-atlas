import { describe, expect, it } from "vitest";
import {
  listTemplateIdsFromDisk,
  loadPageTemplate,
  templateToDemoDefinition,
} from "@/core/content";
import { PageTemplateSchema } from "@/core/schemas";

describe("page templates", () => {
  it("lists R3 templates from disk", () => {
    const ids = listTemplateIdsFromDisk();
    expect(ids).toEqual(
      expect.arrayContaining(["saas-landing", "product-catalog", "corporate-blog"]),
    );
  });

  it("loads and validates saas-landing", () => {
    const template = loadPageTemplate("saas-landing");
    expect(PageTemplateSchema.parse(template).id).toBe("saas-landing");
    expect(template.category).toBe("saas");
    expect(template.sections.some((section) => section.id === "hero")).toBe(true);
  });

  it("loads product-catalog and corporate-blog", () => {
    const catalog = loadPageTemplate("product-catalog");
    expect(catalog.category).toBe("store");
    expect(catalog.sections.some((section) => section.id === "showcase")).toBe(true);

    const corp = loadPageTemplate("corporate-blog");
    expect(corp.category).toBe("marketing");
    expect(corp.sections.some((section) => section.id === "editorial")).toBe(true);
    expect(corp.sections.some((section) => section.id === "showcase")).toBe(true);
  });

  it("binds template to a style for demo renderer", () => {
    const template = loadPageTemplate("product-catalog");
    const demo = templateToDemoDefinition(template, "swiss-international");
    expect(demo.styleId).toBe("swiss-international");
    expect(demo.compositionId).toBe(template.defaultCompositionId);
    expect(demo.sections).toHaveLength(template.sections.length);
  });
});
