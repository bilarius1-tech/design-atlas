"use client";

import { buttonClassName, Hint } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { TemplateSectionOutline } from "./compose-prompt";
import { PromptDialog } from "./prompt-dialog";

export type StudioToolbarProps = {
  templateId: string;
  templateTitle: string;
  templateSections: TemplateSectionOutline[];
  styleId: string;
  styleTitle: string;
  styleDescription: string;
  styleIds: string[];
  promptRu: string;
  promptEn: string;
  promptConstructorRu: string;
  promptConstructorEn: string;
  systemOverridesNoteRu?: string;
  systemOverridesNoteEn?: string;
  modeLabel: "Light" | "Dark";
  onOpenSystem: () => void;
  systemOpen?: boolean;
};

function hrefFor(templateId: string, styleId: string) {
  const params = new URLSearchParams({ template: templateId, style: styleId });
  return `/studio?${params.toString()}`;
}

export function StudioToolbar({
  templateId,
  templateTitle,
  templateSections,
  styleId,
  styleTitle,
  styleDescription,
  styleIds,
  promptRu,
  promptEn,
  promptConstructorRu,
  promptConstructorEn,
  systemOverridesNoteRu = "",
  systemOverridesNoteEn = "",
  modeLabel,
  onOpenSystem,
  systemOpen = false,
}: StudioToolbarProps) {
  const [promptOpen, setPromptOpen] = useState(false);

  const { prevId, nextId } = useMemo(() => {
    const index = styleIds.indexOf(styleId);
    if (index < 0) return { prevId: styleId, nextId: styleId };
    return {
      prevId: styleIds[(index - 1 + styleIds.length) % styleIds.length]!,
      nextId: styleIds[(index + 1) % styleIds.length]!,
    };
  }, [styleId, styleIds]);

  return (
    <>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 max-w-2xl space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span className="font-semibold tracking-[0.12em] text-foreground uppercase">
                {styleTitle}
              </span>
              <span aria-hidden>·</span>
              <span>{modeLabel}</span>
              <span aria-hidden>·</span>
              <span>{templateTitle}</span>
              <span className="font-mono text-[11px]">{styleId}</span>
            </div>
            <p className="line-clamp-2 text-sm text-muted">{styleDescription}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={hrefFor(templateId, prevId)}
              className={buttonClassName({ variant: "ghost", size: "sm" })}
              aria-label="Предыдущий стиль"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href={hrefFor(templateId, nextId)}
              className={buttonClassName({ variant: "ghost", size: "sm" })}
              aria-label="Следующий стиль"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
            <button
              type="button"
              className={cn(
                buttonClassName({ variant: "secondary", size: "sm" }),
                systemOpen && "border-foreground",
              )}
              aria-pressed={systemOpen}
              onClick={onOpenSystem}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
              Система
            </button>
            <Hint label="Закреплённая панель справа: лёгкая правка токенов стиля. Превью листается отдельно." />
            <button
              type="button"
              className={buttonClassName({ variant: "primary", size: "sm" })}
              onClick={() => setPromptOpen(true)}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Получить промпт
            </button>
            <Hint label="Промпт только про визуальную систему (токены, атмосфера). Структуру страницы агент уже берёт из вашего чата." />
            <a
              className={buttonClassName({ variant: "secondary", size: "sm" })}
              href={`/demo/${styleId}`}
              target="_blank"
              rel="noreferrer"
            >
              Открыть
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>

      <PromptDialog
        open={promptOpen}
        onClose={() => setPromptOpen(false)}
        styleId={styleId}
        styleTitle={styleTitle}
        templateId={templateId}
        templateTitle={templateTitle}
        templateSections={templateSections}
        promptRu={promptRu}
        promptEn={promptEn}
        promptConstructorRu={promptConstructorRu}
        promptConstructorEn={promptConstructorEn}
        systemOverridesNoteRu={systemOverridesNoteRu}
        systemOverridesNoteEn={systemOverridesNoteEn}
      />
    </>
  );
}
