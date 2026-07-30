import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeepWellSeriesPage from "@/components/product-pages/DeepWellSeriesPage";
import { getDeepWellSeries, getAllSeriesSlugs, totalDeepWellModels } from "@/data/deep-well-pump-series";
import { locales, defaultLocale } from "../../../config";

type Props = { params: Promise<{ locale: string; series: string }> };

export function generateStaticParams() {
  const slugs = getAllSeriesSlugs();
  return locales.flatMap((locale) =>
    slugs.map((series) => ({ locale, series }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, series } = await params;
  const seriesData = getDeepWellSeries(series);
  if (!seriesData) return { title: "Not Found" };

  const baseUrl = "https://alfagrandpumps.com";
  const title = `${seriesData.name} — ${seriesData.family} Deep Well Pump | ALFAGRAND`;
  const description = `${seriesData.name}: ${seriesData.description.substring(0, 150)}... ${seriesData.modelCount} models, ${seriesData.boreholeSize} borehole, max depth ${seriesData.models[seriesData.models.length - 1]?.maxHead}m.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/products/deep-well-pump/${series}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/products/deep-well-pump/${series}`])
      ),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/products/deep-well-pump/${series}`,
      images: [{ url: `${baseUrl}/images/products/deep-well-pump.png`, width: 800, height: 800 }],
      type: "website",
    },
  };
}

export default async function DeepWellPumpSeriesPageHandler({ params }: Props) {
  const { locale, series } = await params;
  setRequestLocale(locale);

  const seriesData = getDeepWellSeries(series);
  if (!seriesData) notFound();

  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Deep Well Pump — ${seriesData.name}`,
    description: seriesData.description,
    image: "https://alfagrandpumps.com/images/products/deep-well-pump.png",
    brand: { "@type": "Brand", name: "ALFAGRAND" },
    manufacturer: { "@type": "Organization", name: "ALFAGRAND", url: "https://alfagrandpumps.com" },
    category: "Water Pump",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Navbar />
      <DeepWellSeriesPage series={seriesData} basePath={basePath} />
      <Footer locale={locale} />
    </>
  );
}
