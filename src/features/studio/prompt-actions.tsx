"use client";

import { buttonClassName } from "@/components/ui";
import { useState } from "react";

export type PromptActionsProps = {
  styleId: string;
  promptRu: string;
  promptEn: string;
};

export function PromptActions({ styleId, promptRu, promptEn }: PromptActionsProps) {
  const [copied, setCopied] = useState<"ru" | "en" | null>(null);

  async function copy(kind: "ru" | "en", text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1600);
  }

  return (
    <div id="studio-actions" className="space-y-4 border border-border bg-surface p-6">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Промпт и пакет</p>
        <h2 className="font-serif text-2xl tracking-tight">Передать агенту</h2>
        <p className="max-w-2xl text-sm text-muted">
          Скопируйте промпт на русском или английском — или скачайте Free Design Pack со стилем{" "}
          <span className="font-mono text-foreground">{styleId}</span>.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={buttonClassName({ variant: "primary" })}
          onClick={() => void copy("ru", promptRu)}
        >
          {copied === "ru" ? "Скопировано (RU)" : "Копировать промпт RU"}
        </button>
        <button
          type="button"
          className={buttonClassName({ variant: "secondary" })}
          onClick={() => void copy("en", promptEn)}
        >
          {copied === "en" ? "Copied (EN)" : "Copy prompt EN"}
        </button>
        <a
          className={buttonClassName({ variant: "secondary" })}
          href={`/api/export/${styleId}?pack=free`}
        >
          Скачать Free ZIP
        </a>
      </div>
    </div>
  );
}
