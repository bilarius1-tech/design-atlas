export type PromptLang = "ru" | "en";
export type HandoffSurface = "agent" | "constructor";

/** Kept for Studio preview wiring; not injected into handoff prompts. */
export type TemplateSectionOutline = {
  id: string;
  title: string;
};

export type PromptOutlineSection = {
  id: "role" | "product" | "style" | "checklist";
  label: string;
  body: string;
};

export type ComposePromptInput = {
  lang: PromptLang;
  surface: HandoffSurface;
  styleId: string;
  styleTitle: string;
  /** Preview-only in Studio — never written into the handoff prompt body. */
  templateId?: string;
  templateTitle?: string;
  templateSections?: readonly TemplateSectionOutline[];
  stylePrompt: string;
  productName: string;
  pageBrief: string;
  /** Optional System drawer overrides note appended under the style body. */
  systemOverridesNote?: string;
};

const COPY = {
  ru: {
    role: "Роль",
    product: "Продукт",
    style: "Визуальная система",
    checklist: "Чеклист передачи",
    roleBody: (styleTitle: string) =>
      [
        `Примени визуальную систему «${styleTitle}» к странице, которую пользователь уже описал в чате (блоки, порядок, тексты, CTA).`,
        `Design Atlas не хостит сайт и не задаёт структуру лендинга — только стиль: цвета, типографика, отступы, радиусы, тени, плотность, атмосфера.`,
        `Не предлагай и не перестраивай чужой каркас секций. Сначала прочитай правила стиля и токены ниже / в Design Pack (DESIGN.md, tokens.json). Не выдумывай свою палитру.`,
      ].join("\n"),
    productEmpty:
      "Если в чате уже есть структура и тексты страницы — опирайся на них. Название/факты ниже не заполнены: не выдумывай бренд и цифры.",
    productNamed: (name: string, brief: string) =>
      [`Название / продукт: ${name || "—"}`, brief.trim() ? `Бриф:\n${brief.trim()}` : "Бриф: не заполнен — бери факты из чата с автором."].join(
        "\n",
      ),
    checklistBody: [
      "Структуру страницы бери из чата с пользователем — не подменяй её демо-шаблоном Atlas.",
      "Прочитай DESIGN.md и tokens.json; не подставляй произвольные hex, если есть токены.",
      "Не копируй чужие бренды и чужой UI один в один — система Atlas задаёт визуальное направление.",
      "Проверь десктоп и мобильный вид, фокус с клавиатуры и основной CTA.",
      "Сборку делай в репозитории / конструкторе пользователя — не внутри Design Atlas.",
    ].join("\n"),
    constructorWrap: (styleTitle: string) =>
      [
        `Собери страницу в конструкторе (Тильда, LPmotor и т.п.) в стиле «${styleTitle}».`,
        `Блоки и порядок уже заданы пользователем (или его агентом) — Atlas даёт только визуальную систему: палитра, шрифты, радиусы, тени, отступы, атмосфера.`,
        `Atlas не публикует сайт за вас.`,
      ].join("\n"),
  },
  en: {
    role: "Role",
    product: "Product",
    style: "Visual system",
    checklist: "Handoff checklist",
    roleBody: (styleTitle: string) =>
      [
        `Apply visual system “${styleTitle}” to the page the user already described in chat (blocks, order, copy, CTAs).`,
        `Design Atlas does not host the site and does not define landing structure — only style: color, type, spacing, radius, shadow, density, atmosphere.`,
        `Do not invent or reshuffle a section outline. Read the style rules and tokens below / in the Design Pack (DESIGN.md, tokens.json) first. Do not invent a new palette.`,
      ].join("\n"),
    productEmpty:
      "If the chat already has page structure and copy, follow that. Name/facts below are empty — do not invent brand or metrics.",
    productNamed: (name: string, brief: string) =>
      [`Product name: ${name || "—"}`, brief.trim() ? `Brief:\n${brief.trim()}` : "Brief: empty — take facts from the author’s chat."].join("\n"),
    checklistBody: [
      "Take page structure from the user’s chat — do not replace it with an Atlas demo template.",
      "Read DESIGN.md and tokens.json; do not invent hex values when tokens exist.",
      "Do not clone third-party brands or UIs — Atlas sets visual direction only.",
      "Check desktop and mobile, keyboard focus, and the primary CTA.",
      "Build in the user’s repo / constructor — not inside Design Atlas.",
    ].join("\n"),
    constructorWrap: (styleTitle: string) =>
      [
        `Build the page in a site constructor (Tilda, LPmotor, etc.) using style “${styleTitle}”.`,
        `Blocks and order are already set by the user (or their agent) — Atlas supplies only the visual system: palette, fonts, radius, shadows, spacing, atmosphere.`,
        `Atlas does not publish the site for you.`,
      ].join("\n"),
  },
} as const;

export function composeHandoffSections(input: ComposePromptInput): PromptOutlineSection[] {
  const t = COPY[input.lang];
  const productBody =
    input.productName.trim() || input.pageBrief.trim()
      ? t.productNamed(input.productName.trim(), input.pageBrief)
      : t.productEmpty;

  const styleBody = [input.stylePrompt.trim(), input.systemOverridesNote?.trim()]
    .filter((part): part is string => Boolean(part))
    .join("\n\n");

  const roleBody =
    input.surface === "constructor" ? t.constructorWrap(input.styleTitle) : t.roleBody(input.styleTitle);

  return [
    {
      id: "role",
      label: t.role,
      body: roleBody,
    },
    {
      id: "product",
      label: t.product,
      body: productBody,
    },
    {
      id: "style",
      label: t.style,
      body: styleBody,
    },
    {
      id: "checklist",
      label: t.checklist,
      body: t.checklistBody,
    },
  ];
}

export function composeHandoffPrompt(input: ComposePromptInput): string {
  return composeHandoffSections(input)
    .map((section) => `## ${section.label}\n\n${section.body}`)
    .join("\n\n");
}

export function estimatePromptChars(text: string): number {
  return text.length;
}
