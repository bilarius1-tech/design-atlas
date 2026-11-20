import { describe, expect, it } from "vitest";
import {
  composeHandoffPrompt,
  composeHandoffSections,
  estimatePromptChars,
} from "@/features/studio/compose-prompt";
import { loadDesignSpecSource } from "@/features/design-spec/load-source";
import { assertSelfContainedPrompt } from "@/features/design-spec";

const specSource = loadDesignSpecSource("swiss-international");

const base = {
  styleId: "swiss-international",
  styleTitle: "Швейцарский интернациональный стиль",
  templateId: "saas-landing",
  templateTitle: "SaaS-лендинг",
  templateSections: [
    { id: "hero", title: "Hero" },
    { id: "pricing", title: "Pricing" },
  ],
  productName: "",
  pageBrief: "",
  specSource,
} as const;

describe("composeHandoffPrompt", () => {
  it("assembles a self-contained style-only handoff without a template outline", () => {
    const text = composeHandoffPrompt({
      ...base,
      lang: "ru",
      surface: "agent",
      productName: "Нордлайн",
      pageBrief: "CRM для команд. CTA: Начать бесплатно.",
    });

    expect(text).toContain("## Задача");
    expect(text).toContain("## Продукт");
    expect(text).toContain("Нордлайн");
    expect(text).toContain("CRM для команд");
    expect(text).toContain("Внедри эту дизайн-систему");
    expect(text).not.toContain("## Каркас страницы");
    expect(text).not.toContain("1. hero — Hero");
    expect(text).not.toContain("saas-landing");
    expect(assertSelfContainedPrompt(text)).toEqual([]);
  });

  it("asks the agent to reuse chat structure when the brief is empty", () => {
    const text = composeHandoffPrompt({
      ...base,
      lang: "en",
      surface: "agent",
    });
    expect(text).toContain("If the chat already has structure");
    expect(text).not.toContain("Page outline");
    expect(assertSelfContainedPrompt(text)).toEqual([]);
  });

  it("wraps constructor surface without a template block list", () => {
    const sections = composeHandoffSections({
      ...base,
      lang: "ru",
      surface: "constructor",
    });
    expect(sections[0]?.body).toContain("конструкторе");
    expect(sections.map((s) => s.id)).toContain("task");
    expect(sections.map((s) => s.id)).toContain("colors");
  });

  it("counts characters for the modal estimate", () => {
    const text = composeHandoffPrompt({ ...base, lang: "ru", surface: "agent" });
    expect(estimatePromptChars(text)).toBe(text.length);
    expect(estimatePromptChars(text)).toBeGreaterThan(500);
  });

  it("appends System overrides under their own section", () => {
    const text = composeHandoffPrompt({
      ...base,
      lang: "ru",
      surface: "agent",
      systemOverridesNote: "Переопределения Studio:\n- accent: #3D5AFE",
    });
    expect(text).toContain("Переопределения Studio");
    expect(text).toContain("#3D5AFE");
  });
});
