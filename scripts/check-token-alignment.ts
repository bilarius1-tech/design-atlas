#!/usr/bin/env tsx
/**
 * Fail if style markdown (DESIGN.md, prompts, TOKENS.md, …) contradicts tokens.json.
 * tokens.json is the source of truth for numeric values (type scale, spacing, geometry, colors).
 */
import { readdirSync, readFileSync, existsSync, writeFileSync } from "node:fs";
import path from "node:path";
import { StyleTokensSchema, type StyleTokens } from "../src/core/schemas";

const stylesRoot = path.resolve(process.cwd(), "content/styles");
const MARKDOWN_FILES = [
  "DESIGN.md",
  "TOKENS.md",
  "AGENT-INSTRUCTIONS.md",
  "overview.md",
  "rules.md",
  "prompt.ru.md",
  "prompt.en.md",
  "prompt.constructor.ru.md",
  "prompt.constructor.en.md",
];

type Finding = {
  styleId: string;
  file: string;
  message: string;
  from?: string;
  to?: string;
  index: number;
  length: number;
};

const SCALE_KEYS = ["display", "2xl", "xl", "lg", "base", "sm", "xs"] as const;

function loadTokens(styleId: string): StyleTokens {
  const raw = JSON.parse(readFileSync(path.join(stylesRoot, styleId, "tokens.json"), "utf8"));
  return StyleTokensSchema.parse(raw);
}

function collectFindings(styleId: string, fix: boolean): Finding[] {
  const tokens = loadTokens(styleId);
  const findings: Finding[] = [];
  const scale = tokens.typography.scale as Record<(typeof SCALE_KEYS)[number], string>;

  for (const fileName of MARKDOWN_FILES) {
    const filePath = path.join(stylesRoot, styleId, fileName);
    if (!existsSync(filePath)) continue;
    let text = readFileSync(filePath, "utf8");
    let mutated = false;

    for (const key of SCALE_KEYS) {
      const expected = scale[key];
      const expectedNum = expected.replace(/px$/i, "");
      const pattern = new RegExp(
        `(?<![A-Za-z0-9])(${key})(\\s*(?:=|:)?\\s*\`?)(\\d+)(px)?(\`?)`,
        "gi",
      );
      text = text.replace(pattern, (full, token, mid, num, px, tick, offset) => {
        const actualPx = `${num}${px ?? "px"}`;
        if (actualPx.toLowerCase() === expected.toLowerCase() || num === expectedNum) {
          return full;
        }
        const shown = px ? expected : expectedNum;
        const next = `${token}${mid}${shown}${tick ?? ""}`;
        findings.push({
          styleId,
          file: fileName,
          message: `${key} is ${actualPx}, tokens say ${expected}`,
          from: full,
          to: next,
          index: offset,
          length: full.length,
        });
        mutated = true;
        return next;
      });
    }

    if (fix && mutated) {
      writeFileSync(filePath, text);
    }
  }

  return findings;
}

function main() {
  const fix = process.argv.includes("--fix");
  const ids = readdirSync(stylesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  const all: Finding[] = [];
  for (const id of ids) {
    if (!existsSync(path.join(stylesRoot, id, "tokens.json"))) continue;
    all.push(...collectFindings(id, fix));
  }

  if (all.length === 0) {
    console.log(`Token alignment check passed (${ids.length} styles).`);
    return;
  }

  for (const finding of all) {
    const verb = fix ? "fixed" : "mismatch";
    console.log(`${verb}  ${finding.styleId}/${finding.file}: ${finding.message}`);
  }

  if (fix) {
    console.log(`\nApplied ${all.length} alignment fix(es). Re-run without --fix to verify.`);
    return;
  }

  console.error(`\nToken alignment failed with ${all.length} mismatch(es). Run: pnpm content:align -- --fix`);
  process.exit(1);
}

main();
