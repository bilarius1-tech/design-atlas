import {
  hasTokenOverrides,
  normalizeTokenOverrides,
  type StyleTokenOverrides,
} from "./apply-token-overrides";
import { shortFontFamily } from "./google-fonts-cyrillic";

export type SystemHistoryEntry = {
  id: string;
  styleId: string;
  label: string;
  createdAt: number;
  overrides: StyleTokenOverrides;
};

export const SYSTEM_HISTORY_STORAGE_KEY = "da-system-history-v1";
export const SYSTEM_HISTORY_MAX = 16;

export function overridesEqual(a: StyleTokenOverrides, b: StyleTokenOverrides): boolean {
  return JSON.stringify(normalizeTokenOverrides(a)) === JSON.stringify(normalizeTokenOverrides(b));
}

export function summarizeOverrides(overrides: StyleTokenOverrides): string {
  const n = normalizeTokenOverrides(overrides);
  if (!hasTokenOverrides(n)) return "База стиля";

  const parts: string[] = [];
  if (n.background) parts.push(`фон ${n.background}`);
  if (n.accent) parts.push(`accent ${n.accent}`);
  if (n.primary) parts.push(`primary ${n.primary}`);
  if (n.headingFont) parts.push(shortFontFamily(n.headingFont));
  if (n.radiusButton) parts.push(`btn ${n.radiusButton}`);
  if (n.radiusCard) parts.push(`card ${n.radiusCard}`);
  if (n.sizeH1) parts.push(`H1 ${n.sizeH1}`);
  if (n.container) parts.push(n.container);

  return parts.slice(0, 3).join(" · ") || "Вариант";
}

export function createHistoryEntry(
  styleId: string,
  overrides: StyleTokenOverrides,
  label?: string,
): SystemHistoryEntry {
  const normalized = normalizeTokenOverrides(overrides);
  return {
    id: `sys-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    styleId,
    label: label?.trim() || summarizeOverrides(normalized),
    createdAt: Date.now(),
    overrides: normalized,
  };
}

/** Newest first. Drops duplicate of newest tip; caps length. */
export function pushHistoryEntry(
  entries: readonly SystemHistoryEntry[],
  entry: SystemHistoryEntry,
  max = SYSTEM_HISTORY_MAX,
): SystemHistoryEntry[] {
  const newest = entries[0];
  if (
    newest &&
    newest.styleId === entry.styleId &&
    overridesEqual(newest.overrides, entry.overrides)
  ) {
    return [...entries];
  }
  return [entry, ...entries].slice(0, max);
}

export function entriesForStyle(
  entries: readonly SystemHistoryEntry[],
  styleId: string,
): SystemHistoryEntry[] {
  return entries.filter((entry) => entry.styleId === styleId);
}

export function removeHistoryEntry(
  entries: readonly SystemHistoryEntry[],
  id: string,
): SystemHistoryEntry[] {
  return entries.filter((entry) => entry.id !== id);
}

export function readHistoryFromSession(): SystemHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(SYSTEM_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isHistoryEntry).slice(0, SYSTEM_HISTORY_MAX);
  } catch {
    return [];
  }
}

export function writeHistoryToSession(entries: readonly SystemHistoryEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(SYSTEM_HISTORY_STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // quota / private mode — ignore
  }
}

function isHistoryEntry(value: unknown): value is SystemHistoryEntry {
  if (!value || typeof value !== "object") return false;
  const entry = value as Partial<SystemHistoryEntry>;
  return (
    typeof entry.id === "string" &&
    typeof entry.styleId === "string" &&
    typeof entry.label === "string" &&
    typeof entry.createdAt === "number" &&
    entry.overrides !== undefined &&
    typeof entry.overrides === "object"
  );
}

export function formatHistoryTime(createdAt: number): string {
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(createdAt));
  } catch {
    return "";
  }
}
