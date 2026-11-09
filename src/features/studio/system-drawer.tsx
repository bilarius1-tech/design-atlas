"use client";

import { Hint } from "@/components/ui";
import { cn } from "@/lib/cn";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect } from "react";
import type { StudioSidebarStyle } from "./studio-sidebar";

export type SystemDrawerProps = {
  open: boolean;
  onClose: () => void;
  style: StudioSidebarStyle;
};

function shortFont(stack: string): string {
  return stack.split(",")[0]?.trim() || stack;
}

export function SystemDrawer({ open, onClose, style }: SystemDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-30",
        open ? "visible" : "invisible",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          "pointer-events-auto absolute inset-0 border-0 bg-foreground/25 transition-opacity",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Закрыть панель системы"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        className={cn(
          "pointer-events-auto absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col border-l border-border bg-surface shadow-md transition-transform duration-200 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="system-drawer-title"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted" aria-hidden />
              <h2 id="system-drawer-title" className="font-serif text-lg tracking-tight">
                Система
              </h2>
              <Hint label="Сводка и будущая лёгкая правка дизайн-системы. Список стилей остаётся слева." />
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
          <section className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Палитра
            </p>
            <div
              className="flex h-10 overflow-hidden border"
              style={{ borderColor: style.colors.border }}
              aria-hidden
            >
              {(
                [
                  style.colors.background,
                  style.colors.surface,
                  style.colors.text,
                  style.colors.primary,
                  style.colors.accent,
                ] as const
              ).map((color) => (
                <span key={color} className="flex-1" style={{ background: color }} />
              ))}
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11px] text-muted">
              <dt>bg</dt>
              <dd className="font-mono text-foreground">{style.colors.background}</dd>
              <dt>primary</dt>
              <dd className="font-mono text-foreground">{style.colors.primary}</dd>
              <dt>accent</dt>
              <dd className="font-mono text-foreground">{style.colors.accent}</dd>
            </dl>
          </section>

          <section className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Геометрия и тип
            </p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11px] text-muted">
              <dt>Radius</dt>
              <dd className="font-mono text-foreground">{style.geometry.radius}</dd>
              <dt>Border</dt>
              <dd className="font-mono text-foreground">{style.geometry.borderWidth}</dd>
              <dt>Shadow</dt>
              <dd className="truncate font-mono text-foreground">{style.effects.shadow}</dd>
              <dt>Heading</dt>
              <dd className="truncate text-foreground">{shortFont(style.typography.heading)}</dd>
              <dt>Body</dt>
              <dd className="truncate text-foreground">{shortFont(style.typography.body)}</dd>
            </dl>
          </section>

          <section className="space-y-2 border border-dashed border-border bg-background/70 p-3">
            <div className="flex items-center gap-1.5">
              <p className="text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">
                Правка · скоро
              </p>
              <Hint label="Сюда встанет Accent / Font / Radius. Пока поля только показывают текущие значения." />
            </div>
            <p className="text-[11px] leading-snug text-muted">
              Правки попадут в превью и в оба промпта. Список стилей слева не трогаем.
            </p>
            <div className="grid gap-2">
              <label className="block space-y-1">
                <span className="text-[11px] text-muted">Accent</span>
                <input
                  type="text"
                  disabled
                  value={style.colors.accent}
                  className="h-8 w-full border border-border bg-surface px-2 font-mono text-xs text-muted"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-[11px] text-muted">Font</span>
                <input
                  type="text"
                  disabled
                  value={shortFont(style.typography.heading)}
                  className="h-8 w-full border border-border bg-surface px-2 text-xs text-muted"
                />
              </label>
              <label className="block space-y-1">
                <span className="text-[11px] text-muted">Radius</span>
                <input
                  type="text"
                  disabled
                  value={style.geometry.radius}
                  className="h-8 w-full border border-border bg-surface px-2 font-mono text-xs text-muted"
                />
              </label>
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
