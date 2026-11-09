"use client";

import type { StyleTokens } from "@/core/schemas";
import { Hint } from "@/components/ui";
import { cn } from "@/lib/cn";
import { BookmarkPlus, History, RotateCcw, SlidersHorizontal, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import type { StyleTokenOverrides } from "./apply-token-overrides";
import { hasTokenOverrides } from "./apply-token-overrides";
import {
  GOOGLE_FONTS_CYRILLIC,
  shortFontFamily,
} from "./google-fonts-cyrillic";
import type { StudioSidebarStyle } from "./studio-sidebar";
import {
  formatHistoryTime,
  overridesEqual,
  type SystemHistoryEntry,
} from "./system-history";

export type SystemDrawerProps = {
  open: boolean;
  onClose: () => void;
  style: StudioSidebarStyle;
  tokens: StyleTokens;
  overrides: StyleTokenOverrides;
  onOverridesChange: (next: StyleTokenOverrides) => void;
  history: readonly SystemHistoryEntry[];
  onSaveHistory: () => void;
  onRestoreHistory: (entry: SystemHistoryEntry) => void;
  onDeleteHistory: (id: string) => void;
};

const RADIUS_PRESETS = ["0px", "4px", "6px", "8px", "12px", "16px", "24px", "32px", "999px"] as const;
const CONTAINER_PRESETS = ["980px", "1080px", "1120px", "1180px", "1200px", "1280px"] as const;

function pxNumber(value: string): number {
  const match = value.trim().match(/^(\d+(\.\d+)?)/);
  return match ? Number(match[1]) : 16;
}

function withPreset(current: string, presets: readonly string[]): string[] {
  return presets.includes(current) ? [...presets] : [current, ...presets];
}

function ColorField({
  label,
  value,
  fallback,
  onChange,
}: {
  label: string;
  value: string;
  fallback: string;
  onChange: (next: string | undefined) => void;
}) {
  const hex = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : "#888888";
  return (
    <label className="block space-y-1">
      <span className="text-[11px] text-muted">{label}</span>
      <div className="flex gap-2">
        <input
          type="color"
          aria-label={label}
          value={hex}
          onChange={(event) =>
            onChange(event.target.value === fallback ? undefined : event.target.value)
          }
          className="h-8 w-10 shrink-0 border border-border bg-surface p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(event) => {
            const next = event.target.value.trim();
            onChange(!next || next === fallback ? undefined : event.target.value);
          }}
          className="h-8 min-w-0 flex-1 border border-border bg-surface px-2 font-mono text-xs text-foreground"
          spellCheck={false}
        />
      </div>
    </label>
  );
}

function PxField({
  label,
  value,
  fallback,
  min = 10,
  max = 120,
  onChange,
}: {
  label: string;
  value: string;
  fallback: string;
  min?: number;
  max?: number;
  onChange: (next: string | undefined) => void;
}) {
  const num = pxNumber(value);
  return (
    <label className="block space-y-1">
      <span className="flex items-center justify-between text-[11px] text-muted">
        <span>{label}</span>
        <span className="font-mono text-foreground">{num}px</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={num}
        onChange={(event) => {
          const next = `${event.target.value}px`;
          onChange(next === fallback ? undefined : next);
        }}
        className="w-full accent-foreground"
      />
    </label>
  );
}

export function SystemDrawer({
  open,
  onClose,
  style,
  tokens,
  overrides,
  onOverridesChange,
  history,
  onSaveHistory,
  onRestoreHistory,
  onDeleteHistory,
}: SystemDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const background = overrides.background ?? tokens.colors.background;
  const surface = overrides.surface ?? tokens.colors.surface;
  const text = overrides.text ?? tokens.colors.text;
  const primary = overrides.primary ?? tokens.colors.primary;
  const accent = overrides.accent ?? tokens.colors.accent;
  const headingFont = overrides.headingFont ?? shortFontFamily(tokens.typography.heading);
  const bodyFont = overrides.bodyFont ?? shortFontFamily(tokens.typography.body);
  const sizeDisplay = overrides.sizeDisplay ?? tokens.typography.scale.display;
  const sizeH1 = overrides.sizeH1 ?? tokens.typography.scale["2xl"];
  const sizeH2 = overrides.sizeH2 ?? tokens.typography.scale.xl;
  const sizeH3 = overrides.sizeH3 ?? tokens.typography.scale.lg;
  const sizeBody = overrides.sizeBody ?? tokens.typography.scale.base;
  const radiusButton =
    overrides.radiusButton ?? tokens.geometry.radiusButton ?? tokens.geometry.radius;
  const radiusCard =
    overrides.radiusCard ?? tokens.geometry.radiusCard ?? tokens.geometry.radius;
  const containerValue = overrides.container ?? tokens.spacing.container;
  const dirty = hasTokenOverrides(overrides);

  const fontOptions = (() => {
    const names = GOOGLE_FONTS_CYRILLIC.map((font) => font.family);
    for (const name of [headingFont, bodyFont]) {
      if (name && !names.includes(name)) names.unshift(name);
    }
    return names;
  })();

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 shrink-0 flex-col border-l border-border bg-surface transition-[width,opacity] duration-200 ease-out",
        open ? "w-[min(100%,22rem)] opacity-100" : "pointer-events-none w-0 overflow-hidden border-l-0 opacity-0",
      )}
      aria-hidden={!open}
      {...(open
        ? { role: "complementary" as const, "aria-labelledby": "system-drawer-title" }
        : {})}
    >
      <div className="flex w-[min(100vw,22rem)] min-h-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted" aria-hidden />
              <h2 id="system-drawer-title" className="font-serif text-lg tracking-tight">
                Система
              </h2>
              <Hint label="Как theme-переменные Bootstrap: готовый стиль чуть подправить. Превью и промпт обновляются сразу." />
            </div>
            <p className="truncate text-sm text-muted">{style.title}</p>
            <p className="font-mono text-[11px] text-muted">{style.id}</p>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-border text-muted hover:text-foreground"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-4">
          <p className="text-[11px] leading-snug text-muted">
            Стиль уже собран. Здесь только лёгкая подстройка токенов — панель закреплена, превью
            листается отдельно.
          </p>

          <section className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Палитра
            </p>
            <div
              className="flex h-8 overflow-hidden border"
              style={{ borderColor: tokens.colors.border }}
              aria-hidden
            >
              {[background, surface, text, primary, accent].map((color, index) => (
                <span key={`${color}-${index}`} className="flex-1" style={{ background: color }} />
              ))}
            </div>
            <ColorField
              label="Фон сайта"
              value={background}
              fallback={tokens.colors.background}
              onChange={(value) => onOverridesChange({ ...overrides, background: value })}
            />
            <ColorField
              label="Поверхность / карточки"
              value={surface}
              fallback={tokens.colors.surface}
              onChange={(value) => onOverridesChange({ ...overrides, surface: value })}
            />
            <ColorField
              label="Текст"
              value={text}
              fallback={tokens.colors.text}
              onChange={(value) => onOverridesChange({ ...overrides, text: value })}
            />
            <ColorField
              label="Primary / бренд"
              value={primary}
              fallback={tokens.colors.primary}
              onChange={(value) => onOverridesChange({ ...overrides, primary: value })}
            />
            <ColorField
              label="Accent / кнопки"
              value={accent}
              fallback={tokens.colors.accent}
              onChange={(value) => onOverridesChange({ ...overrides, accent: value })}
            />
          </section>

          <section className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Шрифты (кириллица)
            </p>
            <label className="block space-y-1">
              <span className="text-[11px] text-muted">Заголовки</span>
              <select
                value={headingFont}
                onChange={(event) =>
                  onOverridesChange({
                    ...overrides,
                    headingFont:
                      event.target.value === shortFontFamily(tokens.typography.heading)
                        ? undefined
                        : event.target.value,
                  })
                }
                className="h-8 w-full border border-border bg-surface px-2 text-xs text-foreground"
              >
                {fontOptions.map((family) => (
                  <option key={`h-${family}`} value={family} style={{ fontFamily: family }}>
                    {family}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-[11px] text-muted">Текст</span>
              <select
                value={bodyFont}
                onChange={(event) =>
                  onOverridesChange({
                    ...overrides,
                    bodyFont:
                      event.target.value === shortFontFamily(tokens.typography.body)
                        ? undefined
                        : event.target.value,
                  })
                }
                className="h-8 w-full border border-border bg-surface px-2 text-xs text-foreground"
              >
                {fontOptions.map((family) => (
                  <option key={`b-${family}`} value={family} style={{ fontFamily: family }}>
                    {family}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <section className="space-y-3">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Кегль (px)
            </p>
            <PxField
              label="Display / hero"
              value={sizeDisplay}
              fallback={tokens.typography.scale.display}
              min={32}
              max={120}
              onChange={(value) => onOverridesChange({ ...overrides, sizeDisplay: value })}
            />
            <PxField
              label="H1"
              value={sizeH1}
              fallback={tokens.typography.scale["2xl"]}
              min={22}
              max={80}
              onChange={(value) => onOverridesChange({ ...overrides, sizeH1: value })}
            />
            <PxField
              label="H2"
              value={sizeH2}
              fallback={tokens.typography.scale.xl}
              min={18}
              max={56}
              onChange={(value) => onOverridesChange({ ...overrides, sizeH2: value })}
            />
            <PxField
              label="H3"
              value={sizeH3}
              fallback={tokens.typography.scale.lg}
              min={14}
              max={40}
              onChange={(value) => onOverridesChange({ ...overrides, sizeH3: value })}
            />
            <PxField
              label="Текст"
              value={sizeBody}
              fallback={tokens.typography.scale.base}
              min={12}
              max={24}
              onChange={(value) => onOverridesChange({ ...overrides, sizeBody: value })}
            />
          </section>

          <section className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Форма
            </p>
            <label className="block space-y-1">
              <span className="text-[11px] text-muted">Radius кнопок</span>
              <select
                value={radiusButton}
                onChange={(event) =>
                  onOverridesChange({
                    ...overrides,
                    radiusButton:
                      event.target.value ===
                      (tokens.geometry.radiusButton ?? tokens.geometry.radius)
                        ? undefined
                        : event.target.value,
                  })
                }
                className="h-8 w-full border border-border bg-surface px-2 font-mono text-xs text-foreground"
              >
                {withPreset(radiusButton, RADIUS_PRESETS).map((value) => (
                  <option key={`btn-${value}`} value={value}>
                    {value === "999px" ? "pill (999px)" : value}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-[11px] text-muted">Radius карточек</span>
              <select
                value={radiusCard}
                onChange={(event) =>
                  onOverridesChange({
                    ...overrides,
                    radiusCard:
                      event.target.value === (tokens.geometry.radiusCard ?? tokens.geometry.radius)
                        ? undefined
                        : event.target.value,
                  })
                }
                className="h-8 w-full border border-border bg-surface px-2 font-mono text-xs text-foreground"
              >
                {withPreset(radiusCard, RADIUS_PRESETS).map((value) => (
                  <option key={`card-${value}`} value={value}>
                    {value === "999px" ? "pill (999px)" : value}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-[11px] text-muted">Ширина сайта</span>
              <select
                value={containerValue}
                onChange={(event) =>
                  onOverridesChange({
                    ...overrides,
                    container:
                      event.target.value === tokens.spacing.container
                        ? undefined
                        : event.target.value,
                  })
                }
                className="h-8 w-full border border-border bg-surface px-2 font-mono text-xs text-foreground"
              >
                {withPreset(containerValue, CONTAINER_PRESETS).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </section>

          <div className="grid gap-2">
            <button
              type="button"
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 border border-border text-xs text-foreground enabled:hover:bg-background disabled:opacity-40"
              disabled={!dirty}
              onClick={onSaveHistory}
            >
              <BookmarkPlus className="h-3.5 w-3.5" aria-hidden />
              Сохранить вариант в историю
            </button>
            <button
              type="button"
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 border border-border text-xs text-muted enabled:hover:text-foreground disabled:opacity-40"
              disabled={!dirty}
              onClick={() => onOverridesChange({})}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Сбросить к токенам стиля
            </button>
          </div>

          <section className="space-y-2 border-t border-border pt-4">
            <div className="flex items-center gap-1.5">
              <History className="h-3.5 w-3.5 text-muted" aria-hidden />
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                История сессии
              </p>
              <Hint label="Варианты правок только в этой вкладке браузера. Можно вернуться к сохранённой настройке." />
            </div>
            {history.length === 0 ? (
              <p className="text-[11px] leading-snug text-muted">
                Пока пусто. Подкрутите токены и нажмите «Сохранить вариант».
              </p>
            ) : (
              <ul className="space-y-1.5" aria-label="История настроек системы">
                {history.map((entry) => {
                  const active = overridesEqual(entry.overrides, overrides);
                  return (
                    <li key={entry.id}>
                      <div
                        className={cn(
                          "flex items-start gap-1 border px-2 py-2",
                          active ? "border-foreground bg-background" : "border-border",
                        )}
                      >
                        <button
                          type="button"
                          className="min-w-0 flex-1 text-left"
                          onClick={() => onRestoreHistory(entry)}
                        >
                          <span className="block truncate text-xs text-foreground">{entry.label}</span>
                          <span className="mt-0.5 block font-mono text-[10px] text-muted">
                            {formatHistoryTime(entry.createdAt)}
                            {active ? " · сейчас" : ""}
                          </span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center text-muted hover:text-foreground"
                          aria-label="Удалить вариант"
                          onClick={() => onDeleteHistory(entry.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </div>
    </aside>
  );
}
