import { Container } from "@/components/layout";
import { Badge, buttonClassName } from "@/components/ui";
import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";
import { prepareDesignPack } from "@/features/export";
import { ExportPanel } from "@/features/export/export-panel";
import { StylePlayground } from "@/features/style-playground";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type PlaygroundPageProps = {
  params: Promise<{ styleId: string }>;
};

export function generateStaticParams() {
  return listStyleIdsFromDisk().map((styleId) => ({ styleId }));
}

export async function generateMetadata({ params }: PlaygroundPageProps): Promise<Metadata> {
  const { styleId } = await params;
  try {
    const bundle = loadStyleBundle(styleId);
    return {
      title: `Playground · ${bundle.style.title.ru}`,
      description: bundle.style.shortDescription.ru,
    };
  } catch {
    return { title: "Playground" };
  }
}

export default async function StylePlaygroundPage({ params }: PlaygroundPageProps) {
  const { styleId } = await params;
  const known = listStyleIdsFromDisk();
  if (!known.includes(styleId)) {
    notFound();
  }

  const bundle = loadStyleBundle(styleId);

  return (
    <main id="main-content" className="pb-16">
      <Container className="space-y-6 py-10">
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                Style Playground
              </p>
              <Badge>{bundle.style.status}</Badge>
            </div>
            <h1 className="max-w-full break-words font-serif text-4xl tracking-tight">
              {bundle.style.title.ru}
            </h1>
            <p className="max-w-2xl text-muted">{bundle.style.shortDescription.ru}</p>
          </div>
          <Link href="/playground" className={buttonClassName({ variant: "secondary", size: "sm" })}>
            Все стили
          </Link>
        </div>

        <StylePlayground
          styleId={bundle.id}
          title={bundle.style.title.ru}
          tokens={bundle.tokens}
          groups={bundle.components?.groups}
        />

        {bundle.style.status === "published" ? (
          <ExportSection styleId={bundle.id} styleTitle={bundle.style.title.ru} />
        ) : null}
      </Container>
    </main>
  );
}

function ExportSection({ styleId, styleTitle }: { styleId: string; styleTitle: string }) {
  const prepared = prepareDesignPack(styleId, "free");
  if (!prepared.ok) {
    return (
      <ExportPanel
        styleId={styleId}
        styleTitle={styleTitle}
        freeManifest={null}
        freeError={prepared.message}
        freeFileCount={0}
        freeTotalBytes={0}
      />
    );
  }

  const totalBytes = [...prepared.pack.files.values()].reduce((sum, file) => sum + file.byteLength, 0);

  return (
    <ExportPanel
      styleId={styleId}
      styleTitle={styleTitle}
      freeManifest={prepared.pack.manifest}
      freeError={null}
      freeFileCount={prepared.pack.files.size}
      freeTotalBytes={totalBytes}
    />
  );
}
