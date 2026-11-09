"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./container";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return null;

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container className="flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="font-serif text-lg text-foreground">Дизайн Атлас</p>
          <p className="text-sm text-muted">Анти ИИ-слоп · системы для сайтов и карточек.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/studio" className="text-muted hover:text-foreground">
            Студия
          </Link>
          <Link href="/cards" className="text-muted hover:text-foreground">
            Карточки
          </Link>
          <Link href="/llms.txt" className="text-muted hover:text-foreground">
            llms.txt
          </Link>
          <a
            href="https://github.com/bilarius1-tech/design-atlas"
            className="text-muted hover:text-foreground"
            rel="noopener noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}
