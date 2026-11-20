import {
  composeDesignSpec,
  type DesignSpecSection,
  type DesignSpecSource,
  type DesignSpecLang,
  type DesignSpecSurface,
} from "@/features/design-spec";

export type PromptLang = DesignSpecLang;
export type HandoffSurface = DesignSpecSurface;

/** Kept for Studio preview wiring; not injected into handoff prompts. */
export type TemplateSectionOutline = {
  id: string;
  title: string;
};

export type PromptOutlineSection = DesignSpecSection;

export type ComposePromptInput = {
  lang: PromptLang;
  surface: HandoffSurface;
  styleId: string;
  styleTitle: string;
  /** Preview-only in Studio — never written into the handoff prompt body as a template outline. */
  templateId?: string;
  templateTitle?: string;
  templateSections?: readonly TemplateSectionOutline[];
  productName: string;
  pageBrief: string;
  systemOverridesNote?: string;
  specSource: DesignSpecSource;
};

export function composeHandoffSections(input: ComposePromptInput): PromptOutlineSection[] {
  return composeDesignSpec({
    source: input.specSource,
    lang: input.lang,
    surface: input.surface,
    productName: input.productName,
    pageBrief: input.pageBrief,
    systemOverridesNote: input.systemOverridesNote,
  }).sections;
}

export function composeHandoffPrompt(input: ComposePromptInput): string {
  return composeDesignSpec({
    source: input.specSource,
    lang: input.lang,
    surface: input.surface,
    productName: input.productName,
    pageBrief: input.pageBrief,
    systemOverridesNote: input.systemOverridesNote,
  }).markdown;
}

export function estimatePromptChars(text: string): number {
  return text.length;
}
