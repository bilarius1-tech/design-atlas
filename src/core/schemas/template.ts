import { z } from "zod";
import { KebabIdSchema, LocalizedStringSchema } from "./common";
import { DemoCompositionIdSchema, DemoSectionSchema } from "./demo";

export const TemplateCategorySchema = z.enum([
  "saas",
  "store",
  "portfolio",
  "marketing",
  "other",
]);

export const PageTemplateSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    id: KebabIdSchema,
    title: LocalizedStringSchema,
    shortDescription: LocalizedStringSchema,
    category: TemplateCategorySchema,
    defaultCompositionId: DemoCompositionIdSchema,
    sections: z.array(DemoSectionSchema).min(1),
  })
  .strict();

export type PageTemplate = z.infer<typeof PageTemplateSchema>;
export type TemplateCategory = z.infer<typeof TemplateCategorySchema>;
