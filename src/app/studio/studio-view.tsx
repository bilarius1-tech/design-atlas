import {
  listStyleIdsFromDisk,
  listTemplateIdsFromDisk,
  loadPageTemplate,
  loadStyleBundle,
  templateToDemoDefinition,
} from "@/core/content";
import { styleFilePath } from "@/core/content/paths";
import { StudioSidebar, StudioWorkspace } from "@/features/studio";
import { existsSync, readFileSync } from "node:fs";
import { notFound } from "next/navigation";

type StudioViewProps = {
  searchParams: Promise<{ template?: string; style?: string }>;
};

type PromptFileName =
  | "prompt.ru.md"
  | "prompt.en.md"
  | "prompt.constructor.ru.md"
  | "prompt.constructor.en.md";

function readPrompt(styleId: string, fileName: PromptFileName): string {
  const full = styleFilePath(styleId, fileName);
  if (!existsSync(full)) {
    return `# Missing ${fileName}\n\nPrompt file not found for ${styleId}.`;
  }
  return readFileSync(full, "utf8");
}

function isDarkBackground(hex: string): boolean {
  const raw = hex.replace("#", "").trim();
  if (raw.length < 6) return false;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return false;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.45;
}

export async function StudioView({ searchParams }: StudioViewProps) {
  const params = await searchParams;
  const templateIds = listTemplateIdsFromDisk();
  const styleIds = listStyleIdsFromDisk().filter((id) => {
    try {
      return loadStyleBundle(id).style.status === "published";
    } catch {
      return false;
    }
  });

  if (templateIds.length === 0 || styleIds.length === 0) {
    notFound();
  }

  const templateId =
    params.template && templateIds.includes(params.template) ? params.template : templateIds[0]!;
  const styleId = params.style && styleIds.includes(params.style) ? params.style : styleIds[0]!;

  const template = loadPageTemplate(templateId);
  const bundle = loadStyleBundle(styleId);
  const demo = templateToDemoDefinition(template, styleId);
  const promptRu = readPrompt(styleId, "prompt.ru.md");
  const promptEn = readPrompt(styleId, "prompt.en.md");
  const promptConstructorRu = readPrompt(styleId, "prompt.constructor.ru.md");
  const promptConstructorEn = readPrompt(styleId, "prompt.constructor.en.md");

  const templates = templateIds.map((id) => {
    const item = loadPageTemplate(id);
    return {
      id,
      title: item.title.ru,
      description: item.shortDescription.ru,
    };
  });

  const styles = styleIds.map((id) => {
    const item = loadStyleBundle(id);
    return {
      id,
      title: item.style.title.ru,
      description: item.style.shortDescription.ru,
      colors: {
        background: item.tokens.colors.background,
        surface: item.tokens.colors.surface,
        text: item.tokens.colors.text,
        primary: item.tokens.colors.primary,
        accent: item.tokens.colors.accent,
        border: item.tokens.colors.border,
      },
      geometry: {
        radius: item.tokens.geometry.radius,
        borderWidth: item.tokens.geometry.borderWidth,
      },
      typography: {
        heading: item.tokens.typography.heading,
        body: item.tokens.typography.body,
      },
      effects: {
        shadow: item.tokens.effects.shadow,
      },
    };
  });

  const modeLabel = isDarkBackground(bundle.tokens.colors.background) ? "Dark" : "Light";

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col border-y border-border bg-background lg:flex-row">
      <StudioSidebar
        templates={templates}
        styles={styles}
        templateId={templateId}
        styleId={styleId}
      />

      <StudioWorkspace
        templateId={templateId}
        templateTitle={template.title.ru}
        styleId={styleId}
        styleTitle={bundle.style.title.ru}
        styleDescription={bundle.style.shortDescription.ru}
        styleIds={styleIds}
        styles={styles}
        promptRu={promptRu}
        promptEn={promptEn}
        promptConstructorRu={promptConstructorRu}
        promptConstructorEn={promptConstructorEn}
        modeLabel={modeLabel}
        tokens={bundle.tokens}
        demo={demo}
      />
    </div>
  );
}
