"use client";

import { buttonClassName, Dialog, Hint } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Bot, Copy, Download, LayoutTemplate } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  composeHandoffPrompt,
  composeHandoffSections,
  estimatePromptChars,
  type HandoffSurface,
  type PromptLang,
  type TemplateSectionOutline,
} from "./compose-prompt";

export type PromptDialogProps = {
  open: boolean;
  onClose: () => void;
  styleId: string;
  styleTitle: string;
  templateId: string;
  templateTitle: string;
  templateSections: TemplateSectionOutline[];
  promptRu: string;
  promptEn: string;
  promptConstructorRu: string;
  promptConstructorEn: string;
  systemOverridesNoteRu?: string;
  systemOverridesNoteEn?: string;
};

export function PromptDialog({
  open,
  onClose,
  styleId,
  styleTitle,
  templateId,
  templateTitle,
  templateSections,
  promptRu,
  promptEn,
  promptConstructorRu,
  promptConstructorEn,
  systemOverridesNoteRu = "",
  systemOverridesNoteEn = "",
}: PromptDialogProps) {
  const [surface, setSurface] = useState<HandoffSurface>("agent");
  const [lang, setLang] = useState<PromptLang>("ru");
  const [productName, setProductName] = useState("");
  const [pageBrief, setPageBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("role");
  const previewRef = useRef<HTMLDivElement>(null);

  function handleClose() {
    setCopied(false);
    setActiveSection("role");
    onClose();
  }

  const stylePrompt = useMemo(() => {
    const map = {
      agent: { ru: promptRu, en: promptEn },
      constructor: { ru: promptConstructorRu, en: promptConstructorEn },
    } as const;
    return map[surface][lang];
  }, [lang, promptConstructorEn, promptConstructorRu, promptEn, promptRu, surface]);

  const systemOverridesNote = lang === "ru" ? systemOverridesNoteRu : systemOverridesNoteEn;

  const composeInput = useMemo(
    () => ({
      lang,
      surface,
      styleId,
      styleTitle,
      templateId,
      templateTitle,
      templateSections,
      stylePrompt,
      productName,
      pageBrief,
      systemOverridesNote,
    }),
    [
      lang,
      pageBrief,
      productName,
      styleId,
      stylePrompt,
      styleTitle,
      surface,
      systemOverridesNote,
      templateId,
      templateSections,
      templateTitle,
    ],
  );

  const sections = useMemo(() => composeHandoffSections(composeInput), [composeInput]);
  const body = useMemo(() => composeHandoffPrompt(composeInput), [composeInput]);
  const charCount = estimatePromptChars(body);

  async function copy() {
    await navigator.clipboard.writeText(body);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function jumpTo(sectionId: string) {
    setActiveSection(sectionId);
    const node = previewRef.current?.querySelector(`[data-prompt-section="${sectionId}"]`);
    node?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title="Получить промпт"
      description={`${styleTitle} · только стиль и токены, без списка блоков лендинга.`}
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

        <div className="space-y-2 border border-border bg-surface p-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              Ваш продукт
            </p>
            <Hint label="Необязательно. Если заполните — ИИ получит имя продукта и факты из брифа вместе со стилем." />
          </div>
          <label className="block space-y-1">
            <span className="text-xs text-muted">Название</span>
            <input
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              className="h-9 w-full border border-border bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-foreground"
              placeholder="Например: Нордлайн"
              autoComplete="off"
            />
          </label>
          <label className="block space-y-1">
            <span className="text-xs text-muted">Короткий бриф</span>
            <textarea
              value={pageBrief}
              onChange={(event) => setPageBrief(event.target.value)}
              rows={3}
              className="w-full resize-y border border-border bg-background px-2.5 py-2 text-sm text-foreground outline-none focus-visible:border-foreground"
              placeholder="Для кого продукт, что делает, главное действие на странице, факты которые нельзя выдумывать."
            />
          </label>
        </div>

        <div className="space-y-3 border border-border p-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                1. Текст для ИИ
              </p>
              <p className="text-xs text-muted">
                Скопируйте и вставьте в Cursor / Claude / конструктор. Это инструкция, не готовый сайт.
              </p>
            </div>
            <p className="font-mono text-[11px] text-muted" aria-live="polite">
              {charCount.toLocaleString("ru-RU")} символов
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5" role="navigation" aria-label="Разделы промпта">
            {sections.map((section) => (
              <button
                key={`chip-${section.id}`}
                type="button"
                className={cn(
                  "h-8 border px-2.5 text-xs transition-colors",
                  activeSection === section.id
                    ? "border-foreground bg-surface text-foreground"
                    : "border-border text-muted hover:border-foreground hover:text-foreground",
                )}
                onClick={() => jumpTo(section.id)}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div
            ref={previewRef}
            className="max-h-[min(36vh,20rem)] space-y-4 overflow-auto border border-border bg-surface p-3"
          >
            {sections.map((section) => (
              <section
                key={section.id}
                data-prompt-section={section.id}
                className="scroll-mt-2"
                aria-labelledby={`prompt-section-${section.id}`}
              >
                <h3
                  id={`prompt-section-${section.id}`}
                  className="mb-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase"
                >
                  {section.label}
                </h3>
                <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground">
                  {section.body}
                </pre>
              </section>
            ))}
          </div>

          <button
            type="button"
            className={buttonClassName({ variant: "primary", size: "sm" })}
            onClick={() => void copy()}
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
            {copied ? "Текст скопирован" : "Копировать текст для ИИ"}
          </button>
        </div>

        <div className="space-y-2 border border-border p-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
              2. Файлы для агента (ZIP)
            </p>
            <Hint label="Отдельный пакет: токены, DESIGN.md и промпты файлами. Не заменяет текст выше — дополняет его в проекте." />
          </div>
          <p className="text-xs text-muted">
            Скачайте, если агенту нужны исходные файлы стиля рядом с кодом. Текст из блока 1 всё равно можно
            вставить в чат.
          </p>
          <a
            className={buttonClassName({ variant: "secondary", size: "sm" })}
            href={`/api/export/${styleId}?pack=free`}
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            Скачать Free ZIP
          </a>
        </div>
      </div>
    </Dialog>
  );
}
