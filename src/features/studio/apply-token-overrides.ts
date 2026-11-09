import type { StyleTokens } from "@/core/schemas";
import { fontFamilyStack, shortFontFamily } from "./google-fonts-cyrillic";

/** Session-only System drawer tweaks (Bootstrap-like theme knobs; not written to content/). */
export type StyleTokenOverrides = {
  background?: string;
  surface?: string;
  text?: string;
  primary?: string;
  accent?: string;
  headingFont?: string;
  bodyFont?: string;
  /** CSS length, e.g. 44px — maps to typography.scale["2xl"] (H1). */
  sizeH1?: string;
  /** maps to scale.xl (H2) */
  sizeH2?: string;
  /** maps to scale.lg (H3) */
  sizeH3?: string;
  /** maps to scale.base (body) */
  sizeBody?: string;
  /** maps to scale.display (hero) */
  sizeDisplay?: string;
  radiusButton?: string;
  radiusCard?: string;
  container?: string;
};

const EMPTY: StyleTokenOverrides = {};

function trimOrUndefined(value: string | undefined): string | undefined {
  const next = value?.trim();
  return next ? next : undefined;
}

function asPx(value: string | undefined): string | undefined {
  const raw = trimOrUndefined(value);
  if (!raw) return undefined;
  if (/^\d+(\.\d+)?px$/i.test(raw)) return raw;
  if (/^\d+(\.\d+)?$/.test(raw)) return `${raw}px`;
  return raw;
}

export function normalizeTokenOverrides(input: StyleTokenOverrides): StyleTokenOverrides {
  return {
    background: trimOrUndefined(input.background),
    surface: trimOrUndefined(input.surface),
    text: trimOrUndefined(input.text),
    primary: trimOrUndefined(input.primary),
    accent: trimOrUndefined(input.accent),
    headingFont: trimOrUndefined(input.headingFont),
    bodyFont: trimOrUndefined(input.bodyFont),
    sizeH1: asPx(input.sizeH1),
    sizeH2: asPx(input.sizeH2),
    sizeH3: asPx(input.sizeH3),
    sizeBody: asPx(input.sizeBody),
    sizeDisplay: asPx(input.sizeDisplay),
    radiusButton: asPx(input.radiusButton),
    radiusCard: asPx(input.radiusCard),
    container: asPx(input.container) ?? trimOrUndefined(input.container),
  };
}

export function hasTokenOverrides(overrides: StyleTokenOverrides): boolean {
  return Object.values(normalizeTokenOverrides(overrides)).some(Boolean);
}

/** Merge System overrides into a style token snapshot for live preview. */
export function applyTokenOverrides(
  tokens: StyleTokens,
  overrides: StyleTokenOverrides = EMPTY,
): StyleTokens {
  const n = normalizeTokenOverrides(overrides);
  if (!hasTokenOverrides(n)) return tokens;

  return {
    ...tokens,
    colors: {
      ...tokens.colors,
      ...(n.background ? { background: n.background } : {}),
      ...(n.surface ? { surface: n.surface } : {}),
      ...(n.text ? { text: n.text } : {}),
      ...(n.primary ? { primary: n.primary } : {}),
      ...(n.accent ? { accent: n.accent } : {}),
    },
    typography: {
      ...tokens.typography,
      ...(n.headingFont ? { heading: fontFamilyStack(n.headingFont) } : {}),
      ...(n.bodyFont ? { body: fontFamilyStack(n.bodyFont) } : {}),
      scale: {
        ...tokens.typography.scale,
        ...(n.sizeBody ? { base: n.sizeBody } : {}),
        ...(n.sizeH3 ? { lg: n.sizeH3 } : {}),
        ...(n.sizeH2 ? { xl: n.sizeH2 } : {}),
        ...(n.sizeH1 ? { "2xl": n.sizeH1 } : {}),
        ...(n.sizeDisplay ? { display: n.sizeDisplay } : {}),
      },
    },
    geometry: {
      ...tokens.geometry,
      ...(n.radiusButton ? { radiusButton: n.radiusButton } : {}),
      ...(n.radiusCard ? { radiusCard: n.radiusCard } : {}),
    },
    spacing: {
      ...tokens.spacing,
      ...(n.container ? { container: n.container } : {}),
    },
  };
}

export function formatSystemOverridesNote(
  overrides: StyleTokenOverrides,
  lang: "ru" | "en",
): string {
  const n = normalizeTokenOverrides(overrides);
  if (!hasTokenOverrides(n)) return "";

  const lines: string[] = [];
  if (n.background) lines.push(`- background: ${n.background}`);
  if (n.surface) lines.push(`- surface: ${n.surface}`);
  if (n.text) lines.push(`- text: ${n.text}`);
  if (n.primary) lines.push(`- primary / brand: ${n.primary}`);
  if (n.accent) lines.push(`- accent / buttons: ${n.accent}`);
  if (n.headingFont)
    lines.push(
      lang === "ru"
        ? `- шрифт заголовков: ${shortFontFamily(n.headingFont)}`
        : `- heading font: ${shortFontFamily(n.headingFont)}`,
    );
  if (n.bodyFont)
    lines.push(
      lang === "ru"
        ? `- шрифт текста: ${shortFontFamily(n.bodyFont)}`
        : `- body font: ${shortFontFamily(n.bodyFont)}`,
    );
  if (n.sizeDisplay) lines.push(`- display: ${n.sizeDisplay}`);
  if (n.sizeH1) lines.push(`- H1: ${n.sizeH1}`);
  if (n.sizeH2) lines.push(`- H2: ${n.sizeH2}`);
  if (n.sizeH3) lines.push(`- H3: ${n.sizeH3}`);
  if (n.sizeBody) lines.push(lang === "ru" ? `- текст: ${n.sizeBody}` : `- body: ${n.sizeBody}`);
  if (n.radiusButton)
    lines.push(lang === "ru" ? `- radius кнопок: ${n.radiusButton}` : `- button radius: ${n.radiusButton}`);
  if (n.radiusCard)
    lines.push(lang === "ru" ? `- radius карточек: ${n.radiusCard}` : `- card radius: ${n.radiusCard}`);
  if (n.container)
    lines.push(lang === "ru" ? `- ширина контейнера: ${n.container}` : `- container: ${n.container}`);

  if (lang === "ru") {
    return [
      "Лёгкие переопределения Studio (панель «Система») поверх готовой дизайн-системы — применяй как theme variables:",
      ...lines,
    ].join("\n");
  }

  return [
    "Light Studio System overrides on top of the finished design system — apply as theme variables:",
    ...lines,
  ].join("\n");
}
