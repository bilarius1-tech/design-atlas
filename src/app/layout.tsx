import { SiteFooter, SiteHeader, SkipLink } from "@/components/layout";
import { getSiteUrl } from "@/lib/site-url";
import type { Metadata } from "next";
import { Geist_Mono, Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Анти ИИ-слоп · Дизайн Атлас",
    template: "%s · Дизайн Атлас",
  },
  description:
    "Дизайн Атлас — готовые визуальные системы без AI-слопа. Студия для сайтов и стили карточек маркетплейса. Превью → промпт → сборка снаружи.",
  applicationName: "Дизайн Атлас",
  keywords: [
    "дизайн система",
    "дизайн атлас",
    "анти ии слоп",
    "промпт для cursor",
    "карточки маркетплейса",
    "design system",
  ],
  authors: [{ name: "Дизайн Атлас" }],
  creator: "Дизайн Атлас",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Дизайн Атлас",
    title: "Анти ИИ-слоп · Дизайн Атлас",
    description:
      "Готовые дизайн-системы и стили карточек. Смотрите превью, забирайте промпт — собирайте снаружи.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Анти ИИ-слоп · Дизайн Атлас",
    description:
      "Готовые дизайн-системы и стили карточек. Превью → промпт → сборка снаружи.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "design",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${sourceSans.variable} ${sourceSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
