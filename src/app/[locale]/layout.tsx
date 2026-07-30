// Layout v2 — product images path fix
import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { locales, defaultLocale } from "./config";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Props
): Promise<Metadata> {
  const { locale } = await props.params;
  const baseUrl = "https://alfagrandpumps.com";

  const titles: Record<string, string> = {
    en: "ALFAGRAND | Professional Water Pump Manufacturer — Precision in Every Flow",
    es: "ALFAGRAND | Fabricante Profesional de Bombas de Agua — Precisión en cada Flujo",
    fr: "ALFAGRAND | Fabricant Profesionnel de Pompes à Eau — Précision à chaque Flux",
    ar: "ALFAGRAND | مصنع متخصص للمضخات المائية — الدقة في كل تدفق",
    pt: "ALFAGRAND | Fabricante Profissional de Bombas de Água — Precisão em Cada Fluxo",
    ru: "ALFAGRAND | Профессиональный производитель водяных насосов — Точность в каждом потоке",
  };

  const descriptions: Record<string, string> = {
    en: "Professional water pump manufacturer since 2017. Supplying vortex pumps, centrifugal pumps, submersible pumps, solar pumps & more to 50+ countries. Get a quote today.",
    es: "Fabricante profesional de bombas de agua desde 2017. Suministramos bombas vortex, centrifugas, sumergibles, solares y más a 50+ países. Solicite una cotización hoy.",
    fr: "Fabricant profesionnel de pompes à eau depuis 2017. Fournissons des pompes vortex, centrifuges, submersibles, solaires et plus à 50+ pays. Demandez un devis dès aujourd'hui.",
    ar: "مصنع متخصص للمضخات المائية منذ 2017. نورد مضخات الدوامة والطاردة المركزية والمغمورة والشمسية والمزيد إلى 50+ دولة. احصل على عرض أسعار الیوم.",
    pt: "Fabricante profissional de bombas de água desde 2017. Fornecendo bombas vortex, centrífugas, submersíveis, solares e mais para 50+ países. Solicite um orçamento hoje.",
    ru: "Профессиональный производитель водяных насосов с 2017 года. Поставляем вихревые, центробежные, погружные, солнечные насосы и другое в 50+ стран. Запросите предложение сегодня.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    keywords: ["water pump","pump manufacturer","vortex pump","solar pump","ALFAGRAND"],
    authors: [{ name: "ALFAGRAND" }],
    creator: "ALFAGRAND",
    publisher: "ALFAGRAND",
    formatDetection: { email: false, address: false, telephone: false },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: locale === defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        fr: `${baseUrl}/fr`,
        ar: `${baseUrl}/ar`,
        pt: `${baseUrl}/pt`,
        ru: `${baseUrl}/ru`,
      },
    },
    openGraph: {
      title,
      description,
      url: baseUrl,
      siteName: "ALFAGRAND",
      images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630 }],
      locale: locale === "ar" ? "ar_AR" : locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : locale === "pt" ? "pt_BR" : locale === "ru" ? "ru_RU" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        { rel: "icon", type: "image/png", sizes: "192x192", url: "/icon-192.png" },
        { rel: "icon", type: "image/png", sizes: "512x512", url: "/icon-512.png" },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) notFound();

  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="ALFAGRAND News RSS" href="/rss.xml" />
        <GoogleAnalytics />
      </head>
      <body>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
