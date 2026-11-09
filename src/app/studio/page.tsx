import { StudioView } from "./studio-view";
import type { Metadata } from "next";
import { Suspense } from "react";

type StudioPageProps = {
  searchParams: Promise<{ template?: string; style?: string }>;
};

export const metadata: Metadata = {
  title: "Студия · шаблон × стиль",
  description:
    "Выберите шаблон и дизайн-систему, посмотрите превью, заберите промпт для агента или конструктора.",
};

function StudioFallback() {
  return (
    <div className="flex min-h-[calc(100dvh-8rem)] border-y border-border bg-background">
      <div className="hidden w-[320px] shrink-0 border-r border-border bg-surface p-4 lg:block">
        <div className="mb-4 h-6 w-24 animate-pulse bg-border" />
        <div className="mb-2 h-9 w-full animate-pulse bg-border" />
        <div className="h-9 w-full animate-pulse bg-border" />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="border-b border-border px-5 py-4">
          <p className="text-sm text-muted">Загрузка студии…</p>
        </div>
        <div className="flex-1 p-5">
          <div className="h-64 animate-pulse border border-border bg-surface" />
        </div>
      </div>
    </div>
  );
}

export default function StudioPage({ searchParams }: StudioPageProps) {
  return (
    <main id="main-content" className="flex-1">
      <Suspense fallback={<StudioFallback />}>
        <StudioView searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
