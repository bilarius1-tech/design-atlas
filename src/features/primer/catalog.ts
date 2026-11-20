import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";
import type { StyleTokens } from "@/core/schemas";

export type PrimerStyleOption = {
  id: string;
  title: string;
  tokens: StyleTokens;
};

export function loadPrimerCatalog(): PrimerStyleOption[] {
  return listStyleIdsFromDisk().flatMap((id) => {
    try {
      const bundle = loadStyleBundle(id);
      if (bundle.style.status !== "published") return [];
      return [
        {
          id,
          title: bundle.style.title.ru,
          tokens: bundle.tokens,
        },
      ];
    } catch {
      return [];
    }
  });
}
