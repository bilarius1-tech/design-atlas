import { Container, Section, Stack } from "@/components/layout";
import { buttonClassName } from "@/components/ui";
import { absoluteUrl } from "@/lib/site-url";
import { ArrowRight, Images, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Анти ИИ-слоп · Дизайн Атлас",
  },
  description:
    "Дизайн Атлас — готовые визуальные системы без AI-слопа. Студия для сайтов (промпт агенту и конструктору) и стили карточек маркетплейса. Сборка снаружи.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Анти ИИ-слоп · Дизайн Атлас",
    description:
      "Готовые дизайн-системы и стили карточек. Смотрите превью, забирайте промпт — собирайте проект снаружи.",
    url: absoluteUrl("/"),
    type: "website",
    locale: "ru_RU",
    siteName: "Дизайн Атлас",
  },
  twitter: {
    card: "summary_large_image",
    title: "Анти ИИ-слоп · Дизайн Атлас",
    description:
      "Готовые дизайн-системы и стили карточек. Превью → промпт → сборка снаружи.",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Дизайн Атлас",
        alternateName: ["Design Atlas", "Анти ИИ-слоп"],
        url: absoluteUrl("/"),
        description:
          "Библиотека дизайн-систем и стилей карточек: превью и промпты для сборки снаружи.",
        inLanguage: "ru-RU",
        potentialAction: {
          "@type": "SearchAction",
          target: `${absoluteUrl("/studio")}?style={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: "Дизайн Атлас",
        url: absoluteUrl("/"),
        sameAs: ["https://github.com/bilarius1-tech/design-atlas"],
      },
      {
        "@type": "SoftwareApplication",
        name: "Дизайн Атлас — Студия",
        applicationCategory: "DesignApplication",
        operatingSystem: "Web",
        url: absoluteUrl("/studio"),
        description:
          "Шаблон × стиль → превью → промпты для AI-агента и конструктора страниц.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "RUB",
        },
      },
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,color-mix(in_srgb,var(--color-primary)_12%,transparent),transparent_55%),radial-gradient(ellipse_at_90%_20%,color-mix(in_srgb,var(--color-accent)_10%,transparent),transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,color-mix(in_srgb,var(--color-border)_80%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-border)_80%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        />
        <Container className="relative grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
              Дизайн Атлас
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-display">
              Анти ИИ-слоп
            </h1>
            <p className="max-w-2xl text-lg text-muted sm:text-xl">
              Готовые визуальные системы вместо «сделай красиво». Смотрите превью, забирайте
              промпт — собирайте сайт или карточку{" "}
              <strong className="font-medium text-foreground">снаружи</strong>.
            </p>
            <Stack direction="horizontal" gap="md">
              <Link
                href="/studio?template=saas-landing&style=swiss-international"
                className={buttonClassName()}
              >
                Открыть студию
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/cards" className={buttonClassName({ variant: "secondary" })}>
                Стили карточек
              </Link>
            </Stack>
          </div>
          <div className="space-y-4 border-l border-border pl-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
              Суть
            </p>
            <p className="font-serif text-2xl tracking-tight">
              Система → превью → промпт → сборка снаружи
            </p>
            <p className="text-sm text-muted">
              Сайты — главный путь. Карточки маркетплейса — рядом на том же домене.
            </p>
          </div>
        </Container>
      </section>

      <Section
        id="products"
        eyebrow="Два продукта"
        title="Один домен, два выхода"
        description="Студия важнее. Карточки — соседний раздел для инфографики товара."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 border-t border-border pt-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Главное
            </p>
            <h3 className="font-serif text-2xl tracking-tight">Студия — сайты</h3>
            <p className="text-sm text-muted">
              Шаблон × дизайн-система → живое превью лендинга → промпты для Cursor и агента
              конструктора (RU/EN).
            </p>
            <Link
              href="/studio?template=saas-landing&style=swiss-international"
              className={buttonClassName({ size: "lg" })}
            >
              Перейти в студию
            </Link>
          </div>
          <div className="space-y-4 border-t border-border pt-6">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-muted uppercase">
              <Images className="h-3.5 w-3.5" aria-hidden />
              Рядом
            </p>
            <h3 className="font-serif text-2xl tracking-tight">Карточки</h3>
            <p className="text-sm text-muted">
              Стили инфографики для маркетплейса: живое CSS-превью, шрифт, акцент и image-gen
              промпт во внешний генератор.
            </p>
            <Link href="/cards" className={buttonClassName({ variant: "secondary", size: "lg" })}>
              Открыть карточки
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
