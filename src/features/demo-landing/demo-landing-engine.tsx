import type { DemoDefinition, StyleTokens } from "@/core/schemas";
import { StylePreviewFrame } from "@/features/style-playground";
import { cn } from "@/lib/cn";
import { resolveComposition } from "./compositions";
import "./demo-landing.css";
import { DemoFaqSection } from "./faq-section";
import type { DemoLocale } from "./localize";
import {
  DemoCtaSection,
  DemoEditorialSection,
  DemoFeaturesSection,
  DemoFooterSection,
  DemoHeaderSection,
  DemoHeroSection,
  DemoPricingSection,
  DemoShowcaseSection,
  DemoStatisticsSection,
  DemoTestimonialsSection,
} from "./sections";

export type DemoLandingEngineProps = {
  styleId: string;
  styleTitle: string;
  tokens: StyleTokens;
  demo: DemoDefinition;
  locale?: DemoLocale;
  /** Atmosphere hint for token-driven chrome (not a layout builder). */
  templateId?: string;
};

export function DemoLandingEngine({
  styleId,
  styleTitle,
  tokens,
  demo,
  locale = demo.localeDefault ?? "ru",
  templateId,
}: DemoLandingEngineProps) {
  const composition = resolveComposition(demo.compositionId);
  const sectionIds = demo.sections.map((section) => section.id);
  const secondaryTarget =
    sectionIds.find((id) => id === "showcase" || id === "features" || id === "editorial") ?? "cta";
  const secondaryHref = `#demo-${secondaryTarget}`;
  const secondaryLabel =
    locale === "ru"
      ? secondaryTarget === "showcase"
        ? templateId === "corporate-blog"
          ? "К новостям"
          : "Смотреть каталог"
        : secondaryTarget === "editorial"
          ? "Читать дальше"
          : "Смотреть возможности"
      : secondaryTarget === "showcase"
        ? templateId === "corporate-blog"
          ? "Read news"
          : "Browse catalog"
        : secondaryTarget === "editorial"
          ? "Read more"
          : "See features";

  const mediaVariant =
    templateId === "product-catalog"
      ? "store"
      : templateId === "corporate-blog"
        ? "editorial"
        : "app";

  return (
    <StylePreviewFrame
      styleId={styleId}
      tokens={tokens}
      className={cn("dl-root", composition.className)}
      data-composition={composition.id}
      data-template={templateId || "saas-landing"}
    >
      {demo.sections.map((section) => {
        switch (section.id) {
          case "header":
            return (
              <DemoHeaderSection
                key={section.id}
                section={section}
                locale={locale}
                styleTitle={styleTitle}
                navSectionIds={sectionIds}
              />
            );
          case "hero":
            return (
              <DemoHeroSection
                key={section.id}
                section={section}
                locale={locale}
                compositionId={composition.id}
                secondaryHref={secondaryHref}
                secondaryLabel={secondaryLabel}
                mediaVariant={mediaVariant}
              />
            );
          case "features":
            return <DemoFeaturesSection key={section.id} section={section} locale={locale} />;
          case "editorial":
            return (
              <DemoEditorialSection
                key={section.id}
                section={section}
                locale={locale}
                mediaVariant={mediaVariant === "app" ? "app" : mediaVariant}
              />
            );
          case "showcase":
            return (
              <DemoShowcaseSection
                key={section.id}
                section={section}
                locale={locale}
                atmosphere={templateId === "corporate-blog" ? "news" : templateId === "product-catalog" ? "product" : "default"}
              />
            );
          case "statistics":
            return <DemoStatisticsSection key={section.id} section={section} locale={locale} />;
          case "testimonials":
            return <DemoTestimonialsSection key={section.id} section={section} locale={locale} />;
          case "pricing":
            return <DemoPricingSection key={section.id} section={section} locale={locale} />;
          case "faq":
            return <DemoFaqSection key={section.id} section={section} locale={locale} />;
          case "cta":
            return <DemoCtaSection key={section.id} section={section} locale={locale} />;
          case "footer":
            return (
              <DemoFooterSection
                key={section.id}
                section={section}
                locale={locale}
                styleTitle={styleTitle}
              />
            );
          default:
            return null;
        }
      })}
    </StylePreviewFrame>
  );
}
