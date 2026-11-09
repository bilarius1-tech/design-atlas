import path from "node:path";
import { getContentRoot } from "./paths";

export function getCardStylesRoot(): string {
  return path.join(getContentRoot(), "card-styles");
}

export function getCardStylesIndexPath(): string {
  return path.join(getCardStylesRoot(), "index.json");
}

export function cardStyleDirectory(styleId: string): string {
  return path.join(getCardStylesRoot(), styleId);
}

export function cardStyleFilePath(styleId: string, fileName = "style.json"): string {
  return path.join(cardStyleDirectory(styleId), fileName);
}
