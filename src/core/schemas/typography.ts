import { z } from "zod";
import { KebabIdSchema } from "./common";

const TypographyRoleSpecSchema = z
  .object({
    family: z.enum(["heading", "body", "mono"]),
    size: z.string().min(1),
    weight: z.string().min(1),
    lineHeight: z.string().min(1),
    letterSpacing: z.string().optional(),
  })
  .strict();

export const TypographyDefinitionSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    styleId: KebabIdSchema,
    families: z
      .object({
        heading: z.string().min(1),
        body: z.string().min(1),
        mono: z.string().min(1),
        fallbacks: z.array(z.string().min(1)).min(1),
      })
      .strict(),
    roles: z
      .object({
        display: TypographyRoleSpecSchema,
        h1: TypographyRoleSpecSchema,
        h2: TypographyRoleSpecSchema,
        h3: TypographyRoleSpecSchema,
        h4: TypographyRoleSpecSchema,
        bodyLarge: TypographyRoleSpecSchema,
        body: TypographyRoleSpecSchema,
        caption: TypographyRoleSpecSchema,
        label: TypographyRoleSpecSchema,
        quote: TypographyRoleSpecSchema,
        code: TypographyRoleSpecSchema,
      })
      .strict(),
    rules: z.array(z.string().min(1)).default([]),
    constraints: z.array(z.string().min(1)).default([]),
  })
  .strict();

export type TypographyDefinition = z.infer<typeof TypographyDefinitionSchema>;
