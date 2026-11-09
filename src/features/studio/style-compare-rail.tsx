import { cn } from "@/lib/cn";
import Link from "next/link";

export type StyleCompareItem = {
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
};

export type StyleCompareRailProps = {
  templateId: string;
  styleId: string;
  styles: StyleCompareItem[];
};

function hrefFor(templateId: string, styleId: string) {
  const params = new URLSearchParams({ template: templateId, style: styleId });
  return `/studio?${params.toString()}`;
}

export function StyleCompareRail({ templateId, styleId, styles }: StyleCompareRailProps) {
  if (styles.length < 2) {
    return null;
  }

  return (
    <section className="space-y-4 border border-border bg-surface p-4 sm:p-5" aria-labelledby="style-compare-heading">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Сравнение</p>
        <h2 id="style-compare-heading" className="font-serif text-xl tracking-tight">
          Один шаблон · разные looks
        </h2>
        <p className="max-w-2xl text-sm text-muted">
          Контент SaaS-лендинга общий. Переключайте стиль, чтобы увидеть тот же каркас в другой системе.
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {styles.map((style) => {
          const active = style.id === styleId;
          return (
            <li key={style.id}>
              <Link
                href={hrefFor(templateId, style.id)}
                className={cn(
                  "block h-full border p-3 no-underline transition-colors",
                  active
                    ? "border-foreground bg-background text-foreground"
                    : "border-border text-muted hover:border-foreground hover:text-foreground",
                )}
                aria-current={active ? "page" : undefined}
              >
                <div
                  className="mb-3 flex h-14 overflow-hidden border"
                  style={{ borderColor: style.colors.border }}
                  aria-hidden
                >
                  <span className="w-[34%]" style={{ background: style.colors.background }} />
                  <span className="w-[22%]" style={{ background: style.colors.surface }} />
                  <span className="w-[16%]" style={{ background: style.colors.text }} />
                  <span className="w-[14%]" style={{ background: style.colors.primary }} />
                  <span className="w-[14%]" style={{ background: style.colors.accent }} />
                </div>
                <span className="font-medium text-foreground">{style.title}</span>
                <span className="mt-1 block text-sm">{style.description}</span>
                <span className="mt-2 block font-mono text-xs tracking-wide text-muted uppercase">
                  {style.id}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
