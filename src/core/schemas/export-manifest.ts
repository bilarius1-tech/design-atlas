import { z } from "zod";
import { KebabIdSchema, SemVerSchema } from "./common";

export const PackKindSchema = z.enum(["free", "full"]);
export type PackKind = z.infer<typeof PackKindSchema>;

export const ExportManifestFileSchema = z
  .object({
    path: z.string().min(1),
    bytes: z.number().int().nonnegative(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/),
    contentType: z.string().min(1).optional(),
  })
  .strict();

export const ExportManifestSchema = z
  .object({
    format: z.literal("design-atlas-pack"),
    formatVersion: z.literal("1.0"),
    product: z.literal("DESIGN ATLAS"),
    generatorVersion: SemVerSchema,
    generatedAt: z.string().datetime(),
    pack: z
      .object({
        id: KebabIdSchema,
        slug: KebabIdSchema,
        version: SemVerSchema,
        kind: PackKindSchema,
        access: z.enum(["free", "pack", "pro"]),
        status: z.literal("published"),
      })
      .strict(),
    contents: z
      .object({
        designSystem: z.boolean(),
        tokens: z.boolean(),
        components: z.boolean(),
        prompts: z.array(z.enum(["ru", "en"])),
        examples: z.boolean(),
        assets: z.boolean(),
      })
      .strict(),
    files: z.array(ExportManifestFileSchema),
    compatibility: z
      .object({
        agents: z.array(z.string()),
        frameworks: z.array(z.string()),
      })
      .strict(),
  })
  .strict();

export type ExportManifest = z.infer<typeof ExportManifestSchema>;
export type ExportManifestFile = z.infer<typeof ExportManifestFileSchema>;
