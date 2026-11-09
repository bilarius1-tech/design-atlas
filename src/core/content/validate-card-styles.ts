import { existsSync } from "node:fs";
import {
  errorIssue,
  summarizeIssues,
  type ContentIssue,
  type ContentValidationResult,
} from "./issues";
import {
  cardStyleFilePath,
  getCardStylesIndexPath,
} from "./card-paths";
import {
  listCardStyleIdsFromDisk,
  loadCardStyle,
  loadCardStylesIndex,
} from "./load-card-styles";

export function validateCardStyles(): ContentValidationResult {
  const issues: ContentIssue[] = [];
  const indexPath = getCardStylesIndexPath();

  if (!existsSync(indexPath)) {
    return summarizeIssues([
      errorIssue("card_index_missing", "Missing content/card-styles/index.json", indexPath),
    ]);
  }

  let index;
  try {
    index = loadCardStylesIndex();
  } catch (error) {
    return summarizeIssues([
      errorIssue(
        "card_index_invalid",
        error instanceof Error ? error.message : "Invalid card-styles index",
        indexPath,
      ),
    ]);
  }

  const diskIds = listCardStyleIdsFromDisk();
  const diskSet = new Set(diskIds);
  const indexIds = new Set(index.styles.map((entry) => entry.id));

  for (const entry of index.styles) {
    const expected = `content/card-styles/${entry.id}`;
    if (entry.path !== expected) {
      issues.push(
        errorIssue(
          "card_index_path_mismatch",
          `Index path for ${entry.id} must be ${expected}`,
          indexPath,
        ),
      );
    }
    if (!diskSet.has(entry.id)) {
      issues.push(
        errorIssue(
          "card_index_missing_directory",
          `Index references missing card style directory: ${entry.id}`,
          indexPath,
        ),
      );
    }
  }

  for (const id of diskIds) {
    if (!indexIds.has(id)) {
      issues.push(
        errorIssue(
          "card_index_incomplete",
          `Card style directory ${id} is not listed in content/card-styles/index.json`,
          indexPath,
        ),
      );
    }

    const filePath = cardStyleFilePath(id);
    try {
      const style = loadCardStyle(id);
      if (style.id !== id) {
        issues.push(
          errorIssue(
            "card_id_mismatch",
            `style.json id ${style.id} must match directory ${id}`,
            filePath,
          ),
        );
      }
    } catch (error) {
      issues.push(
        errorIssue(
          "card_style_invalid",
          error instanceof Error ? error.message : `Invalid ${id}/style.json`,
          filePath,
        ),
      );
    }
  }

  return summarizeIssues(issues);
}
