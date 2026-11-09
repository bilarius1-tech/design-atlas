import { z } from "zod";
import { KebabIdSchema, LocalizedStringSchema, StyleStatusSchema } from "./common";

export const CardKindSchema = z.enum([
  "blueprint",
  "industrial",
  "catalog",
  "premium",
  "eco",
  "market",
  "scandi",
  "clinical",
  "vintage",
  "neon",
]);

export const CardStyleDefinitionSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    id: KebabIdSchema,
    status: StyleStatusSchema,
    title: LocalizedStringSchema,
    tag: LocalizedStringSchema,
    category: LocalizedStringSchema,
    description: LocalizedStringSchema,
    kind: CardKindSchema,
    fonts: z.array(z.string().min(1)).min(1),
    colors: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/)).min(1),
    background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    ink: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    prompt: LocalizedStringSchema,
    samples: z.array(z.string().min(1)).default([]),
    active: z.boolean().default(true),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (!value.id.startsWith("card-")) {
      ctx.addIssue({
        code: "custom",
        message: "card style id must start with card-",
        path: ["id"],
      });
    }
  });

export const CardStylesIndexSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    styles: z.array(
      z
        .object({
          id: KebabIdSchema,
          path: z.string().min(1),
        })
        .strict(),
    ),
  })
  .strict();

export type CardKind = z.infer<typeof CardKindSchema>;
export type CardStyleDefinition = z.infer<typeof CardStyleDefinitionSchema>;
export type CardStylesIndex = z.infer<typeof CardStylesIndexSchema>;
