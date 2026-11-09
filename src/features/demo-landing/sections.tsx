import type { DemoSection } from "@/core/schemas";
import type { ReactNode } from "react";
import { t, type DemoLocale } from "./localize";
import { ProductMediaFrame } from "./product-media-frame";

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
  const brand = t(section.eyebrow, locale) || styleTitle;

  return (
    <SectionShell id={section.id} className="dl-section-header">
      <div className="sp-nav dl-nav">
        <div className="dl-brand">
          <span className="dl-brand-mark" aria-hidden>
            {brand.slice(0, 1)}
          </span>
          <div>
            <p className="sp-heading sp-h3">{brand}</p>
            <p className="sp-caption sp-muted">{styleTitle}</p>
          </div>
        </div>
        <nav aria-label="Demo navigation" className="dl-nav-links">
          <a href="#demo-features">{locale === "ru" ? "Возможности" : "Features"}</a>
          <a href="#demo-statistics">{locale === "ru" ? "Метрики" : "Metrics"}</a>
          <a href="#demo-pricing">{locale === "ru" ? "Тарифы" : "Pricing"}</a>
          <a href="#demo-faq">FAQ</a>
          <a href="#demo-cta" className="sp-btn sp-btn-ghost no-underline dl-nav-ghost">
            {locale === "ru" ? "Войти" : "Sign in"}
          </a>
          <a href={section.ctaHref || "#demo-cta"} className="sp-btn sp-btn-primary no-underline">
            {t(section.ctaLabel, locale) || (locale === "ru" ? "Начать" : "Start")}
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
  const secondaryLabel = locale === "ru" ? "Смотреть возможности" : "See features";

  return (
    <SectionShell id={section.id}>
      <div
        className={`dl-hero dl-hero-split ${compositionId === "editorial-split" ? "dl-grid-2" : "dl-grid-2"}`.trim()}
      >
        <div className="space-y-5">
          {section.eyebrow ? <p className="dl-kicker">{t(section.eyebrow, locale)}</p> : null}
          <h1 className="sp-heading sp-display dl-hero-title">{t(section.headline, locale)}</h1>
          {section.body ? <p className="sp-body-lg sp-muted max-w-2xl">{t(section.body, locale)}</p> : null}
          <div className="dl-cta-row">
            {section.ctaLabel ? (
              <a href={section.ctaHref || "#demo-cta"} className="sp-btn sp-btn-primary no-underline">
                {t(section.ctaLabel, locale)}
              </a>
            ) : null}
            <a href="#demo-features" className="sp-btn sp-btn-secondary no-underline">
              {secondaryLabel}
            </a>
          </div>
          <p className="sp-caption sp-muted">
            {locale === "ru"
              ? "Демо-каркас · дизайн-система применяется к тем же блокам"
              : "Demo frame · design system applies to the same blocks"}
          </p>
        </div>
        <ProductMediaFrame caption={locale === "ru" ? "панель / продукт" : "app / panel"} />
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
        {items.map((item, index) => (
          <article key={t(item.title, locale)} className="sp-card dl-feature-card space-y-3">
            <span className="dl-feature-index" aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
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
          <a href="#demo-showcase" className="sp-btn sp-btn-tertiary no-underline">
            {locale === "ru" ? "К модулям" : "See modules"}
          </a>
        </div>
        <ProductMediaFrame caption={locale === "ru" ? "дорожная карта" : "roadmap"} />
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
            <div className="dl-media-thumb" aria-hidden>
              <span />
              <span />
            </div>
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
    <SectionShell id={section.id} className="dl-section-stats">
      {section.headline ? (
        <h2 className="sp-heading sp-h2 mb-8">{t(section.headline, locale)}</h2>
      ) : null}
      <div className={`dl-stats ${items.length >= 4 ? "dl-stats-4" : "dl-grid-3"}`}>
        {items.map((item) => (
          <div key={t(item.title, locale)} className="dl-stat">
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
            className={`sp-card space-y-4 ${index === 1 ? "dl-pricing-featured" : ""}`}
          >
            <p className="dl-kicker">{t(item.meta, locale)}</p>
            <h3 className="sp-heading sp-h2">{t(item.title, locale)}</h3>
            {item.body ? <p className="sp-muted text-[length:var(--sp-text-sm)]">{t(item.body, locale)}</p> : null}
            <button type="button" className={index === 1 ? "sp-btn sp-btn-primary" : "sp-btn sp-btn-secondary"}>
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
  const emailLabel = locale === "ru" ? "Рабочий email" : "Work email";
  const placeholder = locale === "ru" ? "you@company.ru" : "you@company.com";

  return (
    <SectionShell id={section.id}>
      <div className="sp-card dl-cta-panel space-y-5">
        {section.headline ? <h2 className="sp-heading sp-h1">{t(section.headline, locale)}</h2> : null}
        {section.body ? <p className="sp-muted max-w-2xl">{t(section.body, locale)}</p> : null}
        <form className="dl-cta-form" action="#demo-cta" method="get">
          <label className="sp-field-label" htmlFor="demo-cta-email">
            {emailLabel}
          </label>
          <div className="dl-cta-form-row">
            <input
              id="demo-cta-email"
              name="email"
              type="email"
              className="sp-input"
              placeholder={placeholder}
              autoComplete="email"
            />
            <button type="submit" className="sp-btn sp-btn-accent">
              {t(section.ctaLabel, locale) || (locale === "ru" ? "Отправить" : "Submit")}
            </button>
          </div>
          <p className="sp-caption sp-muted">
            {locale === "ru"
              ? "Форма демонстрационная — заявка никуда не уходит."
              : "Demo form only — nothing is submitted."}
          </p>
        </form>
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
    <SectionShell id={section.id} className="dl-section-footer">
      <div className="dl-footer">
        <div>
          <p className="sp-heading sp-h3">{t(section.headline, locale) || styleTitle}</p>
          <p className="sp-muted text-[length:var(--sp-text-sm)]">
            {t(section.body, locale) || "Demo landing generated from validated content blocks."}
          </p>
        </div>
        <nav className="dl-footer-links" aria-label="Footer">
          <a href="#demo-features">{locale === "ru" ? "Возможности" : "Features"}</a>
          <a href="#demo-pricing">{locale === "ru" ? "Тарифы" : "Pricing"}</a>
          <a href="#demo-faq">FAQ</a>
          <a href="#demo-cta">{locale === "ru" ? "Заявка" : "Signup"}</a>
        </nav>
        <p className="sp-caption sp-muted">DESIGN ATLAS · {styleTitle}</p>
      </div>
    </SectionShell>
  );
}
