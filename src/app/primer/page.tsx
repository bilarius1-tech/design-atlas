import {
  DEFAULT_NICHE,
  DEFAULT_STYLE_ID,
  PrimerShell,
  loadPrimerCatalog,
  resolveNiche,
  resolveStyleId,
} from "@/features/primer";
import { getSiteUrl, ogImage } from "@/lib/site-url";
import type { Metadata } from "next";
import { Suspense } from "react";

type PrimerPageProps = {
  searchParams: Promise<{ style?: string; niche?: string }>;
};

export const metadata: Metadata = {
  title: "Пример сайта в стиле Дизайн Атласа",
  description:
    "Один и тот же лендинг в любом стиле Атласа и в трёх сферах: стоматология, строительство, мебель. Это пример — вместо названия будет ваша компания.",
  alternates: { canonical: "/primer" },
  openGraph: {
    title: "Пример сайта · Дизайн Атлас",
    description: "Посмотрите, как может выглядеть сайт вашей компании в выбранном стиле.",
    url: `${getSiteUrl()}/primer`,
    images: [ogImage],
  },
};

async function PrimerView({ searchParams }: PrimerPageProps) {
  const params = await searchParams;
  const catalog = loadPrimerCatalog();
  const ids = catalog.map((item) => item.id);
  const styleId = resolveStyleId(params.style, ids, DEFAULT_STYLE_ID);
  const niche = resolveNiche(params.niche ?? DEFAULT_NICHE);

  return <PrimerShell catalog={catalog} initialStyleId={styleId} initialNiche={niche} />;
}

export default function PrimerPage({ searchParams }: PrimerPageProps) {
  return (
    <Suspense
      fallback={
        <div className="px-5 py-16 text-sm text-muted">Загружаем пример сайта…</div>
      }
    >
      <PrimerView searchParams={searchParams} />
    </Suspense>
  );
}
