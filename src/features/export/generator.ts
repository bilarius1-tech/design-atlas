import type { ExportManifest, PackKind, StyleDefinition, StyleTokens } from "@/core/schemas";
import { GENERATOR_VERSION, PACK_FORMAT, PACK_FORMAT_VERSION } from "./constants";
import { sha256Hex } from "./checksum";
import { packIncludes } from "./pack-definitions";
import { sanitizePackPath } from "./path-sanitize";
import type { ResolvedExportSource } from "./resolver";
import { tokensSummaryForReadme, tokensToExportCss } from "./tokens-css";

export type PackFileMap = Map<string, Uint8Array>;

export type GeneratedPack = {
  rootDir: string;
  packKind: PackKind;
  files: PackFileMap;
  manifest: ExportManifest;
};

function utf8(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function stableJson(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function packRootName(style: StyleDefinition, kind: PackKind): string {
  return `design-atlas-${style.slug}-v${style.version}-${kind}`;
}

function buildPhilosophyMarkdown(style: StyleDefinition): string {
  return `# Style philosophy · ${style.title.en}

## RU

${style.philosophy.ru}

## EN

${style.philosophy.en}

## Best use cases

${style.bestUseCases.map((item) => `- ${item}`).join("\n")}

## Avoid for

${style.avoidFor.map((item) => `- ${item}`).join("\n")}

## Font families (declared)

${style.fontFamilies.map((item) => `- ${item}`).join("\n")}
`;
}

function buildTypographyMarkdown(source: ResolvedExportSource): string {
  const { bundle } = source;
  const roles = bundle.typography?.roles;
  const scale = bundle.tokens.typography.scale;
  const roleLines = roles
    ? Object.entries(roles)
        .map(([id, role]) => `- **${id}**: ${role.size} / ${role.lineHeight} / weight ${role.weight}`)
        .join("\n")
    : "_No typography.json roles — use token scale._";

  return `# Typography · ${bundle.style.title.en}

## Families

- Heading: \`${bundle.tokens.typography.heading}\`
- Body: \`${bundle.tokens.typography.body}\`
- Mono: \`${bundle.tokens.typography.mono}\`

## Scale (tokens)

${Object.entries(scale)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}

## Roles

${roleLines}
`;
}

function buildComponentGuidelines(source: ResolvedExportSource): string {
  const groups = source.bundle.components?.groups ?? [];
  const body = groups
    .map((group) => {
      const items = group.items.map((item) => `  - ${item}`).join("\n");
      const notes = group.notes ? `\n\n_${group.notes}_` : "";
      return `### ${group.label} (\`${group.id}\`)\n\n${items}${notes}`;
    })
    .join("\n\n");

  return `# Component guidelines · ${source.bundle.style.title.en}

Specifications only — not application source code.

${body || "_No components.json groups._"}
`;
}

function buildReadme(source: ResolvedExportSource): string {
  const { bundle, packKind } = source;
  const style = bundle.style;
  return `# DESIGN ATLAS · ${style.title.en}

**Pack:** \`${packKind}\` · **Style version:** \`${style.version}\` · **Generator:** \`${GENERATOR_VERSION}\`

## What this is

A Design Pack for humans, AI coding agents, and page-constructor agents. Source of truth: DESIGN ATLAS Git content (\`content/styles/${style.id}/\`).

Atlas is **not** a site constructor — take this system and build elsewhere.

## Fast path · coding agent

1. Read \`design-system/AGENT-INSTRUCTIONS.md\` and \`design-system/DESIGN.md\`.
2. Open \`prompts/prompt.ru.md\` **or** \`prompts/prompt.en.md\`.
3. Paste into Cursor (or similar) with your product brief.
4. Point the agent at \`tokens/tokens.css\` (or \`tokens/tokens.json\`) as the token SSOT.

## Fast path · page constructor

1. Open \`prompts/prompt.constructor.ru.md\` **or** \`prompts/prompt.constructor.en.md\`.
2. Paste into Tilda / LPmotor / Creatium / Kraftum (or their agents) with your unique copy.
3. Keep tokens — do not invent a second palette or radius system.

## Key tokens

${tokensSummaryForReadme(bundle.tokens)}

## Contents

See \`manifest.json\` for the authoritative file list and SHA-256 checksums.

## Licence note

This pack redistributes editorial design rules and token values from DESIGN ATLAS. Do **not** assume font binary redistribution rights — use license-aware webfonts that match the declared families.
`;
}

function put(files: PackFileMap, relativePath: string, content: string | Uint8Array): void {
  const path = sanitizePackPath(relativePath);
  if (files.has(path)) {
    throw new Error(`Duplicate pack path: ${path}`);
  }
  files.set(path, typeof content === "string" ? utf8(content) : content);
}

function requireMarkdown(value: string | undefined, label: string): string {
  if (!value?.trim()) {
    throw new Error(`Missing required markdown for export: ${label}`);
  }
  return value;
}

/**
 * Deterministic file generation from resolved SSOT.
 */
export function generatePackFiles(source: ResolvedExportSource): GeneratedPack {
  const { bundle, markdown, packKind } = source;
  const style = bundle.style;
  const rootDir = packRootName(style, packKind);
  const files: PackFileMap = new Map();
  const kind = packKind;

  const prefix = (rel: string) => `${rootDir}/${rel}`;

  if (packIncludes(kind, "readme")) {
    put(files, prefix("README.md"), buildReadme(source));
  }

  if (packIncludes(kind, "design-md")) {
    put(files, prefix("design-system/DESIGN.md"), requireMarkdown(markdown.designMd, "DESIGN.md"));
  }
  if (packIncludes(kind, "tokens-md")) {
    put(files, prefix("design-system/TOKENS.md"), requireMarkdown(markdown.tokensMd, "TOKENS.md"));
  }
  if (packIncludes(kind, "agent-instructions")) {
    put(
      files,
      prefix("design-system/AGENT-INSTRUCTIONS.md"),
      requireMarkdown(markdown.agentInstructions, "AGENT-INSTRUCTIONS.md"),
    );
  }
  if (packIncludes(kind, "style-philosophy")) {
    put(files, prefix("design-system/STYLE-PHILOSOPHY.md"), buildPhilosophyMarkdown(style));
  }
  if (packIncludes(kind, "layout-rules")) {
    put(
      files,
      prefix("design-system/LAYOUT-RULES.md"),
      requireMarkdown(markdown.rulesMd, "rules.md"),
    );
  }
  if (packIncludes(kind, "typography-md")) {
    put(files, prefix("design-system/TYPOGRAPHY.md"), buildTypographyMarkdown(source));
  }
  if (packIncludes(kind, "component-guidelines")) {
    put(files, prefix("design-system/COMPONENT-GUIDELINES.md"), buildComponentGuidelines(source));
  }

  if (packIncludes(kind, "prompt-ru")) {
    put(files, prefix("prompts/prompt.ru.md"), requireMarkdown(markdown.promptRu, "prompt.ru.md"));
  }
  if (packIncludes(kind, "prompt-en")) {
    put(files, prefix("prompts/prompt.en.md"), requireMarkdown(markdown.promptEn, "prompt.en.md"));
  }
  if (packIncludes(kind, "prompt-constructor-ru")) {
    put(
      files,
      prefix("prompts/prompt.constructor.ru.md"),
      requireMarkdown(markdown.promptConstructorRu, "prompt.constructor.ru.md"),
    );
  }
  if (packIncludes(kind, "prompt-constructor-en")) {
    put(
      files,
      prefix("prompts/prompt.constructor.en.md"),
      requireMarkdown(markdown.promptConstructorEn, "prompt.constructor.en.md"),
    );
  }

  if (packIncludes(kind, "tokens-json")) {
    put(files, prefix("tokens/tokens.json"), stableJson(bundle.tokens));
  }
  if (packIncludes(kind, "tokens-css")) {
    put(files, prefix("tokens/tokens.css"), tokensToExportCss(bundle.tokens, style.id));
  }
  if (packIncludes(kind, "tokens-splits")) {
    putTokenSplits(files, prefix, bundle.tokens);
  }
  if (packIncludes(kind, "typography-roles") && bundle.typography) {
    put(files, prefix("tokens/typography-roles.json"), stableJson(bundle.typography));
  }

  if (packIncludes(kind, "components-index")) {
    if (!bundle.components) {
      throw new Error("components.json required for export");
    }
    put(files, prefix("components/index.json"), stableJson(bundle.components));
  }

  if (packIncludes(kind, "demo-landing")) {
    if (!bundle.demo) {
      throw new Error("demo.json required for full export");
    }
    put(files, prefix("examples/demo-landing/demo.json"), stableJson(bundle.demo));
  }

  if (packIncludes(kind, "changelog")) {
    put(files, prefix("CHANGELOG.md"), requireMarkdown(markdown.changelogMd, "CHANGELOG.md"));
  }

  const prompts: Array<"ru" | "en"> = [];
  if (packIncludes(kind, "prompt-ru")) prompts.push("ru");
  if (packIncludes(kind, "prompt-en")) prompts.push("en");

  const fileEntries = [...files.entries()]
    .filter(([path]) => !path.endsWith("/manifest.json"))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, data]) => {
      const relative = path.slice(rootDir.length + 1);
      return {
        path: relative,
        bytes: data.byteLength,
        sha256: sha256Hex(data),
        contentType: guessContentType(relative),
      };
    });

  const manifest: ExportManifest = {
    format: PACK_FORMAT,
    formatVersion: PACK_FORMAT_VERSION,
    product: "DESIGN ATLAS",
    generatorVersion: GENERATOR_VERSION,
    generatedAt: style.updatedAt,
    pack: {
      id: style.id,
      slug: style.slug,
      version: style.version,
      kind,
      access: kind === "free" ? "free" : "pack",
      status: "published",
    },
    contents: {
      designSystem: true,
      tokens: true,
      components: packIncludes(kind, "components-index"),
      prompts,
      examples: packIncludes(kind, "demo-landing"),
      assets: false,
    },
    files: fileEntries,
    compatibility: {
      agents: ["cursor", "claude-code", "codex", "generic-coding-agent"],
      frameworks: ["css-variables", "json-tokens"],
    },
  };

  // Contract: manifest.files lists every pack file except manifest.json itself.
  const publishedManifest: ExportManifest = { ...manifest, files: fileEntries };
  put(files, prefix("manifest.json"), stableJson(publishedManifest));

  return {
    rootDir,
    packKind: kind,
    files,
    manifest: publishedManifest,
  };
}

function putTokenSplits(files: PackFileMap, prefix: (rel: string) => string, tokens: StyleTokens): void {
  put(files, prefix("tokens/colors.json"), stableJson(tokens.colors));
  put(files, prefix("tokens/typography.json"), stableJson(tokens.typography));
  put(files, prefix("tokens/spacing.json"), stableJson(tokens.spacing));
  put(files, prefix("tokens/geometry.json"), stableJson(tokens.geometry));
  put(files, prefix("tokens/effects.json"), stableJson(tokens.effects));
}

function guessContentType(path: string): string {
  if (path.endsWith(".json")) return "application/json";
  if (path.endsWith(".md")) return "text/markdown; charset=utf-8";
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  return "application/octet-stream";
}
