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
};

export function DemoLandingEngine({
  styleId,
  styleTitle,
  tokens,
  demo,
  locale = demo.localeDefault ?? "ru",
}: DemoLandingEngineProps) {
  const composition = resolveComposition(demo.compositionId);

  return (
    <StylePreviewFrame
      styleId={styleId}
      tokens={tokens}
      className={cn("dl-root", composition.className)}
      data-composition={composition.id}
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
              />
            );
          case "hero":
            return (
              <DemoHeroSection
                key={section.id}
                section={section}
                locale={locale}
                compositionId={composition.id}
              />
            );
          case "features":
            return <DemoFeaturesSection key={section.id} section={section} locale={locale} />;
          case "editorial":
            return <DemoEditorialSection key={section.id} section={section} locale={locale} />;
          case "showcase":
            return <DemoShowcaseSection key={section.id} section={section} locale={locale} />;
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
