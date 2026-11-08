import { Section } from "@/components/layout";
import { Badge, Card, buttonClassName } from "@/components/ui";
import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";
import { resolveComposition } from "@/features/demo-landing";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demo landings",
  description: "Демонстрационные лендинги стилей DESIGN ATLAS.",
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
        eyebrow="PHASE 5"
        title="Demo Landing Engine"
        description="Блочный движок лендингов. Порядок секций и тексты — из demo.json; раскладка — из compositionId."
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
              <Link href={`/demo/${style.id}`} className={buttonClassName({ size: "sm" })}>
                Открыть demo landing
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </main>
  );
}
