import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import {
  buildStyleRegistry,
  getRepoRoot,
  listTemplateIdsFromDisk,
  loadPageTemplate,
  loadStyleBundle,
  styleFilePath,
  STYLE_MARKDOWN_FILES,
} from "@/core/content";
import type { LoadedStyleBundle } from "@/core/content";
import { composeDesignSpec, type DesignSpecLang, type DesignSpecSurface } from "@/features/design-spec";
import { loadDesignSpecSource } from "@/features/design-spec/load-source";

export const API_SCHEMA_VERSION = "1.0.0";

export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const STYLE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function assertId(id: string, label = "id"): string {
  if (!STYLE_ID.test(id)) {
    throw new ApiError("invalid_id", `Invalid ${label}`, 400);
  }
  return id;
}

function readTextIfExists(filePath: string): string | null {
  if (!existsSync(filePath)) return null;
  return readFileSync(filePath, "utf8");
}

function publishedStyle(id: string): LoadedStyleBundle {
  assertId(id, "style id");
  const directory = path.join(getRepoRoot(), "content", "styles", id);
  if (!existsSync(directory)) {
    throw new ApiError("not_found", `Style not found: ${id}`, 404);
  }
  const bundle = loadStyleBundle(id);
  if (bundle.style.status !== "published") {
    throw new ApiError("not_found", `Style not found: ${id}`, 404);
  }
  return bundle;
}

export function getHealth() {
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "health" as const,
    ok: true,
    service: "design-atlas",
  };
}

export function listStyles() {
  const { styles } = buildStyleRegistry();
  const published = styles.filter((entry) => entry.status === "published");
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "style-list" as const,
    data: published.map((entry) => ({
      id: entry.id,
      path: entry.path,
      status: entry.status,
      title: entry.title,
    })),
  };
}

export function getStyle(id: string) {
  const bundle = publishedStyle(id);
  const { style } = bundle;
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "style" as const,
    data: {
      id: style.id,
      slug: style.slug,
      status: style.status,
      version: style.version,
      title: style.title,
      shortDescription: style.shortDescription,
      category: style.category,
      tags: style.tags,
      files: bundle.files,
    },
  };
}

export function getStyleTokens(id: string) {
  const bundle = publishedStyle(id);
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "style-tokens" as const,
    id: bundle.id,
    data: bundle.tokens,
  };
}

export function getStyleGuidelines(id: string) {
  const bundle = publishedStyle(id);
  const documents: Record<string, string> = {};
  for (const fileName of STYLE_MARKDOWN_FILES) {
    const contents = readTextIfExists(styleFilePath(id, fileName));
    if (contents !== null) {
      documents[fileName] = contents;
    }
  }
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "style-guidelines" as const,
    id: bundle.id,
    data: documents,
  };
}


function parseSpecLang(value: string | null | undefined): DesignSpecLang {
  if (value == null || value === "" || value === "ru") return "ru";
  if (value === "en") return "en";
  throw new ApiError("invalid_query", "lang must be ru or en", 400);
}

function parseSpecSurface(value: string | null | undefined): DesignSpecSurface {
  if (value == null || value === "" || value === "agent") return "agent";
  if (value === "constructor") return "constructor";
  throw new ApiError("invalid_query", "surface must be agent or constructor", 400);
}

export function getDesignSpec(
  id: string,
  query: {
    lang?: string | null;
    surface?: string | null;
    productName?: string | null;
    pageBrief?: string | null;
  } = {},
) {
  const bundle = publishedStyle(id);
  const source = loadDesignSpecSource(bundle.id);
  const lang = parseSpecLang(query.lang);
  const surface = parseSpecSurface(query.surface);
  const composed = composeDesignSpec({
    source,
    lang,
    surface,
    productName: query.productName ?? undefined,
    pageBrief: query.pageBrief ?? undefined,
  });
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "design-spec" as const,
    id: bundle.id,
    lang,
    surface,
    markdown: composed.markdown,
    tokens: composed.tokensJson,
    typography: composed.typography ?? null,
  };
}

export function getShellTokens() {
  const filePath = path.join(getRepoRoot(), "design", "system", "tokens.json");
  const data = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "shell-tokens" as const,
    data,
  };
}

type ThemeIndex = {
  schemaVersion: number;
  themes: Array<{ id: string; path: string; name: string; description: string }>;
};

function loadThemeIndex(): ThemeIndex {
  const filePath = path.join(getRepoRoot(), "design", "themes", "index.json");
  return JSON.parse(readFileSync(filePath, "utf8")) as ThemeIndex;
}

export function listThemes() {
  const index = loadThemeIndex();
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "theme-list" as const,
    data: index.themes,
  };
}

export function getTheme(id: string) {
  assertId(id, "theme id");
  const index = loadThemeIndex();
  const entry = index.themes.find((theme) => theme.id === id);
  if (!entry) {
    throw new ApiError("not_found", `Theme not found: ${id}`, 404);
  }
  const directory = path.join(getRepoRoot(), entry.path);
  const tokens = JSON.parse(readFileSync(path.join(directory, "tokens.json"), "utf8")) as unknown;
  const guidelines = readTextIfExists(path.join(directory, "GUIDELINES.md"));
  const source = readTextIfExists(path.join(directory, "SOURCE.md"));
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "theme" as const,
    data: {
      ...entry,
      tokens,
      guidelines,
      source,
    },
  };
}

type ComponentCatalog = {
  schemaVersion: number;
  source: string;
  components: Array<{
    id: string;
    name: string;
    path: string;
    doc: string;
    variants?: string[];
    sizes?: string[];
    states?: string[];
  }>;
};

function loadComponentCatalog(): ComponentCatalog {
  const filePath = path.join(getRepoRoot(), "design", "components", "catalog.json");
  return JSON.parse(readFileSync(filePath, "utf8")) as ComponentCatalog;
}

export function listComponents() {
  const catalog = loadComponentCatalog();
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "component-list" as const,
    data: catalog.components,
  };
}

export function getComponent(name: string) {
  assertId(name, "component name");
  const catalog = loadComponentCatalog();
  const entry = catalog.components.find(
    (item) => item.id === name || item.name.toLowerCase() === name,
  );
  if (!entry) {
    throw new ApiError("not_found", `Component not found: ${name}`, 404);
  }
  const doc = readTextIfExists(path.join(getRepoRoot(), entry.doc));
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "component" as const,
    data: { ...entry, documentation: doc },
  };
}

export function listTemplates() {
  const data = listTemplateIdsFromDisk().map((id) => {
    const template = loadPageTemplate(id);
    return {
      id: template.id,
      title: template.title,
      shortDescription: template.shortDescription,
      category: template.category,
    };
  });
  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "template-list" as const,
    data,
  };
}

export function getTemplate(id: string) {
  assertId(id, "template id");
  try {
    const template = loadPageTemplate(id);
    return {
      schemaVersion: API_SCHEMA_VERSION,
      kind: "template" as const,
      data: template,
    };
  } catch (error) {
    throw new ApiError(
      "not_found",
      error instanceof Error ? error.message : `Template not found: ${id}`,
      404,
    );
  }
}

export function searchCatalog(query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 1) {
    throw new ApiError("invalid_query", "Query q is required", 400);
  }

  const hits: Array<{ type: string; id: string; title: string; snippet?: string }> = [];

  for (const entry of listStyles().data) {
    const hay = `${entry.id} ${entry.title.ru} ${entry.title.en}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ type: "style", id: entry.id, title: entry.title.ru });
    }
  }

  for (const theme of listThemes().data) {
    const hay = `${theme.id} ${theme.name} ${theme.description}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ type: "theme", id: theme.id, title: theme.name, snippet: theme.description });
    }
  }

  for (const component of listComponents().data) {
    const hay =
      `${component.id} ${component.name} ${(component.states ?? []).join(" ")}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ type: "component", id: component.id, title: component.name });
    }
  }

  for (const template of listTemplates().data) {
    const hay = `${template.id} ${template.title.ru} ${template.title.en}`.toLowerCase();
    if (hay.includes(q)) {
      hits.push({ type: "template", id: template.id, title: template.title.ru });
    }
  }

  return {
    schemaVersion: API_SCHEMA_VERSION,
    kind: "search" as const,
    query: query.trim(),
    data: hits,
  };
}
