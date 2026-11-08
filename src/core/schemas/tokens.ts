import { z } from "zod";
import { KebabIdSchema } from "./common";

const CssValueSchema = z.string().min(1);

export const StyleTokensSchema = z
  .object({
    schemaVersion: z.literal("1.0.0"),
    meta: z
      .object({
        styleId: KebabIdSchema,
        name: z.string().min(1),
      })
      .strict(),
    colors: z
      .object({
        background: CssValueSchema,
        surface: CssValueSchema,
        text: CssValueSchema,
        muted: CssValueSchema,
        primary: CssValueSchema,
        accent: CssValueSchema,
        border: CssValueSchema,
      })
      .strict(),
    typography: z
      .object({
        heading: CssValueSchema,
        body: CssValueSchema,
        mono: CssValueSchema,
        scale: z
          .object({
            xs: CssValueSchema,
            sm: CssValueSchema,
            base: CssValueSchema,
            lg: CssValueSchema,
            xl: CssValueSchema,
            "2xl": CssValueSchema,
            display: CssValueSchema,
          })
          .strict(),
      })
      .strict(),
    spacing: z
      .object({
        unit: z.number().positive(),
        section: CssValueSchema,
        container: CssValueSchema,
      })
      .strict(),
    geometry: z
      .object({
        radius: CssValueSchema,
        borderWidth: CssValueSchema,
      })
      .strict(),
    effects: z
      .object({
        shadow: CssValueSchema,
        transition: CssValueSchema,
      })
      .strict(),
  })
  .strict();

export type StyleTokens = z.infer<typeof StyleTokensSchema>;
