import { describe, expect, it } from "vitest";
import { loadStyleBundle } from "@/core/content";
import { DemoDefinitionSchema } from "@/core/schemas";
import { resolveComposition } from "@/features/demo-landing";

describe("demo landing compositions", () => {
  it("resolves known composition ids", () => {
    expect(resolveComposition("swiss-editorial-grid").className).toContain("swiss");
    expect(resolveComposition("editorial-split").id).toBe("editorial-split");
  });

  it("falls back to modular-stack for unknown ids", () => {
    expect(resolveComposition("unknown-composition").id).toBe("modular-stack");
  });
});

describe("swiss-international demo fixture", () => {
  it("loads a valid demo definition with swiss composition", () => {
    const bundle = loadStyleBundle("swiss-international");
    expect(bundle.demo).toBeDefined();
    const demo = DemoDefinitionSchema.parse(bundle.demo);
    expect(demo.compositionId).toBe("swiss-editorial-grid");
    expect(demo.sections.map((section) => section.id)).toEqual([
      "header",
      "hero",
      "features",
      "editorial",
      "showcase",
      "statistics",
      "testimonials",
      "pricing",
      "faq",
      "cta",
      "footer",
    ]);
  });
});
