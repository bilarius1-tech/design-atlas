import type {
  ComponentsDefinition,
  StyleDefinition,
  StyleTokens,
  TypographyDefinition,
} from "@/core/schemas";

export type DesignSpecLang = "ru" | "en";
export type DesignSpecSurface = "agent" | "constructor";

export type DesignSpecSource = {
  style: Pick<
    StyleDefinition,
    | "id"
    | "version"
    | "title"
    | "shortDescription"
    | "philosophy"
    | "bestUseCases"
    | "avoidFor"
    | "fontFamilies"
  >;
  tokens: StyleTokens;
  typography?: TypographyDefinition;
  components?: ComponentsDefinition;
  rulesMarkdown?: string;
};

export type ComposeDesignSpecInput = {
  source: DesignSpecSource;
  lang: DesignSpecLang;
  surface: DesignSpecSurface;
  productName?: string;
  pageBrief?: string;
  systemOverridesNote?: string;
};

export type DesignSpecSection = {
  id: string;
  label: string;
  body: string;
};

export type ComposedDesignSpec = {
  markdown: string;
  tokens: StyleTokens;
  tokensJson: StyleTokens;
  typography?: TypographyDefinition;
  sections: DesignSpecSection[];
};

const ROLE_ORDER = [
  "display",
  "h1",
  "h2",
  "h3",
  "h4",
  "bodyLarge",
  "body",
  "caption",
  "label",
  "quote",
  "code",
] as const;

const COPY = {
  ru: {
    taskLabel: "Задача",
    productLabel: "Продукт",
    colorsLabel: "Цвета",
    shapeLabel: "Форма и отступы",
    typeLabel: "Шрифты и типографика",
    componentsLabel: "Компоненты",
    doLabel: "Делай",
    dontLabel: "Не делай",
    exampleLabel: "Короткий пример",
    checkLabel: "Проверка перед сдачей",
    overridesLabel: "Переопределения",
    title: (name: string, id: string, version: string) =>
      `# Дизайн-спецификация: ${name} (${id})\n\nВерсия стиля ${version}. Это полный набор правил. Других файлов и сайтов не требуется. Не заходи на внешние страницы «за уточнениями».`,
    taskAgent: [
      "Внедри эту дизайн-систему в текущий проект — сайт стоматологии, строительной компании, магазина, школы или любой другой продукт пользователя.",
      "Если в чате уже есть структура, тексты и CTA — не меняй состав блоков, только оформление.",
      "Если структуры ещё нет — предложи простой каркас под описанный продукт (шапка, первый экран, 2–4 смысловых блока, факты или отзыв, вопрос-ответ, контакт или заявка). Не копируй чужие демо-тексты и не выдумывай цифры, награды и бренды.",
      "Создай в проекте файлы токенов (например, `tokens.css` или `tokens.json`) и при желании `DESIGN.md`, перенеся значения только из этого текста. Дальше верстай, опираясь на эти файлы. Не выдумывай вторую палитру.",
    ].join("\n\n"),
    taskConstructor: [
      "Внедри эту дизайн-систему в текущий проект в конструкторе (Тильда, LPmotor и подобные) — сайт стоматологии, строительной компании, магазина или любой другой продукт пользователя.",
      "Если блоки и порядок уже заданы — не переставляй их, меняй только оформление: цвета, шрифты, отступы, скругления, тени, атмосферу.",
      "Если структуры ещё нет — собери простой каркас под продукт пользователя. Не выдумывай цифры, награды и чужие бренды.",
      "Сохрани в проекте конструктора заметку или файл с токенами из этого текста и не подменяй их «на глаз».",
    ].join("\n\n"),
    productEmpty:
      "Название и факты ниже не заполнены. Возьми их из чата с автором. Если в чате ничего нет — спроси, не выдумывай бренд и цифры.",
    productNamed: (name: string, brief: string) =>
      [`Название / продукт: ${name || "—"}`, brief.trim() ? `Бриф:\n${brief.trim()}` : "Бриф не заполнен — бери факты из чата с автором."]
        .join("\n"),
    colorsIntro: "Используй только эти значения. Не подставляй другие hex «для красоты».",
    fontBan: [
      "Не подключай Google Fonts и внешние CDN: `fonts.googleapis.com`, `fonts.gstatic.com`, cdnjs, jsDelivr, unpkg и подобные.",
      "Шрифты — только системный запасной ряд или файлы, лежащие в самом проекте (self-host).",
      "Сайт должен открываться в России без VPN.",
    ].join("\n"),
    typeIntro: "Иерархия — размером и жирностью, цвет во вторую очередь.",
    componentsIntro:
      "Реализуй настоящие состояния: hover, видимый фокус с клавиатуры (`:focus-visible`), disabled, loading, ошибка в форме. Никакой «мёртвой» кнопки без действия.",
    checkItems: [
      "Цвета, шрифты и отступы совпадают с таблицами выше один-в-один.",
      "В проекте есть свои файлы токенов, созданные из этого текста.",
      "Десктоп и телефон, без горизонтальной прокрутки.",
      "Фокус с клавиатуры виден, текст читается.",
      "Нет запросов к Google Fonts и чужим CDN.",
      "Нет выдуманных цифр, наград и чужих брендов.",
    ],
  },
  en: {
    taskLabel: "Task",
    productLabel: "Product",
    colorsLabel: "Colors",
    shapeLabel: "Shape and spacing",
    typeLabel: "Fonts and typography",
    componentsLabel: "Components",
    doLabel: "Do",
    dontLabel: "Don't",
    exampleLabel: "Short example",
    checkLabel: "Acceptance checks",
    overridesLabel: "Overrides",
    title: (name: string, id: string, version: string) =>
      `# Design specification: ${name} (${id})\n\nStyle version ${version}. This document is complete. No other files or websites are required. Do not visit external pages “for clarification”.`,
    taskAgent: [
      "Apply this design system to the current project — a dental clinic, a construction company, a shop, a school, or any other product the user is building.",
      "If the chat already has structure, copy and CTAs, do not reshuffle the blocks: apply the visual system only.",
      "If there is no structure yet, propose a simple frame for the described product (header, first screen, 2–4 content sections, proof or a quote, FAQ, contact or signup). Do not copy third-party demo copy and do not invent metrics, awards, or brands.",
      "Create token files in the project (for example `tokens.css` or `tokens.json`) and, if useful, a `DESIGN.md`, copying values only from this text. Then build against those files. Do not invent a second palette.",
    ].join("\n\n"),
    taskConstructor: [
      "Apply this design system to the current project in a site constructor (Tilda, LPmotor, and similar) — a dental clinic, a construction company, a shop, or any other product the user is building.",
      "If blocks and order are already set, do not rearrange them: change only the visual system (color, type, spacing, radius, shadow, atmosphere).",
      "If there is no structure yet, assemble a simple frame for the user's product. Do not invent metrics, awards, or third-party brands.",
      "Save a note or token file in the constructor project from this text and do not replace values by eye.",
    ].join("\n\n"),
    productEmpty:
      "Name and facts below are empty. Take them from the author's chat. If the chat has none, ask — do not invent a brand or metrics.",
    productNamed: (name: string, brief: string) =>
      [`Product name: ${name || "—"}`, brief.trim() ? `Brief:\n${brief.trim()}` : "Brief is empty — take facts from the author's chat."]
        .join("\n"),
    colorsIntro: "Use only these values. Do not invent other hex codes “to make it nicer”.",
    fontBan: [
      "Do not load Google Fonts or external CDNs: `fonts.googleapis.com`, `fonts.gstatic.com`, cdnjs, jsDelivr, unpkg, and the like.",
      "Fonts must be a system fallback stack or files self-hosted in the project.",
      "The site must open in Russia without a VPN.",
    ].join("\n"),
    typeIntro: "Build hierarchy with size and weight first; color comes second.",
    componentsIntro:
      "Implement real states: hover, a visible keyboard focus (`:focus-visible`), disabled, loading, and form validation errors. No dead “Click here” buttons.",
    checkItems: [
      "Colors, fonts, and spacing match the tables above one-to-one.",
      "The project has its own token files created from this text.",
      "Desktop and mobile, with no horizontal scroll.",
      "Keyboard focus is visible and text is readable.",
      "There are no requests to Google Fonts or third-party CDNs.",
      "No invented metrics, awards, or third-party brands.",
    ],
  },
} as const;

export function extractRuleLists(markdown: string | undefined): { dos: string[]; donts: string[] } {
  if (!markdown?.trim()) return { dos: [], donts: [] };

  const dos: string[] = [];
  const donts: string[] = [];
  let bucket: "do" | "dont" | null = null;

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (/^##\s+(do)\b/i.test(line)) {
      bucket = "do";
      continue;
    }
    if (/^##\s+(don'?t|do not)\b/i.test(line)) {
      bucket = "dont";
      continue;
    }
    if (/^##\s+/.test(line)) {
      bucket = null;
      continue;
    }
    const item = line.replace(/^\d+\.\s+/, "").replace(/^[-*]\s+/, "").trim();
    if (!item || !bucket) continue;
    if (bucket === "do") dos.push(item);
    else donts.push(item);
  }

  return { dos, donts };
}

function bullet(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function colorLines(tokens: StyleTokens, lang: DesignSpecLang): string[] {
  const c = tokens.colors;
  const labels =
    lang === "ru"
      ? {
          background: "Фон страницы",
          surface: "Поверхность (карточка, панель)",
          text: "Текст",
          muted: "Второстепенный текст",
          primary: "Основное действие / primary",
          accent: "Акцент / сигнал",
          accentSecondary: "Второй акцент",
          border: "Линии / border",
        }
      : {
          background: "Page background",
          surface: "Surface (card, panel)",
          text: "Text",
          muted: "Muted text",
          primary: "Primary action",
          accent: "Accent / signal",
          accentSecondary: "Secondary accent",
          border: "Lines / border",
        };
  const lines = [
    `- ${labels.background}: \`${c.background}\``,
    `- ${labels.surface}: \`${c.surface}\``,
    `- ${labels.text}: \`${c.text}\``,
    `- ${labels.muted}: \`${c.muted}\``,
    `- ${labels.primary}: \`${c.primary}\``,
    `- ${labels.accent}: \`${c.accent}\``,
  ];
  if (c.accentSecondary) {
    lines.push(`- ${labels.accentSecondary}: \`${c.accentSecondary}\``);
  }
  lines.push(`- ${labels.border}: \`${c.border}\``);
  return lines;
}

function shapeLines(tokens: StyleTokens, lang: DesignSpecLang): string[] {
  const g = tokens.geometry;
  const s = tokens.spacing;
  const e = tokens.effects;
  if (lang === "ru") {
    const lines = [
      `- Скругление по умолчанию: \`${g.radius}\``,
      g.radiusButton ? `- Скругление кнопок: \`${g.radiusButton}\`` : "",
      g.radiusCard ? `- Скругление карточек: \`${g.radiusCard}\`` : "",
      `- Толщина линии: \`${g.borderWidth}\``,
      `- Тень: \`${e.shadow}\``,
      e.shadowInset ? `- Внутренняя тень: \`${e.shadowInset}\`` : "",
      e.blur ? `- Размытие: \`${e.blur}\`` : "",
      `- Переход: \`${e.transition}\``,
      `- Шаг отступа: \`${s.unit}px\``,
      `- Между секциями: \`${s.section}\``,
      `- Ширина контейнера: \`${s.container}\``,
      s.gap ? `- Зазор сетки: \`${s.gap}\`` : "",
    ];
    return lines.filter(Boolean);
  }
  return [
    `- Default radius: \`${g.radius}\``,
    g.radiusButton ? `- Button radius: \`${g.radiusButton}\`` : "",
    g.radiusCard ? `- Card radius: \`${g.radiusCard}\`` : "",
    `- Border width: \`${g.borderWidth}\``,
    `- Shadow: \`${e.shadow}\``,
    e.shadowInset ? `- Inset shadow: \`${e.shadowInset}\`` : "",
    e.blur ? `- Blur: \`${e.blur}\`` : "",
    `- Transition: \`${e.transition}\``,
    `- Spacing unit: \`${s.unit}px\``,
    `- Section gap: \`${s.section}\``,
    `- Container width: \`${s.container}\``,
    s.gap ? `- Grid gap: \`${s.gap}\`` : "",
  ].filter(Boolean);
}

function typographyBody(source: DesignSpecSource, lang: DesignSpecLang, copy: (typeof COPY)[DesignSpecLang]): string {
  const tokens = source.tokens;
  const typography = source.typography;
  const heading = typography?.families.heading
    ? `${typography.families.heading}, ${typography.families.fallbacks.join(", ")}`
    : tokens.typography.heading;
  const body = typography?.families.body
    ? typography.families.body === typography.families.heading
      ? heading
      : `${typography.families.body}, ${typography.families.fallbacks.join(", ")}`
    : tokens.typography.body;
  const mono = typography?.families.mono ?? tokens.typography.mono;
  const scale = Object.entries(tokens.typography.scale)
    .map(([key, value]) => `- ${key}: \`${value}\``)
    .join("\n");

  const roleLines = typography
    ? ROLE_ORDER.map((id) => {
        const role = typography.roles[id];
        const tracking = role.letterSpacing ? `, tracking ${role.letterSpacing}` : "";
        return `- **${id}**: family ${role.family}, ${role.size}, weight ${role.weight}, line-height ${role.lineHeight}${tracking}`;
      }).join("\n")
    : lang === "ru"
      ? "_Отдельная таблица ролей не задана — используй шкалу выше._"
      : "_No role table — use the scale above._";

  const extraRules = typography?.rules?.length ? `\n\n${bullet(typography.rules)}` : "";
  const extraConstraints = typography?.constraints?.length
    ? `\n\n${bullet(typography.constraints)}`
    : "";

  const familyBlock =
    lang === "ru"
      ? [
          `- Заголовки: \`${heading}\``,
          `- Текст: \`${body}\``,
          `- Моноширинный: \`${mono}\` (системный \`ui-monospace\` допустим как запасной).`,
        ].join("\n")
      : [
          `- Headings: \`${heading}\``,
          `- Body: \`${body}\``,
          `- Mono: \`${mono}\` (system \`ui-monospace\` is an acceptable fallback).`,
        ].join("\n");

  return `${copy.typeIntro}\n\n${familyBlock}\n\n${copy.fontBan}\n\n**${lang === "ru" ? "Шкала (источник правды)" : "Scale (source of truth)"}**\n\n${scale}\n\n**${lang === "ru" ? "Роли" : "Roles"}**\n\n${roleLines}${extraRules}${extraConstraints}`;
}

function componentsBody(source: DesignSpecSource, lang: DesignSpecLang, copy: (typeof COPY)[DesignSpecLang]): string {
  const groups = source.components?.groups ?? [];
  const list = groups.length
    ? groups
        .map((group) => {
          const items = group.items.map((item) => `  - ${item}`).join("\n");
          const notes = group.notes ? `\n\n_${group.notes}_` : "";
          return `### ${group.label}\n\n${items}${notes}`;
        })
        .join("\n\n")
    : lang === "ru"
      ? "Отдельный список компонентов не задан. Собери базовые кнопки, поля, карточки и навигацию в этой геометрии."
      : "No component list is provided. Build basic buttons, fields, cards, and navigation in this geometry.";

  return `${copy.componentsIntro}\n\n${list}`;
}

function exampleBody(tokens: StyleTokens, lang: DesignSpecLang): string {
  const radius = tokens.geometry.radiusButton ?? tokens.geometry.radius;
  const cardRadius = tokens.geometry.radiusCard ?? tokens.geometry.radius;
  if (lang === "ru") {
    return [
      `Главная кнопка: фон \`${tokens.colors.primary}\`, текст контрастный к заливке, скругление \`${radius}\`, тень кнопки по общему правилу (\`${tokens.effects.shadow}\`), внутренние поля примерно 12–16px.`,
      `Карточка, если нужна: поверхность \`${tokens.colors.surface}\`, линия \`${tokens.geometry.borderWidth} ${tokens.colors.border}\`, скругление \`${cardRadius}\`, тень \`${tokens.effects.shadow}\`.`,
    ].join("\n\n");
  }
  return [
    `Primary button: background \`${tokens.colors.primary}\`, contrasting label, radius \`${radius}\`, shadow per the general rule (\`${tokens.effects.shadow}\`), padding around 12–16px.`,
    `Card, if needed: surface \`${tokens.colors.surface}\`, border \`${tokens.geometry.borderWidth} ${tokens.colors.border}\`, radius \`${cardRadius}\`, shadow \`${tokens.effects.shadow}\`.`,
  ].join("\n\n");
}

/**
 * One self-contained design-spec for agents and constructors.
 * Tokens are the numeric source of truth. The text never requires
 * DESIGN.md / tokens.json / a live site as additional reading.
 */
export function composeDesignSpec(input: ComposeDesignSpecInput): ComposedDesignSpec {
  const { source, lang, surface } = input;
  const copy = COPY[lang];
  const title = source.style.title[lang];
  const { dos, donts } = extractRuleLists(source.rulesMarkdown);
  const philosophy = source.style.philosophy[lang];
  const short = source.style.shortDescription[lang];

  const doItems = [
    ...dos,
    ...(source.style.bestUseCases ?? []).map((item) =>
      lang === "ru" ? `Хорошо подходит: ${item}` : `Best used for: ${item}`,
    ),
  ];
  const dontItems = [
    ...donts,
    ...(source.style.avoidFor ?? []).map((item) =>
      lang === "ru" ? `Не используй, если: ${item}` : `Avoid when: ${item}`,
    ),
  ];

  const productBody =
    input.productName?.trim() || input.pageBrief?.trim()
      ? copy.productNamed(input.productName?.trim() ?? "", input.pageBrief ?? "")
      : copy.productEmpty;

  const atmosphere = [short, philosophy].filter(Boolean).join("\n\n");

  const sections: DesignSpecSection[] = [
    {
      id: "task",
      label: copy.taskLabel,
      body: surface === "constructor" ? copy.taskConstructor : copy.taskAgent,
    },
    {
      id: "product",
      label: copy.productLabel,
      body: productBody,
    },
    {
      id: "colors",
      label: copy.colorsLabel,
      body: `${atmosphere}\n\n${copy.colorsIntro}\n\n${colorLines(source.tokens, lang).join("\n")}`,
    },
    {
      id: "shape",
      label: copy.shapeLabel,
      body: shapeLines(source.tokens, lang).join("\n"),
    },
    {
      id: "typography",
      label: copy.typeLabel,
      body: typographyBody(source, lang, copy),
    },
    {
      id: "components",
      label: copy.componentsLabel,
      body: componentsBody(source, lang, copy),
    },
    {
      id: "do",
      label: copy.doLabel,
      body: doItems.length ? bullet(doItems) : lang === "ru" ? "Следуй таблицам токенов выше." : "Follow the token tables above.",
    },
    {
      id: "dont",
      label: copy.dontLabel,
      body: dontItems.length
        ? bullet(dontItems)
        : lang === "ru"
          ? "Не выдумывай вторую палитру и не подключай Google Fonts."
          : "Do not invent a second palette and do not load Google Fonts.",
    },
    {
      id: "example",
      label: copy.exampleLabel,
      body: exampleBody(source.tokens, lang),
    },
    {
      id: "check",
      label: copy.checkLabel,
      body: bullet(copy.checkItems),
    },
  ];

  const overrides = input.systemOverridesNote?.trim();
  if (overrides) {
    sections.push({ id: "overrides", label: copy.overridesLabel, body: overrides });
  }

  const markdown = [
    copy.title(title, source.style.id, source.style.version),
    ...sections.map((section) => `## ${section.label}\n\n${section.body}`),
  ].join("\n\n");

  return {
    markdown,
    tokens: source.tokens,
    tokensJson: source.tokens,
    typography: source.typography,
    sections,
  };
}

export function assertSelfContainedPrompt(markdown: string): string[] {
  const problems: string[] = [];
  if (/design\.vaybik\.ru/i.test(markdown)) {
    problems.push("mentions design.vaybik.ru");
  }
  if (/design-atlas-wine\.vercel\.app/i.test(markdown)) {
    problems.push("mentions the old Vercel host");
  }
  if (/в Design Pack\s*\(/i.test(markdown) || /in the Design Pack\s*\(/i.test(markdown)) {
    problems.push("requires a Design Pack as extra reading");
  }
  if (/прочитай\s+DESIGN\.md/i.test(markdown) || /read\s+DESIGN\.md/i.test(markdown)) {
    problems.push("tells the agent to read DESIGN.md as a missing file");
  }
  if (
    /прочитай(?:те)?\s+tokens\.json/i.test(markdown) ||
    /read\s+tokens\.json/i.test(markdown) ||
    /берай? значения только из `tokens\.json`/i.test(markdown) ||
    /use values only from `tokens\.json`/i.test(markdown)
  ) {
    problems.push("tells the agent to read tokens.json as a missing file");
  }
  if (/\/playground\//.test(markdown) || /\/demo\//.test(markdown)) {
    problems.push("points to Atlas playground or demo URLs");
  }
  if (!/fonts\.googleapis\.com/.test(markdown)) {
    problems.push("missing Google Fonts ban");
  }
  return problems;
}
