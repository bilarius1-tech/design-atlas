import { existsSync, readdirSync } from "node:fs";
import {
  CardStyleDefinitionSchema,
  CardStylesIndexSchema,
  type CardStyleDefinition,
  type CardStylesIndex,
} from "@/core/schemas";
import {
  cardStyleFilePath,
  getCardStylesIndexPath,
  getCardStylesRoot,
} from "./card-paths";
import { parseJsonFile } from "./read-json";

export function listCardStyleIdsFromDisk(): string[] {
  const root = getCardStylesRoot();
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();
}

export function loadCardStylesIndex(): CardStylesIndex {
  const indexPath = getCardStylesIndexPath();
  if (!existsSync(indexPath)) {
    return CardStylesIndexSchema.parse({ schemaVersion: "1.0.0", styles: [] });
  }
  return parseJsonFile(indexPath, CardStylesIndexSchema);
}

export function loadCardStyle(styleId: string): CardStyleDefinition {
  return parseJsonFile(cardStyleFilePath(styleId), CardStyleDefinitionSchema);
}

export function loadActiveCardStyles(): CardStyleDefinition[] {
  return listCardStyleIdsFromDisk()
    .map((id) => loadCardStyle(id))
    .filter((style) => style.active && style.status !== "archived")
    .sort((a, b) => a.title.ru.localeCompare(b.title.ru, "ru"));
}
