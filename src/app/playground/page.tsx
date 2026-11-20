import { Container, Section } from "@/components/layout";
import { Badge, Card, buttonClassName } from "@/components/ui";
import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Песочница",
  description: "Песочница токенов и состояний кнопок для каждого стиля Дизайн Атласа.",
};

export default function PlaygroundIndexPage() {
  const styles = listStyleIdsFromDisk().map((id) => {
    const bundle = loadStyleBundle(id);
    return {
      id,
      status: bundle.style.status,
      title: bundle.style.title,
      shortDescription: bundle.style.shortDescription,
    };
  });

  return (
    <main id="main-content">
      <Section
        eyebrow="Песочница"
        title="Токены и состояния"
        description="Демонстрация цветов, шрифтов и состояний кнопок. Стили отделены от оболочки самого Атласа."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {styles.map((style) => (
            <Card key={style.id} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl tracking-tight">{style.title.ru}</h2>
                <Badge tone={style.status === "published" ? "success" : "neutral"}>
                  {style.status}
                </Badge>
              </div>
              <p className="text-sm text-muted">{style.shortDescription.ru}</p>
              <Link href={`/playground/${style.id}`} className={buttonClassName({ size: "sm" })}>
                Открыть песочницу
              </Link>
            </Card>
          ))}
        </div>
      </Section>
      {styles.length === 0 ? (
        <Container>
          <p className="text-muted">Пока нет стилей в content/styles.</p>
        </Container>
      ) : null}
    </main>
  );
}
