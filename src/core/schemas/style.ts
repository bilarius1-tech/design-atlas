import { z } from "zod";
import {
  KebabIdSchema,
  LocalizedStringSchema,
  SourceSchema,
  StyleStatusSchema,
} from "./common";

export const StyleDefinitionSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    id: KebabIdSchema,
    slug: KebabIdSchema,
    status: StyleStatusSchema,
    version: z.string().min(1),
    title: LocalizedStringSchema,
    shortDescription: LocalizedStringSchema,
    philosophy: LocalizedStringSchema,
    category: KebabIdSchema,
    tags: z.array(KebabIdSchema).default([]),
    complexity: z.enum(["low", "medium", "high"]),
    visualDensity: z.enum(["sparse", "balanced", "dense"]),
    contrast: z.enum(["low", "medium", "high"]),
    bestUseCases: z.array(z.string().min(1)).min(1),
    avoidFor: z.array(z.string().min(1)).min(1),
    relatedStyles: z.array(KebabIdSchema).default([]),
    fontFamilies: z.array(z.string().min(1)).min(1),
    author: z.string().min(1),
    updatedAt: z.string().datetime(),
    sources: z.array(SourceSchema).default([]),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.id !== value.slug) {
      ctx.addIssue({
        code: "custom",
        message: "id and slug must match",
        path: ["slug"],
      });
    }

    if (value.status === "published" && value.sources.length < 1) {
      ctx.addIssue({
        code: "custom",
        message: "published styles require at least one source",
        path: ["sources"],
      });
    }
  });

export type StyleDefinition = z.infer<typeof StyleDefinitionSchema>;
