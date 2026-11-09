import {
  readHistoryFromSession,
  writeHistoryToSession,
  type SystemHistoryEntry,
} from "./system-history";

type Listener = () => void;

let entries: SystemHistoryEntry[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) listener();
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  entries = readHistoryFromSession();
}

export function subscribeSystemHistory(listener: Listener): () => void {
  ensureHydrated();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSystemHistorySnapshot(): SystemHistoryEntry[] {
  ensureHydrated();
  return entries;
}

export function getServerSystemHistorySnapshot(): SystemHistoryEntry[] {
  return [];
}

export function setSystemHistory(next: SystemHistoryEntry[]): void {
  ensureHydrated();
  entries = next;
  writeHistoryToSession(entries);
  emit();
}
