import { ExportManifestSchema } from "@/core/schemas";
import {
  MAX_FILE_COUNT,
  MAX_PACK_BYTES,
  SECRET_PATH_PATTERNS,
} from "./constants";
import type { GeneratedPack } from "./generator";
import { getPackDefinition } from "./pack-definitions";
import { sanitizePackPath } from "./path-sanitize";
import { sha256Hex } from "./checksum";

export type ExportValidationIssue = {
  severity: "error" | "warning";
  code: string;
  message: string;
};

export type ExportValidationResult = {
  ok: boolean;
  issues: ExportValidationIssue[];
};

export function validateGeneratedPack(pack: GeneratedPack): ExportValidationResult {
  const issues: ExportValidationIssue[] = [];
  const def = getPackDefinition(pack.packKind);
  const root = pack.rootDir;

  const relativePaths = [...pack.files.keys()].map((full) => {
    try {
      const safe = sanitizePackPath(full);
      if (!safe.startsWith(`${root}/`) && safe !== root) {
        issues.push({
          severity: "error",
          code: "path_escape",
          message: `File outside pack root: ${full}`,
        });
      }
      return safe.startsWith(`${root}/`) ? safe.slice(root.length + 1) : safe;
    } catch (error) {
      issues.push({
        severity: "error",
        code: "unsafe_path",
        message: error instanceof Error ? error.message : String(error),
      });
      return full;
    }
  });

  for (const required of def.requiredPaths) {
    if (!relativePaths.includes(required)) {
      issues.push({
        severity: "error",
        code: "missing_required",
        message: `Missing required file: ${required}`,
      });
    }
  }

  if (pack.files.size > MAX_FILE_COUNT) {
    issues.push({
      severity: "error",
      code: "too_many_files",
      message: `File count ${pack.files.size} exceeds ${MAX_FILE_COUNT}`,
    });
  }

  let totalBytes = 0;
  for (const [path, data] of pack.files) {
    totalBytes += data.byteLength;
    for (const pattern of SECRET_PATH_PATTERNS) {
      if (pattern.test(path)) {
        issues.push({
          severity: "error",
          code: "secret_path",
          message: `Forbidden path pattern: ${path}`,
        });
      }
    }

    if (path.endsWith(".json")) {
      try {
        JSON.parse(new TextDecoder().decode(data));
      } catch {
        issues.push({
          severity: "error",
          code: "invalid_json",
          message: `Invalid JSON: ${path}`,
        });
      }
    }
  }

  if (totalBytes > MAX_PACK_BYTES) {
    issues.push({
      severity: "error",
      code: "pack_too_large",
      message: `Pack size ${totalBytes} exceeds ${MAX_PACK_BYTES}`,
    });
  }

  const parsed = ExportManifestSchema.safeParse(pack.manifest);
  if (!parsed.success) {
    issues.push({
      severity: "error",
      code: "manifest_schema",
      message: parsed.error.message,
    });
  } else {
    const listed = new Set(parsed.data.files.map((f) => f.path));
    for (const rel of relativePaths) {
      if (rel === "manifest.json") continue;
      if (!listed.has(rel)) {
        issues.push({
          severity: "error",
          code: "manifest_missing_file",
          message: `manifest.files missing ${rel}`,
        });
      }
    }
    for (const entry of parsed.data.files) {
      const full = sanitizePackPath(`${root}/${entry.path}`);
      const data = pack.files.get(full);
      if (!data) {
        issues.push({
          severity: "error",
          code: "manifest_orphan",
          message: `manifest lists missing file ${entry.path}`,
        });
        continue;
      }
      const hash = sha256Hex(data);
      if (hash !== entry.sha256) {
        issues.push({
          severity: "error",
          code: "checksum_mismatch",
          message: `SHA-256 mismatch for ${entry.path}`,
        });
      }
      if (entry.bytes !== data.byteLength) {
        issues.push({
          severity: "error",
          code: "size_mismatch",
          message: `Byte size mismatch for ${entry.path}`,
        });
      }
    }
  }

  // Free pack must not include full-only paths
  if (pack.packKind === "free") {
    const banned = [
      "CHANGELOG.md",
      "examples/demo-landing/demo.json",
      "design-system/LAYOUT-RULES.md",
      "design-system/COMPONENT-GUIDELINES.md",
    ];
    for (const path of banned) {
      if (relativePaths.includes(path)) {
        issues.push({
          severity: "error",
          code: "free_leak",
          message: `Full-pack material leaked into free export: ${path}`,
        });
      }
    }
  }

  return {
    ok: issues.every((issue) => issue.severity !== "error"),
    issues,
  };
}
