import type { PackKind } from "@/core/schemas";
import { assertPackAccess, type EntitlementContext } from "./entitlements";
import { generatePackFiles, type GeneratedPack } from "./generator";
import { ExportResolveError, resolveExportSource } from "./resolver";
import { validateGeneratedPack, type ExportValidationResult } from "./validator";
import { assertZipIntegrity, buildZipArchive } from "./zip-builder";

export type PreparePackSuccess = {
  ok: true;
  pack: GeneratedPack;
  validation: ExportValidationResult;
};

export type BuildPackFailure = {
  ok: false;
  status: number;
  code: string;
  message: string;
  validation?: ExportValidationResult;
};

export type PreparePackResult = PreparePackSuccess | BuildPackFailure;

export type BuildPackSuccess = PreparePackSuccess & {
  zip: Uint8Array;
  fileName: string;
};

export type BuildPackResult = BuildPackSuccess | BuildPackFailure;

export function prepareDesignPack(
  styleId: string,
  packKind: PackKind,
  entitlements: EntitlementContext = {},
): PreparePackResult {
  const access = assertPackAccess(packKind, entitlements);
  if (!access.ok) {
    return {
      ok: false,
      status: access.status,
      code: access.code,
      message: access.message,
    };
  }

  let source;
  try {
    source = resolveExportSource(styleId, packKind);
  } catch (error) {
    if (error instanceof ExportResolveError) {
      const status = error.code === "unpublished" ? 403 : 404;
      return { ok: false, status, code: error.code, message: error.message };
    }
    throw error;
  }

  let pack: GeneratedPack;
  try {
    pack = generatePackFiles(source);
  } catch (error) {
    return {
      ok: false,
      status: 500,
      code: "generate_failed",
      message: error instanceof Error ? error.message : "Pack generation failed",
    };
  }

  const validation = validateGeneratedPack(pack);
  if (!validation.ok) {
    return {
      ok: false,
      status: 500,
      code: "validation_failed",
      message: validation.issues
        .filter((i) => i.severity === "error")
        .map((i) => i.message)
        .join("; "),
      validation,
    };
  }

  return { ok: true, pack, validation };
}

export function buildDesignPackZip(
  styleId: string,
  packKind: PackKind,
  entitlements: EntitlementContext = {},
): BuildPackResult {
  const prepared = prepareDesignPack(styleId, packKind, entitlements);
  if (!prepared.ok) return prepared;

  const { bytes } = buildZipArchive(prepared.pack.files, prepared.pack.rootDir);
  assertZipIntegrity(bytes, prepared.pack.rootDir);

  return {
    ok: true,
    pack: prepared.pack,
    zip: bytes,
    fileName: `${prepared.pack.rootDir}.zip`,
    validation: prepared.validation,
  };
}
