import Link from "next/link";
import { Container } from "./container";

const navItems = [
  { href: "/design-system", label: "Дизайн-система" },
  { href: "/playground", label: "Playground" },
  { href: "/demo", label: "Demo" },
  { href: "/#roadmap", label: "Дорожная карта" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[var(--da-z-header)] border-b border-border bg-background/95 backdrop-blur-sm">
      <Container className="flex h-[var(--da-size-header)] items-center justify-between gap-6">
        <Link href="/" className="group flex items-baseline gap-3 no-underline">
          <span className="font-serif text-xl tracking-tight text-foreground">DESIGN ATLAS</span>
          <span className="hidden text-xs tracking-[0.14em] text-muted uppercase sm:inline">
            Foundation
          </span>
        </Link>
        <nav aria-label="Основная навигация">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-muted no-underline transition-colors hover:bg-surface-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
