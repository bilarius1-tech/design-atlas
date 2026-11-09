import path from "node:path";

export function getRepoRoot(): string {
  return path.resolve(/* turbopackIgnore: true */ process.cwd());
}

export function getContentRoot(): string {
  return path.join(getRepoRoot(), "content");
}

export function getStylesRoot(): string {
  return path.join(getContentRoot(), "styles");
}

export function getTemplatesRoot(): string {
  return path.join(getContentRoot(), "templates");
}

export function getContentIndexPath(): string {
  return path.join(getContentRoot(), "index.json");
}

export const STYLE_JSON_FILES = [
  "style.json",
  "tokens.json",
  "typography.json",
  "components.json",
  "demo.json",
] as const;

export const STYLE_MARKDOWN_FILES = [
  "rules.md",
  "prompt.ru.md",
  "prompt.en.md",
  "prompt.constructor.ru.md",
  "prompt.constructor.en.md",
  "DESIGN.md",
  "TOKENS.md",
  "AGENT-INSTRUCTIONS.md",
  "CHANGELOG.md",
] as const;

export type StyleJsonFile = (typeof STYLE_JSON_FILES)[number];
export type StyleMarkdownFile = (typeof STYLE_MARKDOWN_FILES)[number];

export function styleDirectory(styleId: string): string {
  return path.join(getStylesRoot(), styleId);
}

export function styleFilePath(styleId: string, fileName: string): string {
  return path.join(styleDirectory(styleId), fileName);
}

export function templateDirectory(templateId: string): string {
  return path.join(getTemplatesRoot(), templateId);
}

export function templateFilePath(templateId: string, fileName: string): string {
  return path.join(templateDirectory(templateId), fileName);
}
