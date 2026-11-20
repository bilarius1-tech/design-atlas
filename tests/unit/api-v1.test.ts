import { describe, expect, it } from "vitest";
import {
  ApiError,
  getComponent,
  getDesignSpec,
  getHealth,
  getShellTokens,
  getStyle,
  getStyleGuidelines,
  getStyleTokens,
  getTheme,
  listComponents,
  listStyles,
  listTemplates,
  listThemes,
  searchCatalog,
} from "@/features/api-v1/service";

describe("api v1 service", () => {
  it("reports health", () => {
    const body = getHealth();
    expect(body.ok).toBe(true);
    expect(body.service).toBe("design-atlas");
  });

  it("lists published styles including swiss-international", () => {
    const { data } = listStyles();
    expect(data.length).toBeGreaterThanOrEqual(24);
    expect(data.some((item) => item.id === "swiss-international")).toBe(true);
  });

  it("returns style tokens and guidelines", () => {
    const style = getStyle("swiss-international");
    expect(style.kind).toBe("style");
    const tokens = getStyleTokens("swiss-international");
    expect(tokens.data.colors.accent).toBe("#E30613");
    const guides = getStyleGuidelines("swiss-international");
    expect(guides.data["DESIGN.md"]?.length).toBeGreaterThan(20);
    expect(guides.data["prompt.ru.md"]?.length).toBeGreaterThan(20);
  });

  it("rejects unknown and malformed style ids", () => {
    expect(() => getStyle("no-such-style")).toThrow(ApiError);
    expect(() => getStyle("../etc/passwd")).toThrow(ApiError);
  });

  it("returns shell and vaybik theme tokens", () => {
    const shell = getShellTokens();
    expect((shell.data as { meta: { id: string } }).meta.id).toBe("design-atlas-shell");
    const theme = getTheme("vaybik");
    expect(theme.data.id).toBe("vaybik");
    expect((theme.data.tokens as { color: { accentWarm: string } }).color.accentWarm).toBe(
      "#ff9c45",
    );
    expect(listThemes().data.some((item) => item.id === "vaybik")).toBe(true);
  });

  it("returns component catalog entries with docs", () => {
    expect(listComponents().data.some((item) => item.id === "button")).toBe(true);
    const button = getComponent("button");
    expect(button.data.documentation?.includes("# Button")).toBe(true);
  });

  it("lists templates", () => {
    const ids = listTemplates().data.map((item) => item.id);
    expect(ids).toEqual(
      expect.arrayContaining(["saas-landing", "product-catalog", "corporate-blog"]),
    );
  });

  it("searches across styles, themes, and components", () => {
    const styles = searchCatalog("swiss");
    expect(styles.data.some((hit) => hit.id === "swiss-international")).toBe(true);
    const theme = searchCatalog("vaybik");
    expect(theme.data.some((hit) => hit.type === "theme")).toBe(true);
    expect(() => searchCatalog("   ")).toThrow(ApiError);
  });
});
