import type { CardStyleDefinition } from "@/core/schemas";

export const CARD_RULES_RU =
  "Правила: используй только текст, переданный пользователем, буква в букву, без опечаток и сокращений. Не придумывай цифры, размеры и характеристики, которых нет в тексте. Не меняй форму, цвет, пропорции и детали товара на фото. Текст должен быть крупным и читаемым на мобильном экране.";

export const CARD_RULES_EN =
  "Rules: use only the text provided by the user, exactly as written, with no typos or abbreviations. Do not invent numbers, dimensions, or product specifications. Do not alter the shape, color, proportions, or details of the product in the photo. Make all text large and readable on a mobile screen.";

export type CardPromptOptions = {
  lang: "ru" | "en";
  font: string;
  accent: string;
  includeRatio: boolean;
  ratio: string;
  useIcons: boolean;
  useAccentPanels: boolean;
  usePhotoBackground: boolean;
};

export function assembleCardPrompt(
  style: CardStyleDefinition,
  options: CardPromptOptions,
): string {
  const body = (options.lang === "ru" ? style.prompt.ru : style.prompt.en)
    .replaceAll("{font}", options.font)
    .replaceAll("{accent}", options.accent);

  let result = `${body}\n\n${options.lang === "ru" ? CARD_RULES_RU : CARD_RULES_EN}`;

  if (options.useIcons) {
    result +=
      "\n" +
      (options.lang === "ru"
        ? "Инфографика: используй простые, единообразные пиктограммы рядом с характеристиками и преимуществами. Каждая пиктограмма должна соответствовать только предоставленной информации; не добавляй новые свойства или обещания."
        : "Infographic: use simple, consistent icons next to specifications and benefits. Each icon must represent only information the user provided; do not add new features or claims.");
  }

  if (options.useAccentPanels) {
    result +=
      "\n" +
      (options.lang === "ru"
        ? `Выделяй важные характеристики и преимущества небольшими плашками или подложками акцентного цвета ${options.accent}. Сохраняй высокий контраст и читаемость; не перегружай макет плашками.`
        : `Highlight key specifications and benefits with small labels or panels in the accent color ${options.accent}. Maintain strong contrast and readability; do not overcrowd the layout with panels.`);
  }

  result +=
    "\n" +
    (options.lang === "ru"
      ? options.usePhotoBackground
        ? "Фон: используй тематическую фотосцену, естественно связанную с товаром и его применением по описанию. Сохраняй выбранную эстетику стиля; не добавляй отвлекающие предметы или вымышленные свойства товара. Товар остаётся главным и полностью различимым."
        : "Фон: чистый студийный или графический фон в рамках выбранного стиля, без тематической фотосцены и отвлекающих предметов."
      : options.usePhotoBackground
        ? "Background: use a photographic scene naturally related to the product and its use as described by the user. Keep the selected visual style; do not add distracting props or fictional product features. The product remains the clear, fully visible focal point."
        : "Background: use a clean studio or graphic background that fits the selected style, with no themed photo scene or distracting props.");

  if (options.includeRatio) {
    result +=
      "\n" +
      (options.lang === "ru"
        ? `Соотношение сторон изображения: ${options.ratio}.`
        : `Image aspect ratio: ${options.ratio}.`);
  }

  return result;
}
