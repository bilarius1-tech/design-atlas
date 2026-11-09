"use client";

import { buttonClassName, Dialog, Hint } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Bot, Copy, Download, LayoutTemplate } from "lucide-react";
import { useMemo, useState } from "react";

export type PromptDialogProps = {
  open: boolean;
  onClose: () => void;
  styleId: string;
  styleTitle: string;
  promptRu: string;
  promptEn: string;
  promptConstructorRu: string;
  promptConstructorEn: string;
};

type HandoffSurface = "agent" | "constructor";
type PromptLang = "ru" | "en";

export function PromptDialog({
  open,
  onClose,
  styleId,
  styleTitle,
  promptRu,
  promptEn,
  promptConstructorRu,
  promptConstructorEn,
}: PromptDialogProps) {
  const [surface, setSurface] = useState<HandoffSurface>("agent");
  const [lang, setLang] = useState<PromptLang>("ru");
  const [copied, setCopied] = useState(false);

  const prompts: Record<HandoffSurface, Record<PromptLang, string>> = useMemo(
    () => ({
      agent: { ru: promptRu, en: promptEn },
      constructor: { ru: promptConstructorRu, en: promptConstructorEn },
    }),
    [promptConstructorEn, promptConstructorRu, promptEn, promptRu],
  );

  const body = prompts[surface][lang];

  async function copy() {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Получить промпт"
      description={`${styleTitle} · Atlas не собирает сайт — отдайте промпт наружу.`}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">Куда</p>
          <Hint label="Агент — Cursor и похожие. Конструктор — Тильда, LPmotor и их агенты." />
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Поверхность handoff">
          {(
            [
              ["agent", "Агент (Cursor)", Bot],
              ["constructor", "Конструктор", LayoutTemplate],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={surface === value}
              className={cn(
                "inline-flex h-9 items-center gap-1.5 border px-3 text-xs transition-colors",
                surface === value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground",
              )}
              onClick={() => setSurface(value)}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden />
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Язык промпта">
          {(
            [
              ["ru", "Русский"],
              ["en", "English"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={lang === value}
              className={cn(
                "h-8 border px-2.5 text-xs transition-colors",
                lang === value
                  ? "border-foreground bg-surface text-foreground"
                  : "border-border text-muted hover:border-foreground hover:text-foreground",
              )}
              onClick={() => setLang(value)}
            >
              {label}
            </button>
          ))}
        </div>

        <pre className="max-h-[min(42vh,22rem)] overflow-auto border border-border bg-surface p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground">
          {body}
        </pre>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className={buttonClassName({ variant: "primary", size: "sm" })}
            onClick={() => void copy()}
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
            {copied ? "Скопировано" : "Копировать"}
          </button>
          <a
            className={buttonClassName({ variant: "secondary", size: "sm" })}
            href={`/api/export/${styleId}?pack=free`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Free ZIP
          </a>
          <Hint label="ZIP — токены, DESIGN.md и все промпты (агент + конструктор)." />
        </div>
      </div>
    </Dialog>
  );
}
