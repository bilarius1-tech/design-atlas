/* Local pre-optimized WebP in /public/primer — no extra image optimizer in the 512 MB container. */
/* eslint-disable @next/next/no-img-element */
import { tokensToCssVars } from "@/core/generators/tokens-to-css";
import { cn } from "@/lib/cn";
import type { StyleTokens } from "@/core/schemas";
import { PrimerLeadForm } from "./lead-form";
import type { PrimerNiche } from "./niches";
import "@/features/style-playground/style-preview.css";
import "./primer.css";

export function PrimerLanding({
  styleId,
  tokens,
  niche,
}: {
  styleId: string;
  tokens: StyleTokens;
  niche: PrimerNiche;
}) {
  const hero = `/primer/${niche.id}/hero.webp`;

  return (
    <div
      className={cn("style-preview", "primer-site")}
      data-style-id={styleId}
      style={tokensToCssVars(tokens)}
    >
      <header className="primer-header">
        <div className="primer-wrap">
          <a className="primer-logo" href="#top">
            <strong className="sp-heading">{niche.company}</strong>
            <span>{niche.tagline}</span>
          </a>
          <nav className="primer-nav" aria-label="Разделы примера">
            {niche.nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="primer-header-cta">
            <a className="primer-phone" href={niche.phoneHref}>
              {niche.phone}
            </a>
            <a className="sp-btn sp-btn-primary no-underline" href="#lead">
              {niche.primaryCta}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="primer-wrap primer-hero" aria-labelledby="primer-hero-title">
          <div>
            <p className="primer-kicker">{niche.heroKicker}</p>
            <h1 id="primer-hero-title" className="sp-heading sp-display">
              {niche.heroTitle}
            </h1>
            <p className="primer-hero-lead">{niche.heroLead}</p>
            <div className="primer-actions">
              <a className="sp-btn sp-btn-primary no-underline" href="#lead">
                {niche.primaryCta}
              </a>
              <a className="sp-btn sp-btn-secondary no-underline" href="#services">
                {niche.secondaryCta}
              </a>
            </div>
          </div>
          <figure className="primer-media">
            <img src={hero} alt={`${niche.company}: главный экран примера`} width={1600} height={900} />
          </figure>
        </section>

        <section className="primer-section" aria-labelledby="primer-adv">
          <div className="primer-wrap">
            <h2 id="primer-adv" className="sp-heading sp-h2">
              {niche.advantagesTitle}
            </h2>
            <div className="primer-grid primer-grid-2">
              {niche.advantages.map((item) => (
                <article key={item.title} className="primer-card sp-card sp-surface">
                  <h3 className="sp-heading sp-h3">{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="primer-section" id="services" aria-labelledby="primer-services">
          <div className="primer-wrap">
            <h2 id="primer-services" className="sp-heading sp-h2">
              {niche.servicesTitle}
            </h2>
            <p className="primer-lead">{niche.servicesLead}</p>
            <div className="primer-grid primer-grid-3">
              {niche.services.map((item) => (
                <article key={item.title} className="primer-card sp-card">
                  <h3 className="sp-heading sp-h3">{item.title}</h3>
                  <p>{item.text}</p>
                  <p className="primer-price">{item.price}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="primer-section" id="prices" aria-labelledby="primer-prices">
          <div className="primer-wrap">
            <h2 id="primer-prices" className="sp-heading sp-h2">
              {niche.pricesTitle}
            </h2>
            <p className="primer-lead">{niche.pricesNote}</p>
            <div className="primer-grid primer-grid-3">
              {niche.plans.map((plan) => (
                <article
                  key={plan.name}
                  className={cn("primer-card", "primer-plan", "sp-card", plan.featured && "primer-plan-featured")}
                >
                  <h3 className="sp-heading sp-h3">{plan.name}</h3>
                  <p className="primer-price">
                    {plan.price}
                    <span className="sp-muted"> · {plan.period}</span>
                  </p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="primer-section" id="works" aria-labelledby="primer-works">
          <div className="primer-wrap">
            <h2 id="primer-works" className="sp-heading sp-h2">
              {niche.worksTitle}
            </h2>
            <p className="primer-lead">{niche.worksLead}</p>
            <div className="primer-grid primer-grid-4">
              {niche.works.map((work) => (
                <figure key={work.src} className="primer-media primer-work">
                  <img src={work.src} alt={work.alt} width={1200} height={900} />
                  <figcaption>
                    <h3 className="sp-heading">{work.title}</h3>
                    <p className="sp-muted">{work.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="primer-section" id="steps" aria-labelledby="primer-steps">
          <div className="primer-wrap">
            <h2 id="primer-steps" className="sp-heading sp-h2">
              {niche.stepsTitle}
            </h2>
            <ol className="primer-steps">
              {niche.steps.map((step) => (
                <li key={step.title} className="primer-card sp-card">
                  <h3 className="sp-heading sp-h3">{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="primer-section" id="reviews" aria-labelledby="primer-reviews">
          <div className="primer-wrap">
            <h2 id="primer-reviews" className="sp-heading sp-h2">
              {niche.reviewsTitle}
            </h2>
            <div className="primer-grid primer-grid-3">
              {niche.reviews.map((review) => (
                <blockquote key={review.name} className="primer-card sp-card">
                  <p>«{review.text}»</p>
                  <p className="primer-price">
                    {review.name}
                    <span className="sp-muted"> · {review.role}</span>
                  </p>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="primer-section" id="faq" aria-labelledby="primer-faq">
          <div className="primer-wrap">
            <h2 id="primer-faq" className="sp-heading sp-h2">
              {niche.faqTitle}
            </h2>
            <div className="primer-faq">
              {niche.faq.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="primer-section" id="lead" aria-labelledby="primer-lead">
          <div className="primer-wrap primer-contacts">
            <div>
              <h2 id="primer-lead" className="sp-heading sp-h2">
                {niche.formTitle}
              </h2>
              <p className="primer-lead">{niche.formLead}</p>
              <PrimerLeadForm niche={niche} />
            </div>
            <div id="contacts">
              <h2 className="sp-heading sp-h2">{niche.contactsTitle}</h2>
              <div className="primer-card sp-card" style={{ marginBottom: "1rem" }}>
                <p>
                  {niche.address}
                  <br />
                  {niche.hours}
                  <br />
                  <a href={niche.phoneHref}>{niche.phone}</a>
                  <br />
                  <a href={`mailto:${niche.email}`}>{niche.email}</a>
                </p>
              </div>
              <div className="primer-media primer-map" aria-label="Карта в этом примере не подключена">
                <p>
                  Здесь будет карта вашего адреса.
                  <br />
                  Внешние карты в демо не подключаем.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="primer-footer">
        <div className="primer-wrap">
          <p>
            {niche.legal}. Это вымышленная компания для демонстрации стиля.
          </p>
          <p>© {new Date().getFullYear()} {niche.company}</p>
        </div>
      </footer>
    </div>
  );
}
