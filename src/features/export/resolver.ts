import { existsSync, readFileSync } from "node:fs";
import { loadStyleBundle, type LoadedStyleBundle } from "@/core/content";
import { styleFilePath } from "@/core/content/paths";
import type { PackKind } from "@/core/schemas";

export type ResolvedMarkdown = {
  designMd?: string;
  tokensMd?: string;
  agentInstructions?: string;
  promptRu?: string;
  promptEn?: string;
  promptConstructorRu?: string;
  promptConstructorEn?: string;
  rulesMd?: string;
  changelogMd?: string;
  overviewMd?: string;
};

export type ResolvedExportSource = {
  packKind: PackKind;
  bundle: LoadedStyleBundle;
  markdown: ResolvedMarkdown;
};

function readOptionalUtf8(styleId: string, fileName: string): string | undefined {
  const full = styleFilePath(styleId, fileName);
  if (!existsSync(full)) return undefined;
  return readFileSync(full, "utf8");
}

/**
 * Resolve export inputs from Content Engine SSOT only (published styles).
 */
export function resolveExportSource(styleId: string, packKind: PackKind): ResolvedExportSource {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(styleId)) {
    throw new ExportResolveError("invalid_style_id", `Invalid style id: ${styleId}`);
  }

  let bundle: LoadedStyleBundle;
  try {
    bundle = loadStyleBundle(styleId);
  } catch (error) {
    throw new ExportResolveError(
      "style_not_found",
      error instanceof Error ? error.message : "Style not found",
    );
  }

  if (bundle.style.status !== "published") {
    throw new ExportResolveError(
      "unpublished",
      `Style "${styleId}" is not published (status: ${bundle.style.status})`,
    );
  }

  const markdown: ResolvedMarkdown = {
    designMd: readOptionalUtf8(styleId, "DESIGN.md"),
    tokensMd: readOptionalUtf8(styleId, "TOKENS.md"),
    agentInstructions: readOptionalUtf8(styleId, "AGENT-INSTRUCTIONS.md"),
    promptRu: readOptionalUtf8(styleId, "prompt.ru.md"),
    promptEn: readOptionalUtf8(styleId, "prompt.en.md"),
    promptConstructorRu: readOptionalUtf8(styleId, "prompt.constructor.ru.md"),
    promptConstructorEn: readOptionalUtf8(styleId, "prompt.constructor.en.md"),
    rulesMd: readOptionalUtf8(styleId, "rules.md"),
    changelogMd: readOptionalUtf8(styleId, "CHANGELOG.md"),
    overviewMd: readOptionalUtf8(styleId, "overview.md"),
  };

  return { packKind, bundle, markdown };
}

export class ExportResolveError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "ExportResolveError";
    this.code = code;
  }
}
