import { describe, expect, it } from "vitest";
import tokens from "../../design/themes/vaybik/tokens.json";

describe("vaybik theme", () => {
  it("keeps live homepage tokens and does not overwrite the Atlas shell id", () => {
    expect(tokens.kind).toBe("theme");
    expect(tokens.meta.id).toBe("vaybik");
    expect(tokens.color.bg).toBe("#07051a");
    expect(tokens.color.accent).toBe("#a855f7");
    expect(tokens.color.accentWarm).toBe("#ff9c45");
    expect(tokens.font.family.display).toContain("Unbounded");
    expect(tokens.meta.source).toContain("vaybik.ru/css/site.css");
  });
});
