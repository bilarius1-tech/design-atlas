import { existsSync } from "node:fs";
import {
  ComponentsDefinitionSchema,
  DemoDefinitionSchema,
  StyleDefinitionSchema,
  StyleTokensSchema,
  TypographyDefinitionSchema,
  type ComponentsDefinition,
  type DemoDefinition,
  type StyleDefinition,
  type StyleTokens,
  type TypographyDefinition,
} from "@/core/schemas";
import { parseJsonFile } from "./read-json";
import { styleDirectory, styleFilePath } from "./paths";

export type LoadedStyleBundle = {
  id: string;
  directory: string;
  style: StyleDefinition;
  tokens: StyleTokens;
  typography?: TypographyDefinition;
  components?: ComponentsDefinition;
  demo?: DemoDefinition;
  files: {
    present: string[];
    missing: string[];
  };
};

export function loadStyleBundle(styleId: string): LoadedStyleBundle {
  const directory = styleDirectory(styleId);
  if (!existsSync(directory)) {
    throw new Error(`Style directory not found: ${directory}`);
  }

  const style = parseJsonFile(styleFilePath(styleId, "style.json"), StyleDefinitionSchema);
  const tokens = parseJsonFile(styleFilePath(styleId, "tokens.json"), StyleTokensSchema);

  if (style.id !== styleId) {
    throw new Error(`style.id (${style.id}) does not match folder name (${styleId})`);
  }

  if (tokens.meta.styleId !== styleId) {
    throw new Error(
      `tokens.meta.styleId (${tokens.meta.styleId}) does not match folder name (${styleId})`,
    );
  }

  const present = ["style.json", "tokens.json"];
  const missing: string[] = [];
  const bundle: LoadedStyleBundle = {
    id: styleId,
    directory,
    style,
    tokens,
    files: { present, missing },
  };

  const typographyPath = styleFilePath(styleId, "typography.json");
  if (existsSync(typographyPath)) {
    bundle.typography = parseJsonFile(typographyPath, TypographyDefinitionSchema);
    present.push("typography.json");
  } else {
    missing.push("typography.json");
  }

  const componentsPath = styleFilePath(styleId, "components.json");
  if (existsSync(componentsPath)) {
    bundle.components = parseJsonFile(componentsPath, ComponentsDefinitionSchema);
    present.push("components.json");
  } else {
    missing.push("components.json");
  }

  const demoPath = styleFilePath(styleId, "demo.json");
  if (existsSync(demoPath)) {
    bundle.demo = parseJsonFile(demoPath, DemoDefinitionSchema);
    present.push("demo.json");
  } else {
    missing.push("demo.json");
  }

  return bundle;
}
