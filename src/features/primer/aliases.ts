export const NICHE_IDS = ["dental", "construction", "furniture"] as const;
export type PrimerNicheId = (typeof NICHE_IDS)[number];

const NICHE_ALIASES: Record<string, PrimerNicheId> = {
  dental: "dental",
  stomatology: "dental",
  stomatologiya: "dental",
  stomatologia: "dental",
  clinic: "dental",
  construction: "construction",
  stroy: "construction",
  stroitelstvo: "construction",
  build: "construction",
  building: "construction",
  furniture: "furniture",
  mebel: "furniture",
  mebelnaya: "furniture",
};

const STYLE_ALIASES: Record<string, string> = {
  swiss: "swiss-international",
  poster: "poster-brutal",
  midnight: "midnight-console",
  clinical: "clinical-minimal",
  industrial: "industrial-power",
  scandi: "scandi-calm",
  editorial: "soft-editorial",
  material: "material-design-3",
  md3: "material-design-3",
  neon: "neon-tech",
  glass: "glassmorphism",
  clay: "claymorphism",
  neu: "neumorphism",
  brutal: "neo-brutalism",
  neo: "neo-brutalism",
  apple: "apple-materials",
  aurora: "aurora-mesh",
  bento: "bento-grid",
  blueprint: "blueprint-grid",
  eco: "eco-botanical",
  kinetic: "kinetic",
  retro: "retro-terminal",
  street: "streetwear",
  vintage: "vintage-gold",
  warm: "warm-premium",
  y2k: "y2k",
};

export const DEFAULT_STYLE_ID = "swiss-international";
export const DEFAULT_NICHE: PrimerNicheId = "dental";

export function resolveNiche(raw: string | null | undefined): PrimerNicheId {
  const key = (raw ?? "").trim().toLowerCase();
  return NICHE_ALIASES[key] ?? DEFAULT_NICHE;
}

export function resolveStyleId(
  raw: string | null | undefined,
  availableIds: readonly string[],
  fallback = DEFAULT_STYLE_ID,
): string {
  const key = (raw ?? "").trim().toLowerCase();
  if (!key) return availableIds.includes(fallback) ? fallback : (availableIds[0] ?? fallback);
  if (availableIds.includes(key)) return key;
  const aliased = STYLE_ALIASES[key];
  if (aliased && availableIds.includes(aliased)) return aliased;
  const prefix = availableIds.filter((id) => id === key || id.startsWith(`${key}-`));
  if (prefix.length === 1) return prefix[0]!;
  return availableIds.includes(fallback) ? fallback : (availableIds[0] ?? fallback);
}

export function primerHref(styleId: string, niche: PrimerNicheId): string {
  const params = new URLSearchParams({ style: styleId, niche });
  return `/primer?${params.toString()}`;
}
