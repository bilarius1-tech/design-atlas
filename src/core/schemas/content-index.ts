import { z } from "zod";
import { KebabIdSchema } from "./common";

export const ContentIndexSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    styles: z
      .array(
        z
          .object({
            id: KebabIdSchema,
            path: z.string().regex(/^content\/styles\/[a-z0-9]+(?:-[a-z0-9]+)*$/),
          })
          .strict(),
      )
      .default([]),
    glossary: z
      .array(
        z
          .object({
            id: KebabIdSchema,
            path: z.string().min(1),
          })
          .strict(),
      )
      .default([]),
  })
  .strict();

export type ContentIndex = z.infer<typeof ContentIndexSchema>;
