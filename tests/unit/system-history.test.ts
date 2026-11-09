import { describe, expect, it } from "vitest";
import {
  createHistoryEntry,
  entriesForStyle,
  overridesEqual,
  pushHistoryEntry,
  removeHistoryEntry,
  summarizeOverrides,
} from "@/features/studio/system-history";

describe("system-history", () => {
  it("summarizes overrides for the session list", () => {
    expect(summarizeOverrides({})).toBe("База стиля");
    expect(summarizeOverrides({ accent: "#34D399", radiusButton: "999px" })).toContain("#34D399");
  });

  it("skips pushing a duplicate tip and keeps newest first", () => {
    const first = createHistoryEntry("midnight-console", { accent: "#34D399" });
    const once = pushHistoryEntry([], first);
    const twice = pushHistoryEntry(once, createHistoryEntry("midnight-console", { accent: "#34D399" }));
    expect(twice).toHaveLength(1);

    const next = pushHistoryEntry(
      twice,
      createHistoryEntry("midnight-console", { accent: "#7C5CFF" }),
    );
    expect(next).toHaveLength(2);
    expect(next[0]?.overrides.accent).toBe("#7C5CFF");
  });

  it("filters and removes entries per style", () => {
    const a = createHistoryEntry("swiss-international", { background: "#fff" });
    const b = createHistoryEntry("midnight-console", { background: "#000" });
    const list = pushHistoryEntry(pushHistoryEntry([], a), b);
    expect(entriesForStyle(list, "swiss-international")).toHaveLength(1);
    expect(removeHistoryEntry(list, b.id).map((e) => e.id)).toEqual([a.id]);
    expect(overridesEqual({ accent: "#fff" }, { accent: "#fff " })).toBe(true);
  });
});
