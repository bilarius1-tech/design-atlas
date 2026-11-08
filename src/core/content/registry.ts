import { existsSync, readdirSync } from "node:fs";
import {
  ContentIndexSchema,
  type ContentIndex,
  type StyleDefinition,
} from "@/core/schemas";
import {
  errorIssue,
  summarizeIssues,
  type ContentIssue,
  type ContentValidationResult,
} from "./issues";
import { loadStyleBundle, type LoadedStyleBundle } from "./load-style";
import { getContentIndexPath, getStylesRoot } from "./paths";
import { parseJsonFile } from "./read-json";
import { validateStyleDirectory } from "./validate-style";

export type StyleRegistryEntry = {
  id: string;
  path: string;
  status: StyleDefinition["status"];
  title: StyleDefinition["title"];
};

export type StyleRegistry = {
  index: ContentIndex;
  styles: StyleRegistryEntry[];
  knownIds: Set<string>;
};

export function listStyleIdsFromDisk(): string[] {
  const stylesRoot = getStylesRoot();
  if (!existsSync(stylesRoot)) {
    return [];
  }

  return readdirSync(stylesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();
}

export function loadContentIndex(): ContentIndex {
  const indexPath = getContentIndexPath();
  if (!existsSync(indexPath)) {
    return ContentIndexSchema.parse({
      schemaVersion: "1.0.0",
      styles: [],
      glossary: [],
    });
  }
  return parseJsonFile(indexPath, ContentIndexSchema);
}

export function buildStyleRegistry(): StyleRegistry {
  const index = loadContentIndex();
  const diskIds = listStyleIdsFromDisk();
  const knownIds = new Set(diskIds);
  const styles: StyleRegistryEntry[] = [];

  for (const id of diskIds) {
    const bundle = loadStyleBundle(id);
    styles.push({
      id,
      path: `content/styles/${id}`,
      status: bundle.style.status,
      title: bundle.style.title,
    });
  }

  return { index, styles, knownIds };
}

export function validateContentRegistry(): ContentValidationResult {
  const issues: ContentIssue[] = [];
  let index: ContentIndex;

  const indexPath = getContentIndexPath();

  try {
    index = loadContentIndex();
  } catch (error) {
    return summarizeIssues([
      errorIssue(
        "index_invalid",
        error instanceof Error ? error.message : "Invalid content/index.json",
        indexPath,
      ),
    ]);
  }

  const diskIds = listStyleIdsFromDisk();
  const diskSet = new Set(diskIds);
  const indexIds = new Set(index.styles.map((entry) => entry.id));

  for (const entry of index.styles) {
    const expectedPath = `content/styles/${entry.id}`;
    if (entry.path !== expectedPath) {
      issues.push(
        errorIssue(
          "index_path_mismatch",
          `Index path for ${entry.id} must be ${expectedPath}`,
          indexPath,
        ),
      );
    }
    if (!diskSet.has(entry.id)) {
      issues.push(
        errorIssue(
          "index_missing_directory",
          `Index references missing style directory: ${entry.id}`,
          indexPath,
        ),
      );
    }
  }

  for (const id of diskIds) {
    if (!indexIds.has(id)) {
      issues.push(
        errorIssue(
          "index_incomplete",
          `Style directory ${id} is not listed in content/index.json`,
          indexPath,
        ),
      );
    }
  }

  const knownIds = new Set(diskIds);
  for (const id of diskIds) {
    const result = validateStyleDirectory(id, { knownStyleIds: knownIds });
    issues.push(...result.issues);
  }

  return summarizeIssues(issues);
}

export function loadAllStyleBundles(): LoadedStyleBundle[] {
  return listStyleIdsFromDisk().map((id) => loadStyleBundle(id));
}
