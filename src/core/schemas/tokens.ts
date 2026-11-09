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
        /** Optional second accent for clay / multi-accent packs. */
        accentSecondary: CssValueSchema.optional(),
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
        /**
         * Optional grid / stack gap. Use `0px` for flush dense-tile systems
         * (Taptop-like industrial mosaics). Omit for default unit-based gap.
         */
        gap: CssValueSchema.optional(),
      })
      .strict(),
    geometry: z
      .object({
        /** Default / shared radius (inputs, media, fallback). */
        radius: CssValueSchema,
        /** Optional button radius; falls back to `radius` in CSS. */
        radiusButton: CssValueSchema.optional(),
        /** Optional card / panel radius; falls back to `radius` in CSS. */
        radiusCard: CssValueSchema.optional(),
        borderWidth: CssValueSchema,
      })
      .strict(),
    effects: z
      .object({
        /** Full CSS box-shadow; may be a multi-layer stack (neu/clay). */
        shadow: CssValueSchema,
        /** Optional inset / pressed / inner-light layer appended in CSS vars. */
        shadowInset: CssValueSchema.optional(),
        /** Optional blur length for glass surfaces. */
        blur: CssValueSchema.optional(),
        transition: CssValueSchema,
      })
      .strict(),
  })
  .strict();

export type StyleTokens = z.infer<typeof StyleTokensSchema>;
