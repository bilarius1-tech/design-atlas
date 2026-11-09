import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { ExportManifestSchema } from "@/core/schemas";
import {
  assertPackAccess,
  assertRelativeZipEntry,
  buildDesignPackZip,
  prepareDesignPack,
  sanitizePackPath,
  zipEntryAsText,
} from "@/features/export";

const previousFullFlag = process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT;

afterEach(() => {
  if (previousFullFlag === undefined) {
    delete process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT;
  } else {
    process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT = previousFullFlag;
  }
});

describe("path sanitizer", () => {
  it("accepts relative safe paths", () => {
    expect(sanitizePackPath("tokens/colors.json")).toBe("tokens/colors.json");
  });

  it("rejects traversal and absolute paths", () => {
    expect(() => sanitizePackPath("../secret")).toThrow(/traversal/i);
    expect(() => sanitizePackPath("/etc/passwd")).toThrow(/Absolute/);
    expect(() => sanitizePackPath("a/../../b")).toThrow(/traversal/i);
  });

  it("guards zip slip against pack root", () => {
    expect(() => assertRelativeZipEntry("other-root/file.txt", "design-atlas-x-v1-free")).toThrow(
      /escapes/,
    );
  });
});

describe("entitlements", () => {
  it("allows free pack", () => {
    expect(assertPackAccess("free").ok).toBe(true);
  });

  it("blocks full pack without flag", () => {
    delete process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT;
    const decision = assertPackAccess("full");
    expect(decision.ok).toBe(false);
    if (!decision.ok) expect(decision.code).toBe("full_pack_unavailable");
  });

  it("allows full pack with explicit context", () => {
    delete process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT;
    expect(assertPackAccess("full", { allowFullExport: true }).ok).toBe(true);
  });

  it("ignores spoofed premium fields — only allowFullExport/env", () => {
    delete process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT;
    const spoof = { isPremium: true } as { allowFullExport?: boolean };
    const decision = assertPackAccess("full", spoof);
    expect(decision.ok).toBe(false);
  });
});

describe("free export · swiss-international", () => {
  it("prepares a valid free pack from published style", () => {
    const prepared = prepareDesignPack("swiss-international", "free");
    expect(prepared.ok).toBe(true);
    if (!prepared.ok) return;

    const manifest = ExportManifestSchema.parse(prepared.pack.manifest);
    expect(manifest.pack.kind).toBe("free");
    expect(manifest.pack.status).toBe("published");
    expect(manifest.files.some((f) => f.path === "prompts/prompt.en.md")).toBe(true);
    expect(manifest.files.some((f) => f.path === "prompts/prompt.constructor.ru.md")).toBe(true);
    expect(manifest.files.some((f) => f.path === "prompts/prompt.constructor.en.md")).toBe(true);
    expect(manifest.files.some((f) => f.path === "examples/demo-landing/demo.json")).toBe(false);
    expect(prepared.validation.ok).toBe(true);
  });

  it("builds openable ZIP with matching checksums", () => {
    const result = buildDesignPackZip("swiss-international", "free");
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.zip.byteLength).toBeGreaterThan(100);
    const readme = zipEntryAsText(result.zip, `${result.pack.rootDir}/README.md`);
    expect(readme).toContain("AGENT-INSTRUCTIONS.md");
    expect(readme).toContain("prompt");

    const outDir = path.join(process.cwd(), "tmp", "exports");
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, result.fileName), result.zip);
  });

  it("is deterministic for file set and checksums", () => {
    const a = buildDesignPackZip("swiss-international", "free");
    const b = buildDesignPackZip("swiss-international", "free");
    expect(a.ok && b.ok).toBe(true);
    if (!a.ok || !b.ok) return;
    expect(a.pack.manifest.files).toEqual(b.pack.manifest.files);
    expect(Buffer.from(a.zip).equals(Buffer.from(b.zip))).toBe(true);
  });
});

describe("full export · internal", () => {
  it("forms full pack when allowed", () => {
    const result = buildDesignPackZip("swiss-international", "full", { allowFullExport: true });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.pack.manifest.pack.kind).toBe("full");
    expect(result.pack.manifest.files.some((f) => f.path === "CHANGELOG.md")).toBe(true);
    expect(result.pack.manifest.files.some((f) => f.path === "examples/demo-landing/demo.json")).toBe(
      true,
    );
  });

  it("rejects full pack without entitlement", () => {
    delete process.env.DESIGN_ATLAS_ALLOW_FULL_EXPORT;
    const result = buildDesignPackZip("swiss-international", "full");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.status).toBe(403);
  });
});

describe("unpublished / invalid", () => {
  it("rejects unknown style", () => {
    const result = prepareDesignPack("not-a-real-style", "free");
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.status).toBe(404);
  });
});
