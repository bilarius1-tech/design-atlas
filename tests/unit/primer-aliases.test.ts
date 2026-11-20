import { resolveNiche, resolveStyleId } from "@/features/primer/aliases";
import { describe, expect, it } from "vitest";

const ids = [
  "swiss-international",
  "poster-brutal",
  "midnight-console",
  "neo-brutalism",
  "neumorphism",
  "clinical-minimal",
];

describe("primer aliases", () => {
  it("resolves short style names and unique prefixes", () => {
    expect(resolveStyleId("swiss", ids)).toBe("swiss-international");
    expect(resolveStyleId("swiss-international", ids)).toBe("swiss-international");
    expect(resolveStyleId("poster", ids)).toBe("poster-brutal");
    expect(resolveStyleId("clinical", ids)).toBe("clinical-minimal");
    expect(resolveStyleId("unknown-style", ids)).toBe("swiss-international");
  });

  it("does not confuse neo and neu", () => {
    expect(resolveStyleId("neo", ids)).toBe("neo-brutalism");
    expect(resolveStyleId("neu", ids)).toBe("neumorphism");
  });

  it("resolves niches including Russian-facing aliases", () => {
    expect(resolveNiche("dental")).toBe("dental");
    expect(resolveNiche("stroy")).toBe("construction");
    expect(resolveNiche("mebel")).toBe("furniture");
    expect(resolveNiche("nope")).toBe("dental");
  });
});
