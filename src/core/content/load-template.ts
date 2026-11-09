import { existsSync, readdirSync } from "node:fs";
import {
  PageTemplateSchema,
  type DemoDefinition,
  type PageTemplate,
} from "@/core/schemas";
import { getTemplatesRoot, templateDirectory, templateFilePath } from "./paths";
import { parseJsonFile } from "./read-json";

export function listTemplateIdsFromDisk(): string[] {
  const root = getTemplatesRoot();
  if (!existsSync(root)) return [];
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
    .sort();
}

export function loadPageTemplate(templateId: string): PageTemplate {
  const directory = templateDirectory(templateId);
  if (!existsSync(directory)) {
    throw new Error(`Template directory not found: ${directory}`);
  }

  const template = parseJsonFile(templateFilePath(templateId, "template.json"), PageTemplateSchema);
  if (template.id !== templateId) {
    throw new Error(`template.id (${template.id}) does not match folder (${templateId})`);
  }
  return template;
}

/** Bind a page template to a visual style for the existing demo renderer. */
export function templateToDemoDefinition(
  template: PageTemplate,
  styleId: string,
): DemoDefinition {
  return {
    schemaVersion: "1.0.0",
    styleId,
    compositionId: template.defaultCompositionId,
    localeDefault: "ru",
    sections: template.sections,
  };
}
