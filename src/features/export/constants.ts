/** Design Pack generator SemVer — bump on breaking generator behaviour. */
export const GENERATOR_VERSION = "1.0.0" as const;

export const PACK_FORMAT = "design-atlas-pack" as const;
export const PACK_FORMAT_VERSION = "1.0" as const;

export const MAX_PACK_BYTES = 5 * 1024 * 1024;
export const MAX_FILE_COUNT = 200;

export const SECRET_PATH_PATTERNS = [
  /(^|\/)\.env(\.|$)/i,
  /\.pem$/i,
  /credentials/i,
  /secrets?\./i,
  /(^|\/)\.git(\/|$)/i,
  /(^|\/)node_modules(\/|$)/i,
] as const;
