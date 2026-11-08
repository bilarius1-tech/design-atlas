import { describe, expect, it } from "vitest";
import { cn } from "@/lib/cn";
import { buttonClassName } from "@/components/ui/button";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toContain("px-2");
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});

describe("buttonClassName", () => {
  it("includes primary styles by default", () => {
    expect(buttonClassName()).toContain("bg-accent");
  });

  it("supports secondary variant", () => {
    expect(buttonClassName({ variant: "secondary" })).toContain("bg-surface");
  });
});
