import { Container, Section, Stack } from "@/components/layout";
import { Badge, Card, Divider, buttonClassName } from "@/components/ui";
import Link from "next/link";

const phases = [
  { id: "P0", title: "Фундамент", status: "done", note: "Репозиторий и harness" },
  { id: "P1", title: "Design System Core", status: "active", note: "Оболочка продукта" },
  { id: "P2", title: "Эталон", status: "next", note: "Swiss International" },
  { id: "P3", title: "Продукт", status: "queued", note: "Каталог и страницы" },
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="border-b border-border bg-surface">
        <Container className="grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:py-24">
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
              Knowledge Platform · Design System Library
            </p>
            <h1 className="max-w-3xl font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-display">
              DESIGN ATLAS
            </h1>
            <p className="max-w-2xl text-lg text-muted sm:text-xl">
              Выбери визуальный стиль. Изучи его. Передай своей AI-команде готовую
              дизайн-систему.
            </p>
            <Stack direction="horizontal" gap="md">
              <Link href="/design-system" className={buttonClassName()}>
                Смотреть дизайн-систему
              </Link>
              <a
                href="https://github.com/bilarius1-tech/design-atlas"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName({ variant: "secondary" })}
              >
                Репозиторий
              </a>
            </Stack>
          </div>
          <Card className="space-y-4">
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
              Принцип
            </p>
            <p className="font-serif text-2xl tracking-tight">
              Сначала фундамент и эталонная дизайн-система. Затем — библиотека стилей.
            </p>
            <Divider />
            <p className="text-sm text-muted">
              Visual first · Agent ready · No AI slop · Editorial quality
            </p>
          </Card>
        </Container>
      </section>

      <Section
        id="roadmap"
        eyebrow="Roadmap"
        title="Где мы сейчас"
        description="Публичный каталог стилей появится после Content Engine и эталонного Swiss International."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase) => (
            <Card key={phase.id} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-muted">{phase.id}</span>
                <Badge
                  tone={
                    phase.status === "done"
                      ? "success"
                      : phase.status === "active"
                        ? "accent"
                        : "neutral"
                  }
                >
                  {phase.status === "done"
                    ? "готово"
                    : phase.status === "active"
                      ? "сейчас"
                      : phase.status === "next"
                        ? "далее"
                        : "очередь"}
                </Badge>
              </div>
              <h3 className="font-serif text-xl tracking-tight">{phase.title}</h3>
              <p className="text-sm text-muted">{phase.note}</p>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
