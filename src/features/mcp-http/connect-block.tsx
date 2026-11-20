"use client";

import { buttonClassName } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";

type McpConnectBlockProps = {
  mcpUrl: string;
  cursorLink: string;
  mcpJson: string;
  claudeCommand: string;
};

function CopyField({
  label,
  value,
  id,
}: {
  label: string;
  value: string;
  id: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <button
          type="button"
          onClick={() => void copy()}
          className={buttonClassName({ variant: "secondary", size: "sm" })}
        >
          {copied ? (
            <Check className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <Copy className="h-3.5 w-3.5" aria-hidden />
          )}
          {copied ? "Скопировано" : "Скопировать"}
        </button>
      </div>
      <pre
        id={id}
        className="overflow-x-auto border border-border bg-background p-4 font-mono text-xs leading-relaxed text-foreground"
        tabIndex={0}
      >
        {value}
      </pre>
    </div>
  );
}

export function McpConnectBlock({
  mcpUrl,
  cursorLink,
  mcpJson,
  claudeCommand,
}: McpConnectBlockProps) {
  return (
    <div className="space-y-6">
      <p className="max-w-2xl text-sm text-muted sm:text-base">
        Репозиторий клонировать не нужно, ключ не нужен. Вставьте адрес{" "}
        <code className="font-mono text-sm text-foreground">{mcpUrl}</code> — агент получит те
        же инструменты, включая готовый дизайн-спек <code className="font-mono text-sm">get_design_spec</code>.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href={cursorLink} className={cn(buttonClassName({ size: "lg" }))}>
          <Sparkles className="h-4 w-4" aria-hidden />
          Добавить в Cursor
        </a>
      </div>
      <CopyField
        id="mcp-cursor-json"
        label="Конфиг для Cursor (.cursor/mcp.json)"
        value={mcpJson}
      />
      <CopyField
        id="mcp-claude-command"
        label="Строка для Claude Code"
        value={claudeCommand}
      />
    </div>
  );
}
