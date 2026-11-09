import { z } from "zod";

/** Language-independent kebab-case id / slug. */
export const KebabIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Expected kebab-case id");

export const LocalizedStringSchema = z
  .object({
    ru: z.string().min(1),
    en: z.string().min(1),
  })
  .strict();

export const SourceSchema = z
  .object({
    title: z.string().min(1),
    url: z.string().url().optional(),
    note: z.string().optional(),
  })
  .strict();

export const StyleStatusSchema = z.enum(["draft", "review", "published", "archived"]);

export const SemVerSchema = z
  .string()
  .regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/, "Expected semver");

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type StyleStatus = z.infer<typeof StyleStatusSchema>;
export type SemVer = z.infer<typeof SemVerSchema>;
