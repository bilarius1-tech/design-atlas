import { readFileSync } from "node:fs";
import type { ZodType } from "zod";

export function readJsonFile(filePath: string): unknown {
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as unknown;
}

export function parseJsonFile<T>(filePath: string, schema: ZodType<T>): T {
  return schema.parse(readJsonFile(filePath));
}
