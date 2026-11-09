import type { PackKind } from "@/core/schemas";

export type PackMaterialId =
  | "readme"
  | "manifest"
  | "changelog"
  | "design-md"
  | "tokens-md"
  | "agent-instructions"
  | "style-philosophy"
  | "layout-rules"
  | "typography-md"
  | "component-guidelines"
  | "prompt-ru"
  | "prompt-en"
  | "prompt-constructor-ru"
  | "prompt-constructor-en"
  | "tokens-json"
  | "tokens-css"
  | "tokens-splits"
  | "typography-roles"
  | "components-index"
  | "demo-landing";

export type PackDefinition = {
  kind: PackKind;
  access: "free" | "pack";
  materials: readonly PackMaterialId[];
  requiredPaths: readonly string[];
};

const FREE_MATERIALS = [
  "readme",
  "manifest",
  "design-md",
  "tokens-md",
  "agent-instructions",
  "style-philosophy",
  "prompt-ru",
  "prompt-en",
  "prompt-constructor-ru",
  "prompt-constructor-en",
  "tokens-json",
  "tokens-css",
  "tokens-splits",
  "components-index",
] as const satisfies readonly PackMaterialId[];

const FULL_EXTRA = [
  "changelog",
  "layout-rules",
  "typography-md",
  "component-guidelines",
  "typography-roles",
  "demo-landing",
] as const satisfies readonly PackMaterialId[];

export function getPackDefinition(kind: PackKind): PackDefinition {
  if (kind === "free") {
    return {
      kind: "free",
      access: "free",
      materials: FREE_MATERIALS,
      requiredPaths: [
        "README.md",
        "manifest.json",
        "design-system/DESIGN.md",
        "design-system/TOKENS.md",
        "design-system/AGENT-INSTRUCTIONS.md",
        "prompts/prompt.ru.md",
        "prompts/prompt.en.md",
        "prompts/prompt.constructor.ru.md",
        "prompts/prompt.constructor.en.md",
        "tokens/tokens.json",
        "tokens/tokens.css",
        "components/index.json",
      ],
    };
  }

  return {
    kind: "full",
    access: "pack",
    materials: [...FREE_MATERIALS, ...FULL_EXTRA],
    requiredPaths: [
      "README.md",
      "manifest.json",
      "CHANGELOG.md",
      "design-system/DESIGN.md",
      "design-system/TOKENS.md",
      "design-system/AGENT-INSTRUCTIONS.md",
      "design-system/LAYOUT-RULES.md",
      "prompts/prompt.ru.md",
      "prompts/prompt.en.md",
      "prompts/prompt.constructor.ru.md",
      "prompts/prompt.constructor.en.md",
      "tokens/tokens.json",
      "tokens/tokens.css",
      "components/index.json",
      "examples/demo-landing/demo.json",
    ],
  };
}

export function packIncludes(kind: PackKind, material: PackMaterialId): boolean {
  return getPackDefinition(kind).materials.includes(material);
}
