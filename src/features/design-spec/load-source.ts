import { existsSync, readFileSync } from "node:fs";
import { loadStyleBundle } from "@/core/content";
import { styleFilePath } from "@/core/content/paths";
import type { DesignSpecSource } from "./compose-design-spec";

export function loadDesignSpecSource(styleId: string): DesignSpecSource {
  const bundle = loadStyleBundle(styleId);
  const rulesPath = styleFilePath(styleId, "rules.md");
  const rulesMarkdown = existsSync(rulesPath) ? readFileSync(rulesPath, "utf8") : undefined;

  return {
    style: {
      id: bundle.style.id,
      version: bundle.style.version,
      title: bundle.style.title,
      shortDescription: bundle.style.shortDescription,
      philosophy: bundle.style.philosophy,
      bestUseCases: bundle.style.bestUseCases,
      avoidFor: bundle.style.avoidFor,
      fontFamilies: bundle.style.fontFamilies,
    },
    tokens: bundle.tokens,
    typography: bundle.typography,
    components: bundle.components,
    rulesMarkdown,
  };
}

export function buildAgentInstructions(lang: "ru" | "en"): string {
  if (lang === "ru") {
    return `# Инструкция для агента

1. Открой \`DESIGN-SPEC.ru.md\` (или \`prompts/prompt.ru.md\` — это тот же текст). Этого одного файла достаточно.
2. Внедри дизайн-систему в текущий проект пользователя.
3. Создай в проекте \`tokens.css\` или \`tokens.json\` и при желании \`DESIGN.md\`, перенеся значения из спецификации.
4. Не подключай Google Fonts и внешние CDN. Шрифты — только системный запас или файлы в проекте.
`;
  }
  return `# Agent instructions

1. Open \`DESIGN-SPEC.en.md\` (or \`prompts/prompt.en.md\` — the same text). That single file is enough.
2. Apply the design system to the user's current project.
3. Create \`tokens.css\` or \`tokens.json\` and, if useful, \`DESIGN.md\` in the project, copying values from the specification.
4. Do not load Google Fonts or external CDNs. Fonts must be a system fallback or files in the project.
`;
}
