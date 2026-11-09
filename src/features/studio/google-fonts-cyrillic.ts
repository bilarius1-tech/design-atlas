/**
 * Curated Google Fonts with Cyrillic (Bootstrap-like theme knobs, not “all of GF”).
 * Family name must match Google Fonts API `family=` value.
 */
export type GoogleFontOption = {
  family: string;
  category: "sans" | "serif" | "display" | "mono";
};

export const GOOGLE_FONTS_CYRILLIC: readonly GoogleFontOption[] = [
  { family: "Manrope", category: "sans" },
  { family: "Inter", category: "sans" },
  { family: "Nunito", category: "sans" },
  { family: "Nunito Sans", category: "sans" },
  { family: "IBM Plex Sans", category: "sans" },
  { family: "IBM Plex Serif", category: "serif" },
  { family: "IBM Plex Mono", category: "mono" },
  { family: "Source Sans 3", category: "sans" },
  { family: "Source Serif 4", category: "serif" },
  { family: "Source Code Pro", category: "mono" },
  { family: "Roboto", category: "sans" },
  { family: "Roboto Slab", category: "serif" },
  { family: "Roboto Mono", category: "mono" },
  { family: "Open Sans", category: "sans" },
  { family: "Montserrat", category: "sans" },
  { family: "Montserrat Alternates", category: "display" },
  { family: "PT Sans", category: "sans" },
  { family: "PT Serif", category: "serif" },
  { family: "PT Mono", category: "mono" },
  { family: "Noto Sans", category: "sans" },
  { family: "Noto Serif", category: "serif" },
  { family: "Noto Sans Display", category: "display" },
  { family: "Ubuntu", category: "sans" },
  { family: "Ubuntu Mono", category: "mono" },
  { family: "Rubik", category: "sans" },
  { family: "Oswald", category: "display" },
  { family: "Raleway", category: "sans" },
  { family: "Merriweather", category: "serif" },
  { family: "Merriweather Sans", category: "sans" },
  { family: "Playfair Display", category: "serif" },
  { family: "Lora", category: "serif" },
  { family: "Cormorant Garamond", category: "serif" },
  { family: "Literata", category: "serif" },
  { family: "Fira Sans", category: "sans" },
  { family: "Fira Code", category: "mono" },
  { family: "JetBrains Mono", category: "mono" },
  { family: "Comfortaa", category: "display" },
  { family: "Exo 2", category: "sans" },
  { family: "Yanone Kaffeesatz", category: "display" },
  { family: "Philosopher", category: "serif" },
  { family: "Poiret One", category: "display" },
  { family: "Unbounded", category: "display" },
  { family: "Onest", category: "sans" },
  { family: "Golos Text", category: "sans" },
  { family: "Commissioner", category: "sans" },
  { family: "Mulish", category: "sans" },
] as const;

export function fontFamilyStack(family: string): string {
  const name = family.trim();
  if (!name) return "system-ui, sans-serif";
  const quoted = name.includes(" ") ? `"${name}"` : name;
  return `${quoted}, system-ui, -apple-system, "Segoe UI", sans-serif`;
}

export function shortFontFamily(stackOrFamily: string): string {
  const first = stackOrFamily.split(",")[0]?.trim() ?? stackOrFamily;
  return first.replace(/^["']|["']$/g, "");
}

export function googleFontsCssUrl(families: readonly string[]): string | null {
  const unique = [...new Set(families.map((f) => f.trim()).filter(Boolean))];
  if (unique.length === 0) return null;
  const params = unique
    .map((family) => `family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@400;500;600;700`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap&subset=cyrillic,cyrillic-ext,latin`;
}
