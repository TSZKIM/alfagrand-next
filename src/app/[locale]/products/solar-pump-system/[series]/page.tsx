import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolarSeriesPage from "@/components/product-pages/SolarSeriesPage";
import { SOLAR_SERIES_MAP, ALL_SOLAR_SLUGS } from "@/data/solar-pump-models";
import { locales, defaultLocale } from "../../../config";

type Props = { params: Promise<{ locale: string; series: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    ALL_SOLAR_SLUGS.map((series) => ({ locale, series }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, series } = await params;
  const baseUrl = "https://alfagrandpumps.com";
  const data = SOLAR_SERIES_MAP[series];
  if (!data) return { title: "Not Found" };

  const models = data.models;
  const headRange = `${models[0].maxHead}-${models[models.length - 1].maxHead}m`;
  const flowRange = `${models[0].maxFlow}-${models[models.length - 1].maxFlow}m³/h`;
  const title = `${data.name} | ALFAGRAND`;
  const desc = `${data.tagline}. ${models.length} models, head ${headRange}, flow ${flowRange}, ${data.powerType === "acdc" ? "DC solar + AC grid dual power" : "DC solar power"}. ${data.description.slice(0, 100)}`;

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${locale}/products/solar-pump-system/${series}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/products/solar-pump-system/${series}`])
      ),
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${locale}/products/solar-pump-system/${series}`,
      type: "website",
    },
  };
}

export default async function SolarPumpSeriesPage({ params }: Props) {
  const { locale, series } = await params;
  setRequestLocale(locale);

  const data = SOLAR_SERIES_MAP[series];
  if (!data) notFound();

  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <>
      <Navbar />
      <SolarSeriesPage data={data} locale={locale} basePath={basePath} />
      <Footer locale={locale} />
    </>
  );
}
