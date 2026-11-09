import { describe, expect, it } from "vitest";
import {
  composeHandoffPrompt,
  composeHandoffSections,
  estimatePromptChars,
} from "@/features/studio/compose-prompt";

const base = {
  styleId: "swiss-international",
  styleTitle: "Swiss International",
  templateId: "saas-landing",
  templateTitle: "SaaS-лендинг",
  templateSections: [
    { id: "hero", title: "Hero" },
    { id: "pricing", title: "Pricing" },
  ],
  stylePrompt: "# Style rules\n\nUse tokens.",
  productName: "",
  pageBrief: "",
} as const;

describe("composeHandoffPrompt", () => {
  it("assembles style-only handoff without template section outline", () => {
    const text = composeHandoffPrompt({
      ...base,
      lang: "ru",
      surface: "agent",
      productName: "Нордлайн",
      pageBrief: "CRM для команд. CTA: Начать бесплатно.",
    });

    expect(text).toContain("## Роль");
    expect(text).toContain("## Продукт");
    expect(text).toContain("Нордлайн");
    expect(text).toContain("CRM для команд");
    expect(text).toContain("# Style rules");
    expect(text).toContain("## Чеклист передачи");
    expect(text).toContain("не задаёт структуру");
    expect(text).not.toContain("## Каркас страницы");
    expect(text).not.toContain("1. hero — Hero");
    expect(text).not.toContain("saas-landing");
  });

  it("asks agent to reuse chat structure when brief is empty", () => {
    const text = composeHandoffPrompt({
      ...base,
      lang: "en",
      surface: "agent",
    });
    expect(text).toContain("chat already has page structure");
    expect(text).not.toContain("Page outline");
  });

  it("wraps constructor surface without template block list", () => {
    const sections = composeHandoffSections({
      ...base,
      lang: "ru",
      surface: "constructor",
    });
    expect(sections.map((s) => s.id)).toEqual(["role", "product", "style", "checklist"]);
    expect(sections[0]?.body).toContain("конструкторе");
    expect(sections[0]?.body).toContain("только визуальную систему");
    expect(sections[2]?.body).toContain("Use tokens");
  });

  it("counts characters for the modal estimate", () => {
    const text = composeHandoffPrompt({ ...base, lang: "ru", surface: "agent" });
    expect(estimatePromptChars(text)).toBe(text.length);
    expect(estimatePromptChars(text)).toBeGreaterThan(100);
  });

  it("appends System overrides under the style section", () => {
    const text = composeHandoffPrompt({
      ...base,
      lang: "ru",
      surface: "agent",
      systemOverridesNote: "Переопределения Studio:\n- accent: #3D5AFE",
    });
    expect(text).toContain("# Style rules");
    expect(text).toContain("Переопределения Studio");
    expect(text).toContain("#3D5AFE");
  });
});
