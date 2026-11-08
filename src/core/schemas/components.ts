import { z } from "zod";
import { KebabIdSchema } from "./common";

export const DemoGroupIdSchema = z.enum([
  "typography",
  "buttons",
  "forms",
  "shapes",
  "cards",
  "navigation",
  "feedback",
  "icons",
]);

export const ComponentsDefinitionSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    styleId: KebabIdSchema,
    groups: z
      .array(
        z
          .object({
            id: DemoGroupIdSchema,
            label: z.string().min(1),
            items: z.array(z.string().min(1)).min(1),
            notes: z.string().optional(),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

export type ComponentsDefinition = z.infer<typeof ComponentsDefinitionSchema>;
