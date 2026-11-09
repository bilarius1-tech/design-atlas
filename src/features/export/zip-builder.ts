import { strToU8, unzipSync, zipSync } from "fflate";
import { assertRelativeZipEntry, sanitizePackPath } from "./path-sanitize";
import type { PackFileMap } from "./generator";

export type ZipBuildResult = {
  bytes: Uint8Array;
  entryCount: number;
};

/**
 * Build a deterministic ZIP (sorted paths, relative entries only).
 */
export function buildZipArchive(files: PackFileMap, packRoot: string): ZipBuildResult {
  const root = sanitizePackPath(packRoot);
  const record: Record<string, Uint8Array> = {};

  const sorted = [...files.entries()].sort(([a], [b]) => a.localeCompare(b));
  for (const [path, data] of sorted) {
    const entry = assertRelativeZipEntry(path, root);
    if (record[entry]) {
      throw new Error(`Duplicate ZIP entry: ${entry}`);
    }
    record[entry] = data;
  }

  const bytes = zipSync(record, {
    level: 6,
    // mtime omitted → more stable across runs where supported
  });

  return { bytes, entryCount: sorted.length };
}

/** Verify ZIP opens and all paths stay under pack root (Zip Slip check). */
export function assertZipIntegrity(zipBytes: Uint8Array, packRoot: string): string[] {
  const root = sanitizePackPath(packRoot);
  const unzipped = unzipSync(zipBytes);
  const names = Object.keys(unzipped).sort((a, b) => a.localeCompare(b));

  for (const name of names) {
    assertRelativeZipEntry(name, root);
  }

  return names;
}

export function zipEntryAsText(zipBytes: Uint8Array, entryPath: string): string {
  const unzipped = unzipSync(zipBytes);
  const data = unzipped[entryPath];
  if (!data) {
    throw new Error(`ZIP entry not found: ${entryPath}`);
  }
  return new TextDecoder().decode(data);
}

export function textEncoderHelper(value: string): Uint8Array {
  return strToU8(value);
}
