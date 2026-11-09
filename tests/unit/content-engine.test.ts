import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildStyleRegistry,
  loadStyleBundle,
  validateContentRegistry,
  validateStyleDirectory,
} from "@/core/content";
import { StyleDefinitionSchema, StyleTokensSchema } from "@/core/schemas";

const tempDirs: string[] = [];

afterEach(() => {
  vi.restoreAllMocks();
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (dir) {
      rmSync(dir, { recursive: true, force: true });
    }
  }
});

describe("style schemas", () => {
  it("accepts the swiss-international draft style.json shape", () => {
    const parsed = StyleDefinitionSchema.parse({
      schemaVersion: "1.0.0",
      id: "swiss-international",
      slug: "swiss-international",
      status: "draft",
      version: "0.1.0",
      title: { ru: "Тест", en: "Test" },
      shortDescription: { ru: "Кратко", en: "Short" },
      philosophy: { ru: "Философия", en: "Philosophy" },
      category: "modernism",
      tags: ["grid"],
      complexity: "medium",
      visualDensity: "balanced",
      contrast: "high",
      bestUseCases: ["Docs"],
      avoidFor: ["Playful toys"],
      relatedStyles: [],
      fontFamilies: ["Helvetica"],
      author: "design-atlas",
      updatedAt: "2026-11-09T00:00:00.000Z",
      sources: [],
    });

    expect(parsed.id).toBe("swiss-international");
  });

  it("rejects published styles without sources", () => {
    const result = StyleDefinitionSchema.safeParse({
      schemaVersion: "1.0.0",
      id: "bad-style",
      slug: "bad-style",
      status: "published",
      version: "1.0.0",
      title: { ru: "Тест", en: "Test" },
      shortDescription: { ru: "Кратко", en: "Short" },
      philosophy: { ru: "Философия", en: "Philosophy" },
      category: "modernism",
      tags: [],
      complexity: "low",
      visualDensity: "sparse",
      contrast: "medium",
      bestUseCases: ["A"],
      avoidFor: ["B"],
      relatedStyles: [],
      fontFamilies: ["Arial"],
      author: "design-atlas",
      updatedAt: "2026-11-09T00:00:00.000Z",
      sources: [],
    });

    expect(result.success).toBe(false);
  });

  it("requires token color keys", () => {
    const result = StyleTokensSchema.safeParse({
      schemaVersion: "1.0.0",
      meta: { styleId: "x", name: "x" },
      colors: {
        background: "#fff",
        surface: "#fff",
        text: "#000",
        muted: "#666",
        primary: "#000",
        accent: "#f00",
        // border missing
      },
      typography: {
        heading: "A",
        body: "A",
        mono: "M",
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
    });

    expect(result.success).toBe(false);
  });
});

describe("content registry against repo fixtures", () => {
  it("loads swiss-international reference bundle", () => {
    const bundle = loadStyleBundle("swiss-international");
    expect(bundle.style.status).toBe("published");
    expect(bundle.tokens.colors.accent).toBe("#E30613");
    expect(bundle.typography?.roles.h1.size).toBe("44px");
  });

  it("builds registry entry from disk", () => {
    const registry = buildStyleRegistry();
    expect(registry.knownIds.has("swiss-international")).toBe(true);
    const swiss = registry.styles.find((style) => style.id === "swiss-international");
    expect(swiss?.title.en).toContain("Swiss");
  });

  it("validates repository content without errors", () => {
    const result = validateContentRegistry();
    const errors = result.issues.filter((issue) => issue.severity === "error");
    expect(errors).toEqual([]);
    expect(result.ok).toBe(true);
  });
});

describe("validateStyleDirectory", () => {
  it("reports missing style directory", () => {
    const result = validateStyleDirectory("does-not-exist");
    expect(result.ok).toBe(false);
    expect(result.issues[0]?.code).toBe("directory_missing");
  });
});

describe("temp invalid fixture", () => {
  it("flags id mismatch between folder and style.json", () => {
    const root = mkdtempSync(path.join(tmpdir(), "da-content-"));
    tempDirs.push(root);

    const stylesRoot = path.join(root, "content", "styles", "folder-id");
    mkdirSync(stylesRoot, { recursive: true });
    writeFileSync(
      path.join(stylesRoot, "style.json"),
      JSON.stringify({
        schemaVersion: "1.0.0",
        id: "other-id",
        slug: "other-id",
        status: "draft",
        version: "0.0.1",
        title: { ru: "А", en: "A" },
        shortDescription: { ru: "А", en: "A" },
        philosophy: { ru: "А", en: "A" },
        category: "test",
        tags: [],
        complexity: "low",
        visualDensity: "sparse",
        contrast: "low",
        bestUseCases: ["x"],
        avoidFor: ["y"],
        relatedStyles: [],
        fontFamilies: ["Arial"],
        author: "test",
        updatedAt: "2026-11-09T00:00:00.000Z",
        sources: [],
      }),
      "utf8",
    );
    writeFileSync(
      path.join(stylesRoot, "tokens.json"),
      JSON.stringify({
        schemaVersion: "1.0.0",
        meta: { styleId: "folder-id", name: "temp" },
        colors: {
          background: "#fff",
          surface: "#fff",
          text: "#000",
          muted: "#666",
          primary: "#000",
          accent: "#f00",
          border: "#ddd",
        },
        typography: {
          heading: "A",
          body: "A",
          mono: "M",
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
      }),
      "utf8",
    );

    const cwdSpy = vi.spyOn(process, "cwd").mockImplementation(() => root);

    try {
      const result = validateStyleDirectory("folder-id");
      expect(result.ok).toBe(false);
      expect(result.issues.map((issue) => issue.code)).toContain("id_mismatch");
    } finally {
      cwdSpy.mockRestore();
    }
  });
});
