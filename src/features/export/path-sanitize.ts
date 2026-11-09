/**
 * Ensure pack-relative paths are safe for ZIP (no Zip Slip / traversal).
 */
export function sanitizePackPath(input: string): string {
  const withSlashes = input.replace(/\\/g, "/");

  if (!withSlashes || withSlashes.length > 512) {
    throw new Error(`Invalid pack path: empty or too long`);
  }
  if (withSlashes.includes("\0")) {
    throw new Error(`Invalid pack path: null byte`);
  }
  if (withSlashes.startsWith("/") || /^[a-zA-Z]:/.test(withSlashes)) {
    throw new Error(`Absolute paths are forbidden: ${input}`);
  }

  const normalized = withSlashes.replace(/^\.\//, "");
  const segments = normalized.split("/");
  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`Path traversal forbidden: ${input}`);
  }
  if (!/^[a-zA-Z0-9._/@+\-]+$/.test(normalized)) {
    throw new Error(`Unsafe characters in path: ${input}`);
  }

  return normalized;
}

export function assertRelativeZipEntry(pathInsideZip: string, packRoot: string): string {
  const safe = sanitizePackPath(pathInsideZip);
  const root = sanitizePackPath(packRoot);
  if (safe !== root && !safe.startsWith(`${root}/`)) {
    throw new Error(`Entry escapes pack root: ${pathInsideZip}`);
  }
  return safe;
}
