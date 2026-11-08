"use client";

import type { DemoSection } from "@/core/schemas";
import { useState } from "react";
import { t, type DemoLocale } from "./localize";

export function DemoFaqSection({
  section,
  locale,
}: {
  section: DemoSection;
  locale: DemoLocale;
}) {
  const items = section.items ?? [];
  const [openId, setOpenId] = useState<string | null>(items[0] ? t(items[0].title, locale) : null);

  return (
    <section id={`demo-${section.id}`} className="dl-section">
      <div className="dl-shell">
        {section.headline ? (
          <h2 className="sp-heading sp-h1 mb-8">{t(section.headline, locale)}</h2>
        ) : null}
        <div>
          {items.map((item) => {
            const title = t(item.title, locale);
            const open = openId === title;
            return (
              <div key={title} className="dl-faq-item">
                <button
                  type="button"
                  className="dl-faq-trigger"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : title)}
                >
                  <span>{title}</span>
                  <span aria-hidden>{open ? "−" : "+"}</span>
                </button>
                {open && item.body ? (
                  <div className="dl-faq-panel">{t(item.body, locale)}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
