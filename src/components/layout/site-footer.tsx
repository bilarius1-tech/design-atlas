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
          <p className="font-serif text-lg text-foreground">DESIGN ATLAS</p>
          <p className="text-sm text-muted">
            Visual design systems for humans and AI agents.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/design-system" className="text-muted hover:text-foreground">
            Дизайн-система
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
