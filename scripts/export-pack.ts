import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PackKindSchema } from "../src/core/schemas";
import { buildDesignPackZip } from "../src/features/export";

function usage(): never {
  console.error(
    "Usage: pnpm export:pack --style <id> --pack free|full [--out <dir>]\n" +
      "Full pack requires DESIGN_ATLAS_ALLOW_FULL_EXPORT=1",
  );
  process.exit(1);
}

function readArg(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

const styleId = readArg("--style");
const packRaw = readArg("--pack") ?? "free";
const outDir = readArg("--out") ?? path.join(process.cwd(), "tmp", "exports");

if (!styleId) usage();

const kind = PackKindSchema.safeParse(packRaw);
if (!kind.success) usage();

const result = buildDesignPackZip(styleId, kind.data, {
  allowFullExport: process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT === "1",
});

if (!result.ok) {
  console.error(`[export] ${result.code}: ${result.message}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const target = path.join(outDir, result.fileName);
writeFileSync(target, result.zip);
console.log(`[export] wrote ${target}`);
console.log(`[export] files=${result.pack.files.size} root=${result.pack.rootDir}`);
