import { loadActiveCardStyles } from "@/core/content/load-card-styles";
import { CardsLibrary } from "@/features/cards/cards-library";
import { absoluteUrl } from "@/lib/site-url";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Стили карточек",
  description:
    "Библиотека визуальных стилей для карточек маркетплейса: превью, шрифт, акцент и готовый image-gen промпт RU/EN. Генерация снаружи.",
  alternates: { canonical: "/cards" },
  openGraph: {
    title: "Стили карточек · Дизайн Атлас",
    description:
      "Выберите стиль инфографики товара и скопируйте промпт во внешний генератор.",
    url: absoluteUrl("/cards"),
    type: "website",
    locale: "ru_RU",
  },
};

export default function CardsPage() {
  const styles = loadActiveCardStyles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Стили карточек · Дизайн Атлас",
    description:
      "Библиотека визуальных стилей для карточек маркетплейса с готовыми image-gen промптами.",
    url: absoluteUrl("/cards"),
    isPartOf: {
      "@type": "WebSite",
      name: "Дизайн Атлас",
      url: absoluteUrl("/"),
    },
    numberOfItems: styles.length,
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CardsLibrary styles={styles} />
    </main>
  );
}
