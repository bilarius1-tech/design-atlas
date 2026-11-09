"use client";

import { Hint } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Boxes, FlaskConical, Images, LayoutTemplate, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";

const primaryNav = [
  {
    href: "/studio?template=saas-landing&style=swiss-international",
    match: "/studio",
    label: "Студия",
    icon: Sparkles,
    hint: "Выберите шаблон и дизайн-систему, посмотрите превью, заберите промпт наружу.",
  },
] as const;

const secondaryNav = [
  {
    href: "/cards",
    match: "/cards",
    label: "Карточки",
    icon: Images,
    hint: "Стили карточек маркетплейса и image-gen промпт во внешний генератор.",
  },
  {
    href: "/design-system",
    match: "/design-system",
    label: "Оболочка",
    icon: LayoutTemplate,
    hint: "UI-оболочка самого Atlas — не каталог стилей.",
  },
  {
    href: "/playground",
    match: "/playground",
    label: "QA",
    icon: FlaskConical,
    hint: "Проверка компонентов стиля. Второстепенный путь.",
  },
  {
    href: "/demo",
    match: "/demo",
    label: "Demo",
    icon: Boxes,
    hint: "Демо лендинга по стилю вне Studio.",
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-[var(--da-z-header)] border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="flex min-h-[var(--da-size-header)] flex-wrap items-center justify-between gap-x-4 gap-y-2 py-2">
        <Link href="/" className="group flex min-w-0 items-baseline gap-3 no-underline">
          <span className="font-serif text-xl tracking-tight text-foreground">Дизайн Атлас</span>
          <span className="hidden text-xs tracking-[0.14em] text-muted uppercase sm:inline">
            Анти ИИ-слоп
          </span>
        </Link>
        <nav aria-label="Основная навигация" className="max-w-full">
          <ul className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.match);
              return (
                <li key={item.href} className="flex items-center gap-0.5">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs no-underline transition-colors sm:px-3 sm:py-2 sm:text-sm",
                      active
                        ? "bg-foreground text-background"
                        : "text-muted hover:bg-surface-muted hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {item.label}
                  </Link>
                  <Hint label={item.hint} />
                </li>
              );
            })}
            <li aria-hidden className="mx-1 hidden h-4 w-px bg-border sm:block" />
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const active = pathname.startsWith(item.match);
              return (
                <li key={item.href} className="flex items-center gap-0.5">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted no-underline transition-colors hover:bg-surface-muted hover:text-foreground sm:px-2.5 sm:py-1.5",
                      active && "text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                  <Hint label={item.hint} className="hidden sm:inline-flex" />
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
