import { Container, Section, Stack } from "@/components/layout";
import { Badge, Card, buttonClassName } from "@/components/ui";
import { ArrowRight, Boxes, Eye, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main id="main-content">
      <section className="border-b border-border bg-surface">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:py-24">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
              Библиотека дизайн-систем · dual prompt
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-display">
              DESIGN ATLAS
            </h1>
            <p className="max-w-2xl text-lg text-muted sm:text-xl">
              Выберите готовую дизайн-систему, наденьте на простой лендинг и заберите промпт для{" "}
              <strong className="font-medium text-foreground">Cursor</strong> или{" "}
              <strong className="font-medium text-foreground">агента Тильды</strong>. Мы не
              конструктор сайтов — сборка снаружи.
            </p>
            <Stack direction="horizontal" gap="md">
              <Link
                href="/studio?template=saas-landing&style=swiss-international"
                className={buttonClassName()}
              >
                Открыть студию
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href="/api/export/swiss-international?pack=free"
                className={buttonClassName({ variant: "secondary" })}
              >
                Free Design Pack
              </Link>
            </Stack>
          </div>
          <Card className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Суть</p>
            <p className="font-serif text-2xl tracking-tight">
              Система → превью → промпт → сборка снаружи
            </p>
            <p className="text-sm text-muted">
              Агент и конструктор получают одну систему. Блоки Тильды без системы — не наш путь.
            </p>
          </Card>
        </Container>
      </section>

      <Section
        id="start"
        eyebrow="Быстрый старт"
        title="Три шага"
        description="Основной путь продукта. Playground остаётся для QA."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="space-y-3">
            <Badge>
              <Boxes className="mr-1 inline h-3 w-3" aria-hidden />1
            </Badge>
            <h3 className="font-serif text-xl tracking-tight">Шаблон</h3>
            <p className="text-sm text-muted">Каркас страницы (сейчас SaaS-лендинг).</p>
          </Card>
          <Card className="space-y-3">
            <Badge>
              <Eye className="mr-1 inline h-3 w-3" aria-hidden />2
            </Badge>
            <h3 className="font-serif text-xl tracking-tight">Дизайн-система</h3>
            <p className="text-sm text-muted">Стиль на том же контенте — сразу видно look.</p>
          </Card>
          <Card className="space-y-3">
            <Badge>
              <Sparkles className="mr-1 inline h-3 w-3" aria-hidden />3
            </Badge>
            <h3 className="font-serif text-xl tracking-tight">Промпт наружу</h3>
            <p className="text-sm text-muted">Агент (Cursor) или конструктор (Тильда…) — RU/EN.</p>
          </Card>
        </div>
        <div className="mt-8">
          <Link
            href="/studio?template=saas-landing&style=swiss-international"
            className={buttonClassName({ size: "lg" })}
          >
            Перейти в студию
          </Link>
        </div>
      </Section>
    </main>
  );
}
