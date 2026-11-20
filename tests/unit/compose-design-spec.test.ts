import { describe, expect, it } from "vitest";
import {
  assertSelfContainedPrompt,
  composeDesignSpec,
} from "@/features/design-spec";
import { loadDesignSpecSource } from "@/features/design-spec/load-source";
import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";

describe("composeDesignSpec", () => {
  it("builds a self-contained Swiss spec from tokens, not from stale prompt files", () => {
    const source = loadDesignSpecSource("swiss-international");
    const { markdown, tokens } = composeDesignSpec({
      source,
      lang: "ru",
      surface: "agent",
    });

    expect(markdown).toContain("Внедри эту дизайн-систему в текущий проект");
    expect(markdown).toContain("стоматологии");
    expect(markdown).toContain("tokens.css");
    expect(markdown).toContain("DESIGN.md");
    expect(markdown).toContain(tokens.colors.accent);
    expect(markdown).toContain(`display: \`${tokens.typography.scale.display}\``);
    expect(markdown).not.toContain("display 80");
    expect(markdown).not.toContain("display `80px`");
    expect(markdown).toContain("fonts.googleapis.com");
    expect(assertSelfContainedPrompt(markdown)).toEqual([]);
  });

  it("includes a named product and constructor wording", () => {
    const source = loadDesignSpecSource("vintage-gold");
    const agent = composeDesignSpec({
      source,
      lang: "ru",
      surface: "agent",
      productName: "Клиника улыбки",
      pageBrief: "Стоматология в Казани. CTA: Записаться.",
    }).markdown;
    expect(agent).toContain("Клиника улыбки");
    expect(agent).toContain("Стоматология в Казани");

    const constructor = composeDesignSpec({
      source,
      lang: "ru",
      surface: "constructor",
    }).markdown;
    expect(constructor).toContain("конструкторе");
    expect(constructor).toContain("Тильда");
    expect(assertSelfContainedPrompt(constructor)).toEqual([]);
  });

  it("emits an English spec without site or pack dependencies", () => {
    const source = loadDesignSpecSource("neo-brutalism");
    const markdown = composeDesignSpec({
      source,
      lang: "en",
      surface: "agent",
    }).markdown;
    expect(markdown).toContain("Apply this design system to the current project");
    expect(markdown).toContain("fonts.googleapis.com");
    expect(assertSelfContainedPrompt(markdown)).toEqual([]);
  });

  it("produces a self-contained spec for every published style", () => {
    const ids = listStyleIdsFromDisk().filter((id) => loadStyleBundle(id).style.status === "published");
    expect(ids.length).toBeGreaterThanOrEqual(24);
    for (const id of ids) {
      const source = loadDesignSpecSource(id);
      for (const lang of ["ru", "en"] as const) {
        const markdown = composeDesignSpec({ source, lang, surface: "agent" }).markdown;
        const problems = assertSelfContainedPrompt(markdown);
        expect(problems, `${id} ${lang}`).toEqual([]);
        expect(markdown).toContain(source.tokens.typography.scale.display);
      }
    }
  });
});
