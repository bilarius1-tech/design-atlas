import { Section } from "@/components/layout";
import { Badge, Card, buttonClassName } from "@/components/ui";
import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";
import { resolveComposition } from "@/features/demo-landing";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Примеры лендингов",
  description: "Полноценный пример сайта: один лендинг, все стили и три сферы.",
};

export default function DemoIndexPage() {
  const styles = listStyleIdsFromDisk().flatMap((id) => {
    const bundle = loadStyleBundle(id);
    if (!bundle.demo) {
      return [];
    }
    const composition = resolveComposition(bundle.demo.compositionId);
    return [
      {
        id,
        title: bundle.style.title,
        status: bundle.style.status,
        composition,
        shortDescription: bundle.style.shortDescription,
      },
    ];
  });

  return (
    <main id="main-content">
      <Section
        eyebrow="Примеры"
        title="Лендинги в каждом стиле"
        description="Откройте общий пример сайта и переключайте стиль. Тексты можно сменить на стоматологию, строительство или мебель."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {styles.map((style) => (
            <Card key={style.id} className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-serif text-2xl tracking-tight">{style.title.ru}</h2>
                <Badge>{style.status}</Badge>
              </div>
              <p className="text-sm text-muted">{style.shortDescription.ru}</p>
              <p className="font-mono text-xs text-muted">{style.composition.id}</p>
              <Link href={`/primer?style=${style.id}&niche=dental`} className={buttonClassName({ size: "sm" })}>
                Посмотреть на примере сайта
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
