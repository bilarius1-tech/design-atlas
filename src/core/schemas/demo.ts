import { z } from "zod";
import { KebabIdSchema, LocalizedStringSchema } from "./common";

export const DemoSectionIdSchema = z.enum([
  "header",
  "hero",
  "features",
  "editorial",
  "showcase",
  "statistics",
  "testimonials",
  "pricing",
  "faq",
  "cta",
  "footer",
]);

export const DemoCompositionIdSchema = z.enum([
  "modular-stack",
  "swiss-editorial-grid",
  "editorial-split",
  /** Flush tile mosaic (0 gutter features/stats) — not a page builder. */
  "dense-tile",
]);

export const DemoItemSchema = z
  .object({
    title: LocalizedStringSchema,
    body: LocalizedStringSchema.optional(),
    meta: LocalizedStringSchema.optional(),
  })
  .strict();

export const DemoSectionSchema = z
  .object({
    id: DemoSectionIdSchema,
    eyebrow: LocalizedStringSchema.optional(),
    headline: LocalizedStringSchema.optional(),
    body: LocalizedStringSchema.optional(),
    ctaLabel: LocalizedStringSchema.optional(),
    ctaHref: z.string().min(1).optional(),
    items: z.array(DemoItemSchema).optional(),
    notes: z.string().optional(),
  })
  .strict();

export const DemoDefinitionSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    styleId: KebabIdSchema,
    compositionId: DemoCompositionIdSchema,
    localeDefault: z.enum(["ru", "en"]).default("ru"),
    sections: z.array(DemoSectionSchema).min(1),
  })
  .strict();

export type DemoItem = z.infer<typeof DemoItemSchema>;
export type DemoSection = z.infer<typeof DemoSectionSchema>;
export type DemoDefinition = z.infer<typeof DemoDefinitionSchema>;
export type DemoCompositionId = z.infer<typeof DemoCompositionIdSchema>;
export type DemoSectionId = z.infer<typeof DemoSectionIdSchema>;
