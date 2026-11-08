import type { LocalizedString } from "@/core/schemas";

export type DemoLocale = "ru" | "en";

export function t(value: LocalizedString | undefined, locale: DemoLocale): string {
  if (!value) {
    return "";
  }
  return value[locale] || value.ru || value.en;
}
