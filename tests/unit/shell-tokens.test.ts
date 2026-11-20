import { describe, expect, it } from "vitest";
import tokens from "../../design/system/tokens.json";

describe("shell tokens", () => {
  it("includes an icon size scale", () => {
    expect(tokens.icon).toEqual({
      sm: "16px",
      md: "20px",
      lg: "24px",
    });
  });
});
