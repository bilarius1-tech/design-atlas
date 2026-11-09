import { Badge, buttonClassName } from "@/components/ui";
import type { ExportManifest } from "@/core/schemas";
import { cn } from "@/lib/cn";
import Link from "next/link";

export type ExportPanelProps = {
  styleId: string;
  styleTitle: string;
  freeManifest: ExportManifest | null;
  freeError: string | null;
  freeFileCount: number;
  freeTotalBytes: number;
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export function ExportPanel({
  styleId,
  styleTitle,
  freeManifest,
  freeError,
  freeFileCount,
  freeTotalBytes,
}: ExportPanelProps) {
  return (
    <section
      id="export"
      className="space-y-6 border border-border bg-surface p-6 sm:p-8"
      aria-labelledby="export-heading"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Export</p>
        <h2 id="export-heading" className="font-serif text-2xl tracking-tight">
          Design Pack
        </h2>
        <p className="max-w-2xl text-sm text-muted">
          Скачайте agent-ready пакет для «{styleTitle}»: промпты, DESIGN.md, токены и инструкции.
          Сначала изучите playground и demo — экспорт дополняет понимание стиля, а не заменяет его.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="space-y-4 border border-border p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">Free Design Pack</h3>
            <Badge tone="success">available</Badge>
          </div>
          {freeError ? (
            <p className="text-sm text-danger" role="alert">
              {freeError}
            </p>
          ) : freeManifest ? (
            <>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted">Версия стиля</dt>
                  <dd className="font-medium">{freeManifest.pack.version}</dd>
                </div>
                <div>
                  <dt className="text-muted">Формат</dt>
                  <dd className="font-medium">
                    {freeManifest.format} {freeManifest.formatVersion}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Файлов</dt>
                  <dd className="font-medium">{freeFileCount}</dd>
                </div>
                <div>
                  <dt className="text-muted">Размер (примерно)</dt>
                  <dd className="font-medium">{formatBytes(freeTotalBytes)}</dd>
                </div>
              </dl>
              <ul className="max-h-40 space-y-1 overflow-y-auto text-sm text-muted">
                {freeManifest.files.map((file) => (
                  <li key={file.path} className="font-mono text-xs">
                    {file.path}
                  </li>
                ))}
                <li className="font-mono text-xs">manifest.json</li>
              </ul>
              <a
                className={cn(buttonClassName({ variant: "primary", size: "md" }), "inline-flex")}
                href={`/api/export/${styleId}?pack=free`}
              >
                Скачать Free ZIP
              </a>
            </>
          ) : null}
        </article>

        <article className="space-y-4 border border-dashed border-border p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold">Full Design Pack</h3>
            <Badge>in development</Badge>
          </div>
          <p className="text-sm text-muted">
            Полный пакет (changelog, layout rules, demo example, расширенные guidelines) готовится
            для будущей коммерческой модели. Публичной оплаты и checkout в PHASE 7 нет.
          </p>
          <p className="text-sm text-muted">
            Внутренний сценарий:{" "}
            <code className="text-xs">DESIGN_ATLAS_ALLOW_FULL_EXPORT=1</code> +{" "}
            <code className="text-xs">pnpm export:pack --pack full</code>
          </p>
          <button type="button" className={buttonClassName({ variant: "secondary", size: "md" })} disabled>
            Full Pack — скоро
          </button>
        </article>
      </div>

      <p className="text-sm text-muted">
        Также:{" "}
        <Link href={`/demo/${styleId}`} className="underline">
          Demo landing
        </Link>
        .
      </p>
    </section>
  );
}
