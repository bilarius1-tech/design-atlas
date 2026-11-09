import { buttonClassName } from "@/components/ui";
import { cn } from "@/lib/cn";
import Link from "next/link";

export type StudioOption = {
  id: string;
  title: string;
  description: string;
};

export type StudioSelectorsProps = {
  templates: StudioOption[];
  styles: StudioOption[];
  templateId: string;
  styleId: string;
};

function hrefFor(templateId: string, styleId: string) {
  const params = new URLSearchParams({ template: templateId, style: styleId });
  return `/studio?${params.toString()}`;
}

export function StudioSelectors({
  templates,
  styles,
  templateId,
  styleId,
}: StudioSelectorsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
          Шаблон страницы
        </legend>
        <ul className="space-y-2">
          {templates.map((template) => {
            const active = template.id === templateId;
            return (
              <li key={template.id}>
                <Link
                  href={hrefFor(template.id, styleId)}
                  className={cn(
                    "block border px-4 py-3 no-underline transition-colors",
                    active
                      ? "border-foreground bg-surface text-foreground"
                      : "border-border text-muted hover:border-foreground hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="font-medium text-foreground">{template.title}</span>
                  <span className="mt-1 block text-sm">{template.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
          Визуальный стиль
        </legend>
        <ul className="space-y-2">
          {styles.map((style) => {
            const active = style.id === styleId;
            return (
              <li key={style.id}>
                <Link
                  href={hrefFor(templateId, style.id)}
                  className={cn(
                    "block border px-4 py-3 no-underline transition-colors",
                    active
                      ? "border-foreground bg-surface text-foreground"
                      : "border-border text-muted hover:border-foreground hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="font-medium text-foreground">{style.title}</span>
                  <span className="mt-1 block text-sm">{style.description}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        {styles.length > 1 ? (
          <p className="text-sm text-muted">
            Сравнение палитр — в блоке выше. Здесь полный список для точного выбора.
          </p>
        ) : null}
      </fieldset>

      <div className="lg:col-span-2">
        <a href="#studio-preview" className={buttonClassName({ variant: "ghost", size: "sm" })}>
          К превью ↓
        </a>
      </div>
    </div>
  );
}
