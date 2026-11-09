"use client";

import { Hint } from "@/components/ui";
import { cn } from "@/lib/cn";
import { LayoutTemplate, Moon, Palette, Sun } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export type StudioSidebarStyle = {
  id: string;
  title: string;
  description: string;
  colors: {
    background: string;
    surface: string;
    text: string;
    primary: string;
    accent: string;
    border: string;
  };
  geometry: {
    radius: string;
    borderWidth: string;
  };
  typography: {
    heading: string;
    body: string;
  };
  effects: {
    shadow: string;
  };
};

export type StudioSidebarTemplate = {
  id: string;
  title: string;
  description: string;
};

export type StudioSidebarProps = {
  templates: StudioSidebarTemplate[];
  styles: StudioSidebarStyle[];
  templateId: string;
  styleId: string;
};

type ModeFilter = "all" | "light" | "dark";
type PanelTab = "template" | "style";

function hrefFor(templateId: string, styleId: string) {
  const params = new URLSearchParams({ template: templateId, style: styleId });
  return `/studio?${params.toString()}`;
}

function luminance(hex: string): number {
  const raw = hex.replace("#", "").trim();
  if (raw.length < 6) return 1;
  const r = Number.parseInt(raw.slice(0, 2), 16);
  const g = Number.parseInt(raw.slice(2, 4), 16);
  const b = Number.parseInt(raw.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return 1;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

function isDarkStyle(style: StudioSidebarStyle): boolean {
  return luminance(style.colors.background) < 0.45;
}

export function StudioSidebar({ templates, styles, templateId, styleId }: StudioSidebarProps) {
  const [tab, setTab] = useState<PanelTab>("style");
  const [mode, setMode] = useState<ModeFilter>("all");

  const activeTemplate = templates.find((template) => template.id === templateId) ?? templates[0];

  const filtered = useMemo(() => {
    if (mode === "all") return styles;
    return styles.filter((style) => (mode === "dark" ? isDarkStyle(style) : !isDarkStyle(style)));
  }, [mode, styles]);

  return (
    <aside className="flex h-full min-h-0 w-full flex-col border-border bg-surface lg:w-[300px] lg:shrink-0 lg:border-r">
      <div className="space-y-3 border-b border-border px-4 py-4">
        <div>
          <p className="font-serif text-xl tracking-tight">Студия</p>
          <p className="mt-1 text-sm text-muted">
            Слева — выбор. Справа на превью — кнопка «Система» для сводки и будущей правки.
          </p>
        </div>

        <div className="flex gap-1" role="tablist" aria-label="Панель студии">
          {(
            [
              [
                "template",
                "Шаблон",
                LayoutTemplate,
                "Тип страницы: одинаковый контент под разные системы.",
              ],
              [
                "style",
                "Стиль",
                Palette,
                "Каталог дизайн-систем. Правка открывается справа поверх превью.",
              ],
            ] as const
          ).map(([value, label, Icon, hint]) => (
            <div key={value} className="flex flex-1 items-center gap-0.5">
              <button
                type="button"
                role="tab"
                aria-selected={tab === value}
                className={cn(
                  "inline-flex h-9 w-full items-center justify-center gap-1.5 border text-xs transition-colors",
                  tab === value
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-foreground hover:text-foreground",
                )}
                onClick={() => setTab(value)}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </button>
              <Hint label={hint} />
            </div>
          ))}
        </div>
      </div>

      {tab === "template" ? (
        <div className="flex min-h-0 flex-1 flex-col">
          <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3" aria-label="Шаблоны">
            <ul className="space-y-1">
              {templates.map((template) => {
                const active = template.id === templateId;
                return (
                  <li key={template.id}>
                    <Link
                      href={hrefFor(template.id, styleId)}
                      className={cn(
                        "block rounded-sm px-3 py-3 no-underline transition-colors",
                        active
                          ? "bg-background text-foreground ring-1 ring-foreground"
                          : "text-muted hover:bg-background/80 hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span className="font-medium text-foreground">{template.title}</span>
                      <span className="mt-1 block text-xs">{template.description}</span>
                      <span className="mt-2 block font-mono text-[10px] tracking-wide text-muted uppercase">
                        {template.id}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <p className="border-t border-border px-4 py-3 text-[11px] text-muted">
            Больше шаблонов — позже (R3). Сейчас один каркас для сравнения looks.
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="space-y-3 border-b border-border px-4 py-3">
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                Режим
              </p>
              <Hint label="Фильтр списка по светлому или тёмному фону системы." />
            </div>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Фильтр светлый/тёмный">
              {(
                [
                  ["all", "Все", null],
                  ["light", "Светлые", Sun],
                  ["dark", "Тёмные", Moon],
                ] as const
              ).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  className={cn(
                    "inline-flex h-8 items-center gap-1 border px-2.5 text-xs transition-colors",
                    mode === value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted hover:border-foreground hover:text-foreground",
                  )}
                  aria-pressed={mode === value}
                  onClick={() => setMode(value)}
                >
                  {Icon ? <Icon className="h-3 w-3" aria-hidden /> : null}
                  {label}
                </button>
              ))}
            </div>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-3" aria-label="Стили">
            <ul className="space-y-1">
              {filtered.map((style) => {
                const active = style.id === styleId;
                const dark = isDarkStyle(style);
                return (
                  <li key={style.id}>
                    <Link
                      href={hrefFor(templateId, style.id)}
                      className={cn(
                        "flex items-start gap-3 rounded-sm px-2 py-2.5 no-underline transition-colors",
                        active
                          ? "bg-background text-foreground ring-1 ring-foreground"
                          : "text-muted hover:bg-background/80 hover:text-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span
                        className="mt-0.5 flex h-10 w-10 shrink-0 overflow-hidden border"
                        style={{ borderColor: style.colors.border }}
                        aria-hidden
                      >
                        <span className="w-1/2" style={{ background: style.colors.background }} />
                        <span className="flex w-1/2 flex-col">
                          <span className="h-1/2" style={{ background: style.colors.primary }} />
                          <span className="h-1/2" style={{ background: style.colors.accent }} />
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate font-medium text-foreground">{style.title}</span>
                          <span className="shrink-0 text-[10px] tracking-wide text-muted uppercase">
                            {dark ? "Dark" : "Light"}
                          </span>
                        </span>
                        <span className="mt-0.5 line-clamp-2 text-xs">{style.description}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {filtered.length === 0 ? (
              <p className="px-2 py-6 text-sm text-muted">Нет стилей в этом фильтре.</p>
            ) : null}
          </nav>

          <p className="border-t border-border px-4 py-3 text-[11px] text-muted">
            {filtered.length} из {styles.length}
            {activeTemplate ? ` · ${activeTemplate.title}` : ""}
            {" · "}
            правка — кнопка «Система»
          </p>
        </div>
      )}
    </aside>
  );
}
