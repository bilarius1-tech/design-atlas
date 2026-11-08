import type { DemoSection } from "@/core/schemas";
import type { ReactNode } from "react";
import { t, type DemoLocale } from "./localize";

function SectionShell({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={`demo-${id}`} className={`dl-section ${className ?? ""}`.trim()}>
      <div className="dl-shell">{children}</div>
    </section>
  );
}

export function DemoHeaderSection({
  section,
  locale,
  styleTitle,
}: {
  section: DemoSection;
  locale: DemoLocale;
  styleTitle: string;
}) {
  return (
    <SectionShell id={section.id}>
      <div className="sp-nav" style={{ borderBottom: 0, paddingBottom: 0 }}>
        <div>
          <p className="dl-kicker">{t(section.eyebrow, locale) || "Demo landing"}</p>
          <p className="sp-heading sp-h3 mt-1">{styleTitle}</p>
        </div>
        <nav aria-label="Demo navigation" className="flex flex-wrap gap-4 text-[length:var(--sp-text-sm)]">
          <a href="#demo-features">Features</a>
          <a href="#demo-pricing">Pricing</a>
          <a href="#demo-faq">FAQ</a>
          <a href="#demo-cta" className="sp-btn sp-btn-primary no-underline">
            {t(section.ctaLabel, locale) || "Start"}
          </a>
        </nav>
      </div>
    </SectionShell>
  );
}

export function DemoHeroSection({
  section,
  locale,
  compositionId,
}: {
  section: DemoSection;
  locale: DemoLocale;
  compositionId: string;
}) {
  return (
    <SectionShell id={section.id}>
      <div className={`dl-hero ${compositionId === "editorial-split" ? "dl-grid-2" : ""}`.trim()}>
        <div className="space-y-5">
          {section.eyebrow ? <p className="dl-kicker">{t(section.eyebrow, locale)}</p> : null}
          <h1 className="sp-heading sp-display dl-hero-title">{t(section.headline, locale)}</h1>
          {section.body ? <p className="sp-body-lg sp-muted max-w-2xl">{t(section.body, locale)}</p> : null}
          {section.ctaLabel ? (
            <a href={section.ctaHref || "#demo-cta"} className="sp-btn sp-btn-primary no-underline">
              {t(section.ctaLabel, locale)}
            </a>
          ) : null}
        </div>
        {compositionId !== "modular-stack" ? (
          <div className="dl-media sp-card" aria-hidden>
            <p className="sp-code sp-muted">visual / grid module</p>
          </div>
        ) : null}
      </div>
    </SectionShell>
  );
}

export function DemoFeaturesSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  const items = section.items ?? [];
  return (
    <SectionShell id={section.id}>
      <div className="mb-8 max-w-2xl space-y-2">
        {section.eyebrow ? <p className="dl-kicker">{t(section.eyebrow, locale)}</p> : null}
        {section.headline ? <h2 className="sp-heading sp-h1">{t(section.headline, locale)}</h2> : null}
        {section.body ? <p className="sp-muted">{t(section.body, locale)}</p> : null}
      </div>
      <div className="dl-grid-3">
        {items.map((item) => (
          <article key={t(item.title, locale)} className="dl-feature-item space-y-2">
            <h3 className="sp-heading sp-h3">{t(item.title, locale)}</h3>
            {item.body ? <p className="sp-muted text-[length:var(--sp-text-sm)]">{t(item.body, locale)}</p> : null}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function DemoEditorialSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  return (
    <SectionShell id={section.id}>
      <div className="dl-editorial dl-grid-2">
        <div className="space-y-4">
          {section.eyebrow ? <p className="dl-kicker">{t(section.eyebrow, locale)}</p> : null}
          {section.headline ? <h2 className="sp-heading sp-h1">{t(section.headline, locale)}</h2> : null}
          {section.body ? <p className="sp-muted">{t(section.body, locale)}</p> : null}
        </div>
        <div className="dl-media" aria-hidden />
      </div>
    </SectionShell>
  );
}

export function DemoShowcaseSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  const items = section.items ?? [];
  return (
    <SectionShell id={section.id}>
      <div className="mb-8 space-y-2">
        {section.headline ? <h2 className="sp-heading sp-h1">{t(section.headline, locale)}</h2> : null}
        {section.body ? <p className="sp-muted max-w-2xl">{t(section.body, locale)}</p> : null}
      </div>
      <div className="dl-grid-3">
        {items.map((item) => (
          <article key={t(item.title, locale)} className="sp-card space-y-3">
            <div className="dl-media min-h-32" aria-hidden />
            <h3 className="sp-heading sp-h3">{t(item.title, locale)}</h3>
            {item.body ? <p className="sp-muted text-[length:var(--sp-text-sm)]">{t(item.body, locale)}</p> : null}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function DemoStatisticsSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  const items = section.items ?? [];
  return (
    <SectionShell id={section.id}>
      {section.headline ? <h2 className="sp-heading sp-h2 mb-8">{t(section.headline, locale)}</h2> : null}
      <div className="dl-grid-3">
        {items.map((item) => (
          <div key={t(item.title, locale)} className="space-y-2 border-t border-[var(--sp-color-border)] pt-4">
            <p className="sp-heading sp-h1">{t(item.title, locale)}</p>
            {item.body ? <p className="sp-muted text-[length:var(--sp-text-sm)]">{t(item.body, locale)}</p> : null}
          </div>
        ))}
      </div>
      {section.notes ? <p className="sp-caption sp-muted mt-6">{section.notes}</p> : null}
    </SectionShell>
  );
}

export function DemoTestimonialsSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  const items = section.items ?? [];
  return (
    <SectionShell id={section.id}>
      {section.headline ? <h2 className="sp-heading sp-h1 mb-8">{t(section.headline, locale)}</h2> : null}
      <div className="dl-grid-2">
        {items.map((item) => (
          <blockquote key={t(item.title, locale)} className="sp-card space-y-4">
            <p className="sp-heading sp-h3">{t(item.body, locale)}</p>
            <footer className="sp-muted text-[length:var(--sp-text-sm)]">
              {t(item.title, locale)}
              {item.meta ? ` · ${t(item.meta, locale)}` : ""}
            </footer>
          </blockquote>
        ))}
      </div>
    </SectionShell>
  );
}

export function DemoPricingSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  const items = section.items ?? [];
  return (
    <SectionShell id={section.id}>
      <div className="mb-8 max-w-2xl space-y-2">
        {section.headline ? <h2 className="sp-heading sp-h1">{t(section.headline, locale)}</h2> : null}
        {section.body ? <p className="sp-muted">{t(section.body, locale)}</p> : null}
      </div>
      <div className="dl-grid-3">
        {items.map((item, index) => (
          <article
            key={t(item.title, locale)}
            className={`sp-card space-y-4 ${index === 1 ? "border-[var(--sp-color-accent)]" : ""}`}
          >
            <p className="dl-kicker">{t(item.meta, locale)}</p>
            <h3 className="sp-heading sp-h2">{t(item.title, locale)}</h3>
            {item.body ? <p className="sp-muted text-[length:var(--sp-text-sm)]">{t(item.body, locale)}</p> : null}
            <button type="button" className="sp-btn sp-btn-secondary">
              {t(section.ctaLabel, locale) || "Choose"}
            </button>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

export function DemoCtaSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  return (
    <SectionShell id={section.id}>
      <div className="sp-card space-y-5">
        {section.headline ? <h2 className="sp-heading sp-h1">{t(section.headline, locale)}</h2> : null}
        {section.body ? <p className="sp-muted max-w-2xl">{t(section.body, locale)}</p> : null}
        {section.ctaLabel ? (
          <a href={section.ctaHref || "#"} className="sp-btn sp-btn-accent no-underline">
            {t(section.ctaLabel, locale)}
          </a>
        ) : null}
      </div>
    </SectionShell>
  );
}

export function DemoFooterSection({
  section,
  locale,
  styleTitle,
}: {
  section: DemoSection;
  locale: DemoLocale;
  styleTitle: string;
}) {
  return (
    <SectionShell id={section.id}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="sp-heading sp-h3">{styleTitle}</p>
          <p className="sp-muted text-[length:var(--sp-text-sm)]">
            {t(section.body, locale) || "Demo landing generated from validated content blocks."}
          </p>
        </div>
        <p className="sp-caption sp-muted">{t(section.headline, locale) || "DESIGN ATLAS"}</p>
      </div>
    </SectionShell>
  );
}
