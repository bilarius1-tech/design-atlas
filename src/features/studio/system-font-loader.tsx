"use client";

import { useEffect } from "react";
import { googleFontsCssUrl, shortFontFamily } from "./google-fonts-cyrillic";

const LINK_ID = "da-system-google-fonts";

type SystemFontLoaderProps = {
  headingStack?: string;
  bodyStack?: string;
};

/** Loads selected Google Fonts (Cyrillic) for live Studio preview. */
export function SystemFontLoader({ headingStack, bodyStack }: SystemFontLoaderProps) {
  useEffect(() => {
    const families = [headingStack, bodyStack]
      .filter((value): value is string => Boolean(value))
      .map(shortFontFamily);

    const href = googleFontsCssUrl(families);
    const existing = document.getElementById(LINK_ID) as HTMLLinkElement | null;

    if (!href) {
      existing?.remove();
      return;
    }

    if (existing) {
      if (existing.getAttribute("href") !== href) existing.href = href;
      return;
    }

    const link = document.createElement("link");
    link.id = LINK_ID;
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }, [bodyStack, headingStack]);

  return null;
}
