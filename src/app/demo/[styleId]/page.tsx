import { listStyleIdsFromDisk, loadStyleBundle } from "@/core/content";
import { primerHref } from "@/features/primer";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

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
      title: `Пример · ${bundle.style.title.ru}`,
      description: bundle.style.shortDescription.ru,
    };
  } catch {
    return { title: "Пример сайта" };
  }
}

export default async function StyleDemoPage({ params }: DemoPageProps) {
  const { styleId } = await params;
  if (!listStyleIdsFromDisk().includes(styleId)) {
    notFound();
  }
  redirect(primerHref(styleId, "dental"));
}
