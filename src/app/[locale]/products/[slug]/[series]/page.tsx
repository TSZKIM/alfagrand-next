import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GenericSeriesPage from "@/components/product-pages/GenericSeriesPage";
import { getSeriesData, getAllSeriesSlugs, categoryNames } from "@/data/series-data";
import { locales, defaultLocale } from "../../../config";

/* ── Props ── */
type Props = {
  params: Promise<{ locale: string; slug: string; series: string }>;
};

/* ════════════════════════════════════════════════════════
   generateStaticParams
   ════════════════════════════════════════════════════════ */
export function generateStaticParams() {
  const params: { locale: string; slug: string; series: string }[] = [];
  const slugs = getAllSeriesSlugs();
  for (const locale of locales) {
    for (const { slug, series } of slugs) {
      params.push({ locale, slug, series });
    }
  }
  return params;
}

/* ════════════════════════════════════════════════════════
   Metadata
   ════════════════════════════════════════════════════════ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, series } = await params;
  const data = getSeriesData(slug, series);
  if (!data) return { title: "Series Not Found | ALFAGRAND" };

  const categoryName = categoryNames[slug] || slug;
  const baseUrl = "https://alfagrandpumps.com";
  const title = `${data.title} | ${categoryName} | ALFAGRAND`;

  return {
    title,
    description: data.desc,
    alternates: {
      canonical: `${baseUrl}/${locale}/products/${slug}/${series}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/products/${slug}/${series}`])),
    },
    openGraph: {
      title,
      description: data.desc,
      url: `${baseUrl}/${locale}/products/${slug}/${series}`,
      type: "website",
    },
  };
}

/* ════════════════════════════════════════════════════════
   PAGE COMPONENT — THIN ROUTE HANDLER
   ════════════════════════════════════════════════════════ */
export default async function SeriesDetailPage({ params }: Props) {
  const { locale, slug, series } = await params;
  setRequestLocale(locale);

  const data = getSeriesData(slug, series);
  if (!data) notFound();

  const categoryName = categoryNames[slug] || slug;
  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  const seriesSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${data.title} | ${categoryName}`,
    description: data.desc,
    brand: { "@type": "Brand", name: "ALFAGRAND" },
    manufacturer: { "@type": "Organization", name: "ALFAGRAND", url: "https://alfagrandpumps.com" },
    category: "Water Pump",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seriesSchema) }} />
      <Navbar />
      <div className="bg-bg-primary pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: "Products", href: `${basePath}/products` },
              { label: categoryName, href: `${basePath}/products/${slug}` },
              { label: data.title, href: `${basePath}/products/${slug}/${series}` },
            ]}
          />
        </div>
      </div>
      <GenericSeriesPage
        data={data}
        basePath={basePath}
        productSlug={slug}
        categoryName={categoryName}
      />
      <Footer locale={locale} />
    </>
  );
}
