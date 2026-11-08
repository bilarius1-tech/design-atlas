import { existsSync } from "node:fs";
import { ZodError } from "zod";
import {
  ComponentsDefinitionSchema,
  DemoDefinitionSchema,
  StyleDefinitionSchema,
  StyleTokensSchema,
  TypographyDefinitionSchema,
  type StyleStatus,
} from "@/core/schemas";
import {
  errorIssue,
  summarizeIssues,
  warningIssue,
  type ContentIssue,
  type ContentValidationResult,
} from "./issues";
import { loadStyleBundle } from "./load-style";
import { STYLE_MARKDOWN_FILES, styleDirectory, styleFilePath } from "./paths";
import { parseJsonFile } from "./read-json";

const REQUIRED_FOR_PUBLISHED_JSON = [
  "style.json",
  "tokens.json",
  "typography.json",
  "components.json",
  "demo.json",
] as const;

function pushZodIssues(issues: ContentIssue[], error: ZodError, filePath: string): void {
  for (const issue of error.issues) {
    issues.push(
      errorIssue(
        "schema_invalid",
        `${issue.message} (${issue.path.join(".") || "root"})`,
        filePath,
      ),
    );
  }
}

function validateJsonFile(
  issues: ContentIssue[],
  styleId: string,
  fileName: string,
  schema: Parameters<typeof parseJsonFile>[1],
  required: boolean,
): void {
  const filePath = styleFilePath(styleId, fileName);
  if (!existsSync(filePath)) {
    if (required) {
      issues.push(errorIssue("file_missing", `Missing required file: ${fileName}`, filePath));
    } else {
      issues.push(warningIssue("file_missing", `Optional file missing: ${fileName}`, filePath));
    }
    return;
  }

  try {
    parseJsonFile(filePath, schema);
  } catch (error) {
    if (error instanceof ZodError) {
      pushZodIssues(issues, error, filePath);
      return;
    }
    issues.push(
      errorIssue(
        "json_invalid",
        error instanceof Error ? error.message : "Invalid JSON",
        filePath,
      ),
    );
  }
}

function requiredMarkdown(status: StyleStatus): boolean {
  return status === "published" || status === "review";
}

export function validateStyleDirectory(
  styleId: string,
  options?: { knownStyleIds?: ReadonlySet<string> },
): ContentValidationResult {
  const issues: ContentIssue[] = [];
  const directory = styleDirectory(styleId);

  if (!existsSync(directory)) {
    return summarizeIssues([
      errorIssue("directory_missing", `Style directory not found: ${styleId}`, directory),
    ]);
  }

  let status: StyleStatus = "draft";

  try {
    const style = parseJsonFile(styleFilePath(styleId, "style.json"), StyleDefinitionSchema);
    status = style.status;

    if (style.id !== styleId) {
      issues.push(
        errorIssue(
          "id_mismatch",
          `style.id (${style.id}) must equal folder name (${styleId})`,
          styleFilePath(styleId, "style.json"),
        ),
      );
    }

    for (const relatedId of style.relatedStyles) {
      if (relatedId === styleId) {
        issues.push(
          errorIssue(
            "related_self",
            "relatedStyles must not include the style itself",
            styleFilePath(styleId, "style.json"),
          ),
        );
      } else if (options?.knownStyleIds && !options.knownStyleIds.has(relatedId)) {
        const severity = status === "published" ? errorIssue : warningIssue;
        issues.push(
          severity(
            "related_unknown",
            `Unknown related style id: ${relatedId}`,
            styleFilePath(styleId, "style.json"),
          ),
        );
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      pushZodIssues(issues, error, styleFilePath(styleId, "style.json"));
    } else if (!existsSync(styleFilePath(styleId, "style.json"))) {
      issues.push(
        errorIssue(
          "file_missing",
          "Missing required file: style.json",
          styleFilePath(styleId, "style.json"),
        ),
      );
    } else {
      issues.push(
        errorIssue(
          "json_invalid",
          error instanceof Error ? error.message : "Invalid style.json",
          styleFilePath(styleId, "style.json"),
        ),
      );
    }
  }

  const requireFull = status === "published";

  validateJsonFile(issues, styleId, "tokens.json", StyleTokensSchema, true);
  validateJsonFile(
    issues,
    styleId,
    "typography.json",
    TypographyDefinitionSchema,
    requireFull,
  );
  validateJsonFile(
    issues,
    styleId,
    "components.json",
    ComponentsDefinitionSchema,
    requireFull,
  );
  validateJsonFile(issues, styleId, "demo.json", DemoDefinitionSchema, requireFull);

  for (const fileName of STYLE_MARKDOWN_FILES) {
    const filePath = styleFilePath(styleId, fileName);
    if (!existsSync(filePath)) {
      if (requiredMarkdown(status)) {
        issues.push(errorIssue("file_missing", `Missing required file: ${fileName}`, filePath));
      } else {
        issues.push(warningIssue("file_missing", `Optional file missing: ${fileName}`, filePath));
      }
    }
  }

  // Cross-file consistency when loadable
  if (issues.every((issue) => issue.path !== styleFilePath(styleId, "style.json") || issue.code !== "schema_invalid")) {
    try {
      const bundle = loadStyleBundle(styleId);
      if (bundle.typography && bundle.typography.styleId !== styleId) {
        issues.push(
          errorIssue(
            "style_id_mismatch",
            "typography.styleId must match folder id",
            styleFilePath(styleId, "typography.json"),
          ),
        );
      }
      if (bundle.components && bundle.components.styleId !== styleId) {
        issues.push(
          errorIssue(
            "style_id_mismatch",
            "components.styleId must match folder id",
            styleFilePath(styleId, "components.json"),
          ),
        );
      }
      if (bundle.demo && bundle.demo.styleId !== styleId) {
        issues.push(
          errorIssue(
            "style_id_mismatch",
            "demo.styleId must match folder id",
            styleFilePath(styleId, "demo.json"),
          ),
        );
      }

      if (requireFull) {
        for (const fileName of REQUIRED_FOR_PUBLISHED_JSON) {
          if (!bundle.files.present.includes(fileName)) {
            issues.push(
              errorIssue(
                "published_incomplete",
                `Published style missing ${fileName}`,
                styleFilePath(styleId, fileName),
              ),
            );
          }
        }
      }
    } catch {
      // schema/file errors already collected
    }
  }

  return summarizeIssues(issues);
}
