import type { DemoCompositionId, DemoSectionId } from "@/core/schemas";

export type CompositionProfile = {
  id: DemoCompositionId;
  label: string;
  description: string;
  /** Preferred section order hint — engine still follows demo.json order. */
  suggestedOrder: DemoSectionId[];
  className: string;
};

export const COMPOSITIONS: Record<DemoCompositionId, CompositionProfile> = {
  "modular-stack": {
    id: "modular-stack",
    label: "Modular stack",
    description: "Neutral vertical composition for most styles.",
    suggestedOrder: [
      "header",
      "hero",
      "features",
      "showcase",
      "testimonials",
      "pricing",
      "faq",
      "cta",
      "footer",
    ],
    className: "dl-composition-stack",
  },
  "swiss-editorial-grid": {
    id: "swiss-editorial-grid",
    label: "Swiss editorial grid",
    description: "Asymmetric grid, hairlines, flush-left typography.",
    suggestedOrder: [
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
    ],
    className: "dl-composition-swiss",
  },
  "editorial-split": {
    id: "editorial-split",
    label: "Editorial split",
    description: "Large type and media columns for magazine-like styles.",
    suggestedOrder: [
      "header",
      "hero",
      "editorial",
      "features",
      "showcase",
      "testimonials",
      "cta",
      "footer",
    ],
    className: "dl-composition-editorial",
  },
};

export function resolveComposition(compositionId: string): CompositionProfile {
  if (compositionId in COMPOSITIONS) {
    return COMPOSITIONS[compositionId as DemoCompositionId];
  }
  return COMPOSITIONS["modular-stack"];
}
