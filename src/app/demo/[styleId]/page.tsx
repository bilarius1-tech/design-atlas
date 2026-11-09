import { Container } from "@/components/layout";
import { Badge, buttonClassName } from "@/components/ui";
import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";
import { DemoLandingEngine, resolveComposition } from "@/features/demo-landing";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type DemoPageProps = {
  params: Promise<{ styleId: string }>;
};

export function generateStaticParams() {
  return listStyleIdsFromDisk()
    .map((styleId) => {
      try {
        const bundle = loadStyleBundle(styleId);
        return bundle.demo ? { styleId } : null;
      } catch {
        return null;
      }
    })
    .filter((value): value is { styleId: string } => value !== null);
}

export async function generateMetadata({ params }: DemoPageProps): Promise<Metadata> {
  const { styleId } = await params;
  try {
    const bundle = loadStyleBundle(styleId);
    return {
      title: `Demo · ${bundle.style.title.ru}`,
      description: bundle.style.shortDescription.ru,
    };
  } catch {
    return { title: "Demo landing" };
  }
}

export default async function StyleDemoPage({ params }: DemoPageProps) {
  const { styleId } = await params;
  if (!listStyleIdsFromDisk().includes(styleId)) {
    notFound();
  }

  const bundle = loadStyleBundle(styleId);
  if (!bundle.demo) {
    notFound();
  }

  const composition = resolveComposition(bundle.demo.compositionId);

  return (
    <main id="main-content" className="pb-16">
      <Container className="space-y-6 py-10">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Demo Landing
              </p>
              <Badge>{bundle.style.status}</Badge>
              <Badge tone="accent">{composition.id}</Badge>
            </div>
            <h1 className="max-w-full break-words font-serif text-4xl tracking-tight">
              {bundle.style.title.ru}
            </h1>
            <p className="max-w-2xl text-muted">{composition.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/playground/${styleId}`}
              className={buttonClassName({ variant: "secondary", size: "sm" })}
            >
              Playground
            </Link>
            <Link href="/demo" className={buttonClassName({ variant: "ghost", size: "sm" })}>
              Все demo
            </Link>
          </div>
        </div>

        <DemoLandingEngine
          styleId={bundle.id}
          styleTitle={bundle.style.title.ru}
          tokens={bundle.tokens}
          demo={bundle.demo}
          locale="ru"
        />
      </Container>
    </main>
  );
}
