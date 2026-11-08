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

export const DemoDefinitionSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    styleId: KebabIdSchema,
    compositionId: KebabIdSchema,
    sections: z
      .array(
        z
          .object({
            id: DemoSectionIdSchema,
            headline: LocalizedStringSchema.optional(),
            body: LocalizedStringSchema.optional(),
            notes: z.string().optional(),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

export type DemoDefinition = z.infer<typeof DemoDefinitionSchema>;
