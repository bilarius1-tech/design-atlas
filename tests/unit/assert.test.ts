import { describe, expect, it } from "vitest";
import { assertNever, invariant } from "@/core/utilities/assert";

describe("invariant", () => {
  it("passes when condition is truthy", () => {
    expect(() => invariant(true, "should not throw")).not.toThrow();
  });

  it("throws when condition is falsy", () => {
    expect(() => invariant(false, "broken")).toThrow("broken");
  });
});

describe("assertNever", () => {
  it("throws for unexpected values", () => {
    expect(() => assertNever("x" as never, "unexpected")).toThrow("unexpected");
  });
});
