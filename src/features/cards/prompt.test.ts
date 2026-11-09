import { describe, expect, it } from "vitest";
import type { CardStyleDefinition } from "@/core/schemas";
import { assembleCardPrompt } from "./prompt";

const style: CardStyleDefinition = {
  schemaVersion: "1.0.0",
  id: "card-catalog",
  status: "published",
  title: { ru: "Спокойный журнал", en: "Calm editorial" },
  tag: { ru: "EDITORIAL", en: "EDITORIAL" },
  category: { ru: "Журнальный", en: "Editorial" },
  description: { ru: "desc", en: "desc" },
  kind: "catalog",
  fonts: ["Playfair Display", "Manrope"],
  colors: ["#B57956", "#7D8C72"],
  background: "#F5F1E9",
  ink: "#302B27",
  prompt: {
    ru: "Стиль с шрифтом {font} и акцентом {accent}.",
    en: "Style with font {font} and accent {accent}.",
  },
  samples: [],
  active: true,
};

describe("assembleCardPrompt", () => {
  it("substitutes font and accent and appends RU rules", () => {
    const prompt = assembleCardPrompt(style, {
      lang: "ru",
      font: "Manrope",
      accent: "#B57956",
      includeRatio: false,
      ratio: "3:4",
      useIcons: false,
      useAccentPanels: false,
      usePhotoBackground: false,
    });
    expect(prompt).toContain("Manrope");
    expect(prompt).toContain("#B57956");
    expect(prompt).not.toContain("{font}");
    expect(prompt).toContain("Правила:");
    expect(prompt).toContain("чистый студийный");
  });

  it("adds ratio and EN options when enabled", () => {
    const prompt = assembleCardPrompt(style, {
      lang: "en",
      font: "Playfair Display",
      accent: "#7D8C72",
      includeRatio: true,
      ratio: "1:1",
      useIcons: true,
      useAccentPanels: true,
      usePhotoBackground: true,
    });
    expect(prompt).toContain("Rules:");
    expect(prompt).toContain("Image aspect ratio: 1:1.");
    expect(prompt).toContain("Infographic:");
    expect(prompt).toContain("#7D8C72");
    expect(prompt).toContain("photographic scene");
  });
});
